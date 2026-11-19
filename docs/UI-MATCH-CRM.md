# UI Match: Snaarp CRM

Design lock and side-by-side audit notes for Snaarp CRM:
- Part 1 (steps 1–6): `C:\Users\HP\Downloads\1119.mp4` (1444x720, 3:25).
- Part 2 (steps 7–12): `C:\Users\HP\Downloads\1119(1).mp4` (1444x720, 4:37).

---

## Step 1: CRM overview and navigation (0:00–0:15)

URL: `crm.snaarp.com/home`
Route: `/tutorials/crm`
View: CRM Home Dashboard

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Suite Rail** | Leftmost column | 56px wide, 100% height | Bg: `#FFFFFF`, border-r: `#ECECF1` | Logos: Mail, Meets, Teams, One Cardx, Sheets, Docs, Slides, PDF, Lock, Sign, Drive, Logout. CRM active at top | CRM icon highlighted with `#7C3AED` accent |
| **Top Bar** | Top horizontal header | 56px height, full width | Bg: `#FFFFFF`, border-b: `#ECECF1` | Left: Menu button, CRM logo + "CRM" (`#111111`, bold 16px). Center: search input. Right: Add Users, Alerts (badge 8), 9-dot grid, User avatar | Search placeholder: "Search contacts..." |
| **CRM Sidebar** | Left column next to suite rail | 240px wide, flex col | Bg: `#FFFFFF`, border-r: `#ECECF1` | Home, Dashboards, CRM > Sales (Prospects, Forecasts, Won, Lost), Activities, Calls, Contacts, Messages, Automations, MANAGE > Analytics, Reports, My Requests, Settings, Report a Bug, Admin Panel | `Home` active: `#F3ECFC` bg, purple text & icon |
| **Page Header** | Top of main dashboard | Pinned top, p-6 | Text: `#111111` & `#6B7280` | Heading: "Dashboard" (bold 22px), Subtitle: "Your CRM at a glance" (13px) | Default |
| **Metric Cards Grid** | Main content area | 4 columns grid, gap-5 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | 4 cards: CONTACTS (59 / Total contacts), DEALS (32 / Active deals), EMAILS (0 / Sent this month), TASKS (0 / Due today) | Static metric overview |

---

## Step 2: Explore CRM dashboards (0:15–0:30)

URL: `crm.snaarp.com/dashboards`
View: CRM Dashboards Section (`My Dashboard` active)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Dashboards Subnav** | Column between sidebar and content | 220px wide | Bg: `#FFFFFF`, border-r: `#ECECF1` | Header: `<< Dashboards` with `+` button. List: `PR sales` (0 widgets), `My Dashboard` (8 widgets) with trash icons | `My Dashboard` selected: `#F3ECFC` bg, purple text |
| **Dashboard Header** | Top of content area | Flex row justify-between | Heading `#111111`, buttons | "My Dashboard" (bold 20px), "8 widgets · Last updated 8/7/2026" (12px). Actions: `TV Mode`, `Share`, `Edit` (purple pill) | View mode |
| **KPI Card Widget** | Top row left | Col span 1 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `KPI CARD` (11px gray), Value: `25` (bold 28px), Label: `KPI Card` | Displaying 25 |
| **Bar Chart Widget** | Top row right | Col span 2 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `BAR CHART`. Horizontal purple bars: `Event_leads` (15), `Lead` (6) | Displaying bars |
| **Donut Chart Widget** | Second row left | Col span 1 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `DONUT CHART`. Center count: `25`. Legend on right: Event_leads (15), Lead (6), New (2), Proposal (2) | Donut slices matching legend |
| **Line Chart Widget** | Second row right | Col span 2 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `LINE CHART`. Smooth downward slope curve from 15 to 2 | Curve rendered |
| **Pie Chart Widget** | Third row left | Col span 1 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `PIE CHART`. Slices breakdown + legend: Event_leads (15), Lead (6), New (2), Proposal (2) | Pie chart rendered |
| **Funnel Widget** | Third row right | Col span 2 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `FUNNEL`. 4 horizontal gradient bars: event_leads (15), lead (6), new (2), proposal (2) | Funnel bars |
| **Heatmap Widget** | Fourth row full width | Full width | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `HEATMAP`. Days: Sun–Sat. Hours: 0h to 21h grid blocks with intensity shades | Grid rendered |
| **Table Widget** | Scrollable below | Full width | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `TABLE`. Columns: STATUS, VALUE. Rows: Event_leads (15), Lead (6) | Table rows |

