import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP69_CAPTIONS } from "./data";

export const STEP69_DURATION_MS = 8500;

export async function runStep69(tl: Timeline) {
  tl.setVar("__sceneId", "step69");
  beginBooks(tl, BOOKS_URLS.newInvoice, "new-invoice", [0.45, 0.6]);
  tl.setVar("booksInvoiceCustomer", "Sterling Interiors");
  tl.setVar("booksInvoiceNumber", "INV10013");
  tl.setVar("booksInvoiceOrderNumber", "PO-8820");
  tl.setVar("booksInvoiceTerms", "Net 30");
  tl.setVar("booksInvoiceSalesperson", "Sam Taylor");
  tl.setVar(
    "booksInvoiceSubject",
    "Office furniture and supplies order"
  );

  await tl.wait(400);
  tl.showCaption(STEP69_CAPTIONS.selectFirstItem);
  await pressOn(tl, "[data-tl=btn-select-invoice-item-0]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=item-option-food-farm-1]");

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
  ]);

  await tl.wait(500);
  tl.showCaption(STEP69_CAPTIONS.addSecondLine);
  await pressOn(tl, "[data-tl=btn-invoice-add-line]");

  await tl.wait(500);
  tl.showCaption(STEP69_CAPTIONS.selectSecondItem);
  await pressOn(tl, "[data-tl=btn-select-invoice-item-1]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=item-option-food-farm-2]");

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
  ]);

  await tl.wait(600);
  tl.showCaption(STEP69_CAPTIONS.subTotalUpdated);
  await ring(tl, "[data-tl=invoice-subtotal-display]", 1500);

  await finishBooks(tl, STEP69_DURATION_MS);
}
