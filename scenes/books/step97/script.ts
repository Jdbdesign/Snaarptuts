import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP97_CAPTIONS } from "./data";

export const STEP97_DURATION_MS = 7500;

export async function runStep97(tl: Timeline) {
  tl.setVar("__sceneId", "step97");
  beginBooks(tl, BOOKS_URLS.recurringInvoices, "recurring", [0.1, 0.5]);
  tl.setVar("booksRecurringEmpty", true);

  await tl.wait(400);
  tl.showCaption(STEP97_CAPTIONS.clickNav);
  await pressOn(tl, "[data-tl=nav-sales-recurring]");

  await tl.wait(600);
  tl.showCaption(STEP97_CAPTIONS.create);
  await ring(tl, "[data-tl=recurring-empty-heading]", 1000);
  await pressOn(tl, "[data-tl=btn-create-recurring-empty]");

  await tl.wait(800);
  await finishBooks(tl, STEP97_DURATION_MS);
}
