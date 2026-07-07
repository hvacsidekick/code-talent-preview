# Code Talent — Build Recommendations

A concise, practical build plan for a polished, premium recruiting-agency website. Written to be implementable as either a **static site (Astro)** or a **React app (Next.js)**. Astro is the recommended default: content-heavy, mostly static, best Lighthouse scores, easy MDX blog. Next.js is the fallback if a live job board / dynamic candidate portal is in scope.

---

## 1. Recommended Stack

| Concern | Recommendation | Why |
|---|---|---|
| Framework | **Astro** (or Next.js App Router if dynamic) | Ships zero JS by default; ideal for a marketing/content site. Islands for the few interactive bits. |
| Styling | **Tailwind CSS** + CSS variables for the token layer | The current site already uses Tailwind-style tokens (`gray-900`); keeps parity and speed. |
| Content | **MDX / content collections** for blog + case studies + team + testimonials | Non-devs can edit; type-safe schemas. |
| UI motion | **Framer Motion** (React island) or CSS `@keyframes` + IntersectionObserver | Restrained reveal-on-scroll, marquee, count-up. |
| Forms | Astro action / serverless function → email (Resend) + spam guard (Turnstile/reCAPTCHA) | Contact + talent-network intake. |
| Fonts | **Chivo** (display) + **Inter** (body) + a **monospace** for `code.`/eyebrows, self-hosted | Matches measured live fonts; self-host for speed + no layout shift. |
| Deploy | Vercel / Netlify / Cloudflare Pages | Static-first, edge functions for forms. |
| Analytics/SEO | Plausible or GA4 + `@astrojs/sitemap` + JSON-LD schema | Track conversions; win rich results. |

---

## 2. Design Tokens

```css
:root {
  /* Base */
  --ink-900:#0B0D12; --ink-800:#111827; --ink-600:#374151;
  --paper:#FFFFFF;   --paper-alt:#F5F4F2; --line:#E5E7EB;

  /* Accent (extend the measured #4B4BD2 into a ramp) */
  --indigo-50:#EEF0FF; --indigo-500:#4B4BD2; --indigo-600:#3E3EB8; --indigo-700:#32329A;

  /* Type */
  --font-display:"Chivo", sans-serif;
  --font-body:"Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono:"Chivo Mono","JetBrains Mono", ui-monospace, monospace;

  /* Scale (rem) */
  --step-6:4.5rem; --step-5:3rem; --step-4:2rem; --step-3:1.5rem;
  --step-2:1.25rem; --step-1:1.125rem; --step-0:1rem;

  --radius:14px; --radius-lg:22px;
  --space:0.5rem; /* 8px scale */
  --shadow-soft:0 1px 2px rgba(11,13,18,.06),0 8px 24px rgba(11,13,18,.08);
}
```

Rules: white as default surface, **one deep `--ink-900` section** for depth, indigo used sparingly (primary CTA + accents only), `--paper-alt` for alternating bands. Monospace reserved for the `code.` logo, eyebrows (`// how we work`), and tags.

---

## 3. Component Inventory

**Layout / chrome**
- `SiteHeader` — sticky, transparent-over-hero → solid on scroll; nav (For Employers · For Talent · Services · Community · About · Insights) + primary `Button` "Hire Talent" + ghost "Find a Role"; mobile drawer.
- `SiteFooter` — address, email, LinkedIn, quick links, meetup list, DSW badge, mini-CTA.
- `Section` — wrapper with `variant="paper|paper-alt|ink"`, consistent vertical rhythm.
- `Container` — max-width 1200–1280px.
- `Eyebrow` — monospace kicker (`// proof`).

**Content blocks**
- `Hero` — headline, subhead, dual CTA, media slot (photo w/ gradient overlay).
- `LogoMarquee` — animated client-logo strip; grayscale→color on hover; pause on hover; `prefers-reduced-motion` fallback to static grid.
- `StatBand` — 3–4 `StatTile` (count-up number + label). Data-driven; supports "—" when a metric is unconfirmed.
- `PillarCards` — Connections / Community / Competency (icon + title + line).
- `AudienceSplit` — two large cards ("I'm hiring" / "I'm looking").
- `ProcessSteps` — numbered 3–4 step horizontal (stacks on mobile).
- `ServiceCard` + `ServiceGrid` — 4 engagement models, each links to detail.
- `TestimonialCard` + `TestimonialFeature` — quote, avatar, name, role, company logo; feature variant is large + links to case study.
- `CaseStudyCard` — Challenge→Action→Result teaser.
- `CommunityGrid` — masonry of meetup/event photos + "Host with us" CTA.
- `MeetupList` — grouped, filterable list of the ~21 supported groups.
- `TeamGrid` + `TeamMemberCard` — headshot, name, title, focus tags, LinkedIn.
- `CTASection` — final dark band, dual CTA + contact.

