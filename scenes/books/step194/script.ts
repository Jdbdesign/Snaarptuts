import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  scrollView,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP194_DURATION_MS = 14500;

export async function runStep194(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vatFiling, "vat-filing", [0.4, 0.3], 194);

  tl.setVar("booksFilingExpanded", true);
  tl.setVar("booksVatConfigured", true);
  tl.setVar("booksVatReturns", []);
  tl.setVar("booksPrepareVatModalOpen", false);
  tl.setVar("booksVatPeriodStart", "10/01/2026");
  tl.setVar("booksVatPeriodEnd", "10/31/2026");
  tl.setVar("booksVatStartPickerOpen", false);
  tl.setVar("booksVatEndPickerOpen", false);
  tl.setVar("booksVatReturnStatus", "DRAFT");

  await tl.at(400);
  tl.showCaption(CAPTIONS.openPrepareModal);
  await pressOn(tl, "[data-tl=btn-prepare-vat-return]");
  tl.setVar("booksPrepareVatModalOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.pickPeriodStart);
  await pressOn(tl, "[data-tl=input-vat-period-start]");
  tl.setVar("booksVatStartPickerOpen", true);
  await tl.wait(350);
  await pressOn(tl, "[data-tl=date-day-1]");
  tl.setVar("booksVatPeriodStart", "10/01/2026");
  tl.setVar("booksVatStartPickerOpen", false);
  await tl.wait(350);

  tl.showCaption(CAPTIONS.pickPeriodEnd);
  await pressOn(tl, "[data-tl=input-vat-period-end]");
  tl.setVar("booksVatEndPickerOpen", true);
  await tl.wait(350);
  await pressOn(tl, "[data-tl=date-day-30]");
  tl.setVar("booksVatPeriodEnd", "10/31/2026");
  tl.setVar("booksVatEndPickerOpen", false);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.submitPrepare);
  await pressOn(tl, "[data-tl=btn-modal-prepare-vat]");
  tl.setVar("booksPrepareVatModalOpen", false);
  tl.setVar("booksView", "vat-return-detail");
  tl.setUrl(BOOKS_URLS.vatReturnDetail);
  tl.toast("VAT return prepared");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.reviewBoxes);
  await tl.wait(1400);

  tl.showCaption(CAPTIONS.reviewTreatments);
  await scrollView(tl, 320);
  await tl.wait(1200);
  await scrollView(tl, 0);
  await tl.wait(1500);

  await finishBooks(tl, STEP194_DURATION_MS);
}
