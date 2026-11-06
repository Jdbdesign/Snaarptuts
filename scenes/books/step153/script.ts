import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP153_DURATION_MS = 7500;

export async function runStep153(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newExpense, "new-expense", [0.45, 0.65]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.selectCustomer);
  await pressOn(tl, "[data-tl=select-expense-customer]");
  tl.setVar("booksExpenseCustomer", "Acme Foods Ltd");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.markBillable);
  await pressOn(tl, "[data-tl=check-expense-billable]");
  tl.setVar("booksExpenseBillable", true);
  await tl.wait(800);

  await finishBooks(tl, STEP153_DURATION_MS);
}
