import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_PAYMENTS_MADE, type PaymentMade } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP165_DURATION_MS = 21800;

export async function runStep165(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newPaymentMade, "new-payment-made", [0.4, 0.4], 165);

  await tl.at(400);
  tl.showCaption(CAPTIONS.enterReferenceNumber);
  await pressOn(tl, "[data-tl=input-payment-made-reference]");
  await tl.typeText("PAY-3301", "[data-tl=input-payment-made-reference]");
  tl.setVar("booksPaymentMadeReference", "PAY-3301");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.toggleTdsTax);
  await pressOn(tl, "[data-tl=checkbox-deduct-tds]");
  tl.setVar("booksPaymentMadeDeductTds", true);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ringPaymentSummary);
  await ring(tl, "[data-tl=payment-summary-box]", 1400);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.typeNotes);
  await pressOn(tl, "[data-tl=input-payment-made-notes]");
  await tl.typeText("Payment for packaging order BILL-007", "[data-tl=input-payment-made-notes]");
  tl.setVar("booksPaymentMadeNotes", "Payment for packaging order BILL-007");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.uploadFileAttachment);
  await pressOn(tl, "[data-tl=btn-upload-payment-file]");
  tl.setVar("booksPaymentFileModalOpen", true);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.selectReceiptFile);
  await pressOn(tl, "[data-tl=opt-payment-file-receipt]");
  tl.setVar("booksPaymentMadeAttachedFile", "payment_receipt.pdf");
  tl.setVar("booksPaymentFileModalOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.clickSaveAsPaid);
  await pressOn(tl, "[data-tl=btn-save-as-paid-payment]");

  // Update store with new recorded payment
  const newPayment: PaymentMade = {
    id: "pm-3",
    paymentNumber: "3",
    date: "11/08/2026",
    vendorName: "Greenfield Packaging Ltd",
    paymentMode: "Bank Transfer",
    amount: 4800,
    unusedAmount: "—",
    status: "Paid",
    referenceNumber: "PAY-3301",
    paidThroughAccount: "Accounts Receivable",
    notes: "Payment for packaging order BILL-007",
    billsPaid: [
      {
        billNumber: "BILL-007",
        billDate: "11/08/2026",
        billAmount: 4800,
        paymentApplied: 4800,
      },
    ],
  };

  tl.setVar("booksPaymentsMade", [newPayment, ...INITIAL_PAYMENTS_MADE]);
  tl.setVar("booksToastText", "Payment recorded successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksView", "payments-made");
  tl.setUrl(BOOKS_URLS.paymentsMade);
  await tl.wait(1200);

  await finishBooks(tl, STEP165_DURATION_MS);
}
