# UI Match Audit: Snaarp Books Part 14 (Filing & Compliance)

**Reference Recording**: `C:\Users\HP\Downloads\1108(4).mp4` (1386x720, 2:57)  
**Steps**: 192 – 199  
**Route**: `/tutorials/books`  
**Date**: 2026-11-08

---

## Step 192: Explore Filing & Compliance (Video 0:00 – 0:03)

| Element | Reference Video (0:00 – 0:03) | Built Component (`BooksShell.tsx` & `BooksVatFilingView.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Menu Trigger** | "Filing & Compliance" item with FileText icon and chevron | `[data-tl="nav-books-filing"]` in `BooksShell.tsx` | Match |
| **Submenu Expansion** | Collapsible accordion revealing 4 items: VAT Filing, VAT Payments, Self Assessment, MTD Income Tax | `booksFilingExpanded` state in `BooksShell.tsx` | Match |
| **Submenu Item 1** | "VAT Filing" (`[data-tl="nav-filing-vat-filing"]`) | Purple highlight when active, normal text when inactive | Match |
| **Submenu Item 2** | "VAT Payments" (`[data-tl="nav-filing-vat-payments"]`) | Rendered in menu, skipped from clicking per prompt rules | Match |
| **Submenu Item 3** | "Self Assessment" (`[data-tl="nav-filing-self-assessment"]`) | Active highlight when on SA views | Match |
| **Submenu Item 4** | "MTD Income Tax" (`[data-tl="nav-filing-mtd-income-tax"]`) | Active highlight when on MTD view | Match |
| **Ending Screen** | Lands on VAT Filing overview page with Set up VAT card | `BooksVatFilingView` mounted | Match |

---

## Step 193: Set up VAT (Video 0:03 – 0:30)

| Element | Reference Video (0:03 – 0:30) | Built Component (`BooksVatFilingView.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Page Title** | "VAT Filing" (`text-2xl font-bold text-gray-900`) | Plain heading, no icon tile, no extra cards around page | Match |
| **Card Container** | Centered white card (~390px wide) with light border and subtle shadow | `border border-gray-200/90 rounded-2xl bg-white p-6 shadow-sm` | Match |
| **Card Header** | Small doc icon (`FileText`) + bold "Set up VAT" (`text-base font-bold`) | Icon in circle/inline + `text-base font-bold text-gray-900` | Match |
| **Card Description** | "Enter your HMRC VAT registration details to start preparing VAT returns." | `text-xs text-gray-500 mt-1 mb-5` | Match |
| **Field 1: Label** | "VAT Registration Number*" (red asterisk) | `<label className="text-xs font-medium text-gray-700">` | Match |
| **Field 1: Input** | White input, placeholder "e.g. 123456789" (`[data-tl="input-vat-number"]`) | Text input typed with "123456789" (valid 9-digit number) | Match |
| **Field 2: Label** | "VAT Scheme" (`text-xs font-medium text-gray-700`) | Plain normal-case label | Match |
| **Field 2: Dropdown** | Dropdown button (`[data-tl="select-vat-scheme"]`) showing "Standard (accrual)" with chevron | Clickable dropdown with options | Match |
| **Dropdown Options** | Options: "Standard (accrual)", "Cash accounting" | `[data-tl="vat-scheme-option-standard"]`, `[data-tl="vat-scheme-option-cash"]` | Match |
| **Action Button** | Full-width solid blue "Save & enable VAT" (`[data-tl="btn-save-vat-setup"]`) | `bg-[#145CFB] text-white rounded-lg font-medium text-sm py-2.5` | Match |
| **Success Toast** | Green toast: "VAT settings saved" | Standard Books toast | Match |
| **Resulting Page** | "VAT Filing" page with top-right blue "Prepare return" button (`[data-tl="btn-prepare-vat-return"]`) and empty state: "No VAT returns yet. Prepare a return for a period to get started." | Clean empty state view matching video frame 029 | Match |

---

## Step 194: Prepare a VAT Return (Video 0:30 – 1:05)

| Element | Reference Video (0:30 – 1:05) | Built Component (`BooksPrepareVatModal.tsx` & `BooksVatReturnDetailView.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Prepare Button** | Top-right blue button "+ Prepare return" (`[data-tl="btn-prepare-vat-return"]`) | `bg-[#145CFB] text-white text-xs font-semibold px-4 py-2 rounded-lg` | Match |
| **Modal Dialog** | "Prepare VAT return" with close X button | Modal card (~440px wide) centered over dark backdrop | Match |
| **Modal Intro** | "Choose the VAT period. The nine boxes are computed from your transactions using your VAT scheme." | `text-xs text-gray-500 leading-relaxed mt-1 mb-4` | Match |
| **Period Start** | "Period start*" with calendar icon (`[data-tl="input-vat-period-start"]`) | Date input opening calendar popover; picks 01/10/2026 | Match |
| **Period End** | "Period end*" with calendar icon (`[data-tl="input-vat-period-end"]`) | Date input opening calendar popover; picks 31/10/2026 | Match |
| **Modal Buttons** | Blue "Prepare" (`[data-tl="btn-modal-prepare-vat"]`) and Cancel (`[data-tl="btn-modal-cancel-vat"]`) | Bottom action bar | Match |
| **Success Toast** | Green toast: "VAT return prepared" | Standard Books toast | Match |
| **Return Detail: Back** | "← Back to VAT returns" (`[data-tl="btn-back-vat-returns"]`) | Thin breadcrumb link above title | Match |
| **Return Detail: Title** | "VAT return 2026-10-01_2026-10-31" | `text-xl font-bold text-gray-900` | Match |
| **Return Detail: Sub** | "01 Oct 2026 - 31 Oct 2026 · CASH basis" with orange "DRAFT" pill | `text-xs text-gray-500` + `bg-amber-50 text-amber-700 border border-amber-200` pill | Match |
| **Top Action Button** | Blue button with Lock icon: "Finalise" (`[data-tl="btn-finalise-vat-return"]`) | `bg-[#145CFB] text-white text-xs font-semibold px-4 py-2 rounded-lg` | Match |
| **Nine Boxes Table** | 9 rows, small "Box n" label on left, description middle, GBP amount on right. Box 5 (Net VAT) bold with shaded `#FBFBFB` background | Formatted with currency helper; Box 1 £1,240.00, Box 2 £0.00, Box 3 £1,240.00, Box 4 £412.50, Box 5 £827.50, Box 6 £6,200.00, Box 7 £2,062.50, Box 8 £0.00, Box 9 £0.00 | Match |
| **Treatment Cards** | Two bottom cards: "Sales by VAT treatment" and "Purchases by VAT treatment" | Replaces empty text with realistic sample rows (Standard rate 20%) | Match |
| **Scroll Action** | Downward scroll to treatment cards and back up to Finalise | `scrollView(tl, ...)` smooth scroll | Match |

---

## Step 195: Finalise and File a VAT Return (Video 1:05 – 1:25)

| Element | Reference Video (1:05 – 1:25) | Built Component (`BooksVatReturnDetailView.tsx` & `BooksMarkFiledModal.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Finalise Click** | Click "Finalise" (`[data-tl="btn-finalise-vat-return"]`) | Triggers finalise transition | Match |
| **Finalise Toast** | Green toast: "Return finalised" | Standard Books toast | Match |
| **Finalised State** | Status pill becomes blue "FINALISED" (`bg-blue-50 text-blue-700 border-blue-200`) | Pill updates dynamically | Match |
| **Updated Action Buttons**| Green button "Mark as filed" (`[data-tl="btn-mark-vat-filed"]`) and white button "Reopen" (`[data-tl="btn-reopen-vat-return"]`) | `bg-emerald-600 hover:bg-emerald-700 text-white` | Match |
| **Mark as Filed Modal**| "Mark as filed with HMRC" with close X | Modal card (~420px wide) | Match |
| **Modal Subtitle** | "Record that you filed this VAT return with HMRC." | `text-xs text-gray-500 mt-1 mb-4` | Match |
| **Reference Field** | "HMRC reference (optional)" input (`[data-tl="input-vat-hmrc-ref"]`) | Typed with "VAT-REF-2026-10" | Match |
| **Confirm Button** | Green button "Mark as filed" (`[data-tl="btn-confirm-vat-filed"]`), shows "Saving..." briefly | Button with loading state | Match |
| **Filed Toast** | Green toast: "Return marked as filed" | Standard Books toast | Match |
| **Filed State** | Pill becomes green "FILED" (`bg-emerald-50 text-emerald-700 border-emerald-200`) | Pill updates dynamically | Match |
| **Back Navigation** | Click "← Back to VAT returns" (`[data-tl="btn-back-vat-returns"]`) | Returns to `/vat-filing` list | Match |
| **Filed List Table** | Table with columns: Period, Scheme, Net VAT, Status (green "FILED" pill), Action ("View" link) | Shows the October filed return row | Match |

---

## Step 196: Generate a Self Assessment Return (Video 1:25 – 2:00)

| Element | Reference Video (1:25 – 2:00) | Built Component (`BooksSelfAssessmentView.tsx` & `BooksGenerateSaModal.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Page Heading** | "Self Assessment" (`text-2xl font-bold text-gray-900`) | Plain heading | Match |
| **Intro Text** | "Generate your Self Assessment return (SA103 self-employment + SA100 summary) from your trading profit for the tax year, then file it with HMRC and mark it filed." | `text-xs text-gray-500 leading-relaxed max-w-3xl mt-1 mb-6` | Match |
| **Top Action Button** | Blue button "+ Generate return" (`[data-tl="btn-generate-sa-return"]`) | Top right action button | Match |
| **Tabs** | "To Be Filed" (`[data-tl="tab-sa-to-be-filed"]`) and "All Filings" (`[data-tl="tab-sa-all-filings"]`) | Clickable tabs switching list views | Match |
| **Initial Table** | Row: "2025-26 | Net profit | Estimated tax | DRAFT | View" | Table rows with columns matching video | Match |
| **Modal Dialog** | "Generate Self Assessment return" with close X | Modal (~440px wide) | Match |
| **Modal Intro** | "The UK tax year runs 6 April to 5 April. Enter the year, e.g. 2025-26." | `text-xs text-gray-500 mt-1 mb-4` | Match |
| **Tax Year Field** | "Tax year*" placeholder "2025-26" (`[data-tl="input-sa-tax-year"]`) | Typed with "2024-25" | Match |
| **Modal Action** | Blue button "Generate" (`[data-tl="btn-modal-generate-sa"]`) and Cancel | Bottom action bar | Match |
| **Success Toast** | Green toast: "Self Assessment return generated" | Standard Books toast | Match |
| **Return Detail: Back** | "← Back to Self Assessment" (`[data-tl="btn-back-sa-returns"]`) | Breadcrumb back link | Match |
| **Return Detail: Title**| "Self Assessment 2024-25" | `text-xl font-bold text-gray-900` | Match |
| **Return Detail: Sub** | "06 Apr 2024 - 05 Apr 2025" with orange "DRAFT" pill | Sub-header row | Match |
| **Notice Banner** | Yellow alert banner: "The estimated tax is a guide based on your trading profit and the standard bands. HMRC produces the binding calculation. National Insurance, dividends and other income are not included here." | `bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800` | Match |
| **Calculated Rows** | Turnover: 48,000.00; Expenses: 15,200.00; Net profit: 32,800.00 (bold); Personal allowance: 12,570.00; Taxable profit: 20,230.00; Estimated income tax: 4,046.00 (bold) | Structured table with formatted GBP currency | Match |
| **Action Button** | Blue lock-icon "Finalise" button (`[data-tl="btn-finalise-sa-return"]`) | Top right action button | Match |

---

## Step 197: Finalise and File a Self Assessment Return (Video 2:00 – 2:25)

| Element | Reference Video (2:00 – 2:25) | Built Component (`BooksSelfAssessmentReturnDetailView.tsx` & `BooksMarkFiledModal.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Finalise Click** | Click "Finalise" (`[data-tl="btn-finalise-sa-return"]`) | Triggers finalise transition | Match |
| **Finalise Toast** | Green toast: "Return finalised" | Standard Books toast | Match |
| **Finalised State** | Pill becomes blue "FINALISED" | Pill updates dynamically | Match |
| **Updated Action Buttons**| Green button "Mark as filed" (`[data-tl="btn-mark-sa-filed"]`) and white "Reopen" | `bg-emerald-600 hover:bg-emerald-700 text-white` | Match |
| **Mark Filed Modal** | "Mark as filed with HMRC" with description "Record that you filed this Self Assessment return with HMRC." | Modal card (~420px wide) | Match |
| **Reference Field** | "HMRC reference (optional)" (`[data-tl="input-sa-hmrc-ref"]`) | Typed with "SA-REF-2024-25" | Match |
| **Confirm Action** | Green button "Mark as filed" (`[data-tl="btn-confirm-sa-filed"]`), shows "Saving..." briefly | Button with loading state | Match |
| **Filed Toast** | Green toast: "Return marked as filed" | Standard Books toast | Match |
| **Filed State** | Pill becomes green "FILED" | Pill updates dynamically | Match |
| **Back Navigation** | Click "← Back to Self Assessment" (`[data-tl="btn-back-sa-returns"]`) | Returns to list | Match |
| **All Filings Tab** | Shows "All Filings" tab with filed 2024-25 return (Status: green "FILED" pill) | Active tab shows the completed filing | Match |

---

## Step 198: Set up MTD for Income Tax (Video 2:25 – 2:48)

| Element | Reference Video (2:25 – 2:48) | Built Component (`BooksMtdIncomeTaxView.tsx` & `BooksMtdSettingsModal.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Page Heading** | "MTD for Income Tax" (`text-2xl font-bold text-gray-900`) | Plain heading | Match |
| **Intro Text** | "Making Tax Digital for Income Tax requires four quarterly income and expense updates to HMRC each tax year. Prepare each quarter from your books below; online submission to HMRC is part of the upcoming HMRC connection." | `text-xs text-gray-500 leading-relaxed max-w-3xl mt-1 mb-5` | Match |
| **Settings Button** | Top-right white button with Sliders icon: "Configure MTD Settings" (`[data-tl="btn-configure-mtd-settings"]`) | `border border-gray-200 text-gray-700 font-medium text-xs px-3.5 py-2 rounded-lg` | Match |
| **Notice Banner** | Yellow alert banner: "MTD for Income Tax isn't enabled yet. Configure your settings (National Insurance number and HMRC business ID) to get ready." | `bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 mb-6` | Match |
| **Controls Bar** | Label "Tax year", input "2026-27" (`[data-tl="input-mtd-tax-year"]`), blue button "Prepare quarters" (`[data-tl="btn-prepare-mtd-quarters"]`) | Inline controls | Match |
| **Initial Table** | Table headers: Quarter, Period, Income, Expenses, Net profit, Status, Action | Empty or uncalculated initial table rows | Match |
| **Settings Modal** | "MTD for Income Tax settings" with close X | Modal (~420px wide) | Match |
| **Checkbox** | "Enable MTD for Income Tax" (`[data-tl="checkbox-enable-mtd"]`) | Checkbox toggles checked state | Match |
| **NI Number Field** | "National Insurance number" placeholder "e.g. QQ123456C" (`[data-tl="input-mtd-ni-number"]`) | Typed with "QQ123456C" | Match |
| **HMRC ID Field** | "HMRC business ID (optional)" (`[data-tl="input-mtd-hmrc-id"]`) | Typed with "XAIT00000123456" | Match |
| **Modal Save Button**| Blue button "Save" (`[data-tl="btn-modal-save-mtd"]`) and Cancel | Bottom action bar | Match |
| **Success Toast** | Green toast: "MTD settings saved" | Standard Books toast | Match |
| **Notice Removal** | Yellow warning banner unmounts upon saving settings | Dynamic state update | Match |

---

## Step 199: Prepare and Submit MTD Quarters (Video 2:48 – 2:57)

| Element | Reference Video (2:48 – 2:57) | Built Component (`BooksMtdIncomeTaxView.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Prepare Action** | Click "Prepare quarters" (`[data-tl="btn-prepare-mtd-quarters"]`) | Triggers quarter computation | Match |
| **Prepare Toast** | Green toast: "Quarters prepared" | Standard Books toast | Match |
| **Filled Quarters** | Q1: 06 Apr - 06 Jul (£6,800.00 / £2,150.00 / £4,650.00), Q2: 06 Jul - 06 Oct (£7,350.00 / £2,480.00 / £4,870.00), Q3: 06 Oct - 06 Jan (£8,100.00 / £2,620.00 / £5,480.00), Q4: 06 Jan - 06 Apr (£7,900.00 / £2,550.00 / £5,350.00) | All rows populated with sample data formatted by money helper | Match |
| **Initial Q Status**| Status: orange "Open" pill (`bg-amber-50 text-amber-700 border-amber-200`) with blue text link "Mark submitted" | Rendered per quarter row | Match |
| **Submit Q1 Action** | Click "Mark submitted" on Q1 (`[data-tl="link-submit-mtd-q1"]`) | Submits Q1 | Match |
| **Submit Toast** | Green toast: "Quarter marked submitted" | Standard Books toast | Match |
| **Submitted Status**| Q1 status turns green "Submitted" pill (`bg-emerald-50 text-emerald-700 border-emerald-200`); blue link disappears. Q2-Q4 remain "Open" | Status and action link update dynamically | Match |
| **Step Conclusion** | Holds 1.5s on the result, then cleanly ends with `finishBooks` | Clean hold and finish | Match |
