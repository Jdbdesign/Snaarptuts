import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP87_CAPTIONS } from "./data";

export const STEP87_DURATION_MS = 5500;

export async function runStep87(tl: Timeline) {
  tl.setVar("__sceneId", "step87");
  beginBooks(tl, BOOKS_URLS.newReceipt, "new-receipt", [0.75, 0.3]);
  tl.setVar("booksReceiptCustomer", "Sterling Interiors");

  await tl.wait(400);
  tl.showCaption(STEP87_CAPTIONS.salesperson);
  await pressOn(tl, "[data-tl=select-receipt-salesperson]");
  await pressOn(tl, "[data-tl=salesperson-opt-sam]");

  await tl.wait(800);
  await finishBooks(tl, STEP87_DURATION_MS);
}
