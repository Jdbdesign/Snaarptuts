# UI-MATCH-ME.md — Snaarp Me UI Specifications & Frame Reference

Reference Video: `C:\Users\HP\Downloads\1110 (1).mp4` (1430x720, 5:08 duration)
Extracted Frames: `ref/me/%03d.png` (309 frames at 1 fps)

---

## 1. Global Shell & Palette

| Element | Specification / Token | Frame Reference |
|---|---|---|
| **Design Canvas** | 1440px design width, scaled to container; `#FFFFFF` / `#F9FAFB` bg | `ref/me/005.png` |
| **Typography** | Font Family: Poppins, sans-serif. Weights: 400, 500, 600, 700 | Global |
| **Primary Brand Purple** | `#7014D9` (accent, buttons, active nav, focus rings) | `ref/me/005.png` |
| **Active Nav Background** | `#F5EEFF` (subtle lilac rounded pill) | `ref/me/005.png` |
| **Active Nav Text** | `#7014D9` (bold purple text & icon) | `ref/me/005.png` |
| **Text Primary** | `#111827` (almost black headings & labels) | Global |
| **Text Muted / Grey** | `#6B7280` / `#9CA3AF` (subtitles, secondary info) | Global |
| **Borders** | `#E5E7EB` / `#F3F4F6` (subtle light grey dividers) | Global |
| **Card Background** | `#FFFFFF` with `1px solid #E5E7EB` and rounded corners `rounded-2xl` / `rounded-xl` | Global |
| **Suite Rail (Far Left)** | Width: 60px; `#FFFFFF` or `#F9FAFB`; border-r `#E5E7EB`; icons: Hamburger, Mail, Meets, Teams, One Cardx, Sheets, Docs, Slides, Logout | `ref/me/005.png` |
| **Sidebar (Navigation)** | Width: 220px; `#FFFFFF`; border-r `#E5E7EB`; Logo: purple rounded square `#7014D9` with white calendar/bag mark + bold "Snaarp Me"; items: Home, Event Type, Availability, Calendar, Meetings, Workflows, Contacts, Analytics, Integrations; bottom: Report a Bug `#EF4444` | `ref/me/005.png` |
| **Content Header** | Height: 70px; border-b `#E5E7EB`; Left card: "YOUR TEAM" (small caps 10px `#9CA3AF`) over "Product Team · Owner"; Right: 4-squares app icon, avatar "JD", "Jane Doe" / "Product Team · Owner", chevron | `ref/me/005.png` |

---

## 2. Screen 1: Home Dashboard (`snaarp.me/dashboard`)

Frames: `ref/me/005.png`, `010.png`

| Section / Element | Specification |
|---|---|
| **Welcome Banner** | White card `rounded-2xl`, border `#E5E7EB`, p-6. Heading "Welcome back, Jane" (`text-2xl font-bold #111827`), subtitle "Here's what's happening with your schedule today." (`text-sm text-gray-500`). Right: `+ New Event` pill button (`bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium`). |
| **Today's Schedule** | Heading "Today's Schedule" (`text-lg font-bold`), right link "View calendar ->" (`text-sm text-[#7014D9] font-medium`). Card: `rounded-2xl border border-gray-200 bg-white p-4 flex items-center justify-between`. Left vertical accent bar `w-1.5 h-10 bg-[#7014D9] rounded-full`. Time: "11:30 AM" (`font-bold text-base`) / "12:00 PM" (`text-xs text-gray-400`). Center: "Sam Taylor" (`font-semibold text-gray-900`) / "Standup Meeting with developers · 30 min" (`text-xs text-gray-500`). Right: "Confirmed" (`text-sm text-gray-500 flex items-center gap-1`). |
| **4 Stat Cards** | 4-column grid. Each card `rounded-2xl border border-gray-200 bg-white p-4 flex items-center gap-4`. <br>1. Calendar icon in lilac square `#F5EEFF`, "1", "Bookings This Week". <br>2. Clock icon in mint square `#DCFCE7`, "1", "Upcoming". <br>3. Check circle in lilac square `#F5EEFF`, "0", "Completed This Week". <br>4. Upward trend arrow in yellow square `#FEF3C7`, "0.0%", "Cancellation Rate". |
| **Upcoming Bookings** | Heading "Upcoming Bookings" (`text-base font-bold`). Card with left purple bar, "Sam Taylor", "Standup Meeting with developers · 30 min", "Today, 11:30 AM - 12:00 PM", right pill button "View ->". |
| **Recent Activity** | Right card `rounded-2xl border border-gray-200 bg-white p-4 w-[320px] shrink-0`. Heading "Recent Activity" (`text-sm font-bold`). Scrollable list: <br>- Item 1: green calendar icon, "New booking — Sam Taylor booked Standup Meeting with developers", "Just now" <br>- Item 2: green calendar icon, "New booking — Casey Brown booked 30 Minute Meeting", "48d ago" <br>- Item 3: amber reload icon, "Rescheduled — Casey Brown booked 30 Minute Meeting", "49d ago". |

