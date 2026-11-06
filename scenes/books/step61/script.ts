import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_INVOICES } from "@/components/books/books-data";
import { STEP61_CAPTIONS } from "./data";

export const STEP61_DURATION_MS = 7000;

export async function runStep61(tl: Timeline) {
  tl.setVar("__sceneId", "step61");
  beginBooks(tl, BOOKS_URLS.invoiceDetails, "invoice-detail", [0.88, 0.15]);
  tl.setVar("booksActiveInvoice", INITIAL_INVOICES[1]); // INV10008

  await tl.wait(400);
  tl.showCaption(STEP61_CAPTIONS.clickPreview);
  await pressOn(tl, "[data-tl=btn-preview-pdf]");

  await tl.wait(600);
  tl.showCaption(STEP61_CAPTIONS.inspectPdf);
  await ring(tl, "[data-tl=invoice-pdf-sheet]", 1500);

  await tl.wait(500);
  tl.showCaption(STEP61_CAPTIONS.closePreview);
  await pressOn(tl, "[data-tl=btn-close-pdf-preview]");
  await tl.wait(500);

  await finishBooks(tl, STEP61_DURATION_MS);
}
