import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP42_CAPTIONS } from "./data";

export const STEP42_DURATION_MS = 8000;

export async function runStep42(tl: Timeline) {
  tl.setVar("__sceneId", "step42");
  beginBooks(tl, BOOKS_URLS.quotes, "quotes", [0.75, 0.22]);

  await tl.wait(400);
  tl.showCaption(STEP42_CAPTIONS.newQuote);
  await pressOn(tl, "[data-tl=btn-new-quote]");

  await tl.wait(500);
  tl.showCaption(STEP42_CAPTIONS.openCustomer);
  await pressOn(tl, "[data-tl=select-quote-customer]");

  await tl.wait(400);
  tl.showCaption(STEP42_CAPTIONS.selectCustomer);
  await pressOn(tl, "[data-tl=customer-opt-northfield-cafe]");
  await tl.wait(1800);

  await finishBooks(tl, STEP42_DURATION_MS);
}
