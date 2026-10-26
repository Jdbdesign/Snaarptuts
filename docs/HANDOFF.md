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

Route `/tutorials/snaarp-doc`, config `tutorials/snaarp-doc.ts` (38 provisional steps, **all 38 steps built** (the completion card follows the last step in the config); more steps will come from later recordings). Recordings: `ref/docs/Snaarp_Doc_flow.mp4` (steps 1-9) `ref/docs/Snaarp_Doc_edit.mp4` (steps 10-13) `ref/docs/Snaarp_Doc_view.mp4` (steps 14-18) `ref/docs/Snaarp_Doc_insert.mp4` (steps 19-30, the whole Insert menu) and `ref/docs/Snaarp_Doc_format.mp4` (steps 31-38, the whole Format menu). Step 1 (explore: home, template gallery, trash) is in `scenes/snaarp-doc/`. The reusable shell is **`components/docs/DocsLayout.tsx`** (app rail + sidebar + top bar + content area; pass `active` and the screen as children; copy in `components/docs/docs-data.ts`; `PageThumb.tsx` draws the generic page thumbnails). Every later Snaarp Doc step should wrap its screens in `DocsLayout`. Step 2 added **`components/docs/DocEditor.tsx`** (the editor: header, menus, toolbar, ruler, canvas with a white page, footer, loading state; data in `components/docs/editor-data.ts`). It has its own full-width chrome and does not use `DocsLayout`. Steps 3-9 should render `DocEditor` with the document title and the page content as settings; it exposes `editor-page`, `editor-toolbar`, `editor-menu-<id>` and `tool-<id>` hooks for the timeline. Step 3 added **`components/docs/FileMenu.tsx`** (the File dropdown and its Download submenu; items in `components/docs/file-menu-data.ts`; drive it with `openFileMenu` / `closeFileMenu` / `hoverFileMenuItem` / `hoverDownloadItem` from `components/docs/file-menu-timeline.ts`; pass it as `DocEditor`'s `overlay` and set `openMenu="file"`). Steps 4-9 reuse it. Steps 4 to 8 added **`components/docs/EditorStage.tsx`** (the shared stage of those steps: editor + File menu + toast + start and end fades; each step passes its `startTitle`), **`DocToast.tsx`** (white toast bottom right, success or loading; `showDocToast` in `doc-toast-timeline.ts`), **`ShareDialog.tsx`**, **`RenameDialog.tsx`** and **`VersionHistoryPage.tsx`** (copy in their `*-data.ts` files), the shared title state `components/docs/doc-titles.ts` (`DOC_TITLES`) and the File menu helpers `clickFileMenu` / `chooseFileMenuItem`. The dialogs reuse the admin `Modal`. Step 9 added **`PrintDialog.tsx`** (+ `print-data.ts`): a neutral print panel (blank page preview + settings), also reusing `EditorStage`. Steps 10 to 13 (Edit menu, copy and paste, select all / delete / undo, find and replace) added a **document with real text**: `EditorStage` takes `startDocument` (an editor state from `components/docs/editor-state.ts`; start states `SAMPLE_EDITOR` and `COPIED_EDITOR` in `editor-timeline.ts`; sample text in `components/docs/sample-document.ts`). The editor supports a blinking caret, blue text selection, green find highlights, a floating selection toolbar, copy / cut / paste, delete, **working undo and redo**, find, replace all and the header status "Unsaved changes" (all in the pure state module, drawn by `DocumentView.tsx`). New shared pieces: **`EditMenu.tsx`** (+ `edit-menu-data.ts`; greyed-out items follow the editor state) and **`FindReplacePanel.tsx`** (+ `find-replace-data.ts`), driven by the helpers in **`components/docs/editor-timeline.ts`** (`clickEditMenu`, `chooseEditMenuItem`, `dragSelectBlock`, `typeInPanel`, ...). To add a later step that edits text, start from one of the start states, call `initEditor` first in the script, and let the helpers change the state. Steps 14 to 18 (View menu, editor modes, Comments, Document outline, ruler and layout) added **`ViewMenu.tsx`** (+ `view-menu-data.ts`, `view-menu-timeline.ts`), the **editor modes** Editing / Suggesting / Viewing (`DocEditor` setting `mode`; Viewing hides the toolbar), **`CommentsPanel.tsx`** (right-hand panel; `comments-data.ts`, `comments-state.ts`, `comments-timeline.ts`) and **`OutlinePanel.tsx`** (left-hand "Document tabs" panel). `DocEditor` also takes `showRuler`, `leftInset`, `rightInset`, `commentsOpen`, `outlineOpen` (the page centres itself between the panels; below 900 px the panels overlay the page). `EditorStage` draws all of it from scene variables (`mode`, `viewMenu`, `viewSub`, `ruler`, `printLayout`, `nonPrinting`, `commentsOpen`, `comments`, `outlineOpen`), all off by default. The editor state has `anchors` (comment highlights) and `landmarks` (cursor targets inside text). **Tabs:** the Document outline panel has working tabs (scene variables `outlineTabs` = the tab list and the selected one, `tabDocs` = the saved page of every tab that is not on screen; the page on screen is always the variable `editor`; `addTab`, `selectTab`, `clickAddTab`, `clickTab` in `components/docs/outline-timeline.ts`; names come from `OUTLINE.tabName(n)` in `comments-data.ts`; call `initTabs` first in a script so a replay starts with one tab). A new tab is a blank page (`BLANK_PAGE`, 0 words). **Full screen:** View > Full screen is simulated inside the browser frame by `FullScreenView.tsx` (a dark overlay with the page centred, a 0.3 s fade, the "Press Esc to exit full screen" pill and an "Esc" key chip; copy in `FULL_SCREEN` in `view-menu-data.ts`); it never uses the browser's Fullscreen API. State lives with the other View toggles: scene variables `fullScreen` (+ `fsHint`, `fsKey`, `fsPressed`), `enterFullScreen` / `pressEscFromFullScreen` in `view-menu-timeline.ts`. Do not put the timeline's `.tl-hl` ring on an element that is `position: absolute` (the ring sets `position: relative`): ring an inner wrapper such as `comments-panel-card`, `outline-panel-card` or the round button's wrapper. Steps 19 to 22 (Insert menu, part 1) added **`InsertMenu.tsx`** (+ `insert-menu-data.ts`, `insert-menu-timeline.ts`; scene variables `insertMenu`, `insertSub`; all 14 items, 5 groups, the Break, Page elements and Table of contents submenus and the greyed-out Comment live in data; only Image, Table and Link do anything, the other items are hoverable but not wired yet), **`ImageBlock.tsx`** (the sample banner at the top of the page; selected = blue outline, four corner handles, the dark floating toolbar; scene variable `pageImage`), **`TableBlock.tsx`** (grey header row, focused cell with outline and caret; scene variable `pageTable`), **`LinkDialog.tsx`** (the "Insert Link" modal; scene variables `linkDialog`, `linkFocus`, `field:link-url`, `linkNewTab`) and a **link look** in the text (`EditorState.links`, blue underlined, hook `doc-link-<id>`). Shared copy and sample content (banner file name, table cells, link text and address, dialog wording) are in `components/docs/insert-data.ts`; the helpers `insertTable`, `clickCell`, `typeInCell`, `openLinkDialog`, `applyLink` are in `insert-timeline.ts`. The floating toolbar icons are now one shared component (`FloatingToolbar.tsx`) used by the text selection bar and the image bar. `EditorStage` draws all of it from scene variables, off by default, so steps 1 to 18 are unchanged. The whole Snaarp Doc tutorial (22 steps) plays about 7:18 (438 s measured) from load to the "You're all set" card (before steps 23 to 26). Steps 23 to 26 (Insert menu, part 2) added **`HorizontalRule.tsx`**, **multi-page support** (a page break splits the text in two: page 1 padded to a full page, a thin grey band, page 2; the footer says "2 pages"), **`BookmarkDialog.tsx`** (our own white dialog; the marker is a small bookmark icon at the start of its line), **header and footer zones** and the **watermark** (drawn on the page by `PageDecor.tsx` through `DocEditor`'s new `decor` setting) and **`WatermarkPanel.tsx`** (right-hand panel, 216 px; the page shifts left while it is open). `InsertMenu` actions are now wired for Horizontal line, Bookmark, Break > Page break and Page elements > Header, Footer, Watermark (`chooseInsertItem` / `chooseInsertSub`); Section breaks, Table of contents, Page numbers, Footnote, Block quote, Checklist, Code block, eSignature, Drawing and Symbols stay hover only. State lives in scene variables (see `docs/STEPS.md`), helpers in `components/docs/insert-timeline.ts`, copy and sample texts in `components/docs/insert-data.ts`. The whole Snaarp Doc tutorial (26 steps) plays about 9:07 (547 s measured) from load to the "You're all set" card (before steps 27 to 30). Steps 27 to 30 (Insert menu, part 3) added **`PageNumbersDialog.tsx`** (the number shows on the page through `PageDecor.tsx`), the block styles **BlockQuote, ChecklistItem and CodeBlock** (in `DocumentView.tsx`; a ticked checklist state is built but never shown), **`ESignatureDialog.tsx`**, **`DrawingDialog.tsx`** and **`SymbolsDialog.tsx`**, all on the shared **`InsertDialog.tsx`** frame and opened through the scene variable `insertDialog` (`InsertDialogs.tsx`). A signature or drawing in the page is an `ObjectBlock` (scene variable `pageObjects`); the drawing uses the shared **`SelectionFrame.tsx`** (the selection look of the step 20 image). The two sample strokes are in `components/docs/stroke-data.ts`. New timeline helper `tl.followPath()` makes the cursor follow an SVG path while the script reveals the stroke. `chooseInsertItem` / `chooseInsertSub` now run every Insert item except Table of contents, Footnote, Comment and the Section breaks. The whole Snaarp Doc tutorial (30 steps) plays about 11:19 (679 s measured) from load to the "You're all set" card. Steps 31 to 34 (Format menu, part 1) added **`FormatMenu.tsx`** (+ `format-menu-data.ts`; scene variables `formatMenu`, `formatSub`), **text marks** (bold, italic, underline, strikethrough, superscript, subscript on ranges of a block's text: `Block.formats`), **paragraph styles** (Normal text and Heading 1 to 6: `Block.heading`; Heading 2 equals the sample "Goals" look), **alignment and indent** (`Block.align`, `Block.indent`, 36 px per step) and the `EditorStage` setting `formatting` (the toolbar's style box and active buttons follow the caret; off in steps 1-30). Pure state in `components/docs/format-state.ts`, timeline helpers in `components/docs/format-timeline.ts` (`chooseFormatSub`, `dragSelectText`, `clickInBlock`). Steps 35 to 38 (Format menu, part 2) wired the rest of the Format menu: **lists** (`Block.list` bullet / number, plus Checklist as the "todo" block; `setList` in `format-state.ts`), **headers and footers** from Format (`insertHeaderFooter`, `clickZone` in `insert-timeline.ts`), **Page numbers** (the step 27 dialog), **`PageOrientationDialog.tsx`** and **landscape pages** (`DocEditor` setting `landscape`; scene variable `pageOrientation`; copy and shape in `PAGE_ORIENTATION` in `format-menu-data.ts`), **text colour and highlight marks** with a soft selection (`Selection.soft`) and **Clear formatting** (`clearFormats`). `chooseFormatItem` in `format-timeline.ts` runs the menu rows that have no submenu. Columns is the only Format item still greyed out. The whole Snaarp Doc tutorial (38 steps) plays about 15:19 (919 s measured) from load to the "You're all set" card. See `docs/STEPS.md` (Snaarp Doc) and `docs/DECISIONS-AND-DEVIATIONS.md`.

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
