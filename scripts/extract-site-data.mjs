import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = "C:\\Users\\robin\\code-talent-redesign";
const sourceDir = path.join(root, "source-pages");
const outDir = path.join(root, "research");

function decodeHtml(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function textFromHtml(html = "") {
  return decodeHtml(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function extractNextData(html) {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) return null;
  return JSON.parse(decodeHtml(match[1]));
}

function collectImages(value, images = new Map()) {
  if (!value || typeof value !== "object") return images;
  if (typeof value.url === "string" && /^https?:\/\//.test(value.url)) {
    images.set(value.url, {
      url: value.url,
      type: value.type,
      description: value.description,
      preview: value.preview,
      alt: value.alt,
    });
  }
  for (const child of Object.values(value)) {
    if (Array.isArray(child)) child.forEach((item) => collectImages(item, images));
    else collectImages(child, images);
  }
  return images;
}

function collectPageSummary(file, data, html) {
  const page = data?.props?.pageProps?.page;
  const website = data?.props?.pageProps?.website;
  const post = page?.post;
  const blocks = page?.blocks || [];
  const slugParam = data?.query?.slug;
  const queryLabel = Array.isArray(slugParam) ? slugParam.join("/") : slugParam;
  const blockText = blocks
    .map((block) => block.content || block.title || block.subtitle || block.description || "")
    .filter(Boolean)
    .map(textFromHtml);
  return {
    file,
    route: "/" + file.replace(".html", "").replace("home", "").replaceAll("__", "/"),
    label: page?.label || post?.title || queryLabel || "Home",
    seoTitle: page?.seo?.title || post?.title || website?.seo?.title || "",
    seoDescription: page?.seo?.description || "",
    visibleText: textFromHtml(html).slice(0, 6000),
    blockText,
  };
}

await mkdir(outDir, { recursive: true });

const files = (await import("node:fs/promises")).readdir(sourceDir);
const summaries = [];
const allImages = new Map();
const allPages = new Map();

for (const file of await files) {
  if (!file.endsWith(".html")) continue;
  const html = await readFile(path.join(sourceDir, file), "utf8");
  const data = extractNextData(html);
  if (!data) continue;
  summaries.push(collectPageSummary(file, data, html));
  collectImages(data, allImages);
  const pages = data?.props?.pageProps?.website?.pages || [];
  for (const page of pages) {
    const slug = page.slug ? `/${page.slug}` : "/";
    allPages.set(slug, {
      slug,
      label: page.label,
      showOnHeader: page.showOnHeader,
      showOnFooter: page.showOnFooter,
      type: page.type || "page",
    });
  }
}

await writeFile(path.join(outDir, "page-summaries.json"), JSON.stringify(summaries, null, 2));
await writeFile(path.join(outDir, "image-inventory.json"), JSON.stringify([...allImages.values()], null, 2));
await writeFile(path.join(outDir, "discovered-pages.json"), JSON.stringify([...allPages.values()], null, 2));

const markdown = [
  "# Code Talent Source Site Inventory",
  "",
  "## Discovered Pages",
  ...[...allPages.values()].map((p) => `- ${p.slug} — ${p.label} (header: ${p.showOnHeader}, footer: ${p.showOnFooter}, type: ${p.type})`),
  "",
  "## Crawled Page Summaries",
  ...summaries.map((s) => [
    `### ${s.label} (${s.route || "/"})`,
    s.seoTitle ? `SEO title: ${s.seoTitle}` : "",
    s.seoDescription ? `SEO description: ${s.seoDescription}` : "",
    "",
    s.blockText.length ? s.blockText.map((t) => `- ${t}`).join("\n") : s.visibleText,
  ].filter(Boolean).join("\n")),
  "",
  "## Image Inventory",
  ...[...allImages.values()].map((img) => `- ${img.url}${img.description ? ` — ${img.description}` : ""}`),
  "",
].join("\n");

await writeFile(path.join(outDir, "source-site-inventory.md"), markdown);
