# UI Match: Snaarp CRM

Design lock and side-by-side audit notes for Snaarp CRM (Part 1, steps 1–6).
Source recording: `C:\Users\HP\Downloads\1119.mp4` (1444x720, 3:25).

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
