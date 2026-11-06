import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP147_DURATION_MS = 9000;

export async function runStep147(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.expenses, "expenses", [0.25, 0.15]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openDropdown);
  await pressOn(tl, "[data-tl=btn-expense-views-dropdown]");
  tl.setVar("booksExpenseViewsDropdownOpen", true);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.pickInvoiced);
  await pressOn(tl, "[data-tl=view-opt-invoiced]");
  tl.setVar("booksExpenseViewName", "Invoiced");
  tl.setVar("booksExpenseViewsDropdownOpen", false);
  await tl.wait(500);
  await ring(tl, "[data-tl=card-expenses-empty-state]", 1200);

  tl.showCaption(CAPTIONS.pickWithReceipts);
  await pressOn(tl, "[data-tl=btn-expense-views-dropdown]");
  tl.setVar("booksExpenseViewsDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=view-opt-with-receipts]");
  tl.setVar("booksExpenseViewName", "With Receipts");
  tl.setVar("booksExpenseViewsDropdownOpen", false);
  await tl.wait(500);
  await ring(tl, "[data-tl=card-expenses-empty-state]", 1200);

  tl.showCaption(CAPTIONS.restoreAll);
  await pressOn(tl, "[data-tl=btn-expense-views-dropdown]");
  tl.setVar("booksExpenseViewsDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=view-opt-all]");
  tl.setVar("booksExpenseViewName", "All Expenses");
  tl.setVar("booksExpenseViewsDropdownOpen", false);
  await tl.wait(600);

  await finishBooks(tl, STEP147_DURATION_MS);
}
