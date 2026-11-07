import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_EXPENSES } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP146_DURATION_MS = 66200;

export async function runStep146(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newExpense, "new-expense", [0.45, 0.35]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickBulkTab);
  await pressOn(tl, "[data-tl=tab-bulk-add-expenses]");
  tl.setVar("booksExpenseFormTab", "bulk");
  await tl.wait(700);

  // Row 0
  tl.showCaption(CAPTIONS.row1Date);
  await pressOn(tl, "[data-tl=bulk-date-0]");
  tl.setVar("booksBulkRow0DatePickerOpen", true);
  await tl.wait(600);
  await pressOn(tl, "[data-tl=date-day-5]");
  tl.setVar("booksBulkRow0DatePickerOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.row1Account);
  await pressOn(tl, "[data-tl=bulk-select-account-0]");
  tl.setVar("booksBulkRow0AccountOpen", true);
  await tl.wait(600);
  await pressOn(tl, "[data-tl=opt-bulk-account-cogs-0]");
  tl.setVar("booksBulkRow0AccountOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.row1Amount);
  await pressOn(tl, "[data-tl=bulk-amount-0]");
  await tl.typeText("bulkAmount0", "1000", { msPerChar: 60 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.row1PaidThrough);
  await pressOn(tl, "[data-tl=bulk-select-paidthrough-0]");
  tl.setVar("booksBulkRow0PaidThroughOpen", true);
  await tl.wait(600);
  await pressOn(tl, "[data-tl=opt-bulk-paidthrough-ar-0]");
  tl.setVar("booksBulkRow0PaidThroughOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.row1Vendor);
  await pressOn(tl, "[data-tl=bulk-select-vendor-0]");
  tl.setVar("booksBulkRow0VendorOpen", true);
  await tl.wait(600);
  await pressOn(tl, "[data-tl=opt-bulk-vendor-greenfield-0]");
  tl.setVar("booksBulkRow0VendorOpen", false);
  await tl.wait(600);

  // Row 1
  tl.showCaption(CAPTIONS.row2Date);
  await pressOn(tl, "[data-tl=bulk-date-1]");
  tl.setVar("booksBulkRow1DatePickerOpen", true);
  await tl.wait(600);
  await pressOn(tl, "[data-tl=date-day-5]");
  tl.setVar("booksBulkRow1DatePickerOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.row2Account);
  await pressOn(tl, "[data-tl=bulk-select-account-1]");
  tl.setVar("booksBulkRow1AccountOpen", true);
  await tl.wait(600);
  await pressOn(tl, "[data-tl=opt-bulk-account-supplies-1]");
  tl.setVar("booksBulkRow1AccountOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.row2Amount);
  await pressOn(tl, "[data-tl=bulk-amount-1]");
  await tl.typeText("bulkAmount1", "250", { msPerChar: 60 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.row2PaidThrough);
  await pressOn(tl, "[data-tl=bulk-select-paidthrough-1]");
  tl.setVar("booksBulkRow1PaidThroughOpen", true);
  await tl.wait(600);
  await pressOn(tl, "[data-tl=opt-bulk-paidthrough-petty-1]");
  tl.setVar("booksBulkRow1PaidThroughOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.row2Vendor);
  await pressOn(tl, "[data-tl=bulk-select-vendor-1]");
  tl.setVar("booksBulkRow1VendorOpen", true);
  await tl.wait(600);
  await pressOn(tl, "[data-tl=opt-bulk-vendor-victor-1]");
  tl.setVar("booksBulkRow1VendorOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.clickSave);
  await ring(tl, "[data-tl=btn-save-bulk-expenses]", 600);
  await pressOn(tl, "[data-tl=btn-save-bulk-expenses]");
  tl.setVar("booksToastText", "Expenses saved successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksView", "expenses");
  tl.setVar("booksExpenses", [
    {
      id: "exp-bulk-1",
      date: "11/05/2026",
      reference: "BLK-01",
      amount: 1000.0,
      status: "Unbilled",
      expenseAccount: "Cost of Goods Sold",
      paidThrough: "Accounts Receivable",
      vendor: "Greenfield Packaging Ltd",
    },
    {
      id: "exp-bulk-2",
      date: "11/05/2026",
      reference: "BLK-02",
      amount: 250.0,
      status: "Unbilled",
      expenseAccount: "Office Supplies",
      paidThrough: "Petty Cash",
      vendor: "Victor Stationery",
    },
    ...INITIAL_EXPENSES,
  ]);
  tl.setVar("booksView", "expenses");
  tl.setUrl(BOOKS_URLS.expenses);
  await tl.wait(800);

  tl.showCaption(CAPTIONS.bulkSaved);
  await ring(tl, "[data-tl=expense-row-exp-bulk-1]", 1000);
  await ring(tl, "[data-tl=expense-row-exp-bulk-2]", 1000);

  await finishBooks(tl, STEP146_DURATION_MS);
}
