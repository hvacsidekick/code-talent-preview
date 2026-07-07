# Code Talent — Website Audit & Redesign Recommendations

**Target site:** https://code-talent.com/
**Audited:** 2026-07-07
**Method:** Full public crawl via headless browser (Playwright) + page-level content extraction. All pages listed below were fetched directly; URLs are cited inline. Where a fact is inferred rather than stated on the public site, it is explicitly labeled **[Inference]** or **[Recommendation]**.

---

## 1. Source-Site Page Inventory

| Route | Page | Purpose | State observed |
|---|---|---|---|
| `/` | Homepage | Hero + client logos + testimonials + "We love our team" community strip | Very short (~1 hero screen + animated logo carousel). Light on content. |
| `/about` | About | Mission, values, community story, contingency model | Copy-driven; no named people, no photos of team, no dates beyond "since 2013 / over a decade." |
| `/services` | Services | 4 engagement models | Clear list, but no process, pricing signals, guarantees, or proof. |
| `/team` | Team | 10 team members with links to individual profiles | Names + titles only on index; no bios/photos in extracted content. |
| `/meetups` | Meetups | Community calendar + list of ~21 supported groups | Strong differentiator content; underleveraged as marketing. |
| `/blog` | Blog | 2 posts (interview-prep focused) | Thin; candidate-facing only; no dates/excerpts/categories. |
| `/blog/first-call--big-stakes--how-to-nail-your-initial-interview` | Blog post | Candidate interview advice | — |
| `/blog/interview-prep-guide-for-software-engineers` | Blog post | Candidate interview advice | — |
| `/contact-us` | Contact | Form: Name, Email, Reason for Reaching Out, Message | No email/phone/address/map/social links anywhere. |
| `/nick`, `/eric`, `/kevin`, `/conor`, `/rita`, `/sisson`, `/justin`, `/riley`, `/bret` | Individual recruiter profiles | Per-person contact | **Stubs** — e.g. `/nick` shows only name + email, no bio, no photo, no LinkedIn. Heidi Harvey's link points to `/` (broken/placeholder). |

**Nav (global):** Team · Meetups · About · Blog · Our Services. Logo (`code.`) → home.
**Primary CTAs seen:** "Hire Talent" → `/contact-us`; "Why Code" → `/about`; "Get to Know Us" → `/team`; "Get In Touch"; "Get Started."
**Console:** 1 JS error on homepage load (non-fatal, but worth fixing).

---

## 2. Key Facts & Messaging (preserve these)

**Positioning line (hero):** "Connecting standout people with standout teams."
**Brand shorthand:** `code.` (lowercase, trailing period, monospace treatment).
**Title/meta:** "Code Talent — Building standout teams." Meta description: "Discover top talent in Denver, CO with code.. Our expert recruitment agency connects you to skilled professionals in tech…"

**Three-pillar framing (homepage):** Connections · Community · Competency.

**Company facts (stated on site):**
- Tech recruiting agency based in **Denver, Colorado**.
- Operating **over a decade**; **co-chairing Denver Startup Week tracks since 2013**.
- **People-first / talent-first** philosophy: "communicative, transparent, and trustworthy."
- **Contingency-based fee model:** "you only pay if we deliver."
- **"Built on giving back"** — has supported the Colorado tech community since founding.

**Services (from `/services`):**
1. **Contingency-Based Hiring** — "Only pay when you hire. Perfect for fast-growing teams that need quality candidates without upfront costs."
2. **Executive Search** — "Targeted, discreet, and high-impact… senior and executive leaders."
3. **Contract-to-Hire** — "Try before you commit."
4. **Contract Services** — "Short-term or project-based… engineers and product talent."

**Team (from `/team`):**
- Nick Gasparro — Co-Founder · Eric Hernandez — Co-Founder · Kevin Doran — Co-Founder · Conor Swanson — Co-Owner
- Riley Scardina — Principal Recruiter · Bret Smith — Principal Recruiter
- Rita Povlich — Senior Recruiter · Nick Sisson — Senior Recruiter · Justin Cosmano — Senior Recruiter · Heidi Harvey — Associate Recruiter

