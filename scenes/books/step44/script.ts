import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP44_CAPTIONS } from "./data";

export const STEP44_DURATION_MS = 22300;

export async function runStep44(tl: Timeline) {
  tl.setVar("__sceneId", "step44");
  beginBooks(tl, BOOKS_URLS.newQuote, "new-quote", [0.35, 0.4]);
  tl.setVar("booksQuoteCustomer", "Northfield Cafe");
  tl.setVar("booksQuoteNumber", "QT-0009");

  await tl.wait(400);
  tl.showCaption(STEP44_CAPTIONS.ref);
  await pressOn(tl, "[data-tl=input-quote-reference]");
  await tl.typeText("[data-tl=input-quote-reference]", "NC-CATER-01");
  tl.setVar("booksQuoteReference", "NC-CATER-01");

  await tl.wait(500);
  tl.showCaption(STEP44_CAPTIONS.quoteDate);
  await pressOn(tl, "[data-tl=btn-quote-date-calendar]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=btn-date-today]");
  tl.setVar("booksQuoteDate", "11/05/2026");

  await tl.wait(500);
  tl.showCaption(STEP44_CAPTIONS.expiryDate);
  await pressOn(tl, "[data-tl=btn-quote-expiry-calendar]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=date-day-19]");
  tl.setVar("booksQuoteExpiryDate", "11/19/2026");
  await tl.wait(1500);

  await finishBooks(tl, STEP44_DURATION_MS);
}
