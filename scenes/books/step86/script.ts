import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP86_CAPTIONS } from "./data";

export const STEP86_DURATION_MS = 15800;

export async function runStep86(tl: Timeline) {
  tl.setVar("__sceneId", "step86");
  beginBooks(tl, BOOKS_URLS.newReceipt, "new-receipt", [0.45, 0.25]);
  tl.setVar("booksReceiptCustomer", "Sterling Interiors");

  await tl.wait(400);
  tl.showCaption(STEP86_CAPTIONS.setDate);
  await pressOn(tl, "[data-tl=btn-receipt-date-picker]");
  await pressOn(tl, "[data-tl=cal-day-5]");

  await tl.wait(400);
  tl.showCaption(STEP86_CAPTIONS.numbering);
  await pressOn(tl, "[data-tl=btn-receipt-numbering-settings]");

  await tl.wait(600);
  await ring(tl, "[data-tl=input-receipt-next-number]", 1000);
  await pressOn(tl, "[data-tl=btn-save-receipt-numbering]");

  await tl.wait(600);
  await finishBooks(tl, STEP86_DURATION_MS);
}
