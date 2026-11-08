import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_PAYMENTS_MADE } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP163_DURATION_MS = 18800;

export async function runStep163(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.recurringBills, "recurring-bills", [0.1, 0.52], 163);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openPaymentsMade);
  await pressOn(tl, "[data-tl=nav-purchases-payments-made]");
  tl.setVar("booksView", "payments-made");
  tl.setUrl(BOOKS_URLS.paymentsMade);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.filterStatusPaid);
  await pressOn(tl, "[data-tl=btn-payment-made-status-dropdown]");
  tl.setVar("booksPaymentMadeStatusDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-payment-status-paid]");
  tl.setVar("booksPaymentMadeStatusFilter", "Paid");
  tl.setVar("booksPaymentMadeStatusDropdownOpen", false);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.resetStatusFilter);
  await pressOn(tl, "[data-tl=btn-payment-made-status-dropdown]");
  tl.setVar("booksPaymentMadeStatusDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-payment-status-all]");
  tl.setVar("booksPaymentMadeStatusFilter", "Status");
  tl.setVar("booksPaymentMadeStatusDropdownOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.openPayment2);
  await pressOn(tl, "[data-tl=row-payment-made-2]");
  tl.setVar("booksActivePaymentMade", INITIAL_PAYMENTS_MADE[0]);
  tl.setVar("booksView", "payment-made-detail");
  tl.setUrl(BOOKS_URLS.paymentMadeDetails);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.ringDetailsCard);
  await ring(tl, "[data-tl=payment-made-details-card]", 1200);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.ringBillsPaid);
  await ring(tl, "[data-tl=table-payment-made-bills-paid]", 1200);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.returnToList);
  await pressOn(tl, "[data-tl=btn-payment-made-back]");
  tl.setVar("booksView", "payments-made");
  tl.setUrl(BOOKS_URLS.paymentsMade);
  await tl.wait(1000);

  await finishBooks(tl, STEP163_DURATION_MS);
}
