import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP164_DURATION_MS = 23800;

export async function runStep164(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.paymentsMade, "payments-made", [0.92, 0.12], 164);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickNewPayment);
  await pressOn(tl, "[data-tl=btn-new-payment-made]");
  tl.setVar("booksView", "new-payment-made");
  tl.setUrl(BOOKS_URLS.newPaymentMade);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.selectVendor);
  await pressOn(tl, "[data-tl=select-payment-made-vendor]");
  tl.setVar("booksPaymentVendorDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-payment-vendor-greenfield]");
  tl.setVar("booksPaymentMadeVendor", "Greenfield Packaging Ltd");
  tl.setVar("booksPaymentVendorDropdownOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.enterPartialAmount);
  await pressOn(tl, "[data-tl=input-payment-made-amount]");
  await tl.typeText("1000", "[data-tl=input-payment-made-amount]");
  tl.setVar("booksPaymentMadeAmount", "1000");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.ringExcessWarning);
  await ring(tl, "[data-tl=payment-excess-warning]", 1200);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.togglePayFull);
  await pressOn(tl, "[data-tl=checkbox-pay-full]");
  tl.setVar("booksPaymentMadePayFull", true);
  tl.setVar("booksPaymentMadeAmount", "4800");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.verifyPaymentDate);
  await pressOn(tl, "[data-tl=input-payment-made-date]");
  tl.setVar("booksPaymentMadeDate", "11/08/2026");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectPaymentMode);
  await pressOn(tl, "[data-tl=select-payment-made-mode]");
  tl.setVar("booksPaymentModeDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-mode-bank-transfer]");
  tl.setVar("booksPaymentMadeMode", "Bank Transfer");
  tl.setVar("booksPaymentModeDropdownOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.selectPaidThrough);
  await pressOn(tl, "[data-tl=select-payment-made-paid-through]");
  tl.setVar("booksPaymentPaidThroughDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-paid-through-ar]");
  tl.setVar("booksPaymentMadePaidThrough", "Accounts Receivable");
  tl.setVar("booksPaymentPaidThroughDropdownOpen", false);
  await tl.wait(1000);

  await finishBooks(tl, STEP164_DURATION_MS);
}
