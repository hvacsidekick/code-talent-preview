# Code Talent Redesign Build Report

## Status

First high-fidelity static prototype complete.

Local URL:

`http://127.0.0.1:4177`

GitHub Pages preview:

`https://hvacsidekick.github.io/code-talent-preview/`

GitHub repository:

`https://github.com/hvacsidekick/code-talent-preview`

Local files:

- `site/index.html`
- `site/styles.css`
- `site/script.js`

## Research Artifacts

- `research/source-site-inventory.md` - crawled source-site inventory
- `research/page-summaries.json` - structured page summaries
- `research/image-inventory.json` - source-site media references
- `worker-site-audit.md` - independent Claude audit and improvement recommendations
- `worker-build-recommendations.md` - independent Claude build plan
- `BLUEPRINT.md` - working redesign blueprint

## Source Pages Covered

- Home
- About
- Services
- Team
- Meetups
- Blog
- Two blog posts
- Contact
- Privacy policy
- Candidate and candidate-intake pages
- Individual profile stubs for Matt, Rita, Riley, Conor, Bret, Eric, Kevin, Justin, Nick, and Sisson

## Prototype Coverage

- Premium image-led hero with the Code Talent brand and core positioning.
- Employer path with hiring value prop and growth-stage use cases.
- Process section: intake, market map, curation, close.
- Services: contingency, executive search, contract-to-hire, contract services.
- Differentiators: connections, community, competency.
- Candidate path and role categories.
- Community section with supported meetups and host-a-meetup CTA.
- Team roster with known titles and known emails from source pages.
- Insights section with both existing blog posts represented.
- Contact section with intent-routed form UI.
- Privacy summary and migration note.

## Verification

- Served locally with Python static server on port `4177`.
- Browser desktop DOM check:
  - All required sections present.
  - No horizontal overflow.
  - No console errors.
- Browser mobile DOM check at `390x844`:
  - No horizontal overflow.
  - Mobile menu opens and displays seven links.
  - Hero H1 patched after screenshot QA so the longest word no longer clips.
- Visual screenshots captured for desktop, mobile, and mobile menu.

## Production Blockers / Owner Decisions

- Confirm public office address, phone, LinkedIn URL, and primary contact email.
- Confirm Code Talent owns or may reuse the source-site media, client logos, and any Getty/Durable assets.
- Confirm team roster, titles, headshots, bios, and emails.
- Confirm which metrics can be published beyond verified source facts (`since 2013`, `over a decade`, and 21 listed meetups/groups).
- Confirm whether the full existing privacy policy should be migrated verbatim or updated by counsel.
- Choose backend for contact and candidate intake routing.
