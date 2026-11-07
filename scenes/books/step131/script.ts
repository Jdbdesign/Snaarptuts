import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP131_CAPTIONS } from "./data";

export const STEP131_DURATION_MS = 14200;

export async function runStep131(tl: Timeline) {
  tl.setVar("__sceneId", "step131");
  beginBooks(tl, BOOKS_URLS.newCreditNote, "new-credit-note", [0.75, 0.5]);
  tl.setVar("booksCreditNoteCustomer", "Harvest Tables Ltd");
  tl.setVar("booksCreditNoteLineItems", [
    {
      id: "cn-row-0",
      name: "Organic Rice 25kg",
      description: "Organic long-grain rice, 25kg bag",
      account: "Sales",
      quantity: 2,
      rate: 29.0,
      tax: "VAT Standard (20%)",
      amount: 58.0,
    },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP131_CAPTIONS.openBulk);
  await pressOn(tl, "[data-tl=btn-credit-note-bulk-items]");

  await tl.wait(500);
  tl.showCaption(STEP131_CAPTIONS.selectItem);
  await pressOn(tl, "[data-tl=bulk-item-row-item-2]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=btn-confirm-credit-note-bulk]");

  await tl.wait(800);
  await finishBooks(tl, STEP131_DURATION_MS);
}
