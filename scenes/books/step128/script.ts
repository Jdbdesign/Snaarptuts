import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP128_CAPTIONS } from "./data";

export const STEP128_DURATION_MS = 5500;

export async function runStep128(tl: Timeline) {
  tl.setVar("__sceneId", "step128");
  beginBooks(tl, BOOKS_URLS.newCreditNote, "new-credit-note", [0.45, 0.35]);

  await tl.wait(400);
  tl.showCaption(STEP128_CAPTIONS.selectCustomer);
  await pressOn(tl, "[data-tl=select-credit-note-customer]");
  tl.setVar("booksCreditNoteCustomer", "Harvest Tables Ltd");

  await tl.wait(600);
  tl.showCaption(STEP128_CAPTIONS.customerSelected);

  await tl.wait(800);
  await finishBooks(tl, STEP128_DURATION_MS);
}
