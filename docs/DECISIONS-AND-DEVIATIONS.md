# Decisions and deviations

Where the tutorial intentionally differs from the source recording (`Sign_up_for_snaarp_360.mp4`) or from the live Snaarp pages, and why. If you change any of these, update this file.

## Sample data only (no real personal data)

Rule: no real emails, passwords, names or domains anywhere in the app. All data below is made up.

| Value | Where |
|---|---|
| Owner: Jane Doe, initials JD, `jane@acme-studio.com` | Steps 2, 3 (sign-in), 4 and 5 (`SAMPLE` in `step2-script.ts` and `step3-script.ts`, `OWNER` in `step5/step5-data.ts`) |
| Organization: Acme Studio | Step 2 |
| Domain: `acme-studio.com` | `step4/step4-data.ts` (`DOMAIN`), reused in step 5 |
| Phone: Nigeria +234, `801 234 5678` | Step 2 |
| Password for the owner: `Sample#Pass1` | Steps 2 and 3 |
| New user: Sam Lee, `sam.lee@acme-studio.com` | Step 5 (`NEW_USER`) |
| Recovery email: `sam.recovery@example.com` (`example.com` is reserved for examples) | Step 5 |
| Fake generated password: `Wd7#kQ2mPz9a` | Step 5 (shown in the modal and typed on the user login) |
| Fake DKIM public key (`SAMPLE_DKIM`, made-up key material) | `step4/step4-data.ts` |
| SPF and DMARC values built from the sample domain, e.g. `v=spf1 mx ra=postmaster -all` | `step4/step4-data.ts` |
| Product URLs in the URL pill (`login.snaarp.com/...`, `admin.snaarp.com/...`) | Step configs and scripts. These are the real Snaarp hostnames, not personal data. |

## Differences from the recording

