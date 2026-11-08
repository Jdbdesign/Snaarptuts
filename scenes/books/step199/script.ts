import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP199_DURATION_MS = 9500;

export async function runStep199(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.mtdIncomeTax, "mtd-income-tax", [0.4, 0.3], 199);

  tl.setVar("booksFilingExpanded", true);
  tl.setVar("booksMtdConfigured", true);
  tl.setVar("booksMtdQuartersPrepared", false);
  tl.setVar("booksMtdQ1Submitted", false);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickPrepareQuarters);
  await pressOn(tl, "[data-tl=btn-prepare-mtd-quarters]");
  tl.setVar("booksMtdQuartersPrepared", true);
  tl.toast("Quarters prepared");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.reviewQuarters);
  await tl.wait(1200);

  tl.showCaption(CAPTIONS.submitQ1);
  await pressOn(tl, "[data-tl=link-submit-mtd-q1]");
  tl.setVar("booksMtdQ1Submitted", true);
  tl.toast("Quarter marked submitted");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.submittedComplete);
  await tl.wait(1500);

  await finishBooks(tl, STEP199_DURATION_MS);
}
