import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP76_CAPTIONS } from "./data";

export const STEP76_DURATION_MS = 9300;

export async function runStep76(tl: Timeline) {
  tl.setVar("__sceneId", "step76");
  beginBooks(tl, BOOKS_URLS.newInvoice, "new-invoice", [0.15, 0.95]);
  tl.setVar("booksInvoiceCustomer", "Sterling Interiors");
  tl.setVar("booksInvoiceNumber", "INV10013");
  tl.setVar("booksInvoiceOrderNumber", "PO-8820");

  await tl.wait(400);
  tl.showCaption(STEP76_CAPTIONS.clickSaveDraft);
  await pressOn(tl, "[data-tl=btn-save-invoice-draft]");

  await tl.wait(800);
  tl.showCaption(STEP76_CAPTIONS.savedAsDraft);
  await ring(tl, "[data-tl=invoice-detail-status]", 1500);

  await finishBooks(tl, STEP76_DURATION_MS);
}
