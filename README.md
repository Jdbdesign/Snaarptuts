# Snaarp Tutorials

Full-screen, auto-playing, step-by-step tutorials that teach people how to sign up for and use Snaarp products.
Every screen is rebuilt as real HTML/CSS (no video, no screenshots) and driven by a small script with a fake cursor,
captions and highlights. The first tutorial is **Snaarp 360** (5 steps + a completion screen). More products will follow.

## Run it

Needs Node.js 20.9 or newer (built and tested on Node 24, npm 11).

```bash
npm install
npm run dev          # http://localhost:3000
npx tsc --noEmit     # type check
npm run lint         # eslint
npm run build        # production build
```

Open **http://localhost:3000/tutorials/snaarp-360**. The root route `/` redirects there.
Other product routes follow the pattern `/tutorials/<product-id>` (for example `/tutorials/snaarp-mail`, which is listed but not built yet).

## Controls

| Control | What it does |
|---|---|
| Autoplay | Starts on load, no click needed. Steps advance by themselves. A finished step gets a tick in the rail. |
| Space | Pause / resume (typing, scrolling, toasts, CSS animations all freeze). |
| Collapse (rail) | Hides the left step rail. A small button next to the traffic lights brings it back. Below 900px wide the rail is a slide-over drawer. |
| Click a step in the rail | Jumps to that step (only built steps are clickable). |
| Product card in the rail | Opens a dropdown of all products. Picking one opens that product's tutorial. |
| Replay tutorial | On the completion card at the end. Autoplay stops until it is clicked. |

There is no Cancel button (removed on the owner's request; it can be restored from the git commit "Add Cancel button to player shell").

## Docs

New here, or an AI tool picking this up? Read in this order:

1. [`docs/HANDOFF.md`](docs/HANDOFF.md) - state of the project, history, known issues, next ideas, starter prompt
2. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) - folder map, how the player and scenes work, config format
3. [`CLAUDE.md`](CLAUDE.md) / [`AGENTS.md`](AGENTS.md) - standing rules for working on the project

Reference:

- [`docs/TIMELINE-API.md`](docs/TIMELINE-API.md) - every timeline helper and shared UI component
- [`docs/STEPS.md`](docs/STEPS.md) - each step: screens, URLs, sample data, timeline
- [`docs/DESIGN-TOKENS.md`](docs/DESIGN-TOKENS.md) - fonts, colors, radii, per-surface rules
- [`docs/DECISIONS-AND-DEVIATIONS.md`](docs/DECISIONS-AND-DEVIATIONS.md) - where we differ from the recording, and what to replace before launch
- [`docs/HOW-TO-ADD-A-PRODUCT-OR-STEP.md`](docs/HOW-TO-ADD-A-PRODUCT-OR-STEP.md) - recipes and the definition of done

Source material kept in the project root: `Sign_up_for_snaarp_360.mp4` (the screen recording) and `reference.png` (the player layout). Never overwrite or delete them.
