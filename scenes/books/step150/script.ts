import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_RECURRING_EXPENSES } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP150_DURATION_MS = 40700;

export async function runStep150(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newRecurringExpense, "new-recurring-expense", [0.45, 0.45], 150);

  await tl.at(400);
  tl.showCaption(CAPTIONS.selectExpenseAccount);
  await pressOn(tl, "[data-tl=select-rec-expense-account]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-rec-account-advertising]");
  tl.setVar("booksRecExpenseAccount", "Advertising and Marketing");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeAmount);
  await pressOn(tl, "[data-tl=input-rec-amount]");
  await tl.typeText("450", "[data-tl=input-rec-amount]");
  tl.setVar("booksRecAmount", "450");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectTaxExclusive);
  await pressOn(tl, "[data-tl=radio-rec-tax-exclusive]");
  tl.setVar("booksRecAmountIs", "Tax Exclusive");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectTax);
  await pressOn(tl, "[data-tl=select-rec-tax]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-rec-tax-vat20]");
  tl.setVar("booksRecTax", "VAT Standard (20%)");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectPaidThrough);
  await pressOn(tl, "[data-tl=select-rec-paid-through]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-rec-paid-undeposited]");
  tl.setVar("booksRecPaidThrough", "Undeposited Funds");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectVendor);
  await pressOn(tl, "[data-tl=select-rec-vendor]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-rec-vendor-greenfield]");
  tl.setVar("booksRecVendor", "Greenfield Packaging Ltd");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeNotes);
  await pressOn(tl, "[data-tl=textarea-rec-notes]");
  await tl.typeText(
    "Stationery, printer paper and breakroom essentials",
    "[data-tl=textarea-rec-notes]"
  );
  tl.setVar("booksRecNotes", "Stationery, printer paper and breakroom essentials");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectCustomer);
  await pressOn(tl, "[data-tl=select-rec-customer]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-rec-customer-acme]");
  tl.setVar("booksRecCustomerName", "Acme Foods Ltd");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.clickSave);
  await pressOn(tl, "[data-tl=btn-save-recurring-expense]");
  await tl.wait(600);
  tl.setVar("booksRecurringExpenses", [
    {
      id: "rec-exp-2",
      profileName: "Monthly Office Supplies",
      frequency: "Month",
      amount: 450.0,
      status: "Active",
      startDate: "11/07/2026",
      employee: "Jane Doe",
      repeatEvery: "Month",
      neverExpires: true,
      expenseAccount: "Advertising and Marketing",
      amountIs: "Tax Exclusive",
      tax: "VAT Standard (20%)",
      paidThrough: "Undeposited Funds",
      vendor: "Greenfield Packaging Ltd",
      notes: "Stationery, printer paper and breakroom essentials",
      customerName: "Acme Foods Ltd",
      created: "11/07/2026",
    },
    ...INITIAL_RECURRING_EXPENSES.filter((p) => p.id !== "rec-exp-2"),
  ]);
  tl.setVar("booksToastText", "Recurring expense created successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksView", "recurring-expenses");
  tl.setUrl(BOOKS_URLS.recurringExpenses);
  await tl.wait(800);

  tl.showCaption(CAPTIONS.verifyCreated);
  await ring(tl, "[data-tl=recurring-expense-row-rec-exp-2]", 1200);
  await tl.wait(1000);

  await finishBooks(tl, STEP150_DURATION_MS);
}
