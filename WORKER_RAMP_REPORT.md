# Worker Ramp Report — Code Talent

Builder pass to ramp the Code Talent preview into a premium, agency-grade brand site while preserving all factual source content. No commits or pushes were made. `site/` and `docs/` are kept in sync.

## Skill flows used

1. **`/impeccable init`** (followed `reference/init.md`).
   - `scripts/context.mjs` reported `NO_PRODUCT_MD`, so init ran as required.
   - Register: **brand** (loaded `reference/brand.md`).
   - Wrote **`PRODUCT.md`** from the owner-provided confirmed strategy (users, purpose, desired feeling, anti-references, accessibility). No invented strategy — the owner's brief was treated as confirmed interview input, so no interactive round was needed.
   - Generated **`DESIGN.md`** capturing the final shipped visual system (tokens, type, layout, components, motion, a11y).
   - Wrote a harmless **`.impeccable/live/config.json`** (multi-page static glob, `cspChecked: true`; no CSP source patch was applied — nothing required consent).

2. **`/design-motion-principles`** in **Create mode** (followed `workflows/create.md` + cookbook, accessibility, and the weighted designer refs).
   - Weighting per brief: **Jakub Krehel primary** (production polish), **Jhey Tompkins secondary** (one premium first-load moment), **Emil Kowalski selective** (nav, forms, high-frequency interactions).
   - Motion decisions below.

## Files changed

Edited (both trees mirrored, verified byte-identical):
- `site/index.html` + `docs/index.html` — full rebuild.
- `site/styles.css` + `docs/styles.css` — new design system.
- `site/script.js` + `docs/script.js` — accessible nav, JS-gated staggered reveals, count-up, form + host-CTA wiring.
- `site/privacy.html` + `docs/privacy.html` — **shell only** (font-weight list parity, `eyebrow`→`brand-tag` class, `footer-brand-block` wrapper). **Policy body text unchanged.**

Created:
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/live/config.json`, this report.

Not touched: privacy policy body content, git history, GitHub settings.

## Meetups / community changes (primary upgrade)

The old homepage had only a pill tag-cloud for meetups. It is now a primary proof asset with its own indigo-washed section (`#community`), distinct from every other band:

- **Leads with a Google Calendar agenda.** Embedded `mode=AGENDA` iframe (America/Denver), exact source `src`, in a framed white panel titled *"What's coming up"*. The live agenda renders real upcoming groups (React Denver, Mile High Gophers, Denver Cocoaheads, etc.). Titled `<iframe>` + a visible "Open full calendar" link + a text fallback link, so it degrades gracefully.
- **Community narrative** using the confirmed source copy (built on giving back, supported since founding, host-a-meetup invite, Denver Startup Week since 2013).
- **Host-a-meetup CTA** anchored to the contact form; clicking it preselects the form reason **"Hosting a meetup."**
- **Supported groups** are now a **dense indexed directory** (numbered 01–21, responsive multi-column, divider rows, "21 and counting") instead of pills. All 21 confirmed groups preserved. A marquee was deliberately avoided (looping attention-seeking motion is banned by the brief and by the register).
- Community aside pairs the CTA with a real source photo (Getty "businesspeople on the go") — swapped away from the `5PEGP6…` asset, which is actually the MagicSchool partner logo, to keep the image and its alt text honest.

## Motion decisions (Create mode)

- **Premium first load (Jhey/Jakub):** hero content reveals in an 80ms stagger — opacity + `translateY(14px)` + `blur(4px)`→sharp.
- **Scroll reveal (Jakub, orientation):** IntersectionObserver adds `.is-visible`; grouped items stagger 60ms. **Content is visible by default and only animated when `html.js` is set before paint**, fixing the prior anti-pattern where `.reveal` gated visibility even without JS (would ship blank on JS failure/headless).
- **State feedback (Emil):** nav underline wipe, button hover-lift + press-scale(0.98) + arrow nudge, card shadow lift, input focus border, stat count-up.
- Easing `cubic-bezier(0.16, 1, 0.3, 1)` — no bounce/elastic. Only `transform`/`opacity`/`filter` animated (no layout properties). Durations 150–620ms by element size.
- **Reduced motion:** global `prefers-reduced-motion: reduce` block neutralizes transitions/delays, forces reveals to final visible state, and count-up shows the final number.

## Design quality fixes (against the brief's targets)

- Removed the per-section eyebrow grammar; the `//` mono label now appears only as a deliberate brand device (hero, pillars, community, contact) — it reads as a code comment, on-brand for `code.`
- Replaced identical 4-up card grids with editorial layouts: employer **stage list**, **services ledger** (divider rows), process **track** (numbers kept only because it's a real sequence).
- Removed the decorative CSS grid background from the ink pillars band.
- Capped display type at the Impeccable ceiling: `h1` max ~5.25rem (was 9.5rem), `h2` max ~3.25rem; added `text-wrap: balance`/`pretty` and measure caps.
- Reduced card radii (≤14px) and replaced heavy border+shadow pairings with multi-layer shadows (Jakub).
- Pushed the system beyond monochrome with an indigo-washed community band and two ink bands for rhythm, while preserving the committed `code.` / indigo / ink identity.
- Improved mobile spacing/fitting; verified no horizontal overflow.

## Facts / integrity

- All content is drawn from `BLUEPRINT.md` and `research/source-site-inventory.md`. No invented metrics, address, phone, or LinkedIn.
- Team emails now shown for Eric and Kevin as well — both are present on their source profile pages (`eric@`, `kevin@`), so they are confirmed, not invented. Heidi Harvey (no source email) remains flagged "Profile to confirm."
- Conor's email (`conor@`) added from his source profile page. Bret/Justin emails also confirmed in source.
- Privacy policy body preserved verbatim.

## Verification performed

- **Syntax:** `node --check` passes on `site/script.js` and `docs/script.js`. HTML parsed cleanly in-browser (no parse errors). No residual references to removed classes.
- **Local serve + browser (Playwright), desktop 1440px and mobile 390px:**
  - No horizontal overflow at either width (`scrollWidth - clientWidth = 0`).
  - Only console message is a benign `favicon.ico` 404 (no favicon shipped) — no JS errors.
  - Google Calendar agenda iframe renders live upcoming events; fallback link present.
  - Reveal system confirmed: content visible without triggering JS reveal; reveals fire on scroll.
  - Mobile nav, stacking, and calendar all verified.
- **`docs/` mirrors `site/`:** `diff` reports all four files in sync.
- **Reduced motion:** dedicated `@media (prefers-reduced-motion: reduce)` block present and forces final visible states.

### Known / acceptable
- `favicon.ico` 404 (no favicon asset). Cosmetic; add one before production if desired.
- The Google Calendar embed depends on the third-party calendar staying public; if it's ever made private the module falls back to the "Open full calendar" link.

## Remaining owner decisions (unchanged from prior build)
- Confirm public office **address, phone, LinkedIn URL**, and primary contact email.
- Confirm reuse rights already asserted for source images/logos/testimonials (assumed confirmed per brief).
- Confirm full **team roster, titles, headshots, bios**, and any emails not yet in source (Heidi Harvey).
- Confirm which **metrics** may be published beyond verified facts (2013, 21 groups, 10+ years, $0 upfront).
- Choose **backend** for contact + candidate-intake routing (form is static UI only).
- Confirm whether the privacy policy migrates verbatim or is updated by counsel.

## Hard blockers
None. The pass is complete and ready for Codex to audit/test/publish.
