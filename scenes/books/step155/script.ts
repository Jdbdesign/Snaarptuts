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

export const STEP155_DURATION_MS = 7500;

export async function runStep155(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newExpense, "new-expense", [0.45, 0.85]);
  tl.setVar("booksExpenseAmount", "250");
  tl.setVar("booksExpenseAccount", "Cost of Goods Sold");
  tl.setVar("booksExpenseVendor", "Greenfield Packaging Ltd");

  await tl.at(400);
  await scrollView(tl, 300, 400);
  tl.showCaption(CAPTIONS.clickSaveAndNew, { target: "[data-tl=btn-save-and-new-expense]" });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=btn-save-and-new-expense]", { ring: false });
  await tl.wait(600);

  await scrollView(tl, 0, 400);
  tl.showCaption(CAPTIONS.reviewReset);
  await ring(tl, "[data-tl=input-expense-date]", 800);
  await ring(tl, "[data-tl=select-expense-account]", 1000);
  await tl.wait(400);

  await finishBooks(tl, STEP155_DURATION_MS);
}
