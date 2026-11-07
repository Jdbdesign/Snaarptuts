import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_RECEIPTS } from "@/components/books/books-data";
import { STEP81_CAPTIONS } from "./data";

export const STEP81_DURATION_MS = 7800;

export async function runStep81(tl: Timeline) {
  tl.setVar("__sceneId", "step81");
  beginBooks(tl, BOOKS_URLS.receiptDetails, "receipt-detail", [0.65, 0.15]);
  tl.setVar("booksActiveReceipt", INITIAL_RECEIPTS[0]);

  await tl.wait(400);
  tl.showCaption(STEP81_CAPTIONS.send);
  await pressOn(tl, "[data-tl=btn-send-receipt]");

  await tl.wait(1200);
  tl.showCaption(STEP81_CAPTIONS.success);
  await ring(tl, "[data-tl=receipt-status-badge]", 1500);

  await finishBooks(tl, STEP81_DURATION_MS);
}
