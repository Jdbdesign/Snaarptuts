---
inclusion: always
---

# Tech

## Stack

- Next.js **16.4.2** (App Router, Turbopack), React **19.3.0**, Tailwind CSS **4** (`@tailwindcss/turbopack`), TypeScript **5**, ESLint 9.
- Fonts via `next/font/google`: Poppins (400, 500, 600, 700) and JetBrains Mono (400, 500).
- Node 20.9+ required (tested on Node 24, npm 11). Windows 11 dev machine: use Windows-appropriate paths and commands.
- No backend, no database, no auth, no API keys. Do not introduce a backend dependency without flagging it first.
- Path alias `@/*` = project root.
- Next.js 16 has breaking changes versus older versions. Read the relevant guide in `node_modules/next/dist/docs/` before using an API you are unsure about.

## Commands

```bash
npm run dev          # http://localhost:3000, open /tutorials/snaarp-360
npx tsc --noEmit     # type check - must be clean
npm run lint         # eslint
npm run build        # production build
```

There is no automated test suite. Verify with the type check, lint, and screenshots at 1920x1080, 1440x900, 1280x720 and 390x844 (see `docs/HOW-TO-ADD-A-PRODUCT-OR-STEP.md`).

## Conventions

- Scenes are laid out at a fixed **1440px width** and scaled by a CSS transform to the stage width (design height = stage height / scale).
- Scene scripts are plain `async function runStepN(tl: Timeline)` using the helpers in `lib/timeline.ts` (`wait`, `at`, `moveCursorTo`, `click`, `scrollTo`, `scrollPanelTo`, `typeText`, `fill`, `showCaption`, `highlight`, `toast`, `setUrl`, `setVar`...). Everything is pause- and cancel-aware. Use `tl.at(ms)` anchors for beats.
- Scripts find elements with `[data-tl=name]` inside the scene's single `data-scroller` root, and drive React through scene variables (`tl.setVar` / `useTimelineVar`).
- Reuse shared components in `components/admin/`, `components/admin-panel/` and `components/icons.tsx`. All icons live in `components/icons.tsx`; real product logos are SVGs in `public/logos/` shown with `ProductLogo`.
- Keep widgets small and composable; avoid giant single-file screens. Comment only where logic is not self-evident.
- Tailwind arbitrary values are used for exact colors/sizes. Global tokens live in `app/globals.css`.
- Never edit `components/player/` or `lib/timeline.ts` just to add a step or a product.
- Never overwrite or delete `Sign_up_for_snaarp_360.mp4` or `reference.png`.

More: `docs/ARCHITECTURE.md`, `docs/TIMELINE-API.md`, `docs/DESIGN-TOKENS.md`.
