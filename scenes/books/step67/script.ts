import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP67_CAPTIONS } from "./data";

export const STEP67_DURATION_MS = 20800;

export async function runStep67(tl: Timeline) {
  tl.setVar("__sceneId", "step67");
  beginBooks(tl, BOOKS_URLS.newInvoice, "new-invoice", [0.45, 0.35]);
  tl.setVar("booksInvoiceCustomer", "Sterling Interiors");
  tl.setVar("booksInvoiceNumber", "INV10013");

  await tl.wait(400);
  tl.showCaption(STEP67_CAPTIONS.typeOrderNumber);
  await pressOn(tl, "[data-tl=input-invoice-order-number]");
  await tl.typeText("[data-tl=input-invoice-order-number]", "PO-8820");
  tl.setVar("booksInvoiceOrderNumber", "PO-8820");

  await tl.wait(500);
  tl.showCaption(STEP67_CAPTIONS.pickDate);
  await pressOn(tl, "[data-tl=btn-invoice-date-calendar]");
  await tl.wait(300);
  // close calendar by clicking invoice date
  await pressOn(tl, "[data-tl=btn-invoice-date-calendar]");

  await tl.wait(500);
  tl.showCaption(STEP67_CAPTIONS.selectTerms);
  await pressOn(tl, "[data-tl=select-invoice-terms]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=terms-opt-net-30]");

  await tl.wait(600);
  await ring(tl, "[data-tl=input-invoice-due-date]", 1200);

  await finishBooks(tl, STEP67_DURATION_MS);
}
