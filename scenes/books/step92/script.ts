import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP92_CAPTIONS } from "./data";

export const STEP92_DURATION_MS = 16800;

export async function runStep92(tl: Timeline) {
  tl.setVar("__sceneId", "step92");
  beginBooks(tl, BOOKS_URLS.newReceipt, "new-receipt", [0.35, 0.65]);
  tl.setVar("booksReceiptCustomer", "Sterling Interiors");
  tl.setVar("booksReceiptLineItems", [
    { id: "row-0", name: "Organic Rice 25kg", quantity: 5, rate: 20.0, tax: "VAT Standard (20%)", amount: 100.0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP92_CAPTIONS.notes);
  await pressOn(tl, "[data-tl=textarea-receipt-notes]");
  tl.setVar("booksReceiptCustomerNotes", "Thank you for prompt payment.");

  await tl.wait(400);
  tl.showCaption(STEP92_CAPTIONS.attachment);
  await pressOn(tl, "[data-tl=btn-receipt-attach-file]");
  await pressOn(tl, "[data-tl=file-opt-payment-slip]");
  await pressOn(tl, "[data-tl=btn-confirm-file-upload]");

  await tl.wait(400);
  tl.showCaption(STEP92_CAPTIONS.terms);
  await pressOn(tl, "[data-tl=textarea-receipt-terms]");
  tl.setVar("booksReceiptTerms", "Receipt valid as proof of payment.");

  await tl.wait(600);
  await finishBooks(tl, STEP92_DURATION_MS);
}
