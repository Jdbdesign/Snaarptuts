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

export const STEP148_DURATION_MS = 20300;

export async function runStep148(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vendors, "vendors", [0.1, 0.45], 148);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openRecurringExpenses);
  await pressOn(tl, "[data-tl=nav-purchases-recurring-expenses]");
  tl.setVar("booksView", "recurring-expenses");
  tl.setUrl(BOOKS_URLS.recurringExpenses);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ringToolbar);
  await ring(tl, "[data-tl=recurring-expenses-title]", 700);
  await ring(tl, "[data-tl=input-recurring-expenses-search]", 700);
  await ring(tl, "[data-tl=btn-new-recurring-expense]", 700);

  tl.showCaption(CAPTIONS.clickProfile);
  await pressOn(tl, "[data-tl=recurring-expense-row-rec-exp-1]");
  tl.setVar("booksView", "recurring-expense-detail");
  tl.setUrl(BOOKS_URLS.recurringExpenseDetails);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ringDetails);
  await ring(tl, "[data-tl=detail-frequency]", 600);
  await ring(tl, "[data-tl=detail-start-date]", 600);
  await ring(tl, "[data-tl=detail-expense-account]", 600);
  await ring(tl, "[data-tl=detail-amount]", 600);
  await ring(tl, "[data-tl=detail-paid-through]", 600);
  await ring(tl, "[data-tl=detail-vendor]", 600);

  tl.showCaption(CAPTIONS.scrollRest);
  await scrollView(tl, 450, 1000);
  await tl.wait(400);
  await ring(tl, "[data-tl=detail-status]", 600);
  await ring(tl, "[data-tl=detail-created]", 600);

  tl.showCaption(CAPTIONS.clickBack);
  await pressOn(tl, "[data-tl=btn-back-to-recurring-expenses]");
  tl.setVar("booksView", "recurring-expenses");
  tl.setUrl(BOOKS_URLS.recurringExpenses);
  await tl.wait(1000);

  await finishBooks(tl, STEP148_DURATION_MS);
}