---

## Step 3: Create a custom dashboard (0:30–0:48)

URL: `crm.snaarp.com/dashboards`
View: New Dashboard Modal & Empty State

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Create Button (`+`)** | Dashboards subnav header right | 28x28px circular/square | Text `#6B7280`, hover `#111111` | Plus `+` icon | Clickable |
| **New Dashboard Modal** | Centered modal dialog | 440px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Title: "New Dashboard" (bold 18px), Input: rounded-full pill with light border, Buttons: `Cancel` and `Create` (purple pill) | Active typing "Client Leads" |
| **Toast Notification** | Top right floating | Auto width | Bg: `#D1FAE5`, border `#A7F3D0`, text `#065F46` | Green circle check + "Dashboard created" | Slides in and persists 3s |
| **Empty Dashboard State** | Main content area | Full width, dashed border | Dashed border `#D1D5DB`, bg `#F9FAFB` | Icon: 4-square grid, "Empty Dashboard" (bold 16px), "Add widgets to build your custom dashboard" (13px), `+ Add First Widget` button | Empty state visible |
| **Header Action Buttons** | Top right of dashboard | Row | `+ Add Widget`, `Save` (purple), `Cancel`, trash icon | Edit mode action buttons | Visible |

---

## Step 4: Add and save dashboard widgets (0:48–1:57)

URL: `crm.snaarp.com/dashboards/client-leads`
View: Add Widgets Modal & Populated Custom Dashboard

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Add Widgets Modal** | Centered modal overlay | 640px wide, max-h-[85vh] | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Add Widgets" (bold 18px), "Select as many as you like, then add them all at once.", close button | Open overlay |
| **Widget Option Cards** | 2-column grid in modal | 11 options | Border `#E5E7EB`, hover `#F3F4F6` | KPI Card, Bar Chart, Line Chart, Pie Chart, Donut Chart, Funnel, Gauge, Table, Leaderboard, Heatmap, Custom Widget | Selected cards get purple border & checkmark badge |
| **Add Button in Modal** | Modal footer right | Pill button | Bg: `#7014D9`, text white | `+ Add N widget(s)` (dynamic count: "Add 4 widgets", "Add 1 widget") | Clickable |
| **Client Leads Dashboard (6 Widgets)** | Main canvas | Row 1: KPI (1), Bar (2), KPI (1). Row 2: Pie (1), Line (2). Row 3: Table (3) | White cards, rounded-[16px], border `#ECECF1` | KPI: 25. Bar: Event_leads (15), Lead (6), New (2), Proposal (2). Pie: 4 slices. Line: trend curve. Table: STATUS & VALUE rows | All 6 widgets populated |
| **Save Action** | Top header right | Pill button | Bg: `#7014D9`, text white, diskette icon | "Save" button | Clicked -> saves dashboard |
| **Saved Toast** | Top right floating | Auto width | Bg: `#D1FAE5`, border `#A7F3D0`, text `#065F46` | Green checkmark + "Dashboard saved" | Displayed on save |

---

## Step 5: Share and present the dashboard (1:57–2:48)

URL: `crm.snaarp.com/dashboards/client-leads`
View: Share Dashboard Dialog & Full-Screen TV Mode

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Share Button** | Header top right | Text button with share icon | Text `#374151`, hover `#111111` | Share icon + "Share" | Clickable |
| **Share Modal** | Centered modal dialog | 420px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Title: "Share Dashboard", Subtitle: "Choose which roles can view this dashboard", Role options: Everyone in organization, Admin, Manager, Member, Viewer | `Everyone in organization` selected with light purple highlight |
| **Save Share Button** | Modal footer | Purple pill | Bg: `#7014D9`, text white | "Save" | Clicked -> toast "Sharing updated" |
| **TV Mode Button** | Header top right | Text button with TV icon | Text `#374151`, hover `#111111` | TV icon + "TV Mode" | Clickable |
| **TV Mode Layout** | Full container overlay | 100% width, 100% height | Bg: `#581C87` (rich purple) | Header: "Client Leads" (white bold 20px), "Auto-refreshing · 11/19/2026, 2:27:06 AM". Controls: Pause `||` pill, `Exit TV Mode` black pill | Full presentation view |
| **TV Mode Widget Cards** | Grid matching dashboard | Same 6 widget arrangement | Bg: `#1E293B`, rounded-[16px] | Dark theme versions of KPI Card, Bar Chart, Line Chart, Pie Chart, Table | Rendered on purple canvas |
| **Exit TV Mode** | Header top right | Pill button | Bg: `#111827`, text white | "Exit TV Mode" | Clicked -> returns to standard dashboard |

