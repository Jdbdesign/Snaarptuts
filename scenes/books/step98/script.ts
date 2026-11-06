import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP98_CAPTIONS } from "./data";

export const STEP98_DURATION_MS = 8000;

export async function runStep98(tl: Timeline) {
  tl.setVar("__sceneId", "step98");
  beginBooks(tl, BOOKS_URLS.newRecurring, "new-recurring", [0.3, 0.25]);

  await tl.wait(400);
  tl.showCaption(STEP98_CAPTIONS.customer);
  await pressOn(tl, "[data-tl=select-recurring-customer]");
  await pressOn(tl, "[data-tl=customer-opt-harvest]");

  await tl.wait(400);
  tl.showCaption(STEP98_CAPTIONS.profileName);
  await pressOn(tl, "[data-tl=input-recurring-profile-name]");
  tl.setVar("booksRecurringProfileName", "Weekly Produce Box");

  await tl.wait(400);
  tl.showCaption(STEP98_CAPTIONS.orderNumber);
  await pressOn(tl, "[data-tl=input-recurring-order-number]");
  tl.setVar("booksRecurringOrderNumber", "PO-3041");

  await tl.wait(600);
  await finishBooks(tl, STEP98_DURATION_MS);
}
