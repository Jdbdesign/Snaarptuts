import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
  scrollView,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP154_DURATION_MS = 7500;

export async function runStep154(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newExpense, "new-expense", [0.45, 0.85]);
  tl.setVar("booksExpenseAmount", "1000");
  tl.setVar("booksExpenseTax", "VAT Standard (20%)");
  tl.setVar("booksExpenseVendor", "Greenfield Packaging Ltd");
  tl.setVar("booksExpenseRef", "INV-1123");
  tl.setVar("booksExpenseCustomer", "Acme Foods Ltd");
  tl.setVar("booksExpenseBillable", true);

  await tl.at(400);
  await scrollView(tl, 300, 400);
  tl.showCaption(CAPTIONS.clickSave, { target: "[data-tl=btn-save-expense]" });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=btn-save-expense]", { ring: false });
  await tl.wait(800);

  tl.showCaption(CAPTIONS.viewInList);
  await ring(tl, "[data-tl=expense-row-0]", 1400);
  await tl.wait(400);

  await finishBooks(tl, STEP154_DURATION_MS);
}
