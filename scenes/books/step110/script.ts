import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_RECURRING_INVOICES } from "@/components/books/books-data";
import { STEP110_CAPTIONS } from "./data";

export const STEP110_DURATION_MS = 19200;

export async function runStep110(tl: Timeline) {
  tl.setVar("__sceneId", "step110");
  beginBooks(tl, BOOKS_URLS.recurringInvoices, "recurring", [0.35, 0.35]);
  tl.setVar("booksRecurringEmpty", false);
  tl.setVar("booksActiveRecurring", INITIAL_RECURRING_INVOICES[0]);

  await tl.wait(400);
  tl.showCaption(STEP110_CAPTIONS.open);
  await pressOn(tl, "[data-tl=recurring-row-rec-1]");

  await tl.wait(600);
  tl.showCaption(STEP110_CAPTIONS.edit);
  await pressOn(tl, "[data-tl=btn-edit-recurring]");

  await tl.wait(600);
  tl.showCaption(STEP110_CAPTIONS.saveChanges);
  await pressOn(tl, "[data-tl=select-edit-recurring-terms]");
  await pressOn(tl, "[data-tl=terms-opt-net30]");
  await pressOn(tl, "[data-tl=btn-save-recurring-changes]");

  await tl.wait(600);
  tl.setVar("booksToastOpen", false);
  tl.showCaption(STEP110_CAPTIONS.delete);
  await pressOn(tl, "[data-tl=btn-delete-recurring]");

  await tl.wait(600);
  tl.showCaption(STEP110_CAPTIONS.confirm);
  await pressOn(tl, "[data-tl=btn-confirm-recurring-delete]");

  await tl.wait(1000);
  await finishBooks(tl, STEP110_DURATION_MS);
}
