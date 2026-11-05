import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_QUOTES } from "@/components/books/books-data";
import { STEP41_CAPTIONS } from "./data";

export const STEP41_DURATION_MS = 9000;

export async function runStep41(tl: Timeline) {
  tl.setVar("__sceneId", "step41");
  beginBooks(tl, BOOKS_URLS.quotes, "quotes", [0.35, 0.38]);

  await tl.wait(400);
  tl.showCaption(STEP41_CAPTIONS.open);
  // Clicks QT-0007 (row 2)
  await pressOn(tl, "[data-tl=quote-link-2]");
  tl.setVar("booksActiveQuote", INITIAL_QUOTES[1]); // QT-0007

  await tl.wait(600);
  tl.showCaption(STEP41_CAPTIONS.delete);
  await pressOn(tl, "[data-tl=btn-delete-quote]");

  await tl.wait(600);
  tl.showCaption(STEP41_CAPTIONS.confirm);
  await pressOn(tl, "[data-tl=btn-confirm-delete-quote]");
  await tl.wait(2000);

  await finishBooks(tl, STEP41_DURATION_MS);
}
