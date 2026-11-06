import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP130_CAPTIONS } from "./data";

export const STEP130_DURATION_MS = 6500;

export async function runStep130(tl: Timeline) {
  tl.setVar("__sceneId", "step130");
  beginBooks(tl, BOOKS_URLS.newCreditNote, "new-credit-note", [0.45, 0.55]);
  tl.setVar("booksCreditNoteCustomer", "Harvest Tables Ltd");

  await tl.wait(400);
  tl.showCaption(STEP130_CAPTIONS.addItem);
  await pressOn(tl, "[data-tl=input-credit-note-item-0]");
  await pressOn(tl, "[data-tl=select-credit-note-account-0]");

  await tl.wait(400);
  tl.showCaption(STEP130_CAPTIONS.setQtyRate);
  await pressOn(tl, "[data-tl=input-credit-note-qty-0]");
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

  await tl.wait(800);
  await finishBooks(tl, STEP130_DURATION_MS);
}
