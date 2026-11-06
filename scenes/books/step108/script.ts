import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP108_CAPTIONS } from "./data";

export const STEP108_DURATION_MS = 7500;

export async function runStep108(tl: Timeline) {
  tl.setVar("__sceneId", "step108");
  beginBooks(tl, BOOKS_URLS.recurringInvoices, "recurring", [0.4, 0.2]);
  tl.setVar("booksRecurringEmpty", false);

  await tl.wait(400);
  tl.showCaption(STEP108_CAPTIONS.search);
  await pressOn(tl, "[data-tl=input-recurring-search]");
  tl.setVar("booksRecurringSearch", "weekly");

  await tl.wait(1000);
  await ring(tl, "[data-tl=recurring-row-rec-2]", 1200);

  tl.showCaption(STEP108_CAPTIONS.filter);
  await pressOn(tl, "[data-tl=select-recurring-status-filter]");
  await pressOn(tl, "[data-tl=status-opt-active]");

  await tl.wait(800);
  await finishBooks(tl, STEP108_DURATION_MS);
}
