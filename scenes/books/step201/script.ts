import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP201_DURATION_MS = 14500;

export async function runStep201(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.reportsCenter, "reports-center", [0.4, 0.3], 201);

  tl.setVar("booksReportsCategory", "all");
  tl.setVar("booksPnlRan", false);
  tl.setVar("booksPnlDrawerOpen", false);
  tl.setVar("booksPnlDateRange", "This Month");
  tl.setVar("booksPnlBasis", "Accrual");
  tl.setVar("booksPnlCompareWith", "None");

  await tl.at(400);
  tl.showCaption(CAPTIONS.openPnl);
  await pressOn(tl, "[data-tl=report-link-profit-and-loss]");
  tl.setVar("booksView", "reports-profit-and-loss");
  tl.setUrl(BOOKS_URLS.profitAndLoss);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectDateRange);
  await pressOn(tl, "[data-tl=select-date-range]");
  tl.setVar("booksPnlDateRangeOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=date-range-option-this-month]");
  tl.setVar("booksPnlDateRange", "This Month");
  tl.setVar("booksPnlDateRangeOpen", false);
  await tl.wait(350);

  tl.showCaption(CAPTIONS.selectBasis);
  await pressOn(tl, "[data-tl=select-report-basis]");
  tl.setVar("booksPnlBasisOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=basis-option-accrual]");
  tl.setVar("booksPnlBasis", "Accrual");
  tl.setVar("booksPnlBasisOpen", false);
  await tl.wait(350);

  tl.showCaption(CAPTIONS.selectCompare);
  await pressOn(tl, "[data-tl=select-compare-with]");
  tl.setVar("booksPnlCompareOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=compare-option-none]");
  tl.setVar("booksPnlCompareWith", "None");
  tl.setVar("booksPnlCompareOpen", false);
  await tl.wait(350);

  tl.showCaption(CAPTIONS.runReport);
  await pressOn(tl, "[data-tl=btn-run-report]");
  tl.setVar("booksPnlRan", true);
  tl.setVar("booksPnlDrawerOpen", true);
  await tl.wait(2000);

  await finishBooks(tl, STEP201_DURATION_MS);
}