---

## 3. Screen 2: Booking Details Modal

Frames: `ref/me/015.png`, `020.png`

| Element | Specification |
|---|---|
| **Modal Overlay** | `fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4` |
| **Dialog Card** | `bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative border border-gray-100` |
| **Header** | Title "Standup Meeting with developers" (`text-xl font-bold`), subtitle "with Sam Taylor" (`text-sm text-gray-500`). Top right: Status badge "Confirmed" (`bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium`) and Close `X` icon. |
| **Body (2 columns)** | **Left column ("Meeting")**: <br>- "EVENT TYPE" / "Standup Meeting with developers" <br>- "DATE & TIME" / "Tuesday, November 10, 2026 at 11:30 AM" <br>- "DURATION" / "30 minutes" <br>- "LOCATION" / "Snaarp Meet" with link `https://meet.snaarp.com/meet/abc-defg-hij` and "Copy" pill button <br>- "SOURCE" / "Direct" <br>- "CREATED" / "Nov 10, 2026, 2:48 AM" <br>- Divider line <br>- "SNAARP MEET" section: Purple pill button "Join meeting" (`bg-[#7014D9] text-white`) and link with "Copy" button. <br>**Right column ("Invitee")**: <br>- Avatar circle "S", "Sam Taylor", "sam.taylor@example.com" (purple) <br>- "TIMEZONE" / "Africa/Lagos". |
| **Footer** | Right-aligned "Close" pill button (`border border-gray-200 px-5 py-2 rounded-full text-sm hover:bg-gray-50`). |

---

## 4. Screen 3: Calendar View (`snaarp.me/calendar`)

Frame: `ref/me/025.png`

| Section / Element | Specification |
|---|---|
| **Page Header** | Heading "Calendar" (`text-2xl font-bold`), subtitle "Schedule personal events, and view bookings, connected calendars, and Snaarp Meet meetings". |
| **Filter Pills** | Pill badges with dot: "• Snaarp Me" (purple dot, rounded-full border), "• Snaarp Meet" (blue dot, rounded-full border). |
| **Controls Row** | Left: `<` `>` arrows, `Today` button, month title `November 2026` (`text-lg font-bold`). Right: view toggles `Month` (active purple), `Week`, `Day`. Below: purple button `Schedule event` and pill button `Connect Calendar`. |
| **Calendar Grid** | 7 columns: SUN, MON, TUE, WED, THU, FRI, SAT. Days 1 through 30. Day 10 is highlighted with purple circle `10`, containing event badge `• Standu...`. |
| **Right Sidebar** | **Upcoming section**: Heading "Upcoming" with purple count badge `1`. Card: left purple border, "Standup Meeting with developers", avatar "ST", "Sam Taylor", "Today · 11:30 AM - 12:00 PM". <br>**Calendar Integrations card**: "Sync your other calendars to see everything in one place. Only Snaarp Me bookings appear until you connect." List: Snaarp Meet (Connected / Disconnect), Google Calendar (Not connected / Connect), Outlook Calendar (Not connected / Connect). |

---

## 5. Screen 4: Meeting Detail Page (`snaarp.me/bookings/<id>`)

Frame: `ref/me/038.png`

| Element | Specification |
|---|---|
| **Back Link** | `< Back to Bookings` (`text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1`). |
| **Header** | Title "Standup Meeting with developers" (`text-2xl font-bold`), subtitle "with Sam Taylor" (`text-sm text-gray-500`), status badge "Confirmed" (`bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium`). |
| **Body (2 cards)** | **Meeting Card** (left 65% width): Same structured fields as modal (Event Type, Date & Time, Duration, Location with Copy button, Source, Created, Snaarp Meet Join button & link). <br>**Invitee Card** (right 35% width): Avatar, Name, Email (purple), Timezone. |

---

## 6. Screen 5: Create Event Type Stepper Modal

Frames: `ref/me/050.png`, `086.png`, `090.png`, `098.png`, `105.png`

