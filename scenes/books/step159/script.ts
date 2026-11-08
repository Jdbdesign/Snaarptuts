import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_RECURRING_BILLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP159_DURATION_MS = 20000;

export async function runStep159(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.bills, "bills", [0.1, 0.48], 159);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openRecurringBills);
  await pressOn(tl, "[data-tl=nav-purchases-recurring-bills]");
  tl.setVar("booksView", "recurring-bills");
  tl.setUrl(BOOKS_URLS.recurringBills);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.filterStatusPaused);
  await pressOn(tl, "[data-tl=btn-recurring-bill-status-dropdown]");
  tl.setVar("booksRecurringBillStatusDropdownOpen", true);
  await tl.wait(500);
  await pressOn(tl, "[data-tl=opt-rec-bill-status-paused]");
  tl.setVar("booksRecurringBillStatusFilter", "Paused");
  tl.setVar("booksRecurringBillStatusDropdownOpen", false);
  await tl.wait(800);

  tl.showCaption(CAPTIONS.ringEmptyLifecycle);
  await ring(tl, "[data-tl=chip-lifecycle-active]", 500);
  await ring(tl, "[data-tl=chip-lifecycle-paused]", 500);
  await ring(tl, "[data-tl=chip-lifecycle-expired]", 500);
  await ring(tl, "[data-tl=chip-lifecycle-draft]", 500);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.resetStatusFilter);
  await pressOn(tl, "[data-tl=btn-recurring-bill-status-dropdown]");
  tl.setVar("booksRecurringBillStatusDropdownOpen", true);
  await tl.wait(500);
  await pressOn(tl, "[data-tl=opt-rec-bill-status-all]");
  tl.setVar("booksRecurringBillStatusFilter", "Status");
  tl.setVar("booksRecurringBillStatusDropdownOpen", false);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.openOfficeCleaning);
  await pressOn(tl, "[data-tl=row-rec-bill-office-cleaning]");
  tl.setVar("booksActiveRecurringBill", INITIAL_RECURRING_BILLS[0]);
  tl.setVar("booksView", "recurring-bill-detail");
  tl.setUrl(BOOKS_URLS.recurringBillDetails);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.ringDetailsCard);
  await ring(tl, "[data-tl=recurring-bill-details-card]", 1200);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.returnToList);
  await pressOn(tl, "[data-tl=btn-recurring-bill-back-to-list]");
  tl.setVar("booksView", "recurring-bills");
  tl.setUrl(BOOKS_URLS.recurringBills);
  await tl.wait(1000);

  await finishBooks(tl, STEP159_DURATION_MS);
}
