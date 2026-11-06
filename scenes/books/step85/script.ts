import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP85_CAPTIONS } from "./data";

export const STEP85_DURATION_MS = 6500;

export async function runStep85(tl: Timeline) {
  tl.setVar("__sceneId", "step85");
  beginBooks(tl, BOOKS_URLS.salesReceipts, "receipts", [0.85, 0.18]);

  await tl.wait(400);
  tl.showCaption(STEP85_CAPTIONS.clickNew);
  await pressOn(tl, "[data-tl=btn-new-receipt]");

  await tl.wait(600);
  tl.showCaption(STEP85_CAPTIONS.chooseCustomer);
  await pressOn(tl, "[data-tl=select-receipt-customer]");
  await pressOn(tl, "[data-tl=customer-opt-sterling]");

  await tl.wait(800);
  await finishBooks(tl, STEP85_DURATION_MS);
}
