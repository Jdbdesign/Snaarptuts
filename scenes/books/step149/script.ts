import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP149_DURATION_MS = 8500;

export async function runStep149(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.expenses, "expenses", [0.85, 0.15]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickNew);
  await pressOn(tl, "[data-tl=btn-new-expense]");
  tl.setVar("booksView", "new-expense");
  tl.setUrl(BOOKS_URLS.newExpense);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.confirmDate);
  await pressOn(tl, "[data-tl=input-expense-date]");
  tl.setVar("booksExpenseDate", "11/05/2026");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectEmployee);
  await pressOn(tl, "[data-tl=select-expense-employee]");
  tl.setVar("booksExpenseEmployee", "None");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectAccount);
  await pressOn(tl, "[data-tl=select-expense-account]");
  tl.setVar("booksExpenseAccount", "Cost of Goods Sold");
  await tl.wait(800);

  await finishBooks(tl, STEP149_DURATION_MS);
}
