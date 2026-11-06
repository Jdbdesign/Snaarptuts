import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP104_CAPTIONS } from "./data";

export const STEP104_DURATION_MS = 8000;

export async function runStep104(tl: Timeline) {
  tl.setVar("__sceneId", "step104");
  beginBooks(tl, BOOKS_URLS.newRecurring, "new-recurring", [0.75, 0.65]);
  tl.setVar("booksRecurringCustomer", "Harvest Tables Ltd");
  tl.setVar("booksRecurringLineItems", [
    { id: "row-0", name: "Organic Rice 25kg", quantity: 4, rate: 200.0, tax: "VAT Standard (20%)", amount: 800.0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP104_CAPTIONS.discountShipping);
  await pressOn(tl, "[data-tl=input-recurring-discount]");
  tl.setVar("booksRecurringDiscount", 5);
  await pressOn(tl, "[data-tl=input-recurring-shipping]");
  tl.setVar("booksRecurringShipping", 10.0);

  await tl.wait(400);
  tl.showCaption(STEP104_CAPTIONS.roundOff);
  await pressOn(tl, "[data-tl=input-recurring-roundoff]");
  tl.setVar("booksRecurringRoundOff", 0.5);

  await tl.wait(600);
  await ring(tl, "[data-tl=row-recurring-roundoff]", 1200);
  await ring(tl, "[data-tl=text-recurring-total]", 1200);

  await finishBooks(tl, STEP104_DURATION_MS);
}
