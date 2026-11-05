import type { Timeline } from "@/lib/timeline";
import { BOOKS_URLS, type BooksPage } from "./books-data";

/** Move onto an element, ring it, click it and clear the ring. */
export async function pressOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number; ring?: boolean } = {}
) {
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 650, dx: opts.dx, dy: opts.dy });
  if (opts.ring !== false) tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
}

/** Move onto an element and hover it, without clicking. */
export async function hoverOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number } = {}
) {
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 450, dx: opts.dx, dy: opts.dy });
  tl.hover(sel);
}

/** Ring an element for a moment (no click). */
export async function ring(tl: Timeline, sel: string, ms = 1200) {
  tl.highlight(sel);
  await tl.wait(ms);
  tl.clearHighlight();
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
