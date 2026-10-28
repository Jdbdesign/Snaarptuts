# Decisions and deviations

Where the tutorial intentionally differs from the source recording (`Sign_up_for_snaarp_360.mp4`) or from the live Snaarp pages, and why. If you change any of these, update this file.

## Sample data only (no real personal data)

Rule: no real emails, passwords, names or domains anywhere in the app. All data below is made up.

| Value | Where |
|---|---|
| Owner: Jane Doe, initials JD, `jane@acme-studio.com` | Steps 2, 3 (sign-in), 4 and 5 (`SAMPLE` in `step2-script.ts` and `step3-script.ts`, `OWNER` in `step5/step5-data.ts`) |
| Organization: Acme Studio | Step 2 |
| Domain: `acme-studio.com` | `step4/step4-data.ts` (`DOMAIN`), reused in step 5 |
| Phone: United Kingdom +44, `7700 900123` (Ofcom drama range) | Step 2 (`PHONE_360` in `signup-data.ts`) |
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
7. **Prices are in pounds (£49, £99, £249, £499).** This follows the project content rule "prices use the pound sign". The live pricing page (a screenshot the owner shared) shows naira (₦) amounts; the owner has since asked for UK currency in every tutorial, so pounds are final. The amounts live in `MONTHLY_360` (`scenes/snaarp-360/pricing-data.ts`) and are formatted by `lib/money.ts`. Plan names, storage sizes, team sizes and feature lists follow the live page.
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

