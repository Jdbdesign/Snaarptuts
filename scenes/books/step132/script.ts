import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP132_CAPTIONS } from "./data";

export const STEP132_DURATION_MS = 6000;

export async function runStep132(tl: Timeline) {
  tl.setVar("__sceneId", "step132");
  beginBooks(tl, BOOKS_URLS.newCreditNote, "new-credit-note", [0.65, 0.65]);
  tl.setVar("booksCreditNoteCustomer", "Harvest Tables Ltd");
  tl.setVar("booksCreditNoteLineItems", [
    {
      id: "cn-row-0",
      name: "Organic Rice 25kg",
      account: "Sales",
      quantity: 2,
      rate: 29.0,
      tax: "VAT Standard (20%)",
      amount: 58.0,
    },
    {
      id: "cn-row-1",
      name: "Palm Oil 5L",
      account: "Sales",
      quantity: 1,
      rate: 11.0,
      tax: "VAT Standard (20%)",
      amount: 11.0,
    },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP132_CAPTIONS.applyDiscount);
  await pressOn(tl, "[data-tl=input-credit-note-discount]");
  tl.setVar("booksCreditNoteDiscount", 5);

  await tl.wait(600);
  tl.showCaption(STEP132_CAPTIONS.reviewTotal);
  await ring(tl, "[data-tl=credit-note-total-amount]", 1200);

  await tl.wait(800);
  await finishBooks(tl, STEP132_DURATION_MS);
}
