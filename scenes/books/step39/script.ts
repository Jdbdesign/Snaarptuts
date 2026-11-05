import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_QUOTES } from "@/components/books/books-data";
import { STEP39_CAPTIONS } from "./data";

export const STEP39_DURATION_MS = 10000;

export async function runStep39(tl: Timeline) {
  tl.setVar("__sceneId", "step39");
  beginBooks(tl, BOOKS_URLS.quoteDetails, "quote-detail", [0.75, 0.2]);
  tl.setVar("booksActiveQuote", INITIAL_QUOTES[0]);

  await tl.wait(400);
  tl.showCaption(STEP39_CAPTIONS.preview);
  await pressOn(tl, "[data-tl=btn-preview-pdf]");

  await tl.wait(500);
  tl.showCaption(STEP39_CAPTIONS.review);
  await ring(tl, "[data-tl=pdf-page-indicator]", 1200);

  // Smoothly scroll down the PDF document once
  await tl.scrollPanelTo("[data-tl=pdf-preview-scroll-body]", 220, 1000);
  await tl.wait(1500);

  tl.showCaption(STEP39_CAPTIONS.close);
  await pressOn(tl, "[data-tl=btn-close-pdf-preview]");
  await tl.wait(800);

  await finishBooks(tl, STEP39_DURATION_MS);
}
