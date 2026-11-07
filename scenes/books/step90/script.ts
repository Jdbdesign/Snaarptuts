import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP90_CAPTIONS } from "./data";

export const STEP90_DURATION_MS = 19800;

export async function runStep90(tl: Timeline) {
  tl.setVar("__sceneId", "step90");
  beginBooks(tl, BOOKS_URLS.newReceipt, "new-receipt", [0.88, 0.5]);
  tl.setVar("booksReceiptCustomer", "Sterling Interiors");
  tl.setVar("booksReceiptLineItems", [
    { id: "row-0", name: "Organic Rice 25kg", quantity: 5, rate: 20.0, tax: "VAT Standard (20%)", amount: 100.0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP90_CAPTIONS.openBulk);
  await pressOn(tl, "[data-tl=btn-receipt-bulk-actions]");

  await tl.wait(600);
  tl.showCaption(STEP90_CAPTIONS.confirmBulk);
  await pressOn(tl, "[data-tl=input-bulk-search]");
  tl.setVar("booksReceiptBulkSearch", "tote");
  await pressOn(tl, "[data-tl=checkbox-bulk-item-tote]");
  await pressOn(tl, "[data-tl=btn-confirm-bulk-items]");

  await tl.wait(800);
  await finishBooks(tl, STEP90_DURATION_MS);
}
