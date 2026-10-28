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
- UK locale everywhere: money is pounds, formatted only through `formatGBP` / `planPrice` in `lib/money.ts` (Intl en-GB; never hard-code a currency sign in scene text, keep the amounts as numbers in the data files; a total is always 12 x the monthly price). Phone numbers are UK, +44 format, from Ofcom's reserved drama range only (mobiles +44 7700 900000-900999, landlines +44 20 7946 0000-0999). The country box reads "United Kingdom" with the UK flag and +44. Addresses are UK samples (10 Acme Street, London, EC1A 1AA), numeric dates are DD/MM/YYYY, long dates read "24 October".
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
Config: `tutorials/snaarp-mail.ts` (17 steps: 1-9 setup, 10-17 email admin). Recording: `ref/mail/Snaarp_Mail_setup.mp4` (copy of `Snaarp_Mail_setup.mp4.mp4` from Downloads; 998x480, 3:05; `ref/` is git-ignored). Frames: `ref/mail/frames-step1/`, `frames-step2/`, `frames-step3/`, `frames-step4/`, `frames-step5/`.

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
| 10. Upload users in bulk (`admin.snaarp.com/admin/users`, same for 11-14) | Done (about 50 s) |
| 11. Request a bulk signature | Done (about 42 s) |
| 12. Add an alias to one user | Done (about 46 s) |
| 13. Add aliases in bulk | Done (about 50 s) |
| 14. Manage a user's signature | Done (about 40 s) |
| 15. Create a group (`admin.snaarp.com/admin/groups`) | Done (about 62 s) |
| 16. Add members and use the group email (ends in a small mailbox, `mail.snaarp.com/inbox`) | Done (about 56 s) |
| 17. Forward emails to other users (`admin.snaarp.com/admin/email-forwarding`; the last step, the completion card follows) | Done (about 56 s) |

Files: `scenes/snaarp-mail/Step1Pricing.tsx`, `step1-script.ts`, `pricing-data.ts` (pound prices from `MONTHLY_MAIL` / `MONTHLY_360`, Mail + 360 tabs). The pricing page is the shared, data-driven `components/pricing/PricingScene.tsx` (types in `pricing-types.ts`, 360 plans in `plans-360.ts`); the 360 tutorial uses the same scene with its own pound prices (`scenes/snaarp-360/pricing-data.ts`). Step 2: `scenes/snaarp-mail/Step2Signup.tsx`, `step2-script.ts`, `signup-data.ts` (all copy, sample values, captions and the password-strength rule live in the data file); it reuses `TypedField` and `Checkbox` from `components/admin/`. Step 3: `scenes/snaarp-mail/Step3Organization.tsx`, `step3-script.ts`, `org-data.ts` (copy, list options, sample values, captions); it is the first screen inside the shared `components/onboarding/OnboardingShell.tsx` (dark progress sidebar + white content; steps 4-9 pass `active="domain" | "dns" | "users" | "done"`). The select lists are the local `SelectField` in `Step3Organization.tsx` (driven by `tl.setVar("open")`, options hoverable with `tl.hover`). Step 4: `scenes/snaarp-mail/Step4Domain.tsx`, `step4-script.ts`, `domain-data.ts`, three small screens in `scenes/snaarp-mail/domain/` (`ChooseScreen`, `EnterScreen`, `SuccessScreen`, shared `Heading`); one `OnboardingShell active="domain"` stays mounted while the scene variable `screen` (a/b/c) swaps the content. Step 5: `scenes/snaarp-mail/Step5Dns.tsx`, `step5-script.ts`, `dns-data.ts` (the five DNS records are defined ONCE in `DNS_RECORDS` there; steps 6 and 7 must import them), `dns/DnsModal.tsx`; the reusable record card is `components/onboarding/DnsRecordCard.tsx` (pending/verified state in the scene variable `dns:<id>`; the "Mark submitted" button flips it). `OnboardingShell` gained an `overlay` slot for modals. While steps are unbuilt, the end card after the last built step reads "Step N complete / The next steps are coming soon." The "You're all set" card appears only when every step is built. Step 6: `scenes/snaarp-mail/Step6Cloudflare.tsx`, `step6-script.ts`, `cloudflare-data.ts` (all copy and captions; the five records are DERIVED from `DNS_RECORDS`, never retyped: the host becomes the Cloudflare Name, `@` for the root, and the mail server loses its trailing dot), pages in `scenes/snaarp-mail/cloudflare/` (`OverviewPage`, `DnsRecordsPage`, `RecordForm`, `RecordsTable`). The reusable frame is `components/cloudflare/CloudflareChrome.tsx` (top bar, left menu, content area, illustration note; also `CfField.tsx`, `parts.tsx`, `cloudflare-data.ts`); any later step that shows Cloudflare should reuse it. One `addRecord` sequence in the script runs five times. New `tl.paste(key, text, flashSelector)` pastes long values instantly. The Cloudflare screens are an ILLUSTRATION (own icons, Open Sans font): check them against the live dashboard before launch. Step 7: no new scene. It plays the Step 5 page (`Step5Dns`) with its own script, `scenes/snaarp-mail/step7-script.ts` (captions `confirm` and `continue` live in `dns-data.ts`): the five cards are marked submitted one by one (about 1.6 s apart, with a small check pop added to `DnsRecordCard`), Continue turns navy and is clicked. `Step5Dns` gained two optional scene variables that step 5 never sets: `holdContinue` (keeps Continue grey a little longer) and `bottomRoom` (extra space under the page so Continue can scroll clear of the caption). Step 8: `scenes/snaarp-mail/Step8Users.tsx`, `step8-script.ts`, `users-data.ts` (all copy, captions, sample people; `NEW_USER` has the same shape as the 360 modal data), small components in `scenes/snaarp-mail/users/` (`OptionCards`, `TeamTable`). It follows the owner's design `ref/mail/users-inbox.png` (no recording exists for this step). It REUSES the 360 `AddUserModal` (`scenes/snaarp-360/step5/AddUserModal.tsx`), which gained an optional `user` setting (default = the 360 sample user, so 360 is unchanged); `MenuItem` in `components/admin/DropdownMenu.tsx` gained an optional icon and `className`; new icons `csvFile` and `googleG`. Scene variables: `team` (users in the table), `menu` (open row menu), plus the modal's own (`modal`, `chips`, `generated`, `creating`). Step 9 (the last): `scenes/snaarp-mail/Step9Finish.tsx` (two screens in one scene: variable `screen` a/b), `step9-script.ts`, `finish-data.ts` (copy, dashboard values `MAIL_STATS`, captions, URLs), `finish/SetupCompleted.tsx` (screen A). It follows the owner's design `ref/mail/setup-completed.png` (no recording exists). `OnboardingShell` gained an optional `completed` setting (the last sidebar item cross-fades into a solid white check circle; other steps do not pass it). Screen B is the 360 owner dashboard (`AdminLayout` + `DashboardContent`), whose new optional `stats` setting defaults to the 360 values, so 360 is unchanged. **All 9 Mail steps are built**: the whole tutorial plays about 4:00 (239.7 s measured) from load to the "You're all set" completion card. Before launch, see "Things to replace or confirm before launch" in `docs/DECISIONS-AND-DEVIATIONS.md` (Cloudflare screens, placeholder URLs, "Users Inbox" vs "Users").

