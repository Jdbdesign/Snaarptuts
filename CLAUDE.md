# Snaarp Tutorials

Full-screen, auto-playing, step-by-step tutorials that teach people how to sign up for and use Snaarp products. They are hosted on their own pages. We start with Snaarp 360 and will add every other Snaarp product later.

## How we work
- The owner is a product designer and does not write code. Give short, plain summaries of what changed. Do not explain technical steps unless asked.
- Build ONE step (one video segment) per round. Finish it, verify it, then stop and wait for feedback before starting the next step.
- When something needs doing by hand, give clear numbered steps.
- Never overwrite or delete the source video or reference.png.

## Source material
- Sign_up_for_snaarp_360.mp4: 2560x1440 screen recording, 1:55. Claude cannot watch video, so extract frames with ffmpeg and look at those (example: `ffmpeg -ss 9 -t 14 -i Sign_up_for_snaarp_360.mp4 -vf "fps=2" frames/%03d.png`).
- reference.png: the layout the player must look like (left step rail, browser frame in the middle; the Cancel button that the image shows top right was removed by owner decision, see Controls).
- The video is only a reference. Rebuild every screen as real HTML/CSS. Never embed the video or screenshots in the final page.

## Step map for Snaarp 360 (video timestamps)
1. Choose your plan: 0:00-0:08 (pricing page, pick Business, Start 14-day free trial). Built first.
2. Create your account: 0:09-0:23 (sign-up form, then products home).
3. Sign in to Admin: 0:24-0:45 (products home, Snaarp Admin login, dashboard).
4. Add and verify your domain: 0:48-1:12 (Add Domain, DNS records, verified).
5. Add your first user: 1:15-1:51 (Add User, credentials, login as new user, Admin Panel users list).

Do not build a step until the owner asks for it.

## Product requirements
- The page fills 100vw x 100dvh. No document scroll, no letterboxing, no empty bands.
- Autoplays on load with no click. Steps advance automatically; a finished step marks done in the rail.
- Controls: Space = pause/resume, Collapse rail, click a built step in the rail to jump to it. There is no Cancel button (removed by owner decision; it can be restored from the git commit "Add Cancel button to player shell").
- Works at 1920x1080, 1440x900, 1280x720 and 390x844. Below 900px wide the rail auto-collapses.
- Respect prefers-reduced-motion.

## Architecture
- The player shell and the step scenes are separate. Adding a step or a product must never require editing the shell.
- Each product has one config file (for example `tutorials/snaarp-360.ts`) with its name, step titles, URLs and scenes.
- Scenes are built at a fixed 1440px design width and scaled with a CSS transform to the frame width. The design height = frame height / scale, so the scene always fills the frame.
- Shared timeline helper: `wait`, `moveCursorTo`, `click`, `scrollTo`, `showCaption`, `highlight`, `clearHighlight`. It must support pause and cancellation.
- All icons live in one icons file so the real Snaarp icons can be swapped in later. Do not crop icons out of video frames.
- Use the project's existing stack (Next.js + Tailwind if present). Route: `/tutorials/<product-id>`.

## Design tokens
- Font: Poppins (400, 500, 600, 700).
- Brand purple `#7014D9`. Text `#111111`. Secondary text `#6B7280`. Hairlines `#ECECF1`. Page background `#F6F6F8`. White cards.
- Browser traffic lights: red `#FF5F57`, yellow `#FEBC2E`, green `#28C840`.
- Radii: rail 24px, browser frame 14px, plan cards 20px, buttons and pills fully rounded.
- Caption bubble: `#111` background, white 14px Poppins Medium, rounded pill, bottom center of the frame.
- Highlight: 2px purple ring with a soft pulsing glow. Cursor: dark arrow with white outline, purple ripple on click.

## Content rules
- No real personal data anywhere: no real emails, passwords, names or domains from the video. Use obvious sample data such as Jane Doe, jane@example.com, example.com.
- Prices use the pound sign. Copy must match the real Snaarp pages unless the owner says otherwise.
- Captions are short, in the imperative, and name exactly what to click (example: "Click Start 14-day free trial").

## Definition of done for every step
1. The step runs end to end from autoplay with no errors in the console.
2. Screenshots at 1920x1080 and 1280x720, taken partway through the step, visually match the extracted video frames and reference.png (spacing, sizes, colors).
3. No scrollbars, no clipped text, nothing cut off.
4. Tell the owner the route to open and what to press to test it, then stop.

## Build status (Snaarp 360)
Route: `/tutorials/snaarp-360`

| Step | Status |
|---|---|
| 1. Choose your plan | Done |
| 2. Create your account | Done |
| 3. Sign in to Admin | Done |
| 4. Add and verify your domain | Done |
| 5. Add your first user | Done |
| Completion screen ("You're all set", Replay, Back to Snaarp) | Done |
| Cancel button (top right) | Removed by owner decision (restore from git commit "Add Cancel button to player shell") |

All 5 steps and the completion screen are built. Total running time about 2:04 (123.8 s) from load to the completion screen. The Cancel button was built in the player shell and later removed by owner decision (top-right corner is now empty; no Esc shortcut, no postMessage, no blank-page behaviour). It can be restored from the git commit "Add Cancel button to player shell".

### Snaarp Mail ("How to set up Snaarp Mail", route `/tutorials/snaarp-mail`)
Config: `tutorials/snaarp-mail.ts` (9 steps, rail lists all of them). Recording: `ref/mail/Snaarp_Mail_setup.mp4` (copy of `Snaarp_Mail_setup.mp4.mp4` from Downloads; 998x480, 3:05; `ref/` is git-ignored). Frames: `ref/mail/frames-step1/`, `frames-step2/`, `frames-step3/`, `frames-step4/`, `frames-step5/`.

