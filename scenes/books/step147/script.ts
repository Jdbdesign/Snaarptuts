import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_EXPENSES } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP147_DURATION_MS = 35000;

export async function runStep147(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.expenses, "expenses", [0.45, 0.35]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickDelete);
  await pressOn(tl, "[data-tl=btn-delete-expense-exp-1]");
  tl.setVar("booksExpenseConfirmOpen", true);
  tl.setVar("booksExpenseToDeleteLabel", "11/2/2026");
  tl.setVar("booksExpenseToDeleteId", "exp-1");
  await tl.wait(800);

  tl.showCaption(CAPTIONS.confirmPrompt);
  await ring(tl, "[data-tl=modal-expense-confirm]", 800);

  tl.showCaption(CAPTIONS.clickConfirm);
  await pressOn(tl, "[data-tl=btn-confirm-expense-delete]");
  tl.setVar("booksExpenseConfirmOpen", false);
  tl.setVar("booksExpenses", INITIAL_EXPENSES.filter((e) => e.id !== "exp-1"));
  tl.setVar("booksToastText", "Expense deleted");
  tl.setVar("booksToastOpen", true);

  tl.showCaption(CAPTIONS.deletedToast);
  await tl.wait(1500);

  await finishBooks(tl, STEP147_DURATION_MS);
}
