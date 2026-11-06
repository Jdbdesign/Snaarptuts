import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP89_CAPTIONS } from "./data";

export const STEP89_DURATION_MS = 6500;

export async function runStep89(tl: Timeline) {
  tl.setVar("__sceneId", "step89");
  beginBooks(tl, BOOKS_URLS.newReceipt, "new-receipt", [0.8, 0.5]);
  tl.setVar("booksReceiptCustomer", "Sterling Interiors");
  tl.setVar("booksReceiptLineItems", [
    { id: "row-0", name: "Organic Rice 25kg", quantity: 5, rate: 20.0, tax: "VAT Standard (20%)", amount: 100.0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP89_CAPTIONS.openScan);
  await pressOn(tl, "[data-tl=btn-receipt-scan-item]");

  await tl.wait(600);
  tl.showCaption(STEP89_CAPTIONS.confirmScan);
  await pressOn(tl, "[data-tl=input-scan-barcode]");
  tl.setVar("booksReceiptScanInput", "DEL-FEE-01");
  await pressOn(tl, "[data-tl=btn-confirm-scan]");

  await tl.wait(800);
  await finishBooks(tl, STEP89_DURATION_MS);
}
