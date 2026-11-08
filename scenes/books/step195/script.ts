import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP195_DURATION_MS = 12500;

export async function runStep195(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vatReturnDetail, "vat-return-detail", [0.4, 0.3], 195);

  tl.setVar("booksFilingExpanded", true);
  tl.setVar("booksVatConfigured", true);
  tl.setVar("booksVatReturnStatus", "DRAFT");
  tl.setVar("booksMarkVatFiledModalOpen", false);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickFinalise);
  await pressOn(tl, "[data-tl=btn-finalise-vat-return]");
  tl.setVar("booksVatReturnStatus", "FINALISED");
  tl.toast("Return finalised");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.clickMarkFiled);
  await pressOn(tl, "[data-tl=btn-mark-vat-filed]");
  tl.setVar("booksMarkVatFiledModalOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.enterHmrcRef);
  await pressOn(tl, "[data-tl=input-vat-hmrc-ref]");
  await tl.typeText("booksVatHmrcRef", "VAT-REF-2026-10", { msPerChar: 65 });
  await tl.wait(400);

  tl.showCaption(CAPTIONS.confirmFiled);
  await pressOn(tl, "[data-tl=btn-confirm-vat-filed]");
  tl.setVar("booksVatSavingFiled", false);
  tl.setVar("booksVatReturnStatus", "FILED");
  tl.setVar("booksMarkVatFiledModalOpen", false);
  tl.toast("Return marked as filed");
  tl.setVar("booksVatReturns", [
    {
      id: "vat-oct-2026",
      periodLabel: "VAT return 2026-10-01_2026-10-31",
      startDate: "01 Oct 2026",
      endDate: "31 Oct 2026",
      scheme: "Cash accounting",
      netVat: 827.5,
      status: "FILED",
      hmrcRef: "VAT-REF-2026-10",
    },
  ]);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.backToList);
  await pressOn(tl, "[data-tl=btn-back-vat-returns]");
  tl.setVar("booksView", "vat-filing");
  tl.setUrl(BOOKS_URLS.vatFiling);
  await tl.wait(1500);

  await finishBooks(tl, STEP195_DURATION_MS);
}
