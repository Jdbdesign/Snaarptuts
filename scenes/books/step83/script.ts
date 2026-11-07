import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_RECEIPTS } from "@/components/books/books-data";
import { STEP83_CAPTIONS } from "./data";

export const STEP83_DURATION_MS = 8500;

export async function runStep83(tl: Timeline) {
  tl.setVar("__sceneId", "step83");
  beginBooks(tl, BOOKS_URLS.receiptDetails, "receipt-detail", [0.82, 0.15]);
  tl.setVar("booksActiveReceipt", INITIAL_RECEIPTS[0]);

  await tl.wait(400);
  tl.showCaption(STEP83_CAPTIONS.preview);
  await pressOn(tl, "[data-tl=btn-preview-pdf]");

  await tl.wait(800);
  tl.showCaption(STEP83_CAPTIONS.close);
  await ring(tl, "[data-tl=text-pdf-page-indicator]", 1200);
  await pressOn(tl, "[data-tl=btn-close-pdf-preview]");

  await finishBooks(tl, STEP83_DURATION_MS);
}
