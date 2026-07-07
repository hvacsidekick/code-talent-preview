# Claude Code Worker Brief: Integrate Code Talent Local Photo Assets

Work in `C:\Users\robin\code-talent-redesign`.

You are the builder. Codex is the orchestrator/auditor. Do not commit or push.

## Goal

Integrate the local Code Talent image drop from:

`C:\Users\robin\Desktop\codetalent`

into the static Code Talent preview site. The user says this folder contains the employee profile pictures and other photos from the original site. Use these real assets instead of remote placeholder/source URLs where appropriate.

The repo is a static site. Primary source is `site/`; deployed GitHub Pages mirror is `docs/`. Keep both mirrors in sync.

## Asset Inventory

Headshots:

- `Nick Gasparro.webp` — Nick Gasparro
- `Eric.webp` — Eric Hernandez
- `Kevin.webp` — Kevin Doran
- `Conor.webp` — Conor Swanson
- `Riley.webp` — Riley Scardina
- `Bret.webp` — Bret Smith
- `Rita.webp` — Rita Povlich
- `Nick Sisson.webp` — Nick Sisson
- `Justin.webp` — Justin Cosmano
- `Heidi.webp` — Heidi Harvey

Other site/source photos:

- `3abPyMldvIsXDn9sPv0dbeE94YKzcHehLIumNaeTvxi5ecfWmJnw3LtG18OvIp3E.webp` — colorful Code mural, currently used remotely in the hero.
- `32D6qfnPPLzosxWGniwpJnl6d3G72Oz595QJACydfjY3mSPkZJQs4I3HyFRIFRnA.webp` — wide black-and-white team collage, currently used remotely in the candidate card CSS background.
- `27KjjGhPyvEU7VlqhsDyxGyiV3FEEDFDTzMuPZ6XZVt4JrJVTe24fEKpMxItt8Sx.webp` — event/audience in Code space.
- `481337129_18394606243101688_4765494025171956063_n.jpg` — event/audience in Code space, strong community/meetups image.
- `497839596_18407236921101688_6502660998576374294_n.jpg` — event doorway/poster photo.
- `525790970_18418104826101688_1606238327143614578_n.jpg` — Mile High Climate Club event signage.

Known dimensions from ffprobe are available if needed; assets are already web-usable sizes. Do not create giant new derivatives unless necessary.

## Required Implementation

1. Create a local asset folder:
   - `site/assets/codetalent/`
   - `docs/assets/codetalent/`
   Copy the source images into `site/assets/codetalent/`, then mirror to `docs/assets/codetalent/`.

2. Replace remote image references where the local asset is a known match:
   - Hero image: use local mural `assets/codetalent/3abPy...webp`.
   - Candidate/talent card CSS background: use local wide team collage `assets/codetalent/32D6...webp`.
   - Community aside: replace current generic Getty image with a real local event/meetup photo, preferably `481337129_...jpg`.

3. Upgrade the team section:
   - Add the corresponding headshot to every existing team card.
   - Keep the current names, titles, and confirmed emails.
   - Do not invent bios, emails, titles, metrics, or LinkedIn URLs.
   - Remove/update stale copy that says “headshots are on the way.”
   - Heidi still has no confirmed email; preserve a non-email note such as `Profile to confirm` or similar.
   - Use accessible alt text like `Portrait of Nick Gasparro`.
   - Use `loading="lazy"` and `decoding="async"` for team images.
   - Maintain professional, consistent cropping across varied source dimensions. Use CSS `aspect-ratio`, `object-fit`, and selective `object-position` only where needed.

4. Integrate the remaining event photos appropriately:
   - Prefer a compact community photo strip/gallery or a refined community media stack over forcing unrelated event images into insight cards.
   - Alt text must describe the actual image.
   - Keep the meetups section layout better than the old site and do not clutter the calendar.

5. Preserve the current design system:
   - Chivo / Chivo Mono / Inter.
   - `code.` wordmark and indigo/ink/paper palette.
   - Card radius capped at existing tokens.
   - No nested cards.
   - No new decorative gradient blobs/orbs.
   - No repeated generic section eyebrows.
   - Reduced-motion behavior must remain safe.

6. Keep static deploy mirror exact:
   - After edits, `docs/index.html`, `docs/styles.css`, `docs/script.js`, and asset folders must mirror `site/`.
   - Privacy policy must remain unchanged.

## Verification Required

Run and report:

- `node --check site/script.js`
- `node --check docs/script.js`
- hash compare for `index.html`, `styles.css`, `script.js`, `privacy.html` between `site/` and `docs/`
- `git diff --check`
- browser test locally with a simple static server:
  - desktop 1440-ish width
  - mobile 390x844
  - no horizontal overflow
  - hero image and canvas still render
  - team headshots load and crop cleanly
  - community photos load and do not distort
  - contact/calendar still present
  - no console errors except possible favicon 404

Write `WORKER_ASSET_INTEGRATION_REPORT.md` with:

- files changed
- asset mapping used
- verification results
- any caveats
