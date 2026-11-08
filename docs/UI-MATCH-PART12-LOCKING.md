# UI Match Audit: Step 189 (Transaction Locking)

**Reference Recording**: `C:\Users\HP\Downloads\1108(2).mp4` (7:20 – 7:37 / frames 430s – 457s)  
**Route**: `/tutorials/books` (Step 189: "Transaction Locking: overview & lock module")

---

## Screen A: Initial Landing View (Lock All Transactions)

| Element | Reference Video (430s - 440s) | Built Component (`BooksTransactionLockingView.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Page Background** | Plain white (`#FFFFFF`), no outer grey background or fake sticky header | `bg-white` container | Exact match |
| **Page Heading** | "Transaction Locking" (bold, dark grey/black, plain text, no icon tile, no subtitle) | `h1` `text-2xl font-bold text-gray-900 tracking-tight` | Exact match |
| **Description Paragraph** | 3-line grey paragraph (~680px wide): "Transaction locking prevents you and your users from making any changes to transactions that might affect your accounts. Once transactions are locked, users cannot edit, modify, or delete any transactions that were recorded before the specified date in this module." | `<p className="text-xs text-gray-500 leading-relaxed max-w-2xl mt-2">` with exact text | Exact match |
| **All Transactions Row** | Full-width rounded card (light grey border `#ECECEC`, rounded-2xl, no shadow, ~74px tall) | `border border-gray-200/90 rounded-2xl bg-white px-5 py-4.5 flex items-center justify-between` | Exact match |
| **Row Icon** | Circular light-grey tile (`#F6F6F6`, 40x40px, rounded-full) containing grey Lock icon | `w-10 h-10 rounded-full bg-[#F6F6F6]` with `<Lock className="w-4 h-4 text-gray-500" />` | Exact match |
| **Row Title** | "All Transactions" (bold text, dark) | `text-sm font-bold text-gray-900` | Exact match |
| **Row Subtitle** | "You have not opted to lock all transactions." (grey small text) | `text-xs text-gray-500 mt-0.5` | Exact match |
| **Row Right Action** | Blue text link "Lock" with small padlock icon on the left | `[data-tl="btn-lock-all-link"]` with `<Lock className="w-3.5 h-3.5" /> Lock` (`text-blue-600 font-semibold text-xs`) | Exact match |
| **Section Heading** | "Lock Individual Modules" (bold text, dark, ~32px below row) | `h2` `text-sm font-bold text-gray-900 mt-8` | Exact match |
| **Section Intro** | "You will be able to:" (small grey text) | `text-xs text-gray-500 mt-2 mb-2` | Exact match |
| **Bullet List** | 2 bullet items: "Select the modules (Sales, Purchases, Banking, Accountant) you wish to lock" & "Set different lock dates for each module" | `ul` `list-disc list-inside text-xs text-gray-500 space-y-1 mb-4` | Exact match |
| **Section Link** | Blue text link "Lock Individual Modules" with small padlock icon on the left | `[data-tl="link-lock-individual-modules"]` with `<Lock className="w-3.5 h-3.5" /> Lock Individual Modules` (`text-blue-600 font-semibold text-xs`) | Exact match |

---

## Screen B: Individual Modules View (Sales, Purchases, Banking, Accountant)

| Element | Reference Video (440s - 457s) | Built Component (`BooksTransactionLockingView.tsx`) | Match Status |
| :--- | :--- | :--- | :--- |
| **Page Heading & Subtitle** | Same "Transaction Locking" heading and grey 3-line paragraph | Identical top heading and paragraph maintained across both views | Exact match |
| **Modules Stack** | Four full-width white rounded cards (~74px tall, 12px gap) | `space-y-3 mt-8` container of 4 identical rows | Exact match |
| **Row 1: Sales** | Circle icon: Shopping cart; Title: "Sales"; Subtitle: "You have not locked the transactions in this module."; Right action: Blue link "Lock" with padlock | `ShoppingCart` icon in `#F6F6F6` circle, `[data-tl="link-lock-sales"]` right action | Exact match |
| **Row 2: Purchases** | Circle icon: Shopping bag; Title: "Purchases"; Subtitle: "You have not locked the transactions in this module."; Right action: Blue link "Lock" with padlock | `ShoppingBag` icon in `#F6F6F6` circle, `[data-tl="link-lock-purchases"]` right action | Exact match |
| **Row 3: Banking** | Circle icon: Landmark/Bank; Title: "Banking"; Subtitle: "You have not locked the transactions in this module."; Right action: Blue link "Lock" with padlock | `Landmark` icon in `#F6F6F6` circle, `[data-tl="link-lock-banking"]` right action | Exact match |
| **Row 4: Accountant** | Circle icon: Open book; Title: "Accountant"; Subtitle: "You have not locked the transactions in this module."; Right action: Blue link "Lock" with padlock | `BookOpen` icon in `#F6F6F6` circle, `[data-tl="link-lock-accountant"]` right action | Exact match |
| **Divider** | Thin subtle horizontal rule separating the modules list from the footer section | `border-t border-gray-200/80 my-7` | Exact match |
| **Footer Heading** | "Lock All Transactions At Once" (bold text, dark) | `h2` `text-sm font-bold text-gray-900 mb-1` | Exact match |
| **Footer Description** | "You can freeze all transactions at once instead of locking the Sales, Purchases, Banking and Account transactions individually." (grey small text) | `p` `text-xs text-gray-500 mb-3 max-w-2xl` | Exact match |
| **Footer Link** | Blue text link "Switch to Lock All Transactions →" | `[data-tl="link-switch-lock-all"]` with `<span>Switch to Lock All Transactions &rarr;</span>` | Exact match |

---

## Interaction Flow Audit

1. **Step Starts**: Lands on Screen A with Accountant menu open and Transaction Locking highlighted.
2. **Review All Transactions**: Cursors moves to All Transactions "Lock" link (`[data-tl="btn-lock-all-link"]`) and hovers.
3. **Switch to Modules**: Cursors glides to "Lock Individual Modules" (`[data-tl="link-lock-individual-modules"]`) and clicks it.
4. **Inspect Modules**: Screen transitions to Screen B. Cursor glides down across each module's "Lock" link:
   - `[data-tl="link-lock-sales"]`
   - `[data-tl="link-lock-purchases"]`
   - `[data-tl="link-lock-banking"]`
   - `[data-tl="link-lock-accountant"]`
5. **Review Switch Link**: Cursor moves to "Switch to Lock All Transactions →" (`[data-tl="link-switch-lock-all"]`) and hovers.
6. **Step Completes**: Clean finish with `finishBooks`. Zero invented dialogs or mock forms.