| Stepper Step | Specification |
|---|---|
| **Modal Container** | `fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4`. Modal card `bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative`. |
| **Stepper Bar** | 3 steps connected by lines: <br>1. `Basic Info` (active purple circle `1` or completed green circle `✓`) <br>2. `Schedule` (purple circle `2` or completed green circle `✓`) <br>3. `Advanced` (purple circle `3`). |
| **Step 1: Basic Information** | - "Title *" input, placeholder "e.g., 30 Minute Meeting". Types `Creative meeting with the Team`. <br>- "Description" textarea, placeholder "Describe what this meeting is about...". Types `Learn how to plan your week with Snaarp Me`. <br>- "Duration (minutes)" chips: `15 min`, `30 min`, `45 min`, `60 min`, `90 min`, `120 min`. Clicks `45 min`, then clicks `30 min`. <br>- Footer: "Cancel" link + "Next" purple button. |
| **Step 2: Schedule & Availability** | - "Schedule *" select dropdown (`Open Days`). Helper: "Select the availability schedule for this event type". <br>- "Buffer Before (minutes)" (`0`) & "Buffer After (minutes)" (`0`). <br>- "Minimum Notice (hours)" (`4`) & "Max Booking Days" (`60`). <br>- "Daily Limit" (placeholder "No limit") & "Weekly Limit" (placeholder "No limit"). <br>- "Max Attendees" spinner (`1`). User increments to `2`. Helper: "For group events". <br>- Footer: "Back" + "Cancel" + "Next". |
| **Step 3: Advanced** | - "Color" swatch `#2563eb` with hex input `#2563eb`. <br>- "Secret Event" toggle switch (off/on). Helper: "Only accessible via direct link, not shown on your public page". Clicks on then off. <br>- "Internal Event" toggle switch (off/on). Helper: "Only available to members of your organization". Clicks on then off. <br>- "Custom Redirect URL" placeholder `https://example.com/thank-you`. <br>- Footer: "Back" + "Cancel" + "Create Event Type" purple button. |
| **Success Banner** | Light green banner on Home: `Event type created successfully.` (`bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3`). |

---

## 7. Screen 6: Event Types Scheduling List (`snaarp.me/event-types`)

Frames: `ref/me/120.png`, `180.png`

| Section / Element | Specification |
|---|---|
| **Header** | Title "Scheduling" (`text-2xl font-bold`), subtitle "Create and manage the types of events people can book with you". Right: `+ New Event Type` purple pill button. |
| **Event Cards** | Stack of cards with `border border-gray-200 rounded-2xl bg-white p-5 flex items-center justify-between hover:shadow-sm`. <br>Left side: <br>- Blue rounded square icon with calendar graphic <br>- Title "Creative meeting with the Team" (bold text-lg) <br>- Subtitle description <br>- Badges: `30 min` (clock icon), `Snaarp Meet` (camera icon), `Active` (green pill badge) <br>- URL link: `https://snaarp.me/jane/creative-meeting-with-the-team` <br>Right side controls: <br>- Toggle switch (purple on) <br>- Link icon (hover tooltip "Copy link"; clicking changes to checkmark and shows top toast banner "Booking link copied to clipboard!") <br>- Trash icon (delete) |
| **Existing Cards** | 2. "Standup Meeting with developers" <br>3. "30 Minute Meeting" |

---

## 8. Screen 7: Edit Event Type Drawer & Preview Panel

Frames: `ref/me/120.png`, `140.png`, `160.png`

| Section | Specification |
|---|---|
| **Drawer Layout** | Fixed right drawer `w-[560px] bg-white h-full border-l border-gray-200 shadow-2xl flex flex-col z-40`. |
| **Header** | Blue calendar tile, "EDIT EVENT TYPE" (small uppercase), "Creative meeting with the Team" (bold text-xl), subtitle "Step 1 of 3 · Basic Info", close `X` button. |
| **Tabs** | 3 tabs: `Basic Info`, `Schedule`, `Advanced`. Active tab has purple text & purple underline. |
| **Tab 1: Basic Info** | Event details heading, Title input, Description textarea, Duration chips, Location selector (`Snaarp Meet`). |
| **Tab 2: Schedule** | Buffer time before/after, Booking window (Minimum notice, Max booking days), Booking limits (Daily limit, Weekly limit, Max attendees). |
| **Tab 3: Advanced** | Secret Event toggle, Internal Event toggle, Custom redirect URL, Intake questions section with "Add question" button and empty state card. |
| **Preview Panel** | Slides in from the left of the drawer (`w-[380px] bg-white border border-gray-200 rounded-2xl shadow-xl p-5`). <br>- Header: "PREVIEW" (small uppercase), "Booking page", "How invitees see this event type", close `X`. <br>- Mini calendar picker (November 2026). Day 10 / 11. <br>- Available times list: `1:30 PM`, `2:00 PM`, `2:30 PM`, `3:00 PM`, `3:30 PM` (active lilac). <br>- Footer: "Status: Active" green badge. |
| **Drawer Footer** | `Preview` button (eye icon), `Back` button, `Cancel` button, `Save changes` purple button (`bg-[#7014D9] text-white`). |
| **Update Banner** | Top green banner: `Event type updated successfully.`. |

---

## 9. Screen 8: Public Booking Page (`snaarp.me/jane/creative-meeting-with-the-team`)

