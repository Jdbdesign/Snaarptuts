import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP48_CAPTIONS } from "./data";

export const STEP48_DURATION_MS = 13000;

export async function runStep48(tl: Timeline) {
  tl.setVar("__sceneId", "step48");
  beginBooks(tl, BOOKS_URLS.newQuote, "new-quote", [0.45, 0.7]);
  tl.setVar("booksQuoteCustomer", "Northfield Cafe");
  tl.setVar("booksQuoteNumber", "QT-0009");
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
    {
      id: "row-groundpepper",
      name: "Ground Pepper 500g",
      quantity: 1,
      rate: 6.5,
      tax: "-",
      amount: 6.5,
    },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP48_CAPTIONS.bulk);
  await pressOn(tl, "[data-tl=btn-add-items-bulk]");

  await tl.wait(600);
  tl.showCaption(STEP48_CAPTIONS.search);
  await pressOn(tl, "[data-tl=input-bulk-search]");
  await tl.typeText("[data-tl=input-bulk-search]", "honey");
  tl.setVar("booksQuoteBulkSearch", "honey");

  await tl.wait(400);
  await pressOn(tl, "[data-tl=checkbox-bulk-item-honey-beans]");

  await tl.wait(600);
  tl.showCaption(STEP48_CAPTIONS.selectRemaining);
  await pressOn(tl, "[data-tl=input-bulk-search]");
  await tl.typeText("[data-tl=input-bulk-search]", "");
  tl.setVar("booksQuoteBulkSearch", "");

  await tl.wait(400);
  await pressOn(tl, "[data-tl=checkbox-bulk-item-yam-tubers]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=checkbox-bulk-item-packaging-boxes]");

  await tl.wait(600);
  tl.showCaption(STEP48_CAPTIONS.confirm);
  await pressOn(tl, "[data-tl=btn-confirm-bulk-add]");
  await tl.wait(2000);

  await finishBooks(tl, STEP48_DURATION_MS);
}