| Step | Status |
|---|---|
| 1. Choose your plan (`snaarp.com/pricing`) | Done (about 9.4 s) |
| 2. Create your account (`login.snaarp.com/signup`) | Done (about 21 s) |
| 3. Tell us about your organization (`login.snaarp.com/onboarding/organization`) | Done (about 24.4 s) |
| 4. Connect your domain (`login.snaarp.com/onboarding/domain`) | Done (about 20.6 s) |
| 5. Review your DNS records (`login.snaarp.com/onboarding/dns`) | Done (about 31.6 s) |
| 6. Add the records in Cloudflare (`dash.cloudflare.com/acme-studio.com/dns/records`) | Done (about 60.6 s) |
| 7. Confirm the records (`login.snaarp.com/onboarding/dns`) | Done (about 14.6 s) |
| 8. Add your team (`login.snaarp.com/onboarding/users`) | Done (about 32.1 s) |
| 9. Finish setup (`login.snaarp.com/onboarding/complete`, then `admin.snaarp.com/admin`) | Done (about 21 s) |

Files: `scenes/snaarp-mail/Step1Pricing.tsx`, `step1-script.ts`, `pricing-data.ts` (naira prices, Mail + 360 tabs). The pricing page is the shared, data-driven `components/pricing/PricingScene.tsx` (types in `pricing-types.ts`, 360 plans in `plans-360.ts`); the 360 tutorial uses the same scene with its own pound prices (`scenes/snaarp-360/pricing-data.ts`). Step 2: `scenes/snaarp-mail/Step2Signup.tsx`, `step2-script.ts`, `signup-data.ts` (all copy, sample values, captions and the password-strength rule live in the data file); it reuses `TypedField` and `Checkbox` from `components/admin/`. Step 3: `scenes/snaarp-mail/Step3Organization.tsx`, `step3-script.ts`, `org-data.ts` (copy, list options, sample values, captions); it is the first screen inside the shared `components/onboarding/OnboardingShell.tsx` (dark progress sidebar + white content; steps 4-9 pass `active="domain" | "dns" | "users" | "done"`). The select lists are the local `SelectField` in `Step3Organization.tsx` (driven by `tl.setVar("open")`, options hoverable with `tl.hover`). Step 4: `scenes/snaarp-mail/Step4Domain.tsx`, `step4-script.ts`, `domain-data.ts`, three small screens in `scenes/snaarp-mail/domain/` (`ChooseScreen`, `EnterScreen`, `SuccessScreen`, shared `Heading`); one `OnboardingShell active="domain"` stays mounted while the scene variable `screen` (a/b/c) swaps the content. Step 5: `scenes/snaarp-mail/Step5Dns.tsx`, `step5-script.ts`, `dns-data.ts` (the five DNS records are defined ONCE in `DNS_RECORDS` there; steps 6 and 7 must import them), `dns/DnsModal.tsx`; the reusable record card is `components/onboarding/DnsRecordCard.tsx` (pending/verified state in the scene variable `dns:<id>`; the "Mark submitted" button flips it). `OnboardingShell` gained an `overlay` slot for modals. While steps are unbuilt, the end card after the last built step reads "Step N complete / The next steps are coming soon." The "You're all set" card appears only when every step is built. Step 6: `scenes/snaarp-mail/Step6Cloudflare.tsx`, `step6-script.ts`, `cloudflare-data.ts` (all copy and captions; the five records are DERIVED from `DNS_RECORDS`, never retyped: the host becomes the Cloudflare Name, `@` for the root, and the mail server loses its trailing dot), pages in `scenes/snaarp-mail/cloudflare/` (`OverviewPage`, `DnsRecordsPage`, `RecordForm`, `RecordsTable`). The reusable frame is `components/cloudflare/CloudflareChrome.tsx` (top bar, left menu, content area, illustration note; also `CfField.tsx`, `parts.tsx`, `cloudflare-data.ts`); any later step that shows Cloudflare should reuse it. One `addRecord` sequence in the script runs five times. New `tl.paste(key, text, flashSelector)` pastes long values instantly. The Cloudflare screens are an ILLUSTRATION (own icons, Open Sans font): check them against the live dashboard before launch. Step 7: no new scene. It plays the Step 5 page (`Step5Dns`) with its own script, `scenes/snaarp-mail/step7-script.ts` (captions `confirm` and `continue` live in `dns-data.ts`): the five cards are marked submitted one by one (about 1.6 s apart, with a small check pop added to `DnsRecordCard`), Continue turns navy and is clicked. `Step5Dns` gained two optional scene variables that step 5 never sets: `holdContinue` (keeps Continue grey a little longer) and `bottomRoom` (extra space under the page so Continue can scroll clear of the caption). Step 8: `scenes/snaarp-mail/Step8Users.tsx`, `step8-script.ts`, `users-data.ts` (all copy, captions, sample people; `NEW_USER` has the same shape as the 360 modal data), small components in `scenes/snaarp-mail/users/` (`OptionCards`, `TeamTable`). It follows the owner's design `ref/mail/users-inbox.png` (no recording exists for this step). It REUSES the 360 `AddUserModal` (`scenes/snaarp-360/step5/AddUserModal.tsx`), which gained an optional `user` setting (default = the 360 sample user, so 360 is unchanged); `MenuItem` in `components/admin/DropdownMenu.tsx` gained an optional icon and `className`; new icons `csvFile` and `googleG`. Scene variables: `team` (users in the table), `menu` (open row menu), plus the modal's own (`modal`, `chips`, `generated`, `creating`). Step 9 (the last): `scenes/snaarp-mail/Step9Finish.tsx` (two screens in one scene: variable `screen` a/b), `step9-script.ts`, `finish-data.ts` (copy, dashboard values `MAIL_STATS`, captions, URLs), `finish/SetupCompleted.tsx` (screen A). It follows the owner's design `ref/mail/setup-completed.png` (no recording exists). `OnboardingShell` gained an optional `completed` setting (the last sidebar item cross-fades into a solid white check circle; other steps do not pass it). Screen B is the 360 owner dashboard (`AdminLayout` + `DashboardContent`), whose new optional `stats` setting defaults to the 360 values, so 360 is unchanged. **All 9 Mail steps are built**: the whole tutorial plays about 4:00 (239.7 s measured) from load to the "You're all set" completion card. Before launch, see "Things to replace or confirm before launch" in `docs/DECISIONS-AND-DEVIATIONS.md` (Cloudflare screens, placeholder URLs, "Users Inbox" vs "Users").

