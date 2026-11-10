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
2. Screenshots at 1920x1080 and 1280x720, taken partway through the step, visually match the extracted video frames and reference.png (spacing, sizes, colors). Perform a side-by-side visual audit against reference video frames at the end of every built step before moving on.
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
Config: `tutorials/snaarp-sheets.ts` (116 steps, all built, **Snaarp Sheets is complete**; **round 5 is the toolbar and header tools (steps 85-116)**; **round 1 is the File menu (steps 1-19), round 2 the Edit and View menus (steps 20-36), round 3 the Insert menu (steps 37-55), round 4 the Format, Data, Tools, Extensions and Help menus (steps 56-84)**; the completion card follows the last step in the config (now step 116), so it moves by itself when later rounds append Format, Data, Tools... steps and groups; rail groups "File menu" (from `meet-file-menu`), "Edit menu" (from `meet-edit-menu`), "View menu" (from `meet-view-menu`), "Insert menu" (from `insert-overview`), "Format menu" (`format-overview`), "Data menu" (`data-overview`), "Tools menu" (`tools-overview`), "Extensions menu" (`extensions-menu`) and "Help menu" (`help-overview`), "Toolbar" (`tb-overview`) and "Header tools" (`hdr-apps`))). Recording: `ref/sheets/Snaarp_Sheets_file.mp4` (copy of `Downloads/1028.mp4`; 1452x720, 3:33; `ref/` is git-ignored; contact sheets in `ref/sheets/s1/`, full-size frames in `ref/sheets/f/`). The product logo is the existing `sheet` logo. Same engine and player shell as Snaarp Doc and Slides. The File round alone played about 5:55 (354.6 s); with the Edit and View round the whole tutorial plays about 12:02 (722.3 s measured at 1440x900 from load to the completion card, no console errors, no scrollbars).

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
| 19. Print your spreadsheet (in-app print preview) | Done (17 s) |
| 20. Meet the Edit menu (Edit; the sample budget with A1 selected, the same start for 21-36) | Done (19.8 s) |
| 21. Undo a change (type a new cost in C2, Edit > Undo) | Done (15.7 s) |
| 22. Redo a change (starts after a typed cost was undone) | Done (12.6 s) |
| 23. Cut cells (marching ants) | Done (17 s) |
| 24. Copy cells | Done (16.6 s) |
| 25. Paste cells (starts with A2:B3 copied) | Done (14.5 s) |
| 26. Paste special (values only, formatting only, transposed) | Done (40.5 s) |
| 27. Delete cells, rows and columns (the sample is put back between the three) | Done (32.4 s) |
| 28. Find and replace (floating card; not in the recording) | Done (23.5 s) |
| 29. Meet the View menu | Done (17.5 s) |
| 30. Show or hide parts of the sheet (Formula bar, Gridlines, Formulas) | Done (40.5 s) |
| 31. Freeze rows and columns | Done (41.7 s) |
| 32. Group rows and columns | Done (41.7 s) |
| 33. Add a comment (Comments panel) | Done (24.7 s) |
| 34. Hidden sheets (greyed out; caption only) | Done (9.7 s) |
| 35. Change the zoom | Done (31.9 s) |
| 36. Go full screen (simulated inside the frame) | Done (17.4 s) |
| 37. Meet the Insert menu | Done (17.0 s) |
| 38. Insert cells | Done (18.3 s) |
| 39. Insert rows | Done (17.0 s) |
| 40. Insert columns | Done (17.0 s) |
| 41. Add a sheet | Done (9.3 s) |
| 42. Chart: choose a type | Done (40.9 s) |
| 43. Chart: style and titles | Done (38.8 s) |
| 44. Chart: series, legend and axes | Done (40.3 s) |
| 45. Insert an image in a cell | Done (23.8 s) |
| 46. Insert an image over cells | Done (17.0 s) |
| 47. Insert a function | Done (44.8 s) |
| 48. Insert a link | Done (26.6 s) |
| 49. Insert a checkbox | Done (13.9 s) |
| 50. Insert a dropdown | Done (35.1 s) |
| 51. Insert an emoji | Done (13.8 s) |
| 52. Smart chips: add a person | Done (19.1 s) |
| 53. Smart chips: dates, places, files and more | Done (58.4 s) |
| 54. Insert a comment | Done (25.2 s) |
| 55. Insert a note | Done (22.0 s) |
| 56. Meet the Format menu | Done (about 24.5 s) |
| 57. Number formats | Done (about 90.6 s) |
| 58. Bold, italic, underline and strikethrough | Done (about 36.2 s) |
| 59. Change the font size | Done (about 23.6 s) |
| 60. Align your cells | Done (about 35.0 s) |
| 61. Wrap long text | Done (about 23.8 s) |
| 62. Rotate text | Done (about 32.8 s) |
| 63. Clear formatting | Done (about 23.7 s) |
| 64. Options that are not available yet | Done (about 14.2 s) |
| 65. Meet the Data menu | Done (about 21.2 s) |
| 66. Sort the whole sheet | Done (about 19.1 s) |
| 67. Sort part of a sheet | Done (about 21.4 s) |
| 68. Sort a column A to Z | Done (about 14.2 s) |
| 69. Create a filter | Done (about 30.9 s) |
| 70. Save a filter view | Done (about 40.8 s) |
| 71. Add a dropdown with Data validation | Done (about 44.5 s) |
| 72. Name a range | Done (about 25.2 s) |
| 73. Protect a sheet | Done (about 29.5 s) |
| 74. Meet the Tools menu | Done (about 15.4 s) |
| 75. Record a macro | Done (about 28.4 s) |
| 76. Run and delete a macro | Done (about 24.9 s) |
| 77. Check your spelling | Done (about 17.6 s) |
| 78. Turn Autocomplete on and off | Done (about 27.6 s) |
| 79. Set your notifications | Done (about 21.5 s) |
| 80. Accessibility options | Done (about 38.3 s) |
| 81. Meet the Extensions menu | Done (about 17.1 s) |
| 82. Meet the Help menu and search the menus | Done (about 22.7 s) |
| 83. See the keyboard shortcuts | Done (about 19.1 s) |
| 84. About Snaarp Sheets | Done (about 12.4 s) |
| 85. Meet the toolbar | Done (about 24 s) |
| 86. Find and replace with Search | Done (about 40.5 s) |
| 87. Undo and redo | Done (about 25.2 s) |
| 88. Print your spreadsheet with the toolbar | Done (about 19 s) |
| 89. Copy formatting with Paint format | Done (about 23.2 s) |
| 90. Change the zoom | Done (about 25.7 s) |
| 91. Format as currency | Done (about 32.5 s) |
| 92. Percent and decimal places | Done (about 26.8 s) |
| 93. More formats | Done (about 42.2 s) |
| 94. Change the font | Done (about 25.8 s) |
| 95. Change the font size | Done (about 21 s) |
| 96. Bold, italic, underline and strikethrough | Done (about 32.2 s) |
| 97. Text colour and fill colour | Done (about 76.5 s) |
| 98. Borders | Done (about 48.5 s) |
| 99. Merge cells | Done (about 48.8 s) |
| 100. Horizontal align | Done (about 31.1 s) |
| 101. Vertical align | Done (about 33.7 s) |
| 102. Text wrapping | Done (about 30.7 s) |
| 103. Text rotation | Done (about 41.5 s) |
| 104. Insert a link | Done (about 29.8 s) |
| 105. Insert a comment | Done (about 20.6 s) |
| 106. Insert a chart | Done (about 25.6 s) |
| 107. Create a filter | Done (about 25.8 s) |
| 108. Functions: the quick list | Done (about 61.4 s) |
| 109. Functions: the categories | Done (about 65 s) |
| 110. More (three dots) | Done (about 23.4 s) |
| 111. Snaarp apps icon | Done (about 17.9 s) |
| 112. Version history icon | Done (about 19 s) |
| 113. Comments icon | Done (about 18.7 s) |
| 114. Video call | Done (about 30.2 s) |
| 115. Lock icon | Done (about 12.8 s) |
| 116. Share and profile | Done (about 18.3 s) |

Files: ONE stage for all steps, `components/sheets/SheetsApp.tsx` (the editor, the File menu, every dialog, the Version history page, the toast; driven by scene variables, listed in its header comment; it takes `start`, a workbook from `sheets-sample.ts`: `BLANK_BOOK`, `BUDGET_BOOK` "Budget draft", `NAMED_BOOK` "Acme Studio – Q3 Budget"). Shell pieces: `SheetsEditor.tsx` (title row, menu bar, decorative toolbar, name box and formula bar, grid with row and column headers, sheet tabs, a side column for File details; enlarged 2.4x under 900 px), `SheetsFileMenu.tsx` (the seven groups and the two submenus), `dialogs-files.tsx` (Open, Import, Import location), `dialogs-share.tsx` (Copy, Share, Email), `dialogs-manage.tsx` (Rename, Move and Add shortcut (one picker), Name current version, File details panel, Print), `VersionHistoryScreen.tsx`, shared form pieces `parts.tsx` (`ShDialog`, `ShField` (with `initial` for prefilled boxes), `BlueButton`...), helpers `sheets-timeline.ts` (`pressOn`, `openFileMenu`, `hoverItem`, `hoverSub`, `chooseItem`, `chooseSub`, `pickTab`, `swapWorkbook`, `typeInto`, `toast`, `notice` (the green pill in the header), `ring`, `begin`), and ALL copy, menus and sample data in `sheets-data.ts` (cells and workbooks in `sheets-sample.ts`; pounds go through `formatGBP`). Per step: `scenes/snaarp-sheets/step<N>/Step<N>.tsx`, `script.ts`, `data.ts` (captions, URLs); steps 11 and 12 share `scenes/snaarp-sheets/locate.ts`. Reused: `DocToast` (with its Undo button), the admin `Modal`. New `sh*` icons are in `components/icons.tsx`. Everything that differs from the recording, and the placeholders to replace before launch: `docs/DECISIONS-AND-DEVIATIONS.md` ("Snaarp Sheets steps 1-19"); screens, start states and timelines: `docs/STEPS.md`.

