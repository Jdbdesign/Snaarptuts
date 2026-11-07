import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP101_CAPTIONS } from "./data";

export const STEP101_DURATION_MS = 12500;

export async function runStep101(tl: Timeline) {
  tl.setVar("__sceneId", "step101");
  beginBooks(tl, BOOKS_URLS.newRecurring, "new-recurring", [0.35, 0.45]);
  tl.setVar("booksRecurringCustomer", "Harvest Tables Ltd");

  await tl.wait(400);
  tl.showCaption(STEP101_CAPTIONS.terms);
  await pressOn(tl, "[data-tl=select-recurring-terms]");
  await pressOn(tl, "[data-tl=terms-opt-net15]");

  await tl.wait(400);
  tl.showCaption(STEP101_CAPTIONS.salesperson);
  await pressOn(tl, "[data-tl=select-recurring-salesperson]");
  await pressOn(tl, "[data-tl=salesperson-opt-sam]");

  await tl.wait(400);
  tl.showCaption(STEP101_CAPTIONS.subject);
  await pressOn(tl, "[data-tl=input-recurring-subject]");
  tl.setVar("booksRecurringSubject", "Monthly produce box");

  await tl.wait(600);
  await finishBooks(tl, STEP101_DURATION_MS);
}
