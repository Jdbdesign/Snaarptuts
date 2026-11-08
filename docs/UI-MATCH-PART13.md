# UI Match Specification: Snaarp Books Part 13 (Steps 190–191)

Reference recording: `C:\Users\HP\Downloads\1108(3).mp4` (1384x720, 0:58).
Covers the final two screens of Snaarp Books Accountant menu:
1. **Step 190**: Audit Logs (`/audit-logs`)
2. **Step 191**: Import Data (`/import`)

---

## 1. Visual Elements Audit Table

| Step | Screen / State | Video Timestamp | Element | Video Appearance / Style | Planned Implementation | Verdict |
|---|---|---|---|---|---|---|
| **190** | Audit Logs - Initial List | 0:00–0:05 | Header Icon & Title | Shield icon (`ShieldCheck`) + "Audit Logs" heading (text-2xl font-bold text-gray-900) | `<ShieldCheck className="w-6 h-6 text-gray-900" />` + `<h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>` | Match |
| **190** | Audit Logs - Initial List | 0:00–0:05 | Filter Bar | Funnel icon (`Filter`), label "Filters:" (text-sm font-medium text-gray-500), 2 dropdowns | Filter icon + "Filters:" + Action & Entity dropdown buttons | Match |
| **190** | Audit Logs - Initial List | 0:00–0:05 | Action Dropdown | White rounded select button showing "All Actions" with ChevronDown | `[data-tl=select-filter-action]` showing active action or "All Actions" | Match |
| **190** | Audit Logs - Initial List | 0:00–0:05 | Entity Dropdown | White rounded select button showing "All Entities" with ChevronDown | `[data-tl=select-filter-entity]` showing active entity or "All Entities" | Match |
| **190** | Audit Logs - Table | 0:00–0:05 | Table Header | Columns: Timestamp, User, Action, Entity, Description | 5 columns matching exact order and header text | Match |
| **190** | Audit Logs - Table | 0:00–0:05 | Action Badges | Pill badge: CREATE = green (`bg-emerald-100 text-emerald-800`), UPDATE = purple/blue (`bg-blue-100 text-blue-800`), DELETE = red (`bg-red-100 text-red-800`), LOGIN = gray (`bg-gray-100 text-gray-700`) | Distinct color-coded pills for CREATE, UPDATE, DELETE, LOGIN | Match |
| **190** | Audit Logs - Table | 0:00–0:05 | Entity Cell | Entity name with gray identifier in brackets, e.g. `budget (Food (Copy))` or `account (Staff Petty Float)` | Standard entity name + `({id})` in muted gray | Match |
| **190** | Audit Logs - Table | 0:00–0:05 | Description Cell | Detailed description, e.g. "CREATE budget (Food (Copy))", "UPDATE account (Staff Petty Float)" | Clean description string matching action and entity | Match |
| **190** | Audit Logs - Filter Action | 0:06–0:10 | Action Menu | Options: `All Actions`, `CREATE`, `UPDATE`, `DELETE`, `DEACTIVATE`, `STATUS CHANGE`, `LOGIN` | Dropdown menu `[data-tl=menu-filter-actions]` with 7 options | Match |
| **190** | Audit Logs - Loading | 0:08–0:09, 0:17–0:18 | Skeleton State | 5–8 rows of pulsing grey skeleton bars replacing table rows during filter transition (~1.0s) | Skeleton rows rendered when `auditLogsLoading === true` | Match |
| **190** | Audit Logs - Filter Entity | 0:14–0:18 | Entity Menu | Options: `All Entities`, `Account`, `Banking`, `Budget`, `Invoice`, `Manual journal`, `Vendor credit`, `Bank feed` | Dropdown menu `[data-tl=menu-filter-entities]` with 8 options | Match |
| **190** | Audit Logs - Pagination | 0:20–0:25 | Bottom Bar | Text "Showing 1-20 of 42", Previous button, Next button | Flex bar at bottom with pagination counter and Previous/Next buttons | Match |
| **191** | Import Data - Initial Form | 0:25–0:32 | Page Title & Subtitle | Heading "Import Data" (text-2xl font-bold text-gray-900), subtitle "Migrate your items, invoices, expenses, vendors, and customers from a CSV export. Upload one file at a time." | Matches text and hierarchy 100% | Match |
| **191** | Import Data - Type Selection | 0:25–0:35 | Section 1 Heading | "1. What are you importing?" (text-sm font-semibold text-gray-900) | Plain heading without card wrapping | Match |
| **191** | Import Data - Type Selection | 0:25–0:35 | 5 Category Cards | 2-column grid with cards: Items / Products, Invoices, Expenses, Vendors, Customers with respective descriptions | 5 clickable cards `[data-tl=card-import-type-<id>]` with radio/border highlight | Match |
| **191** | Import Data - Type Selection | 0:25–0:35 | Selected Card Style | Border blue-600, soft blue background tint (`bg-blue-50/50`), bold title | Exact blue border and tint on active card | Match |
| **191** | Import Data - Upload Dropzone | 0:28–0:36 | Section 2 Heading | "2. Upload the <Type> CSV" (updates dynamically with selected type) | Dynamic heading `2. Upload the {type} CSV` | Match |
| **191** | Import Data - Upload Dropzone | 0:28–0:36 | Dashed Dropzone | Dashed border box with upload cloud icon, "Choose a CSV file" primary text, "CSV export from your previous system" helper text | `[data-tl=dropzone-csv]` clickable to open in-app modal | Match |
| **191** | Import Data - File Selected | 0:38–0:45 | Attached File Card | File icon, file name `items-export-2026-10-11.csv`, "2 data rows · 6 columns", link "Choose a different file" | Attached file card `[data-tl=card-attached-file]` | Match |
| **191** | Import Data - File Selected | 0:38–0:45 | Preview Table | Columns: `Item Name`, `Unit`, `Rate`, `Type`, `Status`, `Tax` with 2 sample rows (Organic Rice 25kg, Palm Oil 5L) | Table with 2 sample rows matching exact video headers and sample data | Match |
| **191** | Import Data - File Selected | 0:42–0:48 | Import Button | Full-width solid blue button "Import 2 rows" | `[data-tl=btn-import-submit]` styled with `w-full bg-[#145CFB]` | Match |
| **191** | Import Data - Complete | 0:48–0:54 | Toast Notification | Green toast: "Import started - 2 rows queued" | `tl.toast("Import started - 2 rows queued")` | Match |
| **191** | Import Data - Complete | 0:49–0:56 | Result Block | Bordered card with green CheckCircle, heading "Import complete", 3 metric boxes (Created: 2, Skipped: 0, Errors: 0), link "Import another file" | Bordered block `[data-tl=block-import-complete]` with metrics and reset action | Match |

---

## 2. Deliberate Differences (Permitted)
1. **Sample Data**:
   - Audit Logs: User email displayed as `sam.taylor@snaarp.com` (not personal email).
   - Entities generated from previous Parts 11–12 (Bank accounts, manual journals, accounts, budgets) so the audit trail is contextually accurate.
   - Import Data: Selected file is `items-export-2026-10-11.csv` with 2 valid item rows (Organic Rice 25kg, Palm Oil 5L) resulting in Created: 2, Skipped: 0, Errors: 0 (unlike the video which imported a client file into items resulting in 0 created).
2. **In-App Modal for CSV Picking**:
   - Replaced native Windows file dialog with existing `BooksCsvPickerModal` selecting `items-export-2026-10-11.csv`.
3. **No Browser Chrome**:
   - Native address bar and bookmarks bar omitted per universal rules.
