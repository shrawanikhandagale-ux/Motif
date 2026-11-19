# MOTIF — Creative Business & Marketing OS
Tagline: "Built for the offscript."

## Project Overview
One interconnected ecosystem with five departments: LEARN, CREATE, MARKET, MANAGE, ANALYZE & GROW. One account, one workspace, shared records. NOT five separate apps.

## Stack
React + TypeScript, Vite, Tailwind CSS v4 (theme variables in CSS), Motion, lucide-react, react-router-dom. No backend yet: typed mock data and localStorage. Install nothing else without asking.

## Repo Structure
Follow exactly, do not create parallel folders:
- `src/app`: App.tsx, routes.tsx, providers/
- `src/assets/styles/index.css`: all design tokens and global styles
- `src/components/ui`: base components. `components/layout`: shell and navigation. `components/shared`: reusable cross-department pieces
- `src/modules/{learn,create,market,manage,analyze}/{components,pages,hooks,services}`
- `src/services/{api,auth,storage}`: api and auth stay empty stubs until Supabase; storage holds the localStorage progress store
- `src/types`: shared TypeScript types. `src/hooks`, `src/lib`, `src/utils`, `src/constants` for shared code
- Mock data lives in `src/modules/<dept>/services/mock/`. Components never import mock files directly: they go through a service function (e.g. getPaths()) so Supabase can replace it later.
- Reference prototype for the look: `docs/design/reference/motif.html`

## Design Direction
Sophisticated brand with a rebellious personality; an independent creative publication mixed with a professional workspace. NOT a generic SaaS dashboard: no uniform card grids, no purple gradients, no default blurred shadows.
- **Palette**: ivory `#F1EBDD`, ink `#171717`, oxblood `#702C35`, acid `#D9E638`, electric `#A8B8E8`, light and dark modes.
- **Type**: display Bricolage Grotesque 800 with tight tracking, body Instrument Sans, metadata DM Mono.
- **Style**: 2px ink borders, hard offset shadows, slight rotations on accents, halftone dots, cut-and-paste details, oversized editorial headings.

## Rules
- The landing page may be experimental. App screens (lists, forms, boards) must be calm, readable and usable. Personality lives in headings, accents, tiles and transitions.

## Quality
- Accessible (focus states, semantic HTML, contrast), responsive to 375px, respect prefers-reduced-motion, typographic apostrophes in visible text, small typed components (under about 150 lines), run the build and fix type errors after each task.

