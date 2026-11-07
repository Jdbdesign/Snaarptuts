import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP95_CAPTIONS } from "./data";

export const STEP95_DURATION_MS = 8300;

export async function runStep95(tl: Timeline) {
  tl.setVar("__sceneId", "step95");
  beginBooks(tl, BOOKS_URLS.newReceipt, "new-receipt", [0.75, 0.95]);
  tl.setVar("booksReceiptCustomer", "Harvest Tables Ltd");
  tl.setVar("booksReceiptReference", "BT-9901");
  tl.setVar("booksReceiptLineItems", [
    { id: "row-0", name: "Palm Oil 5L", quantity: 10, rate: 15.0, tax: "VAT Standard (20%)", amount: 150.0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP95_CAPTIONS.saveAndSend);
  await pressOn(tl, "[data-tl=btn-save-and-send-receipt]");

  await tl.wait(1000);
  tl.showCaption(STEP95_CAPTIONS.result);
  await ring(tl, "[data-tl=receipt-status-badge]", 1200);

  await finishBooks(tl, STEP95_DURATION_MS);
}
