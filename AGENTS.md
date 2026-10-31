# AGENTS.md - Snaarp Tutorials

Rules for any AI coding tool or developer working in this repo. The longer version is `CLAUDE.md`; the full documentation is in `docs/`. **Read `docs/HANDOFF.md` and `docs/ARCHITECTURE.md` first.**

## What this is

Full-screen, auto-playing, step-by-step tutorials that teach people how to sign up for and use Snaarp products. Real HTML/CSS screens driven by a script (fake cursor, captions, highlights). Route: `/tutorials/<product-id>`. First product: Snaarp 360 (5 steps + completion screen, all built).

## Stack and commands

Next.js 16.4.2 (App Router, Turbopack), React 19.3.0, Tailwind CSS 4, TypeScript 5. Node 20.9+ (tested on 24). No backend, no auth.

- `npm run dev` - dev server at http://localhost:3000 (open `/tutorials/snaarp-360`)
- `npx tsc --noEmit` - type check (must be clean)
- `npm run lint` - eslint
- `npm run build` - production build

Dev machine is Windows 11. Use Windows-appropriate paths and commands.

## How we work

- Before writing or editing any scene script, read docs/SCENE-PATTERNS.md. Every 'Click X' caption must call click(); copy the structure of scenes/snaarp-sheets/step20/script.ts.
- The owner is a product designer and does not write code. Give short, plain summaries. Do not explain technical steps unless asked. Give numbered steps for anything to do by hand.
- Build **one step (one video segment) per round**. Finish, verify, then stop and wait for feedback.
- Do not build a step or product until the owner asks.
- Never overwrite or delete `Sign_up_for_snaarp_360.mp4` or `reference.png`. The video is reference only: never embed it or screenshots in the app. AI tools cannot watch video; extract frames with ffmpeg (`docs/HOW-TO-ADD-A-PRODUCT-OR-STEP.md`).

## Architecture rules

- The player shell (`components/player/`) and the scenes (`scenes/<product>/`) are separate. Adding a step or product must never require editing the shell.
- One config file per product in `tutorials/` (`tutorials/types.ts` defines it); register it in `tutorials/index.ts`.
- Scenes are built at a **1440px design width** and scaled by CSS transform to the frame width; design height = frame height / scale.
- Steps are driven by the shared timeline in `lib/timeline.ts` (`wait`, `at`, `moveCursorTo`, `click`, `scrollTo`, `showCaption`, `highlight`, `typeText`, `toast`...). It supports pause and cancellation. See `docs/TIMELINE-API.md`.
- Every scene needs one `data-scroller` root; scripts find elements with `[data-tl=name]`.
- All icons live in `components/icons.tsx`. Real product logos are in `public/logos/` (`ProductLogo`). Do not crop icons out of video frames.
- Next.js 16 differs from older versions. Read the relevant guide in `node_modules/next/dist/docs/` before using an API you are unsure about.

## Product requirements

- Page fills 100vw x 100dvh: no document scroll, no letterboxing, no empty bands.
- Autoplays on load. Space = pause/resume. Collapse rail. Click a built step in the rail to jump to it. Respect `prefers-reduced-motion`.
- Must work at 1920x1080, 1440x900, 1280x720 and 390x844. Below 900px wide the rail auto-collapses and the icon rails / dark login panels hide.
- There is no Cancel button: it was removed on the owner's request (restore from the git commit "Add Cancel button to player shell").

## Content and design rules

- No real personal data. Use Jane Doe, jane@acme-studio.com, acme-studio.com, Sam Lee, example.com.
- Captions: short, imperative, name exactly what to click ("Click Start 14-day free trial").
- Copy must match the real Snaarp pages unless the owner says otherwise. Prices use the pound sign (to be confirmed, see `docs/DECISIONS-AND-DEVIATIONS.md`).
- Font Poppins (400/500/600/700). Brand purple `#7014D9`, text `#111111`, secondary `#6B7280`, page `#F6F6F8`.
- Each surface keeps its own colors: marketing and sign-up = brand purple; admin sign-in = near-black + blue; owner admin portal = black buttons; Admin Panel = purple; user login = black Login button. Do not unify them. Details: `docs/DESIGN-TOKENS.md`.

## Definition of done for every step

1. Runs end to end from autoplay with no console errors.
2. Screenshots at 1920x1080 and 1280x720, partway through, match the extracted video frames and `reference.png`.
3. No scrollbars, no clipped text, nothing cut off.
4. `npx tsc --noEmit` and `npm run lint` clean; docs updated.
5. Tell the owner the route to open and what to press to test, then stop.

## Docs

- `docs/HANDOFF.md` - state, history, known issues, next ideas, starter prompt
- `docs/ARCHITECTURE.md` - folder map, player and timeline, config format
- `docs/TIMELINE-API.md` - helpers and shared components
- `docs/STEPS.md` - every step in detail
- `docs/DESIGN-TOKENS.md` - tokens and per-surface rules
- `docs/DECISIONS-AND-DEVIATIONS.md` - deviations from the recording, things to replace before launch
- `docs/HOW-TO-ADD-A-PRODUCT-OR-STEP.md` - recipes, ffmpeg, testing
- `.kiro/steering/` - Kiro steering files

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
