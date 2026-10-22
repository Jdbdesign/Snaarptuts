# Handoff - read this first

## What this project is

Snaarp Tutorials are full-screen, auto-playing, step-by-step tutorials that teach people how to sign up for and use Snaarp products. Each one lives on its own page (`/tutorials/<product-id>`). The screen is a left step rail plus a "browser window" in the middle. Inside the window a fake cursor clicks, types and scrolls through **real HTML/CSS screens** (not a video, not screenshots), with short captions telling the viewer what to click.

First product: **Snaarp 360**. More products will follow, each with its own modules (steps).

**The owner is a product designer and does not write code.** Give short, plain-language summaries. Do not explain technical steps unless asked. When something must be done by hand, give clear numbered steps. Build **one step per round**, verify it, then stop and wait for feedback.

## Current state

- Snaarp 360: **all 5 steps built and working**, plus the **completion screen**. Plays about 2:04 hands off from page load to the completion card. Verified at 1920x1080, 1440x900, 1280x720 and 390x844: no console errors, no scrollbars, no document scroll.
- Product switcher in the rail: a dropdown of products (Snaarp 360 first). **Snaarp Mail** is listed with 10 modules, none built yet (it shows "coming soon").
- Real Snaarp product logos are in place on the pricing page, sign-up page, products home, both admin icon rails and the rail. Other icons are still redrawn placeholders.
- No backend, accounts, cloud sync or AI features (named exclusions for v1). No automated tests. The folder is **not a git repository** (see known issues).

| Step | Title | Status |
|---|---|---|
| 1 | Choose your plan | Done |
| 2 | Create your account | Done |
| 3 | Sign in to Admin | Done |
| 4 | Add and verify your domain | Done |
| 5 | Add your first user | Done |
| - | Completion screen | Done |

## Snaarp Mail (latest)

Steps 1-6 of 9 are built (`tutorials/snaarp-mail.ts`). Step 6 introduced **`components/cloudflare/CloudflareChrome.tsx`**: the reusable Cloudflare dashboard frame (top bar, left menu, content area, "illustration" footnote); pass `active` ("overview" | "dns"), `domain`, `onNavigate` and the page as children. It is an illustration, to be checked against the live dashboard before launch. Step 6 also added `tl.paste()` to the timeline (instant paste + flash for long values) and a `below-bar` toast position. Step 3 introduced **`components/onboarding/OnboardingShell.tsx`**: the dark progress sidebar + white content area used by the onboarding screens. Steps 4-9 should wrap their screen in `<OnboardingShell active="domain" | "dns" | "users" | "done">` and only change that value; sidebar items live in `ONBOARDING_ITEMS` in the same file. See `docs/STEPS.md` (Mail sections) and `CLAUDE.md` (Build status). **DNS records:** `scenes/snaarp-mail/dns-data.ts` defines the five records once (`DNS_RECORDS`, `DOMAIN`, `MAIL_SERVER`); steps 6 (Cloudflare) and 7 (confirm the records) must import them, never copy values. **`components/onboarding/DnsRecordCard.tsx`** is the reusable record card with a pending/verified state (scene variable `dns:<id>`; click `[data-tl=mark-<id>]` or `tl.setVar` to verify) and `OnboardingShell` has an `overlay` prop for modals. Parts of this file below predate the Cancel button, git and Mail work and are out of date.

## Build history (in order)

1. **Round 1 - player shell + step 1.** Next.js app, the rail + browser frame layout from `reference.png`, the scene scaler (1440px design width), the timeline engine (cursor, click, scroll, captions, highlight, pause, cancel), step 1 (pricing page).
2. **Round 2 - step 2.** Sign-up page with orbit animation, typed fields, password rules, scrolling form, loading state.
3. **Round 3 - step 3.** Multi-screen step (products home, loading, admin sign-in, dashboard). Added the shared `AdminLayout`, toast, count-up, white fade between screens, `setUrl`.
4. **Round 4 - step 4.** Domain Management, Add Domain modal, DNS tab with copy icons, dropdown menu, verification. Shared `Modal`, `DropdownMenu`, `CopyButton`.
5. **Round 5 - step 5 + completion screen.** Add User modal with inner scroll, user login, products home for the new user, a second layout (`AdminPanelLayout`), new shared form pieces, completion card.

After round 5 (smaller requests from the owner):

