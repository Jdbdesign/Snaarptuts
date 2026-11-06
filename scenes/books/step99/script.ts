import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP99_CAPTIONS } from "./data";

export const STEP99_DURATION_MS = 5500;

export async function runStep99(tl: Timeline) {
  tl.setVar("__sceneId", "step99");
  beginBooks(tl, BOOKS_URLS.newRecurring, "new-recurring", [0.75, 0.3]);
  tl.setVar("booksRecurringCustomer", "Harvest Tables Ltd");
  tl.setVar("booksRecurringProfileName", "Weekly Produce Box");

  await tl.wait(400);
  tl.showCaption(STEP99_CAPTIONS.open);
  await pressOn(tl, "[data-tl=select-recurring-frequency]");

  await tl.wait(400);
  tl.showCaption(STEP99_CAPTIONS.pick);
  await pressOn(tl, "[data-tl=freq-opt-month]");

  await tl.wait(800);
  await finishBooks(tl, STEP99_DURATION_MS);
}
