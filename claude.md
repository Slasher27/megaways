# CLAUDE.md — Megawaysonline.com

> Quick reference for Claude Code. Read `REDEVELOPMENT-PLAN.md` first for scope/phases, then the relevant `docs/` file. This file is the rules-at-a-glance; the docs are authoritative.

---

## Project

Casino affiliate site (Megaways slots + casino reviews). WordPress → Astro rebuild, staged at `megaways.vercel.app`, replacing `megawaysonline.com`. **Primary goal: zero SEO regression.**

### Stack
- **Astro 6.x** (static) + `@astrojs/vercel` adapter — the adapter (plus `scripts/patch-vercel-redirects.mjs`, run by `npm run build`) is what makes the 47 redirects real HTTP 301s. Never remove either.
- **Tailwind CSS 4.x** via `@tailwindcss/vite` — config is CSS `@theme` tokens in `src/styles/global.css` (no JS config).
- **Alpine.js** for interactivity (**Alpine only — there is no Svelte in this project**).
- **astro-icon** (Lucide, MDI, Phosphor). **MDX** content collections.

### Commands
```bash
npm run dev | build | preview
npx astro check
```

---

## Critical rules

1. **Canonical slugs + redirect.** One clean standard: slot `slug` = name, **no `-review`**; casino `slug` = bare name (route adds `-casino-review`). Typos fixed (`viking`, `spicy-meatballs`). Every differing legacy URL 301s to canonical in `docs/redirects.csv`. → `docs/ARCHITECTURE.md`, `docs/CONTENT-SCHEMAS.md`.
2. **Trailing slash always** (`trailingSlash: 'always'`).
3. **Flat slots:** `/online-slots/[slug]/`. Never nest under provider.
4. **Redirects never target an indexed URL.** Source: `docs/redirects.csv`. → `docs/ARCHITECTURE.md`.
5. **CSS before JS.** Use native HTML/CSS (`<details>`, popover, `:has()`, scroll-snap) before Alpine. Adding an Alpine component requires a "CSS can't because…" justification. → `docs/STYLING.md`.
6. **Reuse before building.** Check the component library before making anything new. One-offs stay inline. → `docs/COMPONENTS.md`.
7. **DRY, no creep.** The codebase should shrink in Phase 4, not grow.
8. **Affiliate links:** `rel="sponsored nofollow" target="_blank" referrerpolicy="no-referrer"`. → `docs/SEO-GUIDELINES.md`.
9. **YMYL accuracy.** Verify RTP/maxWin/volatility — never hallucinate gambling stats.
10. **No TS annotations inside Astro template expressions** (frontmatter fence only).
11. **Never name a component prop `slot`.** On a direct child of another component, Astro treats `slot={…}` as a named-slot assignment and silently drops the element (this cost slot pages their JSON-LD once). Use `slotData` etc.
12. **JSON-LD schema components render INSIDE layouts** (body is fine) — never before the layout tag, or they emit outside `<html>` and push the charset past 1024 bytes.

---

## Docs map

| Need | Read |
|---|---|
| Scope, phases, gates | `REDEVELOPMENT-PLAN.md` |
| Where we are | `PROGRESS.md` |
| URLs, routing, redirects, slug rule | `docs/ARCHITECTURE.md` |
| Rebuild content / Wayback / demo iframes | `docs/MIGRATION.md` |
| Meta, schema, sitemap, robots, E-E-A-T, AI | `docs/SEO-GUIDELINES.md` |
| Collection frontmatter | `docs/CONTENT-SCHEMAS.md` |
| Component organisation | `docs/COMPONENTS.md` |
| Tokens, CSS-over-JS, a11y | `docs/STYLING.md` |
| Step-by-step tasks + checklists | `docs/WORKFLOWS.md` |
| Parity checklist (data) | `docs/indexed-urls.csv` |
| Redirect map (data) | `docs/redirects.csv` |

`docs/` is development-only and not deployed.

---

## For Claude Code

1. Check the relevant doc before starting; don't infer rules from memory.
2. Respect phase gates in `REDEVELOPMENT-PLAN.md` — don't jump ahead.
3. Verify every page against the checklist in `docs/WORKFLOWS.md`.
4. Update `PROGRESS.md` at the end of each session.
5. Terse, minimal, DRY output — match the project's no-creep standard.