### Snaarp Doc ("How to use Snaarp Doc", route `/tutorials/snaarp-doc`)
Config: `tutorials/snaarp-doc.ts` (44 steps, all built: the tutorial is complete; the Help menu is intentionally not included). Recordings (`ref/` is git-ignored): `ref/docs/Snaarp_Doc_flow.mp4` (steps 1-9, 1010x480, 2:15; frames `ref/docs/frames-step1/`) and `ref/docs/Snaarp_Doc_edit.mp4` (steps 10-13, 1040x480, 1:58; frames `ref/docs/frames-step10/` to `frames-step13/`) and `ref/docs/Snaarp_Doc_view.mp4` (steps 14-18, 1008x480, 2:20; frames `ref/docs/frames-step14/` to `frames-step18/`) and `ref/docs/Snaarp_Doc_insert.mp4` (steps 19-30, the whole Insert menu, 1004x480, 5:59; frames `ref/docs/frames-step19/` (+ `19b`, `19c`) to `frames-step30/`) and `ref/docs/Snaarp_Doc_format.mp4` (steps 31-38, the whole Format menu, 1010x480, 3:44; frames `ref/docs/frames-step31/` to `frames-step38/`) and `ref/docs/Snaarp_Doc_tools.mp4` (steps 39-40, the Tools menu, 1910x910, 31 s; frames `ref/docs/frames-step39/`, `frames-step40/`) and `ref/docs/Snaarp_Doc_esignature.mp4` (steps 41-44, the eSignature menu, 1000x480, 1:25; frames `ref/docs/frames-step41/` to `frames-step44/`).

