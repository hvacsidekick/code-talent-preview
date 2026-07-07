# Claude Code Worker Execute Brief: Static Glowy Hero

Work in `C:\Users\robin\code-talent-redesign`.

You are the builder. Codex is the orchestrator/auditor. Do not commit or push.

Proceed immediately with the static adaptation. Do **not** migrate to React. Do **not** install packages. Do **not** create a decorative/non-rendering TSX component.

## Build

1. In `site/index.html`, add a hero canvas background inside the existing `.hero`:
   - `<canvas class="hero-wave-canvas" data-hero-waves aria-hidden="true"></canvas>`
   - It must sit behind content and not block clicks.

2. In `site/styles.css`, update the hero styling:
   - Keep existing Code Talent content readable.
   - Add a static fallback background/material layer so no-JS still looks polished.
   - Layer order should be: base background/photo/canvas/overlay/content.
   - No gradient text. No decorative grid background. No content gated by JS.
   - Add reduced-motion styling that hides or quiets the canvas without breaking the hero.

3. In `site/script.js`, add a vanilla JS canvas module:
   - Inspired by the user's React GlowyWavesHero: glowing multi-wave lines, mouse influence, smoothing.
   - Scope to `[data-hero-waves]`.
   - Cap DPR to 1.5 or 2.
   - Pause when the hero is offscreen or `document.hidden`.
   - For `prefers-reduced-motion: reduce`, draw one static frame and skip RAF.
   - Avoid per-frame DOM reads.
   - Keep CTAs clickable.

4. Mirror changed `site/` files to `docs/`.

5. Add `REACT_COMPONENT_INTEGRATION.md` explaining:
   - This repo is static, not shadcn/Tailwind/TypeScript.
   - In a real shadcn project, the default component path is `/components/ui`; it matters because shadcn aliases/imports assume that structure.
   - Exact migration/setup instructions using Vite or Next, Tailwind, shadcn CLI, `framer-motion`, `lucide-react`, and the supplied component path.
   - The shipped implementation is a static vanilla JS adaptation so GitHub Pages renders it now.

6. Add `WORKER_GLOWY_HERO_REPORT.md` with files changed, decision, and verification.

## Verify

Run:
- `node --check site/script.js`
- `node --check docs/script.js`
- Hash compare `site/index.html`/`docs/index.html`, `styles.css`, `script.js`, `privacy.html`
- Browser desktop/mobile if available:
  - canvas exists
  - hero text visible
  - overflow 0
  - revealHiddenCount 0
  - calendar iframe still present
  - reduced motion does not blank the hero

Return a concise report. Do not commit.
