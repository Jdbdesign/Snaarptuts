import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP105_CAPTIONS } from "./data";

export const STEP105_DURATION_MS = 8500;

export async function runStep105(tl: Timeline) {
  tl.setVar("__sceneId", "step105");
  beginBooks(tl, BOOKS_URLS.newRecurring, "new-recurring", [0.35, 0.65]);
  tl.setVar("booksRecurringCustomer", "Harvest Tables Ltd");
  tl.setVar("booksRecurringLineItems", [
    { id: "row-0", name: "Organic Rice 25kg", quantity: 4, rate: 200.0, tax: "VAT Standard (20%)", amount: 800.0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP105_CAPTIONS.notes);
  await pressOn(tl, "[data-tl=textarea-recurring-customer-notes]");
  tl.setVar("booksRecurringCustomerNotes", "Thanks for your business.");

  await tl.wait(400);
  tl.showCaption(STEP105_CAPTIONS.terms);
  await pressOn(tl, "[data-tl=textarea-recurring-terms]");
  tl.setVar("booksRecurringTermsText", "Net 15 terms apply to each recurring cycle.");

  await tl.wait(600);
  await finishBooks(tl, STEP105_DURATION_MS);
}
