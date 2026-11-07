import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_INVOICES } from "@/components/books/books-data";
import { STEP57_CAPTIONS } from "./data";

export const STEP57_DURATION_MS = 11300;

export async function runStep57(tl: Timeline) {
  tl.setVar("__sceneId", "step57");
  beginBooks(tl, BOOKS_URLS.invoices, "invoices", [0.4, 0.35]);

  await tl.wait(400);
  tl.showCaption(STEP57_CAPTIONS.clickRow);
  await pressOn(tl, "[data-tl=invoice-row-1]");

  tl.setVar("booksActiveInvoice", INITIAL_INVOICES[1]); // INV10008
  tl.setVar("booksView", "invoice-detail");
  tl.setUrl(BOOKS_URLS.invoiceDetails);

  await tl.wait(600);
  tl.showCaption(STEP57_CAPTIONS.viewDetails);
  await ring(tl, "[data-tl=invoice-detail-title]", 1200);
  await ring(tl, "[data-tl=invoice-detail-status]", 1200);
  await tl.wait(600);

  await finishBooks(tl, STEP57_DURATION_MS);
}
