import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP54_CAPTIONS } from "./data";

export const STEP54_DURATION_MS = 6000;

export async function runStep54(tl: Timeline) {
  tl.setVar("__sceneId", "step54");
  beginBooks(tl, BOOKS_URLS.invoices, "invoices", [0.25, 0.2]);

  await tl.wait(400);
  tl.showCaption(STEP54_CAPTIONS.search);
  await pressOn(tl, "[data-tl=input-invoices-search]");
  await tl.typeText("[data-tl=input-invoices-search]", "Sterling");
  tl.setVar("booksInvoiceSearch", "Sterling");

  await tl.wait(600);
  tl.showCaption(STEP54_CAPTIONS.results);
  await ring(tl, "[data-tl=invoice-row-1]", 1500);
  await tl.wait(600);

  // Clear search
  tl.setVar("booksInvoiceSearch", "");

  await finishBooks(tl, STEP54_DURATION_MS);
}
