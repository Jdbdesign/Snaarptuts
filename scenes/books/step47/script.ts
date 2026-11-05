import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP47_CAPTIONS } from "./data";

export const STEP47_DURATION_MS = 9000;

export async function runStep47(tl: Timeline) {
  tl.setVar("__sceneId", "step47");
  beginBooks(tl, BOOKS_URLS.newQuote, "new-quote", [0.85, 0.55]);
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
  ]);

  await tl.wait(400);
  tl.showCaption(STEP47_CAPTIONS.scan);
  await pressOn(tl, "[data-tl=btn-scan-item]");

  await tl.wait(600);
  tl.showCaption(STEP47_CAPTIONS.enterBarcode);
  await pressOn(tl, "[data-tl=input-barcode]");
  await tl.typeText("[data-tl=input-barcode]", "5012345678900");
  tl.setVar("booksQuoteScanInput", "5012345678900");

  await tl.wait(500);
  tl.showCaption(STEP47_CAPTIONS.add);
  await pressOn(tl, "[data-tl=btn-add-barcode]");
  await tl.wait(1800);

  await finishBooks(tl, STEP47_DURATION_MS);
}
