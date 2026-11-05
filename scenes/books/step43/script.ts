import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP43_CAPTIONS } from "./data";

export const STEP43_DURATION_MS = 8500;

export async function runStep43(tl: Timeline) {
  tl.setVar("__sceneId", "step43");
  beginBooks(tl, BOOKS_URLS.newQuote, "new-quote", [0.45, 0.35]);
  tl.setVar("booksQuoteCustomer", "Northfield Cafe");

  await tl.wait(400);
  tl.showCaption(STEP43_CAPTIONS.gear);
  await pressOn(tl, "[data-tl=btn-configure-numbering]");

  await tl.wait(600);
  tl.showCaption(STEP43_CAPTIONS.typeNumber);
  await pressOn(tl, "[data-tl=input-next-number]");
  await tl.typeText("[data-tl=input-next-number]", "0009");
  tl.setVar("booksQuoteNextNumber", "0009");

  await tl.wait(600);
  tl.showCaption(STEP43_CAPTIONS.save);
  await pressOn(tl, "[data-tl=btn-save-numbering]");
  await tl.wait(2000);

  await finishBooks(tl, STEP43_DURATION_MS);
}
