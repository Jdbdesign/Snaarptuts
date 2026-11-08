import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_BUDGETS, type Budget } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP188_DURATION_MS = 8500;

export async function runStep188(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.budgets, "budgets", [0.4, 0.3], 188);

  tl.setVar("booksAccountantExpanded", true);

  const budgetExpenses: Budget = {
    id: "b-exp",
    name: "Expenses",
    fiscalYear: "Jan 2026 - Dec 2026",
    period: "Monthly",
    createdAt: "08/11/2026",
    status: "Active",
  };
  tl.setVar("booksBudgets", [budgetExpenses, ...INITIAL_BUDGETS]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openActions);
  await pressOn(tl, "[data-tl=btn-budget-actions-0]");
  tl.setVar("booksBudgetActionsOpen", "0");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.clickDelete);
  await pressOn(tl, "[data-tl=opt-delete-budget-0]");
  tl.setVar("booksBudgetActionsOpen", null);
  tl.setVar("booksBudgetConfirmOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.confirmDelete);
  await pressOn(tl, "[data-tl=btn-confirm-delete-budget]");
  tl.setVar("booksBudgetConfirmOpen", false);
  tl.setVar("booksBudgets", INITIAL_BUDGETS);
  tl.toast("Budget deleted successfully");
  await tl.wait(600);

  await finishBooks(tl, STEP188_DURATION_MS);
}
