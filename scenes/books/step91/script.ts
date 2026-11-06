import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP91_CAPTIONS } from "./data";

export const STEP91_DURATION_MS = 7500;

export async function runStep91(tl: Timeline) {
  tl.setVar("__sceneId", "step91");
  beginBooks(tl, BOOKS_URLS.newReceipt, "new-receipt", [0.75, 0.65]);
  tl.setVar("booksReceiptCustomer", "Sterling Interiors");
  tl.setVar("booksReceiptLineItems", [
    { id: "row-0", name: "Organic Rice 25kg", quantity: 5, rate: 20.0, tax: "VAT Standard (20%)", amount: 100.0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP91_CAPTIONS.discount);
  await pressOn(tl, "[data-tl=input-receipt-discount]");
  tl.setVar("booksReceiptDiscount", 5);

  await tl.wait(400);
  tl.showCaption(STEP91_CAPTIONS.shipping);
  await pressOn(tl, "[data-tl=input-receipt-shipping]");
  tl.setVar("booksReceiptShipping", 4.0);

  await tl.wait(400);
  tl.showCaption(STEP91_CAPTIONS.adjustment);
  await pressOn(tl, "[data-tl=input-receipt-adjustment]");
  tl.setVar("booksReceiptAdjustment", 2.0);

  await tl.wait(600);
  await ring(tl, "[data-tl=text-receipt-total]", 1200);

  await finishBooks(tl, STEP91_DURATION_MS);
}