Frames: `ref/me/210.png`, `216.png`, `225.png`, `250.png`, `274.png`, `280.png`

| View State | Specification |
|---|---|
| **Full Page Wrapper** | **NO APP SHELL**. Background `#F3F4F6`. Centered large container `max-w-4xl w-full bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden my-12 flex min-h-[580px]`. |
| **Left Info Panel** | Width: 38% (`w-[360px] border-r border-gray-200 flex flex-col justify-between`). <br>- **Top Gradient Header**: `bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-white p-6 rounded-tl-3xl`. <br>  - Round avatar "JD" + "Jane" (video: yinkas) <br>  - Title "Creative meeting with the Team" (`text-2xl font-bold`) <br>  - Chips: `30m` (clock), `Snaarp Meet` (camera) <br>- **Bottom Details Body** (p-6): <br>  - Date & Time (if selected): `Wednesday, November 11 at 11:30 AM GMT+1` (calendar icon) <br>  - Timezone: `Africa/Lagos` (globe icon) <br>  - Greeting: "Hi there! 👋" <br>  - Description: "Learn how to plan your week with Snaarp Me" <br>  - "See you soon!" <br>  - "— Jane" <br>  - (On enter details view): `< Change time` link at bottom. |
| **State A: Select Date & Time** | - Right section: p-8. <br>- Heading "Select a date & time" (`text-xl font-bold`). <br>- Timezone dropdown: globe icon `Lagos (GMT+1)` with chevron. <br>- Month header: `<` `November 2026` `>`. Days header: `MON TUE WED THU FRI SAT SUN`. Days grid: Day 11 is selected with purple rounded box. <br>- Available times column on the right: "Wednesday, November 11", "31 time slots available", list of slots (`09:00`, `09:15`, ..., `11:30`). Clicking `11:30` advances to Enter Details form. |
| **State B: Enter Details Form** | - Heading "ENTER DETAILS" (small uppercase `text-xs text-gray-400 font-semibold tracking-wider`). <br>- "Name *" input: types `John Smith`. <br>- "Email *" input: types `john@example.com`. <br>- "GUESTS": `+ Add guests` button. Clicking reveals guest input. Types `guest@example.com`, clicks `Add`. Shows tag `guest@example.com ×`. <br>- "ADDITIONAL NOTES": textarea. Types `I can't wait to come and learn how you organized the team professionally`. <br>- Legal note: "By proceeding, you confirm that you have read and agree to Snaarp Me's Invitee Terms and Privacy Notice." <br>- Purple button: `Schedule Event` (`bg-[#7014D9] text-white w-full py-3 rounded-xl font-medium`). |
| **State C: Scheduled Confirmation** | - Left panel: Gradient header with check circle "✓", "Jane", "You are scheduled!", chips `30 min` & `Snaarp Meet`. Body: "Hi there! 👋", "A calendar invitation has been sent to your email address.", "See you soon!", "— Jane". <br>- Right panel: <br>  - Purple checkmark, "Creative meeting with the Team", "Wednesday, November 11, 2026 at 11:30 AM GMT+1". <br>  - Section "Booking Details": Date & Time range, Duration `30 min`, Organizer `Jane`, Invitee `John Smith` / `john@example.com`, Guests `guest@example.com`, Venue `https://meet.snaarp.com/meet/abc-defg-hij`, Status `Confirmed`. <br>  - "Add to calendar" section: 3 buttons (`Google Calendar`, `Outlook`, `Download .ics`). Hovering shows active state. <br>  - Bottom button: `Book a new time` (`bg-[#F3E8FF] text-[#7014D9] w-full py-3 rounded-xl font-medium hover:bg-[#E9D5FF]`). |

---

## 10. Screen 9: Home Dashboard After Booking

Frame: `ref/me/300.png`

| Element | Specification |
|---|---|
| **Stat Cards** | - "Bookings This Week": **2** (was 1) <br>- "Upcoming": **2** (was 1) <br>- "Completed This Week": **0** <br>- "Cancellation Rate": **0.0%** |
| **Upcoming Bookings** | Two cards in stack: <br>1. "John Smith", "Creative meeting with the Team · 30 min", "Tomorrow, 11:30 AM - 12:00 PM", button "View ->" <br>2. "Sam Taylor", "Standup Meeting with developers · 30 min", "Today, 11:30 AM - 12:00 PM", button "View ->" |
| **Recent Activity** | New row at the top: <br>- Green calendar icon <br>- "New booking — John Smith booked Creative meeting with the Team" <br>- Timestamp: "Just now" <br>Followed by Sam Taylor (Just now) and older rows. |
| **Completion Card** | Displayed upon completing Step 6: standard tutorial celebration card with summary of Snaarp Me features explored. |
