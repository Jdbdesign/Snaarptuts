import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP49_CAPTIONS } from "./data";

export const STEP49_DURATION_MS = 24300;

export async function runStep49(tl: Timeline) {
  tl.setVar("__sceneId", "step49");
  beginBooks(tl, BOOKS_URLS.newQuote, "new-quote", [0.75, 0.65]);
  tl.setVar("booksQuoteCustomer", "Northfield Cafe");
  tl.setVar("booksQuoteNumber", "QT-0009");
  tl.setVar("booksQuoteLineItems", [
    { id: "row-1", name: "Organic Rice 25kg", quantity: 2, rate: 42.0, tax: "-", amount: 84.0 },
    { id: "row-2", name: "Palm Oil 5L", quantity: 1, rate: 18.5, tax: "-", amount: 18.5 },
    { id: "row-3", name: "Ground Pepper 500g", quantity: 1, rate: 6.5, tax: "-", amount: 6.5 },
    { id: "row-4", name: "Honey Beans 1kg", quantity: 1, rate: 9.0, tax: "-", amount: 9.0 },
    { id: "row-5", name: "Yam Tubers", quantity: 1, rate: 14.0, tax: "-", amount: 14.0 },
    { id: "row-6", name: "Packaging Boxes", quantity: 1, rate: 12.0, tax: "-", amount: 12.0 },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP49_CAPTIONS.discount);
  await pressOn(tl, "[data-tl=input-quote-discount]");
  await tl.typeText("[data-tl=input-quote-discount]", "5");
  tl.setVar("booksQuoteDiscount", 5);

  await tl.wait(600);
  tl.showCaption(STEP49_CAPTIONS.shipping);
  await pressOn(tl, "[data-tl=input-quote-shipping]");
  await tl.typeText("[data-tl=input-quote-shipping]", "4");
  tl.setVar("booksQuoteShipping", 4);

  await tl.wait(600);
  tl.showCaption(STEP49_CAPTIONS.adjustment);
  await pressOn(tl, "[data-tl=input-quote-adjustment]");
  await tl.typeText("[data-tl=input-quote-adjustment]", "2");
  tl.setVar("booksQuoteAdjustment", 2);
  await tl.wait(2000);

  await finishBooks(tl, STEP49_DURATION_MS);
}
