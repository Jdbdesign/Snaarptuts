import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  hoverOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP200_DURATION_MS = 14500;

export async function runStep200(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.reportsCenter, "reports-center", [0.4, 0.3], 200);

  tl.setVar("booksReportsCategory", "all");

  await tl.at(400);
  tl.showCaption(CAPTIONS.openReports);
  await pressOn(tl, "[data-tl=nav-books-reports]");
  tl.setVar("booksView", "reports-center");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.browseCategories);
  await hoverOn(tl, "[data-tl=cat-business-overview]", { ms: 450 });
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=cat-sales]", { ms: 400 });
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=cat-receivables]", { ms: 400 });
  await tl.wait(400);

  tl.showCaption(CAPTIONS.searchReports);
  await pressOn(tl, "[data-tl=input-search-reports]");
  await tl.typeText("[data-tl=input-search-reports]", "balance", { msPerChar: 80 });
  tl.setVar("booksReportsSearch", "balance");
  await tl.wait(1200);

  tl.showCaption(CAPTIONS.clearSearch);
  await pressOn(tl, "[data-tl=input-search-reports]");
  tl.setVar("booksReportsSearch", "");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.filterReceivables);
  await pressOn(tl, "[data-tl=cat-receivables]");
  tl.setVar("booksReportsCategory", "receivables");
  await tl.wait(1100);

  tl.showCaption(CAPTIONS.filterTaxes);
  await pressOn(tl, "[data-tl=cat-taxes]");
  tl.setVar("booksReportsCategory", "taxes");
  await tl.wait(1100);

  tl.showCaption(CAPTIONS.returnAll);
  await pressOn(tl, "[data-tl=cat-all-reports]");
  tl.setVar("booksReportsCategory", "all");
  await tl.wait(1800);

  await finishBooks(tl, STEP200_DURATION_MS);
}
