import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
  typeIntoVar,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_EXPENSES } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP144_DURATION_MS = 45000;

export async function runStep144(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newExpense, "new-expense", [0.45, 0.35], 144);

  await tl.at(400);
  tl.showCaption(CAPTIONS.pickVendor);
  await pressOn(tl, "[data-tl=select-expense-vendor]");
  tl.setVar("booksExpenseVendorOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-vendor-greenfield]");
  tl.setVar("booksExpenseVendor", "Greenfield Packaging Ltd");
  tl.setVar("booksExpenseVendorOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeRef);
  await pressOn(tl, "[data-tl=input-expense-ref]");
  await typeIntoVar(tl, "[data-tl=input-expense-ref]", "booksExpenseRef", "INV-1123", { msPerChar: 60 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeNotes);
  await pressOn(tl, "[data-tl=input-expense-notes]");
  await typeIntoVar(tl, "[data-tl=input-expense-notes]", "booksExpenseNotes", "Monthly warehouse supplies and packaging materials", { msPerChar: 40 });
  await tl.wait(600);

  tl.showCaption(CAPTIONS.clickUpload);
  await pressOn(tl, "[data-tl=btn-upload-receipts]");
  tl.setVar("booksExpenseFilePickerOpen", true);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.pickFile);
  await pressOn(tl, "[data-tl=file-opt-f-receipt-nov]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=btn-select-expense-file]");
  tl.setVar("booksAttachedReceipt", "receipt-nov-2026.pdf");
  tl.setVar("booksExpenseFilePickerOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.pickCustomer);
  await pressOn(tl, "[data-tl=select-expense-customer]");
  tl.setVar("booksExpenseCustomerOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-customer-acme]");
  tl.setVar("booksExpenseCustomer", "Acme Foods Ltd");
  tl.setVar("booksExpenseCustomerOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.tickBillable);
  await pressOn(tl, "[data-tl=check-expense-billable]");
  tl.setVar("booksExpenseBillable", true);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.clickSave);
  await ring(tl, "[data-tl=btn-save-expense]", 600);
  await pressOn(tl, "[data-tl=btn-save-expense]");
  tl.setVar("booksToastText", "Expense saved successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksView", "expenses");
  tl.setVar("booksExpenses", [
    {
      id: "exp-1200",
      date: "11/05/2026",
      reference: "INV-1123",
      amount: 1200.0,
      status: "Unbilled",
      expenseAccount: "Cost of Goods Sold",
      paidThrough: "Undeposited Funds",
      vendor: "Greenfield Packaging Ltd",
      customerName: "Acme Foods Ltd",
    },
    ...INITIAL_EXPENSES,
  ]);
  tl.setVar("booksView", "expenses");
  tl.setUrl(BOOKS_URLS.expenses);
  await tl.wait(800);

  tl.showCaption(CAPTIONS.expenseSaved);
  await ring(tl, "[data-tl=expense-row-exp-1200]", 1400);

  await finishBooks(tl, STEP144_DURATION_MS);
}
