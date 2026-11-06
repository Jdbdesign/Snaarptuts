import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP135_DURATION_MS = 8500;

export async function runStep135(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.dashboard, "home", [0.15, 0.45]);
  tl.setVar("booksPurchasesExpanded", false);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickPurchases);
  await pressOn(tl, "[data-tl=nav-books-purchases]");
  tl.setVar("booksPurchasesExpanded", true);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.clickVendors);
  await pressOn(tl, "[data-tl=nav-purchases-vendors]");
  tl.setVar("booksView", "vendors");
  tl.setUrl(BOOKS_URLS.vendors);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.exploreControls);
  await ring(tl, "[data-tl=title-vendors]", 900);
  await ring(tl, "[data-tl=input-vendors-search]", 900);
  await ring(tl, "[data-tl=select-vendors-status]", 900);

  tl.showCaption(CAPTIONS.reviewActions);
  await ring(tl, "[data-tl=btn-vendors-import]", 800);
  await ring(tl, "[data-tl=btn-new-vendor]", 800);
  await ring(tl, "[data-tl=table-vendors]", 1200);

  await finishBooks(tl, STEP135_DURATION_MS);
}
