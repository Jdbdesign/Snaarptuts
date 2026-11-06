import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_PAYMENTS } from "@/components/books/books-data";
import { STEP116_CAPTIONS } from "./data";

export const STEP116_DURATION_MS = 6500;

export async function runStep116(tl: Timeline) {
  tl.setVar("__sceneId", "step116");
  beginBooks(tl, BOOKS_URLS.paymentDetails, "payment-details", [0.75, 0.25]);
  tl.setVar("booksActivePayment", INITIAL_PAYMENTS[1]);

  await tl.wait(400);
  tl.showCaption(STEP116_CAPTIONS.previewPdf);
  await pressOn(tl, "[data-tl=btn-preview-payment-pdf]");

  await tl.wait(700);
  await ring(tl, "[data-tl=card-payment-pdf-paper]", 1000);

  tl.showCaption(STEP116_CAPTIONS.closePreview);
  await pressOn(tl, "[data-tl=btn-close-payment-pdf-preview]");

  await tl.wait(800);
  await finishBooks(tl, STEP116_DURATION_MS);
}
