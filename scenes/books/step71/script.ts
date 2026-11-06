import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP71_CAPTIONS } from "./data";

export const STEP71_DURATION_MS = 8000;

export async function runStep71(tl: Timeline) {
  tl.setVar("__sceneId", "step71");
  beginBooks(tl, BOOKS_URLS.newInvoice, "new-invoice", [0.28, 0.7]);
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
  ]);

  await tl.wait(400);
  tl.showCaption(STEP71_CAPTIONS.clickBulk);
  await pressOn(tl, "[data-tl=btn-bulk-items]");

  await tl.wait(500);
  tl.showCaption(STEP71_CAPTIONS.searchBulk);
  await pressOn(tl, "[data-tl=input-invoice-bulk-search]");
  await tl.typeText("[data-tl=input-invoice-bulk-search]", "tote");
  tl.setVar("booksInvoiceBulkSearch", "tote");
  tl.setVar("booksInvoiceBulkSelected", ["pack-box-1", "service-1"]);

  await tl.wait(500);
  tl.showCaption(STEP71_CAPTIONS.confirmBulk);
  await pressOn(tl, "[data-tl=btn-invoice-submit-bulk-add]");

  await tl.wait(600);
  tl.showCaption(STEP71_CAPTIONS.subTotalUpdated);
  await ring(tl, "[data-tl=invoice-sub-total]", 1500);

  await finishBooks(tl, STEP71_DURATION_MS);
}
