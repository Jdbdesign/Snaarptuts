import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP77_CAPTIONS } from "./data";

export const STEP77_DURATION_MS = 8000;

export async function runStep77(tl: Timeline) {
  tl.setVar("__sceneId", "step77");
  beginBooks(tl, BOOKS_URLS.newInvoice, "new-invoice", [0.45, 0.95]);
  tl.setVar("booksInvoiceCustomer", "Harvest Tables Ltd");
  tl.setVar("booksInvoiceNumber", "INV10013");
  tl.setVar("booksInvoiceOrderNumber", "HT-2026-99");
  tl.setVar("booksInvoiceTerms", "Net 30");
  tl.setVar("booksInvoiceSalesperson", "Sam Taylor");
  tl.setVar("booksInvoiceSubject", "Autumn Produce Catering Invoice");
  tl.setVar("booksInvoiceLineItems", [
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
  tl.setVar("booksInvoicePlanType", "scheduled");
  tl.setVar("booksInvoiceInstallments", [
    {
      id: "inst-1",
      label: "Installment 1",
      dueDate: "11/20/2026",
      amount: 60.5,
    },
    {
      id: "inst-2",
      label: "Installment 2",
      dueDate: "12/05/2026",
      amount: 60.5,
    },
  ]);

  await tl.wait(400);
  tl.showCaption(STEP77_CAPTIONS.clickSaveAndSend);
  await pressOn(tl, "[data-tl=btn-save-send-invoice]");

  await tl.wait(1000);
  tl.showCaption(STEP77_CAPTIONS.sentSuccess);
  await ring(tl, "[data-tl=invoice-detail-status]", 1500);
  await tl.wait(800);

  await finishBooks(tl, STEP77_DURATION_MS);
}
