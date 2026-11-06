import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP88_CAPTIONS } from "./data";

export const STEP88_DURATION_MS = 8000;

export async function runStep88(tl: Timeline) {
  tl.setVar("__sceneId", "step88");
  beginBooks(tl, BOOKS_URLS.newReceipt, "new-receipt", [0.35, 0.45]);
  tl.setVar("booksReceiptCustomer", "Sterling Interiors");
  tl.setVar("booksReceiptLineItems", [
    { id: "row-0", name: "", quantity: 1, rate: 0, tax: "VAT Standard (20%)", amount: 0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP88_CAPTIONS.pickItem);
  await pressOn(tl, "[data-tl=input-item-select-0]");
  await pressOn(tl, "[data-tl=item-opt-rice]");

  await tl.wait(400);
  tl.showCaption(STEP88_CAPTIONS.qtyAndTotals);
  await pressOn(tl, "[data-tl=input-item-qty-0]");
  tl.setVar("booksReceiptLineItems", [
    { id: "row-0", name: "Organic Rice 25kg", quantity: 5, rate: 20.0, tax: "VAT Standard (20%)", amount: 100.0 },
  ]);

  await tl.wait(600);
  await ring(tl, "[data-tl=text-receipt-subtotal]", 1000);
  await ring(tl, "[data-tl=text-receipt-tax]", 1000);
  await ring(tl, "[data-tl=text-receipt-total]", 1000);

  await finishBooks(tl, STEP88_DURATION_MS);
}
