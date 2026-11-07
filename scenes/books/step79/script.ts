import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP79_CAPTIONS } from "./data";

export const STEP79_DURATION_MS = 8000;

export async function runStep79(tl: Timeline) {
  tl.setVar("__sceneId", "step79");
  beginBooks(tl, BOOKS_URLS.salesReceipts, "receipts", [0.4, 0.2]);

  await tl.wait(400);
  tl.showCaption(STEP79_CAPTIONS.search);
  await pressOn(tl, "[data-tl=input-receipt-search]");
  tl.setVar("booksReceiptSearch", "acme");

  await tl.wait(1200);
  await ring(tl, "[data-tl=receipt-row-sr-2]", 1200);

  tl.showCaption(STEP79_CAPTIONS.clear);
  tl.setVar("booksReceiptSearch", "");
  await tl.wait(800);

  await finishBooks(tl, STEP79_DURATION_MS);
}
