import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  scrollView,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP158_DURATION_MS = 9500;

export async function runStep158(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newExpense, "new-expense", [0.45, 0.20]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openBulkTab);
  await pressOn(tl, "[data-tl=tab-bulk-add-expenses]");
  tl.setVar("booksExpenseFormTab", "bulk");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.fillRow1);
  await pressOn(tl, "[data-tl=bulk-account-0]");
  await pressOn(tl, "[data-tl=bulk-amount-0]");
  await pressOn(tl, "[data-tl=bulk-paid-through-0]");
  await pressOn(tl, "[data-tl=bulk-vendor-0]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.fillRow2);
  await pressOn(tl, "[data-tl=bulk-date-1]");
  await pressOn(tl, "[data-tl=bulk-account-1]");
  await pressOn(tl, "[data-tl=bulk-amount-1]");
  await pressOn(tl, "[data-tl=bulk-paid-through-1]");
  await pressOn(tl, "[data-tl=bulk-vendor-1]");
  await tl.wait(500);

  await scrollView(tl, 200, 400);
  tl.showCaption(CAPTIONS.clickSave, { target: "[data-tl=btn-save-bulk-expenses]" });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=btn-save-bulk-expenses]", { ring: false });
  await tl.wait(800);

  await finishBooks(tl, STEP158_DURATION_MS);
}
