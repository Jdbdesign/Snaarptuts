import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP51_CAPTIONS } from "./data";

export const STEP51_DURATION_MS = 8000;

export async function runStep51(tl: Timeline) {
  tl.setVar("__sceneId", "step51");
  beginBooks(tl, BOOKS_URLS.newQuote, "new-quote", [0.45, 0.85]);
  tl.setVar("booksQuoteCustomer", "Northfield Cafe");
  tl.setVar("booksQuoteNumber", "QT-0009");
  tl.setVar("booksQuoteReference", "NC-CATER-01");
  tl.setVar("booksQuoteDate", "11/05/2026");
  tl.setVar("booksQuoteExpiryDate", "11/19/2026");
  tl.setVar("booksQuoteSalesperson", "Sam Taylor");
  tl.setVar("booksQuoteProject", "Spring Catering Order");
  tl.setVar("booksQuoteSubject", "Catering supplies for Northfield Cafe");
  tl.setVar("booksQuoteDiscount", 5);
  tl.setVar("booksQuoteShipping", 4);
  tl.setVar("booksQuoteAdjustment", 2);
  tl.setVar("booksQuoteLineItems", [
    {
      id: "row-1",
      name: "Organic Rice 25kg",
      quantity: 2,
      rate: 42.0,
      tax: "-",
      amount: 84.0,
    },
    {
      id: "row-2",
      name: "Palm Oil 5L",
      quantity: 1,
      rate: 18.5,
      tax: "-",
      amount: 18.5,
    },
    {
      id: "row-3",
      name: "Ground Pepper 500g",
      quantity: 1,
      rate: 6.5,
      tax: "-",
      amount: 6.5,
    },
    {
      id: "row-4",
      name: "Honey Beans 1kg",
      quantity: 1,
      rate: 9.0,
      tax: "-",
      amount: 9.0,
    },
    {
      id: "row-5",
      name: "Yam Tubers",
      quantity: 1,
      rate: 14.0,
      tax: "-",
      amount: 14.0,
    },
    {
      id: "row-6",
      name: "Packaging Boxes",
      quantity: 1,
      rate: 12.0,
      tax: "-",
      amount: 12.0,
    },
  ]);
  tl.setVar(
    "booksQuoteCustomerNotes",
    "Thank you for your business. Delivery to the cafe on request."
  );
  tl.setVar("booksQuoteFiles", ["Catering-request.pdf"]);
  tl.setVar(
    "booksQuoteTerms",
    "Payment due within 14 days of acceptance. Prices are valid until the expiry date. Delivery within 3 working days of order."
  );

  await tl.wait(400);
  tl.showCaption(STEP51_CAPTIONS.saveDraft);
  await pressOn(tl, "[data-tl=btn-save-quote-draft]");

  await tl.wait(800);
  tl.showCaption(STEP51_CAPTIONS.openDraft);
  await pressOn(tl, "[data-tl=quote-link-1]");

  await tl.wait(500);
  tl.showCaption(STEP51_CAPTIONS.review);
  await ring(tl, "[data-tl=quote-detail-status]", 1500);
  await tl.wait(1000);

  await finishBooks(tl, STEP51_DURATION_MS);
}
