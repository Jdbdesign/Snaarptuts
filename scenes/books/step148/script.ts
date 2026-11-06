import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP148_DURATION_MS = 8000;

export async function runStep148(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.expenses, "expenses", [0.45, 0.35]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openExpense);
  await pressOn(tl, "[data-tl=expense-row-0]");
  tl.setVar("booksView", "expense-details");
  tl.setUrl(BOOKS_URLS.expenseDetails);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.reviewCard);
  await ring(tl, "[data-tl=card-expense-details]", 1400);

  tl.showCaption(CAPTIONS.backToList);
  await pressOn(tl, "[data-tl=btn-back-to-expenses]");
  tl.setVar("booksView", "expenses");
  tl.setUrl(BOOKS_URLS.expenses);
  await tl.wait(600);

  await finishBooks(tl, STEP148_DURATION_MS);
}
