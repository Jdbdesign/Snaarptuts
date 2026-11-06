import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP80_CAPTIONS } from "./data";

export const STEP80_DURATION_MS = 8500;

export async function runStep80(tl: Timeline) {
  tl.setVar("__sceneId", "step80");
  beginBooks(tl, BOOKS_URLS.salesReceipts, "receipts", [0.35, 0.35]);

  await tl.wait(400);
  tl.showCaption(STEP80_CAPTIONS.open);
  await pressOn(tl, "[data-tl=receipt-row-sr-2]");

  await tl.wait(600);
  tl.showCaption(STEP80_CAPTIONS.inspect);
  await ring(tl, "[data-tl=card-receipt-details]", 1000);
  await ring(tl, "[data-tl=card-receipt-items]", 1000);
  await ring(tl, "[data-tl=card-receipt-notes]", 1000);
  await ring(tl, "[data-tl=btn-send-receipt]", 800);
  await ring(tl, "[data-tl=btn-download-pdf]", 800);
  await ring(tl, "[data-tl=btn-preview-pdf]", 800);
  await ring(tl, "[data-tl=btn-edit-receipt]", 800);
  await ring(tl, "[data-tl=btn-delete-receipt]", 800);

  await finishBooks(tl, STEP80_DURATION_MS);
}
