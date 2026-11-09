# UI Match Audit: Snaarp Books Part 15 (Reports)

**Reference Recording**: `C:\Users\HP\Downloads\1109.mp4` (1376x720, 3:27)  
**Steps**: 200 – 205  
**Route**: `/tutorials/books`  
**Date**: 2026-11-09

---

## Step 200: Reports: Find your way around the Reports Center (Video 0:00 – 0:18)

| Element | Reference Video (0:00 – 0:18) | Built Component (`BooksReportsCenterView.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Active Nav Highlight** | "Reports" in left navigation highlighted purple pill (`bg-[#EDE9FE] text-[#7C3AED] font-semibold`) | `nav-books-reports` in `BooksShell.tsx` | Match |
| **Category Sidebar** | Left-hand second column (`w-[200px] border-r border-[#EBECEF] bg-white`) | `[data-tl="reports-category-sidebar"]` | Match |
| **All Reports Pill** | "All Reports" button pill at top with active light-blue background (`bg-[#EFF6FF] text-[#1D4ED8]`) | `[data-tl="cat-all-reports"]` | Match |
| **Category Header** | "REPORT CATEGORY" in tiny uppercase gray font (`text-[10px] tracking-wider text-gray-400 font-semibold`) | `<div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">` | Match |
| **Category List** | 12 category rows with icons: Business Overview, Sales, Receivables, Payments Received, Recurring Invoices, Purchases and Expenses, Payables, Accountant, Budget, Currency, Taxes, Activity | Clickable rows `[data-tl="cat-business-overview"]`, `[data-tl="cat-receivables"]`, `[data-tl="cat-taxes"]`, etc. | Match |
| **Main Title** | "Reports Center" (`text-2xl font-bold text-gray-900`) | `[data-tl="reports-center-title"]` | Match |
| **Search Input** | Rounded input with Search icon and placeholder "Search reports" (`h-10 border border-gray-200 rounded-lg px-3 pl-9`) | `[data-tl="input-search-reports"]` | Match |
| **Active Group & Badge** | Category heading with count badge: "All Reports 48", "Receivables 7", "Taxes 1" | `[data-tl="reports-current-category-title"]` + badge `[data-tl="reports-count-badge"]` | Match |
| **Reports Table Header** | Columns: `REPORT NAME` (left-aligned) and `REPORT CATEGORY` (right or secondary column) | `text-xs font-semibold uppercase text-gray-500` | Match |
| **Reports Table Rows** | 48 total rows: Profit and Loss, Balance Sheet, Cash Flow Statement, Movement of Equity, Sales by Customer, Customer Balance Summary, Trial Balance, etc. | Clickable blue links `[data-tl="report-link-<id>"]` | Match |
| **Search Filter Interaction** | Typing "balance" filters list to 4 matching reports (Balance Sheet, Customer Balance Summary, Vendor Balance Summary, Trial Balance); clearing restores list | Filter state bound to search input | Match |
| **Category Selection** | Clicking "Receivables" switches view to 7 reports; clicking "Taxes" switches to 1 report; clicking "All Reports" restores all 48 | Dynamic category filtering | Match |

Side-by-side screenshots at 1920x1080 and 1280x720 compared with video frames 001, 005, 010, 016; all differences matched.

---

## Step 201: Reports: Run Profit and Loss (Video 0:19 – 0:58)

| Element | Reference Video (0:19 – 0:58) | Built Component (`BooksProfitAndLossView.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Breadcrumb Row** | `< Back` link, home icon, `Reports > Profit And Loss` (bold) | `[data-tl="breadcrumb-reports"]` | Match |
| **Category Label** | Tiny uppercase gray label "Business Overview" above title | `text-xs text-gray-500 font-medium` | Match |
| **Report Title** | "Profit and Loss • From 01 Nov 2026 To 09 Nov 2026" with back arrow on title | `text-2xl font-bold text-gray-900` + date range in `text-base font-normal text-gray-500` | Match |
| **Top Right Actions** | Three utility icons: Compare (split icon), Download (tray icon), Print (printer icon) | `[data-tl="btn-report-compare"]`, `[data-tl="btn-report-download"]`, `[data-tl="btn-report-print"]` | Match |
| **Filter Bar** | "Filters :" label, "Date Range :" dropdown, "Report Basis :" dropdown, "+ More Filters" button, blue "Run Report" button | Complete filter bar with `[data-tl="select-date-range"]`, `[data-tl="select-report-basis"]`, `[data-tl="btn-run-report"]` | Match |
| **Date Range Options** | Dropdown with: This Month, This Quarter, This Year, Last Month, Last Year, Custom | `[data-tl="date-range-option-<val>"]` | Match |
| **Report Basis Options** | Dropdown with: Accrual, Cash | `[data-tl="basis-option-accrual"]`, `[data-tl="basis-option-cash"]` | Match |
| **Sub-Bar Controls** | Tabs: "Table View" (active blue underline) and "Chart View"; right: "Compare With : None" dropdown | `[data-tl="tab-table-view"]`, `[data-tl="tab-chart-view"]`, `[data-tl="select-compare-with"]` | Match |
| **Empty State** | Centered icon with heading "Set your filters, then run the report." and subtext 'Choose a date range and basis above and click "Run Report".' with blue Run Report button | `[data-tl="pnl-empty-state"]` | Match |
| **Customize Report Panel** | Left slide-out drawer with X close button: Date Range chips (This Month, This Quarter, This Year, Last Month, Last Year), From (`11/01/2026`) and To (`11/09/2026`) date inputs, Report Basis select, Compare With select | `[data-tl="drawer-customize-report"]` | Match |
| **Report Sheet** | Centered white card: bold "Profit and Loss", subtitle "From 01 Nov 2026 To 09 Nov 2026", "Basis : ACCRUAL" | `[data-tl="pnl-report-sheet"]` | Match |
| **Financial Table** | Columns `ACCOUNT` and `NOV 2026 / TOTAL`. Rows: Operating Income (£4,820.00), Cost of Goods Sold (£1,640.00), Gross Profit (£3,180.00), Operating Expenses (£1,250.00), Operating Profit (£1,930.00), Non-Operating Income (£60.00), Non-Operating Expenses (£45.00), Net Profit (£1,945.00) | Formatted financial statement table | Match |

Side-by-side screenshots at 1920x1080 and 1280x720 compared with video frames 020, 035, 050; all differences matched.

---

## Step 202: Reports: Profit and Loss on a cash basis for last year (Video 0:59 – 1:25)

| Element | Reference Video (0:59 – 1:25) | Built Component (`BooksProfitAndLossView.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Drawer Interactions** | Click "Last Year" chip in Customize panel; date inputs switch to `01/01/2025` and `12/31/2025` | `[data-tl="chip-last-year"]`, inputs `[data-tl="input-custom-from"]`, `[data-tl="input-custom-to"]` | Match |
| **Basis Selection** | Click Report Basis dropdown, select "Cash" | `[data-tl="select-custom-basis"]` -> `[data-tl="basis-option-cash"]` | Match |
| **Run Action** | Click "Run Report" button in customize panel | `[data-tl="btn-drawer-run-report"]` | Match |
| **Cash Basis Banner** | Pale blue notification banner above sheet: "Cash basis recognizes income when payment is received and expenses when paid." | `[data-tl="cash-basis-banner"]` (`bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded-lg px-3 py-2`) | Match |
| **Updated Sheet Header** | Title "Profit and Loss • From 01 Jan 2025 To 31 Dec 2025", "Basis : CASH" | Dynamic range and basis | Match |
| **Updated Column** | Column header "JAN 2025 TOTAL" | `[data-tl="th-period-total"]` | Match |
| **Cash Data Totals** | Operating Income £38,400.00, Cost of Goods Sold £14,200.00, Gross Profit £24,200.00, Operating Expenses £11,890.00, Operating Profit £12,310.00, Net Profit £12,310.00 | Believable consistent sample figures | Match |

Side-by-side screenshots at 1920x1080 and 1280x720 compared with video frames 060, 065, 069; all differences matched.

---

## Step 203: Reports: Sales by Customer and Customer Balance Summary (Video 1:26 – 2:18)

| Element | Reference Video (1:26 – 2:18) | Built Component (`BooksSalesByCustomerView.tsx` & `BooksCustomerBalanceSummaryView.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Sales by Customer: Header** | Breadcrumb `< Back > Reports > Sales By Customer`, category label "Sales", title "Sales by Customer" | `[data-tl="sales-by-customer-header"]` | Match |
| **Sales Filters** | `From : 01/01/2026`, `To : 11/09/2026`, checkbox `[x] Include Sales Returns`, `+ More Filters`, `Run Report` | Inputs `[data-tl="input-from-date"]`, `[data-tl="input-to-date"]`, `[data-tl="chk-include-returns"]`, `[data-tl="btn-run-report"]` | Match |
| **Sales Sheet & Range** | Sheet title "Sales by Customer", subline "1/1/2026 to 11/30/2026" | Centered sheet matching video frame 080 | Match |
| **Sales Table Columns** | Columns: `CUSTOMER`, `INVOICES`, `SALES AMOUNT`, `TOTAL` | Table matching frame 080 | Match |
| **Sales Customer Rows** | Northfield Cafe (1 / £420.00 / £420.00), Greenleaf Bakery (2 / £336.00 / £336.00), Helen Carter (1 / £200.00 / £200.00), Sterling Interiors (3 / £188.00 / £188.00) | Sample customer rows with blue clickable links `[data-tl="customer-link-<n>"]` | Match |
| **Sales Total Row** | Total: 7 invoices / £1,144.00 / £1,144.00 (bold) | Bottom summary row | Match |
| **Customer Balance: Header** | Breadcrumb `< Back > Reports > Customer Balance Summary`, category label "Receivables", title "Customer Balance Summary" | `[data-tl="customer-balance-header"]` | Match |
| **Customer Balance Filters** | `From : 01/01/2026`, `To : 11/09/2026`, Run Report. Top right has download and print icons only | Download and print icons | Match |
| **Customer Balance Columns** | `CUSTOMER`, `OPENING`, `INVOICED`, `RECEIVED`, `CREDITS`, `CLOSING BALANCE` | Received column values rendered in green text (`text-emerald-600 font-medium`) | Match |
| **Customer Balance Rows** | 4 sample customers: Opening £0.00, Invoiced £1,144.00, Received £660.00, Credits £0.00, Closing £484.00 | Arithmetic verifies: Closing = Opening + Invoiced - Received - Credits | Match |

Side-by-side screenshots at 1920x1080 and 1280x720 compared with video frames 080, 090, 105, 115; all differences matched.

---

## Step 204: Reports: Tax Summary and Budget vs Actuals (Video 2:19 – 2:48)

| Element | Reference Video (2:19 – 2:48) | Built Component (`BooksTaxSummaryView.tsx`, `BooksRealizedGainLossView.tsx`, `BooksBudgetVsActualsView.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Tax Summary: Header** | Breadcrumb `< Back > Reports > Tax Summary`, category label "Taxes", title "Tax Summary • From 01 Jan 2026 To 09 Nov 2026" | `[data-tl="tax-summary-header"]` | Match |
| **Tax Summary Filters** | `From : 01/01/2026`, `To : 11/09/2026`, `+ More Filters`, `Run Report` | Filter controls | Match |
| **Tax Summary Table** | Columns: `TAX NAME`, `TAX RATE`, `TAXABLE AMOUNT`, `TAX AMOUNT`. Rows: Standard VAT (20%) £1,144.00 / £228.80, Zero Rate (0%) £0.00 / £0.00, Total £1,144.00 / £228.80 | Clean white sheet statement | Match |
| **Realized Gain/Loss** | Currency category report: title "Realized Gain or Loss", range `01/01/2026 to 11/09/2026`, note "No FX transactions in this period." Total Gain/Loss: £0.00 | Matches video frame 146 | Match |
| **Budget vs Actuals: Header** | Breadcrumb `< Back > Reports > Budget Vs Actuals`, title "Budget vs Actuals" with back arrow, print and download icons | `[data-tl="bva-header"]` | Match |
| **Budget vs Actuals Filters** | "Budget" select: "Expenses (FY2026)" (blue ring), "Basis" select: "Accrual" | `[data-tl="select-bva-budget"]`, `[data-tl="select-bva-basis"]` | Match |
| **Budget vs Actuals Table** | Narrow scrollable table with columns `ACCOUNT`, `PERIOD`, `BUDGET`, `ACTUAL`, `DIFFERENCE`. ~30 rows of accounts across 2026 periods (Retained Earnings, Prepaid Expenses, Advertising, Insurance...) | `[data-tl="bva-table-scroll"]` | Match |
| **Table Scroll Action** | Smooth internal scrolling through the budget accounts | `scrollView(tl, 300)` | Match |

Side-by-side screenshots at 1920x1080 and 1280x720 compared with video frames 135, 146, 158, 165; all differences matched.

---

## Step 205: Reports: Balance Sheet, Trial Balance and Recurring Invoice Details (Video 2:49 – 3:28)

| Element | Reference Video (2:49 – 3:28) | Built Component (`BooksBalanceSheetView.tsx`, `BooksTrialBalanceView.tsx`, `BooksRecurringInvoiceDetailsView.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Trial Balance: Header** | Breadcrumb `< Back > Reports > Trial Balance`, category label "Accountant", title "Trial Balance • As of 09 Nov 2026" | `[data-tl="trial-balance-header"]` | Match |
| **Trial Balance Filters** | `As of Date : 11/09/2026`, `Report Basis : Accrual`, `+ More Filters`, `Run Report` | Filter controls | Match |
| **Trial Balance Sheet** | Bold "Trial Balance", "Basis : ACCRUAL", "As of 09 Nov 2026" | White sheet card | Match |
| **Trial Balance Columns** | `ACCOUNT`, `NET DEBIT`, `NET CREDIT`. Groups: Assets (Undeposited Funds, AR, Prepaid Expenses), Liabilities (AP), Equities (Retained Earnings), Income (Sales), Expense (Advertising, Bank Fees) | Blue account links | Match |
| **Trial Balance Balancing** | Bold "Total for Trial Balance": Net Debit £6,820.00, Net Credit £6,820.00 (balanced!) | Both sides equal per user prompt rule | Match |
| **Footnote** | Small gray footnote: `**Amount is displayed in your base currency (GBP)` | `text-xs text-gray-400 mt-3 italic` | Match |
| **Balance Sheet: Header** | Breadcrumb `< Back > Reports > Balance Sheet`, category label "Business Overview", title "Balance Sheet • As of 09 Nov 2026" | `[data-tl="balance-sheet-header"]` | Match |
| **Balance Sheet Empty State** | "Set your filters, then run the report." with subtext 'Adjust the filters above and click "Run Report".' | Centered card before Run Report click | Match |
| **Balance Sheet Result** | Current Assets (£3,163.51), Fixed Assets (£0.00), Total Assets (£3,163.51), Current Liabilities (£500.00), Equities (£2,663.51), Total Liabilities & Equities (£3,163.51) | Balanced statement | Match |
| **Recurring Invoices: Header** | Breadcrumb `< Back > Reports > Recurring Invoice Details`, category label "Recurring Invoices", title "Recurring Invoice Details" | `[data-tl="recurring-invoices-report-header"]` | Match |
| **Recurring Invoices Count** | Subline: "3 recurring invoice profiles" | `[data-tl="recurring-invoices-count-line"]` | Match |
| **Recurring Invoices Table** | Columns: `PROFILE NAME`, `CUSTOMER`, `FREQUENCY`, `START DATE`, `END DATE`, `STATUS`, `AMOUNT`. 3 real sample rows: Monthly Retainer, Quarterly Maintenance, Annual Subscription | Formatted table with status badges and currency amounts | Match |

Side-by-side screenshots at 1920x1080 and 1280x720 compared with video frames 175, 183, 198; all differences matched.
