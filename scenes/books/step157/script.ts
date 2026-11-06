import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
  scrollView,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP157_DURATION_MS = 7500;

export async function runStep157(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newExpense, "new-expense", [0.45, 0.85]);
  tl.setVar("booksExpenseFormTab", "mileage");
  tl.setVar("booksMileageDistance", "20");
  tl.setVar("booksMileagePaidThrough", "Employee Advance");
  tl.setVar("booksMileageTax", "No Tax");
  tl.setVar("booksMileageVendor", "Greenfield Packaging Ltd");

  await tl.at(400);
  await scrollView(tl, 300, 400);
  tl.showCaption(CAPTIONS.clickSave, { target: "[data-tl=btn-save-mileage]" });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=btn-save-mileage]", { ring: false });
  await tl.wait(800);

  tl.showCaption(CAPTIONS.viewInList);
  await ring(tl, "[data-tl=expense-row-0]", 1400);
  await tl.wait(400);

  await finishBooks(tl, STEP157_DURATION_MS);
}
