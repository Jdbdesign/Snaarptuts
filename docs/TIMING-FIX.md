# Books Tutorial Timing Fix: End-to-End Timing Audit

This audit records the precise measured runtime for all 158 Snaarp Books steps, eliminating all dead time at the end of each step while preserving a 1500 ms hold on the final result and 400 ms fade.

## Summary
- **Total Steps**: 158
- **Total Previous Duration**: 2,304,500 ms (38.41 minutes)
- **Total New Duration**: 2,997,300 ms (49.95 minutes)
- **Total Idle Time Removed**: -692,800 ms (-11.55 minutes)

| Step # | Step ID | Title | Old (ms) | New (ms) | Idle Removed (ms) |
| ---: | :--- | :--- | ---: | ---: | ---: |
| 1 | `books-find-way-around` | Books: Find your way around | 11,000 | 15,500 | -4,500 |
| 2 | `home-receivables-payables` | Home: Read your receivables and payables | 10,000 | 14,700 | -4,700 |
| 3 | `home-cashflow-period` | Home: Check cash flow by period | 12,000 | 21,000 | -9,000 |
| 4 | `home-watch-key-accounts` | Home: Watch key accounts (accrual or cash) | 12,000 | 20,200 | -8,200 |
| 5 | `home-recent-updates` | Home: See recent updates | 10,000 | 12,800 | -2,800 |
| 6 | `products-browse-filter` | Products: Browse and filter your items | 14,000 | 26,300 | -12,300 |
| 7 | `products-sort-list` | Products: Sort the item list | 14,000 | 30,800 | -16,800 |
| 8 | `products-show-hide-columns` | Products: Show or hide columns | 16,000 | 39,800 | -23,800 |
| 9 | `products-import-csv` | Products: Import items from a CSV file | 14,000 | 27,800 | -13,800 |
| 10 | `products-export-list` | Products: Export your item list | 12,000 | 25,800 | -13,800 |
| 11 | `products-refresh-list` | Products: Refresh the item list | 10,000 | 17,800 | -7,800 |
| 12 | `products-create-goods` | Products: Create a new item (goods) | 22,000 | 47,800 | -25,800 |
| 13 | `products-create-service` | Products: Create a service item | 16,000 | 36,200 | -20,200 |
| 14 | `products-open-details` | Products: Open an item's details | 12,000 | 13,700 | -1,700 |
| 15 | `products-check-transactions-history` | Products: Check an item's transactions and history | 10,000 | 13,800 | -3,800 |
| 16 | `products-edit-item` | Products: Edit an item | 12,000 | 17,700 | -5,700 |
| 17 | `products-clone-item` | Products: Clone an item | 12,000 | 17,300 | -5,300 |
| 18 | `products-toggle-active` | Products: Mark an item inactive and active again | 18,000 | 30,500 | -12,500 |
| 19 | `products-lock-unlock` | Products: Lock and unlock an item | 12,000 | 16,800 | -4,800 |
| 20 | `products-delete-single` | Products: Delete an item | 12,000 | 18,300 | -6,300 |
| 21 | `products-select-several` | Products: Select several items | 14,000 | 23,500 | -9,500 |
| 22 | `products-delete-several` | Products: Delete several items at once | 12,000 | 17,700 | -5,700 |
| 23 | `customers-open-list` | Customers: Open the customer list | 10,500 | 12,800 | -2,300 |
| 24 | `customers-search-filter` | Customers: Search and filter customers | 14,500 | 20,200 | -5,700 |
| 25 | `customers-add-business` | Customers: Add a business customer | 18,000 | 53,700 | -35,700 |
| 26 | `customers-add-address` | Customers: Add billing and shipping addresses | 16,000 | 41,800 | -25,800 |
| 27 | `customers-add-individual` | Customers: Add an individual customer with a contact person | 19,000 | 62,500 | -43,500 |
| 28 | `customers-import-csv` | Customers: Import customers from a CSV file | 13,500 | 23,000 | -9,500 |
| 29 | `customers-view-edit` | Customers: View and edit a customer's details | 14,500 | 21,800 | -7,300 |
| 30 | `customers-deactivate` | Customers: Deactivate a customer | 11,500 | 15,500 | -4,000 |
| 31 | `customers-reactivate` | Customers: Reactivate a customer | 12,000 | 16,300 | -4,300 |
| 32 | `customers-delete` | Customers: Delete a customer | 11,500 | 15,500 | -4,000 |
| 33 | `quotes-open-list` | Quotes: open the Quotes list | 10,000 | 16,800 | -6,800 |
| 34 | `quotes-search` | Quotes: search for a quote | 8,500 | 11,500 | -3,000 |
| 35 | `quotes-filter-status` | Quotes: filter quotes by status | 10,500 | 16,000 | -5,500 |
| 36 | `quotes-view-details` | Quotes: open a quote and read its details | 10,000 | 17,300 | -7,300 |
| 37 | `quotes-send-to-customer` | Quotes: send a quote to a customer | 7,500 | 17,200 | -9,700 |
| 38 | `quotes-download-pdf` | Quotes: download a quote as PDF | 7,000 | 9,500 | -2,500 |
| 39 | `quotes-preview-pdf` | Quotes: preview a quote PDF | 10,000 | 12,300 | -2,300 |
| 40 | `quotes-edit-quote` | Quotes: edit a quote and save changes | 14,000 | 27,200 | -13,200 |
| 41 | `quotes-delete-quote` | Quotes: delete a quote | 9,000 | 14,700 | -5,700 |
| 42 | `quotes-new-choose-customer` | Quotes: start a new quote and choose a customer | 8,000 | 15,700 | -7,700 |
| 43 | `quotes-configure-numbering` | Quotes: set up quote numbering | 8,500 | 14,300 | -5,800 |
| 44 | `quotes-reference-and-dates` | Quotes: set the reference and dates | 10,000 | 22,300 | -12,300 |
| 45 | `quotes-salesperson-project-subject` | Quotes: choose a salesperson, project and subject | 10,000 | 18,700 | -8,700 |
| 46 | `quotes-add-items-table` | Quotes: add items to the item table | 14,000 | 33,800 | -19,800 |
| 47 | `quotes-scan-barcode` | Quotes: scan an item by barcode | 9,000 | 17,800 | -8,800 |
| 48 | `quotes-bulk-items` | Quotes: add several items in bulk | 13,000 | 43,500 | -30,500 |
| 49 | `quotes-discount-shipping-adjustment` | Quotes: add discount, shipping and an adjustment | 10,000 | 24,300 | -14,300 |
| 50 | `quotes-notes-attachment-terms` | Quotes: add notes, an attachment and terms | 12,000 | 37,500 | -25,500 |
| 51 | `quotes-save-as-draft` | Quotes: save a quote as a draft | 8,000 | 15,500 | -7,500 |
| 52 | `quotes-save-and-send` | Quotes: save and send a quote | 8,000 | 11,000 | -3,000 |
| 53 | `invoices-open-list` | Invoices: open the invoices list | 6,000 | 8,700 | -2,700 |
| 54 | `invoices-search` | Invoices: search by customer or number | 6,000 | 9,700 | -3,700 |
| 55 | `invoices-filter-status` | Invoices: filter by status | 6,500 | 11,700 | -5,200 |
| 56 | `invoices-import-csv` | Invoices: import invoices from CSV | 7,500 | 22,000 | -14,500 |
| 57 | `invoices-view-details` | Invoices: view invoice details | 6,500 | 11,300 | -4,800 |
| 58 | `invoices-send-to-customer` | Invoices: send invoice to customer | 6,000 | 9,500 | -3,500 |
| 59 | `invoices-mark-paid` | Invoices: mark invoice as paid | 7,000 | 15,000 | -8,000 |
| 60 | `invoices-download-pdf` | Invoices: download invoice PDF | 5,500 | 7,800 | -2,300 |
| 61 | `invoices-preview-pdf` | Invoices: preview invoice PDF | 7,000 | 11,300 | -4,300 |
| 62 | `invoices-edit-invoice` | Invoices: edit invoice | 8,500 | 14,700 | -6,200 |
| 63 | `invoices-payment-plan-existing` | Invoices: review payment plan on an invoice | 6,500 | 8,000 | -1,500 |
| 64 | `invoices-delete-invoice` | Invoices: delete an invoice | 6,500 | 14,500 | -8,000 |
| 65 | `invoices-new-choose-customer` | Invoices: start a new invoice and choose customer | 7,000 | 13,500 | -6,500 |
| 66 | `invoices-configure-numbering` | Invoices: configure invoice numbering | 7,000 | 17,800 | -10,800 |
| 67 | `invoices-order-date-terms` | Invoices: set order number, dates, and payment terms | 7,500 | 20,800 | -13,300 |
| 68 | `invoices-ar-salesperson-subject` | Invoices: select accounts receivable and salesperson | 7,000 | 14,000 | -7,000 |
| 69 | `invoices-add-items-table` | Invoices: add line items manually | 8,500 | 18,300 | -9,800 |
| 70 | `invoices-scan-barcode` | Invoices: scan item or barcode | 7,500 | 20,700 | -13,200 |
| 71 | `invoices-bulk-items` | Invoices: add items in bulk | 8,000 | 19,300 | -11,300 |
| 72 | `invoices-discount-shipping-adjustment` | Invoices: apply discount, shipping, and adjustment | 8,000 | 15,300 | -7,300 |
| 73 | `invoices-notes-attachment-terms` | Invoices: add customer notes, attachment, and terms | 8,000 | 19,800 | -11,800 |
| 74 | `invoices-flexible-plan` | Invoices: configure a flexible payment plan | 7,000 | 13,800 | -6,800 |
| 75 | `invoices-scheduled-plan` | Invoices: configure a scheduled installment plan | 7,500 | 13,800 | -6,300 |
| 76 | `invoices-save-as-draft` | Invoices: save invoice as draft | 6,500 | 9,300 | -2,800 |
| 77 | `invoices-save-and-send` | Invoices: save and send invoice to customer | 8,000 | 10,500 | -2,500 |
| 78 | `books-receipts-open-list` | Sales Receipts: Open the receipts list | 7,500 | 10,000 | -2,500 |
| 79 | `books-receipts-search` | Sales Receipts: Search for a receipt | 7,000 | 8,000 | -1,000 |
| 80 | `books-receipts-view-details` | Sales Receipts: Open a receipt and read its details | 8,500 | 13,300 | -4,800 |
| 81 | `books-receipts-send` | Sales Receipts: Send a receipt to a customer | 6,000 | 7,800 | -1,800 |
| 82 | `books-receipts-download-pdf` | Sales Receipts: Download a receipt as PDF | 5,500 | 6,700 | -1,200 |
| 83 | `books-receipts-preview-pdf` | Sales Receipts: Preview a receipt PDF | 6,500 | 8,500 | -2,000 |
| 84 | `books-receipts-edit` | Sales Receipts: Edit a receipt and save changes | 8,500 | 14,000 | -5,500 |
| 85 | `books-receipts-new-choose-customer` | Sales Receipts: Start a new receipt and choose a customer | 6,500 | 9,700 | -3,200 |
| 86 | `books-receipts-date-and-numbering` | Sales Receipts: Set the date and receipt number | 8,000 | 15,800 | -7,800 |
| 87 | `books-receipts-choose-salesperson` | Sales Receipts: Choose a salesperson | 5,500 | 10,800 | -5,300 |
| 88 | `books-receipts-add-items` | Sales Receipts: Add items to the item table | 8,000 | 17,800 | -9,800 |
| 89 | `books-receipts-scan-item` | Sales Receipts: Scan an item by barcode | 6,500 | 14,700 | -8,200 |
| 90 | `books-receipts-bulk-items` | Sales Receipts: Add several items in bulk | 7,500 | 19,800 | -12,300 |
| 91 | `books-receipts-discount-shipping` | Sales Receipts: Add discount, shipping and an adjustment | 7,500 | 19,500 | -12,000 |
| 92 | `books-receipts-notes-and-attachment` | Sales Receipts: Add notes, an attachment and terms | 8,500 | 16,800 | -8,300 |
| 93 | `books-receipts-payment-details` | Sales Receipts: Choose how it was paid | 7,500 | 19,800 | -12,300 |
| 94 | `books-receipts-save` | Sales Receipts: Save a receipt | 6,500 | 9,500 | -3,000 |
| 95 | `books-receipts-save-and-send` | Sales Receipts: Save and send a receipt | 6,000 | 8,300 | -2,300 |
| 96 | `books-receipts-delete` | Sales Receipts: Delete a receipt | 8,000 | 14,700 | -6,700 |
| 97 | `books-recurring-empty-state` | Recurring Invoices: Start from the empty state | 7,500 | 11,800 | -4,300 |
| 98 | `books-recurring-customer-and-name` | Recurring Invoices: Choose a customer and name the profile | 8,000 | 11,700 | -3,700 |
| 99 | `books-recurring-frequency` | Recurring Invoices: Choose how often it repeats | 5,500 | 8,500 | -3,000 |
| 100 | `books-recurring-schedule-dates` | Recurring Invoices: Set the start and end dates | 7,500 | 11,500 | -4,000 |
| 101 | `books-recurring-terms-and-salesperson` | Recurring Invoices: Set terms, account and salesperson | 7,500 | 12,500 | -5,000 |
| 102 | `books-recurring-add-items` | Recurring Invoices: Add items | 7,500 | 10,700 | -3,200 |
| 103 | `books-recurring-bulk-items` | Recurring Invoices: Add several items in bulk | 7,500 | 18,700 | -11,200 |
| 104 | `books-recurring-totals-and-roundoff` | Recurring Invoices: Add discount, shipping, adjustment and round off | 8,000 | 11,800 | -3,800 |
| 105 | `books-recurring-notes-and-terms` | Recurring Invoices: Add notes and terms | 7,500 | 8,500 | -1,000 |
| 106 | `books-recurring-preferences` | Recurring Invoices: Choose how invoices are created | 7,500 | 16,700 | -9,200 |
| 107 | `books-recurring-save` | Recurring Invoices: Save a recurring invoice | 6,500 | 9,000 | -2,500 |
| 108 | `books-recurring-search-filter` | Recurring Invoices: Search and filter the list | 7,500 | 10,200 | -2,700 |
| 109 | `books-recurring-view-details` | Recurring Invoices: Open a profile and read its details | 8,000 | 12,500 | -4,500 |
| 110 | `books-recurring-edit-and-delete` | Recurring Invoices: Edit and delete recurring profile | 9,500 | 19,200 | -9,700 |
| 111 | `books-payments-open-list` | Payments Received: Open payments list | 5,500 | 8,200 | -2,700 |
| 112 | `books-payments-search` | Payments Received: Search payments | 5,500 | 7,500 | -2,000 |
| 113 | `books-payments-open-details` | Payments Received: Open payment details | 5,500 | 8,200 | -2,700 |
| 114 | `books-payments-send-receipt` | Payments Received: Send receipt | 5,500 | 6,300 | -800 |
| 115 | `books-payments-download-pdf` | Payments Received: Download PDF | 5,500 | 6,500 | -1,000 |
| 116 | `books-payments-preview-pdf` | Payments Received: Preview PDF | 6,500 | 8,800 | -2,300 |
| 117 | `books-payments-edit` | Payments Received: Edit payment | 7,500 | 10,500 | -3,000 |
| 118 | `books-payments-record-open` | Payments Received: Open Record Payment | 5,500 | 8,000 | -2,500 |
| 119 | `books-payments-record-customer` | Payments Received: Select customer | 6,000 | 7,700 | -1,700 |
| 120 | `books-payments-record-amount` | Payments Received: Enter amount & bank charges | 6,000 | 8,300 | -2,300 |
| 121 | `books-payments-record-details` | Payments Received: Numbering, mode & deposit | 7,000 | 19,700 | -12,700 |
| 122 | `books-payments-record-apply` | Payments Received: Apply to unpaid invoices | 6,000 | 8,800 | -2,800 |
| 123 | `books-payments-record-notes-attach` | Payments Received: Notes, attachments & thank you | 8,000 | 20,200 | -12,200 |
| 124 | `books-payments-save-paid` | Payments Received: Save as paid | 6,500 | 12,800 | -6,300 |
| 125 | `books-payments-delete` | Payments Received: Delete a payment | 6,500 | 11,500 | -5,000 |
| 126 | `books-credit-notes-open-list` | Credit Notes: Open credit notes list | 5,500 | 8,300 | -2,800 |
| 127 | `books-credit-notes-open-new` | Credit Notes: Create new credit note | 5,500 | 8,700 | -3,200 |
| 128 | `books-credit-notes-customer` | Credit Notes: Select customer | 5,500 | 6,200 | -700 |
| 129 | `books-credit-notes-details` | Credit Notes: Details & salesperson | 7,500 | 15,800 | -8,300 |
| 130 | `books-credit-notes-items` | Credit Notes: Add line items & accounts | 6,500 | 13,300 | -6,800 |
| 131 | `books-credit-notes-bulk-items` | Credit Notes: Add items in bulk | 7,000 | 14,200 | -7,200 |
| 132 | `books-credit-notes-totals` | Credit Notes: Discount, shipping & adjustments | 6,000 | 10,000 | -4,000 |
| 133 | `books-credit-notes-notes-terms` | Credit Notes: Customer notes & terms | 6,500 | 8,300 | -1,800 |
| 134 | `books-credit-notes-save-open` | Credit Notes: Save and open | 6,500 | 10,300 | -3,800 |
| 135 | `vendors-list-browse-filter` | Vendors: browse, search and filter the list | 38,000 | 26,800 | 11,200 |
| 136 | `vendors-details-update` | Vendors: open a vendor and update it | 36,000 | 23,500 | 12,500 |
| 137 | `vendors-create-contact-details` | Vendors: create a vendor, step 1 contact details | 48,000 | 54,500 | -6,500 |
| 138 | `vendors-create-other-details` | Vendors: create a vendor, step 2 other details | 42,000 | 27,000 | 15,000 |
| 139 | `vendors-create-address-details` | Vendors: create a vendor, step 3 address | 50,000 | 54,800 | -4,800 |
| 140 | `vendors-create-contacts-save` | Vendors: create a vendor, step 4 contact persons and save | 48,000 | 49,000 | -1,000 |
| 141 | `vendors-deactivate-delete` | Vendors: deactivate and delete a vendor | 40,000 | 21,500 | 18,500 |
| 142 | `expenses-list-filter-views` | Expenses: open the list and filter with views | 40,000 | 32,200 | 7,800 |
| 143 | `expenses-record-details-amount` | Expenses: record an expense, part 1 | 45,000 | 31,800 | 13,200 |
| 144 | `expenses-record-vendor-save` | Expenses: record an expense, part 2 and save | 45,000 | 51,200 | -6,200 |
| 145 | `expenses-record-mileage` | Expenses: record mileage | 46,000 | 37,200 | 8,800 |
| 146 | `expenses-bulk-add-save` | Expenses: add several expenses in bulk | 52,000 | 66,200 | -14,200 |
| 147 | `expenses-delete-record` | Expenses: delete an expense | 35,000 | 11,000 | 24,000 |
| 148 | `recurring-expenses-list-read` | Recurring expenses: open the list and read a profile | 46,000 | 20,300 | 25,700 |
| 149 | `recurring-expenses-create-schedule` | Recurring expenses: create a profile, schedule | 45,000 | 25,300 | 19,700 |
| 150 | `recurring-expenses-create-amounts-save` | Recurring expenses: create a profile, amounts and save | 56,000 | 40,700 | 15,300 |
| 151 | `recurring-expenses-delete-profile` | Recurring expenses: delete a profile | 36,000 | 11,300 | 24,700 |
| 152 | `bills-browse-filter-views` | Bills: browse, filter and switch views | 60,000 | 36,700 | 23,300 |
| 153 | `bills-open-read` | Bills: open a bill and read it | 64,000 | 27,000 | 37,000 |
| 154 | `bills-send-preview-download` | Bills: send, preview and download a bill | 40,000 | 17,000 | 23,000 |
| 155 | `bills-create-vendor-dates` | Bills: create a bill, vendor and dates | 50,000 | 37,500 | 12,500 |
| 156 | `bills-create-items-totals` | Bills: create a bill, items and totals | 62,000 | 48,000 | 14,000 |
| 157 | `bills-create-notes-save` | Bills: create a bill, notes and save | 52,000 | 31,500 | 20,500 |
| 158 | `bills-delete` | Bills: delete a bill | 36,000 | 11,500 | 24,500 |
