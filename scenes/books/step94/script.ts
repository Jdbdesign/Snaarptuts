import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP94_CAPTIONS } from "./data";

export const STEP94_DURATION_MS = 9500;

export async function runStep94(tl: Timeline) {
  tl.setVar("__sceneId", "step94");
  beginBooks(tl, BOOKS_URLS.newReceipt, "new-receipt", [0.85, 0.95]);
  tl.setVar("booksReceiptCustomer", "Sterling Interiors");
  tl.setVar("booksReceiptReference", "BT-5521");
  tl.setVar("booksReceiptLineItems", [
    { id: "row-0", name: "Organic Rice 25kg", quantity: 5, rate: 20.0, tax: "VAT Standard (20%)", amount: 100.0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP94_CAPTIONS.save);
  await pressOn(tl, "[data-tl=btn-save-receipt]");

  await tl.wait(1000);
  tl.showCaption(STEP94_CAPTIONS.result);
  await ring(tl, "[data-tl=receipt-status-badge]", 1200);
  await ring(tl, "[data-tl=card-receipt-totals]", 1200);

  await finishBooks(tl, STEP94_DURATION_MS);
}
