import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_INVOICES } from "@/components/books/books-data";
import { STEP60_CAPTIONS } from "./data";

export const STEP60_DURATION_MS = 7800;

export async function runStep60(tl: Timeline) {
  tl.setVar("__sceneId", "step60");
  beginBooks(tl, BOOKS_URLS.invoiceDetails, "invoice-detail", [0.82, 0.15]);
  tl.setVar("booksActiveInvoice", INITIAL_INVOICES[1]); // INV10008

  await tl.wait(400);
  tl.showCaption(STEP60_CAPTIONS.clickDownload);
  await pressOn(tl, "[data-tl=btn-download-pdf]");

  await tl.wait(1000);
  tl.showCaption(STEP60_CAPTIONS.downloadComplete);
  await tl.wait(1000);

  await finishBooks(tl, STEP60_DURATION_MS);
}
