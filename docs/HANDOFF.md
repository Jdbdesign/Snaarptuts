# Handoff - read this first

## What this project is

Snaarp Tutorials are full-screen, auto-playing, step-by-step tutorials that teach people how to sign up for and use Snaarp products. Each one lives on its own page (`/tutorials/<product-id>`). The screen is a left step rail plus a "browser window" in the middle. Inside the window a fake cursor clicks, types and scrolls through **real HTML/CSS screens** (not a video, not screenshots), with short captions telling the viewer what to click.

First product: **Snaarp 360**. More products will follow, each with its own modules (steps).

**The owner is a product designer and does not write code.** Give short, plain-language summaries. Do not explain technical steps unless asked. When something must be done by hand, give clear numbered steps. Build **one step per round**, verify it, then stop and wait for feedback.

**Repository:** https://github.com/Jdbdesign/Snaarptuts (branch `main`). Source videos and reference images live in `ref/` and are intentionally not in git.

## Current state

- Snaarp 360: **all 5 steps built and working**, plus the **completion screen**. Plays about 2:04 hands off from page load to the completion card. Verified at 1920x1080, 1440x900, 1280x720 and 390x844: no console errors, no scrollbars, no document scroll.
- Product switcher in the rail: a dropdown of products (Snaarp 360 first). **Snaarp Mail** is listed with 9 steps, all built.
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

**All 9 steps are built** (`tutorials/snaarp-mail.ts`; about 4:00 from load to the "You're all set" card). Step 9 follows the owner's design `ref/mail/setup-completed.png`, uses an optional `completed` setting on `OnboardingShell`, and reuses the 360 dashboard through an optional `stats` setting. See the launch checklist in `docs/DECISIONS-AND-DEVIATIONS.md`. Step 8 follows the owner's design `ref/mail/users-inbox.png` and reuses the 360 `AddUserModal` through its optional `user` setting. Step 7 reuses the step 5 scene (`Step5Dns`) with its own script (`step7-script.ts`); the scene has optional variables `holdContinue` and `bottomRoom` for it. Step 6 introduced **`components/cloudflare/CloudflareChrome.tsx`**: the reusable Cloudflare dashboard frame (top bar, left menu, content area, "illustration" footnote); pass `active` ("overview" | "dns"), `domain`, `onNavigate` and the page as children. It is an illustration, to be checked against the live dashboard before launch. Step 6 also added `tl.paste()` to the timeline (instant paste + flash for long values) and a `below-bar` toast position. Step 3 introduced **`components/onboarding/OnboardingShell.tsx`**: the dark progress sidebar + white content area used by the onboarding screens. Steps 4-9 should wrap their screen in `<OnboardingShell active="domain" | "dns" | "users" | "done">` and only change that value; sidebar items live in `ONBOARDING_ITEMS` in the same file. See `docs/STEPS.md` (Mail sections) and `CLAUDE.md` (Build status). **DNS records:** `scenes/snaarp-mail/dns-data.ts` defines the five records once (`DNS_RECORDS`, `DOMAIN`, `MAIL_SERVER`); steps 6 (Cloudflare) and 7 (confirm the records) must import them, never copy values. **`components/onboarding/DnsRecordCard.tsx`** is the reusable record card with a pending/verified state (scene variable `dns:<id>`; click `[data-tl=mark-<id>]` or `tl.setVar` to verify) and `OnboardingShell` has an `overlay` prop for modals. Parts of this file below predate the Cancel button, git and Mail work and are out of date.

## Snaarp Doc (third tutorial, in progress)

