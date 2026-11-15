# UI-MATCH Specification: Zeus (Steps 1–9)

Reference video: `C:\Users\HP\Downloads\1115.mp4` (1384×720, 4:20).  
Design width: 1440px. Design tokens: Poppins font, brand purple `#7328E4` / `#7014D9`, background `#F6F6F8`, white cards `#FFFFFF`.

---

## 1. App Shell & Navigation Layout

Frames: `ref/zeus/0002.jpg`, `0010.jpg`, `0020.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Suite Rail** | `left: 0`, `w-14` (56px), full height | `bg-[#F7F6FB] border-r border-gray-200/80` | Mail, Meets, Teams, One Cardx, Sheets, Docs, Slides, PDF, Lock, Sign, Drive, Logout. No product active. | `ref/zeus/0002.jpg` |
| **Zeus Sidebar** | `left: 56px`, `w-[200px]`, full height | `bg-white border-r border-gray-200/80` | **Top**: Hamburger icon (`w-5 h-5`), Zeus purple bolt logo + "Zeus" wordmark (`font-bold text-lg`).<br>**Nav Items**: People (active: `bg-[#F5EEFF] text-[#7014D9] font-bold rounded-xl`), Companies, Lists, Exports, Integrations.<br>**Bottom**: Report a Bug (red text & flag), Admin Panel (`text-[#7014D9]`, shield icon). | `ref/zeus/0002.jpg` |
| **Top Bar** | `top: 0`, `h-14` (56px), spans content width | `bg-white border-b border-gray-200/80 flex items-center justify-between px-6` | **Left**: Hamburger + Zeus logo.<br>**Center**: Wide search box `bg-gray-100/80 rounded-xl px-4 py-2 text-xs` with magnifying glass icon and placeholder "Search people...".<br>**Right**: Credits pill (`bg-[#F5EEFF] text-[#7014D9] border border-[#7014D9]/20 rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1.5`, bolt icon, "99" -> "98" -> "97"), 9-dot apps grid button, circular user avatar "U" (`bg-gray-800 text-white font-bold w-8 h-8 rounded-full`). | `ref/zeus/0002.jpg`, `0010.jpg` |

---

## 2. Step 1: Meet Zeus (`zeus.snaarp.com/people`)

Frames: `ref/zeus/0002.jpg`, `0006.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Filters Panel** | Left column of People view, `w-[280px]` | `bg-white border-r border-gray-200/80 p-4 overflow-y-auto` | **Header**: "Filters" (`text-sm font-bold text-gray-900`) + right link "Clear all" (`text-xs text-[#7014D9] font-semibold hover:underline`).<br>**Collapsible Groups**: Keyword (input "Search across all fields...", hint "Searches name, title, and email"), Name ("Search by name..."), Lists, Email Status, Job Titles, Company, Seniority, Department, Location, # Employees, Industry & Keywords, Revenue, Technologies.<br>**Bottom Button**: Sticky purple "Search People" button (`bg-[#7014D9] hover:bg-[#5B0FB3] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs w-full`), hint "Enter or ⌘J from anywhere". | `ref/zeus/0002.jpg` |
| **Toolbar Row** | Top of main area, `h-12` | `flex items-center justify-between border-b border-gray-200/80 px-6 bg-white` | **Left**: Tab "Saved 0" (`text-xs text-gray-500 font-semibold`), button "Hide Filters" (slider/filter icon, `text-xs text-gray-700`).<br>**Center**: Database / Find Email segmented switch (`bg-gray-100 p-1 rounded-xl flex items-center`, "Database" active `bg-gray-900 text-white font-semibold text-xs px-3 py-1 rounded-lg`, "Find Email" `text-gray-600 text-xs px-3 py-1`). | `ref/zeus/0002.jpg` |
| **Empty State Hero** | Centered in main view | `flex flex-col items-center justify-center py-12 px-6 text-center` | Icon: circular lilac badge with purple search icon.<br>Title: "Find your next leads" (`text-xl font-bold text-gray-900 mt-4`).<br>Subtitle: "Search millions of verified contacts by name, title, company, location, and more." (`text-xs text-gray-500 mt-1 max-w-md`). | `ref/zeus/0002.jpg` |
| **Quick Start Cards** | 4 cards in 2x2 or 4x1 grid below hero | `grid grid-cols-4 gap-4 mt-8 max-w-4xl w-full` | **Card 1**: "C-Suite Executives", subtitle "CEOs, CTOs, CFOs", user-tie icon.<br>**Card 2**: "VP Engineering", subtitle "Tech decision makers", code icon.<br>**Card 3**: "Sales Leaders", subtitle "Directors & Managers", trending-up icon.<br>**Card 4**: "SaaS & Tech", subtitle "Technology companies", globe icon.<br>Each card: `bg-white border border-gray-200/90 rounded-2xl p-4 hover:border-[#7014D9]/40 hover:shadow-sm cursor-pointer transition-all`. | `ref/zeus/0002.jpg` |

---

## 3. Step 2: Check your credits and plan (`zeus.snaarp.com/billing`)

Frames: `ref/zeus/0020.jpg`, `0030.jpg`, `0040.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Page Header** | Top of Billing view | `mb-6` | Title: "Billing & Credits" (`text-2xl font-bold text-gray-900`).<br>Subtitle: "Manage your plan and track credit usage" (`text-xs text-gray-500 mt-1`). | `ref/zeus/0020.jpg` |
| **Current Plan Card** | Full width card in container | `bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs` | Badge: "Free" (`bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-0.5 rounded-full`).<br>Metric: "Credits This Month" (`text-xs text-gray-500`), bold count "99 / 100" (`text-2xl font-bold text-gray-900 mt-1`).<br>Progress bar: green bar filling 99% (`bg-emerald-500 h-2 rounded-full w-full mt-3 bg-gray-100`).<br>Subtitle: "1 credits used • 99 remaining • Resets monthly" (`text-[11px] text-gray-400 mt-2`). | `ref/zeus/0020.jpg` |
| **How Credits Work** | 4-column cards below Current Plan | `grid grid-cols-4 gap-4 mt-6` | **Tile 1**: "Reveal contact info", subtitle "1 credit per reveal", eye icon.<br>**Tile 2**: "Export data", subtitle "1 credit per 5 rows exported", download icon.<br>**Tile 3**: "Search & filter", subtitle "Free, unlimited", search icon.<br>**Tile 4**: "Save lists", subtitle "Free, unlimited", bookmark icon.<br>Style: `bg-white border border-gray-200/80 rounded-xl p-4 text-left`. | `ref/zeus/0020.jpg` |
| **Available Plans** | 4 pricing cards in 1 row | `grid grid-cols-4 gap-5 mt-8` | **Plan 1 (Free)**: £0/mo, 50 credits/month, "Current Plan" disabled tag.<br>**Plan 2 (Basic)**: £49/mo, 500 credits/month, purple "Upgrade" button (`hover:border-[#7014D9]`).<br>**Plan 3 (Professional)**: £99/mo, 2,000 credits/month, "Upgrade" button.<br>**Plan 4 (Enterprise)**: £249/mo, 10,000 credits/month, "Upgrade" button. | `ref/zeus/0020.jpg` |

---

## 4. Step 3: Search with filters (`zeus.snaarp.com/people`)

Frames: `ref/zeus/0085.jpg`, `0100.jpg`, `0120.jpg`, `0160.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Quick Start Search** | Click "C-Suite Executives" | Transition | Button/state shows "Searching..." spinner for 1.5s, then mounts Results Table. | `ref/zeus/0080.jpg` |
| **Results Toolbar** | Above table | `flex items-center justify-between py-3 px-6 bg-white border-b border-gray-200` | Tabs: "Total 89,187,648" (bold text, active border) + "Saved 0".<br>Button: "Filters (1)" with badge.<br>Button: "Save search" (`text-xs text-gray-700 border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-50 flex items-center gap-1.5`). | `ref/zeus/0085.jpg` |
| **Filter Interactions** | In left Filters panel | Active form controls | • Keyword: type "CEO".<br>• Lists: open accordion (shows checkboxes).<br>• Email Status: select radio "Has email".<br>• Seniority: tick "C-Suite" and "VP" checkboxes (purple chips mount under group title).<br>• Department: hover item.<br>• Click "Search People": shows 1.5s "Searching..." loading state, then updates table with CEO contacts and filtered count. | `ref/zeus/0120.jpg` |
| **Results Table** | Main area | `w-full bg-white border-b border-gray-200 text-xs` | Columns: Checkbox, `NAME`, `TITLE`, `COMPANY`, `EMAIL`, `PHONE`, `LOCATION`.<br>25 rows: Initial avatars, bold contact names (e.g. Jordan Lee), job titles, company blue links, masked emails ("••••••@••••.com"), phone ("Unavailable"), location.<br>Hovering a row highlights with lilac background `#F5EEFF`/50. | `ref/zeus/0085.jpg`, `0160.jpg` |
| **Table Pager** | Bottom footer bar | `flex items-center justify-between p-4 px-6 bg-white border-t border-gray-200` | "1-25 of 89,187,648" (or filtered total), "Show 25" dropdown, Pager buttons: `Previous`, `1`, `2`, `3`, `...`, `Next`. | `ref/zeus/0085.jpg` |

---

## 5. Step 4: Save a search (`zeus.snaarp.com/people`)

Frames: `ref/zeus/0480.jpg`, `0500.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Save Search Modal** | Centered modal dialog, `w-[440px]` | `bg-white rounded-2xl p-6 shadow-2xl border border-gray-100` | Title: "Save this search" (`text-base font-bold text-gray-900`).<br>Subtitle: "Give your search a name to quickly run it again later." (`text-xs text-gray-500 mt-1`).<br>Input: placeholder "e.g. Senior Engineers in US", types "CEOs".<br>Footer: Cancel button + purple "Save" button (`bg-[#7014D9] text-white px-5 py-2 rounded-xl text-xs font-semibold`). | `ref/zeus/0480.jpg` |
| **Toast Confirmation** | Bottom center toast | `bg-gray-900 text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2` | "Search saved, \"CEOs\" saved successfully". | `ref/zeus/0490.jpg` |
| **Saved Searches Button** | Toolbar top right | `bg-[#F5EEFF] text-[#7014D9] border border-[#7014D9]/20 rounded-xl px-3 py-1.5 text-xs font-bold` | "Saved Searches (1)". Clicking opens dropdown menu with heading "YOUR SAVED SEARCHES" and row "CEOs". Clicking re-runs search. | `ref/zeus/0500.jpg` |

---

## 6. Step 5: Find an email (`zeus.snaarp.com/people`)

Frames: `ref/zeus/0052.jpg`, `0060.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Switch to Find Email** | Center toolbar | Segmented control | Click "Find Email" tab (turns dark `#111827`, text white). | `ref/zeus/0052.jpg` |
| **Email Finder Card** | Center of main area, `max-w-xl` | `bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs` | Title: "Email Finder" (`text-base font-bold text-gray-900`).<br>Subtitle: "Find anyone's email address. Enter their name and domain." (`text-xs text-gray-500 mt-1`).<br>Full Name input: placeholder "e.g. John Smith or John Michael Smith", types "Jordan Lee".<br>Domain input: placeholder "e.g. google.com", types "example.com".<br>Button: "Find Email" (turns purple `#7014D9` when both fields filled). | `ref/zeus/0052.jpg` |
| **Email Result Card** | Below form on submit | `bg-white border border-gray-200 rounded-xl p-4 mt-4 shadow-xs flex items-center justify-between` | Left: `jordan.lee@example.com` (`font-mono text-xs font-bold text-gray-900`), copy button.<br>Right: badge "1 credit used" (`text-[11px] text-gray-500 font-medium`).<br>Header credits pill updates: **99 -> 98**. Click "Database" to return. | Clean finish |

---

## 7. Step 6: Open a contact and reveal details

Frames: `ref/zeus/0180.jpg`, `0200.jpg`, `0210.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Row Click** | Click Jordan Lee row | Table row | Background darkens with modal backdrop. | `ref/zeus/0180.jpg` |
| **Contact Drawer** | Slides in from right, `w-[420px]`, full height | `bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto` | **Header**: Close button (X), Avatar circle "JL", Name "Jordan Lee" (`text-lg font-bold text-gray-900`), Title "Managing Director" (`text-xs text-gray-500`), Company "Northwind Labs" (`text-xs text-blue-600 hover:underline font-semibold`).<br>**Contact Info Card**: Heading "Contact Information", badge "1 credit".<br>• Masked email: "••••••@••••.com" with lock icon.<br>• Purple button: "Reveal Contact (1 credit)".<br>• Link: "View LinkedIn Profile" (hover only). | `ref/zeus/0180.jpg` |
| **Reveal Action** | Click "Reveal Contact" | Spinner -> Revealed | Button shows spinner "Revealing..." for 1.5s.<br>Email replaces mask with `jordan.lee@example.com` + copy icon.<br>Phone row shows "Unavailable".<br>Reveal button disappears.<br>Credits pill updates: **98 -> 97**. | `ref/zeus/0200.jpg`, `0210.jpg` |
| **Drawer Actions** | Bottom of drawer | Actions | Button: "+ Add to List" (`border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold hover:bg-gray-50`).<br>Button: "View LinkedIn" (`bg-[#0A66C2] text-white rounded-xl px-4 py-2 text-xs font-semibold`). | `ref/zeus/0200.jpg` |

---

## 8. Step 7: Create a list (`zeus.snaarp.com/lists`)

Frames: `ref/zeus/0240.jpg`, `0260.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **My Lists Panel** | Left column of Lists view, `w-[320px]` | `bg-white border-r border-gray-200/80 p-5` | Header: "My Lists" (`text-base font-bold text-gray-900`) + purple button "+ New List" (`bg-[#7014D9] text-white text-xs font-semibold px-3 py-1.5 rounded-xl`).<br>Initial row: "Tech CEO", subtitle "Static • 0 members • 09/10/2026".<br>Hovering row shows small pencil (edit) and trash (delete) icons. | `ref/zeus/0240.jpg` |
| **Create List Modal** | Centered modal, `w-[480px]` | `bg-white rounded-2xl p-6 shadow-2xl border border-gray-100` | Title: "Create New List" (`text-base font-bold text-gray-900`).<br>Input: List Name placeholder "e.g. Hot Leads Q4", types "New Leads".<br>Type Options: 2 selectable cards:<br>• "Static - Manually add members" (active: lilac border/bg).<br>• "Dynamic - Auto-updates by filters".<br>Buttons: Cancel + purple "Create List" (disabled until name typed). | `ref/zeus/0260.jpg` |
| **List Created Result** | Modal closes | Updated UI | Toast bottom right: "List created, \"New Leads\" is ready to use".<br>"New Leads" mounts at top of My Lists. | `ref/zeus/0270.jpg` |

---

## 9. Step 8: Add a contact to a list

Frames: `ref/zeus/0290.jpg`, `0310.jpg`, `0320.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Add to List Trigger** | On People view, open Jordan Lee drawer | Drawer action | Click "+ Add to List". A dropdown/menu opens with "Select a list:", option "New Leads", and Cancel button. Click "New Leads". | `ref/zeus/0290.jpg` |
| **Drawer Confirmation** | Inside drawer card | Feedback | Shows confirmation that contact was added to "New Leads". | `ref/zeus/0300.jpg` |
| **List Detail View** | Navigate to Lists -> click "New Leads" | Main content area | **Header**: "New Leads" (`text-xl font-bold text-gray-900`), subtitle "Static list • manually curated", actions: "Export CSV", "Edit", red "Delete", "Static" pill.<br>**Table**: Checkbox, `NAME`, `TITLE`, `COMPANY`, `EMAIL`, `PHONE`, `LOCATION`.<br>Row: Jordan Lee, revealed email `jordan.lee@example.com`, phone "-", remove icon at right. | `ref/zeus/0310.jpg`, `0320.jpg` |

---

## 10. Step 9: Delete a list (`zeus.snaarp.com/lists`)

Frames: `ref/zeus/0225.jpg`, `0230.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Select Tech CEO** | Click "Tech CEO" in My Lists | Content view | Header "Tech CEO", empty state: "No members in this list, Add people or companies from search results.", buttons: "Import CSV", "Edit", red "Delete". | `ref/zeus/0220.jpg` |
| **Delete List Modal** | Click "Delete" button | Centered modal, `w-[460px]` | Title: "Delete List" (`text-base font-bold text-gray-900`).<br>Message: "Are you sure you want to delete \"Tech CEO\"? This will remove all members from the list. This action cannot be undone."<br>Buttons: Cancel + red "Delete" (`bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-4 py-2 rounded-xl`). | `ref/zeus/0225.jpg` |
| **Deletion Result** | Click Delete | Transition | Button shows "Deleting..." spinner for 1s. Modal closes, "Tech CEO" is removed from My Lists, green toast confirms "List deleted", only "New Leads" remains. | `ref/zeus/0230.jpg` |

---

## 11. Step 10: Search for companies (`zeus.snaarp.com/companies`)

Frames: `ref/zeus2/0005.jpg`, `0060.jpg`, `0095.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Companies Filters** | Left column, `w-[280px]` | `bg-white border-r border-gray-200/80 p-4` | Header: "Filters" + "Clear all".<br>• Company Name: input "Search by name or domain..."<br>• Industry: input "Search industries...", tags "SaaS ×", "Technology ×", checkbox list (Technology, Healthcare, Finance, Education, Manufacturing...)<br>• Location: country list (Belarus, Belgium, Belize...)<br>• # Employees: checkboxes (1-10, 11-50, 51-200, 201-500, 501-1000...)<br>• Revenue: £0-£1M, £1M-£10M, £10M-£50M, £50M-£100M, £100M+<br>• Founded Year: input "e.g. 2015"<br>• Bottom button: "Search Companies" (`bg-[#7014D9]`). | `ref/zeus2/0005.jpg` |
| **Empty State Hero** | Center area before search | `flex flex-col items-center justify-center py-12 text-center` | Icon: circular lilac badge with building icon.<br>Title: "Discover companies" (`text-xl font-bold text-gray-900 mt-4`).<br>Subtitle: "Search millions of company profiles across industries, team sizes, and revenue."<br>Quick Start Cards: `SaaS & Tech`, `Mid-market`, `Healthcare`, `£10M-£100M Revenue`. | `ref/zeus2/0005.jpg` |
| **Results Toolbar** | Top bar above results | `h-12 border-b border-gray-200 px-6 bg-white flex items-center justify-between` | Left: "Total 175,203 results" + "Hide Filters".<br>Right: Segmented switch "Database" / "Web". | `ref/zeus2/0095.jpg` |
| **Companies Table** | Main area | `w-full bg-white border-b border-gray-200 text-xs` | Columns: Checkbox, `COMPANY`, `INDUSTRY`, `LOCATION`, `EMPLOYEES`, `REVENUE`.<br>Rows: Fictional tech companies (e.g. Brightwave Systems GmbH, Veloce Cloud AG).<br>Pager: `1 ... 4 5 6 ... 7009`. | `ref/zeus2/0095.jpg` |

---

## 12. Step 11: Open a company (`zeus.snaarp.com/companies`)

Frames: `ref/zeus2/0120.jpg`, `0130.jpg`, `0140.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Company Row Click** | Click "Brightwave Systems GmbH" | Row click | Opens company drawer from right. | `ref/zeus2/0120.jpg` |
| **Company Drawer** | Right slide-out, `w-[420px]` | `bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto` | **Header**: Circular badge "1", "Brightwave Systems GmbH", domain "www.brightwave.example", close (X) button.<br>**Details Cards**: 2x2 grid:<br>• Industry: "Technology; Information and Internet"<br>• Employees: "31"<br>• Location: "Zurich, Switzerland"<br>• Website: "https://www.brightwave.example"<br>**Actions**: "View on LinkedIn" button.<br>**People Section**: "People at Brightwave Systems GmbH":<br>• Lukas Weber - Managing Director<br>• Sophie Keller - Head of Engineering<br>• Marc Steiner - Product Lead. | `ref/zeus2/0130.jpg` |
| **Drawer Close** | Click close (X) button | Action | Drawer slides away, back to company search table. | `ref/zeus2/0145.jpg` |

---

## 13. Step 12: Rename a list (`zeus.snaarp.com/lists`)

Frames: `ref/zeus2/0160.jpg`, `0180.jpg`, `0192.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **List Detail Header** | Top of list view | `bg-white border-b border-gray-200 p-6 flex items-center justify-between` | Title: "New Leads", subtitle: "Static list • 1 member", "Edit" button, red "Delete" button. | `ref/zeus2/0160.jpg` |
| **Edit List Modal** | Centered modal, `w-[460px]` | `bg-white rounded-2xl p-6 shadow-2xl border border-gray-100` | Title: "Edit List".<br>Field: "List Name" with current value "New Leads".<br>User types "Priority Leads".<br>Buttons: Cancel, purple "Save Changes". | `ref/zeus2/0180.jpg` |
| **Rename Confirmation** | Modal closes | Updated UI | Toast: `List updated, "Priority Leads" saved successfully`.<br>My Lists row and main header update to "Priority Leads". | `ref/zeus2/0192.jpg` |

---

## 14. Step 13: Delete a list (`zeus.snaarp.com/lists` -> `/exports` -> `/people`)

Frames: `ref/zeus2/0210.jpg`, `0230.jpg`, `0245.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Delete List Trigger** | Header red "Delete" button | Action | Opens Delete List modal. | `ref/zeus2/0210.jpg` |
| **Delete List Modal** | Centered modal, `w-[460px]` | `bg-white rounded-2xl p-6 shadow-2xl border border-gray-100` | Title: "Delete List".<br>Message: "Are you sure you want to delete \"Priority Leads\"? This will remove all members from the list. This action cannot be undone."<br>Buttons: Cancel, red "Delete". | `ref/zeus2/0215.jpg` |
| **Lists Empty State** | Main & Sidebar panels | Empty state | Toast: `List deleted`.<br>Left panel: "No lists yet, Create your first list to organize your contacts."<br>Right area: "Select a list". | `ref/zeus2/0230.jpg` |
| **Exports Empty State** | Nav to Exports | `zeus.snaarp.com/exports` | Title: "Export", subtitle: "Export contacts from your saved lists. You'll get an email when it's ready."<br>Card: "1. Select a list to export... No lists yet. Add contacts to a list first." | `ref/zeus2/0245.jpg` |
| **Return to People** | Sidebar click People | Navigation | Navigates back to `zeus.snaarp.com/people`. | `ref/zeus2/0255.jpg` |

---

## 15. Step 14: Build your CEO lead list (`zeus.snaarp.com/people` -> `/lists` -> `/people`)

Frames: `ref/zeus2/0270.jpg`, `0310.jpg`, `0360.jpg`, `0400.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **First Lead Reveal** | People table -> Elena Marsh | Action | Click Elena Marsh row -> Drawer opens -> Click "Reveal Contact (1 credit)" -> Spinner 1.2s -> Email `elena.marsh@example.com` revealed. Credits: 97 -> 96. | `ref/zeus2/0270.jpg` |
| **Add to List (No Lists)** | In Elena Marsh drawer | Drawer action | Click "+ Add to List" -> Popover shows "No lists yet. Create one in the Lists page first." -> Click Cancel. | `ref/zeus2/0285.jpg` |
| **Create CEO List** | Nav to Lists | `zeus.snaarp.com/lists` | Click "+ New List" -> Modal opens -> Types "CEO" -> Selects Static -> Click "Create List" -> Toast: `List created, "CEO" is ready to use`. | `ref/zeus2/0310.jpg` |
| **Add Elena to CEO** | Back to People | `zeus.snaarp.com/people` | Click Elena Marsh row -> Click "+ Add to List" -> Select "CEO" -> Toast: `Added to list, Elena Marsh was added successfully`. | `ref/zeus2/0350.jpg` |
| **Second Lead Reveal** | People table -> Ravi Menon | Action | Click Ravi Menon row -> Drawer opens -> Click "Reveal Contact (1 credit)" -> Spinner 1.2s -> Email `ravi.menon@example.com` revealed. Credits: 96 -> 95. | `ref/zeus2/0380.jpg` |
| **Add Ravi to CEO** | In Ravi Menon drawer | Drawer action | Click "+ Add to List" -> Select "CEO" -> Toast: `Added to list, Ravi Menon was added successfully` -> Close drawer. | `ref/zeus2/0400.jpg` |

---

## 16. Step 15: Export a list (`zeus.snaarp.com/exports`)

Frames: `ref/zeus2/0440.jpg`, `0450.jpg`, `0465.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Select List Card** | Card 1 | `bg-white border border-gray-200 rounded-2xl p-6` | Heading: "1. Select a list to export".<br>List card: "CEO" (Static • 2 members). Click selects list with purple border `#7014D9`. | `ref/zeus2/0440.jpg` |
| **Export Action Card** | Card 2 | `bg-white border border-gray-200 rounded-2xl p-6 mt-6` | Heading: "2. Export".<br>Stats: 2 Total, 2 Revealed (green pill), 0 Unrevealed (lilac pill).<br>Button: purple "Export revealed only (free)". | `ref/zeus2/0450.jpg` |
| **Export Started** | Click button | Transition | Alert banner: "Export started. You will receive an email when it is ready."<br>Toast: `Export started, You'll be notified when it's ready to download.`. | `ref/zeus2/0455.jpg` |
| **Recent Exports & Download** | Card 3 | `bg-white border border-gray-200 rounded-2xl p-6 mt-6` | Heading: "Recent Exports".<br>Row: "CEO", 2 contacts exported, date, "Download" button.<br>Click "Download" shows in-app toast `Download started` (avoiding video 404). | `ref/zeus2/0465.jpg` |

---

## 17. Step 16: Create an API key (`zeus.snaarp.com/integrations`)

Frames: `ref/zeus2/0480.jpg`, `0490.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **API Keys Header** | Top of Integrations view | `bg-white border border-gray-200 rounded-2xl p-6` | Title: "API Keys", subtitle: "Use API keys to authenticate requests from your applications."<br>Button: "+ Create Key". | `ref/zeus2/0480.jpg` |
| **Create Key Form** | Expandable card or modal | Form controls | Field: "Key Name" (placeholder "e.g. Zeus Production").<br>Types: "Zeus Production".<br>Button: purple "Create". | `ref/zeus2/0485.jpg` |
| **Active Key Row** | Card content | UI state | Row: Name "Zeus Production", masked key `zk_sample_••••••••`, copy button, "Created 10/11/2026", green badge "Active".<br>Toast: `API key created, "Zeus Production" is ready to use`. | `ref/zeus2/0490.jpg` |
| **How to set up** | Bottom of page | 4 numbered steps | 1. Create an API key above to authenticate your requests.<br>2. Add a webhook endpoint URL from your application or CRM.<br>3. Select which events should trigger webhook notifications.<br>4. Test your integration and start receiving real-time lead updates. | `ref/zeus2/0495.jpg` |

---

## 18. Step 17: Add a webhook (`zeus.snaarp.com/integrations`)

Frames: `ref/zeus2/0500.jpg`, `0515.jpg`, `0525.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Webhooks Section** | Below API Keys | `bg-white border border-gray-200 rounded-2xl p-6 mt-6` | Title: "Webhooks", subtitle: "Receive real-time notifications when leads are revealed or lists update."<br>Button: "+ Add Webhook". | `ref/zeus2/0500.jpg` |
| **Webhook Form** | Expands inside card | Form controls | • Name: types "Acme CRM"<br>• Endpoint URL: types "https://example.com/webhooks/zeus"<br>• Trigger Events: checkboxes "Contact Revealed" (checked), "Contact Exported", "Added to List" (checked)<br>Buttons: Cancel, purple "Create Webhook". | `ref/zeus2/0510.jpg` |
| **Configured Webhook** | Card content | UI state | Row: Name "Acme CRM", URL `https://example.com/webhooks/zeus`, tags "Contact Revealed", "Added to List", green badge "Active".<br>Toast: `Webhook created, "Acme CRM" is active`. | `ref/zeus2/0520.jpg` |
| **Completion Card** | Tour concludes | Final card | "Tour complete", Replay tour, Back to Snaarp. | `ref/zeus2/0525.jpg` |

---

## 19. Step 18: Update your profile (`zeus.snaarp.com/settings`)

Frames: `ref/zeus3/frame_0001.png`, `frame_0006.png`, `frame_0012.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Settings Header** | Centered in main view, `w-full max-w-2xl` | `text-2xl font-bold text-gray-900 text-center mb-4` | Title "Settings". | `ref/zeus3/frame_0001.png` |
| **Tab Bar** | Centered in container | `bg-gray-100/90 p-1 rounded-2xl flex items-center mb-6` | 4 tabs: "Profile" (active: `bg-white text-gray-900 shadow-xs font-semibold rounded-xl py-2 px-6`), "Security", "Notifications", "Account". | `ref/zeus3/frame_0001.png` |
| **Profile Card** | Centered in container | `bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4` | Heading: "Profile" (`text-sm font-semibold text-gray-900`). | `ref/zeus3/frame_0001.png` |
| **First & Last Name** | 2-column grid | Text inputs with rounded-xl border border-gray-200 | First Name: "Jane" (read/write).<br>Last Name: "Doe" (read/write). | `ref/zeus3/frame_0001.png` |
| **Email (read-only)** | Full width row | `bg-gray-50/80 border border-gray-200 text-gray-500 rounded-xl px-3.5 py-2 text-xs` | Label: "Email (read-only)".<br>Value: "jane@example.com". Disabled/read-only. Highlighted with explanation that it cannot be edited. | `ref/zeus3/frame_0001.png` |
| **Phone** | Full width row | `border border-gray-200 text-gray-800 rounded-xl px-3.5 py-2 text-xs` | Placeholder: "+44 7700 900123".<br>Action: Click and types "+44 7700 900456". | `ref/zeus3/frame_0001.png` |
| **Photo** | Flex row | Avatar + pill button | Circle avatar: lilac `bg-[#EDE9FE] text-[#7014D9] font-bold text-sm w-10 h-10` with letter "J".<br>Button: "Change photo" (`border border-gray-200 rounded-full px-3.5 py-1.5 text-xs text-gray-700 bg-white hover:bg-gray-50`). Cursor hovers. | `ref/zeus3/frame_0001.png` |
| **Save Profile** | Bottom left of card | Purple button | Button: "Save Profile" (`bg-[#7014D9] hover:bg-[#5B0FB3] text-white text-xs font-semibold px-5 py-2 rounded-xl`). Click -> 1s spinner -> Bottom-right pale green toast: `Profile updated`. | `ref/zeus3/frame_0001.png` |

---

## 20. Step 19: Change your password (`zeus.snaarp.com/settings`)

Frames: `ref/zeus3/frame_0015.png`, `frame_0020.png`, `frame_0028.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Security Tab** | Tab bar | Active pill | Click "Security" tab. "Security" becomes active white pill. | `ref/zeus3/frame_0015.png` |
| **Change Password Card** | Top card of Security view | `bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4` | Heading: "Change Password" (`text-sm font-semibold text-gray-900`). | `ref/zeus3/frame_0015.png` |
| **Current Password** | Form field with eye icon | Relative input container | Click -> Type "SamplePass#1" (shows bullets).<br>Click eye icon -> toggles text visible -> click eye icon -> hides text. | `ref/zeus3/frame_0015.png` |
| **New Password** | Form field with eye icon | Placeholder "Minimum 8 characters" | Click -> Type "SamplePass#2026" (shows bullets). | `ref/zeus3/frame_0015.png` |
| **Confirm New Password** | Form field with eye icon | Relative input container | Click -> Type "SamplePass#2026" (shows bullets). | `ref/zeus3/frame_0015.png` |
| **Change Password Action** | Bottom of card | Purple button | Click "Change Password" -> 1s saving spinner -> Fields reset -> Bottom-right pale green toast: `Password changed`. | `ref/zeus3/frame_0015.png` |
| **2FA Card (Preview)** | Below Change Password card | White card | "Two-Factor Authentication", "Two-factor authentication is disabled", purple "Enable" button. | `ref/zeus3/frame_0015.png` |

---

## 21. Step 20: Turn on two-factor authentication (`zeus.snaarp.com/settings`)

Frames: `ref/zeus3/frame_0030.png`, `frame_0035.png`, `frame_0042.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **2FA Card Header** | Top of 2FA card | `flex items-center justify-between` | Left: "Two-Factor Authentication", "Two-factor authentication is disabled", subtitle "Use an authenticator app (Google Authenticator, Authy, 1Password, etc.) to protect your account with a time-based code."<br>Right: purple "Enable" button. | `ref/zeus3/frame_0030.png` |
| **Enable 2FA Click** | Action on Enable button | Transition | Click "Enable" -> Button shows "Starting..." -> Card expands with divider and setup instructions. | `ref/zeus3/frame_0035.png` |
| **QR Code & Setup Key** | Left column of setup | 140x140px rounded box | Generic clean SVG QR pattern in bordered card.<br>Right: "1. Scan the QR code", instructions, "Setup key": `SAMPLEKEY2ZEUS4DEMO0001` in grey rounded box. | `ref/zeus3/frame_0035.png` |
| **Enter Code Field** | Bottom section | Label + input | Label: "2. Enter the 6-digit code".<br>Input: placeholder "123456", w-56, rounded-xl border border-gray-200. Click -> types "123456". | `ref/zeus3/frame_0035.png` |
| **Verify & Enable** | Action buttons | Purple + grey buttons | Click "Verify & Enable" -> 1s verification -> Card updates to "Two-factor authentication is enabled", button becomes grey "Disable" button, Bottom-right green toast: `Two-factor authentication enabled`. | `ref/zeus3/frame_0035.png` |

---

## 22. Step 21: Set your notifications (`zeus.snaarp.com/settings`)

Frames: `ref/zeus3/frame_0046.png`, `frame_0050.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Notifications Tab** | Tab bar | Active pill | Click "Notifications" tab. Becomes active white pill. | `ref/zeus3/frame_0046.png` |
| **Notifications Card** | Centered container | `bg-white border border-gray-100 rounded-2xl p-6 shadow-xs` | Heading: "Notifications" (`text-sm font-semibold text-gray-900 mb-3`). | `ref/zeus3/frame_0046.png` |
| **Email Notifications** | Row 1 | Bordered container with toggle | "Email Notifications" / "Receive updates via email". Toggle ON (purple). Remains on. | `ref/zeus3/frame_0046.png` |
| **Push Notifications** | Row 2 | Bordered container with toggle | "Push Notifications" / "Browser and mobile push alerts". Initial toggle ON (purple).<br>Action: Click toggle -> turns OFF (grey). | `ref/zeus3/frame_0046.png` |
| **SMS Notifications** | Row 3 | Bordered container with toggle | "SMS Notifications" / "Text message alerts". Initial toggle OFF (grey).<br>Action: Click toggle -> turns ON (purple). | `ref/zeus3/frame_0046.png` |
| **Save Preferences** | Bottom of card | Purple button | Click "Save Preferences" -> 1s spinner -> Bottom-right green toast: `Preferences saved`. | `ref/zeus3/frame_0046.png` |

---

## 23. Step 22: Stay signed in on this device (`zeus.snaarp.com/settings`)

Frames: `ref/zeus3/frame_0052.png`, `frame_0058.png`, `frame_0060.png`, `frame_0064.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Account Tab** | Tab bar | Active pill | Click "Account" tab. Becomes active white pill. | `ref/zeus3/frame_0052.png` |
| **Account Card** | Centered container | `bg-white border border-gray-100 rounded-2xl p-6 shadow-xs` | Heading: "Account" (`text-sm font-semibold text-gray-900 mb-1`).<br>"Signed in as" (`text-[11px] text-gray-500`), "jane@example.com" (`text-xs font-semibold text-gray-800 mb-4`). | `ref/zeus3/frame_0052.png` |
| **Remember me Row** | Bordered box in card | `border border-gray-200 rounded-xl p-4 flex items-center justify-between` | "Remember me" / "Keep me signed in on this device between sessions". Toggle initial OFF. | `ref/zeus3/frame_0052.png` |
| **Toggle ON Action** | Click toggle | UI transition & toast | Toggle turns purple `#7014D9`.<br>Bottom-right toast 1 appears: `You'll stay signed in on this device.` (green check, pale green card `#DCFCE7`). | `ref/zeus3/frame_0058.png` |
| **Toggle OFF Action** | Click toggle again | UI transition & stacked toast | Toggle turns grey `#E5E7EB`.<br>Bottom-right toast 2 appears stacked: `You'll be asked to sign in again after your session ends.`. | `ref/zeus3/frame_0060.png` |
| **Completion Card** | Tour concludes | Completion modal | "Tour complete", "You're all set", Replay, Back to Snaarp. | Frame 67 |

---

---
