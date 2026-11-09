import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  hoverOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP203_DURATION_MS = 17500;

export async function runStep203(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.reportsCenter, "reports-center", [0.4, 0.3], 203);

  tl.setVar("booksReportsCategory", "sales");
  tl.setVar("booksSalesIncludeReturns", false);
  tl.setVar("booksSalesRan", false);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openSalesByCustomer);
  await pressOn(tl, "[data-tl=report-link-sales-by-customer]");
  tl.setVar("booksView", "reports-sales-by-customer");
  tl.setUrl(BOOKS_URLS.salesByCustomer);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.checkReturns);
  await pressOn(tl, "[data-tl=chk-include-returns]");
  tl.setVar("booksSalesIncludeReturns", true);
  await tl.wait(350);

  tl.showCaption(CAPTIONS.runSalesReport);
  await pressOn(tl, "[data-tl=btn-run-report]");
  tl.setVar("booksSalesRan", true);
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=customer-link-1]", { ms: 500 });
  await tl.wait(1000);

  tl.showCaption(CAPTIONS.returnToReceivables);
  await pressOn(tl, "[data-tl=btn-sales-back]");
  tl.setVar("booksView", "reports-center");
  tl.setVar("booksReportsCategory", "receivables");
  tl.setUrl(BOOKS_URLS.reportsCenter);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.openCustomerBalance);
  await pressOn(tl, "[data-tl=report-link-customer-balance-summary]");
  tl.setVar("booksView", "reports-customer-balance-summary");
  tl.setUrl(BOOKS_URLS.customerBalanceSummary);
  tl.setVar("booksCustBalRan", false);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.runCustomerBalance);
  await pressOn(tl, "[data-tl=btn-custbal-run]");
  tl.setVar("booksCustBalRan", true);
  await tl.wait(2000);

  await finishBooks(tl, STEP203_DURATION_MS);
}
