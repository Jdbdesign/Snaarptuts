import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP196_DURATION_MS = 13500;

export async function runStep196(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vatFiling, "vat-filing", [0.4, 0.3], 196);

  tl.setVar("booksFilingExpanded", true);
  tl.setVar("booksSaActiveTab", "to-be-filed");
  tl.setVar("booksGenerateSaModalOpen", false);
  tl.setVar("booksSaReturnStatus", "DRAFT");

  await tl.at(400);
  tl.showCaption(CAPTIONS.openSelfAssessment);
  await pressOn(tl, "[data-tl=nav-filing-self-assessment]");
  tl.setVar("booksView", "self-assessment");
  tl.setUrl(BOOKS_URLS.selfAssessment);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.switchTabs);
  await pressOn(tl, "[data-tl=tab-sa-all-filings]");
  tl.setVar("booksSaActiveTab", "all-filings");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=tab-sa-to-be-filed]");
  tl.setVar("booksSaActiveTab", "to-be-filed");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.clickGenerate);
  await pressOn(tl, "[data-tl=btn-generate-sa-return]");
  tl.setVar("booksGenerateSaModalOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.typeTaxYear);
  await pressOn(tl, "[data-tl=input-sa-tax-year]");
  await tl.typeText("booksSaTaxYear", "2024-25", { msPerChar: 65 });
  await tl.wait(400);

  tl.showCaption(CAPTIONS.submitGenerate);
  await pressOn(tl, "[data-tl=btn-modal-generate-sa]");
  tl.setVar("booksGenerateSaModalOpen", false);
  tl.setVar("booksView", "self-assessment-return-detail");
  tl.setUrl(BOOKS_URLS.selfAssessmentReturnDetail);
  tl.toast("Self Assessment return generated");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.reviewSaReturn);
  await tl.wait(1500);

  await finishBooks(tl, STEP196_DURATION_MS);
}
