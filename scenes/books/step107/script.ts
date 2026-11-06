import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP107_CAPTIONS } from "./data";

export const STEP107_DURATION_MS = 6500;

export async function runStep107(tl: Timeline) {
  tl.setVar("__sceneId", "step107");
  beginBooks(tl, BOOKS_URLS.newRecurring, "new-recurring", [0.85, 0.95]);
  tl.setVar("booksRecurringCustomer", "Harvest Tables Ltd");
  tl.setVar("booksRecurringProfileName", "Weekly Produce Box");
  tl.setVar("booksRecurringFrequency", "Month");
  tl.setVar("booksRecurringLineItems", [
    { id: "row-0", name: "Organic Rice 25kg", quantity: 4, rate: 200.0, tax: "VAT Standard (20%)", amount: 800.0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP107_CAPTIONS.save);
  await pressOn(tl, "[data-tl=btn-save-recurring]");

  await tl.wait(1000);
  tl.showCaption(STEP107_CAPTIONS.success);
  await ring(tl, "[data-tl=recurring-status-badge]", 1200);

  await finishBooks(tl, STEP107_DURATION_MS);
}