1. **Dashboard says "Business Plan".** The recording's admin dashboard showed "Starter Plan". The tutorial follows the plan the viewer chose in step 1 (Business) so the story is consistent (`step3/step3-data.ts`).
2. **DNS status after verification reads "All records found".** The recording showed "No records" even after verifying. The tutorial shows the result a real customer should see (`step4/DomainsPage.tsx`).
3. **No browser autofill, saved-email list or "Save password?" popup.** They appear in the recording (they belong to the recorder's browser, and would expose real addresses). They were deliberately left out of step 5's login.
4. **Step 5 skips the Snaarp Mail inbox.** In the recording, logging in as the new user lands on a mail inbox (with a loading skeleton) before the products page. The tutorial goes from the login straight to the products home and shows a "Login successful" toast. The products-home URL pill reads `login.snaarp.com/admin`, as the owner specified (the recording showed `/products`).
5. **Step 5 has no "Loading users..." state** on the empty User Management list.
6. **Step 5 holds a few moments longer than the recording** (for example the "Login successful" toast stays 0.9 s so it can be read) and some moments are shorter. The whole tutorial runs about 2:04 against a 1:55 recording.
7. **Prices are in pounds (£49, £99, £249, £499).** This follows the project content rule "prices use the pound sign". The live pricing page (a screenshot the owner shared) shows naira (₦) amounts. Confirm which currency the tutorial should show. Plan names, storage sizes, team sizes and feature lists follow the live page.
8. **Pricing page is simplified.** The Monthly/Yearly toggle and the product tabs change their selected state but do not change the cards below. Only the 360 tab content is shown. Plan cards show 17 product logos (the set listed by the owner), while the tab row shows all 15 product tabs from the website.
9. **Browser chrome is our own.** The frame has three traffic lights and a URL pill. The recording's real browser toolbar and extensions are not reproduced.
10. **Cursor, rings, captions and toasts are added by us.** Captions are written for the tutorial (short, imperative). The recording has none.
11. **The "Created" date in the domain row is today's date**, not a fixed date (`new Date().toLocaleDateString("en-GB")` in `step4/DomainsPage.tsx`). Screenshots taken on different days differ here.
12. **Step 5 avatars.** The new admin's avatar letter is "S" (Sam). The recording showed a different letter.
13. **Mail server value.** The MX target `mail.mailrit.com.` and the CNAME/MX layout come from the recording. The owner has said `mailrit.com` is the product's real mail host and is kept on purpose; it is not sample data. It should still be confirmed before launch (see below).
14. **Icons.**
    - Product logos are the **real Snaarp SVG logos** in `public/logos/` (shown with `ProductLogo`): pricing page tabs and plan cards, sign-up orbit and header, products home, both admin icon rails, player rail.
    - All other icons (menus, buttons, stat cards, arrows, the two glyphs on the purple "Create/Configure Emails" and "System Admin" cards, the Snaarp mark in unused fallbacks) are **redrawn SVG placeholders** in `components/icons.tsx`, not the real Snaarp icons. Icons are never cropped from video frames.

## Snaarp Mail step 1

- The recording opens on the Mail tab already selected and scrolled. The tutorial starts on the **360 tab** and clicks Mail (owner's script), so the 360 cards in naira are shown first. Those 360 naira prices come from the live pricing page screenshot the owner shared, not from the Mail recording.
- Product logos are the real Snaarp logo tiles (purple), not the light-tile icons of the live page. The faint outline shield at the end of the icon rows is kept as in the recording.
- Cards swap with a 0.3 s fade; the live page has no such animation. Captions, cursor and rings are added by us.
- URL pills of steps 2-5 and 7-9 are placeholders (not visible in the recording).
- Until all nine steps are built the end card says "Step N complete / The next steps are coming soon." (shell behavior for any tutorial with unbuilt steps).

## Snaarp Mail step 2

- **No personal data, autofill or browser popups.** The recording shows the recorder's real name, email and organization, Chrome's autofill dropdowns and a blue autofill tint on filled fields. All left out; fields stay white with sample data (Jane Doe, jane.doe@example.com, Acme Studio, 8012345678).
- **Left panel is 54% wide, not about 45%.** The frames measure 535 of 998 px; the frames were followed.
- **Create Account button is #111827** (the brief). The frames sample about #1E2735.
- **Typing speed, caret and focus ring are ours.** Fields get a thin black focus ring (the frames show the same on the focused field).
- **Strength text starts at "Password strength: None"** as in the frames, then Weak, Good, Strong. The brief listed Weak/Good/Strong only.
- **Organization step has no new caption.** The brief gave none for 7.0, so the email caption stays on screen while it is typed.
- **Checkbox text is 10 px,** a little larger than the recording, so it wraps one word earlier ("...understand that" / "Snaarp will...").
- **The form scrolls only as far as needed.** On 16:9 windows from 1280x720 up the whole form fits, so there is nothing to scroll; on shorter windows it scrolls about 180 px. The recording's window was short, so it scrolled there.
- **Left panel pattern** is our own faint polygon drawing (decorative), not cropped from the video. Footer links are plain text.
- **Spinner and the 1.2 s "Creating Account..." state** are ours; the recording ends right after the click.
- **Narrow screens** (under 900px): slim dark header on top, card enlarged by CSS zoom.

## Snaarp Mail step 3

- **Sidebar is 238 px wide, not 280.** The frames measure 165 of 998 px; the frames were followed.
- **Sidebar colour is #0D1218** (the frames, slightly blue), not #111214 from the brief.
- **Connectors are thin solid lines,** not dotted, as in the frames. Items are icon + label side by side.
- **DNS icon is a plain database** (as in the frames), not a database with a cloud.
- **No personal data or autofill.** The recording shows a real organization name, address, phone and Chrome's autofill popups and blue autofill tint on filled fields. Only Organization Name keeps the blue tint (as the brief asks); other fields stay white.
- **Industry in the recording was Retail;** the tutorial picks Technology (brief).
- **Continue button #7C39ED** (sampled from the frames) and a "Saving..." state with the card dimmed, which the recording shows briefly. The toast shows over this screen because the next screen (Connect your domain, which the recording shows behind the toast) is not built yet.
- **Toast** is the shared green toast (370 px wide), larger than the recording's.
- **Focus ring** on text fields and open selects is purple, as in the recording's Website field.
- **Narrow screens** (under 900px): sidebar becomes a row of five icons, the card is enlarged (CSS zoom 1.9) and the two-column rows stack.
- **Select list animation** (fade and slight drop, 0.2 s) and hover highlight are ours; the recording's list appears instantly.

## Snaarp Mail step 4

- **Sample domain acme-studio.com** replaces the real domain; the recording also shows "www." typed by mistake, which is left out.
- **No red error toast on the success screen.** The recording shows a red "[object Object]" toast there (a bug in the real product). Left out.
- **No green "Organization details saved" toast at the start.** It lingers over screen A in the recording; the tutorial already showed it at the end of step 3.
- **Buttons are #111827** (brief; frames sample about #0F1725). Disabled button #868A92 and check circle #34B161 are sampled from the frames.
- **Button text sizes are slightly larger than the recording** so they stay readable when scaled.
- **Typing is slow (about 0.15 s per letter)** to fill the 6 s the brief gives screen B; the pause before Add New Domain (11.0 s) is as the brief says.
- **The domain on screen C never breaks at the hyphen** (kept on one line).
- **Fade between screens** (0.4 s) is ours; the recording cuts.
- **Narrow screens** (under 900px): content enlarged with CSS zoom 2, option cards stack.

## Snaarp Mail step 5

- **Sample domain acme-studio.com** replaces the real domains (and the recording's other people's domains) in every record. The mail server mail.mailrit.com. is the product's real value and is kept. The DKIM key is made up.
- **All five cards start Pending.** In the recording the MX and some TXT cards were already Verified (the recorder's domain was set up). The tutorial needs them pending for steps 6 and 7.
- **The provider list has four options** (Manual Setup (Copy & Paste), Cloudflare, GoDaddy, Spaceship), as in the frames, not the two in the brief.
- **Modal is 388 px wide,** from the frames, not 460.
- **No Spaceship panel.** The recording shows an API key form after choosing Spaceship; the tutorial keeps Manual Setup, so only that panel is built.
- **One table row per card, no repeated tiny labels.** The recording's rows repeat each column name above the value (a responsive artifact); the tutorial shows the header row only.
- **TXT tag colour follows the state** (amber pending, green verified), as in the frames; MX is blue and CNAME indigo.
- **Content starts 202 px from the sidebar** (left-aligned, as in the frames) and is 583 px wide (brief said about 560).
- **Buttons:** black (#0B0B0F) for Publish DNS automatically and Mark submitted; Continue is #9CA3AF until all five are verified, then #111827.
- **"Copied" tooltip** is the shared one from the 360 tutorial (dark, 1 s).
- **Scroll path, hover on the provider options and the white fade** are ours.
- **Narrow screens** (under 900px): page and modal enlarged with CSS zoom 2.3.

## Snaarp Mail step 6 (Cloudflare)

- **The Cloudflare screens are an illustration, not a copy.** There is no recording for this step. The look follows three screenshots of an older Cloudflare dashboard (`ref/mail/cloudflare-*.png`), and Cloudflare changes its dashboard often. **Check the scene against the live dashboard before launch** (menu names, the add-record form, the Proxy toggle, the table columns). Every Cloudflare page carries the footnote "Illustration of the Cloudflare dashboard. Your screen may look slightly different."
- **Own artwork.** The orange cloud and every menu icon are our own simple drawings (`cf*` icons in `components/icons.tsx`), not Cloudflare artwork. The top bar says "CLOUDFLARE" in plain text.
- **Open Sans** is loaded for the Cloudflare screens only (third-party screens keep their own typeface; everything else stays Poppins).
- **Mail server without the trailing dot.** Step 5 shows `mail.mailrit.com.`; Cloudflare gets `mail.mailrit.com` (the dot is removed in code, from the same value).
- **Added rows go at the bottom** of the table so the five new rows can be ringed together. Real Cloudflare sorts by type.
- **Only Overview and DNS in the left menu are clickable** (the two pages that exist).
- **Extra caption** for the CNAME record ("CNAME record: name mail, target mail.mailrit.com") before the "Turn the orange cloud off" caption, to match the other records. The Overview cards (Plan Free, DNS records 2) are invented sample content.
- **URL pill** shows the Overview address first and the DNS address after the click on DNS.
- **Toast** sits just below the top bar (new `below-bar` position) so it does not cover the Cloudflare top bar.
- **Narrow screens** (under 900px): dashboard enlarged with CSS zoom 2, menu becomes an icon column.

## Snaarp Mail step 7 (Confirm the records)

- **Every record turns to a green "Verified"** so the story ends well. In the recording the DNS status after checking can read "No records" (the recorder's DNS was not set up for these values).
- **The recording does not show the marking.** Its last minute (2:25-3:00) scrolls the page, with some cards already Verified; the look of Mark submitted, Verified, the check and Continue follows the step 5 frames and the existing card.
- **Continue turns navy at 10.5 s**, about 2.6 s after the last card is verified (the step script holds it grey on purpose, as the brief says); in the shared page it would turn navy the moment the fifth card is verified.
- **Check pop** (a small scale-in on the green checks) is ours.
- **Scroll path and the white fade** are ours.

## Snaarp Mail step 8 (Add your team)

- **Intentional text changes to the owner's design:** the sidebar label is "Users Inbox" (the recording's wording; the design says "Users"), and the intro says "join Snaarp" (the design says "Mailrit"). All names and emails are sample data (the design's six people are not used; the table starts empty and gets one row, Sam Lee).
- **Scale.** The design image is far larger than the scene, so sizes were taken proportionally and rounded for legibility: the title is 24 px (the brief said about 28), the card is 780 px wide, table text 12 px. The card is centred in the white area (the design has it slightly left).
- **The modal is the 360 one**, so it keeps the 360 look (blue Copy button, dark Create User button) and the 360 wording. It is not restyled to the black buttons of the new screen.
- **Button colours** follow the design (black Add User and Continue), not the purple or navy buttons of other onboarding screens.
- **The table body keeps a minimum height** so the card does not jump when the first row replaces the empty state, and so the row menu has room below the row.
- **Export, Back, Import CSV and Sync Google Workspace do nothing** (decorative). Continue is only clicked for the story; it does not navigate.
- **Narrow screens** (under 900px): card enlarged with CSS zoom 1.8, option cards stack, table scrolls sideways inside its card.

## Snaarp Mail step 9 (Finish setup)

- **The design is the owner's** (`ref/mail/setup-completed.png`); sizes were taken proportionally from it and rounded for legibility (title 32 px, card 780 px, centred vertically and horizontally in the white area).
- **Sidebar label** is "Users Inbox" (the recording's wording; the design image says "Users"), as in steps 3 to 8.
- **Chips start grey** and turn pale green one by one (the design only shows the finished state). The chip check pop and the sidebar check-circle cross-fade are ours.
- **The dashboard is the 360 one**, so it keeps 360's look and the Inboxes card uses the same inbox icon as 360 (the brief said "mail"). Only the four stat card values changed, plus the numbers counting up.
- **The "What's Next?" lines** wrap where the width allows (the first line wraps as in the design).
- **Download Summary and the other buttons** do nothing (decorative). "Go to Admin Dashboard" only changes screen because the script clicks it.
- **Narrow screens** (under 900px): card enlarged with CSS zoom 1.8, chips in two rows.

## Snaarp Doc step 1 (Explore Snaarp Doc)

- **Sidebar fill follows the recording, not the brief:** on the template gallery no sidebar item has the grey fill (the recording shows none; only "All Documents" is grey, as on every screen). Documents is filled on screen A and Trash on screen C.
- **Sidebar width** is 192 px at the 1440 design width (measured from the recording) instead of "about 220".
- **App rail highlight** for Docs is a light blue-lavender (`#E6EDFB`) as in the recording, not a purple tint.
- **Rail icons** use the real product logos from `public/logos/` (purple rounded tiles) through `ProductLogo`, like the other admin rails, instead of newly drawn icons. The sidebar header uses the real Docs logo tile too; the recording shows a small purple gem mark.
- **Left out of the recording:** the profile photo (replaced by the "JD" initials circle), the real document names ("Production Brief Clip 1A" became "Product Roadmap"), the grid view of the document list and the Starred page. The recording also shows a 12th app icon under Logout that is cut off; it is not drawn.
- **Template previews** are generic grey line drawings, not the real template content. The gallery shows 22 templates (the recording shows 14 plus a cut-off row); how many rows are visible depends on the window height.
- **Cursor on Restore** (screen C, 11.5-13 s) is not in the brief: it only hovers the button so the cursor does not sit still. Remove it in `step1-script.ts` if unwanted.
- **Placeholder URLs:** every address except `docs.snaarp.com/trash` is a guess (`/documents`, `/templates`, and the step 2-9 addresses in `tutorials/snaarp-doc.ts`).
- **Step list is provisional** (9 steps from the owner's brief); steps 2-9 are not built.

## Snaarp Doc step 2 (Create a blank document)

- **Loading state follows the recording, not the brief:** the recording shows only the faded header (title, badge, status, Save, buttons, avatar), the menus File / Edit / View / Tools / Help (Insert, Format and eSignature appear later), the faded footer line ("0 words" / "v1") and the pulsing logo mark. The toolbar, ruler and page are not there yet, so here they fade in when the editor opens.
- **Logo mark:** the recording shows a small purple layered gem (three stacked slices); `hexMark` is a redraw of it, not an exact copy.
- **Screen change:** the recording cross-fades from the home (faded, with the mark on top) into the editor and shows the new "Untitled Document / Just now" row at the top of the recent list. This step does a short fade to a white editor instead and does not add the new row.
- **Hover on Blank document:** the card gets a blue border (as in the recording); this needed a small hook on the Step 1 home card (`data-tl="blank-card"`).
- **Profile photo** replaced by the "JD" initials circle (purple).
- **Toolbar icons** are redrawn to match the recording's order; they are close, not identical. The scroll bar on the right of the canvas and the document's scrolling are not drawn (the page is taller than the screen, so it runs off the bottom).
- **Placeholder URL:** `docs.snaarp.com/document/new` (the address bar is not visible in the recording).

## Snaarp Doc step 3 (Explore the editor and File menu)

- **File menu width follows the recording, not the brief:** 180 px at the 1440 design width (measured from the recording), not about 245 px. Row height 24 px, dividers 7 px, corner radius 8 px.
- **Menu position:** the card starts 2 px below the menu row, a little to the left of the "File" label, and overlaps the toolbar, as in the recording.
- **Icons** in the File menu are redraws (close, not identical).
- **Download submenu** is built (width 158 px, five items) but not opened in this step's timeline; it is ready for step 6. It was rendered once as a test.
- **Cursor moves not in the brief:** after the menus ring the cursor drifts to just under "File"; during the toolbar ring it sweeps from Search to the far-right pen, and on narrow screens it stops at Underline because the rest of the toolbar is scrolled out of view. On narrow screens the Editing/Suggesting toggle is not shown, so only the Share button gets the ring.
- **Placeholder URL:** `docs.snaarp.com/document/untitled` (the address bar is not visible in the recording).

## Snaarp Doc steps 4-8 (copy, share, download and Drive, rename, version history)

- **Left out of the recording:** the computer's file picker (opened by "Open"), the browser's print window, the browser's own rename pop-up, the real profile photo, name and email (sample user Jane Doe, jane@acme-studio.com, avatar "JD" / "J") and the red "Disconnected" status dot.
- **Email is not shown:** nothing visible happens in the recording when it is clicked.
- **Rename is completed, not cancelled:** the recording opens the browser's rename pop-up and cancels it. Step 7 uses a Snaarp-styled dialog (like Share), types "Project Brief" and clicks OK, so the tutorial shows the whole action.
- **"Anyone with the link" options are inferred:** the recording cuts the moment the General access dropdown is open, so the two options (Restricted / Anyone with the link, with a check and a grey line each) are modelled on the role card, which is visible. The role card (ROLE: Viewer, Commenter, Editor) follows the recording.
- **Share dialog width follows the recording, not the brief:** about 390 px at the 1440 design width (measured from the recording, 27% of its width), not about 440. The Rename dialog is 380 px wide, in the same style. Both use the admin `Modal` (dim backdrop, 14 px corners).
- **Dialog fonts:** the recording uses an Arial-like face; the dialogs use the site font (Poppins).
- **Toast position:** bottom right, 46 px above the bottom edge so it clears the two footer lines (the brief says about 24 px from the edges); width follows the text.
- **Step 4 title change:** the title becomes "Untitled Document (Copy)" as the loading state starts (the recording shows the copy's title already in the loading state), not when the editor fades back in. The caption is hidden during the loading state.
- **Step 6 toast texts** ("Uploading to Drive...", "Saved to Drive: Untitled Document (Copy).docx") come from the brief; the recording does not show them.
- **Version history page** follows the recording (back arrow, print and 100% row, grey "Empty document" area, right panel with "All versions", the empty-state text and "Show changes"); the "Loading..." line the recording shows for a moment is skipped.
- **Placeholder URLs:** every Snaarp Doc address except `docs.snaarp.com/trash` is a guess (`.../untitled`, `.../untitled-copy`, `.../version-history`). Step 4 starts on `.../untitled`; steps 5 to 8 start on `.../untitled-copy`.

## Snaarp Doc step 9 (Print your document)

- **The browser's print window is not copied:** the recording opens the browser's own dark print window with a real printer name. Step 9 draws a neutral Snaarp-styled panel instead (`PrintDialog`): blank page preview, "Print" / "1 sheet of paper", Destination "Save as PDF", Pages "All", Layout "Portrait", Color "Color", "More settings", Print and Cancel. No printer, computer or brand names. The recording's Details and Language hover (both greyed out) is not repeated.
- **Cursor on the settings** (hovering Destination, Pages, Layout and Color) is in the brief, not in the recording.
- **Print panel width:** 760 px at the 1440 design width, as in the brief (520 px stacked on narrow screens).

## Snaarp Doc steps 10-13 (Edit menu, copy and paste, select all / delete / undo, find and replace)

- **Sample text instead of the recording's text:** the recording's document holds private project notes, file paths and a real tool name. Steps 10 to 13 use the invented "Acme Studio Website Redesign" brief (`components/docs/sample-document.ts`). "Acme" appears as Acme, acme and ACME so Match case changes the count.
- **"Acme" to "Apex" instead of the recording's replace example.** With Match case on, only the four exact "Acme" words change; "acme" and "ACME" stay, which shows what Match case does.
- **The browser's clipboard pop-up** ("See text and images copied to the clipboard", Allow / Block) is not shown; the recording's browser tooltips are not shown either.
- **Cut is only mentioned** (a caption in step 11), not shown, as in the brief.
- **Edit menu width:** 250 px at the 1440 design width. The recording's menu is about 209 px wide and its label "Paste without formatting" runs into its shortcut; the wider menu keeps them apart (the brief asked for about 245 px).
- **Document font and size:** Arial (the toolbar says Arial); body 11 pt (10.8 px), headings 20 pt (19.5 px), page margins 6 % of the page width, as measured in the frames. All three headings use the same size, so the toolbar size box shows "20" in a heading and "11" in a paragraph.
- **Undo in the Edit menu is always active** (as in the frames, where Undo is dark before any edit); Redo, Cut, Copy and Delete are greyed out until they can be used.
- **Select all hides the floating selection toolbar** (only a drag selection shows it); the toolbar hides while a menu is open, as in the recording.
- **Caret, paste highlight and find marks:** the caret blink, the paste highlight (soft yellow fade) and the green find marks are redraws chosen to match the look of the frames.
- **Find and replace panel:** 296 px wide at the top right, under the toolbar; the Find input is focused when the panel opens, as in the recording.
- **Placeholder address:** `docs.snaarp.com/document/project-brief` for all four steps.

## Snaarp Doc steps 14-18 (editing mode, Comments, Document outline, ruler and layout)

- **Sample text instead of the recording's text:** the recording's document holds private project notes, file paths and a real tool name. Steps 14 to 18 use the same invented "Acme Studio Website Redesign" brief as steps 10 to 13, and each starts with the original text.
- **Commenter name and photo replaced:** the recording shows a real username and profile photo in the Comments panel and the header. The steps use "Jane Doe" with an initial "J" circle, and the "JD" header avatar. The comment texts are sample text ("Please review this section", "This needs more detail").
- **Shortcut:** the recording's "Show non-printing characters" shortcut is drawn in a Mac-style symbol set; the step shows "Ctrl+Shift+P", like the other Windows-style shortcuts.
- **Resolve and Delete are inferred:** the recording hovers the three-dot icon but never opens its card. The card (Resolve, Delete in red) follows the brief. The filter dropdown (All types / Open / Resolved) is shown, and its items are only hovered.
- **Panel sizes follow the frames:** the Comments panel is 245 px (the frames show about 17 % of the width) and the Document tabs panel 180 px (about 12 %), not the 270 / 250 px of the brief. The View menu is 275 px (the brief said about 245) so that "Show non-printing characters" and its shortcut fit without cutting the label.
- **Two "Add comment" buttons in the empty panel:** as in the frames, the empty Comments panel shows the blue button in the middle and a full-width one at the bottom. The bottom one is replaced by the "Who sees comments?" text once there is a comment or a composer.
- **Newest comment on top:** as in the frames, the second thread card appears above the first one. The first comment has no highlight in the text (the recording's first comment was made without selecting text).
- **Viewing mode:** as in the frames, the whole toolbar row hides and neither header pill is selected (the brief asked us to follow the frames). Suggesting looks like Editing except for the selected pill.
- **Add tab and Full screen are additions beyond the recording.** The recording only hovers the plus of the Document tabs panel and its Full screen item does not work. In the steps the plus adds "Tab 2" with a blank page (and clicking a tab switches back; each tab keeps its page), and Full screen shows a focused view. Both were added on purpose for the tutorial.
- **Full screen is simulated inside the browser frame**, not with the browser's Fullscreen API (that would cover the player and the captions). A dark overlay hides the editor chrome; the page stays where it was. Entering it switches "Show non-printing characters" off so the focused view shows the plain text. The "Press Esc to exit full screen" pill and the "Esc" key chip are drawn by the step; the real Esc key is not wired, the script exits full screen itself.
- **Document outline opens with the round button, not the View menu**, because that is what the recording does (the menu item does the same). The caption says "Click the outline button in the corner" instead of "Click View, then Document outline". In the recording the Comments panel is still open at that point; in the step it is closed (the brief). The Outline panel starts under the toolbar and ruler, as in the frames, and stops above the footer lines so "1 page N words" stays visible. The caption for the first click names the button the cursor really clicks ("Click the outline button in the corner") instead of "Click View, then Document outline".
- **Step 18 toggles Show non-printing characters on** (the brief said hover only unless the frames show it toggled; they do: dots for spaces and paragraph marks appear and the text reflows). The marks switch off again when Full screen starts. The step is 30 s. Show print layout (no visible change in the frames) and Show equation toolbar (greyed out) are hover-only.
- **Selection toolbar:** for a selection in the middle of a paragraph the dark toolbar sits further left so it stays over the text; whole-paragraph selections (steps 11 to 13) are unchanged.
- **Placeholder address:** `docs.snaarp.com/document/project-brief` for all five steps.

## Snaarp Doc steps 19-22 (Insert menu, image, table, link)

- **Sample content instead of the recording's:** the recording's document holds private project notes, file paths and a real tool name; steps 19 to 22 use the same invented "Acme Studio Website Redesign" brief as steps 10 to 18 and each starts from the original text. The recording's real news image is replaced by an original banner drawn in the page (purple-to-blue gradient, simple shapes, the word "Acme Studio"; file name "acme-banner.png" shown only in the toast). The recording's table text (food items) is replaced by a task table (Task / Owner / Due, Jane Doe, Alex Kim). The recording's link address is replaced by www.acme-studio.com.
- **The computer's file picker (step 20) is left out:** the caption "Choose a picture from your computer" shows while the cursor rests for a moment, then the upload toast appears. The recording's loading toast has two lines ("Uploading ... / name ... 0%"); the step uses the shared one-line toast ("Uploading acme-banner.png...").
- **Profile photo replaced:** the recording's header shows a profile photo; the steps keep the "JD" avatar. Browser tooltips and cursors from the recording are not drawn.
- **Insert menu items for later steps exist but are not wired:** Horizontal line, Break (and its submenu), Bookmark, Page elements (and its submenus, including Table of contents), Block quote, Checklist, Code block, eSignature, Drawing and Symbols can be hovered but do nothing when clicked (steps 23 and up will add them). Comment is greyed out, as in the recording. The "Page break" shortcut is drawn in the recording with a Mac key; the step shows "Ctrl+Enter".
- **Menu width:** the Insert menu is about 165 px wide at the 1440 design width, as in the frames.
- **Step 20 has no resize drag:** the frames show the four corner handles but never resize, so the cursor only hovers (rings) the bottom-right handle. The caption "Drag a corner to resize it" is the brief's wording; the real product may well resize, but the tutorial does not show it.
- **Image floating toolbar:** the frames show the same dark bar as for selected text (Bold, Italic, Underline, Strikethrough, Highlight, a round icon, Comment); the step reuses that bar.
- **Step 21 table:** it appears ready-made (3 columns, header row and two body rows), without a size picker, because that is what the frames show. In the recording it appears where the caret was (under the image); the step puts it under the intro paragraph (as the brief asks), with the caret blinking there at the start. The cursor clicks each cell, then types (the brief allowed Tab; clicking matches the caption "Click a cell and type"). Cell text is about 11.5 px at the 1440 design width, measured from the frames (the brief said 13 px). The focused cell has a thin blue outline (the brief asked for a focus outline; the frames show only the caret). The footer word count includes the table text.
- **Step 22 dialog:** 340 px wide (measured from the frames; the brief said about 360), title "Insert Link", description "Enter the URL for the link. Optionally choose to open in a new tab.", URL input with placeholder "https://example.com", a ticked "Open in new tab" checkbox, Cancel (outlined) and Insert (solid black). The focused input has a near-black border and caret, as in the frames (the brief said blue). Insert looks the same empty or filled: the frames show no disabled state. The link text turns blue and underlined, and the text selection of the recording (part of the heading) is the whole heading in the step.
- **Placeholder address:** `docs.snaarp.com/document/project-brief` for all four steps.

## Snaarp Doc steps 23-26 (line and page break, bookmark, header and footer, watermark)

- **Sample text instead of the recording's:** the same invented "Acme Studio Website Redesign" brief as steps 10 to 22, each step starting from the original text. Header "Acme Studio brief", footer "Confidential" (built, not shown), bookmark name "Work in progress", watermark "Draft" replace the recording's own words. The real news image and the profile photo ("JD" instead) are not used.
- **The browser's dark bookmark pop-up is redrawn** as our own white "Add bookmark" dialog (same family as Rename and Insert Link): title, "Bookmark name", Cancel and OK (black). The input has a blue focus border, as the brief asked.
- **Bookmark marker and toast instead of the raw text:** after the bookmark is added the recording shows raw code-like text in the page (it looks like a product bug). The step shows a small bookmark icon in a soft blue-grey tile at the start of the line, and the toast "Bookmark added".
- **Page break follows the frames, not the brief's "grey gap":** the frames show page 1 padded down to a full page, then only a thin grey band (about 4 px, with a slightly darker edge) and page 2 on the same white page card, with the page borders running on. The step draws exactly that (no wide grey gap between two cards). The footer line says "2 pages". Page 1 is about 790 design px tall once the document is split (page 2 starts after the band).
- **Section breaks are hover only:** the frames never click Section break (next page) or (continuous), so the step only hovers them. They do nothing when clicked.
- **Shortcut:** Page break shows "Ctrl+Enter" (the recording draws a Mac key).
- **Horizontal line look:** a 1 px grey line (#C4C8D0) across the text width with about 12 px of space above and below, at the caret (the start of the intro paragraph).
- **Header and footer:** the frames show the header typed at the top of the page: small text (about 11 px) at the left of the text area, a thin dotted line about 30 px from the top of the page, then the body. The step draws that. The frames never show the footer being filled in, so step 25 only hovers Footer (caption "Footer works the same way at the bottom of the page"). The footer area is built and wired (a mirror of the header at the bottom of the page), but no step shows it yet.
- **Watermark panel:** 216 px wide, measured from the frames (the brief said about 270). It sits under the header like the Comments panel and covers the right end of the toolbar, as in the frames. The Image tab only looks right (a dashed upload box); there is no real upload. In the frames the radios, slider and Remove watermark are not clicked, so the step only hovers them (the watermark does not change layout). The watermark is large grey bold text at about -38 degrees; the recording's word is longer, so the sample "Draft" is set bigger (76 px) to fill the page the same way. It sits across the middle of the first page.
- **Typing in the panel:** the watermark appears live as "Draft" is typed; the counter reads 5/100.
- **Placeholder address:** `docs.snaarp.com/document/project-brief` for all four steps.

## Snaarp Doc steps 27-30 (page numbers, quote / checklist / code block, eSignature, drawing and symbols)

- **Sample content instead of the recording's:** the same invented "Acme Studio Website Redesign" brief as steps 10 to 26, each step starting from the original text on one page. The recording's real text, its "Classified" watermark and the extra pages seen in its later frames are left out. The recording's signature and scribble are replaced by two original strokes (a loopy signature and a wave-with-loop doodle, one SVG path each in `components/docs/stroke-data.ts`). The profile photo is replaced by "JD".
- **Page numbers dialog:** copied from the frames: description "Insert a dynamic page number field. The value is computed from the document's pages at render time.", Position (Top (header) / Bottom (footer)), Alignment (Left / Center / Right), Start numbering at (value 1) with the hint "Use 0 to skip a cover page, or a higher value to continue from another document.", Remove page numbers, Cancel and Apply. The frames open it with Bottom (footer) and Right already selected, so the step hovers Top (header) and then clicks Bottom. The recording's number is a small "5" at the bottom right of the page; the step shows "1" there. The dialog is 344 px wide (the brief said about 330) so the long link text fits.
- **Block quote:** a 1 px grey bar on the left, about 13 px of indent and slightly muted text, as in the frames. In the recording the quoted text is long and wraps; the step quotes the intro paragraph.
- **Checklist:** an empty square box (14 px; the brief said 16) and the text indented, as in the frames. The frames never show the box ticked, so the step only hovers it. The ticked look (blue check, struck-through grey text) is built from a sensible choice and is not shown.
- **Code block has no grey box:** in the frames the code block is plain fixed-width text with no box around it, so the step draws it that way (the brief described a very light grey rounded box). It is 11 px (the brief said about 12).
- **Checklist and code lines are added by a new line under the previous one:** the recording does the same (a click at the end of the text, then a new line). In the step the click is followed by a new empty line (as if Enter was pressed).
- **eSignature dialog:** 380 px wide (the brief said about 400), tabs Draw / Type / Upload / Request with icons, "Draw your signature below:", a canvas, "Clear" and a blue "Insert Signature" (the brief's wording was "Insert signature"; the frames use a capital S, the caption keeps the brief's wording). Only Draw is real; the other tabs are hover only. The signature is drawn by the cursor following the sample stroke (a new helper, `tl.followPath`), not by real mouse input. In the page the signature is about 110 px wide, black, on the line under the caret.
- **Drawing dialog:** 420 px wide. Pen is selected, black is ringed and the second of five sizes is selected, as in the frames; the colour dots are black, red, blue, green, orange, purple and white. The colours and sizes are only hovered. The canvas is very light grey (as in the frames), not white. Once inserted, the doodle is selected (four corner handles and the dark toolbar, reusing step 20's selection look), about 300 px wide.
- **Symbols dialog:** the frames open on Arrows (so it is the default), then show Math. Arrows (20 symbols) and Math (26 symbols) follow the frames; Currency, Punctuation, Shapes and Emoji are never opened in the frames, so their symbols are sensible choices. Rows of 10, as in the frames. A symbol click adds the character at the caret in the text behind the dialog, which stays open. The search box is only drawn (no real search). The dialog is 408 px wide so the six category pills fit on one row (the brief said about 360).
- **Placeholder address:** `docs.snaarp.com/document/project-brief` for all four steps.
- **The Insert menu is complete:** every item now does something except Table of contents, Footnote, Comment (greyed out) and the Section breaks (hover only).

## Snaarp Doc steps 31-34 (Format menu part 1: menu, text, paragraph styles, align and indent)

- **Short practice lines instead of the recording's text.** The recording formats one big messy block of its own text (private project notes, file paths, a real tool name). The tutorial uses short, clean practice lines after the Contacts paragraph so each effect is obvious (step 32: "Bold, italic, underline and strikethrough change how words look. Launch is on the 15th. Water is H2O."; step 33: "Project overview" and "A faster, clearer website for Acme Studio."; step 34: "Thank you for choosing Acme Studio."). They are in each step's data file.
- **Left out of the recording:** the real news image and table, the small "Download with IDM" bar floating over the text, the profile photo (the avatar says "JD"), browser tooltips and cursors, and the document's real text.
- **Menu wording and look follow the frames:** Text, Paragraph styles, Align & indent, Bullets & numbering | Headers & footers, Page numbers, Page orientation, Columns (greyed out) | Clear formatting with the shortcut "Ctrl+\" and no icon. Text submenu: Bold Ctrl+B, Italic Ctrl+I, Underline Ctrl+U, Strikethrough, Superscript, Subscript. Paragraph styles: Normal text, then Heading 1 to 6 each in its own size. Align & indent: Left, Center, Right, Justify, then Increase indent, Decrease indent. Bullets & numbering (Bullet list, Numbered list, Checklist) was not opened in the recording, so its rows are our own wording. The menu is a little wider than the Insert menu (172 px, because of "Bullets & numbering").
- **Not wired yet (next round):** Headers & footers, Page numbers, Page orientation, the Bullets & numbering rows and Clear formatting exist in the menu and can be hovered, but do nothing when clicked.
- **Heading sizes.** Heading 1 is 25 pt (larger than the sample document's own title, which was already 20 pt in steps 10-30 and is left as it was), Heading 2 is 20 pt and looks the same as "Goals", Heading 3 to 6 are 16, 14, 12 and 11 pt, all bold. The toolbar size box follows (25, 20, 16 ...).
- **Toolbar follows the text in steps 31-34 only.** The style box ("Normal text", "Heading 1" ...) and the active (light grey) B / I / U / strikethrough / superscript / subscript / alignment buttons are live only when the stage is built with `formatting`. Steps 1-30 keep the old, fixed toolbar.
- **Formatting stays on the selection.** After a Format > Text choice the word stays selected until the next word is picked (as in the recording). The selection toolbar sits over the start of a selected word.
- **Indent** is 36 px per step (half an inch on the sample page) and stops at 0 (and at 8).
- **Step 34 toolbar ring** sits inside the four alignment buttons (the toolbar clips an outer ring).
- **Step timings** follow the owner's brief; the cycles in step 32 are identical (about 4.5 s each). The page does not need to scroll to show the practice lines, so it does not.

## Snaarp Doc: double-check before launch

1. **Placeholder URL pills:** every address except `docs.snaarp.com/trash` is a guess (`/documents`, `/templates`, `/document/new`, `/document/untitled`, `/document/untitled-copy`, `/document/version-history`). Replace them in `tutorials/snaarp-doc.ts` and the step data files (`stepN-data.ts`).
2. **"Anyone with the link" options** in the Share dialog are inferred (the recording cuts that moment); the role card (Viewer, Commenter, Editor) follows the recording. Check the wording and the grey lines with the product team.
3. **Redrawn panels:** the Rename dialog and the Print panel are Snaarp-styled redraws, not the browser's own windows. Confirm they are the look you want, and that the real product does not use a different rename or print flow.
4. **Sample document names and data:** Product Roadmap, Project Proposal, "Untitled Document (Copy)", "Project Brief", user Jane Doe (jane@acme-studio.com). Change them in `scenes/snaarp-doc/step1-data.ts` and `components/docs/doc-titles.ts` if needed.
5. **Toast texts** in step 6 ("Uploading to Drive...", "Saved to Drive: ...docx") come from the brief, not the recording.
6. **Icons** in the editor, File menu and dialogs are redraws, close to but not identical to the real ones.
7. **The step list is provisional:** more steps will be added from later videos; the completion card follows the last step in `tutorials/snaarp-doc.ts` automatically.

## Choices that are not deviations (kept on purpose)

- Admin surfaces keep their own colors: owner portal black, Admin Panel purple, admin sign-in blue, user login black button. Do not unify them (see `DESIGN-TOKENS.md`).
- Step 5 uses two different admin layouts (`AdminLayout` and `AdminPanelLayout`) because the real product does.
- Scenes are built at 1440px and scaled, so every step looks the same at any window size.
- Each step starts where the previous one ended (no fade) when the recording does the same.

## Things to replace or confirm before launch

**Snaarp Mail checklist (all 9 steps are built):**
- **Cloudflare screens (step 6)** are an illustration from older screenshots: check every screen against the live Cloudflare dashboard (menu, add-record form, Proxy toggle, table), keep the "Illustration of the Cloudflare dashboard" footnote or replace it.
- **Placeholder URLs** (the address bar is not visible in the recording or the designs): steps 2, 3, 4, 5, 7, 8 and 9 (`login.snaarp.com/signup`, `/onboarding/organization`, `/onboarding/domain`, `/onboarding/dns` (steps 5 and 7), `/onboarding/users`, `/onboarding/complete`) and the dashboard `admin.snaarp.com/admin`. Step 6's pill is cut off at the end because the shell's pill is only 320 px wide.
- **"Users Inbox" vs "Users":** the sidebar says "Users Inbox" (the recording's wording) but the owner's designs for steps 8 and 9 say "Users". Pick one and change it in `ONBOARDING_ITEMS` in `components/onboarding/OnboardingShell.tsx`.
- **Wording to confirm with the product team:** "Setup Completed!" copy, the "What's Next?" lines, and the Growth plan / 14-day trial values on the dashboard; the naira prices; DNS values (see item 5 below).
- **Sample data:** nothing real is used; acme-studio.com, Jane Doe, Sam Lee and example.com are placeholders.

**General list:**

1. **Cancel button.** Cancel button removed on the owner's request. It can be restored from the git commit "Add Cancel button to player shell".
2. **Real icons** for the remaining placeholders (see item 14) and the two glyphs on the products-home cards.
3. **Currency and prices** on the pricing page (item 7), and all plan details.
4. **Copy.** Confirm all captions, the sign-up page copy ("One Snaarp account for Mail, Docs, Sheet, CRM, and everything else."), feature rows and the completion text with the product team.
5. **Cloudflare illustration.** Re-check the whole of step 6 against the live Cloudflare dashboard (see "Snaarp Mail step 6").
6. **DNS values.** Confirm the real MX server (`mail.mailrit.com.`), CNAME, SPF and DMARC values, and the wording around them.
6. **Plan name on the dashboard** ("Business Plan") and the "Registered from Snaarp Mail" line.
7. **Hostnames in the URL pill**, especially `login.snaarp.com/login?redirect=%2F`, `login.snaarp.com/admin`, and the guessed `mail.snaarp.com/inbox` used for every Snaarp Mail module in `tutorials/snaarp-mail.ts`.
8. **Completion link.** `backHref` defaults to `https://snaarp.com`. Set the real destination per product.
9. **Progress between products.** The rail dropdown shows `0/N` for products you are not viewing because progress is not stored.
10. **Hosting.** Decide the hosting and embedding (iframe or page) and test full-height behaviour with the real parent page.