Steps 10-17 (Snaarp Mail email admin; recordings `ref/admin/v306.mp4`, `v211.mp4`, `v33.mp4`, git-ignored) all use ONE stage, `scenes/snaarp-mail/admin/MailAdminStage.tsx` (takes `start` = users / groups / group-page / group-members / mailbox / forwarding): the owner portal `AdminLayout` (new optional `menuItems` and `compactOnNarrow` props; the Mail menu adds Migration) with `MailUsersPage.tsx` (User Management: 14 users A-Z, row menu with Aliases, Manage Signature, Move to Dept), the dialogs in `UsersDialogs.tsx` (Bulk Upload Users, Bulk Signature Update, Manage Aliases with Aliases / Add Alias / Bulk Upload tabs, Manage Signature) on the frame `MDialog.tsx`, `GroupsPages.tsx` (Group Management, the 3-step Create New Group wizard, the group page, Add Members), `ForwardingAndMailbox.tsx` (Email Forwarding and a small mailbox with a New Message window) and ALL copy, sample users and captions in `data.ts`. Per step: `StepNxxx.tsx` + `stepN-script.ts`. Scene variables: `page`, `mUsers`, `mDialog`, `mTarget`, `mRowMenu`, `aliasTab`, `groups`, `gPage`, `wizStep`, `fwdSel`, `fwdSup`, `mbCompose`... (see the file headers). Sample org: Acme Studio, 14 active / 10 inactive / 0 administrators / 12.1 GB. Differences from the recordings: `docs/DECISIONS-AND-DEVIATIONS.md` ("Snaarp Mail admin and Snaarp Admin update").

