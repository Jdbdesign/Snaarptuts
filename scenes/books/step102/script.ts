import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP102_CAPTIONS } from "./data";

export const STEP102_DURATION_MS = 10700;

export async function runStep102(tl: Timeline) {
  tl.setVar("__sceneId", "step102");
  beginBooks(tl, BOOKS_URLS.newRecurring, "new-recurring", [0.35, 0.5]);
  tl.setVar("booksRecurringCustomer", "Harvest Tables Ltd");
  tl.setVar("booksRecurringLineItems", [
    { id: "row-0", name: "", quantity: 1, rate: 0, tax: "VAT Standard (20%)", amount: 0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP102_CAPTIONS.pickItem);
  await pressOn(tl, "[data-tl=input-item-select-0]");
  await pressOn(tl, "[data-tl=item-opt-rice]");

  await tl.wait(400);
  tl.showCaption(STEP102_CAPTIONS.qtyAndTotal);
  await pressOn(tl, "[data-tl=input-item-qty-0]");
  tl.setVar("booksRecurringLineItems", [
    { id: "row-0", name: "Organic Rice 25kg", quantity: 4, rate: 200.0, tax: "VAT Standard (20%)", amount: 800.0 },
  ]);

  await tl.wait(600);
  await ring(tl, "[data-tl=text-recurring-subtotal]", 1200);

  await finishBooks(tl, STEP102_DURATION_MS);
}
