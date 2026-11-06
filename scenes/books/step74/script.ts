import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP74_CAPTIONS } from "./data";

export const STEP74_DURATION_MS = 7000;

export async function runStep74(tl: Timeline) {
  tl.setVar("__sceneId", "step74");
  beginBooks(tl, BOOKS_URLS.newInvoice, "new-invoice", [0.45, 0.8]);
  tl.setVar("booksInvoiceCustomer", "Sterling Interiors");
  tl.setVar("booksInvoiceNumber", "INV10013");
  tl.setVar("booksInvoiceDiscount", 5);
  tl.setVar("booksInvoiceShipping", 4);
  tl.setVar("booksInvoiceAdjustment", 2);

  await tl.scrollTo("[data-scroller=true]", 650);

  await tl.wait(400);
  tl.showCaption(STEP74_CAPTIONS.selectFlexible);
  await pressOn(tl, "[data-tl=plan-chip-flexible]");

  await tl.wait(500);
  tl.showCaption(STEP74_CAPTIONS.optionalPin);
  await pressOn(tl, "[data-tl=input-invoice-plan-pin]");
  await tl.typeText("[data-tl=input-invoice-plan-pin]", "4821");
  tl.setVar("booksInvoicePlanPin", "4821");

  await tl.wait(600);
  tl.showCaption(STEP74_CAPTIONS.planConfigured);
  await ring(tl, "[data-tl=invoice-payment-plan-section]", 1500);

  await finishBooks(tl, STEP74_DURATION_MS);
}
