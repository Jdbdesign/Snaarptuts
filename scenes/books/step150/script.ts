import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP150_DURATION_MS = 9000;

export async function runStep150(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newExpense, "new-expense", [0.45, 0.35]);
  tl.setVar("booksExpenseAccount", "Cost of Goods Sold");

  await tl.at(400);
  tl.showCaption(CAPTIONS.enterAmount);
  await pressOn(tl, "[data-tl=input-expense-amount]");
  tl.setVar("booksExpenseAmount", "1000");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectAmountIs);
  await pressOn(tl, "[data-tl=radio-tax-exclusive]");
  tl.setVar("booksExpenseAmountIs", "Tax Exclusive");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectPaidThrough);
  await pressOn(tl, "[data-tl=select-expense-paid-through]");
  tl.setVar("booksExpensePaidThrough", "Undeposited Funds");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectTax);
  await pressOn(tl, "[data-tl=select-expense-tax]");
  tl.setVar("booksExpenseTax", "VAT Standard (20%)");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.reviewTotal);
  await ring(tl, "[data-tl=text-total-incl-tax]", 1400);

  await finishBooks(tl, STEP150_DURATION_MS);
}
