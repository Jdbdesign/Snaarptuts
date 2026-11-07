import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP46_CAPTIONS } from "./data";

export const STEP46_DURATION_MS = 33800;

export async function runStep46(tl: Timeline) {
  tl.setVar("__sceneId", "step46");
  beginBooks(tl, BOOKS_URLS.newQuote, "new-quote", [0.35, 0.65]);
  tl.setVar("booksQuoteCustomer", "Northfield Cafe");
  tl.setVar("booksQuoteNumber", "QT-0009");
  tl.setVar("booksQuoteReference", "NC-CATER-01");
  tl.setVar("booksQuoteDate", "11/05/2026");
  tl.setVar("booksQuoteExpiryDate", "11/19/2026");
  tl.setVar("booksQuoteSalesperson", "Sam Taylor");
  tl.setVar("booksQuoteProject", "Spring Catering Order");
  tl.setVar("booksQuoteSubject", "Catering supplies for Northfield Cafe");

  await tl.wait(400);
  tl.showCaption(STEP46_CAPTIONS.firstItem);
  await pressOn(tl, "[data-tl=input-item-select-0]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=item-opt-organic-rice]");

  await tl.wait(400);
  tl.showCaption(STEP46_CAPTIONS.setQtyRate);
  await pressOn(tl, "[data-tl=input-item-qty-0]");
  await tl.typeText("[data-tl=input-item-qty-0]", "2");
  await pressOn(tl, "[data-tl=input-item-rate-0]");
  await tl.typeText("[data-tl=input-item-rate-0]", "42");

  await tl.wait(400);
  tl.showCaption(STEP46_CAPTIONS.setTax);
  await pressOn(tl, "[data-tl=select-item-tax-0]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=tax-opt-vat-standard]");

  // Update row 0 in state
  tl.setVar("booksQuoteLineItems", [
    {
      id: "row-rice",
      name: "Organic Rice 25kg",
      quantity: 2,
      rate: 42.0,
      tax: "VAT Standard (20%)",
      amount: 84.0,
    },
  ]);

  await tl.wait(500);
  tl.showCaption(STEP46_CAPTIONS.addRow);
  await pressOn(tl, "[data-tl=btn-add-item-row]");

  await tl.wait(400);
  tl.showCaption(STEP46_CAPTIONS.secondItem);
  await pressOn(tl, "[data-tl=input-item-select-1]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=item-opt-palm-oil]");

  // Update line items with Palm Oil
  tl.setVar("booksQuoteLineItems", [
    {
      id: "row-rice",
      name: "Organic Rice 25kg",
      quantity: 2,
      rate: 42.0,
      tax: "VAT Standard (20%)",
      amount: 84.0,
    },
    {
      id: "row-palmoil",
      name: "Palm Oil 5L",
      quantity: 1,
      rate: 18.5,
      tax: "-",
      amount: 18.5,
    },
  ]);

  await tl.wait(500);
  tl.showCaption(STEP46_CAPTIONS.addEmpty);
  await pressOn(tl, "[data-tl=btn-add-item-row]");

  await tl.wait(500);
  tl.showCaption(STEP46_CAPTIONS.deleteRow);
  await pressOn(tl, "[data-tl=btn-delete-item-row-2]");
  await tl.wait(1500);

  await finishBooks(tl, STEP46_DURATION_MS);
}
