import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP151_DURATION_MS = 7500;

export async function runStep151(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newExpense, "new-expense", [0.45, 0.45]);
  tl.setVar("booksExpenseAmount", "1000");
  tl.setVar("booksExpenseTax", "VAT Standard (20%)");

  await tl.at(400);
  tl.showCaption(CAPTIONS.selectVendor);
  await pressOn(tl, "[data-tl=select-expense-vendor]");
  tl.setVar("booksExpenseVendor", "Greenfield Packaging Ltd");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.enterReference);
  await pressOn(tl, "[data-tl=input-expense-ref]");
  tl.setVar("booksExpenseRef", "INV-1123");
  await tl.wait(800);

  await finishBooks(tl, STEP151_DURATION_MS);
}