**Interactive islands (hydrate only these)**
- `ContactForm` — Name, Email, **Reason for reaching out** (Employer / Candidate / Host a meetup / Other → routes to different copy + recipient), Message; Turnstile; success/error states.
- `TalentSignup` — "Join our talent network" (name, email, role, resume upload/LinkedIn).
- `MobileNav`, `LogoMarquee`, `StatBand` count-up, scroll-reveal wrapper.

---

## 4. Content Collections (schemas)

```
/src/content/
  team/*.md          { name, title, order, headshot, focus[], linkedin, email, bio }
  testimonials/*.md  { quote, name, role, company, logo, avatar, caseStudy? }
  caseStudies/*.mdx  { client, logo, role, challenge, action, result, metrics[], quote }
  services/*.md      { title, slug, summary, forWhom, process[], differentiator }
  meetups/*.md       { name, group, cadence, url, logo }
  posts/*.mdx        { title, slug, date, author, audience:"candidate"|"employer", tags[], excerpt, cover }
```

Filling `team/` and `testimonials/` with real content is the highest-leverage build task — it converts the two biggest current gaps (stub profiles, plain-text quotes) into trust assets.

---

## 5. Page Build Order (recommended sequence)

1. **Design tokens + `Section`/`Container`/`Button`/`Eyebrow`** primitives.
2. **Header + Footer** (real contact info + LinkedIn).
3. **Homepage** — assemble the 11 sections from the audit (§6). Highest priority.
4. **For Employers** (`/employers`) — primary conversion page: pitch → process → services → proof → CTA.
5. **Services** (+ optional per-service detail pages) with process + differentiator + one case study each.
6. **Team** with real bios/headshots → replaces stub `/name` pages with `/team/[slug]`.
7. **Case Studies** (`/work`) — 2–3 stories from Ibotta/Guild/Rachio quotes.
8. **Community** (`/community`) — visual meetup showcase + "Host with us."
9. **About** — founder story + timeline + values + stats.
10. **For Talent** (`/talent`) + `TalentSignup`.
11. **Insights** (blog) — migrate 2 posts, add employer lane, add dates/authors/categories.
12. **Contact** — intent-routed form + address + map + LinkedIn.
13. **(Optional) Jobs board** `/jobs`.

---

## 6. Accessibility, Performance, SEO Checklist

- **A11y:** semantic landmarks, visible focus rings, `prefers-reduced-motion` guards on all motion, color-contrast AA (indigo-on-white and white-on-ink both pass — verify), form labels + error announcements, alt text on all event photos.
- **Performance:** self-host + `font-display:swap`; responsive `<Image>` (AVIF/WebP) for the photo-heavy community sections; lazy-load below-fold; keep JS to the few islands; target Lighthouse 95+.
- **SEO:** unique branded `<title>`/meta per page (fix the "with code.." typo and the title/hero mismatch); OpenGraph/Twitter cards; `@astrojs/sitemap`; canonical tags; **JSON-LD** `Organization` + `LocalBusiness` (Denver address) + `Review`/`AggregateRating` (real testimonials) + `BreadcrumbList`.
- **Conversion tracking:** events on "Hire Talent," "Find a Role," form submit, talent signup.
- **Fix:** resolve the homepage JS console error carried over from the current build.

---

## 7. Minimal "Definition of Done" for a Premium Feel

- [ ] Homepage tells the full story in one scroll (hero → logos → stats → pillars → audience split → process → services → featured proof → community → CTA).
- [ ] At least one **dark section** and one **`paper-alt`** band for depth (no all-white flatness).
- [ ] Real team headshots + bios; no empty profile stubs; no broken profile links.
- [ ] ≥3 quantified stats (client-confirmed) on the homepage.
- [ ] ≥2 testimonials upgraded to photo+logo cards; ≥1 full case study.
- [ ] Contact page shows email, Denver address, map, and LinkedIn.
- [ ] Distinct employer and candidate pathways, each with its own CTA.
- [ ] Structured data + clean per-page meta shipped.
- [ ] Restrained scroll-reveal + logo marquee + stat count-up, all reduced-motion safe.

---

*All copy and data must be sourced from the client or the existing public site. Any statistic, bio, or client logo not verifiable from those sources should be confirmed before publishing — see Risks/Unknowns in `worker-site-audit.md`.*
