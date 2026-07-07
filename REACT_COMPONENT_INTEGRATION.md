# React Component Integration — GlowyWavesHero

## What this repo is (and isn't)

This preview is a **static site**: hand-authored `index.html`, `styles.css`, and
`script.js` served straight from `docs/` by GitHub Pages. There is **no build
step, no bundler, no package manager, no TypeScript, no Tailwind, and no
shadcn/ui**. That is deliberate — GitHub Pages can render it as-is, with zero
CI, the moment it's pushed.

The original `GlowyWavesHero` was a **React + shadcn/ui** component using
`framer-motion` for animation and `lucide-react` for icons, authored against
Tailwind utility classes and shadcn's import aliases. None of those runtimes
exist here.

**What shipped instead:** a self-contained vanilla `<canvas>` module in
`script.js` (`[data-hero-waves]`) that reproduces the essence of the React
component — glowing multi-wave lines, additive blending, a smoothed pointer
bulge — with no dependencies. It respects `prefers-reduced-motion`, pauses when
offscreen or when the tab is hidden, and caps DPR. This is what lets the effect
render on GitHub Pages **today** without a toolchain.

If you later stand up a real React app, the sections below are the exact path to
dropping the original component in.

---

## The `/components/ui` path matters

In a shadcn/ui project the default component install path is:

```
components/ui/
```

This is not cosmetic. The shadcn CLI writes generated primitives (button, card,
etc.) into `components/ui`, and every generated import assumes that location via
the path alias configured in `components.json` and `tsconfig.json`:

```jsonc
// components.json
{
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui"
  }
}
```

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}
```

So a component that does `import { Button } from "@/components/ui/button"` only
resolves if `@` maps to the project root **and** the primitive lives in
`components/ui`. Put `GlowyWavesHero` anywhere, but keep the shadcn primitives it
imports under `@/components/ui`, or its imports break at build time.

---

## Migration / setup (real React project)

### Option A — Vite + React

```bash
# 1. Scaffold
npm create vite@latest code-talent -- --template react-ts
cd code-talent
npm install

# 2. Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# add the @tailwind directives to src/index.css and content globs to tailwind.config.js

# 3. Path alias — add to tsconfig.json and vite.config.ts:
#    tsconfig:  "baseUrl": ".", "paths": { "@/*": ["./src/*"] }
#    vite:      resolve.alias { "@": path.resolve(__dirname, "./src") }

# 4. shadcn (writes to components/ui per components.json)
npx shadcn@latest init
npx shadcn@latest add button card

# 5. Animation + icons used by GlowyWavesHero
npm install framer-motion lucide-react
```

### Option B — Next.js

```bash
npx create-next-app@latest code-talent --typescript --tailwind --eslint --app
cd code-talent
npx shadcn@latest init          # confirm components dir = components/ui
npx shadcn@latest add button card
npm install framer-motion lucide-react
```

### Drop the component in

1. Place the supplied component at the path it was authored for — e.g.
   `components/ui/glowy-waves-hero.tsx` (or wherever the source header specifies).
   Keep the shadcn primitives it imports under `@/components/ui`.
2. Verify its imports resolve against your alias (`@/components/ui/*`,
   `framer-motion`, `lucide-react`).
3. Render it in your page/route and confirm Tailwind classes apply.

---

## Summary

| | Original | Shipped here |
|---|---|---|
| Framework | React + shadcn/ui | Vanilla HTML/CSS/JS |
| Styling | Tailwind | Hand-authored `styles.css` |
| Animation | framer-motion | `requestAnimationFrame` on `<canvas>` |
| Icons | lucide-react | inline HTML entities |
| Component path | `@/components/ui` | `[data-hero-waves]` in `script.js` |
| Deploy | needs build step | static, GitHub Pages renders now |

The vanilla adaptation is the pragmatic choice for a zero-build GitHub Pages
preview. When a real React app exists, follow the steps above to run the original
`GlowyWavesHero` unchanged.
