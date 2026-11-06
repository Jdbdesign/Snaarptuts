import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
  typeIntoVar,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP143_DURATION_MS = 45000;

export async function runStep143(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.expenses, "expenses", [0.45, 0.35]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickNew);
  await pressOn(tl, "[data-tl=btn-new-expense]");
  tl.setVar("booksView", "new-expense");
  tl.setUrl(BOOKS_URLS.newExpense);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.openCalendar);
  await pressOn(tl, "[data-tl=input-expense-date]");
  tl.setVar("booksExpenseDatePickerOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=date-day-5]");
  tl.setVar("booksExpenseDate", "11/05/2026");
  tl.setVar("booksExpenseDatePickerOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.pickEmployee);
  await pressOn(tl, "[data-tl=select-expense-employee]");
  tl.setVar("booksExpenseEmployeeOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-employee-none]");
  tl.setVar("booksExpenseEmployee", "None");
  tl.setVar("booksExpenseEmployeeOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.pickAccount);
  await pressOn(tl, "[data-tl=select-expense-account]");
  tl.setVar("booksExpenseAccountOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-account-cogs]");
  tl.setVar("booksExpenseAccount", "Cost of Goods Sold");
  tl.setVar("booksExpenseAccountOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeAmount);
  await pressOn(tl, "[data-tl=input-expense-amount]");
  await typeIntoVar(tl, "[data-tl=input-expense-amount]", "booksExpenseAmount", "1000", { msPerChar: 65 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.pickTaxExclusive);
  await pressOn(tl, "[data-tl=radio-tax-exclusive]");
  tl.setVar("booksExpenseAmountIs", "Tax Exclusive");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.pickPaidThrough);
  await pressOn(tl, "[data-tl=select-expense-paid-through]");
  tl.setVar("booksExpensePaidThroughOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-paidthrough-undeposited]");
  tl.setVar("booksExpensePaidThrough", "Undeposited Funds");
  tl.setVar("booksExpensePaidThroughOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.pickTax);
  await pressOn(tl, "[data-tl=select-expense-tax]");
  tl.setVar("booksExpenseTaxOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-tax-vat-20]");
  tl.setVar("booksExpenseTax", "VAT Standard (20%)");
  tl.setVar("booksExpenseTaxOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.reviewTotal);
  await ring(tl, "[data-tl=text-total-incl-tax]", 1400);

  await finishBooks(tl, STEP143_DURATION_MS);
}