- Real product logos from `public/logos/` replaced placeholder glyphs on the pricing page (tabs; plan cards now show the owner's list of 17), the sign-up page (orbit, header, plan badge), the products home grid and both admin icon rails; the rail's product card shows the 360 logo.
- Rail product card became a **product dropdown**; added the `Snaarp Mail` config with 10 unbuilt modules and a "coming soon" stage.
- This documentation set.

## Known issues and rough edges

1. **Cancel button is not built.** `CLAUDE.md` and `reference.png` describe a Cancel button at the top right that posts `{type:"snaarp-tutorial-cancel"}` to the parent window. No such button or `postMessage` exists in the code yet.
2. **Not a git repo.** There is no version control. Run `git init` and commit before more work. `.gitignore` is already the Next.js default. `frames_step5/` (extracted frames), `tsconfig.tsbuildinfo` and the 81 MB recording are in the folder and should be considered before committing (the recording is source material and should not be deleted).
3. **Step 4 URL pill.** Step 4 starts on the dashboard but the pill already shows `admin.snaarp.com/admin/domains` (the script never calls `setUrl`). A small fix if wanted: call `tl.setUrl("admin.snaarp.com/admin")` at the start and set the domains address when Domains is clicked.
4. **Rail counts of other products read `0/N`**, and jumping to a later step via the rail shows `0/5` because progress is only recorded while steps play. Progress is not saved between pages.
5. **Domain "Created" date is today's date**, so screenshots change day to day.
6. **Mail module URLs are guesses** (`mail.snaarp.com/inbox` for all ten).
7. **Narrow screens (under 900px) show the desktop design scaled down**, with the small tweaks listed in `DESIGN-TOKENS.md`; it is not a separate mobile layout.
8. **`CLAUDE.md` step map** says steps 4 and 5 start at 0:48 and 1:15 in the recording; `docs/STEPS.md` uses 0:46 and 1:13 (the owner's map).
9. Next.js 16 differs from older versions. `AGENTS.md` carries an auto-generated block telling tools to read `node_modules/next/dist/docs/` before using unfamiliar APIs. Keep that block.
10. Headless-browser tip: a screenshot taken before hydration finishes logs a harmless hydration warning (Playwright injects a caret style). Wait for `networkidle` and use `caret: "initial"`. A modal ghost-line artifact seen in headless screenshots was fixed with `[transform:translateZ(0)]` on the modal scroll panel (`components/admin/Modal.tsx`); do not remove it.

## Next ideas (prioritized)

1. Build the **Cancel button** (top right of the stage) with the `postMessage`, and test it from a parent page.
2. `git init`, first commit, decide on hosting.
3. **Snaarp Mail modules** (start with "Compose email"), then Meet, Teams, Me, Lock, Drive and the rest. The owner will supply each product's module list; do not invent module names.
4. Replace the remaining **placeholder icons** with the real Snaarp icons (single file: `components/icons.tsx`).
5. **Hosting and embedding** via iframe; verify full-height behavior and the cancel message.
6. Save **progress** per product (for example in `localStorage`) so the dropdown counts are real.
7. **Analytics hooks**: events for tutorial start, step start/complete, cancel, replay (the shell has clear places: `start`, `handleDone`, `handleAdvance`, `replay` in `TutorialPlayer.tsx`).
8. **Mobile layout review**: decide whether phones need a dedicated layout instead of a scaled desktop one.
9. Keep a small Playwright script in the repo to automate the per-step checks.
10. Confirm copy, currency, DNS values and hostnames with the product team (`DECISIONS-AND-DEVIATIONS.md`, "Things to replace before launch").

## How to work on it (rules in short)

- Read `CLAUDE.md` / `AGENTS.md` and `docs/ARCHITECTURE.md` first. Everything is documented in `docs/`.
- **Never** overwrite or delete `Sign_up_for_snaarp_360.mp4` or `reference.png`. The video is a reference only; never embed it, and never embed screenshots.
- Do not build a step or product until the owner asks for it. One step per round.
- Do not edit the player shell when adding a step or product.
- No real personal data: use Jane Doe, jane@acme-studio.com, acme-studio.com and similar.
- Keep each surface's colors (owner portal black, Admin Panel purple, admin sign-in blue, user login black button).
- Run `npx tsc --noEmit` and `npm run lint` before calling work done.

## Starter prompt for a new AI tool

Copy and paste this:

```
You are joining the "Snaarp Tutorials" project (Next.js 16, React 19, Tailwind 4, TypeScript).
Before doing anything, read these files in order:
1. docs/HANDOFF.md
2. docs/ARCHITECTURE.md
3. CLAUDE.md (and AGENTS.md)
Then skim docs/TIMELINE-API.md and docs/HOW-TO-ADD-A-PRODUCT-OR-STEP.md when you need them.

Rules: the owner is a product designer who does not code, so keep summaries short and plain.
Build ONE step per round, verify it (type check, lint, screenshots at 1920x1080, 1440x900, 1280x720, 390x844),
then stop and wait for feedback. Never touch the player shell to add a step or product.
Never overwrite or delete Sign_up_for_snaarp_360.mp4 or reference.png. Use sample data only.

Do not start building yet. Tell me, in five lines, what you understood about the project and its current state,
then ask me what to build.
```
