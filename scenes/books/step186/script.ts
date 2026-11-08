import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP186_DURATION_MS = 14000;

export async function runStep186(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.budgets, "budgets", [0.4, 0.3], 186);

  tl.setVar("booksAccountantExpanded", true);

  await tl.at(400);
  tl.showCaption(CAPTIONS.viewBudgets);
  await ring(tl, "[data-tl=btn-new-budget]", 1000);
  await tl.wait(200);

  tl.showCaption(CAPTIONS.openNewBudget);
  await pressOn(tl, "[data-tl=btn-new-budget]");
  tl.setVar("booksView", "new-budget");
  tl.setUrl(BOOKS_URLS.newBudget);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.clickName);
  await pressOn(tl, "[data-tl=input-budget-name]");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typeName);
  await tl.typeText("[data-tl=input-budget-name]", "Expenses");
  tl.setVar("booksNewBudgetName", "Expenses");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.openFiscalYear);
  await pressOn(tl, "[data-tl=select-budget-fiscal-year]");
  tl.setVar("booksNewBudgetYearOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectYear);
  await pressOn(tl, "[data-tl=opt-year-jan-2026---dec-2026]");
  tl.setVar("booksNewBudgetYear", "Jan 2026 - Dec 2026");
  tl.setVar("booksNewBudgetYearOpen", false);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.checkBalanceSheet);
  await pressOn(tl, "[data-tl=chk-include-balance-sheet]");
  tl.setVar("booksNewBudgetIncludeBalanceSheet", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.openAddAccounts);
  await pressOn(tl, "[data-tl=btn-add-accounts-income-expense]");
  tl.setVar("booksConfigAccountsModalOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectShipping);
  await pressOn(tl, "[data-tl=chk-config-shipping-charges]");
  tl.setVar("booksConfigAccountsSelected", ["Shipping Charges"]);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.selectLateFee);
  await pressOn(tl, "[data-tl=chk-config-late-fee-income]");
  tl.setVar("booksConfigAccountsSelected", ["Shipping Charges", "Late Fee Income"]);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.selectCogs);
  await pressOn(tl, "[data-tl=chk-config-cogs]");
  tl.setVar("booksConfigAccountsSelected", [
    "Shipping Charges",
    "Late Fee Income",
    "Cost of Goods Sold",
  ]);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.updateAccounts);
  await pressOn(tl, "[data-tl=btn-modal-update-accounts]");
  tl.setVar("booksConfigAccountsModalOpen", false);
  tl.setVar("booksNewBudgetIncome", ["Shipping Charges", "Late Fee Income"]);
  tl.setVar("booksNewBudgetExpense", ["Cost of Goods Sold", "Insurance"]);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.createBudget);
  await pressOn(tl, "[data-tl=btn-create-budget]");
  tl.setVar("booksView", "budget-detail");
  tl.setUrl(BOOKS_URLS.budgetDetails);
  await tl.wait(600);

  await finishBooks(tl, STEP186_DURATION_MS);
}
