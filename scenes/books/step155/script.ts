import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP155_DURATION_MS = 37500;

export async function runStep155(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.bills, "bills", [0.92, 0.12], 155);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickNewBill);
  await pressOn(tl, "[data-tl=btn-new-bill]");
  tl.setVar("booksView", "new-bill");
  tl.setUrl(BOOKS_URLS.newBill);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.selectVendor);
  await pressOn(tl, "[data-tl=select-bill-vendor]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-bill-vendor-greenfield]");
  tl.setVar("booksNewBillVendor", "Greenfield Packaging Ltd");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeBillNumber);
  await pressOn(tl, "[data-tl=input-bill-number]");
  await tl.typeText("BILL-1200", "[data-tl=input-bill-number]");
  tl.setVar("booksNewBillNumber", "BILL-1200");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeOrderNumber);
  await pressOn(tl, "[data-tl=input-bill-order-number]");
  await tl.typeText("PO-5521", "[data-tl=input-bill-order-number]");
  tl.setVar("booksNewBillOrderNumber", "PO-5521");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.pickBillDate);
  await pressOn(tl, "[data-tl=input-bill-date]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=date-day-7]");
  tl.setVar("booksNewBillDate", "11/07/2026");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.pickDueDate);
  await pressOn(tl, "[data-tl=input-bill-due-date]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=date-day-9]");
  tl.setVar("booksNewBillDueDate", "11/09/2026");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectTerms);
  await pressOn(tl, "[data-tl=select-bill-terms]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-terms-net15]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=select-bill-terms]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-terms-due-on-receipt]");
  tl.setVar("booksNewBillTerms", "Due on Receipt");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeSubject);
  await pressOn(tl, "[data-tl=input-bill-subject]");
  await tl.typeText("Materials for building", "[data-tl=input-bill-subject]");
  tl.setVar("booksNewBillSubject", "Materials for building");
  await tl.wait(1000);

  await finishBooks(tl, STEP155_DURATION_MS);
}
