import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP52_CAPTIONS } from "./data";

export const STEP52_DURATION_MS = 11000;

export async function runStep52(tl: Timeline) {
  tl.setVar("__sceneId", "step52");
  beginBooks(tl, BOOKS_URLS.newQuote, "new-quote", [0.45, 0.85]);
  tl.setVar("booksQuoteCustomer", "Harvest Tables Ltd");
  tl.setVar("booksQuoteNumber", "QT-0009");
  tl.setVar("booksQuoteReference", "HT-2026-99");
  tl.setVar("booksQuoteDate", "11/05/2026");
  tl.setVar("booksQuoteExpiryDate", "11/19/2026");
  tl.setVar("booksQuoteSalesperson", "Sam Taylor");
  tl.setVar("booksQuoteProject", "Autumn Produce Supply");
  tl.setVar("booksQuoteSubject", "Catering quote");
  tl.setVar("booksQuoteDiscount", 0);
  tl.setVar("booksQuoteShipping", 0);
  tl.setVar("booksQuoteAdjustment", 0);
  tl.setVar("booksQuoteLineItems", [
    {
      id: "row-1",
      name: "Palm Oil 5L",
      quantity: 6,
      rate: 18.5,
      tax: "-",
      amount: 111.0,
    },
    {
      id: "row-2",
      name: "Delivery Fee",
      quantity: 1,
      rate: 10.0,
      tax: "-",
      amount: 10.0,
    },
  ]);
  tl.setVar(
    "booksQuoteCustomerNotes",
    "Thanks for your order. Delivery scheduled upon receipt."
  );
  tl.setVar("booksQuoteFiles", []);
  tl.setVar(
    "booksQuoteTerms",
    "Payment due upon delivery. Goods remain property of Snaarp until settled in full."
  );

  await tl.wait(400);
  tl.showCaption(STEP52_CAPTIONS.template);
  await ring(tl, "[data-tl=link-pdf-template]", 1200);

  await tl.wait(300);
  tl.showCaption(STEP52_CAPTIONS.saveSend);
  await pressOn(tl, "[data-tl=btn-save-send-quote]");

  await tl.wait(800);
  tl.showCaption(STEP52_CAPTIONS.sent);
  await ring(tl, "[data-tl=quote-detail-status]", 1500);
  await tl.wait(1000);

  await finishBooks(tl, STEP52_DURATION_MS);
}
