import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_BILLS, type Bill } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP157_DURATION_MS = 52000;

export async function runStep157(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newBill, "new-bill", [0.45, 0.45], 157);

  await tl.at(400);
  tl.showCaption(CAPTIONS.typeNotes);
  await pressOn(tl, "[data-tl=textarea-bill-notes]");
  await tl.typeText(
    "Monthly packaging and ingredients order. Please process by due date.",
    "[data-tl=textarea-bill-notes]"
  );
  tl.setVar("booksNewBillNotes", "Monthly packaging and ingredients order. Please process by due date.");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.clickUploadFiles);
  await pressOn(tl, "[data-tl=btn-bill-upload-files]");
  tl.setVar("booksBillFilePickerOpen", true);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.selectInvoicePdf);
  await pressOn(tl, "[data-tl=file-item-f-supplier-inv]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.clickAttachFile);
  await pressOn(tl, "[data-tl=btn-attach-bill-file]");
  tl.setVar("booksBillAttachment", "supplier-invoice.pdf");
  tl.setVar("booksBillFilePickerOpen", false);
  await tl.wait(600);
  await ring(tl, "[data-tl=chip-attached-file]", 800);

  tl.showCaption(CAPTIONS.clickSaveAsOpen);
  await pressOn(tl, "[data-tl=btn-save-as-open]");
  await tl.wait(600);

  const newBill: Bill = {
    id: "BILL-1200",
    billNumber: "BILL-1200",
    vendorName: "Greenfield Packaging Ltd",
    date: "11/7/2026",
    dueDate: "11/9/2026",
    orderNumber: "PO-5521",
    amount: 5040.0,
    status: "Open",
    balanceDue: 5040.0,
    subject: "Materials for building",
    terms: "Due on Receipt",
    items: [
      {
        id: "item-0",
        name: "Organic Rice 25kg",
        account: "Cost of Goods Sold",
        quantity: 20,
        rate: 200,
        tax: "VAT Standard (20%)",
        amount: 4000,
      },
      {
        id: "item-1",
        name: "Palm Oil 5L",
        account: "Cost of Goods Sold",
        quantity: 5,
        rate: 40,
        tax: "VAT Standard (20%)",
        amount: 200,
      },
    ],
    subTotal: 4200.0,
    taxAmount: 840.0,
    total: 5040.0,
    notes: "Monthly packaging and ingredients order. Please process by due date.",
    files: ["supplier-invoice.pdf"],
  };

  tl.setVar("booksBills", [
    newBill,
    ...INITIAL_BILLS.filter((b) => b.id !== newBill.id),
  ]);
  tl.setVar("booksActiveBill", newBill);
  tl.setVar("booksToastText", "Bill saved successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksView", "bills");
  tl.setUrl(BOOKS_URLS.bills);
  await tl.wait(800);

  tl.showCaption(CAPTIONS.ringNewBillRow);
  await ring(tl, "[data-tl=bill-row-BILL-1200]", 1200);

  tl.showCaption(CAPTIONS.openBill1200);
  await pressOn(tl, "[data-tl=bill-row-BILL-1200]");
  tl.setVar("booksView", "bill-detail");
  tl.setUrl(BOOKS_URLS.billDetails);
  await tl.wait(1500);

  await finishBooks(tl, STEP157_DURATION_MS);
}
