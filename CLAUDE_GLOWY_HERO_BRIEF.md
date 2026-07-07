# Claude Code Worker Brief: Glowy Waves Hero Integration

Work in `C:\Users\robin\code-talent-redesign`.

You are the builder. Codex is the orchestrator/auditor only. Do not commit or push.

## Goal

Integrate the user's supplied "GlowyWavesHero" React/shadcn/Tailwind/Framer Motion concept into the Code Talent preview site in a way that actually renders on the current GitHub Pages site.

Current repo reality:
- This is a static site, not a React/shadcn/Tailwind/TypeScript app.
- Published source is mirrored from `site/` to `docs/`.
- There is no `package.json`, `components.json`, Tailwind config, TS config, or React build pipeline.
- A literal `/components/ui/glowy-waves-hero-shadcnui.tsx` file would not render on the deployed site unless you also convert the project to a real React build.

Default implementation direction:
- Do **not** convert the whole project to React unless you can justify the added build/deploy complexity and finish it completely.
- Prefer adapting the component's intended behavior into the existing static site:
  - Add a canvas-based glowy wave system to the current hero.
  - Keep the Code Talent content, CTAs, proof panel, and brand direction.
  - Use the existing `site/index.html`, `site/styles.css`, and `site/script.js`.
  - Mirror all changes to `docs/`.
  - Add documentation explaining that the original shadcn component requires React/Tailwind/TypeScript and why this repo does not use `/components/ui`.

## Required design/motion guidance

Use the project docs:
- `PRODUCT.md`
- `DESIGN.md`

Use these skill constraints:
- Impeccable brand register: ambitious but not generic; no decorative grid backgrounds; no gradient text; no repeated card-grid grammar; no text overflow; no content hidden until JS.
- Motion mode: Create.
- Context: brand/marketing website.
- Designer weighting: Jakub primary, Jhey secondary, Emil selective.
- Purpose: a single premium first-load/ambient hero moment, not a looping attention-seeking CTA.
- Reduced motion is mandatory.
- Content must remain visible without JS.
- Animate only performant properties (`transform`, `opacity`, `filter`) and canvas drawing. Avoid layout animation.

## User-supplied component requirements to map

The supplied React component uses:
- `framer-motion`
- `lucide-react`
- shadcn `Button`
- React hooks for canvas:
  - full-screen canvas
  - waves with amplitude/frequency/color palette
  - mouse influence/smoothing
  - theme-derived colors
  - reduced-motion lower intensity

Since this is static:
- Do not install `framer-motion` or `lucide-react` unless you convert to React.
- Do not add a nonfunctional TSX component just to satisfy the path requirement.
- Instead, implement the equivalent canvas logic in vanilla JS and CSS, and write the setup instructions in a short doc.

## Implementation details

1. Hero markup
   - Add a `<canvas>` inside the existing `.hero` as a background layer.
   - Keep the existing real image as texture/proof if it still improves the design; if canvas becomes the primary visual, treat the photo as a subtle material layer, not a broken overlap.
   - Add a visible static fallback background via CSS so no-JS and reduced-motion remain polished.
   - Keep the Code Talent hero copy and CTA labels. Do not use the demo copy ("Reactive canvas hero", "Launch Studio", etc.).

2. Script
   - Add a canvas module in `site/script.js`.
   - Use direct canvas drawing, not React.
   - Scope mouse tracking to the hero area if practical.
   - Pause or reduce work when:
     - `prefers-reduced-motion: reduce`
     - the hero is not visible
     - page is hidden
   - Keep CPU modest: cap DPR, step x by a reasonable amount, avoid per-frame DOM reads.
   - Clean up event listeners in a way compatible with this simple static script.
   - Content visibility must not depend on the canvas.

3. CSS
   - Add canvas layering to the hero without blocking clicks.
   - Preserve readable contrast for hero copy and proof panel.
   - Keep mobile hero stable and non-overflowing.
   - Do not use gradient text.
   - Do not introduce rounded card radii above the existing system cap without a real reason.

4. Documentation
   - Add a short `REACT_COMPONENT_INTEGRATION.md` explaining:
     - This repo is static and does not currently support shadcn/Tailwind/TypeScript.
     - Default React component path would be `/components/ui` in a shadcn app.
     - Why creating `/components/ui` here without a React build would be misleading.
     - Exact setup instructions if the owner later wants to migrate:
       - create Vite/React/TypeScript or Next app
       - install Tailwind
       - run shadcn CLI
       - install `framer-motion` and `lucide-react`
       - copy the supplied component to `components/ui/glowy-waves-hero-shadcnui.tsx`
       - ensure `@/components/ui/button` exists via shadcn

5. Reports
   - Append a section to `WORKER_RAMP_REPORT.md` or create `WORKER_GLOWY_HERO_REPORT.md` with:
     - files changed
     - architecture decision (static adaptation vs React conversion)
     - verification performed
     - any owner decisions remaining

## Verification required before returning

Run all of these:
- `node --check site/script.js`
- `node --check docs/script.js`
- Verify `site/` and `docs/` copies are identical for `index.html`, `styles.css`, `script.js`, `privacy.html`.
- Browser check desktop and mobile:
  - no horizontal overflow
  - hero canvas exists
  - hero text visible
  - CTAs clickable / not covered by canvas
  - calendar iframe still present
  - `revealHiddenCount === 0`
  - no console errors except benign missing favicon
  - reduced-motion does not blank or break the hero
- Do not commit.

## Hard constraints

- Privacy policy body must remain unchanged.
- Do not invent Code Talent facts, metrics, addresses, phones, LinkedIn URLs, or emails.
- Keep all old meetup improvements intact.
- Keep `docs/` deploy output synced.
- Do not leave generated screenshots or temp files untracked.
