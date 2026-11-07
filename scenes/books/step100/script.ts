import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP100_CAPTIONS } from "./data";

export const STEP100_DURATION_MS = 11500;

export async function runStep100(tl: Timeline) {
  tl.setVar("__sceneId", "step100");
  beginBooks(tl, BOOKS_URLS.newRecurring, "new-recurring", [0.35, 0.35]);
  tl.setVar("booksRecurringCustomer", "Harvest Tables Ltd");

  await tl.wait(400);
  tl.showCaption(STEP100_CAPTIONS.startDate);
  await pressOn(tl, "[data-tl=btn-recurring-start-date]");
  await pressOn(tl, "[data-tl=cal-day-5]");

  await tl.wait(400);
  tl.showCaption(STEP100_CAPTIONS.neverExpires);
  await pressOn(tl, "[data-tl=checkbox-recurring-never-expires]");
  tl.setVar("booksRecurringNeverExpires", false);

  await tl.wait(400);
  tl.showCaption(STEP100_CAPTIONS.endDate);
  await pressOn(tl, "[data-tl=btn-recurring-end-date]");
  tl.setVar("booksRecurringEndDate", "11/05/2027");
  tl.setVar("booksRecurringEndDatePickerOpen", false);

  await tl.wait(600);
  await finishBooks(tl, STEP100_DURATION_MS);
}
