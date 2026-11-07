import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP45_CAPTIONS } from "./data";

export const STEP45_DURATION_MS = 18700;

export async function runStep45(tl: Timeline) {
  tl.setVar("__sceneId", "step45");
  beginBooks(tl, BOOKS_URLS.newQuote, "new-quote", [0.35, 0.55]);
  tl.setVar("booksQuoteCustomer", "Northfield Cafe");
  tl.setVar("booksQuoteNumber", "QT-0009");
  tl.setVar("booksQuoteReference", "NC-CATER-01");
  tl.setVar("booksQuoteDate", "11/05/2026");
  tl.setVar("booksQuoteExpiryDate", "11/19/2026");

  await tl.wait(400);
  tl.showCaption(STEP45_CAPTIONS.salesperson);
  await pressOn(tl, "[data-tl=select-quote-salesperson]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=salesperson-opt-sam-taylor]");
  tl.setVar("booksQuoteSalesperson", "Sam Taylor");

  await tl.wait(500);
  tl.showCaption(STEP45_CAPTIONS.project);
  await pressOn(tl, "[data-tl=select-quote-project]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=project-opt-spring-catering]");
  tl.setVar("booksQuoteProject", "Spring Catering Order");

  await tl.wait(500);
  tl.showCaption(STEP45_CAPTIONS.subject);
  await pressOn(tl, "[data-tl=input-quote-subject]");
  await tl.typeText(
    "[data-tl=input-quote-subject]",
    "Catering supplies for Northfield Cafe"
  );
  tl.setVar("booksQuoteSubject", "Catering supplies for Northfield Cafe");
  await tl.wait(1500);

  await finishBooks(tl, STEP45_DURATION_MS);
}
