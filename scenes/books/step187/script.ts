import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP187_DURATION_MS = 10000;

export async function runStep187(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.budgetDetails, "budget-detail", [0.4, 0.3], 187);

  tl.setVar("booksAccountantExpanded", true);

  await tl.at(400);
  tl.showCaption(CAPTIONS.viewGrid);
  await ring(tl, "[data-tl=btn-prefill-actuals]", 1000);
  await tl.wait(200);

  tl.showCaption(CAPTIONS.clickPrefill);
  await pressOn(tl, "[data-tl=btn-prefill-actuals]");
  const prefilled: Record<string, number> = {};
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 12; c++) {
      prefilled[`${r}-${c}`] = (r + 1) * 250 + (c % 3) * 50;
    }
  }
  tl.setVar("booksBudgetGridValues", prefilled);
  tl.toast("Pre-filled actuals from previous year");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.clickCell);
  await pressOn(tl, "[data-tl=input-cell-0-0]");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typeCell);
  await tl.typeText("[data-tl=input-cell-0-0]", "750");
  prefilled["0-0"] = 750;
  tl.setVar("booksBudgetGridValues", { ...prefilled });
  await tl.wait(400);

  tl.showCaption(CAPTIONS.saveGrid);
  await pressOn(tl, "[data-tl=btn-save-budget-grid]");
  tl.toast("Budget saved successfully");
  await tl.wait(600);

  // Hold 2000 ms for financial totals as required by Rule
  await finishBooks(tl, STEP187_DURATION_MS, 2000);
}
