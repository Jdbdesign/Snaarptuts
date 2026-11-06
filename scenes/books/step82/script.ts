import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_RECEIPTS } from "@/components/books/books-data";
import { STEP82_CAPTIONS } from "./data";

export const STEP82_DURATION_MS = 5500;

export async function runStep82(tl: Timeline) {
  tl.setVar("__sceneId", "step82");
  beginBooks(tl, BOOKS_URLS.receiptDetails, "receipt-detail", [0.75, 0.15]);
  tl.setVar("booksActiveReceipt", INITIAL_RECEIPTS[0]);

  await tl.wait(400);
  tl.showCaption(STEP82_CAPTIONS.download);
  await pressOn(tl, "[data-tl=btn-download-pdf]");

  await tl.wait(1500);
  await finishBooks(tl, STEP82_DURATION_MS);
}