- The recording opens on the Mail tab already selected and scrolled. The tutorial starts on the **360 tab** and clicks Mail (owner's script), so the 360 cards are shown first. They use the same monthly prices as the 360 tutorial (`MONTHLY_360`), with pence shown to match the Mail tab (the live page shows decimals). The recording and the owner's screenshot showed naira; see "UK currency and phone numbers" at the end of this file.
- Product logos are the real Snaarp logo tiles (purple), not the light-tile icons of the live page. The faint outline shield at the end of the icon rows is kept as in the recording.
- Cards swap with a 0.3 s fade; the live page has no such animation. Captions, cursor and rings are added by us.
- URL pills of steps 2-5 and 7-9 are placeholders (not visible in the recording).
- Until all nine steps are built the end card says "Step N complete / The next steps are coming soon." (shell behavior for any tutorial with unbuilt steps).

## Snaarp Mail step 2

- **No personal data, autofill or browser popups.** The recording shows the recorder's real name, email and organization, Chrome's autofill dropdowns and a blue autofill tint on filled fields. All left out; fields stay white with sample data (Jane Doe, jane.doe@example.com, Acme Studio, +44 7700 900123).
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
- **Wired in steps 35-38:** Headers & footers, Page numbers, Page orientation, the Bullets & numbering rows and Clear formatting (see the next section). In steps 31-34 they could only be hovered.
- **Heading sizes.** Heading 1 is 25 pt (larger than the sample document's own title, which was already 20 pt in steps 10-30 and is left as it was), Heading 2 is 20 pt and looks the same as "Goals", Heading 3 to 6 are 16, 14, 12 and 11 pt, all bold. The toolbar size box follows (25, 20, 16 ...).
- **Toolbar follows the text in steps 31-34 only.** The style box ("Normal text", "Heading 1" ...) and the active (light grey) B / I / U / strikethrough / superscript / subscript / alignment buttons are live only when the stage is built with `formatting`. Steps 1-30 keep the old, fixed toolbar.
- **Formatting stays on the selection.** After a Format > Text choice the word stays selected until the next word is picked (as in the recording). The selection toolbar sits over the start of a selected word.
- **Indent** is 36 px per step (half an inch on the sample page) and stops at 0 (and at 8).
- **Step 34 toolbar ring** sits inside the four alignment buttons (the toolbar clips an outer ring).
- **Step timings** follow the owner's brief; the cycles in step 32 are identical (about 4.5 s each). The page does not need to scroll to show the practice lines, so it does not.

## Snaarp Doc steps 35-38 (Format menu part 2: lists, headers / footers / page numbers, page orientation, Clear formatting)

- **Short practice lines instead of the recording's text.** The recording formats a long block of its own text. The tutorial uses short, clean lines after the Contacts paragraph (step 35: "Homepage design", "Content review", "Launch"; step 38: "Special offer: book before December and save 20% on the redesign.", pre-formatted with bold + red, italic, underline + yellow highlight, strikethrough + blue). Steps 36 and 37 start from the sample document only. All in each step's data file.
- **Left out of the recording:** the real news image and table, the "Download with IDM" bar, the profile photo (the avatar says "JD"), browser tooltips and cursors, and the document's real text.
- **Header and footer texts are sample texts** ("Acme Studio brief", "Confidential"); the recording does not show them. Format > Headers & footers creates both areas at once (header with the caret), as briefed; the Insert menu version (step 25) creates one at a time and is unchanged.
- **Page numbers** from the Format menu open the same dialog as step 27 (bottom, right, start at 1) and look the same on the page.
- **Page orientation.** The recording only shows the dialog (Apply to "Whole document", Portrait / Landscape, Cancel, OK) and the page does not visibly change in the frames. The tutorial shows Landscape as a wide page (11 : 8.5, 54.7% of the canvas width, a thin border and a soft shadow, the ruler and the text follow), then switches back to Portrait at the end so the page ends as it started. The "Apply to" box shows only "Whole document" (the one option the frames show). The dialog is our own white card (340 px) like the other dialogs; the recording's is a plain browser-style select.
- **Lists.** Bullets are round dots and numbers are "1." "2." "3." in a 30 px hanging indent; the frames show the bullets only on a long wrapped block, so the spacing is our own. A Checklist is the same item as in step 28 (an empty box, never ticked). Choosing another list type on the same lines replaces the old one.
- **Clear formatting** removes inline marks only (bold, italic, underline, strikethrough, superscript, subscript, colour, highlight); headings, alignment and lists stay. The shortcut is shown exactly as in the frames ("Ctrl+\\"); the caption says "use the keys shown in the menu", and the cursor only hovers the toolbar.
- **Colour and highlight marks are static** (set in data); there is no colour picker. The selection in step 38 is a light see-through blue (not the solid blue of the other steps) so the colours stay visible while the text is selected.
- **Step 36 needs scrolling** (the footer is at the foot of a tall page): the page scrolls down to the footer, and the closing rings visit the header (top) then the footer text and the number (bottom).
- **Timings** follow the owner's brief; the fade starts 0.4 s before each step's end, as in the other steps.

## Snaarp Doc steps 39-44 (Tools menu, word count, eSignature menu: sign, type, upload, request)

- **Sample content instead of the recordings' content.** Every step uses the sample document ("Project Brief"). Left out of the recordings: the document's real text (private project notes, file paths, a real tool name), the real news image and table, the Comments panel with its real comments and username (Tools video), the small round globe pop-up near the end of the Tools video, the computer's own file picker, the real email address typed in the Request tab, the profile photo (the avatar says "JD"), and browser tooltips and cursors.
- **Greyed items.** Spelling and grammar, Dictionary, Notification settings, Preferences, Accessibility and Signature history are shown greyed and are hover only (no hover fill, no click), as in the recording. Only Word count and Document outline are active in the Tools menu. The Help menu is not part of this tutorial.
- **Word count numbers are live.** The recording shows its own long document (2,085 words, 13,246 characters, 5 pages). The tutorial computes the numbers from the sample document (85 words, 507 characters, 430 without spaces, 1 page); Words always equals the "N words" in the footer line. The dialog is 330 px wide (the brief's size), which is wider in proportion than the recording's.
- **Document outline** (step 39) opens the same panel as View > Document outline (step 17).
- **Sign document** opens the dialog on the Draw tab. **Request signature** opens it straight on the Request tab: in the frames the dialog opens on the tab used last (Upload) and then shows the Request content, so the tutorial skips that and opens on Request. Signature history stays greyed.
- **Signatures.** The drawn signature reuses the step 29 sample stroke; the uploaded one is a second original signature (`UPLOADED_SIGNATURE`, a clean black stroke on a transparent background). The typed one is "Jane Doe" in an italic serif (Georgia): the frames show an italic serif but the exact font is not known. All three get the blue outline, four corner handles and the dark floating toolbar when inserted (step 29's own signature stays unselected, as approved). The recording types the word "Adjustment"; the sample name replaces it.
- **Upload.** The recording opens the computer's file picker; the tutorial leaves it out: the cursor clicks the drop zone, rests about 1 s and the sample signature appears in the page.
- **Request sent.** The recording ends with a browser alert ("docs.snaarp.com says: Signature request sent to ..." with an OK button). The brief says no browser popups, so a DocToast with a black check says "Signature request sent" instead (bottom right, about 3 s).
- **Type tab icon.** The Type tab uses the same "A" icon as step 29's dialog (the frames show a serif "T"); changing it would alter step 29. Swap it in `ESIGN.tabs` in `components/docs/insert-data.ts` if wanted.
- **Where the signature goes.** Steps 41 to 43 start with a new empty line under Contacts (caret in it); the signature is placed under that line, like step 29.
- **Timings** follow the brief; each fade starts 0.4 s before the step's end. Step 40 ends at 18.4 s (the brief says about 20 s but its last beat is at 18.0 s) and step 44 at 24.5 s (the brief says about 27 s, last beat 24.0 s).
- **Menu positions** are measured from the real menu row (Tools card 237 px, eSignature card 315 px from the editor's left edge at the 1440 design width), and both stay inside the frame on narrow screens.

## Snaarp Doc: double-check before launch

1. **Placeholder URL pills:** every address except `docs.snaarp.com/trash` is a guess (`/documents`, `/templates`, `/document/new`, `/document/untitled`, `/document/untitled-copy`, `/document/version-history`). Replace them in `tutorials/snaarp-doc.ts` and the step data files (`stepN-data.ts`).
2. **"Anyone with the link" options** in the Share dialog are inferred (the recording cuts that moment); the role card (Viewer, Commenter, Editor) follows the recording. Check the wording and the grey lines with the product team.
3. **Redrawn panels:** the Rename dialog and the Print panel are Snaarp-styled redraws, not the browser's own windows. Confirm they are the look you want, and that the real product does not use a different rename or print flow.
4. **Sample document names and data:** Product Roadmap, Project Proposal, "Untitled Document (Copy)", "Project Brief", user Jane Doe (jane@acme-studio.com). Change them in `scenes/snaarp-doc/step1-data.ts` and `components/docs/doc-titles.ts` if needed.
5. **Toast texts** in step 6 ("Uploading to Drive...", "Saved to Drive: ...docx") come from the brief, not the recording.
6. **Icons** in the editor, File menu and dialogs are redraws, close to but not identical to the real ones.
7. **The Snaarp Doc tutorial is complete at 44 steps** (File, Edit, View, Insert, Format, Tools and eSignature menus; the Help menu is intentionally not included). If steps are added later, the completion card follows the last step in `tutorials/snaarp-doc.ts` automatically.
8. **Request signature** shows a toast instead of the recording's browser alert, and the Type tab keeps step 29's "A" icon (see "Snaarp Doc steps 39-44").

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
- **Wording to confirm with the product team:** "Setup Completed!" copy, the "What's Next?" lines, and the Growth plan / 14-day trial values on the dashboard; the sample pound prices; DNS values (see item 5 below).
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

## Snaarp Doc steps 45-64 (toolbar and header buttons)

Recording: `ref/docs/Snaarp_Doc_toolbar.mp4`. It only hovers the toolbar buttons and opens a few header cards, so everything below the tooltip is built for the tutorial. Where the owner's brief and the recording disagree, the recording won and the step title follows it.

- **Strikethrough is not on the toolbar.** The crossed-S button after the indent buttons has the tooltip "Clear formatting" in the recording. Step 57 is titled "Clear formatting, superscript and subscript" (not "Strikethrough, ..."). Strikethrough stays in Format > Text (step 32). The pre-formatted words in step 57 include a struck-out part so Clear formatting visibly removes it.
- **There is no Columns tool.** The button after Subscript has a quote-mark icon (no tooltip shows in the recording): it is built as a block quote, tooltip "Block quote" (inferred). Columns is greyed out in the Format menu, so no two-column layout was built. Step 58 is titled "Quote, horizontal line and table".
- **The apps panel is titled "Snaarp apps"**, as in the recording, not "Desktop apps". Its tiles follow the recording (Mail, Meet, Teams, One Card, Sheets, Docs (tinted), Slides, PDF, Lock, Sign, Drive, Me, CRM, Books, Workforce, Project, Zeus, Verifyrit) plus a 360 tile at the end (requested, not in the recording). The panel scrolls inside itself.
- **Tooltips.** Text is the recording's where it read clearly (Print, Zoom, Bold, Italic, Underline, Text color, Highlight color, Insert link, Align left / center / right, Justify, Line & paragraph spacing, Bullet list, Numbered list, Increase indent, Clear formatting, Superscript, Subscript, Horizontal rule, Table, Full screen, eSignature, Drawing, Symbols & Emoji, Keyboard shortcuts, Editing mode, Version history, Snaarp apps, Share document). The rest are inferred and marked in `components/docs/toolbar-data.ts`: Undo, Redo, Paint format, Paragraph styles, Font, Font size buttons, Insert image, Decrease indent, Block quote, Meet, Document outline, Comments. The tooltip is our own dark bubble (not the browser's), drawn under the button.
- **Paint format** looked disabled in the recording (the cursor showed "not allowed") because nothing was selected. Step 46 selects styled text first, then it works.
- **Dropdown lists the recording never opens** (zoom list, style list beyond "Normal text", size list beyond 8 and 9, colour palettes, spacing menu, list arrows, table grid, editing mode list) use sensible sample content in `toolbar-data.ts`. The font list uses sample fonts every computer has (Arial ticked), with "Search fonts..." as in the recording. The **spacing menu's two "Add space" rows** are shown grey and are not wired.
- **Checklist** is placed in the bullet button's arrow menu (the recording shows both list buttons with a small arrow but never opens them). The Format menu offers the same three lists.
- **Size box.** Typing a size is shown with a blue ring and caret in the box; the size list is not opened in step 49.
- **Print window** is the neutral panel of step 9 (a blank page preview), not the browser's print window.
- **Meet** starts nothing: "Start new meeting" is only pointed at; "Join with link" opens the "Have a meeting code?" card (as in the recording), a sample code `abc-defg-hij` is typed and a toast says "Meeting ready (sample)".
- **Version history** (step 62) is the page of step 8 with a sample list of saved versions (Today, Yesterday, October 24; author "Jane Doe"); the page area still says "Empty document" as in the recording. Step 8 is unchanged (no list).
- **Share dialog** (step 64) is the step 5 dialog. It starts with Anyone with the link / Editor, as the recording does, and the owner is "Jane Doe (you)". The "Link copied" toast sits under the dialog's dim backdrop.
- **Suggesting mode** (step 60) draws a typed phrase green and underlined; there is no accept / reject card.
- **Full screen, Drawing and Emoji** (step 59) reuse the step 18 simulation and the step 30 windows (the emoji picker is the Symbols window's Emoji tab); the computer's file picker and any real emoji keyboard are left out.
- **Header buttons on narrow screens.** Below 900 px the header normally drops its buttons. Steps 45-64 keep Version history, Meet and the apps grid there (the mode pills and the other icons still go), through `DocEditor`'s `narrowHeaderTools`. Earlier steps are unchanged.
- **Toolbar tool ids** were renamed to match the tooltips (`strike` -> `clear`, `pen` -> `esign`, `pen-tag` -> `drawing`, `signature` -> `shortcuts`); no earlier script used them.
- **Small fix to earlier steps:** with the caret at the very start of a paragraph the toolbar no longer shows every text mark as active (`activeFormats` in `format-state.ts`).
- Sample data only: the Ebola image and text, the profile photo, the browser's own tooltips, the IDM overlay and the real emails of the recording are not used (JD avatar, jane@acme-studio.com, alex@acme-studio.com, acme-studio.com).

## UK currency and phone numbers (all three tutorials)

The owner asked for UK currency and UK phone numbers everywhere. No behaviour, layout, timing or step changed.

- **Currency.** All naira (₦ / NGN) amounts became pounds, converted at the rate the old values implied (about 1,783 naira to £1) and rounded to clean numbers. Money is formatted in one helper, `lib/money.ts` (`formatGBP`, `planPrice`; Intl en-GB / GBP); amounts are numbers in the data files and a 12-month total is always 12 x the monthly price. Snaarp 360 keeps whole pounds (£49, £99, £249, £499 and their totals, unchanged). Snaarp Mail shows pence, as the live page did (Mail tab: Starter £5.00, Growth £25.00, Business £50.00, Scale £100.00; the 360 tab uses the 360 prices with pence). The nav selector reads "GB GBP" with the UK flag, and the sign-up plan box reads "GBP 25.00/month". The `$12/year` domain line in Mail step 4 became £10/year.
- **Phones.** Every sample number is from Ofcom's reserved drama range. The sign-up forms (360 step 2, Mail step 2) show United Kingdom, the UK flag and +44, and type `7700 900123`. The Mail organization step types the organization's landline `+44 20 7946 0123`; its placeholder reads `+44 7700 900123`.
- **Locale.** Mail step 3 address is `10 Acme Street, London, EC1A 1AA` (placeholder `10 High Street, City, Postcode`). Snaarp Doc dates read DD/MM/YYYY (home list: 16/10/2026, 10/10/2026, 20/09/2026) and long dates put the day first ("12 Nov", "24 October, 5:00 AM"). The word count uses en-GB grouping; the Cloudflare illustration's language reads "English (UK)". No time zones (WAT) appeared anywhere.
- **Intentionally left:**
  - `₦` inside the Snaarp Doc Symbols picker (`components/docs/insert-data.ts`, Currency tab): it is one glyph in a list of world currency symbols (from the recording), not a price.
  - "US Letter" page shape in the landscape page comment (`format-menu-data.ts`): paper size, not currency or phone; changing it would change the layout (A4 is the UK size).
  - The recordings and reference images under `ref/` (untouched, as required) still show naira and Nigerian numbers.
  - Old values remain in git history and in the earlier sections of this file that describe the recording.


## Snaarp Admin steps 1-8 (add users and give them products)

Recording: `ref/admin/Snaarp_Admin_add_users.mp4` (the owner's `Downloads/1026 (1).mp4`, 1454x720, 193 s).

- **No earlier Admin tutorial existed.** The brief said to continue after the last existing Admin step, but `tutorials/index.ts` only had Snaarp 360, Mail and Doc (no branch had one either). Snaarp Admin is therefore a new product with these 8 steps as steps 1-8. If an earlier Admin tutorial exists elsewhere, merge by renumbering. The rail logo is the Snaarp mark (`snaarp`) until a real Admin logo is added.
- **Video file name.** The brief named `1026_1.mp4` / `02bb1f92...`; neither exists. The owner confirmed `C:\Users\HP\Downloads\1026 (1).mp4` (the only 1454x720, 193 s file).
- **Sample data replaces everything real:** Dan Thomas / dan@snaarp.com became Sam Carter / sam@acme-studio.com; username `sam`; job title Designer (recording: Frontend); department Design (recording: Engineering); employee number EMP-100 (recording: Em-100); avatar JD (recording: A); the other people in the directory (real names and emails) became 20 invented people at acme-studio.com; the visible password in the recording became dots for a sample password; the "Granted" date is the sample `14/03/2026` (recording: the recording day). Not shown: browser bar, tabs, extensions, the "is presenting" and "is sharing your screen" overlays, the email autocomplete popup.
- **Toast text.** "sam@acme-studio.com created" (as in the recording, with the sample email), not the shorter "User created" from the brief. White card, bottom right; on a phone it sits at the top so the caption does not cover it.
- **Password rules.** Four rules, exactly as on the real page: At least 8 characters, One uppercase letter, One lowercase letter, One special character. The brief also listed "number"; the page has no such rule, so it is not shown.
- **Counts.** Active users go from 40 to 41 (the "before" number is not legible in the recording). Suspended 1 and Administrators 9 are as recorded.
- **Directory.** Before creation: page 1 of 3, "Showing 1-20 of 40", 20 sample rows. After creation: page 3 of 3 with only Sam, "Showing 41-41 of 41", as the recording jumps to the last page. Search, filters, tabs, Refresh, Create Email and the pagination are drawn but not interactive.
- **Department list.** Only "Engineering" is visible in the recording. The rest of the list (No department, Design, Marketing, Sales, Support, Operations) is assumed. Design is chosen so the sample user matches the brief.
- **Selects.** The Department and Role boxes in the Create user dialog are native selects in the recording (the Role list is the operating system's dark list). They are drawn as white lists in the Admin Panel style. The dialog's roles (Member, Admin, Owner) and the table's roles (User, Administrator, Super Administrator) are different lists, as recorded.
- **Product list.** The recording's list also had internal names (Neo, Sendrit, Verifyrit, Zeus); they are left out. Twelve Snaarp products are offered (Books, CRM, Docs, Identity, Me, Meet, Projects, Sheet, Sign, Slides, Teams, Workforce). Snaarp Identity has no logo yet and uses a glyph on a lilac tile. Other icons are the real logos in `public/logos/` (SnaarpKey uses the lock logo); the Drive icon in the recording was a tiny dotted mark, here it is the real Drive logo.
- **Make admin / Remove.** Only hovered, never clicked (as asked). The note under the list is ringed.
- **Dialog scrolling.** As in the recording, the Manage Products body scrolls inside the dialog while the product list is open (the dialog gets extra room under the list).
- **Sizes.** The recording's browser window was about 1210 CSS px wide; the scene is 1440 design px, so the Admin Panel content is slightly roomier than the recording. Dialog widths are 520 (Create user) and 600 (Manage Products).
- **Narrow screens (390x844).** The scene is zoomed 2.4x (like Snaarp Doc), the 240 px menu column is hidden (`AdminPanelLayout` setting `hideMenuOnNarrow`), the table shows User, Role, Products and Actions only, and the Create Email button and the two filter dropdowns are hidden.
- **To replace or confirm before launch:** the Snaarp Admin rail logo, the real Department list, the Identity logo, whether Create Email / filters should do anything, and the placeholder "Granted" date.


## Rail search (products and modules)
- **What a "module" is.** A built step, with its group when the tutorial has groups. Group names are matched and shown in the result's small line, but a group is not a result of its own (the brief only defines product and step results).
- **Groups are new config data.** `Tutorial.groups` is optional and only Snaarp Doc sets it. Steps 1-2 are "Getting started" (the brief listed File first, but those two steps are not File-menu steps); steps 45-59 are "Toolbar" and 60-64 "Header buttons". Rename or regroup in `tutorials/snaarp-doc.ts` if the product team calls them something else.
- **Aliases find products only.** Letting an alias match a product's steps flooded the list (every Admin step matched "user"; every 360 step matched "sign"). Aliases: Snaarp 360 "snaarp360"; Mail "email", "e-mail", "inbox", "mailbox"; Doc "docs", "document", "documents", "word processor"; Admin "admin panel", "administration", "users", "user management". Check them with the team. Every query word also matches a step through its product name (lowest rank), so "doc" lists the Doc steps with "document" in the title first, then the rest of Snaarp Doc.
- **Unbuilt steps are not searchable** (they cannot be opened). All four tutorials are fully built today, so nothing is left out.
- **Opening the product you are already in** restarts its step 1 (the brief says "from step 1"). Opening a product in another tutorial is a normal navigation to `/tutorials/<id>`; opening a step there passes the step through a short-lived client-side slot (`lib/pending-jump.ts`), not the URL, so the address stays `/tutorials/<id>` and a refresh starts at step 1.
- **Typing in the box does not pause the tutorial** and never restarts it. Escape and picking a result also blur the box so Space pauses again. Clicking elsewhere closes the panel but keeps the typed text.
- **Small changes outside the search that it needed.** (1) The rail list now scrolls the active step into view (a jump to step 41 of 64 would otherwise be off screen; it also follows the autoplay now). (2) On phones the rail drawer sat under the scene's caption bubble, which covered the bottom of the results; the drawer and its backdrop are now above it (`z-[60]` / `z-[55]` in `TutorialPlayer.tsx`). (3) The collapsed state of the rail got a search icon in the browser frame, next to the expand button.
- **Placeholder** is "Search products, modules" (the longer "Search products and modules" was cut off in the 260 px rail). The box keeps the 13 px type on phones, so iOS may zoom the page a little when it is focused.
- **Product counts** in the product dropdown still read `0/N` for products other than the open one (unchanged, known issue).


## Snaarp Slides steps 1-19 (File menu round)

Recording: `ref/slides/Snaarp_Slides_file.mp4` (the owner's `C:\Users\HP\Downloads\1026 (1)(1).mp4`, copied, never moved; 1006x480, 228.7 s). Several similarly named files sit in Downloads (`1026.mp4`, `1026(1).mp4`, `1026 (1).mp4`, the last being the Snaarp Admin recording); only `1026 (1)(1).mp4` was used. What the recording shows is the home (0:00-0:25), a loading screen and the "Let's start creating" chooser (0:25-0:36), the editor with the Edit, Insert, Slide, Arrange and Tools menus and the right-hand Blocks, Media, Uploads and Convert panels (0:36-1:05; **not built this round**), then the File menu (1:05-3:48).

**Everything asked for that the recording does not show** (built from the brief, so please check the wording and behaviour):
- Step 1: the Starred page (the recording only hovers the item; the page shows one sample starred presentation); the apps grid pop-up the recording opens is not built; the recent list is drawn as cards (the recording's list view is not built).
- Step 4: File > New is never opened in the recording. The two rows "Presentation" and "From template" are the brief's labels; "From template" opens a template chooser dialog (the five home templates), "Presentation" starts a blank deck with the toast "New presentation created".
- Step 5: the Shared with me and Starred tabs are never opened (the empty states are ours); picking a file and the toast "Opened Acme Studio Pitch" are ours. Tab labels follow the recording ("Computers", not the brief's "Computer"). The recording's wording about Google Drive is kept ("Connect to Google Drive to access your files", "Connect Google Drive"); confirm it is wanted. Dates are UK format (the recording shows US dates).
- Step 6: the recording's Windows file picker and the wedding deck (blue squares, names, dates) are left out; the file is the sample `acme-pitch.pptx` (412 KB) with the slides "Acme Studio", "Our services" (three bullets) and "Next steps". Strings are as recorded: "Uploading ...", "Server is processing your file...", "This may take a few seconds depending on file size", "Importing your slides... Almost there.", "Import complete! Loading your slides...". Slide 1 stays the blank placeholder slide, as in the recording. The toast "3 slides imported" is ours.
- Step 7: the recording only shows the two submenu rows. The toasts are ours. "Selected slides" has no dialog: it copies the slide(s) selected in the panel (toast "...(1 slide)"), because one slide is all the start deck has.
- Step 8: the recording only shows the two rows (Share with others, Publish to web). The Share dialog is Snaarp Doc's (Google-style white dialog, "Share "Acme Studio Pitch""), and the Publish to web dialog (Publish, the link `acme-studio.com/p/acme-pitch`, Stop publishing) is ours. "Stop publishing" is hovered, not clicked.
- Step 9: both Email dialogs are ours. Collaborators are invented (Alex Morgan, Sam Carter, Priya Shah). Attach as PDF or PPTX is a two-button choice.
- Step 10: the seven format labels and their order are read from the recording ("JPEG image (.jpeg, current slide)" etc.). The recording never clicks one; "Preparing download..." (spinner toast) and "Downloaded Acme Studio Pitch.pdf" are ours.
- Step 11: Rename follows the recording (the header title becomes a field with its text selected). The recording types "Batch Presentation"; here "Acme Studio Pitch 2026".
- Step 12: Move opens a folder picker (All Presentations, Client work, Archive, New folder) that the recording never shows. "New folder" is hovered only.
- Step 13: the recording only shows the two rows (Name current version, See version history). The name dialog and the right-hand Version history panel are ours (Snaarp Doc's version history is a full page; the brief asked for a side panel here). Restoring only shows a toast.
- Step 14: Make available offline is never clicked in the recording; the tick (left of the label), the toasts and turning it off again are ours.
- Step 15: Details is never opened in the recording; the dialog and its sample values (created 21/10/2026, 48 KB...) are ours.
- Step 16: Page setup is never opened; the dialog is ours (Widescreen 16:9 = 1920 x 1080 px, Standard 4:3 = 1440 x 1080 px, Custom with Width and Height). Applying a Custom size is not demonstrated (the script types 1600 x 900, then picks Standard 4:3 and applies that).
- Step 17: Print is never opened in the recording. It is Snaarp Doc's print panel adapted (Layout Slides / Handouts, Range, Color, Slides per page); choosing Handouts does not change the preview. The toast "Sent to print" is ours.
- Step 18: the recording greys out Convert to video, Add shortcut to Drive, Security limitations and Language but shows no tooltip for them. The tooltip wording ("... isn't available yet") is ours (`UNAVAILABLE` in `slides-data.ts`). Language keeps its right arrow although it is greyed, as recorded.
- Step 19: the recording shows the Move to trash row and the Trash page; the confirm dialog and the toast "Moved to Trash" are ours. The Trash buttons read "Restore" and "Delete forever" (the recording says "Delete"; the brief said "Delete forever"). After Restore the page says "Trash is empty" and stays on Trash.

**Other deviations.**
- The sidebar title in the recording reads "Slide"; here "Slides" (the product name). Confirm.
- The greeting "Hello, yinkas." is "Hello, Jane." The avatar photo is the "JD" initials. Real presentations ("Bug Testing", "Untitled Presentation (Copy)", "Batch Presentation") are replaced by "Acme Studio Pitch" and "Q4 Business Review".
- The first three cards of the "Let's start creating" chooser (Slides, Images, Infographics) are faded and not clickable, as in the recording.
- The address bar is not visible in the recording; the URLs are placeholders (`slides.snaarp.com/presentation/acme-studio-pitch` etc.). The only real address seen is `.../starred`.
- The sample slide designs (title, three bullets, "Next steps") are ours; Arial text on white.
- The right-hand icon rail (Image, Templates, Blocks, Media, Uploads, Convert) is drawn but does nothing this round. The toolbar, the other seven menus and the slide-panel controls are drawn but inert; File is the only menu that opens.
- Narrow screens (390x844): the editor is zoomed 2.4x like Snaarp Doc, the slide panel is 84 px wide, the right panel and rail are hidden, and the Version history panel overlays the canvas.
- Snaarp Doc components touched, additively (defaults unchanged): `ShareDialog` (shows typed text and added people when the scene sets `field:share-input` / `shareAdded`), `PrintDialog` (optional `copy`, `landscape`, `ratio`, option lists). New `sl*` icons were appended to `components/icons.tsx`.
- Rail groups: "Getting started" (steps 1-2) and "File" (steps 3-19), used by the rail search only.

**To replace or confirm before launch (Snaarp Slides):** the sidebar title ("Slide" vs "Slides"), the Google Drive wording in Open, the placeholder URLs, the wording of every dialog and tooltip listed above as "ours", whether Slides really offers "From template" under New and "Selected slides" without a dialog, and the Starred / Shared with me empty states.


## Snaarp Slides steps 20-35 (Edit, View and Insert round)

Recording: `ref/slides/Snaarp_Slides_edit_view_insert.mp4` (the owner's `C:\Users\HP\Downloads\1026 (1)(2).mp4`, copied, never moved; 1006x480, 107 s; Edit 0:00-0:08, View about 0:09-0:40, Insert about 0:40-1:47). Menu labels, order, dividers, shortcut hints, arrows, ticks and greyed rows are read from the recording and match it. The recording shows a wedding deck ("Wendy & Derry got married", blue squares), a dark Windows file picker with real files and the owner's avatar photo; none of it is used. Sample deck: "Acme Studio Pitch 2026" with "Acme Studio", "Our services" and "Next steps".

**What the recording shows and what is ours.** The recording mostly opens the menus and hovers rows; it does not run most of the actions. So the demonstrations are built from the owner's brief:
- Step 20: typing a line and undoing it. The recording only hovers Undo and Redo (both look enabled even before any change, so they are drawn enabled; clicking them with an empty history does nothing). The line is typed into the bullet list ("Book a free consultation") because a bullet list is a text box; the brief said "a text box".
- Steps 21-23: Select all, Cut, Copy, Paste, Duplicate and Delete are not run in the recording (it shows Cut, Copy, Paste, Delete and Duplicate greyed with nothing selected, which is what step 22 shows first). A paste lands on its old spot unless an element of the same kind is already exactly there, then it is nudged by 3 (so the pasted rectangle on slide 3 sits where the original sits on slide 2); Duplicate is always nudged.
- Step 24: in the recording **Find and replace looks greyed out and is never opened**. As asked, it is built fully working: the Snaarp Doc card adapted to slides (same copy, "Match case" is drawn but not demonstrated). It searches the text boxes of every slide (not table cells, charts or notes), marks every match yellow and the current one orange on the slide, counts from the slide you started on ("1 of 2" is on slide 2, Next jumps to slide 1), and Replace all changes the whole deck with the toast "2 replacements made". To give the search two matches, slide 1's subtitle reads "Design and branding services".
- Step 25: the recording shows the panel ("Speaker notes", "Clear", "Type speaker notes here...") and a tick in front of Speaker notes while it is open. Typing the note, Clear and closing it are ours. After Clear the note is empty, so the bar at the bottom goes back to "Click to add speaker notes" (with a note typed it would show its first words).
- Step 26: the recording shows rulers along the top and left (labels 0 to 900 on the top). The ruler here runs 0-960 with labels every 100; the blue tick that follows the cursor is the brief's ("a tick under the cursor").
- Step 27: the recording shows dashed guides, the centre ones darker. Dragging the rectangle with a snap is ours: the element's centre snaps onto a guide within 2 % of the page width and the guide turns solid blue for a moment.
- Step 28: the recording opens the Zoom submenu (50%, 75%, 100%, 125%, 150%, 200%, Fit) and shows no tick. Choosing 150% and scrolling is ours. **"100%" and "Fit" draw the page at the same size** (at 100% the page already fits the canvas, as in the recording); the other sizes scale from there, and the toolbar zoom box reads the chosen size ("Fit" after Fit).
- Step 29: full screen is simulated inside the browser frame (never the browser's own Fullscreen API), like Snaarp Doc: dark overlay, the slide filling it, the "Press Esc to exit full screen" pill, key chips for the arrow keys and Esc. The cursor stays visible. Arrow keys changing slides is ours.
- Step 30: the recording only shows a faint empty box appearing after Text box. Drawing the box with the cursor (dashed outline) and typing "Book a call: jane@acme-studio.com" is ours; the T tool in the toolbar lights up while the tool is active.
- Step 31: **the OS file window is left out** (real files). Our picker is a small dialog with three sample illustrations drawn as SVG data URIs (studio desk, moodboard, sketchbook; no photographs, no people). The picture lands at 30 x 20 with eight handles; dragging the bottom-right handle to shrink it is ours.
- Step 32: Rectangle, Ellipse, Triangle, Diamond, Star and Arrow are the recording's rows. All shapes are drawn in the brand blue. Only Ellipse and Star are inserted.
- Step 33: the recording's line is a plain black horizontal line; ours is 40 wide, selected with a handle at each end.
- Step 34: the recording's table is a 3 x 3 grid with a grey header row. Typing is ours: Service / Price / Time, Logo design / £450 / 1 week, Website / £1,200 / 4 weeks (pounds; the brief's third price £900 is not used).
- Step 35: the recording's chart has two series (blue and orange bars) and an empty "Chart Properties" panel. **Ours is one series** ("Website visits by month", Jan to Jun: 1,200, 1,800, 2,400, 3,100, 3,600, 4,200, plain counts) and the panel is built as the brief asks: chart title, a Bar / Line / Pie switch (it really changes the chart) and a data table. The title and the data are shown, not editable.
- A step 36 "Features coming soon" (tooltips on Animations panel, Video, Audio, Word art) was built and then **removed at the owner's request**. The greyed "Coming soon" rows are still in the View and Insert menus and show their tooltip if hovered; the removed step is in git history (commit "Snaarp Slides: step 36 (Features coming soon)").

**Other deviations and choices.**
- Slides 1 and 3 of the sample deck and the layout of slide 2 (title, three bullets, one blue rounded rectangle) are ours; Arial-style text as in steps 1-19. Insert always lands in the empty band under the bullets so nothing covers the text.
- Steps 20-35 start with three slides; steps 3-19 still start with one ("Acme Studio Pitch"). The deck name here is "Acme Studio Pitch 2026" and the address is the placeholder `slides.snaarp.com/presentation/acme-studio-pitch-2026`.
- Thumbnails draw the elements too, so they follow every change; selection frames and handles appear on the big canvas only.
- Undo restores the deck and the slide that was showing; selecting things is not an undo step.
- Dropdown widths (208 px) follow the File menu's, the recording's menus are the same width once scaled to the 1440 px scene.
- **Narrow screens (390x844):** every menu, submenu, tooltip and the find card fit; the Chart properties panel overlays the canvas (as the Version history panel does), so the chart is partly hidden behind it while it is open. The editor is zoomed 2.4x like the rest of Snaarp Slides.
- `lib/timeline.ts` got one additive option (`onMove` on `moveCursorTo`) so an element can follow the cursor while it is dragged. Nothing else outside `components/slides/`, `scenes/snaarp-slides/` and `tutorials/snaarp-slides.ts` changed.
- The owner asked for steps 20-36 in one round (step 36 was later removed) (the usual rule is one step per round); each step is its own commit "Snaarp Slides: step N (title)".
- Rail groups: "Edit" (20-24), "View" (25-29) and "Insert" (30-36), used by the rail search.

**To replace or confirm before launch (Edit, View, Insert):** the wording of the demonstrations' captions, the zoom behaviour of "100%" versus "Fit" in the real product, whether Find and replace is really switched off in Snaarp Slides, the in-app image picker (the real product opens the computer's file window), the chart's one-series sample and the contents of the real Chart properties panel, and the sample text on slides 1 and 3.

## Snaarp Slides steps 36-56 (Format, Slide, Arrange, Tools, toolbar and header round)

Recording: `ref/slides/Snaarp_Slides_final.mp4` (the owner's `C:\Users\HP\Downloads\1027.mp4`, copied, never moved; 1008x480, 133 s). Menu, dropdown and dialog labels, order, dividers, shortcut hints, arrows, badges and greyed rows are read from the recording and match it (zooms in `ref/slides/zf/`). The recording shows a deck called "Batch Presentation" with real slides, the owner's name and email in the Share dialog and the owner's photo; none of it is used (sample deck "Acme Studio Pitch 2026", Jane Doe, jane@acme-studio.com, alex@acme-studio.com, the "JD" avatar).

**What the recording shows and what is ours.** The recording opens menus and dropdowns and hovers their rows; it applies almost nothing. Every demonstration below is built from the owner's brief, and each step's `data.ts` says so at the top.
- **Format (steps 36-39).** The recording opens Format with nothing selected: Bold (Ctrl+B), Italic (Ctrl+I), Underline (Ctrl+U) and Strikethrough (no shortcut) are greyed; Align and indent and Line spacing have arrows and are also greyed; Theme and Slide background are dark and have no arrow. **The submenus of Align and indent and of Line spacing are never opened**, so their rows are ours: Left, Center, Right, Justify, Increase indent, Decrease indent; Single, 1.15, 1.5, Double. **Theme and Slide background show no submenu in the recording**; here each opens the matching toolbar card under the toolbar's Theme or Background button (the same card the toolbar button opens). Formatting applies to a whole selected text box (not to a range of letters). A title is bold by default, so step 36 starts with the title in regular weight, otherwise Bold would change nothing. Justify has no visible effect on the short bullet lines (it is hovered, not applied). The six themes' names and swatches are the recording's; what a theme does (slide colour, text colours, the accent that recolours the blue shapes) is ours: Simple Light (white), Simple Dark (#212226), Modern Dark (#0E1118), Ocean Blue (#1565C0), Forest Green (#1B5E20), Purple Dream (#4A148C). A slide's own background beats the theme and flips the text to white on a dark colour.
- **Slide (steps 40-43).** The rows (New slide, Duplicate slide, Delete slide, Skip slide, Change layout, Transition) are the recording's; **Change layout and Transition stay greyed with the "Coming soon" tooltip** (built nowhere in this menu; the working versions are the toolbar's Layout and Transition). The recording clicks New slide, Duplicate and Skip in a long deck with no visible result; the results here are ours: New slide adds a title slide's grey placeholders after the selected slide; Duplicate copies the slide; Skip dims the thumbnail with a "Skipped" badge, the row reads "Unskip slide" (our wording) and the slideshow (full screen, presenter view, Start from beginning) leaves it out; Delete shows the toast "Slide deleted" with **Undo** (the toast stays 12 s so the script can click it) and Undo brings the slide back with the toast "Slide restored". The slide panel can not be reordered.
- **Arrange (steps 44-47).** In the recording every row of Arrange is greyed (nothing is selected) and only the two Align submenus open (Left, Center, Right; Top, Middle, Bottom); the rows are Bring to front, Bring forward, Send backward, Send to back | Align horizontally, Align vertically | Distribute horizontally, Distribute vertically | Group, Ungroup | Rotate clockwise, Rotate counterclockwise. **Group and Ungroup stay greyed with the "Coming soon" tooltip**, as asked. Everything else is built: the stacking order is the order of the elements; one selected object aligns to the slide, several align to the box around them; Distribute needs three or more (greyed with fewer) and keeps the outer two where they are; Rotate turns 90 degrees per click. **Steps 44-47 start with their own slide 2**: 44 keeps the title, bullets and blue box and adds three overlapping squares (each has a strip the others do not cover, so the cursor is always visibly on the one it means); 45, 46 and 47 cut slide 2 down to a centred title plus the shapes, so a shape moved to an edge never lands on text. Shift-click selection is shown by the cursor clicking each square and the selection growing; there is no real Shift key.
- **Tools (steps 48-50).** In the recording Spelling is greyed and shows a **"Coming soon" tooltip**, Explore is greyed, and Preferences is dark and opens nothing (the menu just closes). **Spelling and Explore are built as simple working features, at the owner's request** (the brief says to, if the recording shows them greyed; Spelling's tooltip is a deviation to confirm: if Spelling is really coming soon, drop step 48 and keep the greyed row). Spelling checks the slide for one known mistake ("serivces", fixed to "services"); it is not a general spell checker. Explore is a panel with a search box (it does not search anything: the same sample suggestions show for any word) and three kinds of suggestion that go onto the slide. Preferences is a dialog with three settings; Automatic spelling check marks the misspelt word, Show ruler on open turns the ruler on when saved, and the Default theme is stored only (it is for new presentations, so nothing on screen changes).
- **Toolbar (steps 51-53).** The recording lists the toolbar's tools (undo, redo, print, paint format, a 100% zoom box, select, text, image, shape and line) and shows one tooltip ("Insert image"); only the four dropdowns are opened (Theme: six rows with swatches; Layout: Blank, Title slide, Title and content, Section header, Two content, Caption; Transition: None (blue), Fade, Slide from right, Slide from left, Flip, Cube, Dissolve; Background: eight swatches in two rows of four). Everything they do is ours. The toolbar's **zoom box and shape tool open lists that the recording does not show** (the same sizes as View > Zoom; the same six shapes as Insert > Shape, named by us). The image tool uses our in-app picker (the OS file window is left out, as in step 31). Paint format copies the fill of a shape (or the text style of a text box) to the next element clicked. **Step 52 starts on a new, empty slide 4** because a layout replaces the slide's contents with placeholders. **Step 51's slide** gets a grey box under the blue one and a fixed place for each tool's element so everything fits. The transition preview (fade, slide from right and left, flip, cube, dissolve) is a 0.7 s animation of slide 2 handing over to slide 3 on the canvas; it is not played in the slideshow itself.
- **Header (steps 54-56).** The recording shows the Slideshow dropdown (Presenter view with "Start slideshow with speaker notes and audience Q&A", Start from beginning with Ctrl+Shift+F5, Present using Chromecast greyed, Presentation display options), the meeting icon's tooltip "Join or start a meeting" and its dropdown (the heading "Join or start a meeting", Snaarp Meeting with a NEW badge, Start a new meeting, Use a meeting code), and the Share dialog (add people with a Viewer dropdown, People with access, General access Restricted or Anyone with the link, role Viewer / Commenter / Editor, Copy link, Done; the people pill turns green). The presenter view (slide, next slide, speaker notes, timer, arrows, End), Start from beginning running a full screen, the display options panel, the meeting-code dialog and the toasts are ours. **No real meeting starts**: the toast says "Meeting ready (sample)". Snaarp Meeting (the row with the NEW badge) is only hovered, not clicked: the recording does not show what it does. The Share dialog is the shared one from File > Share (step 8); step 56 adds alex@acme-studio.com as an Editor, sets the link access and cycles the role, and the header's people pill changes from 1 to 2 and turns green after Done.

**Everything the brief asked for that the recording does not show:** a result for every Format, Slide and Arrange row; the Align and indent and Line spacing submenus; the Theme and Slide background cards from the Format menu; Spelling, Explore and Preferences; the toolbar's zoom list, shape list and what undo, redo, print, paint format, text, image, shape and line do; the layouts, the transitions and their preview; the presenter view; the display options panel; the meeting-code dialog; the Share steps and the people count. Items in the brief that were not built: Change layout and Transition (Slide menu), Group, Ungroup, Present using Chromecast, the Animations panel, Video, Audio and Word art stay greyed ("Coming soon"), as asked.

**Other deviations and choices.**
- Each step is its own commit "Snaarp Slides: step N (title)" (36 to 56). One small fix (step 49 narrow screens) was folded into its commit before anything was pushed.
- **Shared code that changed outside `components/slides/` and `scenes/snaarp-slides/`:** `components/docs/DocToast.tsx` and `doc-toast-timeline.ts` (an optional `action` button; Snaarp Doc passes none), `app/globals.css` (`.tl-hl.absolute`: a timeline ring on an absolutely positioned element no longer makes it relative, which made such elements jump for a moment. It can only change elements that carry both classes. Snaarp Doc's own rule is never to ring an absolute element, so the only scripts affected are Snaarp Slides steps that ring a slide element (steps 20-35), where it removes a brief jump), `tutorials/snaarp-slides.ts`. The player shell, `lib/timeline.ts` and the other tutorials are not edited.
- **Narrow screens (390x844):** the header now shows the meeting icon, Slideshow and the people pill (they were hidden), so steps 1-35 also show them on narrow screens. Menus, cards, dialogs and the presenter view fit; the transition preview and the Explore / Chart panels overlay the canvas as before.
- A step may start on a different slide or deck than "slide 2 of the sample deck" only where it says so above (44-47, 51, 52, and 48/50 with the title misspelt).
- Dropdown widths: menus 208 px (as before), the Slideshow card 222 px, the meeting card 190 px, toolbar cards 100-118 px.
- Rail groups: Format (36-39), Slide (40-43), Arrange (44-47), Tools (48-50), Toolbar (51-53), Header (54-56), used by the rail search.
- Completion text: "You know your way around Snaarp Slides: all of its menus, the toolbar and the header buttons."

**To replace or confirm before launch (this round):** whether Spelling and Explore are meant to be built or "coming soon" (the recording shows Spelling's "Coming soon" tooltip); what Format > Theme and Format > Slide background really open; the Align and indent and Line spacing wording; what Preferences really contains; what the toolbar's zoom box and shape tool open; the real Layout and Transition behaviour (and the preview style); the Presenter view and Presentation display options screens; what Snaarp Meeting (NEW) does when clicked; the theme colours; the sample texts (slide 4, "Hello team", "Logo design", the Explore suggestions).


## Snaarp Mail admin and Snaarp Admin update

Recordings (copied to `ref/admin/`, git-ignored, voice-over not heard): `v306.mp4` (5:06: email admin overview, Email Forwarding, then the Admin Panel), `v211.mp4` (3:31: email admin in detail), `v179.mp4` (2:59: Admin Panel bulk users, products, Organization), `v33.mp4` (0:33: Create New Group wizard). Sample data only: Acme Studio, acme-studio.com, Jane Doe (JD); no real names, emails, browser UI, "is presenting" overlays, mic control, OS file pickers or real mail contents.

### Snaarp Mail admin (steps 10-17)
- **Shell.** The email admin reuses the 360 owner portal `AdminLayout` (header "Snaarp", Back to user app, Search). The recordings show an orange avatar and "Snaarp Administrator"; we show "JD / Jane Doe / Owner" like the rest of the project. The sidebar adds Migration (it is in the recordings); Migration does nothing.
- **User Management.** 14 active / 10 inactive / 0 administrators / 12.1 GB as asked. The Suspended Users tab and the other filter dropdowns (Department, Role, Domains, Sort by) are drawn but not interactive. The 14 people are samples sorted A-Z; Department pills use the recording's colours.
- **Step 10, Bulk User Upload.** Labels, helper text, the four columns with Required tags, the blue Important Notes box and the green Tip are read from the recording. The OS file picker is left out: Browse Files fills the file name `acme-users.csv` ("3 users found"). **Unclear:** the recording never shows an upload finishing, so the result is built from the brief: three new users (Ines Duarte, Felix Baumann, Tessa Clarke) join the table in A-Z order, the toast reads "3 users created", Active Users goes 14 to 17. Download Template shows a toast ("Template downloaded: acme-users-template.csv"); the recording's toast says "Template downloaded successfully".
- **Step 11, Bulk Signature.** Layout from the recording (Select Users 14/14, Deselect all, editor toolbar, Size, Insert Image URL, Mobile Signature, New emails / Replies / Forwards, Cancel, Apply to N Users). The editor toolbar buttons are drawn only; just typing works. Unticking Sam and Tom turns the button into "Apply to 12 Users" and the toast reads "Signature applied to 12 users" (our wording).
- **Steps 12-13, Aliases.** Menu items and tabs are as recorded (Aliases (n), Add Alias, Bulk Upload). The domain dropdown shows `@acme-studio.com` and is not a real select (the recording shows several domains). Bulk upload of `acme-aliases.csv` gives Priya, Sam and Tom one alias each; the recording does not show the result, so it is built from the brief. The recording's "Upload & Process" stays grey until a file is chosen; so does ours.
- **Step 14, Manage Signature.** As recorded; the toolbar buttons are drawn only; Preview shows the typed text. Save toast "Signature saved" is ours.
- **Step 15, Create a group.** Wizard text and the three steps are read from `v33.mp4`. The recording picks from a long list of real inboxes; we show six sample inboxes. Name "Support", description "Support for tickets", inbox support@acme-studio.com, type Security Group (the recording's group page says Security Group; the wizard's default highlight is Distribution List). The Group Management list columns are partly guessed (the recording shows them only dimmed behind the wizard): Group, Type, Members, Visibility, Last Active, Actions. Bulk Import, Export, Refresh, the filters and the other group tabs are not interactive.
- **Step 16, members and the group email.** The recording shows the "Add Members" button but no Add Members dialog, so that dialog is built from the brief (tick Jane, Alex, Sam, Priya; "Add 4 members"). The mailbox part shows a New Message window whose From list offers the person and `Support <support@acme-studio.com>`; the recording's mailbox is the real Snaarp inbox, so ours is a simple stand-in with five sample messages. Sending is not simulated. **Unclear:** the recording only shows the From list, not a reply; this is the simplest accurate version.
- **Step 17, Email Forwarding.** Panels, the About text and its four bullets, the supervisor list and the blue Enable button are as recorded. We select Mia Ward and Noah King (the recording selects other people), supervisor Jane Doe. The recording ends before the result; ours shows a toast and a green "Enabled" tag. "Currently monitoring N inbox(es)" is shown as in the recording (it stays 0 until Enable is clicked).
- **Phone width.** The sidebar and the wide header pieces are hidden; a small User / Groups / Email Forwarding switcher with the same hooks replaces the sidebar. `AdminLayout` got two optional props (`menuItems`, `compactOnNarrow`); the 360 and Mail setup steps are unchanged.

### Snaarp Admin (steps 5-12)
- **What was removed.** The sidebar item "Bulk Users" (it is the "Bulk user" button now) and the old steps 5-8 (Check the user's access, Open Manage products, Add the user to another product, Confirm the new access) with the Manage products dialog and its search-and-add box. Products are managed from the Products dropdown (minus to remove, plus under ADD PRODUCT to add). The old per-row "Manage Products" action is gone from the Actions menu.
- **Counts.** 38 active, 6 suspended, 9 administrators (as in the recording). Creating the user in step 4 makes 39 (it was 40 to 41). Organization lists 44 people (38 + 6 suspended), as the recording's "44 users total".
- **Step 5, Bulk user.** Dialog text, columns and the "Review & edit (N)" table are from the recording. The recording's row Role select shows Member / Admin / Owner (not User / Administrator / Super Administrator), so the dialog uses those. The table scrolls sideways inside the dialog like the recording (no scrollbar drawn). The sample file `acme-team.csv` has three rows, one without an email ("Email is required."); a fourth row is added by hand (email, first and last name). All four get created as plain users with Snaarp Mail. The CSV template button shows a toast; no file is downloaded.
- **Step 6, filters.** Search, the multi-select All departments list (checkboxes), the All products list (scrollable, check on the chosen one), Clear filters and the Role dropdown are as recorded. The recording's short "Loading users..." state is left out.
- **Steps 7-8, products.** Counts update live; toast "Snaarp Books added to Priya Shah" / "removed from Alex Morgan" (the recording shows only a "Remove Snaarp" tooltip). The recording's own list includes internal names; only Snaarp products are listed.
- **Steps 9-12, departments.** The Organization page is as recorded (Filter panel with New Department, All members, Engineering, HR, Human Resources, Sales with counts, table, empty "No members in this view"). **Unclear:** the recording opens the New Department dialog and hovers a colour but never creates a department or adds a member. Step 10 builds the creation fully (Design, "Product and brand design", blue). Step 11 uses the row's three-dots menu "Move to department" (the email admin's menu has "Move to Dept"; the Admin Panel's row menu is not shown), moving Ada Okoye into Design. Step 12 filters the Users page by Design (the recording's All departments list is a checkbox list; ours shows Design as soon as it exists). The Users page has no Department column, so the filter shows people with their other columns.
- **Phone width.** The menu column stays hidden; a Users / Organization switcher with the same hooks replaces it.
- **Not viewed closely.** Parts of the 179 s recording that repeat the same screens were only skimmed on contact sheets.

## Player: lock canvas and click-to-pause
The scene is view-only. `components/player/CanvasOverlay.tsx` (copy and limits in `canvas-overlay-data.ts`) is a transparent layer over the scene inside the browser frame (z-45, below the completion card): clicks, wheel, touch swipes, scroll keys, context menu and middle-click never reach the scene, and the scaled scene div is `inert` (no focus, no Tab). Scripted scrolling is unaffected. One click or tap (pointer events, drag over 8 px ignored, 150 ms debounce) or Enter on the focused overlay toggles the same `paused` state as Space, so both stay in sync. Pause freezes the timeline, cursor, captions and Web Animations (existing `Timeline.setPaused`), plus CSS animations through `data-paused` on the player root (rule in `app/globals.css`). The indicator (round pause icon + "Paused. Click to play") replaces the old top-left pill; a play icon flashes for 400 ms on resume (hidden with prefers-reduced-motion). The overlay does nothing once the completion card shows. Changing step, replay or opening another tutorial resets to playing. No scene, timing or content changed.

Decision: the old "Paused · press Space to resume" pill was replaced by the centred indicator. Space still works. The scene is `inert`, so scripts must not rely on `element.focus()` inside scenes (none do today).

## Player rail: straight borders and larger dropdown arrow
Styling only (`components/player/Rail.tsx`, `RailSearch.tsx`). The product header row and the steps panel below it are square-cornered (1px, `#E4D7F9`) and flush: the panel has no top border and overlaps the header's bottom line by 1px, so there is one line where they meet (the old 12px gap is gone). The product dropdown list and the search results panel are square too; the step rows and the active highlight keep their own rounding. The chevron is 20px, `text-ink`, inside a 32x32 target (light hover fill, brand focus ring, rotation off under prefers-reduced-motion); the "0/5" count never wraps. The outer rail card keeps its 24px radius.
