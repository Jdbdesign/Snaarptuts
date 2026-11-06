import { CancelledError, type Timeline } from "@/lib/timeline";
import {
  BOOKS_URLS,
  type BooksPage,
  INITIAL_ACTIVE_CUSTOMERS,
  INITIAL_INACTIVE_CUSTOMERS,
  INITIAL_QUOTES,
  INITIAL_INVOICES,
  INITIAL_RECEIPTS,
  INITIAL_RECURRING_INVOICES,
} from "./books-data";

/** Move onto an element, ring it, click it and clear the ring. */
export async function pressOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number; ring?: boolean } = {}
) {
  if (tl.getVar<boolean>("__booksStepEnded", false)) return;
  try {
    await tl.moveCursorTo(sel, { ms: opts.ms ?? 650, dx: opts.dx, dy: opts.dy });
    if (opts.ring !== false) tl.highlight(sel);
    await tl.wait(150);
    await tl.click(sel);
    tl.clearHighlight();
  } catch (err: unknown) {
    if (err instanceof CancelledError) throw err;
    const sceneId = tl.getVar<string>("__sceneId", "books-step");
    console.error(
      `[Books Safety Net]: target "${sel}" not found in ${sceneId}. Ending step gracefully.`
    );
    tl.setVar("__booksStepEnded", true);
    tl.hideCaption();
    tl.clearHighlight();
    tl.setVar("fade", true);
  }
}

/** Move onto an element and hover it, without clicking. */
export async function hoverOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number } = {}
) {
  if (tl.getVar<boolean>("__booksStepEnded", false)) return;
  try {
    await tl.moveCursorTo(sel, { ms: opts.ms ?? 450, dx: opts.dx, dy: opts.dy });
    tl.hover(sel);
  } catch (err: unknown) {
    if (err instanceof CancelledError) throw err;
    const sceneId = tl.getVar<string>("__sceneId", "books-step");
    console.error(
      `[Books Safety Net]: target "${sel}" not found in ${sceneId}. Ending step gracefully.`
    );
    tl.setVar("__booksStepEnded", true);
    tl.hideCaption();
    tl.clearHighlight();
    tl.setVar("fade", true);
  }
}

/** Ring an element for a moment (no click). */
export async function ring(tl: Timeline, sel: string, ms = 1200) {
  if (tl.getVar<boolean>("__booksStepEnded", false)) return;
  try {
    tl.highlight(sel);
    await tl.wait(ms);
    tl.clearHighlight();
  } catch (err: unknown) {
    if (err instanceof CancelledError) throw err;
  }
}

/** The quick white fade every step ends with. */
export async function endFade(tl: Timeline, atMs: number, endMs: number) {
  await tl.at(atMs);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(endMs);
}

/**
 * Resets Snaarp Books scene variables to a clean starting state for any step.
 * Crucial: Always calls tl.placeCursor(...) first so the pointer is visible
 * from the very first frame before any caption or animation begins.
 */
