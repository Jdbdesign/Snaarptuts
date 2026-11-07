import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP142_DURATION_MS = 32200;

export async function runStep142(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.dashboard, "home", [0.15, 0.45]);
  tl.setVar("booksPurchasesExpanded", false);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickPurchases);
  await pressOn(tl, "[data-tl=nav-books-purchases]");
  tl.setVar("booksPurchasesExpanded", true);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.clickExpenses);
  await pressOn(tl, "[data-tl=nav-purchases-expenses]");
  tl.setVar("booksView", "expenses");
  tl.setUrl(BOOKS_URLS.expenses);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.exploreHeader);
  await ring(tl, "[data-tl=title-expenses-view]", 800);
  await ring(tl, "[data-tl=btn-expenses-import]", 800);
  await ring(tl, "[data-tl=btn-new-expense]", 800);
  await ring(tl, "[data-tl=table-expenses]", 1000);

  tl.showCaption(CAPTIONS.filterInvoiced);
  await pressOn(tl, "[data-tl=btn-expense-views-dropdown]");
  await tl.wait(600);
  await pressOn(tl, "[data-tl=view-opt-invoiced]");
  tl.setVar("booksExpenseViewName", "Invoiced");
  await tl.wait(700);

  tl.showCaption(CAPTIONS.reviewFlow);
  await ring(tl, "[data-tl=diagram-expense-lifecycle]", 1200);

  tl.showCaption(CAPTIONS.filterWithReceipts);
  await pressOn(tl, "[data-tl=btn-expense-views-dropdown]");
  await tl.wait(600);
  await pressOn(tl, "[data-tl=view-opt-with-receipts]");
  tl.setVar("booksExpenseViewName", "With Receipts");
  await tl.wait(700);

  tl.showCaption(CAPTIONS.restoreAll);
  await pressOn(tl, "[data-tl=btn-expense-views-dropdown]");
  await tl.wait(600);
  await pressOn(tl, "[data-tl=view-opt-all]");
  tl.setVar("booksExpenseViewName", "All Expenses");
  await tl.wait(700);

  tl.showCaption(CAPTIONS.openDetails);
  await pressOn(tl, "[data-tl=expense-row-exp-1]");
  tl.setVar("booksView", "expense-details");
  tl.setUrl(BOOKS_URLS.expenseDetails);
  await tl.wait(800);
  await ring(tl, "[data-tl=card-expense-details]", 1000);

  tl.showCaption(CAPTIONS.backToList);
  await pressOn(tl, "[data-tl=btn-back-to-expenses]");
  tl.setVar("booksView", "expenses");
  tl.setUrl(BOOKS_URLS.expenses);
  await tl.wait(800);

  await finishBooks(tl, STEP142_DURATION_MS);
}
