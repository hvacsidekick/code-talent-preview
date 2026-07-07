# Design

Visual system for the Code Talent brand site. Captured from the shipped static build in `site/` (mirrored to `docs/`). Identity is committed and preserved: the `code.` wordmark, indigo `#4B4BD2`, and an ink/paper base. This document describes how the system looks so future variants stay on-brand.

## Theme

Light-first, editorial, with two deep ink sections for depth and one indigo-washed section that frames community as a primary proof asset. Not a monochrome card site: rhythm comes from alternating paper / warm / ink / indigo-wash bands, an asymmetric editorial layout, and a mono label voice tied to the `code.` identity. Strategy: **restrained** on color (tinted neutrals + one committed indigo accent), **committed** on typography and layout.

## Color

Brand identity colors are fixed (hex, preserved). Neutrals are lightly indigo-tinted rather than warm-by-default.

| Token | Value | Role |
|-------|-------|------|
| `--ink` | `#0b0d12` | Deep sections (hero, pillars, contact), primary display ink |
| `--ink-soft` | `#14161d` | Raised ink surfaces, hover ink |
| `--paper` | `#ffffff` | Default body surface |
| `--paper-warm` | `#f7f4ee` | Alternating band (process, insights) |
| `--paper-cool` | `#f3f4f8` | Roles panel, service row hover |
| `--text` | `#14161d` | Body text on light |
| `--text-muted` | `#4a5061` | Secondary body text (~7.8:1 on white — AA) |
| `--indigo` | `#4b4bd2` | Primary CTA, accents, labels, links (~5.8:1 on white) |
| `--indigo-strong` | `#3a3ab0` | Button hover |
| `--indigo-deep` | `#2a2a72` | Emphasis text on indigo-wash |
| `--indigo-wash` | `#edecfb` | Community section surface (distinct visual world) |

Contrast is verified for AA: muted body text ≥4.5:1 on every surface it appears on; indigo text/links clear 4.5:1 on white; white and rgba-white text on ink clear AA. Indigo is used sparingly — CTAs, links, mono labels, and the one community-wash band — never as large fills.

## Typography

Committed brand pairing, preserved from the source identity. One display family with weight/size contrast, a monospace companion carrying the `code.` voice, and a neutral body workhorse.

- **Display** — `Chivo` (700–900). Headings, wordmark-adjacent display. `letter-spacing: -0.02em` (h1 `-0.03em`), `text-wrap: balance`.
- **Mono** — `Chivo Mono` (400–600). The `code.` wordmark, `// section` labels, service/group indices, tags, metadata. This is the brand's "technical" voice; used deliberately, not as decoration.
- **Body** — `Inter` (400–600). Paragraphs and UI text. `text-wrap: pretty`, measure capped 44–65ch.

Scale is fluid `clamp()`. Display ceiling is held at the Impeccable cap: `h1` max `5.25rem` (~84px, below the 6rem shout line), `h2` max `3.25rem`. Line length capped 15–20ch on headings, ≤65ch on prose.

## Layout

- Container: `min(1180px, 100% - 48px)`, centered.
- Editorial over uniform grids. Employer stages and the services ledger are **row lists with dividers and hanging indices**, not identical card grids. Process is a 4-column track with a top rule per step (a real sequence, so numbers earn their place). Team and insights use breakpoint-free `repeat(auto-fill/auto-fit, minmax(...))`.
- Section rhythm: `padding: clamp(72px, 8vw, 118px)` vertical, varied per section for cadence.
- Responsive: single-column stack below 1040px; 2-up proof/process; full stack below 640px. No horizontal overflow at 320px+.

## Components

- **Buttons** — pill, indigo fill (primary) / translucent outline (secondary on ink) / ink fill (secondary-dark). Hover: `translateY(-2px)` + shadow + arrow nudge; `:active` scale 0.98.
- **Cards** — used only where they are the right affordance (team, insights, roles, host-CTA). Shadows over heavy borders (`--shadow-1/2`, multi-layer); radii capped at 14px. No nested cards.
- **Calendar module** — framed white panel embedding the Google Calendar agenda (`mode=AGENDA`, America/Denver), titled `<iframe>`, with a visible "Open full calendar" link and a text fallback.
- **Groups directory** — dense indexed `repeat(auto-fill, minmax(240px, 1fr))` list, mono index + name, divider rows. Replaces the old pill cloud.
- **Contact form** — labeled fields, indigo focus border, live-region status note; "Host a meetup" CTA preselects the matching reason.

## Motion

Purposeful only (Jakub-primary polish, Jhey first-load, Emil nav/forms). Materials: `opacity` + `translateY` + `blur` enters; `transform`/`opacity`/`filter` only — never layout properties.

- **First load** — hero content reveals in a short stagger (80ms steps) via a JS-gated class.
- **Scroll reveal** — IntersectionObserver adds `.is-visible`; grouped items stagger 60ms. Content is visible by default and only animated when `html.js` is set before paint, so nothing ships blank without JS.
- **Feedback** — nav underline wipe, button hover/press, card shadow lift, input focus, stat count-up.
- Easing: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` (no bounce/elastic). Durations 150–620ms by element size.
- **Reduced motion** — `prefers-reduced-motion: reduce` neutralizes all transitions/delays and forces reveals to their final visible state; count-up renders the final number.

## Accessibility

WCAG 2.1 AA target. Skip link, semantic landmarks, labeled controls, `aria-expanded` mobile nav with Escape-to-close, visible focus rings, keyboard-operable throughout, titled calendar iframe with text fallback, AA contrast in both light and ink contexts, and full reduced-motion safety.