export function beginBooks(
  tl: Timeline,
  url: string = BOOKS_URLS.dashboard,
  page: BooksPage = "home",
  cursor: [number, number] = [0.45, 0.35]
) {
  tl.placeCursor(cursor[0], cursor[1]);
  tl.setUrl(url);
  tl.setVar("booksView", page);
  tl.setVar("booksPage", page);
  tl.setVar("fade", false);
  tl.setVar("__booksStepEnded", false);

  // Home state
  tl.setVar("booksHomeTab", "dashboard");
  tl.setVar("booksCashFlowPeriod", "This Month");
  tl.setVar("booksWatchlistBasis", "Accrual");

  // Products view state
  tl.setVar("booksFilterTab", "active"); // 'active' | 'inactive' | 'all'
  tl.setVar("booksSearchQuery", "");
  tl.setVar("booksSearchOpen", false);
  tl.setVar("booksSortBy", "date-desc"); // 'date-desc' | 'name-asc' | 'selling-desc'
  tl.setVar("booksMenuOpen", false); // "..." menu
  tl.setVar("booksSortDrawerOpen", false);
  tl.setVar("booksColumnsDrawerOpen", false);
  tl.setVar("booksImportDrawerOpen", false);
  tl.setVar("booksExportDrawerOpen", false);
  tl.setVar("booksActiveTitleMenuOpen", false); // Title dropdown (Active / Inactive / All)

  // Visible columns
  tl.setVar("booksColPurchaseDesc", true);
  tl.setVar("booksColPurchaseRate", true);
  tl.setVar("booksColDesc", true);
  tl.setVar("booksColRate", true);
  tl.setVar("booksColUnit", true);
  tl.setVar("booksColResized", false);

  // Selection & bulk
  tl.setVar("booksSelectedIds", []);
  tl.setVar("booksConfirmOpen", false);
  tl.setVar("booksConfirmText", "");
  tl.setVar("booksConfirmDeleting", false);

  // Pickers & Modals
  tl.setVar("booksImagePickerOpen", false);
  tl.setVar("booksCsvPickerOpen", false);
  tl.setVar("booksCsvSelectedFile", "");
  tl.setVar("booksImporting", false);
  tl.setVar("booksExporting", false);
  tl.setVar("booksExportDownloaded", false);
  tl.setVar("booksRefreshing", false);

  // Item Details / More Menu state
  tl.setVar("booksActiveItemId", "food-farm-1");
  tl.setVar("booksDetailsTab", "overview");
  tl.setVar("booksMoreMenuOpen", false);
  tl.setVar("booksItemLocked", false);
  tl.setVar("booksItemStatus", "active"); // 'active' | 'inactive'
  tl.setVar("booksItemRate", 200.0);
  tl.setVar("booksHasClonedItem", false);

  // Form State
  tl.setVar("booksFormName", "");
  tl.setVar("booksFormType", "goods");
  tl.setVar("booksFormUnit", "");
  tl.setVar("booksFormUnitOpen", false);
  tl.setVar("booksFormImage", "");
  tl.setVar("booksFormSellingPrice", "");
  tl.setVar("booksFormSalesAccount", "");
  tl.setVar("booksFormSalesAccountOpen", false);
  tl.setVar("booksFormSalesDesc", "");
  tl.setVar("booksFormSalesTax", "VAT Standard (20%)");
  tl.setVar("booksFormCostPrice", "");
  tl.setVar("booksFormPurchaseAccount", "");
  tl.setVar("booksFormPurchaseAccountOpen", false);
  tl.setVar("booksFormPurchaseDesc", "");
  tl.setVar("booksFormPurchaseTax", "VAT Standard (20%)");
  tl.setVar("booksFormVendor", "");
  tl.setVar("booksFormVendorOpen", false);
  tl.setVar("booksFormError", false);
  tl.setVar("booksFormSaving", false);

  // Dynamic items list flags
  tl.setVar("booksItemsImported", false);
  tl.setVar("booksItemRefreshed", false);
  tl.setVar("booksItemFoodFarmAdded", false);
  tl.setVar("booksItemConsultingAdded", false);
  tl.setVar("booksItemFoodFarmCloned", false);
  tl.setVar("booksItemFoodFarmCopyDeleted", false);
  tl.setVar("booksBulkItemsDeleted", false);

  // Sales, Customers, Quotes & Invoices state
  const isInvoicePage =
    page === "invoices" ||
    page === "new-invoice" ||
    page === "invoice-detail" ||
    page === "edit-invoice";

  const isReceiptPage =
    page === "receipts" ||
    page === "new-receipt" ||
    page === "receipt-detail" ||
    page === "edit-receipt";

  const isRecurringPage =
    page === "recurring" ||
    page === "new-recurring" ||
    page === "recurring-detail" ||
    page === "edit-recurring";

  const isSalesPage =
    page === "customers" ||
    page === "new-customer" ||
    page === "customer-detail" ||
    page === "quotes" ||
    page === "new-quote" ||
    page === "quote-detail" ||
    page === "edit-quote" ||
    isInvoicePage ||
    isReceiptPage ||
    isRecurringPage;
  tl.setVar("booksSalesExpanded", isSalesPage);
  tl.setVar("booksCustomers", INITIAL_ACTIVE_CUSTOMERS);
  tl.setVar("booksInactiveCustomers", INITIAL_INACTIVE_CUSTOMERS);
  tl.setVar("booksCustomerFilter", "active");
  tl.setVar("booksCustomerSearch", "");
  tl.setVar("booksCustomerStatusDropdownOpen", false);
  tl.setVar("booksCustomerImportDrawerOpen", false);
  tl.setVar("booksCustomerCsvPickerOpen", false);
  tl.setVar("booksCustomerCsvSelectedFile", "");
  tl.setVar("booksCustomerImporting", false);
  tl.setVar("booksActiveCustomer", INITIAL_ACTIVE_CUSTOMERS[1]); // Brightway Stores
  tl.setVar("booksNewCustomerType", "business");
  tl.setVar("booksNewCustomerTab", "other");

  // Quotes state
  tl.setVar("booksQuotes", INITIAL_QUOTES);
  tl.setVar("booksQuoteFilter", "all");
  tl.setVar("booksQuoteSearch", "");
  tl.setVar("booksQuoteStatusDropdownOpen", false);
  tl.setVar("booksActiveQuote", INITIAL_QUOTES[0]); // QT-0008
  tl.setVar("booksQuoteNumberingDialogOpen", false);
  tl.setVar("booksQuoteAutoGenerate", true);
  tl.setVar("booksQuotePrefix", "QT-");
  tl.setVar("booksQuoteNextNumber", "000001");
  tl.setVar("booksQuoteScanDialogOpen", false);
  tl.setVar("booksQuoteScanInput", "");
  tl.setVar("booksQuoteBulkItemsDialogOpen", false);
  tl.setVar("booksQuoteBulkSearch", "");
  tl.setVar("booksQuoteBulkSelected", []);
  tl.setVar("booksQuotePdfPreviewOpen", false);
  tl.setVar("booksQuoteConfirmDialogOpen", false);
  tl.setVar("booksQuoteConfirmQuoteId", "");
  tl.setVar("booksQuoteFilePickerOpen", false);
  tl.setVar("booksQuoteFiles", []);
  tl.setVar("booksQuoteDate", "11/04/2026");
  tl.setVar("booksQuoteExpiryDate", "11/18/2026");
  tl.setVar("booksQuoteDatePickerOpen", false);
  tl.setVar("booksQuoteExpiryDatePickerOpen", false);
  tl.setVar("booksQuoteCustomer", "");
  tl.setVar("booksQuoteSalesperson", "None");
  tl.setVar("booksQuoteProject", "None");
  tl.setVar("booksQuoteSubject", "");
  // one blank row, exactly as the New Quote form opens (an empty list leaves the item table with no row to click)
  tl.setVar("booksQuoteLineItems", [
    { id: "initial-row", name: "", quantity: 1, rate: 0, tax: "Select a Tax", amount: 0 },
  ]);
  tl.setVar("booksQuoteDiscount", 0);
  tl.setVar("booksQuoteShipping", 0);
  tl.setVar("booksQuoteAdjustment", 0);
  tl.setVar("booksQuoteCustomerNotes", "Looking forward for your business.");
  tl.setVar("booksQuoteTerms", "");
  tl.setVar("booksQuoteSending", false);
  tl.setVar("booksQuotePreparingPdf", false);
  tl.setVar("booksQuoteCustomerDropdownOpen", false);
  tl.setVar("booksQuoteSalespersonDropdownOpen", false);
  tl.setVar("booksQuoteProjectDropdownOpen", false);
  tl.setVar("booksQuoteItemDropdownOpen", null);
  tl.setVar("booksQuoteTaxDropdownOpen", null);

  // Invoices state
  tl.setVar("booksInvoices", INITIAL_INVOICES);
  tl.setVar("booksInvoiceFilter", "all");
  tl.setVar("booksInvoiceSearch", "");
  tl.setVar("booksInvoiceStatusDropdownOpen", false);
  tl.setVar("booksActiveInvoice", INITIAL_INVOICES[1]); // INV10008
  tl.setVar("booksInvoiceNumberingDialogOpen", false);
  tl.setVar("booksInvoiceAutoGenerate", true);
  tl.setVar("booksInvoicePrefix", "INV");
  tl.setVar("booksInvoiceNextNumber", "10013");
  tl.setVar("booksInvoiceScanDialogOpen", false);
  tl.setVar("booksInvoiceScanInput", "");
  tl.setVar("booksInvoiceBulkItemsDialogOpen", false);
  tl.setVar("booksInvoiceBulkSearch", "");
  tl.setVar("booksInvoiceBulkSelected", []);
  tl.setVar("booksInvoicePdfPreviewOpen", false);
  tl.setVar("booksInvoiceConfirmDialogOpen", false);
  tl.setVar("booksInvoiceMarkPaidDialogOpen", false);
  tl.setVar("booksInvoiceFilePickerOpen", false);
  tl.setVar("booksInvoiceImportDrawerOpen", false);
  tl.setVar("booksInvoiceCsvPickerOpen", false);
  tl.setVar("booksInvoiceCsvSelectedFile", "");
  tl.setVar("booksInvoiceFiles", []);
  tl.setVar("booksInvoiceDate", "11/5/2026");
  tl.setVar("booksInvoiceDueDate", "12/5/2026");
  tl.setVar("booksInvoiceTerms", "Net 30");
  tl.setVar("booksInvoiceOrderNumber", "");
  tl.setVar("booksInvoiceAR", "Accounts Receivable");
  tl.setVar("booksInvoiceSalesperson", "None");
  tl.setVar("booksInvoiceSubject", "");
  tl.setVar("booksInvoiceCustomer", "");
  // one blank row, exactly as the New Invoice form opens
  tl.setVar("booksInvoiceLineItems", [
    { id: "initial-row", name: "", quantity: 1, rate: 0, tax: "Select a Tax", amount: 0 },
  ]);
  tl.setVar("booksInvoiceDiscount", 0);
  tl.setVar("booksInvoiceShipping", 0);
  tl.setVar("booksInvoiceAdjustment", 0);
  tl.setVar("booksInvoiceCustomerNotes", "Thanks for your business.");
  tl.setVar(
    "booksInvoiceTermsText",
    "Payment is due within 30 days of the invoice date. Late payments may be subject to a fee."
  );
  tl.setVar("booksInvoicePlanType", "none"); // "none" | "flexible" | "scheduled"
  tl.setVar("booksInvoicePlanPin", "");
  tl.setVar("booksInvoiceInstallments", []);
  tl.setVar("booksInvoiceSending", false);
  tl.setVar("booksInvoicePreparingPdf", false);
  tl.setVar("booksInvoiceCustomerDropdownOpen", false);
  tl.setVar("booksInvoiceTermsDropdownOpen", false);
  tl.setVar("booksInvoiceSalespersonDropdownOpen", false);
  tl.setVar("booksInvoiceARDropdownOpen", false);

  // Sales Receipts state (steps 78-96)
  tl.setVar("booksReceipts", INITIAL_RECEIPTS);
  tl.setVar("booksReceiptSearch", "");
  tl.setVar("booksActiveReceipt", INITIAL_RECEIPTS[0]); // SR-00002
  tl.setVar("booksReceiptSending", false);
  tl.setVar("booksReceiptPreparingPdf", false);
  tl.setVar("booksReceiptNumberingDialogOpen", false);
  tl.setVar("booksReceiptAutoGenerate", true);
  tl.setVar("booksReceiptPrefix", "SR-");
  tl.setVar("booksReceiptNextNumber", "00003");
  tl.setVar("booksReceiptPdfPreviewOpen", false);
  tl.setVar("booksReceiptConfirmDialogOpen", false);
  tl.setVar("booksReceiptScanDialogOpen", false);
  tl.setVar("booksReceiptScanInput", "");
  tl.setVar("booksReceiptBulkItemsDialogOpen", false);
  tl.setVar("booksReceiptBulkSearch", "");
  tl.setVar("booksReceiptBulkSelected", []);
  tl.setVar("booksReceiptFilePickerOpen", false);
  tl.setVar("booksReceiptDate", "11/05/2026");
  tl.setVar("booksReceiptNumber", "SR-00003");
  tl.setVar("booksReceiptCustomer", "");
  tl.setVar("booksReceiptSalesperson", "None");
  tl.setVar("booksReceiptPaymentMode", "Bank Transfer");
  tl.setVar("booksReceiptDepositTo", "Bank Account");
  tl.setVar("booksReceiptReference", "");
  // Start with one blank row so input-item-select-0 is always in the DOM
  tl.setVar("booksReceiptLineItems", [
    { id: "row-0", name: "", quantity: 1, rate: 0, tax: "VAT Standard (20%)", amount: 0 },
  ]);
  tl.setVar("booksReceiptDiscount", 0);
  tl.setVar("booksReceiptShipping", 0);
  tl.setVar("booksReceiptAdjustment", 0);
  tl.setVar("booksReceiptCustomerNotes", "");
  tl.setVar("booksReceiptTerms", "");
  tl.setVar("booksReceiptFiles", []);
  tl.setVar("booksReceiptCustomerDropdownOpen", false);
  tl.setVar("booksReceiptPaymentModeDropdownOpen", false);
  tl.setVar("booksReceiptDepositToDropdownOpen", false);
  tl.setVar("booksReceiptSalespersonDropdownOpen", false);
  tl.setVar("booksReceiptDatePickerOpen", false);

  // Recurring Invoices state (steps 97-110)
  tl.setVar("booksRecurringEmpty", false);
  tl.setVar("booksRecurringInvoices", INITIAL_RECURRING_INVOICES);
  tl.setVar("booksRecurringSearch", "");
  tl.setVar("booksRecurringStatusFilter", "all");
  tl.setVar("booksActiveRecurring", INITIAL_RECURRING_INVOICES[0]); // Monthly Retainer
  tl.setVar("booksRecurringConfirmDialogOpen", false);
  tl.setVar("booksRecurringPreferencesDialogOpen", false);
  tl.setVar("booksRecurringPreferences", "Create Invoices as Drafts");
  tl.setVar("booksRecurringProfileName", "");
  tl.setVar("booksRecurringCustomer", "");
  tl.setVar("booksRecurringOrderNumber", "");
  tl.setVar("booksRecurringFrequency", "Month");
  tl.setVar("booksRecurringStartDate", "11/05/2026");
  tl.setVar("booksRecurringNeverExpires", true);
  tl.setVar("booksRecurringEndDate", "11/05/2027");
  tl.setVar("booksRecurringTerms", "Net 15");
  tl.setVar("booksRecurringAR", "Accounts Receivable");
  tl.setVar("booksRecurringSalesperson", "None");
  tl.setVar("booksRecurringSubject", "");
  // Start with one blank row so input-item-select-0 is always in the DOM
  tl.setVar("booksRecurringLineItems", [
    { id: "row-0", name: "", quantity: 1, rate: 0, tax: "VAT Standard (20%)", amount: 0 },
  ]);
  tl.setVar("booksRecurringDiscount", 0);
  tl.setVar("booksRecurringShipping", 0);
  tl.setVar("booksRecurringAdjustment", 0);
  tl.setVar("booksRecurringRoundOff", 0);
  tl.setVar("booksRecurringCustomerNotes", "");
  tl.setVar("booksRecurringTermsText", "");
  tl.setVar("booksRecurringCustomerDropdownOpen", false);
  tl.setVar("booksRecurringFrequencyDropdownOpen", false);
  tl.setVar("booksRecurringTermsDropdownOpen", false);
  tl.setVar("booksRecurringSalespersonDropdownOpen", false);
  tl.setVar("booksRecurringStartDatePickerOpen", false);
  tl.setVar("booksRecurringEndDatePickerOpen", false);
  tl.setVar("booksRecurringBulkItemsDialogOpen", false);
  tl.setVar("booksRecurringBulkSearch", "");
  tl.setVar("booksRecurringBulkSelected", []);

  // Toast state
  tl.setVar("booksToastOpen", false);
  tl.setVar("booksToastText", "");
}

/**
 * Standard ending for a Snaarp Books step.
 */
export async function finishBooks(tl: Timeline, totalDurationMs: number) {
  await tl.at(totalDurationMs - 400);
  tl.setVar("fade", true);
  await tl.wait(400);
}

/** Scroll the current Books page (the view's own scrolling panel) to a position. Waits for the view to mount first. */
export async function scrollView(tl: Timeline, top: number, ms = 1000) {
  await tl.waitForElement("[data-scroller=true]");
  await tl.scrollPanelTo("[data-scroller=true]", top, ms);
}
