import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_QUOTES } from "@/components/books/books-data";
import { STEP37_CAPTIONS } from "./data";

export const STEP37_DURATION_MS = 17200;

export async function runStep37(tl: Timeline) {
  tl.setVar("__sceneId", "step37");
  beginBooks(tl, BOOKS_URLS.quoteDetails, "quote-detail", [0.55, 0.2]);
  tl.setVar("booksActiveQuote", INITIAL_QUOTES[0]);

  await tl.wait(400);
  tl.showCaption(STEP37_CAPTIONS.send);
  await pressOn(tl, "[data-tl=btn-send-quote]");

  // Shows sending spinner
  tl.setVar("booksQuoteSending", true);
  await tl.wait(1200);

  // Successfully sent
  tl.setVar("booksQuoteSending", false);
  const updated = { ...INITIAL_QUOTES[0], status: "Sent" as const };
  tl.setVar("booksActiveQuote", updated);
  tl.setVar("booksToastText", "Quote sent successfully.");
  tl.setVar("booksToastOpen", true);

  tl.showCaption(STEP37_CAPTIONS.sent);
  await tl.wait(1500);

  await finishBooks(tl, STEP37_DURATION_MS);
}