### Snaarp Doc ("How to use Snaarp Doc", route `/tutorials/snaarp-doc`)
Config: `tutorials/snaarp-doc.ts` (64 steps, all built: the tutorial is complete; the Help menu is intentionally not included; steps 45-64 cover every toolbar tool and header button). Recordings (`ref/` is git-ignored): `ref/docs/Snaarp_Doc_flow.mp4` (steps 1-9, 1010x480, 2:15; frames `ref/docs/frames-step1/`) and `ref/docs/Snaarp_Doc_edit.mp4` (steps 10-13, 1040x480, 1:58; frames `ref/docs/frames-step10/` to `frames-step13/`) and `ref/docs/Snaarp_Doc_view.mp4` (steps 14-18, 1008x480, 2:20; frames `ref/docs/frames-step14/` to `frames-step18/`) and `ref/docs/Snaarp_Doc_insert.mp4` (steps 19-30, the whole Insert menu, 1004x480, 5:59; frames `ref/docs/frames-step19/` (+ `19b`, `19c`) to `frames-step30/`) and `ref/docs/Snaarp_Doc_format.mp4` (steps 31-38, the whole Format menu, 1010x480, 3:44; frames `ref/docs/frames-step31/` to `frames-step38/`) and `ref/docs/Snaarp_Doc_tools.mp4` (steps 39-40, the Tools menu, 1910x910, 31 s; frames `ref/docs/frames-step39/`, `frames-step40/`) and `ref/docs/Snaarp_Doc_esignature.mp4` (steps 41-44, the eSignature menu, 1000x480, 1:25; frames `ref/docs/frames-step41/` to `frames-step44/`) and `ref/docs/Snaarp_Doc_toolbar.mp4` (steps 45-64, the toolbar tools and header buttons, 1006x480, 1:23; frames `ref/docs/frames-toolbar/`, tooltip sheets `ref/docs/sheets-toolbar/`).

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
| 44. Request a signature | Done (about 24.5 s; a toast replaces the recording's browser alert) |
| 45. Undo and redo | Done (about 22 s) |
| 46. Print and Paint format | Done (about 27 s) |
| 47. Change the zoom | Done (about 20 s) |
| 48. Paragraph styles and fonts | Done (about 33 s) |
| 49. Change the font size | Done (about 30 s) |
| 50. Bold, italic, underline | Done (about 28 s) |
| 51. Text color and highlight | Done (about 30 s) |
| 52. Insert a link and an image | Done (about 34 s) |
| 53. Align your text | Done (about 30 s) |
| 54. Line spacing | Done (about 27 s) |
| 55. Lists | Done (about 34 s; Checklist sits in the bullet button's arrow menu) |
| 56. Indent and outdent | Done (about 22 s) |
| 57. Clear formatting, superscript and subscript | Done (about 31 s; the recording's crossed-S button is "Clear formatting", not strikethrough) |
| 58. Quote, horizontal line and table | Done (about 38 s; the recording's quote-mark button is a block quote, there is no Columns tool) |
| 59. Full screen, draw and emoji | Done (about 41 s) |
| 60. Editing, Suggesting and Viewing modes | Done (about 33 s) |
| 61. Start or join a meeting | Done (about 29 s; no real meeting starts) |
| 62. Check version history | Done (about 24 s; header-button version of step 8) |
| 63. Open the Snaarp apps panel | Done (about 28 s; the panel is titled "Snaarp apps" as in the recording) |
| 64. Share your document | Done (about 27 s; the last step, the completion card follows) |

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

Steps 45-64 (the toolbar and the header buttons: undo / redo, print / paint format, zoom, paragraph style, font, size, bold / italic / underline, colours, link / image, alignment, line spacing, lists, indent, clear formatting / superscript / subscript, quote / line / table, full screen / drawing / emoji, editing mode, Meet, Version history, Snaarp apps, Share) all use `EditorStage` with the new setting **`tools`** (plus `startDocument` and `formatting`). It adds: **tooltips** (a dark bubble from `tip`, text in `TOOL_TIPS` / `HEADER_TIPS` in `components/docs/toolbar-data.ts`, taken from the recording), **dropdown cards** drawn by **`ToolbarLayer.tsx`** through `DocEditor`'s new `toolLayer` slot and the placement helper **`Anchored.tsx`** (a card sits under any element by its `data-tl` name; position is worked out in per cent of the editor, so it holds under the scene scaling and the narrow zoom; scene variable `toolMenu` = zoom / style / font / size / color / highlight / spacing / bullets / numbers / table / mode / meet / meetjoin / apps; rows are hooked `tm-<card>-<id>`), **page zoom** (`DocEditor` prop `zoom`, scene variable `zoomPct`), the **header buttons on narrow screens** (`narrowHeaderTools`: Version history, Meet and apps stay), new text marks (`TextFormat` "font", "size", "suggest"; `Block.spacing`), the pure functions `setFormatValue`, `bumpSize`, `copyLook` / `paintLook`, `setSpacing`, `toggleChecked` in `format-state.ts`, and the helpers in **`components/docs/toolbar-timeline.ts`** (`initToolbar`, `pointAt`, `clickTool`, `openMenu`, `chooseRow`, `closeMenu`, `edit`, `runUndo` / `runRedo`, `typeNewLine`, `typeSizeBox`, `typeSuggestion`). Toolbar tool ids were renamed to match the tooltips: `strike` is now `clear`, `pen` is `esign`, `pen-tag` is `drawing`, `signature` is `shortcuts` (`pen-menu` and `emoji` unchanged). `VersionHistoryPage` takes `versions` (sample list in `VERSIONS`); step 8 does not pass it. Scene files: `scenes/snaarp-doc/Step45UndoRedo.tsx` ... `Step64Share.tsx` (+ `stepN-script.ts`, `stepN-data.ts`). **All 64 Snaarp Doc steps are built**: the completion card follows step 64 (the last step in the config); the whole tutorial plays about 27:33 (1652.7 s measured at 1440x900, no console errors, no scrollbars) from load to the "You're all set" card. Differences from the recording: see `docs/DECISIONS-AND-DEVIATIONS.md`.

### Snaarp Admin ("How to add users and give them products", route `/tutorials/snaarp-admin`)
Config: `tutorials/snaarp-admin.ts` (12 steps, all built; the completion card follows step 12, the last step in the config). Steps 1-4 (create a user) come from `ref/admin/Snaarp_Admin_add_users.mp4`; steps 5-12 (Bulk user, filters, products from the Products dropdown, departments) from `ref/admin/v179.mp4` (copy of `Downloads/1027 (2)(1).mp4`; 1498x720, 2:59; `ref/` is git-ignored). The old steps 5-8 (Check the user's access, Manage products dialog) were removed because the recording shows products managed from the Products dropdown with plus and minus; the sidebar no longer has "Bulk Users" (it is the "Bulk user" button on the Users page). Every step plays on the Admin Panel (`login.snaarp.com/admin/users` or `/admin/organization`) and is playable alone from the rail.

| Step | Status |
|---|---|
| 1. Open the Create user form (starts on the Users page) | Done (about 10.5 s) |
| 2. Enter the user's details | Done (about 17 s) |
| 3. Add job details and role | Done (about 26 s) |
| 4. Set a temporary password and create the user | Done (about 19.5 s) |
| 5. Add many users with Bulk user (CSV template, acme-team.csv, fix a row, add a row, Create 4 users) | Done (about 52 s) |
| 6. Find users with filters and search | Done (about 56 s) |
| 7. Add a product to a user (Priya Shah, plus in ADD PRODUCT) | Done (about 40 s) |
| 8. Remove a product from a user (Alex Morgan, minus) | Done (about 36 s) |
| 9. See your departments (Organization page, Filter list) | Done (about 36 s) |
| 10. Create a new department (Design) | Done (about 36 s) |
| 11. Add a member to the department (row menu, Move to department) | Done (about 38 s) |
| 12. Filter users by department (the last step) | Done (about 32 s) |

Files: `scenes/snaarp-admin/UsersStage.tsx` (the one stage: `AdminPanelLayout` + `UsersPage` or `OrganizationPage` by the scene variable `page` + the dialogs + toast; takes a `start` state), `admin-seed.ts` (start states `users`, `create-empty`, `create-names`, `create-details`, `created`, `org`, `org-design`, `users-design`), `admin-data.ts` (shared copy, products, `COUNTS` 38 -> 39 active, 6 suspended, 9 administrators), `people-data.ts` (the 44 sample people: 38 active + 6 suspended, departments, bulk CSV rows, Bulk / Organization / New Department copy), `steps-data.ts` (captions and URLs of steps 5-12), `script-helpers.ts` (`press`, `hoverOn`, `clickAway`), `users/UsersPage.tsx` (stats, search, All departments multi-select, All products list, Clear filters, Role dropdown, Products dropdown with minus and ADD PRODUCT plus, Actions), `users/BulkUsersDialog.tsx`, `users/OrganizationPage.tsx`, `users/NewDepartmentDialog.tsx`, plus the earlier `CreateUserDialog`, `AdminDialog`, `AdminToast`, `ProductIcon`. Scene variables: `users`, `depts`, `page`, `dialog` ("create" / "bulk" / "newdept"), `rowMenu`, `filterMenu`, `deptFilter`, `productFilter`, `field:usersearch`, `bulkRows`, `bulkFile`, `orgFilter`, `orgMenu`, `deptColor`. On a phone the menu column is hidden and a Users / Organization switcher with the same hooks replaces it. Differences from the recordings: `docs/DECISIONS-AND-DEVIATIONS.md` ("Snaarp Mail admin and Snaarp Admin update").

### Snaarp Slides ("How to use Snaarp Slides", route `/tutorials/snaarp-slides`)
Config: `tutorials/snaarp-slides.ts` (56 steps, all built, **Snaarp Slides is complete**: the File menu (steps 1-19), the Edit, View and Insert menus (steps 20-35), then Format, Slide, Arrange and Tools, the toolbar dropdowns and the header buttons (steps 36-56); the completion card follows the last step in the config, step 56, so it moves by itself if steps are added). Third recording: `ref/slides/Snaarp_Slides_final.mp4` (copy of `Downloads/1027.mp4`; 1008x480, 133 s; frames in `ref/slides/frames-final/`, sheets in `ref/slides/sheetsF/`, zooms in `ref/slides/zf/`). Second recording: `ref/slides/Snaarp_Slides_edit_view_insert.mp4` (copy of `Downloads/1026 (1)(2).mp4`; 1006x480, 107 s; Edit 0:00-0:08, View about 0:09-0:40, Insert about 0:40-1:47; frames and sheets in `ref/slides/eiv/`). Recording: `ref/slides/Snaarp_Slides_file.mp4` (copy of `Downloads/1026 (1)(1).mp4`; 1006x480, 3:48; `ref/` is git-ignored; frames in `ref/slides/frames-file/`, sheets in `ref/slides/sheets3/`, zooms in `ref/slides/z/`). The product logo is the existing `presentation` logo. Same engine and player shell as Snaarp Doc. The whole tutorial plays about 17:05 (about 1025 s: 1053 s measured at 1440x900 with the removed step 36 included, minus its 28 s; no console errors, no scrollbars) from load to the "You're all set" card (the File menu alone was about 9:16, 556 s).

| Step | Status |
|---|---|
| 1. Open Snaarp Slides (starts on the Presentations home; Starred and Trash shown) | Done (19 s) |
| 2. Start a blank presentation (home -> loading -> "Let's start creating" chooser -> Blank slide) | Done (21 s) |
| 3. Meet the File menu | Done (21 s) |
| 4. Start something new (File > New) | Done (31 s) |
| 5. Open a presentation (File > Open, all six tabs) | Done (32.8 s) |
| 6. Import slides (upload `acme-pitch.pptx`, three slides arrive) | Done (31 s) |
| 7. Make a copy | Done (28 s) |
| 8. Share your presentation (Share with others, Publish to web) | Done (40 s) |
| 9. Email the presentation (Email this file, Email collaborators) | Done (45 s) |
| 10. Download in a format you need (all seven formats, PDF downloaded) | Done (26 s) |
| 11. Rename your presentation | Done (20 s) |
| 12. Move it to a folder | Done (22 s) |
| 13. Use version history (name a version, side panel, restore) | Done (38 s) |
| 14. Make it available offline | Done (24 s) |
| 15. See the presentation details | Done (21 s) |
| 16. Set the page size (16:9, 4:3, Custom) | Done (38 s) |
| 17. Print your presentation | Done (33 s) |
| 18. Options that are not available yet (four greyed-out items with tooltips) | Done (24 s) |
| 19. Move a presentation to Trash (File menu, the last of the File round) | Done (30 s) |
| 20. Undo and redo (Edit; starts in the editor on slide 2 of "Acme Studio Pitch 2026", the same start for 21-35) | Done (26 s) |
| 21. Select all | Done (17 s) |
| 22. Cut, copy and paste (greyed first, then copy, paste, cut, paste on slide 3) | Done (41 s) |
| 23. Duplicate and delete | Done (25 s) |
| 24. Find and replace (greyed in the recording; built fully working) | Done (38 s) |
| 25. Add speaker notes (View) | Done (28 s) |
| 26. Show the ruler | Done (25 s) |
| 27. Show guides (the rectangle snaps onto a guide) | Done (27 s) |
| 28. Change the zoom | Done (31 s) |
| 29. Present in full screen (simulated inside the frame) | Done (26 s) |
| 30. Add a text box (Insert) | Done (27 s) |
| 31. Insert an image (our in-app picker, not the OS window) | Done (28 s) |
| 32. Insert shapes | Done (34 s) |
| 33. Draw a line | Done (23 s) |
| 34. Insert a table | Done (33 s) |
| 35. Insert a chart (Chart properties panel, Bar / Line / Pie switch) | Done (30.5 s) |
| 36. Format your text (Format; starts in the editor on slide 2, the same start for 37-56 unless noted) | Done (33 s) |
| 37. Align and indent your text | Done (40 s) |
| 38. Change the theme (Format > Theme and the toolbar Theme; ends on Ocean Blue) | Done (38 s) |
| 39. Change the slide background | Done (30 s) |
| 40. Add a new slide (Slide) | Done (25 s) |
| 41. Duplicate a slide | Done (22 s) |
| 42. Skip a slide (also checks the full screen leaves it out) | Done (40 s) |
| 43. Delete a slide (toast with Undo) | Done (26 s) |
| 44. Change the stacking order (Arrange; own slide 2 with three squares) | Done (42 s) |
| 45. Align objects (own slide 2: title and one circle) | Done (46 s) |
| 46. Distribute objects (three squares) | Done (36 s) |
| 47. Rotate objects (one arrow) | Done (36 s) |
| 48. Check your spelling (Tools; the title starts misspelt) | Done (30 s) |
| 49. Explore ideas | Done (42 s) |
| 50. Set your preferences | Done (38 s) |
| 51. Meet the toolbar tools (ten tools; grey box under the blue one) | Done (68 s) |
| 52. Pick a layout (starts on a new empty slide 4) | Done (34 s) |
| 53. Add a slide transition (preview from slide 2 to slide 3) | Done (40 s) |
| 54. Present your slides (Slideshow dropdown, presenter view, display options) | Done (64 s) |
| 55. Join or start a meeting (no real meeting; toast says sample) | Done (42 s) |
| 56. Share and set permissions (the last step: the completion card follows) | Done (38 s) |

Files: ONE stage for all steps, `components/slides/SlidesApp.tsx` (home + loading + editor + File menu + every dialog, driven by scene variables; it takes `startStage` and `startTitle`). Steps 3-19 start in the editor with the "Acme Studio Pitch" deck (one blank title slide). Shell pieces: `SlidesLayout.tsx` (app rail, sidebar, top bar), `HomeScreens.tsx` (home, Starred, Trash), `SlidesEditor.tsx` (header, menu bar, toolbar, slide panel, canvas, right panel and rail, notes bar; its `overlay` slot is where later menus hang their dropdowns), `SlideView.tsx` (a slide drawn in container-query units, used by the canvas and the thumbnails), `SlidesFileMenu.tsx` (the File menu and its six submenus, labels and greyed items read from the recording, tooltips for greyed items), dialogs in `dialogs-start.tsx` (chooser, templates, Open, Import), `dialogs-share.tsx` (Publish, the two Email dialogs, Move) and `dialogs-manage.tsx` (Name version, Details, Page setup, Trash confirm, the Version history side panel), shared form pieces `parts.tsx` (`SDialog`, `SField`...), helpers `slides-timeline.ts` (`openFileMenu`, `hoverItem`, `hoverSub`, `chooseItem`, `chooseSub`, `pressOn`, `typeInto`, `toast`...), ALL shared copy and sample data in `slides-data.ts`. Per step: `scenes/snaarp-slides/step<N>/Step<N>.tsx`, `script.ts`, `data.ts` (captions, URLs). Reused from Snaarp Doc: `ShareDialog` and `PrintDialog` (both got optional, additive settings; Snaarp Doc is unchanged by default), `DocToast`, the admin `Modal`. New `sl*` icons are in `components/icons.tsx`. All differences from the recording and everything the brief asked for that the recording does not show: `docs/DECISIONS-AND-DEVIATIONS.md` ("Snaarp Slides").

Steps 20-35 (Edit, View, Insert) all use ONE scene component, `scenes/snaarp-slides/EivStage.tsx` (`SlidesApp` with `startSlides` = `EIV_DECK`: three slides, slide 2 "Our services" selected), and `scenes/snaarp-slides/eiv.ts` (`beginEiv` resets deck, selection and undo history; `clickBlank`). The slide is now drawn from **elements** (`components/slides/slide-elements.ts`: text, shape, image, line, table, chart; sizes in cqw; sample content and copy in `slide-elements-data.ts`; drawn by `SlideElements.tsx` and `ChartGraphic.tsx`; thumbnails draw them too but without `data-tl` hooks, so `[data-tl=el-<id>]` always finds the big canvas). The Edit, View and Insert dropdowns are data (`slides-menus-data.ts`) drawn by `SlidesDropdown.tsx` and hung under their menu label through `SlidesEditor`'s `dropdowns` prop; the helpers are `menu-timeline.ts` (`openMenu`, `hoverRow`, `hoverSubRow`, `chooseRow`, `chooseSubRow`, `pressFullScreenArrow`) and `slides-edit.ts` (history, copy / cut / paste / duplicate / delete, the inserts, text and cell typing, find and replace, and the cursor-driven `sweepTo`, `dragElementBy`, `drawTextBox`, `resizeElementBy`). Other new pieces: `SpeakerNotes.tsx`, `SlidesFindPanel.tsx` (Snaarp Doc's card adapted), `SlidesFullScreen.tsx` (same look and variables as Doc's full screen), `dialogs-insert.tsx` (`InsertImageDialog`, `ChartPanel`), `sample-images.ts` (three SVG illustrations). `lib/timeline.ts`: `moveCursorTo` got an optional `onMove` callback (additive). Scene variables, hooks and every deviation: `docs/STEPS.md` and `docs/DECISIONS-AND-DEVIATIONS.md` ("Snaarp Slides steps 20-36"). Rail groups: Edit (20-24), View (25-29), Insert (30-36).

Steps 36-56 (Format, Slide, Arrange, Tools, the toolbar and the header; **Snaarp Slides is complete, 56 steps, about 31 minutes from load to the completion card**) all use the same `EivStage`. New in the code: the Format, Slide, Arrange and Tools dropdowns are data in `components/slides/slides-menus-data.ts`; what they do is `slides-format.ts` (formatting, alignment, indent, spacing, theme, slide background, new / duplicate / delete / skip slide, layout, transition, stacking, align, distribute, rotate, paint format) and `slides-tools.ts` (Spelling, Explore, Preferences); the toolbar cards (`ToolbarCards.tsx` + `toolbar-timeline.ts`: Theme, Background, Layout, Transition, zoom, shape) and the header cards (`HeaderCards.tsx` + `header-timeline.ts`: Slideshow, meeting) hang under their buttons with Snaarp Doc's `Anchored` (the editor has a new `toolLayer` slot; the toolbar's four dropdown buttons and the header buttons have hooks); `slides-theme.tsx` (the deck theme is a React context every `SlideView` reads), `PresenterView.tsx`, `TransitionPreview.tsx`, `dialogs-tools.tsx` (Explore panel, Preferences, Presentation display options, meeting code); copy and sample data in `slides-toolbar-data.ts` and `slides-tools-data.ts`; the start decks in `slide-elements-data.ts`. A slide can have a `bg`, `skipped` and `transition`; a text box `fmt`, `align`, `indent`, `spacing`; any element `rotate`. Shared files changed outside the Slides folders: `components/docs/DocToast.tsx` + `doc-toast-timeline.ts` (optional Undo button on the toast) and `app/globals.css` (`.tl-hl.absolute`: ringing an absolutely positioned element no longer shifts it). The narrow-screen header now keeps the meeting icon, Slideshow and the people pill. **Spelling and Explore are built as working features although the recording shows them greyed (Spelling with a "Coming soon" tooltip); Group, Ungroup, Change layout / Transition (Slide menu) and Present using Chromecast stay greyed.** Scene variables, hooks and every deviation: `docs/STEPS.md` and `docs/DECISIONS-AND-DEVIATIONS.md` ("Snaarp Slides steps 36-56"). Rail groups: Format (36-39), Slide (40-43), Arrange (44-47), Tools (48-50), Toolbar (51-53), Header (54-56).

### Snaarp Sheets ("How to use Snaarp Sheets", route `/tutorials/snaarp-sheets`)
Config: `tutorials/snaarp-sheets.ts` (19 steps, all built; **this first round covers only the File menu**; the completion card follows the last step in the config, so it moves by itself when later rounds append Edit, View, Insert, Format, Data, Tools... steps and groups; rail group "File menu" starts at step id `meet-file-menu`). Recording: `ref/sheets/Snaarp_Sheets_file.mp4` (copy of `Downloads/1028.mp4`; 1452x720, 3:33; `ref/` is git-ignored; contact sheets in `ref/sheets/s1/`, full-size frames in `ref/sheets/f/`). The product logo is the existing `sheet` logo. Same engine and player shell as Snaarp Doc and Slides. The whole round plays about 5:55 (354.6 s measured at 1440x900: all 19 steps, no console errors, no scrollbars).

| Step | Status |
|---|---|
| 1. Meet the File menu (the whole menu, group by group) | Done (23 s) |
| 2. Start a new spreadsheet (File > New) | Done (11 s) |
| 3. Open a file (Recent, Starred empty state, Upload; opens the budget) | Done (24 s) |
| 4. Import a file (My Drive, Upload, in-app chooser, Next) | Done (21 s) |
| 5. Choose where to import (four options; adds the acme-contacts tab) | Done (17 s) |
| 6. Make a copy | Done (16 s) |
| 7. Share your spreadsheet (add a person, general access, Copy link, gear settings) | Done (27 s) |
| 8. Email the file (file type list) | Done (25 s) |
| 9. Download a copy (six formats; no real file) | Done (23 s) |
| 10. Rename your spreadsheet (purple Rename button, as in the recording) | Done (15 s) |
| 11. Move it to a folder | Done (21 s) |
| 12. Add a shortcut to Drive | Done (21 s) |
| 13. Move it to the trash (toast with Undo; Undo is clicked) | Done (12 s) |
| 14. Name this version | Done (14 s) |
| 15. See the version history (full page, Show changes) | Done (19 s) |
| 16. Make it available offline | Done (13 s) |
| 17. See the file details (side panel, description) | Done (18 s) |
| 18. Settings (greyed out; caption-only step) | Done (9 s) |
| 19. Print your spreadsheet (in-app print preview; the last step) | Done (17 s) |

Files: ONE stage for all steps, `components/sheets/SheetsApp.tsx` (the editor, the File menu, every dialog, the Version history page, the toast; driven by scene variables, listed in its header comment; it takes `start`, a workbook from `sheets-sample.ts`: `BLANK_BOOK`, `BUDGET_BOOK` "Budget draft", `NAMED_BOOK` "Acme Studio – Q3 Budget"). Shell pieces: `SheetsEditor.tsx` (title row, menu bar, decorative toolbar, name box and formula bar, grid with row and column headers, sheet tabs, a side column for File details; enlarged 2.4x under 900 px), `SheetsFileMenu.tsx` (the seven groups and the two submenus), `dialogs-files.tsx` (Open, Import, Import location), `dialogs-share.tsx` (Copy, Share, Email), `dialogs-manage.tsx` (Rename, Move and Add shortcut (one picker), Name current version, File details panel, Print), `VersionHistoryScreen.tsx`, shared form pieces `parts.tsx` (`ShDialog`, `ShField` (with `initial` for prefilled boxes), `BlueButton`...), helpers `sheets-timeline.ts` (`pressOn`, `openFileMenu`, `hoverItem`, `hoverSub`, `chooseItem`, `chooseSub`, `pickTab`, `swapWorkbook`, `typeInto`, `toast`, `notice` (the green pill in the header), `ring`, `begin`), and ALL copy, menus and sample data in `sheets-data.ts` (cells and workbooks in `sheets-sample.ts`; pounds go through `formatGBP`). Per step: `scenes/snaarp-sheets/step<N>/Step<N>.tsx`, `script.ts`, `data.ts` (captions, URLs); steps 11 and 12 share `scenes/snaarp-sheets/locate.ts`. Reused: `DocToast` (with its Undo button), the admin `Modal`. New `sh*` icons are in `components/icons.tsx`. Everything that differs from the recording, and the placeholders to replace before launch: `docs/DECISIONS-AND-DEVIATIONS.md` ("Snaarp Sheets steps 1-19"); screens, start states and timelines: `docs/STEPS.md`.

### Player behaviour: locked canvas and click to pause
The scene is view-only. `components/player/CanvasOverlay.tsx` (copy and limits in `canvas-overlay-data.ts`) is a transparent layer over the scene inside the browser frame (z-45, below the completion card): clicks, wheel, touch swipes, scroll keys, context menu and middle-click never reach the scene, and the scaled scene div is `inert` (no focus, no Tab). Scripted scrolling is unaffected. One click or tap (pointer events, drag over 8 px ignored, 150 ms debounce) or Enter on the focused overlay toggles the same `paused` state as Space, so both stay in sync. Pause freezes the timeline, cursor, captions and Web Animations (existing `Timeline.setPaused`), plus CSS animations through `data-paused` on the player root (rule in `app/globals.css`). The indicator (round pause icon + "Paused. Click to play") replaces the old top-left pill; a play icon flashes for 400 ms on resume (hidden with prefers-reduced-motion). The overlay does nothing once the completion card shows. Changing step, replay or opening another tutorial resets to playing. No scene, timing or content changed.

### Saved progress (checkmarks survive reloads)
Completed steps are saved in the browser. `lib/progress.ts` keeps one localStorage key, `snaarp-tutorials:progress:v1`, shaped `{ [tutorialSlug]: { completed: [stepId], updatedAt } }` (only slugs, step ids and timestamps). A step is saved the moment it plays to its end (the same moment the check appears; `progressStore.complete` is called from `TutorialPlayer.handleDone` and writes synchronously). `lib/useProgress.ts` (`useSyncExternalStore`) feeds the rail checks, every product's "n/total" counter (also in the product dropdown) and `TutorialPlayer`; counters are `invisible` (space kept) for the first hydration frame (`ready`). On load the JSON is validated and cleaned: bad JSON or shape gives empty progress, and unknown slugs or step ids are dropped silently (a new step simply shows unchecked). Every storage call is in try/catch; if storage is blocked or full the player keeps in-memory progress. A `storage` event listener keeps two tabs in sync. Replay no longer clears the checks. A quiet "Reset progress" button (`components/player/ResetProgress.tsx`, copy in `progress-data.ts`) sits at the bottom of the rail and clears everything after a confirm popover. **Step ids are now the saved identity of a step: never rename or reuse a step `id` in `tutorials/*.ts` (titles and order may change freely); a renamed id loses its saved check.**

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
(Snaarp Admin is the fourth product: `tutorials/snaarp-admin.ts`, 12 steps, all built. Snaarp Slides is the fifth: `tutorials/snaarp-slides.ts`, 56 steps (the whole product), all built. Snaarp Sheets is the sixth: `tutorials/snaarp-sheets.ts`, 19 steps (the File menu round), all built.) The rail starts with the search box (see "Rail search"). The rail's product card is a dropdown of every product in `tutorials/index.ts` (Snaarp 360 first). Each product has its own steps (modules) listed below it; a product with no built scenes shows a "coming soon" stage (`components/player/ComingSoon.tsx`). Snaarp Mail (`tutorials/snaarp-mail.ts`) is listed with its 17 modules, all built. Real product logos live in `public/logos/` and are shown with `ProductLogo` from `components/icons.tsx`.

### Rail search ("Search products, modules")
The box at the top of the rail searches products AND modules (steps) as you type (60 ms debounce, first letter instant). Files: `components/player/RailSearch.tsx` (the combobox + results panel; the normal rail content is passed in as children and stays mounted, `inert`, under the panel), copy and limits in `components/player/rail-search-data.ts`, the pure index and ranking in `lib/search-index.ts`, the cross-product jump slot in `lib/pending-jump.ts`, shared `components/player/ProductMark.tsx`. **The index is built from `tutorials/*.ts`** (`buildSearchIndex(tutorials)`), so a new product or step is searchable with no extra list: one product entry per tutorial (name + `product.aliases`) and one module entry per BUILT step (title, group, product name). Optional config fields: `product.aliases` (find the product only: "doc", "email"...) and `groups: [{ title, from: <step id> }]` (Snaarp Doc has Getting started, File, Edit, View, Insert, Format, Tools, eSignature, Toolbar, Header buttons; a group name is matched and shown in the result's small line, it is not a result of its own). Ranking: word-start match first, then the field (title, group, product name); results are max 6 products and 10 modules with "Show N more". Picking a module in the open product calls the player's `select`; in another product it stores the step in `lib/pending-jump.ts` and `router.push`es, and the new `TutorialPlayer` starts on that step (so the rail shows it active; the rail list scrolls the active step into view). Keys: ArrowUp/Down, Enter, Escape (clears and blurs), "/" (handled in `TutorialPlayer`: expands the rail and focuses the box). While the rail is collapsed, `BrowserFrame` shows a search icon next to the expand button (`onSearch`). Typing never touches the tutorial; only picking a result does.

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

### Auto-scroll and visibility QA
The canvas is locked, so the player scrolls for the viewer. Every timeline action that targets an element (`moveCursorTo`, `click`, `highlight`, `hover`, `followPath`, and `showCaption(text, { target })`) first calls `Timeline.ensureVisible(el)` (`lib/timeline.ts`, geometry in `lib/visibility.ts`): it finds every scroll container the target lives in (modal body, panel, dropdown list, the page), scrolls them innermost first so the target ends up fully inside each one with a 24 px margin (centred when there is room, its top when it is taller than the window), clear of sticky or fixed bars and the caption bubble. The scroll is smooth (400-600 ms), pause-aware, cancelled with the step, instant under prefers-reduced-motion, and the cursor moves only after the target has stopped moving (final position is re-measured). A target already in view costs no time, so existing step timings are unchanged. If the caption bubble would still cover a small target, it slides to the top of the frame for that moment (`placeCaption`). A dialog or panel that opens again (its `aria-hidden` goes true to false) starts from its top (`ScenePlayer`). **Rule for scenes: every target must be reachable by ensureVisible, so it must sit inside a scroll container (not behind `overflow: hidden`), and a popup menu inside an animated row needs `relative z-20` on that row while open.** Dialogs need a max-height with a scrolling body and pinned header and footer.
`npm run qa:visibility` (`scripts/qa-visibility.ts`, needs the app running; options `--tutorial`, `--viewport`, `--step`, `--speed`, `--workers`, `--retry <report>`) plays every step at 1920x1080, 1440x900, 1280x720 and 390x844 through the timeline's QA hooks (`window.__snaarpProbe`, `window.__snaarpSpeed`) and writes `docs/QA-VISIBILITY.md`. Intended overlaps are listed in its `ACCEPTED` array. Run it after adding or changing a step; use `--speed 1` to re-check anything that only shows at high speed (fading dialogs and sliding panels look "covered" for a moment).