---

## Step 6: View and sort CRM prospects (2:48–3:25)

URL: `crm.snaarp.com/sales/prospects`
View: Prospects Pipeline (Kanban, List, Grid views & Sorting)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Sales Navigation** | CRM sidebar | Subnav under CRM | Text `#374151`, active `#7014D9` | Click `Sales` -> expand subitems: `Prospects`, `Forecasts`, `Won`, `Lost` | `Prospects` active |
| **Prospects Header** | Top of main canvas | Flex row justify-between | Heading `#111111`, controls | "Prospects" (bold 20px), "Sales Pipeline v" pill, "3 open prospects" subtitle | Default |
| **View Switcher** | Top right controls | Segmented button group | Bg: `#F3F4F6`, rounded-[10px] | `Kanban` (icon + text), `List` (icon + text), `Grid` (icon + text) | Active pill gets `#EDE9FE` / purple text |
| **Sort Dropdown** | Beside view switcher | Pill button | Bg: `#FFFFFF`, border `#E5E7EB` | `↑↓ Most recent v` | Click opens 6-item menu |
| **Sort Menu** | Dropdown popover | 180px wide | Bg: `#FFFFFF`, rounded-[12px], shadow-xl | Most recent, Oldest, Name (A-Z), Name (Z-A), Value (high-low), Value (low-high) | `Name (A-Z)` selected |
| **Kanban Columns** | Horizontal scroll row | 5+ columns, min-w-[240px] each | Bg: `#F9FAFB`, rounded-[16px] | Event Leads (coral dot, 1 contact · 10%), Lead (blue dot, 1 contact · 5%), Proposal (purple dot, 1 contact · 10%), Presentation (0), Awaiting Response (0) | Horizontally scrollable |
| **Prospect Cards** | Inside stage columns | Full column width | Bg: `#FFFFFF`, rounded-[12px], border `#E5E7EB` | Avatar (ST, CB, JL), Name, Three dots, Action buttons row: `Email`, `Call`, `SMS`, `WhatsApp` pills | 3 cards populated |
| **List View Table** | When List view clicked | Full width table | Bg: `#FFFFFF`, rounded-[16px], border `#E5E7EB` | Columns: Checkbox, Name, Stage (dropdown pill), Value (`-`), Contact (email/phone), Actions (`Won`, `Lost`, `:`) | Tabular list |
| **Grid View Cards** | When Grid view clicked | 3-column card grid | Bg: `#FFFFFF`, rounded-[16px], border `#E5E7EB` | Checkbox, Avatar, Name, bullet + stage name, stage selector dropdown at bottom | Card grid |

---

## Step 7: Import prospects from CSV (0:00–0:55)

