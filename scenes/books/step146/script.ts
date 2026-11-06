import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP146_DURATION_MS = 8000;

export async function runStep146(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.dashboard, "home", [0.15, 0.45]);
  tl.setVar("booksPurchasesExpanded", true);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickExpenses);
  await pressOn(tl, "[data-tl=nav-purchases-expenses]");
  tl.setVar("booksView", "expenses");
  tl.setUrl(BOOKS_URLS.expenses);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.exploreControls);
  await ring(tl, "[data-tl=title-expenses-view]", 900);
  await ring(tl, "[data-tl=btn-expenses-import]", 800);
  await ring(tl, "[data-tl=btn-new-expense]", 800);

  tl.showCaption(CAPTIONS.reviewTable);
  await ring(tl, "[data-tl=table-expenses]", 1400);

  await finishBooks(tl, STEP146_DURATION_MS);
}
