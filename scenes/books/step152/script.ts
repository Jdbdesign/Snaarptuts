import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP152_DURATION_MS = 9000;

export async function runStep152(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newExpense, "new-expense", [0.45, 0.50]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.enterNotes);
  await pressOn(tl, "[data-tl=input-expense-notes]");
  tl.setVar("booksExpenseNotes", "Monthly warehouse supplies and packaging materials");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.clickUpload);
  await pressOn(tl, "[data-tl=btn-upload-receipts]");
  tl.setVar("booksExpenseFilePickerOpen", true);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectSampleReceipt);
  await pressOn(tl, "[data-tl=file-opt-f-receipt-nov]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.attachReceipt);
  await pressOn(tl, "[data-tl=btn-select-expense-file]");
  tl.setVar("booksAttachedReceipt", "receipt-nov-2026.pdf");
  tl.setVar("booksExpenseFilePickerOpen", false);
  await tl.wait(800);

  await finishBooks(tl, STEP152_DURATION_MS);
}
