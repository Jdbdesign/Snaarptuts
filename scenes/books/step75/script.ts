import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP75_CAPTIONS } from "./data";

export const STEP75_DURATION_MS = 7500;

export async function runStep75(tl: Timeline) {
  tl.setVar("__sceneId", "step75");
  beginBooks(tl, BOOKS_URLS.newInvoice, "new-invoice", [0.45, 0.8]);
  tl.setVar("booksInvoiceCustomer", "Sterling Interiors");
  tl.setVar("booksInvoiceNumber", "INV10013");
  tl.setVar("booksInvoiceDiscount", 5);
  tl.setVar("booksInvoiceShipping", 4);
  tl.setVar("booksInvoiceAdjustment", 2);

  await tl.scrollTo("[data-scroller=true]", 650);

  await tl.wait(400);
  tl.showCaption(STEP75_CAPTIONS.selectScheduled);
  await pressOn(tl, "[data-tl=chip-plan-scheduled]");

  await tl.wait(500);
  tl.showCaption(STEP75_CAPTIONS.quickSplit3x);
  await pressOn(tl, "[data-tl=chip-split-3x]");

  await tl.wait(600);
  tl.showCaption(STEP75_CAPTIONS.sumVerified);
  await ring(tl, "[data-tl=plan-sum-check]", 1800);

  await finishBooks(tl, STEP75_DURATION_MS);
}
