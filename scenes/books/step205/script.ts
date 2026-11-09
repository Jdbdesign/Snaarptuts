import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP205_DURATION_MS = 19500;

export async function runStep205(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.reportsCenter, "reports-center", [0.4, 0.3], 205);

  tl.setVar("booksReportsCategory", "business-overview");
  tl.setVar("booksBsBasis", "Accrual");
  tl.setVar("booksBsRan", false);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openBalanceSheet);
  await pressOn(tl, "[data-tl=report-link-balance-sheet]");
  tl.setVar("booksView", "reports-balance-sheet");
  tl.setUrl(BOOKS_URLS.balanceSheet);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.runBalanceSheet);
  await pressOn(tl, "[data-tl=btn-bs-run]");
  tl.setVar("booksBsRan", true);
  await tl.wait(1200);

  tl.showCaption(CAPTIONS.openTrialBalance);
  await pressOn(tl, "[data-tl=btn-bs-back]");
  tl.setVar("booksView", "reports-center");
  tl.setVar("booksReportsCategory", "accountant");
  tl.setUrl(BOOKS_URLS.reportsCenter);
  await tl.wait(400);

  await pressOn(tl, "[data-tl=report-link-trial-balance]");
  tl.setVar("booksView", "reports-trial-balance");
  tl.setUrl(BOOKS_URLS.trialBalance);
  tl.setVar("booksTbRan", false);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.runTrialBalance);
  await pressOn(tl, "[data-tl=btn-tb-run]");
  tl.setVar("booksTbRan", true);
  await tl.wait(1200);

  tl.showCaption(CAPTIONS.openRecurringInvoices);
  await pressOn(tl, "[data-tl=btn-tb-back]");
  tl.setVar("booksView", "reports-center");
  tl.setVar("booksReportsCategory", "recurring-invoices");
  tl.setUrl(BOOKS_URLS.reportsCenter);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.viewRecurringDetails);
  await pressOn(tl, "[data-tl=report-link-recurring-invoice-details]");
  tl.setVar("booksView", "reports-recurring-invoice-details");
  tl.setUrl(BOOKS_URLS.recurringInvoiceDetails);
  await tl.wait(2000);

  await finishBooks(tl, STEP205_DURATION_MS);
}