**Testimonials (real, attributed — the site's strongest asset):**
- **Jessica Rusin, CTO, Guild** — "instrumental in helping me hire top engineering talent from [the] startup's earliest stages."
- **Franz Garsombke, CTO, Rachio** — "hired some of our best engineering talent."
- **Michael Kolbrenner, CTO, Promontech** — "quickly understand recruiting requirements."
- **Bryan Leach, CEO/Founder, Ibotta** — "unbelievably plugged in and deeply invested."
- **Aaron Hoffman, VP Engineering, PaymentWorks** — "same personal approach that we value."

**Client logos observed in homepage carousel:** Firstbase, AgentSync, Uplight, Wunder, "PRO…" (likely Promontech), plus the testimonial companies (Guild, Rachio, Ibotta, PaymentWorks).

**Community groups supported (~21, from `/meetups`):** AI Tinkerers, Black Tech Denver, CocoaHeads Denver, Colorado Product Foundation, Denver Data Engineers, Denver DevOps, Denver Elixir, Denver Leadership, Denver Microservices, Denver Python, Denverscript, Denver Startup Week, HighView Sessions, MLOps Meetup, Mile High Gophers (Golang), Paired Community, React Meetup, The R Meetup, Test Tribe QA, Women in Product, Vue Meetup. Also referenced: Mile High Climate Club, Denver Ventures, ETH Denver, Techstars.

**Visual system (measured on live site):**
- Display font: **Chivo** (geometric, semi-mono feel). Body font: **Inter**.
- Background: **white** throughout (`#FFFFFF`); no dark or color sections.
- Text: near-black `rgb(17,24,39)` (Tailwind `gray-900`).
- Single accent: **indigo `#4B4BD2`** (the "Hire Talent" button). Secondary buttons are outlined/ghost.
- Logo `code.` in monospace, lowercase — the one strong brand signature.

---

## 3. Current-Site Strengths

1. **Genuinely credible social proof.** Named CTO/CEO testimonials from recognizable Denver tech companies (Ibotta, Guild, Rachio) — this is hard to fake and rare for a staffing site.
2. **A real, ownable differentiator: community.** Co-chairing Denver Startup Week since 2013 and hosting ~21 meetups is an authentic moat most recruiting agencies can't claim.
3. **Clear risk-reversal offer.** "You only pay if we deliver" (contingency) is a strong, plainly stated value prop.
4. **Clean, developer-native aesthetic.** The mono/Chivo + Inter + single-indigo palette reads as modern and technical rather than corporate-staffing generic. Good bones.
5. **Focused positioning line.** "Connecting standout people with standout teams" is crisp and memorable.
6. **Both audiences named.** Site speaks to employers ("scale your team") and candidates ("take your next career step").

---

## 4. Current-Site Weaknesses

**Content depth / conversion**
1. **Homepage is too thin.** Measured page height was ~849px — essentially one hero + a logo strip. There is no narrative, no "how it works," no differentiator section, no stats, no featured case study, no clear candidate vs. employer split above the fold. Almost all persuasion is off-loaded to secondary pages users may never visit.
2. **No quantified proof.** Zero numbers anywhere: placements made, roles filled, avg. time-to-hire, retention rate, years, # of companies served, # of meetups hosted. A premium brand quantifies outcomes.
3. **Testimonials underbuilt.** Strong quotes exist but appear as plain text — no photos, company logos, roles emphasized, or link-through to a case study.
4. **Team pages are empty stubs.** `/nick`, `/eric`, etc. show only a name and an email. No bio, photo, specialties, LinkedIn, or track record — a missed trust and personalization opportunity, and it makes the site feel unfinished.
5. **Broken/placeholder link.** Heidi Harvey's profile links to `/` instead of a profile.
6. **Services lack a process and proof.** Four models are listed but there's no "how we work," no timeline, no guarantee terms, no differentiation on *how* they source, and no case study attached to any service.

**Credibility / contact**
7. **No contact details at all.** No email, phone, office address, or map on `/contact-us` — only a form. For a Denver-rooted, relationship-first agency, hiding the office/address undercuts the whole "we're plugged into the local community" story.
8. **No social links** (LinkedIn especially) anywhere — unusual and credibility-limiting for recruiters, whose network *is* the product.
9. **No named leadership story.** `/about` has no founder names, photos, or origin story despite four founders/owners existing on `/team`.

**SEO / content marketing**
10. **Blog is thin and one-sided.** Only 2 posts, both candidate interview-prep. No employer-facing content (hiring guides, salary benchmarks, Denver tech market reports), no dates, no categories, no author bylines — weak for organic acquisition and thought leadership.
11. **Meta/title inconsistencies.** Homepage title says "Building standout teams" while the hero says "Connecting standout people with standout teams." Meta description has a typo ("with code.."). Multiple page `<title>`s read like keyword-stuffed SEO strings ("Top US Recruitment Solutions for Tech Talent by code.") rather than branded titles.
12. **No structured data.** No visible Organization/LocalBusiness/Review schema to win rich results — a big miss given real testimonials and a local footprint.

**UX / technical**
13. **JS console error on load** (homepage). Should be resolved.
14. **No candidate/job-seeker pathway.** Site says it serves candidates but has no jobs board, no "submit your resume," no talent-network signup — only a generic contact form.
15. **Community/meetups content is a plain list**, not a visual, branded showcase — the single most ownable asset is presented most blandly.
16. **Reason-for-contact routing exists on the form but nowhere is intent split** earlier in the journey (employer vs. candidate vs. host-a-meetup).

---

## 5. Recommended Information Architecture / Routes

Split the two audiences early, elevate proof and community, and give services real depth.

```
/                     Home (rebuilt: 8–9 sections, dual-audience)
/employers            For Employers — hiring pitch, process, proof   [NEW, primary conversion page]
/talent               For Candidates — job seekers, talent network   [NEW]
/services             Services (kept, expanded: process + guarantee + proof per model)
  /services/executive-search        [optional deep pages per service]
  /services/contingency
  /services/contract
/work (or /case-studies)  Case Studies / Proof — Guild, Rachio, Ibotta stories  [NEW]
/team                 Team (rebuilt: photos, real bios, specialties, LinkedIn)
  /team/[name]        Real recruiter profile pages (replace stubs)
/community            Community & Meetups (rebuilt: visual, "Host with us" CTA)
/about                About (add founder story, timeline, values, stats)
/insights (Blog)      Blog/Insights split into Candidates + Employers hubs
  /insights/[slug]
/contact              Contact (add email, address, map, LinkedIn, intent routing)
/jobs                 Open Roles / Job Board (optional but high-value)   [NEW]
```

**Global nav (recommended):** For Employers · For Talent · Services · Community · About · Insights → with a persistent **"Hire Talent"** button (primary) and a secondary **"Find a Role"** link.
**Footer:** office address, email, LinkedIn, quick links, meetup list, Denver Startup Week badge, and a mini contact CTA.

---

## 6. Recommended Homepage Section Plan

A premium recruiting homepage should tell a full story on one scroll. Proposed sections, top to bottom:

1. **Hero** — Keep "Connecting standout people with standout teams." Add a one-line subhead naming the audience + proof ("Denver's community-rooted tech recruiting partner — trusted by Ibotta, Guild, and Rachio."). Dual CTA: **Hire Talent** (primary indigo) + **Explore Roles** (ghost). Background: a real photo of the space/meetup (already have great candids) with a subtle dark gradient overlay for a premium feel.
2. **Trust bar** — Client logo strip (Firstbase, AgentSync, Uplight, Wunder, Ibotta, Guild, Rachio). Keep the animated marquee; make logos uniform grayscale → color on hover.
3. **Proof-in-numbers band** — 3–4 stat tiles (e.g., "10+ years," "21 meetups supported," "Since 2013 co-chairing Denver Startup Week," "You only pay if we deliver"). **[Fill real numbers where possible; label estimates.]**
4. **The three pillars** — Connections · Community · Competency, each as a card with an icon and one sentence. This is already the brand's framing; give it visual weight.
5. **Dual-audience split** — Two large cards: "I'm hiring" → `/employers` and "I'm looking for a role" → `/talent`. Solves the missing candidate pathway.
6. **How we work** — 3–4 step visual process (Intake → Source → Curate → Close), emphasizing the "communicative, transparent" promise. Fills the biggest content gap.
7. **Services overview** — The 4 engagement models as cards, each linking to a detail page. One-line differentiator each.
8. **Featured testimonial / case study** — Lead with the Bryan Leach (Ibotta) or Jessica Rusin (Guild) quote, large, with photo + logo, linking to a full story.
9. **Community showcase** — Visual grid of meetup photos ("We love our team" candids already exist) + the "Built on giving back" story + "Host an event at our space" CTA.
10. **Final CTA band** — "Let's build your standout team." Dual CTA + office address + LinkedIn. Indigo or dark section for contrast (introduce one dark section for depth).
11. **Footer** — full contact, nav, social, meetup list.

---

## 7. Premium Visual Direction

Goal: read like a venture-backed brand site (think Vanta / Linear / Ramp polish), not a staffing template. Build on the existing good bones.

- **Palette:** Keep the monochrome + single-accent discipline. Base white `#FFFFFF` / near-black `#111827`. Elevate the indigo `#4B4BD2` to a proper brand ramp (50→900) and add **one deep "ink" navy/near-black section** so the whole site isn't flat white — depth is what separates premium from plain. Optional warm neutral (`#F5F4F2`) for alternating section backgrounds.
- **Type:** Keep **Chivo** for display and the **`code.` monospace** signature — lean into the mono/developer identity (it's authentic to a *tech* recruiter). Inter for body. Establish a real type scale (e.g., 72/48/32/24/18/16) and generous line-height. Use a monospace label style for eyebrows/section kickers ("// how we work").
- **Layout:** 12-column grid, generous whitespace, max-width ~1200–1280px content. Asymmetric hero (text + real photo) as they already do — extend that editorial feel down the page.
- **Imagery:** They already have authentic, warm event/office candids — a huge advantage over stock-photo competitors. Treat them consistently: same rounded-corner radius, subtle duotone/grayscale option, consistent aspect ratios. Add real headshots for team.
- **Motion (restrained):** Section reveal-on-scroll (fade/translate ~16px), logo marquee, number count-up on the stats band, subtle button hover states. Nothing gratuitous — premium = confident, quiet motion.
- **Components as a system:** Rounded cards with hairline borders + soft shadow on hover, pill buttons (already pill-shaped), monospace tags/badges, quote cards with company logo. Consistent 8px spacing scale.
- **Micro-signatures:** Trailing-period `code.` motif, terminal/`//` comment-style eyebrows, and a subtle grid or dot texture in dark sections tie the "code" brand together without gimmick.

---

## 8. Content & Copy Recommendations

- **Keep the core lines** ("Connecting standout people with standout teams," "Great people make great companies," "you only pay if we deliver," "built on giving back") — they're good. Rewrite everything else for specificity.
- **Add quantified proof.** Ask the client for: total placements, roles filled/year, avg. time-to-fill, offer-accept or retention rate, # companies served, years operating, # meetups hosted. Put the strongest 3–4 on the homepage stat band. **[Any number the client can't confirm should be labeled or omitted — do not fabricate.]**
- **Write real team bios.** 2–3 sentences each: focus areas (backend, exec, product), a personal note, LinkedIn link, headshot. Replace the empty `/name` stubs. This directly supports the "personal, relationship-first" brand.
- **Give `/about` a founder story.** Name the four founders/owners, a short origin narrative, a "since 2013" timeline of community milestones, and the values with one example each.
- **Turn testimonials into case studies.** For 2–3 marquee clients (Ibotta, Guild, Rachio), a short "Challenge → What we did → Result" with the quote and logo. Even one strong story dramatically raises perceived value.
- **Expand the blog into an Insights hub** with two lanes: **For Candidates** (interview prep — already have) and **For Employers** (Denver tech salary benchmarks, hiring-in-a-tight-market, how to structure engineering interviews, market reports). Add dates, authors, categories. This is the primary organic-growth lever.
- **Fix titles/meta.** Branded, consistent `<title>`s per page; unique meta descriptions; fix the "with code.." typo; align homepage title with the hero line.
- **Add contact reality.** Publish office address (Denver), a general email, LinkedIn, and keep the intent-routed form. For a "we're embedded in the local community" brand, hiding the address is self-defeating.
- **Candidate CTA.** Add "Join our talent network" / "Submit your resume" so candidates have a real action beyond a generic form.

**SEO quick wins:** add `LocalBusiness` + `Organization` + `Review`/`AggregateRating` structured data (you have real reviews); add an XML sitemap + per-page canonical/OG tags; target local intent keywords ("Denver tech recruiters," "software engineering recruiting Colorado," "startup technical recruiting Denver"); resolve the homepage JS console error.

---

## 9. Risks / Unknowns

- **Unverified/absent numbers.** The site cites no statistics. Any stats added must come from the client; several I suggest are **[Recommendation]** placeholders, not facts. Do not publish unconfirmed metrics.
- **Team titles from index only.** Bios were not present in extracted content; individual profile pages are stubs. Confirm current roster, titles, and headshots before rebuild (roster may have changed).
- **Exact client roster.** Logos were read from an animated carousel; a couple (e.g., "PRO…") were partially rendered — confirm the full, current approved client-logo list and usage rights before featuring.
- **Founding year / precise tenure.** Site says "over a decade" and "since 2013" but gives no explicit founding date — confirm before putting a hard number on the timeline.
- **Contact details.** Office address, phone, and email are not published; confirm what the client wants public.
- **Copyright.** This audit preserves facts, names, offers, and testimonial substance but rewrites presentation. Verbatim testimonial quotes should be re-confirmed with the client and their subjects before republishing, and client logos require permission.
- **Blog authorship & dates** were not exposed; confirm before migrating.

---

*Prepared as an independent strategist review of the public site only. Facts are drawn from the pages cited; everything not on the public site is labeled inference or recommendation.*
