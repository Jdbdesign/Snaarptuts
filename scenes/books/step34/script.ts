import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP34_CAPTIONS } from "./data";

export const STEP34_DURATION_MS = 8500;

export async function runStep34(tl: Timeline) {
  tl.setVar("__sceneId", "step34");
  beginBooks(tl, BOOKS_URLS.quotes, "quotes", [0.35, 0.22]);

  await tl.wait(400);
  tl.showCaption(STEP34_CAPTIONS.search);
  await pressOn(tl, "[data-tl=input-search-quotes]");

  // Type "Brightway"
  const word = "Brightway";
  for (let i = 1; i <= word.length; i++) {
    tl.setVar("booksQuoteSearch", word.slice(0, i));
    await tl.wait(70);
  }

  await tl.wait(600);
  tl.showCaption(STEP34_CAPTIONS.results);
  await tl.wait(1800);

  tl.showCaption(STEP34_CAPTIONS.clear);
  await pressOn(tl, "[data-tl=input-search-quotes]");
  tl.setVar("booksQuoteSearch", "");
  await tl.wait(1200);

  await finishBooks(tl, STEP34_DURATION_MS);
}
