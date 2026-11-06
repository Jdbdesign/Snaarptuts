import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
  scrollView,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP134_CAPTIONS } from "./data";

export const STEP134_DURATION_MS = 6500;

export async function runStep134(tl: Timeline) {
  tl.setVar("__sceneId", "step134");
  beginBooks(tl, BOOKS_URLS.newCreditNote, "new-credit-note", [0.5, 0.75]);
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
  ]);

  await scrollView(tl, 300);

  await tl.wait(400);
  tl.showCaption(STEP134_CAPTIONS.saveOpen, { target: "[data-tl=btn-save-credit-note-open]" });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=btn-save-credit-note-open]", { ring: false });

  await tl.wait(800);
  tl.showCaption(STEP134_CAPTIONS.completed);
  await ring(tl, "[data-tl=card-credit-notes-table]", 1200);

  await tl.wait(800);
  await finishBooks(tl, STEP134_DURATION_MS);
}
