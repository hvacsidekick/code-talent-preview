# Claude Code Worker Fix Brief: Reveal Blank Sections

Work in `C:\Users\robin\code-talent-redesign`.

You are the builder. Codex is only auditing. Do not commit or push.

## Problem Found By Codex Audit

Independent Playwright audit at `http://127.0.0.1:4188/index.html` showed large blank bands in desktop and mobile full-page screenshots. Metrics:

- desktop `revealHiddenCount`: 42
- mobile `revealHiddenCount`: 46
- no horizontal overflow, calendar iframe ok, but many sections are opacity 0 until scroll.

This violates the Impeccable/motion requirement you stated in your own report:

> Content is visible by default and only animated when `html.js` is set before paint, so nothing ships blank without JS.

Full-page screenshots and headless renderers do not trigger every scroll reveal, so sections must not remain blank. Reveal motion must enhance visible content, not gate it.

## Required Fix

Use `/design-motion-principles` Create-mode judgment for the correction. Make the reveal system safe:

- Content must be readable/visible in full-page screenshots before any scrolling.
- Scroll reveal may still add subtle transform/filter polish when a section enters viewport, but opacity must not leave content invisible offscreen.
- Prefer a safe default such as opacity 1 with small transform/filter only when JS adds a class, or use animation that does not hide content.
- Preserve reduced-motion behavior.
- Update both `site/` and `docs/`.
- Update `DESIGN.md` and `WORKER_RAMP_REPORT.md` if their motion claims need adjustment.

## Verification Required

Run a browser check that evaluates:

- desktop and mobile `revealHiddenCount === 0`
- `document.documentElement.scrollWidth - clientWidth === 0`
- calendar iframe source includes `calendar.google.com`
- `site/` and `docs/` remain byte-identical for index/styles/script/privacy

Write a short addendum in `WORKER_RAMP_REPORT.md` under an `Audit Fix Addendum` heading with what changed and verification results.
