# Claude Code Worker Brief: Code Talent Ramp Pass

You are the builder. Codex is the orchestrator/auditor and must not make product-code changes. Work in:

`C:\Users\robin\code-talent-redesign`

## Mission

Completely ramp the existing Code Talent preview site into a more premium, high-value brand site while preserving the factual source content. The owner wants the site to feel like it was built with a very large agency budget, not like a template.

Primary request from owner:
- Use `/impeccable init` before design work.
- Use `/design-motion-principles` in Create mode for purposeful motion.
- Improve the meetups/community section specifically. The old Code Talent meetups page had a better layout because it led with a Google Calendar agenda and then gave a strong community involvement block plus the supported groups list.

## Hard Operating Rules

- You do all building/code changes. Codex will audit/test/publish after you finish.
- Do not commit or push.
- Edit both `site/` and `docs/` so GitHub Pages output stays in sync.
- Keep `site/privacy.html` and `docs/privacy.html` content as-is except for unavoidable shared CSS/header/footer compatibility.
- Do not invent unconfirmed facts. Address, phone, LinkedIn URL, current roster details, bios, headshots, and private emails remain unconfirmed unless already present in source files.
- Preserve confirmed public facts from `BLUEPRINT.md` and `research/source-site-inventory.md`.
- Use existing public/source images only as already referenced, because the owner confirmed reusable rights for the source images/logos/testimonials.
- If a hard blocker appears, write it in `WORKER_RAMP_REPORT.md` and stop. Otherwise make reasonable decisions and finish.

## Required Skill Flow

1. Invoke and follow `/impeccable init`.
   - If slash-command invocation is unavailable inside this Claude run, manually follow the installed skill at:
     `C:\Users\robin\.claude\skills\impeccable\SKILL.md`
   - Use the absolute script path if the relative `.claude/skills/...` script path is not available from the repo.
   - The project has no `PRODUCT.md`, so init is required before redesign work.
   - Treat this owner-provided strategy as confirmed input for `PRODUCT.md`:
     - Register: `brand`
     - Users: founders, CTOs, hiring leaders, startup operators, senior technical candidates, and Colorado tech community organizers.
     - Purpose: position Code Talent as the Denver-rooted, community-powered recruiting partner for standout technical teams and standout candidates.
     - Desired feeling: elite, connected, human, exacting, high-trust, locally rooted.
     - Anti-references: generic SaaS landing pages, recruiter stock-photo templates, bland card grids, fake metrics, overdone AI editorial layouts, and decorative motion with no purpose.
     - Accessibility: responsive, readable, keyboard-accessible, high contrast, and reduced-motion-safe.
   - Generate `PRODUCT.md`. Generate `DESIGN.md` if the init/document flow supports it from the current static site. Configure live mode only if appropriate and harmless.

2. Use `/design-motion-principles` in Create mode.
   - Project context: marketing/brand site.
   - Designer weighting: Primary Jakub Krehel for production polish, secondary Jhey Tompkins for selective creative brand moments, Emil Kowalski for nav/forms/high-frequency interactions.
   - Motion must be purposeful: orientation, state feedback, focus, or premium first-load choreography.
   - Avoid looping attention-seeking animation, bounce/elastic, layout-property animation, and content that starts blank if JavaScript fails.
   - Every animation needs `prefers-reduced-motion`.

## Current Files To Read First

- `README.md`
- `BLUEPRINT.md`
- `BUILD_REPORT.md`
- `worker-build-recommendations.md`
- `research/source-site-inventory.md`
- `source-pages/meetups.html`
- `site/index.html`
- `site/styles.css`
- `site/script.js`

## Important Meetups Source Details

The current new homepage only has a tag cloud for meetups. Upgrade this substantially.

Old source meetups page included:
- Page title: `Code Meetups Calendar`
- Google Calendar iframe:
  `https://calendar.google.com/calendar/embed?mode=AGENDA&ctz=America%2FDenver&src=Y29kZS10YWxlbnQuY29tX21vZmNtZGxqMWZvdDRxMHJxNG84ZWtvdDFvQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%238E24AA&showPrint=0`
- Community copy:
  `Code Talent was built on giving back. We've supported the Colorado tech community since our founding and continue to do so today. If you're looking for a space to host a meetup or event please contact us!`
- Supported groups:
  AI Tinkerers, Black Tech Denver, CocoaHeads Denver, Colorado Product Foundation, Denver Data Engineers, Denver DevOps, Denver Elixir Meetup, Denver Leadership Meetup, Denver Microservices Meetup, Denver Python Meetup, Denverscript Meetup, Denver Startup Week, HighView Sessions, MLOps Meetup, Mile High Gophers (Golang Meetup), Paired Community, React Meetup, The R Meetup, Test Tribe QA Meetup, Women in Product, Vue Meetup.

Recommended direction:
- Make community/meetups feel like a primary proof asset, not an afterthought.
- Add an agenda/calendar module that works well on desktop and mobile.
- Pair the calendar with community narrative and host-a-meetup CTA.
- Present the supported groups with more structure than pills only. Consider a dense indexed directory, grouped rows, or a marquee-like community wall if accessible and reduced-motion-safe.
- Keep the CTA anchored to the contact form reason `Hosting a meetup`.

## Design Quality Targets

Fix current weaknesses where practical:
- Reduce repeated tiny section-eyebrow grammar.
- Avoid generic identical card grids where a more editorial or asymmetric layout would be stronger.
- Remove decorative grid backgrounds unless they serve an actual interface metaphor.
- Avoid oversized card radii and heavy border-plus-shadow pairings.
- Cap display type at the Impeccable recommended ceiling so text does not shout or overflow.
- Improve responsive spacing and text fitting on mobile.
- Use the confirmed Code brand identity (`code.`, indigo, black/white) but push the visual system beyond basic monochrome cards.
- Keep real imagery in the site; do not replace with blank decorative panels.

## Implementation Scope

Likely edit:
- `site/index.html`
- `site/styles.css`
- `site/script.js`
- matching files under `docs/`
- `PRODUCT.md`
- `DESIGN.md` if generated
- `.impeccable/live/config.json` if init creates it
- `WORKER_RAMP_REPORT.md`

Do not edit:
- Privacy policy body content
- Git history
- GitHub settings

## Verification Required Before You Stop

Run what is appropriate for this static site:
- Check HTML/CSS/JS for syntax issues.
- Serve `site/` locally and inspect the page visually at desktop and mobile widths if possible.
- Confirm the Google Calendar iframe renders or degrades acceptably.
- Confirm reduced-motion CSS exists.
- Confirm `docs/` mirrors `site/`.

Write `WORKER_RAMP_REPORT.md` with:
- Exact skill flows used.
- Files changed.
- Meetups/community changes.
- Motion decisions.
- Verification performed and any failures.
- Any remaining owner decisions.
