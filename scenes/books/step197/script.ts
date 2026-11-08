import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP197_DURATION_MS = 12500;

export async function runStep197(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.selfAssessmentReturnDetail, "self-assessment-return-detail", [0.4, 0.3], 197);

  tl.setVar("booksFilingExpanded", true);
  tl.setVar("booksSaReturnStatus", "DRAFT");
  tl.setVar("booksMarkSaFiledModalOpen", false);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickFinalise);
  await pressOn(tl, "[data-tl=btn-finalise-sa-return]");
  tl.setVar("booksSaReturnStatus", "FINALISED");
  tl.toast("Return finalised");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.clickMarkFiled);
  await pressOn(tl, "[data-tl=btn-mark-sa-filed]");
  tl.setVar("booksMarkSaFiledModalOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.enterHmrcRef);
  await pressOn(tl, "[data-tl=input-sa-hmrc-ref]");
  await tl.typeText("booksSaHmrcRef", "SA-REF-2024-25", { msPerChar: 65 });
  await tl.wait(400);

  tl.showCaption(CAPTIONS.confirmFiled);
  await pressOn(tl, "[data-tl=btn-confirm-sa-filed]");
  tl.setVar("booksSaSavingFiled", false);
  tl.setVar("booksSaReturnStatus", "FILED");
  tl.setVar("booksMarkSaFiledModalOpen", false);
  tl.toast("Return marked as filed");
  tl.setVar("booksSaActiveTab", "all-filings");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.backToList);
  await pressOn(tl, "[data-tl=btn-back-sa-returns]");
  tl.setVar("booksView", "self-assessment");
  tl.setUrl(BOOKS_URLS.selfAssessment);
  await tl.wait(1500);

  await finishBooks(tl, STEP197_DURATION_MS);
}