URL: `crm.snaarp.com/sales/prospects`
Route: `/tutorials/crm`
View: Prospects Pipeline & 4-Stage CSV Import Modal
Source recording: `C:\Users\HP\Downloads\1119(1).mp4` (0:00–0:55)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Import Button** | Top header right beside view options | Pill button | Bg: `#FFFFFF`, border `#E5E7EB`, text `#374151` | Upload icon + "Import" | Clicked -> opens import modal |
| **Import Modal Dialog** | Centered modal overlay | 760px wide, max-h-[90vh] | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Import Prospects" + close button. 4-step wizard indicator | Open overlay |
| **Wizard Step Indicator** | Top of modal body | 4 steps horizontal row | Numbers in circles, text | 1 Upload, 2 Map Columns, 3 Review, 4 Complete | Stage indicator highlights active step |
| **Stage 1 (Upload)** | Modal central body | Dashed dropzone | Border `#D1D5DB`, bg `#F9FAFB` | Upload icon, "Click to upload or drag and drop", "CSV files up to 10MB". File preview card: `prospects_import.csv (1.2 MB)` with green checkmark | File selected, "Continue" button active |
| **Stage 2 (Map Columns)** | Modal central body | 10-row mapping table | Alternating row tint, borders `#F3F4F6` | Columns: CSV COLUMN (10 items) -> CRM FIELD (dropdown selects). Mappings: FIRST NAME -> First Name, LAST NAME -> Last Name, EMAIL -> Email, PHONE -> Phone, COMPANY -> Company, TITLE -> Job Title, SOURCE -> Source, STAGE -> Stage, DEAL VALUE -> Deal Value, NOTES -> Notes | All 10 fields mapped; "Review Data" button active |
| **Stage 3 (Review)** | Modal central body | 3 stat summary cards + warning notice | Green card (5 Records to import), Gray card (0 Records with errors), Blue card (1 Stage mapped). Warning notice: Amber tint `#FEF3C7`, border `#FDE68A` | Notice text: `"Stage" mapping: 1 record matched an existing stage, 4 will use the default stage "Event Leads"` | Review overview visible; "Import 5 Prospects" button active |
| **Stage 4 (Complete)** | Modal central body | Centered celebration icon + stats | Green checkmark circle, text `#111111` & `#6B7280` | "Import complete!", "5 prospects successfully imported to your pipeline." | "Done" button clicked -> closes modal |
| **Updated Kanban Board** | Main canvas | 5 stage columns | White cards, stage dot accents | 5 new imported cards present: Alex Morgan, Morgan Taylor, Taylor Brooks, Sam Lee, Casey Jordan | Kanban board populated with imported records |

---

## Step 8: Cloud phone and SMS messaging (0:55–1:40)

URL: `crm.snaarp.com/calls`
View: Calls and SMS Communication Hub
Source recording: `C:\Users\HP\Downloads\1119(1).mp4` (0:55–1:40)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Calls Sidebar Item** | CRM sidebar under CRM | Full item row | Active bg `#F3ECFC`, text `#7014D9` | Phone icon + "Calls" | Active selected tab |
| **Calls Header** | Top of page | Flex row justify-between | Heading `#111111`, subtitle `#6B7280` | Title: "Cloud Phone", Subtitle: "Make calls and manage communications". Action buttons: `My Numbers`, `Call Settings` | Rendered |
| **Subnav Tabs** | Under header | Segmented tabs | Active border-b-2 `#7014D9`, text `#7014D9` | `Calls` tab, `SMS` tab | Switchable |
| **Call Stats Cards** | Top of Calls tab | 5 metric cards grid | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Total Calls (24), Answered (18), Missed (6), Inbound (10), Outbound (14) | Static metrics |
| **Dial Pad Widget** | Calls tab left column | 320px wide card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Number display: `+44 7700 900456`. 12-key telephone grid (`1`..`9`, `*`, `0`, `#`). Green `Call` pill button with phone icon | Dialing active |
| **Active Call Bar** | Below dial pad | Banner | Bg: `#ECFDF5`, border `#A7F3D0`, text `#065F46` | Pulsing green dot, "Call in progress with Alex Morgan", duration timer | Calling state |
| **Recent Calls Panel** | Calls tab right column | Flex-1 card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Header: "Recent Calls", filter tabs (All, Missed, Voicemail). Rows with call direction icons, name, timestamp, duration | Call history displayed |
| **SMS View Grid** | When SMS tab clicked | 3-column split view | Split layout | Left: Conversation list (Alex Morgan, Morgan Taylor, Taylor Brooks). Center: Message thread + composer. Right: Contact details card | SMS view active |
| **SMS Message Thread** | Center column | Scrollable conversation | Incoming gray bubbles `#F3F4F6`, outgoing purple bubbles `#7014D9` | Speech bubbles with timestamps ("Hi Alex, following up on our proposal...", "Thanks Jane, let's connect tomorrow!") | Active thread with Alex Morgan |
| **SMS Composer** | Bottom of center column | Text input card | Border `#E5E7EB`, focus ring `#7014D9` | Textarea, emoji picker, attachment paperclip, purple `Send` button | Text typed and sent |
| **WhatsApp Quick Action** | Contact profile card right | Pill button | Green accent `#10B981` | WhatsApp icon + "WhatsApp" | In-app feedback triggered |

---

## Step 9: Add a contact and link products (1:40–2:30)

