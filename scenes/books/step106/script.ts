import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP106_CAPTIONS } from "./data";

export const STEP106_DURATION_MS = 16700;

export async function runStep106(tl: Timeline) {
  tl.setVar("__sceneId", "step106");
  beginBooks(tl, BOOKS_URLS.newRecurring, "new-recurring", [0.75, 0.85]);
  tl.setVar("booksRecurringCustomer", "Harvest Tables Ltd");
  tl.setVar("booksRecurringLineItems", [
    { id: "row-0", name: "Organic Rice 25kg", quantity: 4, rate: 200.0, tax: "VAT Standard (20%)", amount: 800.0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP106_CAPTIONS.gear);
  await pressOn(tl, "[data-tl=btn-recurring-preferences]");

  await tl.wait(600);
  tl.showCaption(STEP106_CAPTIONS.pick);
  await pressOn(tl, "[data-tl=radio-recurring-create-and-send]");
  await pressOn(tl, "[data-tl=btn-save-recurring-preferences]");

  await tl.wait(800);
  await ring(tl, "[data-tl=recurring-preferences-display]", 1500);

  await finishBooks(tl, STEP106_DURATION_MS);
}