| Step | Status |
|---|---|
| 1. Explore Snaarp Doc (`docs.snaarp.com/documents`) | Done (about 15.4 s) |
| 2. Create a blank document (`docs.snaarp.com/document/new`) | Done (about 10.4 s) |
| 3. Explore the editor and File menu (`docs.snaarp.com/document/untitled`) | Done (about 12.4 s) |
| 4. Make a copy | Done (about 11.4 s) |
| 5. Share your document | Done (about 20.4 s) |
| 6. Download and save to Drive | Done (about 16.4 s) |
| 7. Rename your document | Done (about 11.4 s) |
| 8. Check version history | Done (about 11.4 s) |
| 9. Print your document | Done (about 13.4 s) |
| 10. Explore the Edit menu (`docs.snaarp.com/document/project-brief`, placeholder) | Done (about 13.4 s) |
| 11. Copy and paste text | Done (about 24 s) |
| 12. Select all, delete and undo | Done (about 17 s) |
| 13. Find and replace | Done (about 30 s) |
| 14. Change the editing mode (`docs.snaarp.com/document/project-brief`, placeholder, same for 15-18) | Done (about 16 s) |
| 15. Open Comments and add a comment | Done (about 24 s) |
| 16. Manage comments | Done (about 36 s) |
| 17. Use the Document outline | Done (about 19 s; the plus adds "Tab 2" with a blank page) |
| 18. Ruler and layout options | Done (about 30 s; Full screen works, simulated inside the frame) |
| 19. Explore the Insert menu (`docs.snaarp.com/document/project-brief`, placeholder, same for 20-22) | Done (about 17 s) |
| 20. Insert an image | Done (about 22 s; the computer's file picker is left out) |
| 21. Insert a table | Done (about 30 s) |
| 22. Insert a link | Done (about 25 s) |
| 23. Add a line or page break | Done (about 30 s) |
| 24. Add a bookmark | Done (about 20 s) |
| 25. Add a header and footer | Done (about 30 s; Footer is only hovered, the recording never fills it in) |
| 26. Add a watermark | Done (about 27 s) |
| 27. Add page numbers | Done (about 24 s) |
| 28. Quote, checklist and code block | Done (about 38 s; the checklist box is only hovered, the frames never tick it) |
| 29. Add an eSignature | Done (about 24 s) |
| 30. Draw and insert symbols | Done (about 38 s; the Insert menu is now complete) |
| 31. Explore the Format menu (`docs.snaarp.com/document/project-brief`, placeholder, same for 32-34) | Done (about 23 s) |
| 32. Format your text | Done (about 38 s) |
| 33. Use paragraph styles | Done (about 30 s) |
| 34. Align and indent text | Done (about 36 s) |
| 35. Bullets and numbered lists (`docs.snaarp.com/document/project-brief`, placeholder, same for 36-38) | Done (about 26 s) |
| 36. Headers, footers and page numbers | Done (about 32 s) |
| 37. Change page orientation | Done (about 27 s; the page ends in portrait again) |
| 38. Clear formatting | Done (about 22 s; the Format menu is now complete except Columns, greyed out) |
| 39. Explore the Tools menu (`docs.snaarp.com/document/project-brief`, placeholder, same for 40-44) | Done (about 24 s) |
| 40. Check your word count | Done (about 18.4 s; the numbers are live from the sample document) |
| 41. Sign your document | Done (about 24 s) |
| 42. Type your signature | Done (about 26 s) |
| 43. Upload a signature image | Done (about 19 s; the computer's file picker is left out) |
| 44. Request a signature | Done (about 24.5 s; a toast replaces the recording's browser alert; the completion card follows) |

Step 1: `scenes/snaarp-doc/Step1Explore.tsx`, `step1-script.ts`, `step1-data.ts` (all copy, sample documents, templates, captions, URLs), screens in `scenes/snaarp-doc/step1/` (`HomeScreen`, `GalleryScreen`, `TrashScreen`; scene variable `screen` a/b/c). The reusable shell is `components/docs/DocsLayout.tsx` (app rail, sidebar, top bar, content area; `active` = "documents" | "starred" | "trash" | null; copy in `components/docs/docs-data.ts`); every later Snaarp Doc step should wrap its screens in it. `components/docs/PageThumb.tsx` draws the generic page thumbnails. Under 900px the rail and sidebar become icon-only and the layout is zoomed 2.4x. New icons (`sun`, `docFile`, `folder`, `listView`, `clock`, `restore`, `logout`, `chevronLeft`, `adminSquare`) are in `components/icons.tsx`. Differences from the recording: see `docs/DECISIONS-AND-DEVIATIONS.md`.

Step 2: `scenes/snaarp-doc/Step2Blank.tsx`, `step2-script.ts`, `step2-data.ts` (captions, URLs, document title). It reuses the Step 1 `HomeScreen` inside `DocsLayout`, then swaps the whole screen to the editor (scene variable `stage`: home / loading / editor). New shared piece **`components/docs/DocEditor.tsx`** (data in `components/docs/editor-data.ts`: menu names, toolbar order, header icons, footer copy): the editor's own full-width chrome (header with title, .DOCX badge, menus, Editing/Suggesting toggle, Share, JD avatar; one-row toolbar; ruler; grey-blue canvas with a white page; two footer lines; `loading` state). Props: `title`, `children` (the page content), `loading`, `overlay`. It does NOT use `DocsLayout`. Its page has `data-tl="editor-page"`, the toolbar `editor-toolbar`, menus `editor-menu-<id>` and tools `tool-<id>`, so later steps can target them. Under 900px the editor is zoomed 2.4x, the toolbar scrolls sideways and the header keeps only Share and the avatar. New icons (`hexMark`, `edUndo` ... `edSuggest`) are in `components/icons.tsx`; `.doc-hex` (loading animation) is in `app/globals.css`. Differences from the recording: see `docs/DECISIONS-AND-DEVIATIONS.md`.

Step 3: `scenes/snaarp-doc/Step3Tour.tsx`, `step3-script.ts`, `step3-data.ts` (captions, URL). It plays the Step 2 `DocEditor` (empty "Untitled Document"), rings the menus, toolbar and Editing/Share, then opens the File menu. New shared piece **`components/docs/FileMenu.tsx`** (items, labels, shortcuts and greyed-out flags in `components/docs/file-menu-data.ts`; timeline helpers `openFileMenu`, `closeFileMenu`, `hoverFileMenuItem`, `hoverDownloadItem` in `components/docs/file-menu-timeline.ts`). Pass it as the editor's `overlay` and pass `openMenu="file"` to `DocEditor` (the File label gets a grey fill). Scene variables: `fileMenu` (open) and `fileSub` (Download submenu). Items have `data-tl="file-item-<id>"` (new, open, copy, share, email, download, drive, rename, move, trash, history, details, language, print) and the submenu `file-sub-<id>` (docx, pdf, html, md, txt). `DocEditor` gained `openMenu` and the hooks `editor-menubar` and `editor-mode`. New icons: `chevronRight`, `fmNew`, `fmOpen`, `fmEmail`, `fmDrive`, `fmMove`, `fmInfo`. Differences from the recording: see `docs/DECISIONS-AND-DEVIATIONS.md`.

Steps 4-8: small scenes on the shared **`components/docs/EditorStage.tsx`** (the `DocEditor` + `FileMenu` + `DocToast`, the start fade `intro` and the end white fade `fade`; scene variables `title`, `loading`, `fileMenu`, `fileSub`). The document title is shared state in `components/docs/doc-titles.ts` (`DOC_TITLES`: "Untitled Document" -> "Untitled Document (Copy)" -> "Project Brief"); every step passes the title it starts with as `startTitle`, so each also works alone from the rail. New shared pieces: **`DocToast.tsx`** (white card bottom right, "success" black check or "loading" spinner; `showDocToast` / `hideDocToast` in `doc-toast-timeline.ts`), **`ShareDialog.tsx`** (+ `share-data.ts`; scene variables `share`, `shareAccess`, `shareRole`, `shareMenu`, `shareFocus`), **`RenameDialog.tsx`** (variables `rename`, `renameSelected`, `renameFocus`, `field:rename`), **`VersionHistoryPage.tsx`** (+ `version-history-data.ts`). `components/docs/file-menu-timeline.ts` gained `clickFileMenu` and `chooseFileMenuItem` (move, ring, click, close). Dialogs reuse `components/admin/Modal.tsx`. Step 4: `scenes/snaarp-doc/Step4Copy.tsx`, `step4-script.ts`, `step4-data.ts`. Step 5: `Step5Share.tsx`, `step5-script.ts`, `step5-data.ts`. Step 6: `Step6Drive.tsx`, `step6-script.ts`, `step6-data.ts`. Step 7: `Step7Rename.tsx`, `step7-script.ts`, `step7-data.ts`. Step 8: `Step8History.tsx` (scene variable `screen` editor/history), `step8-script.ts`, `step8-data.ts`. Step 9: `Step9Print.tsx`, `step9-script.ts`, `step9-data.ts`, with the new shared **`components/docs/PrintDialog.tsx`** (+ `print-data.ts`; scene variable `print`; a neutral Snaarp-styled print panel, NOT the browser's print window). **All 13 Snaarp Doc steps are built**: the whole tutorial plays about 3:33 (213 s measured) from load to the "You're all set" completion card (the card appears after the last step in the config, so adding steps later moves it automatically).

Steps 10-13 (Edit menu, copy and paste, select all / delete / undo, find and replace) use a document with real text: `components/docs/EditorStage.tsx` takes `startDocument`; the editor logic is pure state in `components/docs/editor-state.ts` (selection, caret, clipboard, working undo/redo, find and replace), drawn by `DocumentView.tsx`, with the Edit dropdown `EditMenu.tsx` (+ `edit-menu-data.ts`), the panel `FindReplacePanel.tsx` (+ `find-replace-data.ts`), the sample text `sample-document.ts` and the timeline helpers `editor-timeline.ts` (`clickEditMenu`, `chooseEditMenuItem`, `dragSelectBlock`, `typeInPanel`...; start states `SAMPLE_EDITOR`, `COPIED_EDITOR`; call `initEditor` first in every script). Scenes: `scenes/snaarp-doc/Step10EditMenu.tsx`, `Step11CopyPaste.tsx`, `Step12Undo.tsx`, `Step13FindReplace.tsx` (+ `stepN-script.ts`, `stepN-data.ts`). Differences from the recording: see `docs/DECISIONS-AND-DEVIATIONS.md`.

Steps 14-18 (View menu and editor modes, Comments, Document outline, ruler and layout) reuse `EditorStage` with `startDocument` and add, all optional and off by default so steps 1-13 are unchanged: **`ViewMenu.tsx`** (+ `view-menu-data.ts`, helpers in `view-menu-timeline.ts`: `clickViewMenu`, `chooseViewItem`, `hoverViewItem`, `clickModeItem`), the **editor modes** (scene variable `mode` = editing / suggesting / viewing; `DocEditor` takes `mode`, `showRuler`, `leftInset`, `rightInset`, `commentsOpen`, `outlineOpen`; Viewing hides the whole toolbar and un-selects both header pills), **`CommentsPanel.tsx`** (+ `comments-data.ts`, `comments-state.ts`, helpers in `comments-timeline.ts`; start states `ONE_THREAD` and `TWO_THREADS`; scene variables `commentsOpen` and `comments`) and **`OutlinePanel.tsx`** (scene variable `outlineOpen`; its tabs are the scene variable `outlineTabs`, the saved page of each tab not on screen is `tabDocs`, helpers `addTab` / `selectTab` / `clickAddTab` / `clickTab` in `outline-timeline.ts`, data in `outline-state.ts`) and **`FullScreenView.tsx`** (View > Full screen, simulated inside the browser frame; scene variables `fullScreen`, `fsHint`, `fsKey`, `fsPressed`; helpers `enterFullScreen` / `pressEscFromFullScreen` in `view-menu-timeline.ts`). The editor state gained `anchors` (the yellow-orange comment highlight, hook `doc-comment-<id>`) and `landmarks` (invisible cursor targets inside a paragraph, hook `doc-at-<id>`); `editor-timeline.ts` gained `PHRASE_EDITOR`, `COMMENTED_EDITOR` and `dragSelectPhrase`. Scene files: `scenes/snaarp-doc/Step14Mode.tsx` ... `Step18Layout.tsx` (+ `stepN-script.ts`, `stepN-data.ts`). All 18 Snaarp Doc steps are built: the whole tutorial plays about 5:42 (342 s measured) from load to the "You're all set" card.

Steps 19-22 (Insert menu, image, table, link) reuse `EditorStage` with `startDocument` and add, all optional and off by default so steps 1-18 are unchanged: **`InsertMenu.tsx`** (+ `insert-menu-data.ts`, helpers in `insert-menu-timeline.ts`: `clickInsertMenu`, `hoverInsertItem`, `hoverInsertSub`, `chooseInsertItem`; scene variables `insertMenu` and `insertSub`; the items for later steps exist and can be hovered but are not wired yet), **`ImageBlock.tsx`** (sample banner drawn inline, selected = blue outline + four corner handles + floating toolbar; scene variable `pageImage`), **`TableBlock.tsx`** (scene variable `pageTable`; helpers `insertTable`, `clickCell`, `typeInCell` in `insert-timeline.ts`), **`LinkDialog.tsx`** (scene variables `linkDialog`, `linkFocus`, `field:link-url`, `linkNewTab`; helpers `openLinkDialog`, `applyLink`) and a link look in the text (`EditorState.links`, hook `doc-link-<id>`). Copy and sample content (banner name, table cells, link text and address, dialog wording) are in `components/docs/insert-data.ts`; the floating toolbar icons are the shared `FloatingToolbar.tsx`. Scene files: `scenes/snaarp-doc/Step19InsertMenu.tsx` ... `Step22Link.tsx` (+ `stepN-script.ts`, `stepN-data.ts`). All 22 Snaarp Doc steps are built: the whole tutorial plays about 7:18 (438 s measured) from load to the "You're all set" card.

Steps 23-26 (line and page break, bookmark, header and footer, watermark) reuse `EditorStage` with `startDocument` and add, all optional and off by default so steps 1-22 are unchanged: **`HorizontalRule.tsx`**, **multi-page support** (a page break splits the text in two; `PAGE_BODY_MIN` and `PAGE_TOP_PAD` in `insert-state.ts`; the footer says "2 pages" via `live.pages`), **`BookmarkDialog.tsx`** (+ the bookmark marker in `DocumentView`), **`PageDecor.tsx`** (layers on the page itself through `DocEditor`'s new `decor` setting: the page-break band, the header and footer zones, the watermark) and **`WatermarkPanel.tsx`** (right-hand panel; `PANEL_WIDTH.watermark`). Scene variables: `pageRules`, `pageBreak`, `pageBookmarks`, `bookmarkDialog`, `bookmarkFocus`, `pageHeader`, `pageFooter`, `watermarkOpen`, `watermark`, `wmFocus`, `wmTab`. `chooseInsertItem` now runs Horizontal line and Bookmark; the new `chooseInsertSub` runs Page break, Header, Footer and Watermark (section breaks and the other Page elements rows are still hover only). Helpers in `components/docs/insert-timeline.ts`; copy and sample texts (bookmark name, header, footer, watermark) in `components/docs/insert-data.ts`. Scene files: `scenes/snaarp-doc/Step23LineBreak.tsx` ... `Step26Watermark.tsx` (+ `stepN-script.ts`, `stepN-data.ts`). All 26 Snaarp Doc steps are built: the whole tutorial plays about 9:07 (547 s measured) from load to the "You're all set" card.

Steps 27-30 (page numbers, quote / checklist / code block, eSignature, drawing and symbols) reuse `EditorStage` with `startDocument` and add, all optional and off by default so steps 1-26 are unchanged: **`InsertDialog.tsx`** (the frame shared by the new dialogs) with **`InsertDialogs.tsx`** (renders them; scene variable `insertDialog` = "pagenumbers" | "esignature" | "drawing" | "symbols" | ""), **`PageNumbersDialog.tsx`** (the number is drawn by `PageDecor.tsx` from `pageNumbers`), the block styles **BlockQuote, ChecklistItem and CodeBlock** (`BlockKind` "quote" | "todo" | "code", drawn by `DocumentView.tsx`), **`ESignatureDialog.tsx`**, **`DrawingDialog.tsx`**, **`SymbolsDialog.tsx`**, **`ObjectBlock.tsx`** (signature and drawing in the page; scene variable `pageObjects`), **`SelectionFrame.tsx`** (the image selection look of step 20, now shared) and the sample strokes in `stroke-data.ts`. New timeline helper `tl.followPath(selector, ms, onProgress)` (the cursor follows an SVG path and a script reveals the stroke under it). The Insert menu is complete: every item works except Table of contents, Footnote, Comment (greyed out) and the Section breaks (hover only). Helpers in `components/docs/insert-timeline.ts`; copy and sample content (page-number dialog, symbols, colours) in `components/docs/insert-data.ts`. Scene files: `scenes/snaarp-doc/Step27PageNumbers.tsx` ... `Step30DrawSymbols.tsx` (+ `stepN-script.ts`, `stepN-data.ts`). All 30 Snaarp Doc steps are built: the whole tutorial plays about 11:19 (679 s measured) from load to the "You're all set" card.

Steps 31-34 (Format menu part 1: the menu, text formatting, paragraph styles, align and indent) reuse `EditorStage` with `startDocument` and a new `formatting` setting (the toolbar follows the text: the style box shows the style at the caret, the B / I / U / strikethrough / superscript / subscript / alignment buttons show the light grey "on" look; off in steps 1-30). New shared pieces: **`FormatMenu.tsx`** (+ `format-menu-data.ts`: all items, groups, shortcuts, the four submenus (Text, Paragraph styles with each label in its own size, Align & indent, Bullets & numbering) and greyed-out flags; scene variables `formatMenu` and `formatSub`; hooks `format-item-<id>`, `format-sub-<id>`, `format-menu-card`), the pure state functions in **`format-state.ts`** (`toggleFormat`, `setHeading`, `setAlign`, `changeIndent`, `practiceEditor`, what the toolbar shows) and the helpers in **`format-timeline.ts`** (`clickFormatMenu`, `hoverFormatItem`, `hoverFormatSub`, `chooseFormatSub`, `dragSelectText`, `clickInBlock`, `initFormatMenu`). A `Block` gained optional `formats` (bold, italic, underline, strike, sup, sub on ranges of the text), `heading` (1-6), `align` and `indent` (36 px per step, `INDENT_PX`); `DocumentView` draws them; `Selection` gained `compact` (the floating toolbar hangs over a selected word). Heading 2 matches the sample "Goals" headings. (Headers & footers, Page numbers, Page orientation, Bullets & numbering and Clear formatting were wired in steps 35-38; Columns stays greyed out.) The practice paragraphs are in each step's data file (`step32-data.ts` ... `step34-data.ts`) and are appended after the Contacts paragraph by `practiceEditor`. Scene files: `scenes/snaarp-doc/Step31FormatMenu.tsx` ... `Step34AlignIndent.tsx` (+ `stepN-script.ts`, `stepN-data.ts`). (After steps 31-34 the whole tutorial played about 13:24, 804 s measured.)

Steps 35-38 (Format menu part 2: lists, headers / footers / page numbers, page orientation, Clear formatting) reuse `EditorStage` with `startDocument` and `formatting`, and add: **lists** (`Block.list` = "bullet" | "number" for Bullet list and Numbered list: round bullets or "1." numbers in a 30 px hanging indent, `LIST_STYLE` and `listNumber` in `DocumentView` / `format-state.ts`; Checklist reuses the block kind "todo" (the step 28 ChecklistItem); `setList` replaces the old list type and keeps the text; the toolbar bullet / number buttons show active), **`PageOrientationDialog.tsx`** (on the shared `InsertDialog` frame, id "orientation" in `InsertDialogs`; copy and the landscape shape in `PAGE_ORIENTATION` in `format-menu-data.ts`; scene variables `poChoice` (the radio) and `pageOrientation` (what the page is); hooks `po-apply-to`, `po-portrait`, `po-landscape`, `po-cancel`, `po-ok`, `po-close`), **landscape pages** (`DocEditor` setting `landscape`: the page is 54.7% of the canvas width (92% on narrow screens) with an 11 : 8.5 shape, a border and a soft shadow, the ruler and the header / footer margins follow; portrait is unchanged), **text colour and highlight marks** (`TextFormat` gained "color" and "highlight" with a `value`; static only, set from data with `preformat` in `format-state.ts`; `Selection.soft` is a light see-through blue so the colours show under a selection), **Clear formatting** (`clearFormats` removes every inline mark from the selection and keeps the words), and the Format menu items are now wired: `chooseFormatItem` in `format-timeline.ts` runs Headers & footers (`insertHeaderFooter` and `clickZone` in `insert-timeline.ts`: both zones appear, the caret is in the header), Page numbers (the step 27 dialog through `openPageNumbers`), Page orientation and Clear formatting; the Bullets & numbering rows run `setList`. New helpers: `dragSelectBlocks`, `openPageOrientation`, `chooseOrientation`, `clickOrientationOk`. The header and footer zones' text has hooks `page-header-text` and `page-footer-text` (for rings). Scene files: `scenes/snaarp-doc/Step35Lists.tsx` ... `Step38ClearFormatting.tsx` (+ `stepN-script.ts`, `stepN-data.ts`; the practice lines, the sample header / footer texts and the pre-formatted marks are in the data files). All 38 Snaarp Doc steps are built and the Format menu is complete: the whole tutorial plays about 15:19 (919 s measured) from load to the "You're all set" card.

Steps 39-44 (the Tools menu and the eSignature menu, the last two menus; the Help menu is intentionally not part of the tutorial) reuse `EditorStage` with `startDocument` and add, all optional and off by default so steps 1-38 are unchanged: **`ToolsMenu.tsx`** (+ `tools-menu-data.ts`, helpers in `tools-menu-timeline.ts`: `clickToolsMenu`, `hoverToolsItem`, `chooseToolsItem`; scene variable `toolsMenu`; only Word count and Document outline are active, Spelling and grammar, Dictionary, Notification settings, Preferences and Accessibility are greyed and hover only), **`WordCountDialog.tsx`** (on the shared `InsertDialog` frame, scene variable `insertDialog` = "wordcount"; the numbers come live from the document through `word-count.ts`, so Words equals the footer's "N words"; hooks `wc-card`, `wc-row-<id>`, `wc-done`), **`ESignatureMenu.tsx`** (+ `esignature-menu-data.ts`, helpers in `esignature-menu-timeline.ts`: `clickEsignatureMenu`, `chooseEsignatureItem`, `clickEsignatureTab`, `typeInEsignatureField`; scene variable `esigMenu`; Signature history is greyed) and the **eSignature dialog tabs** (`ESignatureDialog.tsx`: Draw, Type, Upload and Request, picked with the scene variable `esigTab`; `esigFocus` and the fields `field:esig-name`, `field:esig-email`, `field:esig-message`; copy in `ESIGN` in `insert-data.ts`). A signature in the page (`ObjectBlock.tsx`) is drawn, typed (`kind` "typed" + `text`, italic serif) or uploaded (`kind` "upload", the second sample signature `UPLOADED_SIGNATURE` in `stroke-data.ts`); a `selected` one sits in the shared `SelectionFrame` (handles + floating toolbar; hooks `page-signature`, `signature-handle-<id>`, `signature-toolbar`); step 29's drawn signature stays unselected. `insertObject(tl, kind, { selected, text })`. Steps 41-43 start from `SIGN_SPOT_EDITOR` (sample document + an empty line under Contacts with the caret); `openEsignature(tl, tab)` opens the dialog on a tab. `InsertDialog` and the admin `Modal` got an optional card hook (`cardHook` / `hook`). Request signature ends with a DocToast ("Signature request sent"). Scene files: `scenes/snaarp-doc/Step39ToolsMenu.tsx` ... `Step44RequestSignature.tsx` (+ `stepN-script.ts`, `stepN-data.ts`). **All 44 Snaarp Doc steps are built and the tutorial is complete**: it plays about 17:35 from load to the "You're all set" card (the card follows the last step in the config).

### Shared pieces (file paths)
- Product config (names, titles, URLs, scenes): `tutorials/snaarp-360.ts` (types in `tutorials/types.ts`, registry in `tutorials/index.ts`)
- Route page: `app/tutorials/[productId]/page.tsx`
- Player shell: `components/player/TutorialPlayer.tsx` (also `Rail.tsx`, `BrowserFrame.tsx`, `CompletionCard.tsx`)
- Scene runner (scales the scene, draws the cursor and caption): `components/player/ScenePlayer.tsx`
- Timeline helper (`wait`, `at`, `moveCursorTo`, `click`, `scrollTo`, `scrollPanelTo`, `typeText`, `fill`, `toast`, `flash`, `showCaption`, `highlight`, `clearHighlight`, `hover`, `setUrl`, `animateVar`): `lib/timeline.ts`
- Cursor: drawn and moved in `components/player/ScenePlayer.tsx`; its motion is `moveCursorTo` / `click` in `lib/timeline.ts`; arrow icon is `CursorArrow` in `components/icons.tsx`
- Captions: bubble in `components/player/ScenePlayer.tsx`; driven by `showCaption` / `hideCaption` in `lib/timeline.ts`
- Highlight ring (`.tl-hl`): styles in `app/globals.css`; driven by `highlight` / `clearHighlight` in `lib/timeline.ts`
- `typeText`: in `lib/timeline.ts` (read the typed text in a scene with `lib/useTimelineVar.ts`)
- Toast: `components/admin/Toast.tsx` (`ToastHost`), triggered by `tl.toast` in `lib/timeline.ts`
- Modal: `components/admin/Modal.tsx`
- Dropdown: `components/admin/DropdownMenu.tsx` (`DropdownMenu`, `MenuItem`)
- AdminLayout: `components/admin/AdminLayout.tsx` (sample data in `components/admin/admin-data.ts`; `CopyButton.tsx` alongside)
- Icons file: `components/icons.tsx`
- Narrow-screen helper: `lib/useNarrow.ts`
- Step scenes and scripts: `scenes/snaarp-360/` (`StepNxxx.tsx` + `stepN-script.ts`, with step 3 and 4 screens in the `step3/` and `step4/` folders)
- Step 5 scene + script: `scenes/snaarp-360/Step5Users.tsx`, `scenes/snaarp-360/step5-script.ts`, screens in `scenes/snaarp-360/step5/`
- Admin Panel layout (purple, used by a new admin user; different from the black-pill owner `AdminLayout`): `components/admin-panel/AdminPanelLayout.tsx` (+ `admin-panel-data.ts`)
- New shared form pieces: `components/admin/TypedField.tsx`, `Checkbox.tsx`, `Radio.tsx`, `Chip.tsx`, `CopyActionButton.tsx`; `Modal.tsx` has an inner-scroll mode (`scrollId`); `Toast.tsx` has `position` (top-right or bottom-left)
- Completion screen: `components/player/CompletionCard.tsx`, text/link come from `completion` in the product config (defaults in `tutorials/completion.ts`)
- Shared login panel: `scenes/snaarp-360/step3/DarkPanel.tsx`
- Real product logos: `public/logos/*.svg`, shown with `ProductLogo` / `PRODUCT_LOGOS` in `components/icons.tsx`
- Product config for the dropdown: `tutorials/snaarp-mail.ts` (Snaarp Mail, 9 steps, all built)

### Adding a new product
Add `tutorials/<product-id>.ts` (name, steps, urls, `completion`), register it in `tutorials/index.ts`, and add `scenes/<product-id>/` with one scene component + one script per step. The shell (`components/player/`) and `lib/timeline.ts` are not edited.

### Product switcher
The rail's product card is a dropdown of every product in `tutorials/index.ts` (Snaarp 360 first). Each product has its own steps (modules) listed below it; a product with no built scenes shows a "coming soon" stage (`components/player/ComingSoon.tsx`). Snaarp Mail (`tutorials/snaarp-mail.ts`) is listed with its 10 modules, none built yet. Real product logos live in `public/logos/` and are shown with `ProductLogo` from `components/icons.tsx`.

## Docs
Start with `docs/HANDOFF.md`, then `docs/ARCHITECTURE.md`. All docs are written from the real code.
- `README.md` - what it is, how to run it, controls, links
- `docs/HANDOFF.md` - state, build history, known issues, next ideas, starter prompt for a new AI tool
- `docs/ARCHITECTURE.md` - folder map, how the player and timeline work, config format, data flow
- `docs/TIMELINE-API.md` - every timeline helper and shared UI component
- `docs/STEPS.md` - each step: screens, URLs, sample data, timeline as implemented, recording timestamps
- `docs/DESIGN-TOKENS.md` - fonts, colors, radii, shadows, per-surface rules and where they live
- `docs/DECISIONS-AND-DEVIATIONS.md` - differences from the recording, and what to replace before launch
- `docs/HOW-TO-ADD-A-PRODUCT-OR-STEP.md` - recipes, ffmpeg frame extraction, testing, definition of done
- `AGENTS.md` - tool-neutral rules; `.kiro/steering/` - Kiro steering files (product, tech, structure)

Keep the docs up to date when you change behavior: `STEPS.md` (screens, URLs, timeline), `DECISIONS-AND-DEVIATIONS.md` (anything that differs from the recording) and the Build status above.