URL: `crm.snaarp.com/sales/prospects`
View: Add Contact 2-Column Modal Dialog
Source recording: `C:\Users\HP\Downloads\1119(1).mp4` (1:40–2:30)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Add Contact Button** | Top header right | Purple pill button | Bg: `#7014D9`, text white | `+ Add Contact` | Clicked -> opens modal |
| **Add Contact Modal** | Centered modal overlay | 720px wide, max-h-[85vh] | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Add New Contact", close button. 2-column scrollable form | Open overlay |
| **Left Form Column** | Left half of form | Flex col gap-3 | Input borders `#E5E7EB` | First Name (Jane), Last Name (Smith), Email (jane.smith@acme-studio.com), Phone (+44 7700 900789), Mobile, Job Title (Sales Manager), Company (Acme Studio), Website, Source (Referral) | Values typed |
| **Right Form Column** | Right half of form | Flex col gap-3 | Input borders `#E5E7EB` | Stage (Proposal), Priority (High), Assigned Rep, Currency (£ GBP), Deal Value (£4,500), Linked Products, Notes | Configured |
| **Linked Products Button** | In right column | Outline button | Border `#D1D5DB`, hover `#F3F4F6` | `+ Add` button | Clicked -> opens products dropdown |
| **Products Dropdown** | Popover menu | 220px wide | Bg: `#FFFFFF`, rounded-[12px], shadow-xl | Snaarp PDF (£12/mo), Snaarp Books (£19/mo), Snaarp Sheets (£8/mo), Snaarp Teams (£15/mo) | "Snaarp PDF" selected -> adds product tag |
| **Selected Product Chip** | Under Products label | Pill badge | Bg: `#F3ECFC`, text `#7014D9`, border `#DDD6FE` | Snaarp PDF (£12/mo) + `x` remove icon | Tag displayed |
| **Modal Footer Actions** | Modal bottom bar | Flex row justify-end gap-3 | Border-t `#F3F4F6` | `Cancel` button (gray text), `Create Contact` button (purple pill `#7014D9`) | Create Contact clicked -> closes modal |
| **Success Toast** | Top right floating | Auto width | Bg: `#D1FAE5`, border `#A7F3D0`, text `#065F46` | Checkmark + "Contact created successfully" | Visible 3s |

---

## Step 10: Prospect tasks, reminders, and comments (2:30–3:30)

URL: `crm.snaarp.com/sales/prospects`
View: Card Value Editor, Inline Tasks, High Priority Reminder & Comments Modals
Source recording: `C:\Users\HP\Downloads\1119(1).mp4` (2:30–3:30)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Deal Value Badge** | Alex Morgan card header | Inline button | Text `#111111` bold, hover bg `#F3F4F6` | "£5,000" | Clicked -> opens inline editor |
| **Inline Value Input** | Replaces value badge | Small input pill | Border `#7014D9`, ring-2 `#DDD6FE` | Input field with "£8,500" typed + checkmark button | Enter / check clicked -> saves new value |
| **Card 3-Dot Actions** | Top right of Alex Morgan card | 28x28px button | Hover bg `#F3F4F6` | Vertical 3 dots icon | Clicked -> opens action menu |
| **Card Context Menu** | Popover below 3 dots | 200px wide | Bg: `#FFFFFF`, rounded-[12px], shadow-xl | Add Task, Add Comment, View Comments, Edit Client Details, Close Deal (Won), Close Deal (Lost) | Menu options visible |
| **Inline Task Creation** | Sub-panel on card | Card width | Bg: `#FFFBEB`, border `#FDE68A` | Task title: "Follow up on proposal feedback", Due: "Tomorrow, 10:00 AM", priority selector | Saved -> adds task box to card |
| **Card Task Indicator** | Bottom of Alex Morgan card | Banner inside card | Bg: `#F9FAFB`, rounded-[8px], border `#E5E7EB` | Orange clock icon, "Follow up on proposal feedback", checkbox | Displayed on card |
| **High Priority Task Reminder** | Centered modal overlay | 460px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: Orange alert icon + "High Priority Task Reminder". Body: task description, client name, due status | Open overlay |
| **Reminder Actions** | Modal footer & buttons | Action buttons | Green pill `✓ Mark Done`, Purple button `Go to Task`, Snooze grid (`15m`, `1h`, `Tomorrow`) | `Mark Done` clicked -> closes modal, toast "Task marked as done" |
| **Add Comment Modal** | Centered modal overlay | 480px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Title: "Add Comment - Alex Morgan", textarea with placeholder "Type internal notes...", `Save Comment` purple button | Notes typed: "Alex confirmed budget approval for Q1 rollout" -> toast "Comment added" |
| **View Comments Modal** | Centered modal overlay | 520px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Title: "Comments - Alex Morgan", timeline list of logged comments with author initials, date, and note content | Open overlay |

