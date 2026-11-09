import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP202_DURATION_MS = 10000;

export async function runStep202(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.profitAndLoss, "reports-profit-and-loss", [0.4, 0.3], 202);

  tl.setVar("booksPnlRan", true);
  tl.setVar("booksPnlDrawerOpen", true);
  tl.setVar("booksPnlDateRange", "This Month");
  tl.setVar("booksPnlBasis", "Accrual");

  await tl.at(400);
  tl.showCaption(CAPTIONS.selectLastYear);
  await pressOn(tl, "[data-tl=chip-last-year]");
  tl.setVar("booksPnlDateRange", "Last Year");
  tl.setVar("booksPnlCustomFrom", "01/01/2025");
  tl.setVar("booksPnlCustomTo", "12/31/2025");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectCashBasis);
  await pressOn(tl, "[data-tl=select-custom-basis]");
  await tl.wait(200);
  tl.setVar("booksPnlBasis", "Cash");
  await tl.wait(350);

  tl.showCaption(CAPTIONS.runUpdatedReport);
  await pressOn(tl, "[data-tl=btn-drawer-run-report]");
  tl.setVar("booksPnlRan", true);
  await tl.wait(2000);

  await finishBooks(tl, STEP202_DURATION_MS);
}
