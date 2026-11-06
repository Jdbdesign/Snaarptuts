import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP53_CAPTIONS } from "./data";

export const STEP53_DURATION_MS = 6000;

export async function runStep53(tl: Timeline) {
  tl.setVar("__sceneId", "step53");
  beginBooks(tl, BOOKS_URLS.quotes, "quotes", [0.08, 0.42]);

  await tl.wait(400);
  tl.showCaption(STEP53_CAPTIONS.clickInvoices);
  await pressOn(tl, "[data-tl=nav-sales-invoices]");

  tl.setVar("booksView", "invoices");
  tl.setUrl(BOOKS_URLS.invoices);

  await tl.wait(600);
  tl.showCaption(STEP53_CAPTIONS.viewList);
  await ring(tl, "[data-tl=invoices-table-header]", 1500);
  await tl.wait(800);

  await finishBooks(tl, STEP53_DURATION_MS);
}