**Edit and View round (steps 20-36).** Recording `ref/sheets/Snaarp_Sheets_edit_view.mp4` (copy of `Downloads/1028(1).mp4`; 1456x720, 1:38; contact sheets in `ref/sheets/ev/`). All 17 steps use the same stage with the sample "Acme Studio – Q3 Budget" (`EDIT_BOOK` in `sheets-sample.ts`: styled header row, four items, a Total row with a live `=SUM`). New code: `components/sheets/SheetGrid.tsx` (the grid; selection, marching ants, editing cell, find highlights, comment corners, gridlines, formulas, freeze, scroll, zoom, groups), `grid-state.ts` (pure cell operations: copy, paste in four modes, clear, delete row / column with the SUM range following, find, replace, `recalc`), `edit-view-data.ts` (ALL copy: the Edit and View menus, submenus, sample, Find, Comments, full screen), `SheetMenu.tsx` (the Edit and View dropdowns, hung inside their menu-bar labels through `SheetsEditor`'s `menuSlots`), `EditViewPanels.tsx` (Comments panel in the File details side slot, floating Find and replace card), `edit-timeline.ts` (helpers: `beginEdit`, `clickCell`, `dragSelect`, `typeInCell`, `openMenu`, `chooseRow`, `chooseSub`, `runAction`, `scrollGrid`, ...; see `docs/TIMELINE-API.md`). `SheetsEditor` gained optional `menuSlots`, `grid`, `formulaBar`, `zoomLabel`, `canUndo`, `canRedo`, `fullScreen` (the File steps pass none and draw as before); `Cell` gained `fill` and `formula`. Step ids of this round are prefixed `edit-` / `view-` (`copy` already names File > Make a copy). Start states, scene variables, hooks and timelines: `docs/STEPS.md` ("Snaarp Sheets steps 20-36"); differences from the recording (sample data, Find and replace and the three behaviours of Paste special and Delete built from the brief, Full screen simulated, Comments chips, Hidden sheets tooltip): `docs/DECISIONS-AND-DEVIATIONS.md`.

**Insert round (steps 37-55).** Recording `ref/sheets/Snaarp_Sheets_insert.mp4` (copy of `Downloads/1028(2).mp4`; 1456x720, 6:22; contact sheets in `ref/sheets/ins/`, label zooms in `ref/sheets/ins/z/`). Pivot table and Drawing only show "not yet supported" in the product, so they are in the menu overview (step 37) but have no step. All 19 steps use the same stage with the sample from `INSERT_BOOK` in `sheets-sample.ts`: the Acme Studio budget (Item | Owner | Cost | Status) plus monthly Jul / Aug / Sep costs in E:G, a live Total, and a second tab "Forecast" (the Sheet step adds "Sheet 3"). New code: `insert-data.ts` (ALL copy: the Insert menu and submenus, sample, Chart, Image, Function, Link, Checkbox, Dropdown, Emoji, Smart chips, Comment, Note), `insert-timeline.ts` (helpers: `beginInsert`, `resetInsertSheet`, `clickRowHead`, `clickColHead`, the chart, image, function, link, checkbox, dropdown, emoji, chip, comment and note helpers), `chart-state.ts` (pure chart state: palettes, `chartData` read from the cells, series order, trendline) with `ChartGraphic.tsx` (lightweight in-house SVG: column, line, area, scatter, pie; stacking, right axis, labels, trendline, error bars, legend, titles) and `ChartEditor.tsx` (the Setup / Customize panel), `dialogs-insert.tsx` (Insert image dialog, More functions card, Link popover and chip, comment box, Insert note dialog, note tooltip), `InsertPanels.tsx` (Data validation rules panel, dropdown list, emoji picker), `SmartChipDialog.tsx`. Shared code changed, all additive: `SheetMenu` / `edit-view-data.ts` carry an "insert" dropdown (`MenuId` gained "insert"); `SheetGrid` gained `floaters` (a chart or picture positioned on a cell), `rowHeights`, `refRange` (orange outline on the cells a formula reads), checkbox / chip / image / note / link drawing and `rowhead-<n>` / `colhead-<l>` hooks; `SheetsEditor` gained `panelWidth`; `Cell` gained `image`, `box`, `chip`, `link`, `note`, `fx`; `grid-state.ts` gained `insertRows`, `insertCols`, `insertCellsDown`, `insertCellsRight`, `shiftRefs`, `evalFormula` (SUM, AVERAGE, COUNT, MAX, MIN, MEDIAN and a one-condition IF; `recalc` uses it), `setCell`; the Comments panel gained replies and Note entries (off unless a thread sets `canReply` / `note`). Images are bundled SVGs in `public/sheets-sample/`. Start states, scene variables, hooks and timelines: `docs/STEPS.md` ("Snaarp Sheets steps 37-55"); differences from the recording and the real data that was replaced: `docs/DECISIONS-AND-DEVIATIONS.md`.

**Format, Data, Tools, Extensions and Help round (steps 56-84).** Recording `ref/sheets/Snaarp_Sheets_format_data_tools_help.mp4` (copy of `Downloads/1029.mp4`; 1450x720, 3:19; contact sheets and zooms in `ref/sheets/fdt/`). All 29 steps use the same stage with the sample from `FDT_BOOK` in `sheets-sample.ts` (Acme Studio budget plus Due date, Amount, Rate, Length and Note columns, five rows; plain header). New code: `fdt-data.ts` (ALL copy: the five menus, submenus, number formats, dialogs, sample), `fdt-state.ts` (pure: number formats, text looks, sorting, filters, row heights, autocomplete), `fdt-timeline.ts` (helpers; `beginFdt`; menu rows register their actions through `EXTRA_ACTIONS` in `edit-timeline.ts`) and `FdtDialogs.tsx` (Custom format, Name range, Protect, macros, Spelling, Notification settings, Accessibility, Keyboard shortcuts, About, Search the menus, filter list and filter-view bar). Shared code changed, all additive: `Cell` looks (italic, underline, strike, size, valign, wrap, rotate, num / nf), `SheetGrid` (hidden rows, filter buttons, ghost text, large text, high contrast), `SheetsEditor` (`gridTop`, `nameBox`, tab lock, `tool-highlight`), `SheetMenu` (`labels`, `extraSubs`, `tick`, phone layout), the five menus in `edit-view-data.ts`, `ValidationPanel` (`dvRange`), `scripts/qa-visibility.ts` (`--from`, lists sheets). The recording shows Extensions > Macros greyed, so step 81 is hover only and macros are recorded and run from Tools (steps 75-76). Only the toolbar fill button works (step 63); the toolbar is the next round. Whole new round plays about 796 s (sum of measured step times); the whole tutorial about 34 minutes. Start states, variables, hooks: `docs/STEPS.md` ("Snaarp Sheets steps 56-84"); differences from the recording and the brief: `docs/DECISIONS-AND-DEVIATIONS.md`.

**Toolbar and header round (steps 85-116).** Recording `ref/sheets/Snaarp_Sheets_toolbar.mp4` (copy of `Downloads/1029(1).mp4`; 1446x720, 2:57; the recording only hovers and opens, so the demonstrations are built from the brief). All 32 steps use the same stage with the sample from `TB_BOOK` in `sheets-sample.ts` (Acme Studio budget: Item | Owner | Region | Cost | Qty | Status | Due date | Margin | Code | Reference | Note | Link | Action, eight rows, a live Total =SUM(D2:D9) = 1,430.50, a "Vendors" tab). New code: `toolbar-data.ts` (ALL copy: sample, tooltips, currencies and the Custom currencies dialog, number formats, fonts, sizes, palette, border / merge / align / wrap / rotate rows, the Functions lists, the shared Find card copy, header popovers), `number-format.ts` (`formatValue`, `formatCurrency` (GBP through `formatGBP`), `toSerial`), `toolbar-state.ts` (pure: formats, decimals, colours, borders, merge, paint format), `ToolbarMenus.tsx` (`ToolbarLayer`: tooltip and every dropdown card and header popover hung under their button with Anchored; `CurrencyDialog`, `MeetingDialogs`) and `toolbar-timeline.ts` (`beginTb`, `hoverTool`, `openTool`, `pickRow`, `chooseFn`, `enterFormula`, `fillDown`, `pressHeader` ...). Shared code changed, all additive: `Cell` gained `color`, `font`, `dp`, `raw`, `borders`, `merge` (drawn by `SheetGrid`, floaters now follow the horizontal scroll), `grid-state` (`numberOf` prefers `num`, formulas keep their number format, IF on text, TODAY, WEEKDAY, VLOOKUP, INDEX / MATCH, regex find, `replaceOne`; the broken `\b` in `shiftRefs` is fixed), `SheetsEditor` (hooks on every tool and header icon, active / open looks, collapsed toolbar with More, scrolling toolbar and header icons on phones), `ChartState` (`rowCount`, `catCol`, `at`), and **`FindCard` is now ONE card for Edit > Find and replace (step 28) and the Search tool (step 86)**. The whole tutorial plays about 0 (see docs/STEPS.md); the toolbar round adds about 1017 s (sum of measured step times). Screens, hooks, variables: `docs/STEPS.md` ("Snaarp Sheets steps 85-116"); every substitution of real data and difference from the recording: `docs/DECISIONS-AND-DEVIATIONS.md`.

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

### Build status (Workforce)
Route: /tutorials/workforce. Config tutorials/workforce.ts: 96 steps, all built, ending with the data-driven completion card.
Recordings: Workforce_clip1.mp4 (97s, 1234x720; steps 1-17), Workforce_clip2.mp4 (65s, 1234x720; steps 18-24), Workforce_clip3.mp4 (104s, 1234x720; steps 25-44), workforce-clip4.mp4 (42s, 1234x720; steps 45-48), workforce-clip5.mp4 (44s, 1284x720; steps 49-54), workforce-clip6.mp4 (copy of 1101.mp4; 7:07, 1284x620; steps 55-76 Admin side), workforce-clip7.mp4 (copy of 1101(1).mp4; 4:28, 1284x620; steps 77-96 Admin side).
1. Welcome to Workforce (dashboard intro, company highlights, overview cards)
2. Your overview cards (My leave, My sickness, Objectives with "1 active goals", My tasks)
3. Your tasks and requests (Tasks, Leave, Sickness tabs)
4. Next 7 days and Announcements (upcoming agenda and company announcements)
5. Notifications (bell icon, scrollable notifications dropdown, Mark all read)
6. Top bar tools (Add Users admin-only, Apps suite popover, Avatar dropdown)
7. Find your way around (far-left Snaarp suite rail, Workforce WORKSPACE sidebar, collapse and expand)
8. My Space (overview page, profile summary, direct reportees, monthly stats)
9. Today's attendance (live counting timer starting 00:09:11, Stop and Start toggle)
10. Activity (8 activity tabs: Activities, Feeds, Approvals, Leave, Profile, Attendance, Time Logs, Timesheets)
11. My onboarding (onboarding list view, stats, Active filter empty state, Completed records table)
12. Open an onboarding record (onboarding detail page, 100% progress bar, Overview tab)
13. Checklist (5 onboarding checklist tasks, task detail view for "Upload identity document", "View identity-document.pdf" button)
14. Documents tab (uploaded identity document record)
15. Activity tab (audit trail of onboarding milestones)
16. My Profile (personal and employment details read-only grid)
17. Edit contact details (interactive form with phone, email, address, emergency contact, Save button and success toast)
18. Salary advances (limit info box £1,500.00, stat cards, locked Request advance button, table row with Alex Morgan £700.00)
19. Advance details (hover Actions "...", click View details, details modal with scrollable Proposed repayments and History audit cards, close with X)
20. Resignation (sidebar click, 0.8s centered loading spinner, approved resignation card, dates, timeline, exit interview card)
21. Exit tasks (clearance tasks heading and empty state "No exit tasks assigned.")
22. Holidays (top bar Organization, October 2026 calendar, 1 Oct "GB: Founders' Day" lilac chip, 30 Oct purple circle today marker, next-month arrow hover)
23. My HR cases (top bar HR Cases, grievances table row, HR case details modal, close with X)
24. Submit a grievance (Submit grievance modal, Type select dropdown with "Pay dispute", October 2026 calendar picker picking day 28, Description ring, Cancel dismissal)
25. Check out (starts checked in, live timer counts up, clicks Check out, 0.8s centered loading spinner, checked out card with 08:32:00 duration)
26. Attendance calendar (starts Attendance > Calendar tab, stats summary, October 2026 calendar grid, today marker day 30, scrolls down to legend)
27. Leave summary (starts Attendance. Clicks Leave in sidebar, 4 summary stat cards, annual leave progress bar 14/20 days, by leave type breakdown)
28. Request leave (starts Leave > Summary. Clicks Request leave, modal opens, Leave type select, date inputs, reason textarea, Cancel dismissal)
29. Leave requests (starts Leave > Summary. Clicks Requests tab, filter bar, table row with Alex Morgan Annual Leave Approved, clicks View, details modal, close with X)
30. Your shift (starts Leave > Requests. Clicks Shift tab, shifts card, Europe/London 09:00 - 17:00, 8h 00m, Grace period 15 minutes)
31. Time Tracker (starts Leave. Clicks Time Tracker in sidebar, live project/job timer, Project and Job selects, toggles Start and Stop)
32. Jobs (starts Time Tracker > Timer. Clicks Jobs tab, status filter pills, table rows with priorities and overdue chips)
33. Time logs (starts Time Tracker > Jobs. Clicks Time logs tab, logs table, filters, total hours pill 14h 45m)
34. Timesheets (starts Time Tracker > Time logs. Clicks Timesheets tab, date range picker, Empty state "No timesheet found for this period")
35. Job schedule (starts Time Tracker > Timesheets. Clicks Job schedule tab, Week/Month view tabs, calendar schedule grid with today column and scheduled jobs)
36. Goals (starts Time Tracker. Clicks Goals in sidebar, tabs Goals/KPIs, goals table with progress bar and Actions "..." icon)
37. Edit a goal (starts Goals > Goals tab. Clicks Actions "...", clicks Edit, modal opens, progress slider updates to 75%, Save changes toast)
38. KPIs (starts Goals. Clicks KPIs tab, KPIs table with Code, Target, Measurement, and Actions "..." icon)
39. KPI details (starts Goals > KPIs tab. Clicks Actions "...", clicks View details, details modal opens with facts, feedback, and audit history, close with X)
40. My Appraisals (starts Goals. Clicks My Appraisals in sidebar, reviews stat cards, reviews Reviews table with sample review row)
41. Open a review (starts My Appraisals > Reviews. Clicks Actions "...", clicks View review, navigates to /performance/reviews/sample with 16 appraisal questions)
42. Fill in the review (starts review form. Rates performance question 1 as "3 - Meets Expectations", scrolls, types into accomplishments textarea, clicks Submit review, success banner)
43. Assigned reviews (starts My Appraisals. Clicks Assigned Reviews tab, empty state "No reviews assigned to you at this time.")
44. View your result (starts review form submitted. Navigates to result view, reviews Self Review score, Manager Review score, clicks Acknowledge result)
45. Policies (starts My Appraisals result. Clicks Policies in sidebar, search bar, Engineering folder card with "1" badge)
46. Engineering policies (starts Policies. Clicks Engineering folder, policies table with Engineering Policy, Version 1.0, Approved lilac pill, 30/10/2026)
47. Policy details (starts Engineering policies. Clicks View, document details page with Sam Taylor author, file size, clicks View document, in-app viewer modal opens, closes with X)
48. Learning Hub (starts Policy details. Clicks Learning Hub in sidebar, top bar becomes Learning Hub, reviews Hub/Record tabs, Assigned Courses, Categories to Explore)
49. Open a course (starts Learning Hub. Clicks Engineering category, 0.8s loading spinner, navigates to course page with 3 lessons, course progress card, clicks play)
50. Watch a lesson (starts course page. Reviews video player slideshow with animated slides, toggles play/pause, seek bar, time counter, clicks Complete Lesson)
51. Complete a course (starts lesson completed. Reviews 3 completed modules with checkmarks, 100% course progress, clicks Complete Course button)
52. Your certificate (starts course completed. Clicks Download Certificate, certificate downloaded toast notice, in-app certificate viewer modal opens, closes with X)
53. Learning Record (starts Learning Hub course. Clicks Back pill, clicks Learning Record tab, reviews completed courses table, completion dates, certificates)
54. Notifications (starts Learning Record. Clicks notifications bell in top bar, top bar becomes Notifications, reviews full-page notifications list with 12 items, clicks Mark all as read, clicks Clear all)
55. Appraisal Management (starts Appraisal Management > Overview tab, review cycles stat cards, cycles table, "+ Create Cycle" button)
56. Create a cycle (navigates to /performance/management/cycles/new, cycle title, type dropdown, participant radios, reviewer overrides accordion)
57. Cycle workflow settings (frequency cadence select, repeat toggle, reviewer overrides accordion expand and explain)
58. Deadlines and questions (Stage deadlines card, Self Review Due calendar popup picking Oct 30, fallback reviewer select, questions template select, Cancel returns to Appraisal Management)
59. Appraisal overview (Overview tab, filter bar with status dropdown, empty state card with filter reset)
60. Assigned reviews (Assigned reviews tab, reviews table with 1 assigned review row for Alex Morgan, Actions "..." icon)
61. Review details (completed review page /performance/reviews/sample, status banner, overall rating, self review score, manager review score, Back button)
62. Templates (Templates tab, questions templates grid with 3 cards: Standard, Annual Leadership, 360 Degree)
63. Insights (Insights tab, questions summary table with 16 rows, follow-ups breakdown)
64. Employment actions (Employment Actions tab, promotion/PIP table with 2 records, status badges)
65. Salary components (clicks Payroll in sidebar, starts Salary components tab, Currency header, 4 stats cards, 7 salary components table)
66. Employee salaries (Employee salaries tab, employee compensation table with Alex Morgan and Jordan Lee, Actions "..." icon)
67. Assign a salary (clicks Assign salary button, modal opens, selects employee, fills basic salary, component breakdown, Save changes toast)
68. Pay runs (Pay runs tab, Create pay run button, selects Jordan Lee in picker, closes picker, submits run, explains PROCESSING status, completes run to PAID, Payroll Cost stat updates to £5,219.00)
69. Payslips (Payslips tab, payslips table with Alex Morgan and Jordan Lee, Status PAID, Net salary £2,889.50 and £2,329.50)
70. Salary advances (Salary advances tab, 4 stat cards: Pending, Approved - not paid, Repaid, Cancelled; Alex Morgan row with £700.00, Actions "..." dropdown)
71. Advance policy (Advance policy sub-tab, policy settings form: Max percentage, Repayment months, Minimum service)
72. Import and export (Import & Export tab, 2 action cards: Export Payroll Data and Import Salaries)
73. Import salaries (clicks Import salaries card, modal opens, file picker simulation selecting CSV, Upload & validate, confirms transfer in modal, success toast)
74. Tax calculator (Tax calculator tab, gross salary input £4,000.00, calculation results card: Taxable £2,952.50, Monthly Tax £590.50, Effective rate 14.8%)
75. Tax and pension settings (Tax & Pension Settings tab, UK tax brackets table 0%/20%/40%/45%, pension rates 5% employee / 3% employer)
76. Pension calculator (Pension calculator tab, pensionable earnings input £4,000.00, results card: Employee £320.00, Employer £400.00, Total Pension £720.00)
77. Recruitment (Careers page public link pill, copy link toast, 4 recruitment stat cards)
78. Job postings (Job Postings tab, status filter dropdown, postings table, View/Edit/Share actions)
79. Create a job (+ Create Job modal, Engineering department, Mid-level experience, salary block, Cancel dismissal)
80. Careers page (public candidate view, Software Engineer posting details, apply form email focus, Back to the app)
81. Applicants (Applicants tab, 2 candidate rows, Alex Morgan stage dropdown, + Add Applicant)
82. Request documents (Request Documents modal, Identity document type, requester Jordan Lee, instructions, Cancel)
83. Applicant details (Applicant Details drawer, candidate info, stage emails, documents, close button)
84. Archives (Archives tab, 2 archived postings, archived reason, Actions "..." icon)
85. Interviews (Interviews tab, Schedule Interview modal, Alex Morgan candidate, interviewers, Video Call type, duration, Cancel)
86. Email templates (Email templates view, 8 recruiting templates, Request additional documents template editor, placeholder chips, preview card)
87. Compliance (Compliance view, training accordion auto-expands, Folders and Awaiting Review tabs, Engineering folder card with "1" badge)
88. Create a folder (+ Create Folder form, Engineering department, folder name, Alex Morgan uploader, Cancel)
89. Review a policy (Awaiting Review tab, policy review card, in-app Document Viewer modal, page counter, Approve/Reject hover)
90. Onboarding (Lifecycle view, Onboarding toggle, 3 status cards, status filter, onboarding audit table)
91. Onboarding record (Alex Morgan record view, 100% completion card, Checklist/Documents/Activity tabs, Back to dashboard)
92. Start onboarding (+ Start Onboarding wizard, Jordan Lee employee, Standard template, date, HR owner, manager, welcome note, Submit ring)
93. Onboarding templates (Templates sub-tab, Standard Employee Onboarding template, checklist task list, configuration)
94. Initiate an exit (Offboarding toggle, Initiate Exit wizard, Personal Reasons, Voluntary departure, IT Equipment Return checklist, Back)
95. Resignations (Offboarding dashboard, Casey Brown progress row, Resignations tab, Alex Morgan actions menu, Resignation Details modal with dates and reasons, Close)
96. Exit templates (Templates sub-tab, custom and default departure checklists, Standard Exit Checklist preview modal with 8 items, Use Template hover, Close)
97. Open HR Cases (clicks HR Cases under MANAGE in sidebar, reviews Grievances & Disciplinary tabs, 2 grievance rows, stat cards)
98. View a case (clicks View case on Alex Morgan grievance, opens Case Details modal with investigation timeline, closes with X)
99. Disciplinary record (clicks Disciplinary tab, reviews disciplinary records table with Jordan Lee written warning)
100. Add Record (clicks "+ Add Record" button, opens Record Form modal, selects employee, fills violation details, clicks Cancel)
101. Open Announcements (clicks Announcements under MANAGE, reviews published announcements table, 2 sample announcements)
102. Create an announcement (clicks "+ Create Announcement", fills title "Annual Company Retreat 2026", types announcement message, toggles banner switch)
103. Publish and see it live (clicks Publish announcement, success toast, top of screen reveals new purple alert banner with CTA)
104. Bell notification (clicks bell notification icon in top bar, reveals new announcement item in dropdown, explains real-time sync)
105. Open Shifts (clicks Shifts under MANAGE, reviews configured shifts table: Morning, Regular, Night shifts, hours and active employee counts)
106. Add a shift (clicks "+ Add Shift" button, opens shift modal, configures shift name, hours 08:30 - 17:00, days Monday to Friday, clicks Cancel)
107. Open Holidays (clicks Holidays under MANAGE, reviews public holidays and working week tabs, shows 8 bank holidays)
108. Holiday calendar (clicks Calendar view, displays October 2026 calendar with Founders' Day holiday chip and today marker)
109. Training Dashboard (clicks Training under MANAGE, subnav opens Dashboard, reviews 4 training stat cards and recent activity)
110. Courses list (clicks Courses in training subnav, reviews course catalog table with Engineering Practices 101, draft and published courses)
111. Create Course (clicks "+ Create Course", slide-out drawer opens, fills course title, category, description, and clicks Cancel)
112. Lessons and assessment (from Courses table clicks Actions "...", clicks Manage Lessons, reviews module lessons and quiz pass mark, closes modal)
113. Course Categories (clicks Categories in training subnav, reviews category grid with Engineering, Compliance, Leadership)
114. Create Category (clicks "+ Create Category", fills category title "Health & Safety", selects icon, clicks Cancel)
115. Assignments (clicks Assignments in training subnav, reviews enrolled employee courses table with status badges and progress bars)
116. View Progress (clicks Actions "..." on Alex Morgan row, clicks View Progress, opens progress modal showing completed modules and score, closes)
117. Assign Course (clicks "+ Assign Course", opens assignment drawer, selects course, picks Jordan Lee, sets due date, clicks Cancel)
118. Reports hub (clicks Reports under INSIGHTS in sidebar, reviews 4 report category cards: Attendance, Leave, Headcount, Onboarding)
119. Attendance Report (clicks Attendance card, shows loading spinner, reveals attendance logs table with filter bar and export button)
120. Leave Report (switches to Leave report tab, reviews employee leave balances, taken vs remaining days, status filter)
121. Headcount Report (switches to Headcount report tab, reviews department headcount metrics, gender breakdown, and tenure distribution)
122. Onboarding Report (switches to Onboarding report tab, reviews onboarding velocity, pending vs completed tasks, new hire list)
123. Open the Admin Panel (clicks "Open Admin Panel" in top bar, navigates smoothly to full Admin Panel dashboard with suite analytics)
124. Back to Workforce (inspects Admin Panel header, clicks "Back to Snaarp Workforce", returns seamlessly to Workforce Dashboard; completion card follows)

Files: Reusable Workforce stage components/workforce/WorkforceStage.tsx and app shell components/workforce/WorkforceShell.tsx (thin Snaarp suite rail, collapsible 220px Workforce sidebar with WORKSPACE, MANAGE, and INSIGHTS navigation, top bar with notifications bell, banner announcement, admin toggle, Apps suite popover, avatar dropdown). Central sample data in components/workforce/workforce-data.ts (Alex Morgan, Sam Taylor admin, Jordan Lee, Casey Brown, Acme Ltd, UK locale). Reusable views: DashboardView, MySpaceOverviewView, OnboardingListView, OnboardingRecordView, TaskDetailView, ProfileView, SalaryAdvancesView, ResignationView, ExitTasksView, HolidaysView, HrCasesView, AttendanceView, LeaveTrackerView, TimeTrackerView, GoalsView, AppraisalsView, PoliciesView, LearningHubView, NotificationsView, DocumentViewerModal, AppraisalManagementView, CycleCreationFormView, AdminReviewDetailView, PayrollView, RecruitmentView, CareersPageView, EmailTemplatesView, ComplianceView, LifecycleView, AdminHrCasesView, AdminAnnouncementsView, AdminShiftsView, AdminHolidaysView, AdminTrainingView, AdminReportsView, AdminPanelEmbedView. Per-step scenes in scenes/workforce/step<N>/. All 124 steps clean with 0 open findings across 4 viewports in qa:visibility (496 runs).


## Build status (OneCardX - Admin side complete: 52 steps)
1. Your OneCardX home (welcome hero banner, Quick Actions cards, getting started checklist, reviews OneCardX layout)
2. Switch Snaarp apps (clicks 9-dots Apps menu in top bar, reviews apps grid popover with active OneCard, clicks to close)
3. Open Create an Organization Card (clicks "Create an Organization Card" Quick Action card, navigates to Organization Cards list)
4. Read the card list (reviews cards table: Sales Team, Business Card, ID Card, badges, status chips, search bar)
5. Start a new organization card (clicks "+ Create Card" button, opens "Create New Organization Card" modal)
6. Name the card (types card title "Engineering Team", selects company Acme Ltd, clicks "Continue" to launch editor)
7. Choose the card type (reviews Card tab, inspects ID Card and Business card layout choices, confirms ID Card)
8. Pick a design (clicks Display tab, reviews Classic, Modern, Minimal visual templates, selects Classic)
9. Add a profile photo (clicks Add Photo or Video, opens in-app sample portrait picker, selects Alex Morgan portrait, adds media)
10. Set colours and font (reviews accent colors row, selects Ocean Blue swatch, inspects Poppins default font)
11. Add your logo (clicks Add Logo button, opens in-app logo chooser, selects Acme Ltd emblem logo, confirms addition)
12. Add a badge (clicks Add Badge button, opens badge picker modal, selects Verified Badge with checkmark, applies to card)
13. Fill in the information (clicks Information tab, reviews user details, types First Name "Alex" and Last Name "Morgan")
14. Add contact fields (clicks Fields tab, adds Website [acme-studio.com], Instagram [@alexmorgan], and Email [alex.morgan@acme.com])
15. Save the card (clicks Save button in top-right header, button shows saving state, card saves and transitions to card detail page)
16. Your card is ready to share (reviews card detail view, QR code preview, clicks Copy Link, reviews Brand Toolkit signatures and backgrounds)
17. Preview the public card (clicks QR code preview, opens public card showcase overlay, inspects digital card, clicks Back to app)
18. Back to your card list (reviews Organization Cards table with 4 cards, explains card counts and draft/published statuses)
19. Limit who sees a card (clicks Limit audience on Engineering Team, reviews "Everyone" vs "Specific people" options)
20. Pick specific people (selects "Specific people", reviews member checklist with checkboxes, toggles members, clicks Cancel)
21. Preview the member view (clicks Preview, navigates to member view with lavender notice banner, stats, QR code, and Edit my details)
22. Edit the design (clicks Edit design on Engineering Team card, enters Card Editor)
23. Choose a style (clicks Display tab, explores design templates and live card preview)
24. Colours, logo and badge (selects teal accent color swatch, reviews background, font color, logo and badge rows)
25. Fill in your details (clicks Information tab, enters prefix Mr, first name Alex, last name Morgan, Product Designer, Acme Ltd)
26. Use each person's own name (toggles "Use each person's own name" checkbox, fields lock with helper notice)
27. Add contact fields (clicks Fields tab, adds Website and Instagram chips, enters URLs, live links update)
28. Save the card (clicks Save, transitions to Card Detail view with updated details and QR code)
29. Publish to everyone (returns to card list, clicks Publish to everyone, toast confirms and published count updates to 3)
30. See it in ID Cards (clicks ID Cards in sidebar, reviews ID cards gallery with Default and Org badges)
31. Manage users' card images (clicks Users in sidebar, reviews user counts, search/filter, and ID Card Image action links)
32. Set a user's card image (clicks ID Card Image for Alex Morgan, reviews upload modal and image URL input, closes modal)
33. Back to Create Card, start a new card (clicks Create Card in sidebar, opens New card modal, clicks Cancel)
34. Switch to a business card (clicks Edit design on Engineering Team, selects Business card type, preview updates to business card)
35. Pick a business card style (clicks Display tab, reviews 9-style Business Card Style grid, selects Split landscape style)
36. Colours for the business card (selects dark navy swatch, live Split landscape preview updates left side)
37. Save and review (clicks Save, lands on Business Card detail view with stats and landscape preview, clicks Copy Link)
38. Preview what members see (navigates to member view, reviews lavender member banner and landscape card)
39. Virtual backgrounds (clicks Backgrounds in sidebar, reviews 16:9 canvas preview, QR code, badge, and layout controls)
40. Choose a background and layout (selects Beach Waves preset, switches layout to Bottom Right, toggles Company detail)
41. Upload your own background (clicks Upload, applies custom uploaded image backdrop, highlights Download)
42. Open Email Signatures (clicks Email Signatures in sidebar, opens email signatures studio with preview and controls)
43. Choose which card to use (clicks Change, toggles to I D Card, reviews ID signature with link, switches back to Business Card)
44. Pick a signature style (explores styles, selects photo + name + QR code + full-width purple SAVE CONTACT layout)
45. Choose your mail app (toggles Other, Outlook, Gmail and OS variants, lands on Gmail · Web with tailored instructions)
46. Follow the apply steps (reviews 7 numbered instructions, clicks Copy, button shows Copied! checkmark)
47. Open Snaarp Mail (clicks Mail in suite rail, Snaarp Mail opens with folders, storage 12%, search, and unread list)
48. Open settings (clicks gear icon top right, reviews Quick settings popover, clicks See all settings)
49. Go to Signature (clicks Signature under Appearance, opens Signature Editor with rich text toolbar and preview)
50. Paste your signature (clicks editor area, signature pastes in with photo and QR code, preview box updates live)
51. Save the signature (clicks Save Signature, bottom-left confirmation toast appears)
52. See it in a new email (clicks Back to Mail, clicks Compose, New Message window opens with signature attached)
53. Open Contacts (clicks Contacts in sidebar, navigates to contacts empty state, reviews Search and Add button)
54. Start a new contact (clicks Add contact, drawer slides out from right with photo/logo uploaders and fields)
55. Add a photo and logo (clicks Add photo, selects portrait from sample picker; clicks Add logo, selects Acme Ltd logo)
56. Type the contact's name (clicks First name, types "Alex"; clicks Last name, types "Morgan")
57. Add phone and emails (clicks Phone, types phone number; enters email address)
58. More options (clicks More options accordion, reviews Prefix, Middle name, Suffix, Nickname, Maiden name, Pronouns)
59. Add work info (clicks Work Info, types Job title "Product Designer", Company "Acme Ltd", and website)
60. Add custom fields (clicks Fields, reviews 10 category chips, explores Most Popular and Music, adds custom link)
61. Save the contact (clicks Save Contact at bottom of drawer, drawer closes, contacts table displays Alex Morgan row)
62. Open the contact (clicks Alex Morgan table row, opens contact detail page with Tags, Notes, and Activity Timeline)
63. Add a tag and a note (types "Design" in tag input, adds tag; clicks Add note, adds note card)
64. Open Analytics (clicks Analytics in sidebar, opens analytics dashboard with 3 stat cards)
65. Read the analytics (reviews Views Over Time chart, Device Breakdown donut chart, 7x24 Engagement heatmap, Per-Card table)
66. Report a bug (clicks Report a Bug in sidebar, modal opens, selects category, types description, clicks Submit; completion card follows)

Files: OneCardX stage `components/onecardx/OneCardXStage.tsx` and app shell `components/onecardx/OneCardXShell.tsx` (thin suite rail, 205px OneCardX sidebar, top bar with apps grid and admin avatar). Shared timeline helpers in `components/onecardx/onecardx-timeline.ts` (`beginOneCardX` with mandatory `tl.placeCursor`, `finishOneCardX`). Central sample data in `components/onecardx/onecardx-data.ts` (Sam Taylor admin, Alex Morgan employee/contact, Acme Ltd, neutral sample portraits and logos). Views: `OneCardXHomeView`, `OneCardXOrgCardsView`, `OneCardXEditorView`, `OneCardXCardDetailView` + `OneCardXPublicPreviewOverlay`, `OneCardXMemberView`, `OneCardXIDCardsView`, `OneCardXUsersView`, `OneCardXBackgroundsView`, `OneCardXSignaturesView`, `OneCardXMailView`, `OneCardXContactsView`, `OneCardXAnalyticsView`, `OneCardXBugModal`. Per-step scenes in `scenes/onecardx/step<N>/`. All 66 steps clean with 0 open findings across 4 viewports in qa:visibility.

### Snaarp Drive ("Snaarp Drive, Parts 1, 2, 3 & 4: the complete product walkthrough", route `/tutorials/drive`)
Config: `tutorials/drive.ts` (68 steps, all built: Part 1 navigation tour [orientation-only for nav items], Part 2 create & upload features, Part 3 item menu & organise, Part 4 dedicated sharing module [S1-S10], and Part 5 deep feature modules & workspaces; completion card follows step 68). Recordings: `ref/drive-clip1.mp4` (1440x747, 1:26), `ref/drive-clip2.mp4` (1398x720, 3:13), `ref/drive-clip3.mp4` (1408x720, 5:18), and `ref/drive-clip4.mp4` (1408x720, 5:46). Stills: `ref/drive-frames-1/`, `ref/drive-frames-2/`, `ref/drive-frames-3/`, and `ref/drive-frames-4/`.

| Step | Status |
|---|---|
| 1. Navigate: Home | Done |
| 2. Switch to Photos | Done |
| 3. Moments | Done |
| 4. Albums | Done |
| 5. Favorites in Photos | Done |
| 6. Change the photo layout | Done |
| 7. Jump to a month | Done |
| 8. Back to Files | Done |
| 9. Filter your recent files | Done |
| 10. Create or upload | Done |
| 11. Navigate: My Files | Done |
| 12. Sort your files | Done |
| 13. Change the view | Done |
| 14. Open the details panel | Done |
| 15. Navigate: Meetings | Done |
| 16. Navigate: Photos | Done |
| 17. Navigate: Shared | Done |
| 18. Navigate: Favorites | Done |
| 19. Navigate: Recycle Bin | Done |
| 20. Navigate: Workspaces | Done |
| 21. Navigate: Back to Home | Done |
| 22. Start a new folder | Done |
| 23. Name and colour the folder | Done |
| 24. See your new folder | Done |
| 25. Upload a file | Done |
| 26. Track the upload | Done |
| 27. Upload a folder | Done |
| 28. Open the uploaded folder | Done |
| 29. Create a Markdown document | Done |
| 30. Edit and save the document | Done |
| 31. Create a text document | Done |
| 32. Import from other drives | Done |
| 33. Open the item menu | Done |
| 34. Open a folder | Done |
| 35. Delete a folder | Done |
| 36. Rename a folder | Done |
| 37. The file menu | Done |
| 38. Rename a file | Done |
| 39. Move a file | Done |
| 40. Copy a file | Done |
| 41. Favorites and pin to top | Done |
| 42. Change a folder colour | Done |
| 43. View item details | Done |
| 44. Select several items and the bulk action bar | Done |
| 45. Move 3 items to a folder | Done |
| 46. Delete 2 items | Done |
| 47. Sharing: Share a file with a teammate | Done |
| 48. Sharing: Share a folder | Done |
| 49. Sharing: Copy a link | Done |
| 50. Sharing: Set the link permissions | Done |
| 51. Sharing: Manage who has access | Done |
| 52. Sharing: Shared with you: the tab | Done |
| 53. Sharing: Shared with you: row menu | Done |
| 54. Sharing: Shared by you: the tab | Done |
| 55. Sharing: Shared by you: row menu and sharing again | Done |
| 56. Sharing: Shared: bulk actions | Done |
| 57. Recycle Bin: restore an item | Done |
| 58. Recycle Bin: empty the trash | Done |
| 59. Meetings: recordings and downloads | Done |
| 60. Favorites: preview and manage starred items | Done |
| 61. Workspaces: list workspaces | Done |
| 62. Workspaces: create a workspace | Done |
| 63. Workspaces: workspace details | Done |
| 64. Workspaces: invite organisation members | Done |
| 65. Workspaces: change member role and remove member | Done |
| 66. Workspaces: browse files and create folder | Done |
| 67. Workspaces: upload file to workspace folder | Done |
| 68. Workspaces: delete workspace | Done |

Files: Reusable stage `components/drive/DriveStage.tsx` and app shell `components/drive/DriveShell.tsx` (thin suite rail with Drive active, collapsible 230px inner sidebar with storage bar 2.8 GB / 20.0 GB 14% or 17.0 GB / 20.0 GB 85%, top bar with Photos/Files pill, search, user avatar, and apps 9-dot grid). Views & Modals: `DriveHomeView.tsx`, `DrivePhotosView.tsx`, `DriveFilesView.tsx`, `DriveMeetingsView.tsx`, `DriveSharedView.tsx`, `DriveFavoritesView.tsx`, `DriveTrashView.tsx`, `DriveWorkspacesView.tsx`, `DriveWorkspaceDetailView.tsx`, `DriveBulkActionBar.tsx`, `DriveBulkMoveModal.tsx`, `DriveBulkDeleteModal.tsx`, `DriveEmptyTrashModal.tsx`, `DriveCreateWorkspaceModal.tsx`, `DriveInviteMemberModal.tsx`, `DriveDeleteWorkspaceModal.tsx`, `DrivePart4Toasts.tsx`, `DriveCreateMenu.tsx`, `DriveFolderModal.tsx`, `DriveUploadToast.tsx`, `DriveFilePickerModal.tsx`, `DriveMarkdownModal.tsx`, `DriveMarkdownEditor.tsx`, `DriveTextModal.tsx`, `DriveTextEditor.tsx`, `DriveImportModal.tsx`, `DriveItemMenu.tsx`, `DriveShareModal.tsx`, `DriveShareConfirmModal.tsx`, `DriveLinkSettingsModal.tsx`, `DriveDeleteModal.tsx`, `DriveRenameModal.tsx`, `DriveMoveCopyModal.tsx`, `DriveFolderColorModal.tsx`, `DriveCopyLinkToast.tsx`, `DriveMoveToast.tsx`. Shared timeline helpers in `components/drive/drive-timeline.ts` (`beginDrive` with mandatory `tl.placeCursor`, `finishDrive`). Central sample data in `components/drive/drive-data.ts` (Sam Taylor, `sam.taylor@snaarp.com`, Alex Morgan, Jordan Lee, Casey Brown). All 68 steps clean with 0 open findings across 4 viewports in qa:visibility.

### Snaarp Books ("Snaarp Books Tutorial (Parts 1 - 7): Home, Products, Customers, Quotes, Invoices, Sales Receipts, Recurring Invoices, Payments Received, and Credit Notes", route `/tutorials/books`)
Config: `tutorials/books.ts` (134 steps: 1-5 Navigation & Home, 6-22 Products & Items, 23-32 Sales & Customers, 33-52 Quotes, 53-77 Invoices, 78-96 Sales Receipts, 97-110 Recurring Invoices, 111-125 Payments Received, 126-134 Credit Notes). Recordings: `1105 (2).mp4`, `1105 (2)(1).mp4`, `1105 (2)(2).mp4`, `1106.mp4`, `1106(1).mp4`, `1106(2).mp4`.
All 134 steps built and COMPLETE.
- 1. Books: Find your way around (Home layout, suite rail, left nav, header, global search)
- 2. Home: Read your receivables and payables (Total receivables, payables, current & overdue splits)
- 3. Home: Check cash flow by period (Weekly cashflow chart, period switcher, interactive tooltip)
- 4. Home: Watch key accounts (accrual or cash) (Quick actions, bank balances, watchlist with basis toggle)
- 5. Home: See recent updates (Audit trail of invoices, bills, expenses, timestamped activity)
- 6. Products: Browse and filter your items (Active, Inactive, All items filters, header magnifier filter)
- 7. Products: Sort the item list (Sort drawer: name, selling price, date created)
- 8. Products: Show or hide columns (Visible columns drawer: Rate & Unit toggles, column resize, reset widths)
- 9. Products: Import items from a CSV file (Import drawer, sample CSV picker modal, import toast)
- 10. Products: Export your item list (Export drawer with real row count, CSV format, download indicator)
- 11. Products: Refresh the item list (List reload, loading state, newly arrived Raw Honey item)
- 12. Products: Create a new item (goods) (New item form, Food Farm, unit kg, photo picker, sales/purchase accounts, validation error handling)
- 13. Products: Create a service item (Service item form, Business Setup Consulting, unit hr, service income & contractor expenses)
- 14. Products: Open an item's details (Breadcrumb, item overview, pricing, account mappings)
- 15. Products: Check an item's transactions and history (Transactions table with sample invoices/bills, history audit trail)
- 16. Products: Edit an item (Edit form prefilled, update selling price to £220.00, toast, history update)
- 17. Products: Clone an item (Clone action, Food Farm (Copy) generated, both items present in catalog)
- 18. Products: Mark an item inactive and active again (Deactivate item, filter by inactive, re-activate back to live catalog)
- 19. Products: Lock and unlock an item (Lock item action, yellow warning banner, unlock item)
- 20. Products: Delete an item (In-app confirmation modal, delete Food Farm (Copy), clean list)
- 21. Products: Select several items (Checkbox selection, bulk action bar counter, select all, deselect all)
- 22. Products: Delete several items at once (Batch delete 3 items with in-app confirmation modal, toast, clean list)
- 23. Customers: Open the customer list (Sales menu expand, Customers table)
- 24. Customers: Search and filter customers (Search "bright", filter Inactive, All, Active)
- 25. Customers: Add a business customer (Business customer form, Greenleaf Bakery, email, phone)
- 26. Customers: Add billing and shipping addresses (Billing address, Copy to shipping, yellow Note box)
- 27. Customers: Add an individual customer with a contact person (Individual mode, Helen Carter, Contact Person Jordan Lee)
- 28. Customers: Import customers from a CSV file (Import drawer, sample CSV picker modal, import toast)
- 29. Customers: View and edit a customer's details (Breadcrumb, detail view, edit phone and notes, update)
- 30. Customers: Deactivate a customer (Deactivate button, inactive status badge)
- 31. Customers: Reactivate a customer (Filter Inactive, Activate button, active status badge)
- 32. Customers: Delete a customer (Trash icon, in-app confirmation modal, delete customer)
- 33. Quotes: open the Quotes list (Sales subnav, Quotes list view, breadcrumbs, search, status dropdown, + New button, quotes table)
- 34. Quotes: search for a quote (Search by quote number "QT-0008", immediate table filtering)
- 35. Quotes: filter quotes by status (Filter dropdown: Draft, Sent, Accepted, Declined, Expired, All)
- 36. Quotes: open a quote and read its details (Breadcrumbs, quote details card, items table, subtotal, total, customer notes, terms)
- 37. Quotes: send a quote to a customer (Send Quote button, sending spinner, Sent status badge update, success toast)
- 38. Quotes: download a quote as PDF (Download PDF button, generating spinner, download confirmation toast)
- 39. Quotes: preview a quote PDF (Preview PDF button, in-app PDF preview modal with Page 1 of 1 and styled Estimate PDF sheet, close)
- 40. Quotes: edit a quote and save changes (Edit view, add line item, delete line item, discount %, shipping, adjustment, dynamic total £60.10, save changes)
- 41. Quotes: delete a quote (Delete button, in-app confirmation modal, confirmed delete, toast, redirect to quotes list)
- 42. Quotes: start a new quote and choose a customer (+ New button, New Quote view, customer dropdown, select Northfield Cafe)
- 43. Quotes: set up quote numbering (Gear button, Configure Quote Numbering dialog, next number 0009, save preferences)
- 44. Quotes: set the reference and dates (Reference number input, custom calendar popover for November 2026 for quote and expiry dates)
- 45. Quotes: choose a salesperson, project and subject (Salesperson Sam Taylor, project picker, subject input)
- 46. Quotes: add items to the item table (Item select dropdown, rate and qty, VAT standard tax selection, add another line item)
- 47. Quotes: scan an item by barcode (Scan Item button, in-app barcode scan modal with viewfinder, barcode input, add Ground Pepper 500g)
- 48. Quotes: add several items in bulk (Add Items in Bulk modal, search "honey", multi-select checkboxes for honey beans, yam tubers, packaging boxes)
- 49. Quotes: add discount, shipping and an adjustment (Discount 5%, shipping £4, adjustment £2, dynamic blue Total £142.80)
- 50. Quotes: add notes, an attachment and terms (Customer notes textarea, upload file modal, attach Catering-request.pdf chip, terms textarea, additional fields note)
- 51. Quotes: save a quote as a draft (Save as Draft button, toast, quote row in table with Draft badge, open detail view)
- 52. Quotes: save and send a quote (PDF template link, Save and Send button, toast, quote detail view with Sent status)
- 53. Invoices: open the invoices list (In sidebar, click Invoices under Sales, All Invoices table)
- 54. Invoices: search by customer or number (Search box, filter by Sterling, clear search)
- 55. Invoices: filter by status (Status dropdown, filter by Unpaid, restore to All)
- 56. Invoices: import invoices from CSV (Import button, drawer, CSV picker modal, invoices-nov-2026.csv, import toast)
- 57. Invoices: view invoice details (Click INV10008, view Sent & Delivery pending badges, details card, payment plan)
- 58. Invoices: send invoice to customer (Send Invoice button, spinner, success toast)
- 59. Invoices: mark invoice as paid (Green Mark as Paid button, confirmation modal, status Paid, balance due £0.00)
- 60. Invoices: download invoice PDF (Download PDF button, in-app notification toast)
- 61. Invoices: preview invoice PDF (Preview PDF button, in-app PDF preview modal with Page 1 of 1, close)
- 62. Invoices: edit invoice (Edit button, add Delivery Fee £10.00, discount 5%, total £89.30, save changes)
- 63. Invoices: review payment plan on an invoice (INV10003 details, Scheduled plan 2x split £50.40 each)
- 64. Invoices: delete an invoice (Delete button on INV10000, in-app confirmation modal, delete, toast)
- 65. Invoices: start a new invoice and choose customer (+ New button, New Invoice form, select Sterling Interiors)
- 66. Invoices: configure invoice numbering (Gear button, Configure Invoice Numbering modal, next number 10013)
- 67. Invoices: set order number, dates, and payment terms (Order number PO-8820, date picker popover, Net 30 terms)
- 68. Invoices: select accounts receivable and salesperson (Salesperson Sam Taylor, subject input)
- 69. Invoices: add line items manually (Select Organic Rice 2x £42, add line, select Cassava Flour 3x £24, subtotal £156.00)
- 70. Invoices: scan item or barcode (Scan Item button, barcode modal, 5012345678900, Delivery Fee £10.00 added)
- 71. Invoices: add items in bulk (Bulk Actions button, modal search "tote", check Tote Bag & Notebook, subtotal £191.00)
- 72. Invoices: apply discount, shipping, and adjustment (Discount 5% -£9.55, shipping £4.00, adjustment £2.00, total £187.45)
- 73. Invoices: add customer notes, attachment, and terms (Notes textarea, attach PO-4471.pdf chip, terms)
- 74. Invoices: configure a flexible payment plan (Flexible plan chip, optional PIN 4821)
- 75. Invoices: configure a scheduled installment plan (Scheduled plan chip, quick split 3x, sum match check)
- 76. Invoices: save invoice as draft (Save as Draft button, toast, details view with Draft badge)
- 77. Invoices: save and send invoice to customer (Save and Send button, toast, details view with Sent badge, completion card)
- 78. Sales Receipts: open the receipts list (In sidebar, click Sales Receipts under Sales, All Sales Receipts table)
- 79. Sales Receipts: search by customer or number (Search box, filter by Acme, clear search)
- 80. Sales Receipts: filter by payment mode (Payment mode dropdown, filter by Bank Transfer, restore to All)
- 81. Sales Receipts: view receipt details (Click SR-00002, view Paid badge, details card, metadata)
- 82. Sales Receipts: send receipt to customer (Send Receipt button, spinner, success toast)
- 83. Sales Receipts: download receipt PDF (Download PDF button, in-app notification toast)
- 84. Sales Receipts: preview receipt PDF (Preview PDF button, in-app PDF preview modal, close)
- 85. Sales Receipts: edit receipt (Edit button, change Deposit To account to Bank Account, save changes)
- 86. Sales Receipts: delete a receipt (Delete button, in-app confirmation modal, delete, toast)
- 87. Sales Receipts: start a new receipt and choose customer (+ New button, New Receipt form, select Acme Foods Ltd)
- 88. Sales Receipts: configure receipt numbering (Gear button, Configure Receipt Numbering modal, next number 00003)
- 89. Sales Receipts: set dates and payment mode (Confirm receipt date, select Cash payment mode)
- 90. Sales Receipts: set deposit account and reference (Select Petty Cash deposit account, reference RCP-9941)
- 91. Sales Receipts: select salesperson (Select Sam Taylor salesperson)
- 92. Sales Receipts: add line items manually (Select Organic Rice 25kg 2x £42, add line, select Palm Oil 5L 2x £18, subtotal £120.00)
- 93. Sales Receipts: scan item or barcode (Scan Item button, barcode modal, 5012345678900, Delivery Fee £10.00 added)
- 94. Sales Receipts: add items in bulk (Bulk Actions button, modal search "tote", check Tote Bag & Notebook, subtotal £155.00)
- 95. Sales Receipts: apply discount, shipping, and adjustment (Discount 5% -£7.75, shipping £4.00, adjustment £2.00, total £153.25)
- 96. Sales Receipts: add notes, attachment, and save receipt (Notes textarea, attach Delivery-note.pdf chip, terms, Save and Close button, details view)
- 97. Recurring Invoices: open recurring invoices list (In sidebar, click Recurring Invoices under Sales, empty state & table view)
- 98. Recurring Invoices: search profiles (Search box, filter by Weekly, clear search)
- 99. Recurring Invoices: filter by status (Status dropdown, filter by Active, restore to All)
- 100. Recurring Invoices: view recurring profile details (Click REC-00001, view Active badge, repeat frequency, terms, lines)
- 101. Recurring Invoices: stop a recurring profile (Stop button, status badge Stopped, toast)
- 102. Recurring Invoices: resume a recurring profile (Resume button, status badge Active, toast)
- 103. Recurring Invoices: edit recurring profile (Edit button, change Payment Terms to Net 30, save changes)
- 104. Recurring Invoices: delete recurring profile (Delete button, in-app confirmation modal, delete, toast)
- 105. Recurring Invoices: start a new recurring invoice and choose customer (+ New button, New Recurring Invoice form, select Harvest Tables Ltd)
- 106. Recurring Invoices: set profile name, frequency, and duration (Profile name Weekly Produce Box, repeat every Month, start date, never expires)
- 107. Recurring Invoices: configure recurring preferences (Gear button beside Preferences, modal, select Create Invoices as Drafts, save)
- 108. Recurring Invoices: set order number, terms, and salesperson (Order number PO-7721, terms Net 15, salesperson Sam Taylor, subject)
- 109. Recurring Invoices: add line items and configure pricing (Select Organic Rice 25kg 4x £200, subtotal £800.00)
- 110. Recurring Invoices: add customer notes, terms, and create profile (Notes textarea, terms, Save Profile button, details view)
- 111. Payments Received: open payments list (Sidebar Payments Received, All Received Payments table)
- 112. Payments Received: search payments (Search Acme, filter matching rows, clear)
- 113. Payments Received: view payment details (Click PAY-00003 row, details view with 3 cards, action buttons)
- 114. Payments Received: send payment receipt (Click Send Receipt, spinner, toast)
- 115. Payments Received: download payment receipt PDF (Click Download PDF, spinner, toast)
- 116. Payments Received: preview payment receipt PDF (Click Preview PDF, in-app modal, view, close)
- 117. Payments Received: edit payment (Click Edit, update Deposit To to Bank Account, save, toast)
- 118. Payments Received: delete a payment (Click Delete, in-app confirm dialog, delete, toast)
- 119. Payments Received: start recording a payment and choose customer (+ New, Record Payment form, select Acme Foods Ltd)
- 120. Payments Received: configure payment numbering (Gear icon beside Payment#, modal, set 00004, save)
- 121. Payments Received: set amount and bank charges (Amount £500.00, bank charges £5.00)
- 122. Payments Received: set payment date, mode, and deposit account (Date, mode Bank Transfer, deposit Bank Account, ref TXN-88219)
- 123. Payments Received: apply payment to unpaid invoices (Unpaid invoices table, allocate £500.00 to INV10005, summary update)
- 124. Payments Received: enter notes and attach receipt document (Notes textarea, file picker modal, select bank-confirmation.pdf)
- 125. Payments Received: save payment and view confirmation (Check thank you note, Save button, spinner, toast, details view)
- 126. Credit Notes: open credit notes list (Sidebar Credit Notes, All Credit Notes table)
- 127. Credit Notes: search and filter credit notes (Search box, filter rows, clear)
- 128. Credit Notes: view credit note details (Click CN-00002 row, details view with Open badge, items, totals)
- 129. Credit Notes: preview and download credit note PDF (Preview PDF modal, close, Download PDF, toast)
- 130. Credit Notes: delete a credit note (Click Delete, in-app confirm dialog, delete, toast)
- 131. Credit Notes: start a new credit note and choose customer (+ New, New Credit Note form, select Acme Foods Ltd)
- 132. Credit Notes: configure numbering and credit note details (Gear icon beside Credit Note#, modal, set 00003, save, ref, salesperson)
- 133. Credit Notes: add line items and add items in bulk (Select Organic Rice 25kg, bulk items modal, select Cassava Flour 10kg, add)
- 134. Credit Notes: apply adjustments, terms, and save credit note (Discount 5%, adjustment, notes, terms, Save as Open, toast, details view, completion card)
- 135. Vendors: browse, search and filter the list (Expand Purchases sidebar, click Vendors, All Vendors table, search "green", clear search, switch status to Inactive, restore to Active)
- 136. Vendors: open a vendor and update it (Click Greenfield Packaging row, details view with Deactivate button, select Net 30, type notes, click Update Vendor, toast)
- 137. Vendors: create a vendor, step 1 contact details (+ New button, New Vendor form, Salutation Mr., type First & Last names, Company Name, click suggestion pill for Display Name, Email, Country code, Phones)
- 138. Vendors: create a vendor, step 2 other details (Other Details tab, Tax Rate VAT Standard 20%, type Company ID, select Accounts Payable, type Opening Balance, select Net 30, toggle Portal access)
- 139. Vendors: create a vendor, step 3 address (Address tab, select United Kingdom, type Street 42 Maritime Way, City London, select State Aberdeen, Zip, Phone, Fax)
- 140. Vendors: create a vendor, step 4 contact persons and save (Contact Persons tab, click + Add Contact Person, select Salutation Mr., type Contact Person names & contact details, click blue Save button, toast, directory update)
- 141. Vendors: deactivate and delete a vendor (Three-dots menu, Deactivate, switch filter to Inactive, click trash icon on Northgate Supplies, in-app confirm dialog, delete, toast)
- 142. Expenses: open the list and filter with views (Click Expenses in sidebar, Receipts Inbox / All Expenses tabs, Views dropdown, select Invoiced, flow diagram empty state, restore to All Expenses, view expense details, back)
- 143. Expenses: record an expense, part 1 (+ New, Record Expense form, calendar popover pick date 11/05/2026, Employee None, Expense Account Cost of Goods Sold, type Amount 1000, Paid Through Undeposited Funds, Tax VAT Standard 20%)
- 144. Expenses: record an expense, part 2 and save (Select Vendor Greenfield Packaging Ltd, type Ref & Notes, open file picker modal, select receipt-nov-2026.pdf, select Customer Acme Foods Ltd, check Billable, click blue Save button, toast, list update)
- 145. Expenses: record mileage (+ New, Record Mileage tab, toggle Distance traveled, type distance 20 km, live computed £9.00 at £0.45/km, select Paid Through, Tax, Vendor, click blue Save button, toast)
- 146. Expenses: add several expenses in bulk (+ New, Bulk Add Expenses tab, 10-row grid, enter row 0 and row 1 details via calendar popover, account dropdowns, typed amounts, paid through & vendor dropdowns, click blue Save button, toast)
- 147. Expenses: delete an expense (Click trash icon on exp-1, in-app confirm dialog, delete, toast, record removed)
- 148. Recurring expenses: open list & read profile (Purchases sidebar nav, Recurring Expenses list, All Profiles header, search, + New, click rec-exp-1 Cleaning Services, view details card, back)
- 149. Recurring expenses: create profile, schedule (+ New, New Recurring Expense form, type Profile Name Monthly Office Supplies, Employee Jane Doe, Repeat Every Month, calendar popover pick start date, Never expires radio)
- 150. Recurring expenses: create profile, amounts & save (Select Account Advertising and Marketing, type Amount 450, Tax Exclusive, VAT Standard 20%, Paid Through Undeposited Funds, Vendor Greenfield Packaging Ltd, Notes, Customer Acme Foods Ltd, blue Save button, toast, list update)
- 151. Recurring expenses: delete profile (Click trash icon on rec-exp-2, in-app confirm dialog, delete, toast, row removed)
- 152. Bills: browse, filter & switch views (Bills in sidebar, toolbar + New, List/Calendar toggle, search, Status filter Paid and restore, calendar view month switcher Oct/Nov 2026, return to list)
- 153. Bills: open bill & read it (Click BILL-005 view multi-step approval workflow Jordan Lee/Casey Brown, back, click overdue BILL-003 view overdue banner & ribbon, back, click BILL-002 view Paid status & journal)
- 154. Bills: send, preview & download bill (BILL-002 details, Send Bill with sending spinner, success toast, Preview PDF in-app modal, download PDF toast)
- 155. Bills: create bill, vendor & dates (+ New, New Bill form, Vendor Greenfield Packaging Ltd, Bill# BILL-1200, PO-5521, calendar popover bill/due dates, Payment Terms Due on Receipt, Subject Materials for building)
- 156. Bills: create bill, items & totals (Item table row 0 Organic Rice 25kg qty 20 @ 200.00, COGS, VAT Standard 20% = £4,000.00, + Add another line, row 1 Palm Oil 5L qty 5 @ 40.00 = £200.00, subtotal £4,200.00, total £5,040.00)
- 157. Bills: create bill, notes & save (Type Notes, upload file modal attach supplier-invoice.pdf, file chip, blue Save as Open button, toast, BILL-1200 mounts at top of list)
- 158. Bills: delete bill (All Bills dropdown, click trash icon on BILL-004, in-app confirm dialog, delete, toast, row removed)
- 159. Recurring Bills: open the list and read empty state (Sidebar Recurring Bills, All Recurring Bills list, status filter Status/Active/Paused/Expired/Draft, empty state Create. Set. Repeat. with 4 lifecycle chips & 3 bullets, + New Recurring Bill)
- 160. Recurring Bills: create recurring bill, vendor & schedule (+ New Recurring Bill, Vendor Greenfield Packaging Ltd, Profile Name Monthly Packaging Supplies, Repeat Every Month, calendar popover pick start date 11/08/2026, Never expires radio, Due on Receipt)
- 161. Recurring Bills: create recurring bill, items & save (Row 0 Organic Rice 25kg qty 20 @ 200.00 = £4,000.00, + Add another line, row 1 Palm Oil 5L qty 5 @ 40.00 = £200.00, subtotal £4,200.00, VAT £840.00, total £5,040.00, Customer Notes, blue Save button, toast, list update)
- 162. Recurring Bills: read recurring bill & delete (Click Monthly Packaging Supplies row, details view with Profile Details & Line Items, click red Delete button, in-app confirm dialog, delete, toast, empty state)
- 163. Payments Made: open list, filter & read payment details (Sidebar Payments Made, All Payments list, status filter Paid and restore, click PAY-002 row, details view with Payment Details & Bills Paid BILL-002, Back to Payments)
- 164. Payments Made: record payment, vendor & amount allocation (+ New button, Record Payment form, Vendor Greenfield Packaging Ltd, check Pay full amount GBP4,800.00, Paid Through Bank Account, in-table Pay in Full link on BILL-007, excess summary box update)
- 165. Payments Made: record payment, notes, receipt file & save as paid (Type Reference TXN-99014, check TDS, Notes, upload file modal attach payment_receipt.pdf, file chip, blue Save as Paid button, toast, details view)
- 166. Vendor Credits: open list, search & empty state (Sidebar Vendor Credits, All Vendor Credits list, empty state You deserve some credit too. with lifecycle diagram, search Greenfield, clear search)
- 167. Vendor Credits: create credit note, vendor, dates & tax mode (+ New button, New Vendor Credits form, Vendor Greenfield Packaging Ltd, Order PO-5521, calendar popover pick date 11/08/2026, Subject Damaged goods return, AP, Tax Exclusive)
- 168. Vendor Credits: create credit note, items, discount & save (Row 0 Organic Rice 25kg qty 20 @ 200.00 = £4,000.00, + Add another line, row 1 Palm Oil 5L qty 5 @ 40.00 = £200.00, subtotal £4,200.00, VAT £840.00, total £5,040.00, Discount 5%, Customer Notes, blue Save as Open button, toast, list update)
- 169. Vendor Credits: read credit note & delete (Click VC-001 row, details view with navy blue items table & totals, click red Delete button, in-app confirm dialog, delete, toast, empty state, final completion card mounts)

Files: Reusable stage `components/books/BooksStage.tsx` and app shell `components/books/BooksShell.tsx` (suite left rail, left navigation menu with expandable Sales and Purchases subnavs, top bar with Books logo, search, user avatar, apps grid). Views & Modals: `BooksHomeView.tsx`, `BooksProductsView.tsx`, `BooksNewItemView.tsx`, `BooksItemDetailView.tsx`, `BooksCustomersView.tsx`, `BooksNewCustomerView.tsx`, `BooksCustomerDetailView.tsx`, `BooksQuotesView.tsx`, `BooksNewQuoteView.tsx`, `BooksQuoteDetailView.tsx`, `BooksEditQuoteView.tsx`, `BooksInvoicesView.tsx`, `BooksNewInvoiceView.tsx`, `BooksInvoiceDetailView.tsx`, `BooksEditInvoiceView.tsx`, `BooksReceiptsView.tsx`, `BooksReceiptDetailView.tsx`, `BooksNewReceiptView.tsx`, `BooksEditReceiptView.tsx`, `BooksRecurringInvoicesView.tsx`, `BooksRecurringDetailView.tsx`, `BooksNewRecurringInvoiceView.tsx`, `BooksEditRecurringInvoiceView.tsx`, `BooksPaymentsView.tsx`, `BooksPaymentDetailView.tsx`, `BooksEditPaymentView.tsx`, `BooksRecordPaymentView.tsx`, `BooksCreditNotesView.tsx`, `BooksCreditNoteDetailView.tsx`, `BooksNewCreditNoteView.tsx`, `BooksVendorsView.tsx`, `BooksVendorDetailView.tsx`, `BooksNewVendorView.tsx`, `BooksExpensesView.tsx`, `BooksExpenseDetailView.tsx`, `BooksRecordExpenseView.tsx`, `BooksRecurringExpensesView.tsx`, `BooksRecurringExpenseDetailView.tsx`, `BooksNewRecurringExpenseView.tsx`, `BooksBillsView.tsx`, `BooksBillDetailView.tsx`, `BooksNewBillView.tsx`, `BooksRecurringBillsView.tsx`, `BooksRecurringBillDetailView.tsx`, `BooksNewRecurringBillView.tsx`, `BooksPaymentsMadeView.tsx`, `BooksPaymentMadeDetailView.tsx`, `BooksRecordPaymentMadeView.tsx`, `BooksVendorCreditsView.tsx`, `BooksVendorCreditDetailView.tsx`, `BooksNewVendorCreditView.tsx`, `BooksRecurringExpenseConfirmDialog.tsx`, `BooksBillConfirmDialog.tsx`, `BooksRecurringBillConfirmDialog.tsx`, `BooksVendorCreditConfirmDialog.tsx`, `BooksPaymentMadeFilePickerModal.tsx`, `BooksBillPdfPreviewModal.tsx`, `BooksBillFilePickerModal.tsx`, `BooksVendorConfirmDialog.tsx`, `BooksExpenseConfirmDialog.tsx`, `BooksExpenseFilePickerModal.tsx`, `BooksSortDrawer.tsx`, `BooksColumnsDrawer.tsx`, `BooksImportDrawer.tsx`, `BooksExportDrawer.tsx`, `BooksCustomerImportDrawer.tsx`, `BooksInvoiceImportDrawer.tsx`, `BooksCustomerCsvPickerModal.tsx`, `BooksInvoiceCsvPickerModal.tsx`, `BooksCsvPickerModal.tsx`, `BooksImagePickerModal.tsx`, `BooksConfirmDialog.tsx`, `BooksCustomerConfirmDialog.tsx`, `BooksQuoteConfirmDialog.tsx`, `BooksInvoiceConfirmDialog.tsx`, `BooksInvoiceMarkPaidDialog.tsx`, `BooksReceiptConfirmDialog.tsx`, `BooksRecurringConfirmDialog.tsx`, `BooksPaymentConfirmDialog.tsx`, `BooksCreditNoteConfirmDialog.tsx`, `BooksQuoteNumberingDialog.tsx`, `BooksInvoiceNumberingDialog.tsx`, `BooksReceiptNumberingDialog.tsx`, `BooksPaymentNumberingDialog.tsx`, `BooksCreditNoteNumberingDialog.tsx`, `BooksQuoteScanDialog.tsx`, `BooksInvoiceScanDialog.tsx`, `BooksReceiptScanDialog.tsx`, `BooksQuoteBulkItemsDialog.tsx`, `BooksInvoiceBulkItemsDialog.tsx`, `BooksReceiptBulkItemsDialog.tsx`, `BooksRecurringBulkItemsDialog.tsx`, `BooksCreditNoteBulkItemsDialog.tsx`, `BooksQuotePdfPreviewModal.tsx`, `BooksInvoicePdfPreviewModal.tsx`, `BooksReceiptPdfPreviewModal.tsx`, `BooksPaymentPdfPreviewModal.tsx`, `BooksCreditNotePdfPreviewModal.tsx`, `BooksQuoteFilePickerModal.tsx`, `BooksInvoiceFilePickerModal.tsx`, `BooksReceiptFilePickerModal.tsx`, `BooksPaymentFilePickerModal.tsx`, `BooksRecurringPreferencesDialog.tsx`, `BooksDatePickerPopover.tsx`, `BooksToast.tsx`. Shared timeline helpers in `components/books/books-timeline.ts` (`beginBooks` with mandatory `tl.placeCursor`, `finishBooks`, `pressOn`, `typeIntoVar`). Central sample data in `components/books/books-data.ts` (Sam Taylor, `sam.taylor@snaarp.com`, GBP £, 14 active catalog items, 2 inactive items, 4 active customers, 1 inactive customer, 4 CSV import customers, 8 initial quotes, 9 initial invoices, 2 initial sales receipts, 2 initial recurring profiles, 3 initial payments, 2 initial credit notes, 4 vendors, 3 initial expenses, 2 recurring expense profiles, 5 initial bills, 1 recurring bill profile, 1 seed payment made, 1 initial vendor credit, unpaid invoices, cash flow chart data, account watchlist, 10 recent updates). All 169 steps clean and verified. End-to-end timing fix pass completed: finishBooks holds exactly 1500ms after the flow and fades for 400ms; all 169 step durations measured and updated to their true runtimes (no idle pauses; progress line fills smoothly to 100% on step finish). Full timing audit in `docs/TIMING-FIX.md`.

### Build status (Snaarp Lock - 11 steps, all built and COMPLETE)
Route: `/tutorials/snaarp-lock` (also `/tutorials/lock`). Config: `tutorials/snaarp-lock.ts`.
Recordings: `1109(1).mp4` (6:04; steps 1–7) and `1109 (2).mp4` (2:05; steps 8–11).
1. Find your way around the dashboard (Dashboard layout, stats cards, connected devices, recent vaults, generator)
2. Manage your connected devices (Devices settings, active sessions scroll, revoke inactive, Revoke All Others)
3. Generate a password and a passphrase (Length/words sliders, symbol checkboxes, generate randomized password, copy toast)
4. Browse and create vaults (Vaults catalog, Social Vault, item type filters, + New Vault, create Personal Lock)
5. Add and edit a login (Add Item modal, Google login creation, Edit modal, update to GitHub, blue-violet Save button)
6. Add a note, a card and an identity (Secure Note, Mastercard credit card, Voter Card identity credentials)
7. Filter your items and delete a vault (Filter chips All/Login/Note, delete Personal Lock with in-app confirm dialog)
8. Create an organization (Organizations catalog, + Create Organization inline form, Acme Studio creation, new card first)
9. Invite a member and set their role (Acme Studio detail, spinner, inline invite john@example.com, role select, Admin elevation, Transfer ownership tooltip and modal, Cancel dismissal)
10. Import passwords from Chrome (Import sources grid, Google Chrome, dropzone, in-app file chooser modal, 142 parsed credentials table, progress bar 25%->60%->100%, Import Complete card)
11. See your imported passwords (Imported from Chrome vault, 142 credential cards grid scroll, hover lift with quick delete icon, completion card follows)

Files:
- Shell: `components/lock/LockShell.tsx` (full 18-app suite rail, sidebar, topbar search, avatar, apps grid)
- Stage & Toast: `components/lock/LockStage.tsx`, `components/lock/LockToast.tsx`
- Views: `LockDashboardView.tsx`, `LockDevicesView.tsx`, `LockVaultsView.tsx`, `LockVaultItemsView.tsx`, `LockOrganizationsView.tsx`, `LockOrganizationDetailView.tsx`, `LockImportView.tsx`, `LockChromeImportView.tsx`
- Modals: `LockAddItemModal.tsx`, `LockEditItemModal.tsx`, `LockTransferModal.tsx`, `LockFileChooserModal.tsx`
- Data & Timeline: `components/lock/lock-data.ts`, `components/lock/lock-timeline.ts`
- Scenes: `scenes/lock/step<1..11>/Step<N>.tsx`, `script.ts`

### Build status (Snaarp Me - 6 steps, all built and COMPLETE)
Route: `/tutorials/snaarp-me` (aliases: `me`, `snaarpme`, `scheduling`, `calendar`, `bookings`). Config: `tutorials/snaarp-me.ts`.
Recording: `1110 (1).mp4` (5:08; steps 1–6).
1. Find your way around the Home dashboard (Welcome banner, Today's Schedule with confirmed meeting card, 4 KPI stats cards, Recent Activity card scroll, sidebar navigation)
2. Open a booking and check your calendar (Today's meeting card click, booking modal details, Snaarp Meet conferencing copy, Calendar monthly grid with Day 10 purple highlight, external calendar integrations, Meetings detail page `/bookings/101`, Back to Bookings return)
3. Create an event type (Event Types sidebar nav, + New Event Type, 3-step wizard: Basic Info, Schedule & Availability, Advanced, Create Event Type click, green banner toast confirmation, new card mounts first)
4. Edit an event type and preview its booking page (Event card click, right-side Edit Drawer slides out alongside floating live preview panel, title edit with " (Design Review)", Schedule tab availability check, preview calendar slot click, Save Changes)
5. Copy your booking link and book a meeting (Event card copy link icon with tooltip, full-page standalone public booking page `snaarp.me/jane/creative-meeting-with-the-team` without app shell, date Day 18 selection, slot "10:30am", invitee form fields, Confirm Booking, scheduled confirmation page mounts)
6. See your new booking on Home (Dashboard return, updated Today's Schedule reflecting new booking, incremented stats counts, Recent Activity feed update, finish hold and completion card follows)

Files:
- Shell & Stage: `components/me/MeShell.tsx` (suite rail, sidebar with lilac pill, header card), `components/me/MeStage.tsx`, `components/me/MeToastBanner.tsx`
- Views: `MeHomeView.tsx`, `MeCalendarView.tsx`, `MeBookingDetailView.tsx`, `MeEventTypesView.tsx`, `MeBookingPage.tsx`
- Modals & Drawers: `MeBookingModal.tsx`, `MeCreateEventModal.tsx`, `MeEditEventDrawer.tsx`
- Data & Timeline: `components/me/me-data.ts`, `components/me/me-timeline.ts`
- Scenes: `scenes/snaarp-me/step<1..6>/Step<N>.tsx`, `script.ts`

### Product switcher
(Snaarp Admin is the fourth product: `tutorials/snaarp-admin.ts`, 12 steps, all built. Snaarp Slides is the fifth: `tutorials/snaarp-slides.ts`, 56 steps (the whole product), all built. Snaarp Sheets is the sixth: `tutorials/snaarp-sheets.ts`, 116 steps (the whole product: every menu, the toolbar and the header tools), all built. Workforce is the seventh product: `tutorials/workforce.ts`, 124 steps, all built and COMPLETE. OneCardX is the eighth product: `tutorials/onecardx.ts`, 66 steps, all built and COMPLETE. Snaarp Drive is the ninth product: `tutorials/drive.ts`, 68 steps, all built and COMPLETE. Snaarp Books is the tenth product: `tutorials/books.ts`, 205 steps, all built and COMPLETE. Snaarp Lock is the eleventh product: `tutorials/snaarp-lock.ts`, 11 steps, all built and COMPLETE. Snaarp Me is the twelfth product: `tutorials/snaarp-me.ts`, 6 steps, all built and COMPLETE.) The rail starts with the search box (see "Rail search"). The rail's product card is a dropdown of every product in `tutorials/index.ts` (Snaarp 360 first). Each product has its own steps (modules) listed below it; a product with no built scenes shows a "coming soon" stage (`components/player/ComingSoon.tsx`). Snaarp Mail (`tutorials/snaarp-mail.ts`) is listed with its 17 modules, all built. Real product logos live in `public/logos/` and are shown with `ProductLogo` from `components/icons.tsx`.

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
