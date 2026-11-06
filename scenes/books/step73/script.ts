import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP73_CAPTIONS } from "./data";

export const STEP73_DURATION_MS = 8000;

export async function runStep73(tl: Timeline) {
  tl.setVar("__sceneId", "step73");
  beginBooks(tl, BOOKS_URLS.newInvoice, "new-invoice", [0.45, 0.75]);
  tl.setVar("booksInvoiceCustomer", "Sterling Interiors");
  tl.setVar("booksInvoiceNumber", "INV10013");
  tl.setVar("booksInvoiceDiscount", 5);
  tl.setVar("booksInvoiceShipping", 4);
  tl.setVar("booksInvoiceAdjustment", 2);

  await tl.scrollTo("[data-scroller=true]", 450);

  await tl.wait(400);
  tl.showCaption(STEP73_CAPTIONS.customerNotes);
  await pressOn(tl, "[data-tl=textarea-invoice-customer-notes]");
  tl.setVar("booksInvoiceCustomerNotes", "Thank you for your business. Please reference PO-8820.");

  await tl.wait(500);
  tl.showCaption(STEP73_CAPTIONS.attachFile);
  await pressOn(tl, "[data-tl=btn-invoice-attach-file]");

  await tl.wait(500);
  tl.showCaption(STEP73_CAPTIONS.selectFile);
  await pressOn(tl, "[data-tl=file-invoice-item-f1]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=btn-attach-invoice-file]");

  await tl.wait(600);
  tl.showCaption(STEP73_CAPTIONS.reviewTerms);
  await ring(tl, "[data-tl=textarea-invoice-terms]", 1200);

  await finishBooks(tl, STEP73_DURATION_MS);
}
