import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP103_CAPTIONS } from "./data";

export const STEP103_DURATION_MS = 7500;

export async function runStep103(tl: Timeline) {
  tl.setVar("__sceneId", "step103");
  beginBooks(tl, BOOKS_URLS.newRecurring, "new-recurring", [0.88, 0.5]);
  tl.setVar("booksRecurringCustomer", "Harvest Tables Ltd");
  tl.setVar("booksRecurringLineItems", [
    { id: "row-0", name: "Organic Rice 25kg", quantity: 4, rate: 200.0, tax: "VAT Standard (20%)", amount: 800.0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP103_CAPTIONS.openBulk);
  await pressOn(tl, "[data-tl=btn-recurring-bulk-actions]");

  await tl.wait(600);
  tl.showCaption(STEP103_CAPTIONS.confirm);
  await pressOn(tl, "[data-tl=input-bulk-search]");
  tl.setVar("booksRecurringBulkSearch", "delivery");
  await pressOn(tl, "[data-tl=checkbox-bulk-item-delivery]");
  await pressOn(tl, "[data-tl=btn-confirm-bulk-items]");

  await tl.wait(800);
  await finishBooks(tl, STEP103_DURATION_MS);
}
