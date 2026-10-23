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
- **Step 9 (Print)** is still "Coming soon".

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