Route `/tutorials/snaarp-doc`, config `tutorials/snaarp-doc.ts` (9 provisional steps, **all 9 steps built** (the completion card follows the last step in the config); more steps will come from later recordings). Recording: `ref/docs/Snaarp_Doc_flow.mp4`. Step 1 (explore: home, template gallery, trash) is in `scenes/snaarp-doc/`. The reusable shell is **`components/docs/DocsLayout.tsx`** (app rail + sidebar + top bar + content area; pass `active` and the screen as children; copy in `components/docs/docs-data.ts`; `PageThumb.tsx` draws the generic page thumbnails). Every later Snaarp Doc step should wrap its screens in `DocsLayout`. Step 2 added **`components/docs/DocEditor.tsx`** (the editor: header, menus, toolbar, ruler, canvas with a white page, footer, loading state; data in `components/docs/editor-data.ts`). It has its own full-width chrome and does not use `DocsLayout`. Steps 3-9 should render `DocEditor` with the document title and the page content as settings; it exposes `editor-page`, `editor-toolbar`, `editor-menu-<id>` and `tool-<id>` hooks for the timeline. Step 3 added **`components/docs/FileMenu.tsx`** (the File dropdown and its Download submenu; items in `components/docs/file-menu-data.ts`; drive it with `openFileMenu` / `closeFileMenu` / `hoverFileMenuItem` / `hoverDownloadItem` from `components/docs/file-menu-timeline.ts`; pass it as `DocEditor`'s `overlay` and set `openMenu="file"`). Steps 4-9 reuse it. Steps 4 to 8 added **`components/docs/EditorStage.tsx`** (the shared stage of those steps: editor + File menu + toast + start and end fades; each step passes its `startTitle`), **`DocToast.tsx`** (white toast bottom right, success or loading; `showDocToast` in `doc-toast-timeline.ts`), **`ShareDialog.tsx`**, **`RenameDialog.tsx`** and **`VersionHistoryPage.tsx`** (copy in their `*-data.ts` files), the shared title state `components/docs/doc-titles.ts` (`DOC_TITLES`) and the File menu helpers `clickFileMenu` / `chooseFileMenuItem`. The dialogs reuse the admin `Modal`. Step 9 added **`PrintDialog.tsx`** (+ `print-data.ts`): a neutral print panel (blank page preview + settings), also reusing `EditorStage`. See `docs/STEPS.md` (Snaarp Doc) and `docs/DECISIONS-AND-DEVIATIONS.md`.

## Deploying on Vercel

1. Go to vercel.com, sign in with GitHub, click Add New > Project.
2. Import the repository Jdbdesign/Snaarptuts.
3. Leave the framework as Next.js and the default build settings.
4. Click Deploy. Open the preview link and check /tutorials/snaarp-360 and /tutorials/snaarp-mail.
5. Every push to main redeploys automatically.

Checked before the first deploy: `npm run build` passes with no warnings; nothing in the app reads `ref/`, frames folders or videos; no environment variables are needed; no files are written at runtime; fonts (Poppins, Open Sans, JetBrains Mono) come from `next/font/google`, which downloads them at build time and serves them from the site itself. `/` redirects to `/tutorials/snaarp-360`; an unknown tutorial id shows the standard Next.js 404. The site sends no `X-Frame-Options` or `frame-ancestors` header, so the pages can be embedded in an iframe on another site.

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

1. **No Cancel button.** It was built and then removed on the owner's request (`reference.png` still shows it). Restore it from the git commit "Add Cancel button to player shell" if needed.
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

2. `git init`, first commit, decide on hosting.
3. **Snaarp Mail modules** (start with "Compose email"), then Meet, Teams, Me, Lock, Drive and the rest. The owner will supply each product's module list; do not invent module names.
4. Replace the remaining **placeholder icons** with the real Snaarp icons (single file: `components/icons.tsx`).
5. **Hosting and embedding** via iframe; verify full-height behavior.
6. Save **progress** per product (for example in `localStorage`) so the dropdown counts are real.
7. **Analytics hooks**: events for tutorial start, step start/complete, replay (the shell has clear places: `start`, `handleDone`, `handleAdvance`, `replay` in `TutorialPlayer.tsx`).
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
