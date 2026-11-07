import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP72_CAPTIONS } from "./data";

export const STEP72_DURATION_MS = 15300;

export async function runStep72(tl: Timeline) {
  tl.setVar("__sceneId", "step72");
  beginBooks(tl, BOOKS_URLS.newInvoice, "new-invoice", [0.75, 0.7]);
  tl.setVar("booksInvoiceCustomer", "Sterling Interiors");
  tl.setVar("booksInvoiceNumber", "INV10013");
  tl.setVar("booksInvoiceOrderNumber", "PO-8820");
  tl.setVar("booksInvoiceTerms", "Net 30");
  tl.setVar("booksInvoiceSalesperson", "Sam Taylor");
  tl.setVar(
    "booksInvoiceSubject",
    "Office furniture and supplies order"
  );
  tl.setVar("booksInvoiceLineItems", [
    {
      id: "row-rice",
      name: "Organic Rice 5kg",
      description: "Premium long-grain parboiled white rice",
      quantity: 2,
      rate: 42.0,
      tax: "-",
      amount: 84.0,
    },
    {
      id: "row-flour",
      name: "Cassava Flour 10kg",
      description: "Gluten-free baking grade flour",
      quantity: 3,
      rate: 24.0,
      tax: "-",
      amount: 72.0,
    },
    {
      id: "scan-delivery-fee",
      name: "Delivery Fee",
      quantity: 1,
      rate: 10.0,
      tax: "-",
      amount: 10.0,
    },
    {
      id: "bulk-item-1",
      name: "Reusable Tote Bag",
      description: "Organic cotton canvas tote bag",
      quantity: 1,
      rate: 20.0,
      tax: "-",
      amount: 20.0,
    },
    {
      id: "bulk-item-2",
      name: "Notebook A5",
      description: "Recycled paper journal",
      quantity: 1,
      rate: 5.0,
      tax: "-",
      amount: 5.0,
    },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP72_CAPTIONS.applyDiscount);
  await pressOn(tl, "[data-tl=input-invoice-discount]");
  await tl.typeText("[data-tl=input-invoice-discount]", "5");
  tl.setVar("booksInvoiceDiscount", 5);

  await tl.wait(500);
  tl.showCaption(STEP72_CAPTIONS.addShipping);
  await pressOn(tl, "[data-tl=input-invoice-shipping]");
  await tl.typeText("[data-tl=input-invoice-shipping]", "4");
  tl.setVar("booksInvoiceShipping", 4);

  await tl.wait(500);
  tl.showCaption(STEP72_CAPTIONS.addAdjustment);
  await pressOn(tl, "[data-tl=input-invoice-adjustment]");
  await tl.typeText("[data-tl=input-invoice-adjustment]", "2");
  tl.setVar("booksInvoiceAdjustment", 2);

  await tl.wait(600);
  tl.showCaption(STEP72_CAPTIONS.totalCalculated);
  await ring(tl, "[data-tl=invoice-total-amount]", 1500);

  await finishBooks(tl, STEP72_DURATION_MS);
}
