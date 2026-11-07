import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP109_CAPTIONS } from "./data";

export const STEP109_DURATION_MS = 12500;

export async function runStep109(tl: Timeline) {
  tl.setVar("__sceneId", "step109");
  beginBooks(tl, BOOKS_URLS.recurringInvoices, "recurring", [0.35, 0.35]);
  tl.setVar("booksRecurringEmpty", false);

  await tl.wait(400);
  tl.showCaption(STEP109_CAPTIONS.open);
  await pressOn(tl, "[data-tl=recurring-row-rec-1]");

  await tl.wait(800);
  tl.showCaption(STEP109_CAPTIONS.inspect);
  await ring(tl, "[data-tl=card-recurring-schedule-details]", 1200);
  await ring(tl, "[data-tl=card-recurring-items-table]", 1200);
  await ring(tl, "[data-tl=card-recurring-notes]", 1000);
  await pressOn(tl, "[data-tl=btn-back-recurring]");

  await tl.wait(600);
  await finishBooks(tl, STEP109_DURATION_MS);
}
