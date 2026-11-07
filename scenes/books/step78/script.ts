import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP78_CAPTIONS } from "./data";

export const STEP78_DURATION_MS = 10000;

export async function runStep78(tl: Timeline) {
  tl.setVar("__sceneId", "step78");
  beginBooks(tl, BOOKS_URLS.salesReceipts, "receipts", [0.1, 0.45]);

  await tl.wait(400);
  tl.showCaption(STEP78_CAPTIONS.clickNav);
  await pressOn(tl, "[data-tl=nav-sales-receipts]");

  await tl.wait(600);
  tl.showCaption(STEP78_CAPTIONS.overview);
  await ring(tl, "[data-tl=receipts-title]", 1000);
  await ring(tl, "[data-tl=input-receipt-search]", 1000);
  await ring(tl, "[data-tl=card-receipts-table]", 1200);
  await ring(tl, "[data-tl=btn-new-receipt]", 1000);

  await finishBooks(tl, STEP78_DURATION_MS);
}
