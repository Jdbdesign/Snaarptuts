import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP50_CAPTIONS } from "./data";

export const STEP50_DURATION_MS = 12000;

export async function runStep50(tl: Timeline) {
  tl.setVar("__sceneId", "step50");
  beginBooks(tl, BOOKS_URLS.newQuote, "new-quote", [0.35, 0.75]);
  tl.setVar("booksQuoteCustomer", "Northfield Cafe");
  tl.setVar("booksQuoteNumber", "QT-0009");
  tl.setVar("booksQuoteDiscount", 5);
  tl.setVar("booksQuoteShipping", 4);
  tl.setVar("booksQuoteAdjustment", 2);
  tl.setVar("booksQuoteLineItems", [
    { id: "row-1", name: "Organic Rice 25kg", quantity: 2, rate: 42.0, tax: "-", amount: 84.0 },
    { id: "row-2", name: "Palm Oil 5L", quantity: 1, rate: 18.5, tax: "-", amount: 18.5 },
    { id: "row-3", name: "Ground Pepper 500g", quantity: 1, rate: 6.5, tax: "-", amount: 6.5 },
    { id: "row-4", name: "Honey Beans 1kg", quantity: 1, rate: 9.0, tax: "-", amount: 9.0 },
    { id: "row-5", name: "Yam Tubers", quantity: 1, rate: 14.0, tax: "-", amount: 14.0 },
    { id: "row-6", name: "Packaging Boxes", quantity: 1, rate: 12.0, tax: "-", amount: 12.0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP50_CAPTIONS.notes);
  await pressOn(tl, "[data-tl=input-customer-notes]");
  const newNotes =
    "Thank you for your business. Delivery to the cafe on request.";
  await tl.typeText("[data-tl=input-customer-notes]", newNotes);
  tl.setVar("booksQuoteCustomerNotes", newNotes);

  await tl.wait(500);
  tl.showCaption(STEP50_CAPTIONS.upload);
  await pressOn(tl, "[data-tl=btn-upload-quote-file]");

  await tl.wait(400);
  tl.showCaption(STEP50_CAPTIONS.chooseFile);
  await pressOn(tl, "[data-tl=file-option-catering-request]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=btn-attach-file]");

  await tl.wait(500);
  tl.showCaption(STEP50_CAPTIONS.terms);
  await pressOn(tl, "[data-tl=input-quote-terms]");
  const termsText =
    "Payment due within 14 days of acceptance. Prices are valid until the expiry date. Delivery within 3 working days of order.";
  await tl.typeText("[data-tl=input-quote-terms]", termsText);
  tl.setVar("booksQuoteTerms", termsText);

  await tl.wait(500);
  tl.showCaption(STEP50_CAPTIONS.additional);
  await ring(tl, "[data-tl=note-additional-fields]", 1500);
  await tl.wait(1000);

  await finishBooks(tl, STEP50_DURATION_MS);
}
