import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_QUOTES } from "@/components/books/books-data";
import { STEP36_CAPTIONS } from "./data";

export const STEP36_DURATION_MS = 10000;

export async function runStep36(tl: Timeline) {
  tl.setVar("__sceneId", "step36");
  beginBooks(tl, BOOKS_URLS.quotes, "quotes", [0.4, 0.35]);
  tl.setVar("booksActiveQuote", INITIAL_QUOTES[0]);

  await tl.wait(400);
  tl.showCaption(STEP36_CAPTIONS.open);
  await pressOn(tl, "[data-tl=quote-link-1]");

  await tl.wait(400);
  tl.showCaption(STEP36_CAPTIONS.details);
  await ring(tl, "[data-tl=btn-breadcrumb-back]", 800);
  await ring(tl, "[data-tl=quote-detail-status]", 1000);
  await ring(tl, "[data-tl=card-quote-details]", 1400);

  tl.showCaption(STEP36_CAPTIONS.items);
  await ring(tl, "[data-tl=card-quote-items]", 1400);
  await ring(tl, "[data-tl=detail-total-amount]", 1000);
  await ring(tl, "[data-tl=detail-customer-notes]", 1000);
  await ring(tl, "[data-tl=detail-terms-conditions]", 1000);

  await finishBooks(tl, STEP36_DURATION_MS);
}
