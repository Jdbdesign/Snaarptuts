import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_QUOTES } from "@/components/books/books-data";
import { STEP38_CAPTIONS } from "./data";

export const STEP38_DURATION_MS = 7000;

export async function runStep38(tl: Timeline) {
  tl.setVar("__sceneId", "step38");
  beginBooks(tl, BOOKS_URLS.quoteDetails, "quote-detail", [0.65, 0.2]);
  tl.setVar("booksActiveQuote", INITIAL_QUOTES[0]);

  await tl.wait(400);
  tl.showCaption(STEP38_CAPTIONS.download);
  await pressOn(tl, "[data-tl=btn-download-pdf]");

  // Button shows Preparing PDF...
  tl.setVar("booksQuotePreparingPdf", true);
  await tl.wait(1200);

  tl.setVar("booksQuotePreparingPdf", false);
  tl.setVar("booksToastText", "Quote PDF downloaded");
  tl.setVar("booksToastOpen", true);

  tl.showCaption(STEP38_CAPTIONS.ready);
  await tl.wait(2200);

  await finishBooks(tl, STEP38_DURATION_MS);
}
