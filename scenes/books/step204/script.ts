import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  scrollView,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP204_DURATION_MS = 18500;

export async function runStep204(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.reportsCenter, "reports-center", [0.4, 0.3], 204);

  tl.setVar("booksReportsCategory", "taxes");
  tl.setVar("booksTaxRan", false);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openTaxSummary);
  await pressOn(tl, "[data-tl=report-link-tax-summary]");
  tl.setVar("booksView", "reports-tax-summary");
  tl.setUrl(BOOKS_URLS.taxSummary);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.runTaxReport);
  await pressOn(tl, "[data-tl=btn-tax-run]");
  tl.setVar("booksTaxRan", true);
  await tl.wait(1200);

  tl.showCaption(CAPTIONS.returnToCurrency);
  await pressOn(tl, "[data-tl=btn-tax-back]");
  tl.setVar("booksView", "reports-center");
  tl.setVar("booksReportsCategory", "currency");
  tl.setUrl(BOOKS_URLS.reportsCenter);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.openRealizedGain);
  await pressOn(tl, "[data-tl=report-link-realized-gain-loss]");
  tl.setVar("booksView", "reports-realized-gain-loss");
  tl.setUrl(BOOKS_URLS.realizedGainLoss);
  await tl.wait(1200);

  tl.showCaption(CAPTIONS.openBudgetVsActuals);
  await pressOn(tl, "[data-tl=btn-fx-back]");
  tl.setVar("booksView", "reports-center");
  tl.setVar("booksReportsCategory", "budget");
  tl.setUrl(BOOKS_URLS.reportsCenter);
  await tl.wait(400);

  await pressOn(tl, "[data-tl=report-link-budget-vs-actuals]");
  tl.setVar("booksView", "reports-budget-vs-actuals");
  tl.setUrl(BOOKS_URLS.budgetVsActuals);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.scrollBudgetTable);
  await pressOn(tl, "[data-tl=select-bva-budget]");
  tl.setVar("booksBvaBudget", "Expenses (FY2026)");
  await tl.wait(350);
  await pressOn(tl, "[data-tl=select-bva-basis]");
  tl.setVar("booksBvaBasis", "Accrual");
  await tl.wait(400);

  await scrollView(tl, 300);
  await tl.wait(2000);

  await finishBooks(tl, STEP204_DURATION_MS);
}
