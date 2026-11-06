import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP70_CAPTIONS } from "./data";

export const STEP70_DURATION_MS = 7500;

export async function runStep70(tl: Timeline) {
  tl.setVar("__sceneId", "step70");
  beginBooks(tl, BOOKS_URLS.newInvoice, "new-invoice", [0.2, 0.7]);
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
  ]);

  await tl.wait(400);
  tl.showCaption(STEP70_CAPTIONS.clickScan);
  await pressOn(tl, "[data-tl=btn-invoice-scan-item]");

  await tl.wait(500);
  tl.showCaption(STEP70_CAPTIONS.enterBarcode);
  await pressOn(tl, "[data-tl=input-invoice-barcode]");
  await tl.typeText("[data-tl=input-invoice-barcode]", "5012345678900");
  tl.setVar("booksInvoiceScanInput", "5012345678900");

  await tl.wait(500);
  tl.showCaption(STEP70_CAPTIONS.submitScan);
  await pressOn(tl, "[data-tl=btn-invoice-submit-scan]");

  await tl.wait(600);
  tl.showCaption(STEP70_CAPTIONS.subTotalUpdated);
  await ring(tl, "[data-tl=invoice-subtotal-display]", 1500);

  await finishBooks(tl, STEP70_DURATION_MS);
}
