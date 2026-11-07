import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_PAYMENTS } from "@/components/books/books-data";
import { STEP115_CAPTIONS } from "./data";

export const STEP115_DURATION_MS = 6500;

export async function runStep115(tl: Timeline) {
  tl.setVar("__sceneId", "step115");
  beginBooks(tl, BOOKS_URLS.paymentDetails, "payment-details", [0.65, 0.25]);
  tl.setVar("booksActivePayment", INITIAL_PAYMENTS[1]);

  await tl.wait(400);
  tl.showCaption(STEP115_CAPTIONS.downloadPdf);
  await pressOn(tl, "[data-tl=btn-download-payment-pdf]");

  await tl.wait(600);
  tl.showCaption(STEP115_CAPTIONS.pdfSaved);

  await tl.wait(1000);
  await finishBooks(tl, STEP115_DURATION_MS);
}
