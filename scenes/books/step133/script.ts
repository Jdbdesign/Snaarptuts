import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  scrollView,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP133_CAPTIONS } from "./data";

export const STEP133_DURATION_MS = 8300;

export async function runStep133(tl: Timeline) {
  tl.setVar("__sceneId", "step133");
  beginBooks(tl, BOOKS_URLS.newCreditNote, "new-credit-note", [0.5, 0.65]);
  tl.setVar("booksCreditNoteCustomer", "Harvest Tables Ltd");

  await scrollView(tl, 450);

  await tl.wait(400);
  tl.showCaption(STEP133_CAPTIONS.customerNotes);
  await pressOn(tl, "[data-tl=textarea-credit-note-customer-notes]");
  tl.setVar("booksCreditNoteCustomerNotes", "Credit issued for defective packaging");

  await tl.wait(500);
  tl.showCaption(STEP133_CAPTIONS.terms);
  await pressOn(tl, "[data-tl=textarea-credit-note-terms]");
  tl.setVar("booksCreditNoteTerms", "Credit valid for 90 days against future invoices.");

  await tl.wait(800);
  await finishBooks(tl, STEP133_DURATION_MS);
}
