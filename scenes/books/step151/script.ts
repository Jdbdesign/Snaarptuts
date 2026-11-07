import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_RECURRING_EXPENSES } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP151_DURATION_MS = 11300;

export async function runStep151(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.recurringExpenses, "recurring-expenses", [0.92, 0.25], 151);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickTrash);
  await pressOn(tl, "[data-tl=btn-delete-rec-exp-rec-exp-2]");
  tl.setVar("booksRecExpenseConfirmOpen", true);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ringConfirm);
  await ring(tl, "[data-tl=modal-rec-confirm]", 1000);

  tl.showCaption(CAPTIONS.clickConfirm);
  await pressOn(tl, "[data-tl=btn-confirm-rec-delete]");
  tl.setVar("booksRecExpenseConfirmOpen", false);
  tl.setVar("booksRecurringExpenses", INITIAL_RECURRING_EXPENSES);
  tl.setVar("booksToastText", "Deleted Monthly Office Supplies");
  tl.setVar("booksToastOpen", true);

  tl.showCaption(CAPTIONS.verifyDeleted);
  await tl.wait(1500);

  await finishBooks(tl, STEP151_DURATION_MS);
}
