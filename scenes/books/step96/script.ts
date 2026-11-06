import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_RECEIPTS } from "@/components/books/books-data";
import { STEP96_CAPTIONS } from "./data";

export const STEP96_DURATION_MS = 8000;

export async function runStep96(tl: Timeline) {
  tl.setVar("__sceneId", "step96");
  beginBooks(tl, BOOKS_URLS.salesReceipts, "receipts", [0.45, 0.45]);
  tl.setVar("booksActiveReceipt", INITIAL_RECEIPTS[1]);

  await tl.wait(400);
  tl.showCaption(STEP96_CAPTIONS.open);
  await pressOn(tl, "[data-tl=receipt-row-sr-1]");

  await tl.wait(600);
  tl.showCaption(STEP96_CAPTIONS.delete);
  await pressOn(tl, "[data-tl=btn-delete-receipt]");

  await tl.wait(600);
  tl.showCaption(STEP96_CAPTIONS.confirm);
  await pressOn(tl, "[data-tl=btn-confirm-receipt-delete]");

  await tl.wait(1000);
  await ring(tl, "[data-tl=card-receipts-table]", 1200);

  await finishBooks(tl, STEP96_DURATION_MS);
}
