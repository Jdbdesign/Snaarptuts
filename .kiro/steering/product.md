---
inclusion: always
---

# Product

**Snaarp Tutorials** are full-screen, auto-playing, step-by-step tutorials that teach people how to sign up for and use Snaarp products. Each tutorial lives on its own page (`/tutorials/<product-id>`) and can be embedded. First product: **Snaarp 360** (5 steps + a completion screen, all built). Snaarp Mail is listed with 10 modules, not built yet.

## Who it is for

- **Viewers**: people signing up for or starting to use a Snaarp product. They watch, they do not click through.
- **The owner**: a product designer who does not write code. Keep explanations short and plain. Build one step per round, then wait for feedback.

## Experience goals

- The page fills the whole window (100vw x 100dvh): no scrolling page, no letterboxing, no empty bands.
- It autoplays on load. A left rail lists the steps (a ✓ appears when a step finishes) and a product dropdown. A "browser window" in the middle shows a real HTML/CSS rebuild of each screen with a fake cursor, a short caption ("Click Start 14-day free trial") and a pulsing purple highlight ring.
- Controls: Space = pause/resume, Collapse the rail, click a built step to jump to it, Replay on the completion card. (A Cancel button that posts `{type:"snaarp-tutorial-cancel"}` to the parent window is specified but not built yet.)
- Works at 1920x1080, 1440x900, 1280x720 and 390x844; respects reduced motion.
- No real personal data anywhere (sample data only: Jane Doe, jane@acme-studio.com, acme-studio.com).
- The video recording is reference only. Never embed the video or screenshots.

## Out of scope for v1

Backend, accounts, cloud sync, AI features.

More: `docs/HANDOFF.md`, `docs/STEPS.md`.