---

## Step 11: Edit client details and close deal (3:30–4:15)

URL: `crm.snaarp.com/sales/prospects`
View: Edit Client Details Scrollable Modal & Close Deal (Won) Dialog
Source recording: `C:\Users\HP\Downloads\1119(1).mp4` (3:30–4:15)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Edit Client Details Modal** | Centered modal overlay | 680px wide, max-h-[85vh] | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Edit Client - Alex Morgan", close button. 2 scrolling sections | Open overlay |
| **Client Details Section** | Top section of modal body | Full width form | Borders `#E5E7EB`, text `#111111` | Name: Alex Morgan, Email: alex@acme-studio.com, Phone: +44 7700 900456, Company: Acme Studio, Title: VP of Operations | Displayed and reviewed |
| **Prospect Details Section** | Bottom section (scrolled into view) | Full width form | Borders `#E5E7EB` | Deal Stage: Proposal, Deal Value: £8,500, Probability: 75%, Expected Close Date | Scrolled into view |
| **Save Changes Button** | Modal footer right | Purple pill button | Bg: `#7014D9`, text white | "Save Changes" | Clicked -> saves client, toast "Prospect updated" |
| **Close Deal (Won) Option** | 3-dot dropdown menu | Menu item | Green hover tint, text `#059669` | Trophy / check icon + "Close Deal (Won)" | Clicked -> opens confirmation modal |
| **Close Won Modal** | Centered modal dialog | 420px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Green celebration icon, "Mark Alex Morgan as Won?", "This will move the deal to Won with value £8,500 and notify the account manager." | Open dialog |
| **Confirm Won Button** | Modal footer right | Green pill button | Bg: `#10B981`, text white | "Confirm Won" | Clicked -> moves deal to Won, toast "Deal marked as Won (£8,500)" |

---

## Step 12: List view and pipeline sorting (4:15–4:37)

URL: `crm.snaarp.com/sales/prospects`
View: Prospects Pipeline List View & Column Sorting
Source recording: `C:\Users\HP\Downloads\1119(1).mp4` (4:15–4:37)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **List View Switcher Button** | View switcher group on header | Segmented pill | Active `#EDE9FE` bg, `#7014D9` text | List icon + "List" | Clicked -> switches canvas from Kanban to List view |
| **Prospects Table** | Main content canvas | Full width table | Bg: `#FFFFFF`, rounded-[16px], border `#E5E7EB` | Columns: Checkbox, Name, Stage, Deal Value, Contact Info, Actions | Dense table rendered |
| **Stage Dropdown Pills** | In Stage table column | Small dropdown button | Colored pill matching stage (coral, blue, purple, green) | Event Leads, Lead, Proposal, Won | Interactive dropdowns |
| **Sort Dropdown Button** | Header beside view switcher | Pill button | Bg: `#FFFFFF`, border `#E5E7EB` | `↑↓ Most recent v` | Clicked -> opens sort menu |
| **Sort Options Menu** | Popover dropdown | 180px wide | Bg: `#FFFFFF`, rounded-[12px], shadow-xl | Most recent, Oldest, Name (A-Z), Name (Z-A), Value (high-low), Value (low-high) | Open menu |
| **Name (A-Z) Sort Action** | Third item in sort menu | Menu item row | Hover bg `#F3F4F6`, active purple text | "Name (A-Z)" | Clicked -> table reorders: Alex Morgan, Casey Jordan, Morgan Taylor, Sam Lee, Taylor Brooks |
| **Name (Z-A) Sort Action** | Fourth item in sort menu | Menu item row | Hover bg `#F3F4F6`, active purple text | "Name (Z-A)" | Clicked -> table reorders: Taylor Brooks, Sam Lee, Morgan Taylor, Casey Jordan, Alex Morgan |
| **Pagination Bar** | Table footer | Flex row justify-between | Text `#6B7280`, border-t `#F3F4F6` | "Showing 5 of 5 prospects", Prev / Next buttons | Rendered |
| **Completion Card** | Follows Step 12 automatically | Centered completion overlay | Bg: `#FFFFFF`, rounded-[24px], shadow-2xl | Title: "You're all set", Replay & Back to Snaarp buttons | Appears after Step 12 completes |
