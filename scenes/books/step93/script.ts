import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP93_CAPTIONS } from "./data";

export const STEP93_DURATION_MS = 19800;

export async function runStep93(tl: Timeline) {
  tl.setVar("__sceneId", "step93");
  beginBooks(tl, BOOKS_URLS.newReceipt, "new-receipt", [0.45, 0.85]);
  tl.setVar("booksReceiptCustomer", "Sterling Interiors");
  tl.setVar("booksReceiptLineItems", [
    { id: "row-0", name: "Organic Rice 25kg", quantity: 5, rate: 20.0, tax: "VAT Standard (20%)", amount: 100.0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP93_CAPTIONS.paymentMode);
  await pressOn(tl, "[data-tl=select-receipt-payment-mode]");
  await pressOn(tl, "[data-tl=payment-mode-opt-bank-transfer]");

  await tl.wait(400);
  tl.showCaption(STEP93_CAPTIONS.depositTo);
  await pressOn(tl, "[data-tl=select-receipt-deposit-to]");
  await pressOn(tl, "[data-tl=deposit-opt-bank-account]");

  await tl.wait(400);
  tl.showCaption(STEP93_CAPTIONS.reference);
  await pressOn(tl, "[data-tl=input-receipt-reference]");
  tl.setVar("booksReceiptReference", "BT-5521");

  await tl.wait(600);
  await finishBooks(tl, STEP93_DURATION_MS);
}
