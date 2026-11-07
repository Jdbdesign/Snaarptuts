import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
  typeIntoVar,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP135_DURATION_MS = 26800;

export async function runStep135(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.dashboard, "home", [0.15, 0.45], 135);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickPurchases);
  await pressOn(tl, "[data-tl=nav-books-purchases]");
  tl.setVar("booksPurchasesExpanded", true);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.clickVendors);
  await pressOn(tl, "[data-tl=nav-purchases-vendors]");
  tl.setVar("booksView", "vendors");
  tl.setUrl(BOOKS_URLS.vendors);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.exploreToolbar);
  await ring(tl, "[data-tl=title-vendors]", 800);
  await ring(tl, "[data-tl=btn-vendors-import]", 800);
  await ring(tl, "[data-tl=btn-new-vendor]", 800);

  tl.showCaption(CAPTIONS.typeSearch);
  await pressOn(tl, "[data-tl=input-vendors-search]");
  await typeIntoVar(tl, "[data-tl=input-vendors-search]", "booksVendorSearchQuery", "green", { msPerChar: 60 });
  await tl.wait(1200);

  tl.showCaption(CAPTIONS.clearSearch);
  await pressOn(tl, "[data-tl=input-vendors-search]");
  tl.setVar("booksVendorSearchQuery", "");
  await tl.wait(700);

  tl.showCaption(CAPTIONS.openStatusInactive);
  await pressOn(tl, "[data-tl=select-vendors-status]");
  tl.setVar("booksVendorStatusFilterOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-status-inactive]");
  tl.setVar("booksVendorStatusFilter", "Inactive");
  tl.setVar("booksVendorStatusFilterOpen", false);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.inactiveShowing);
  await ring(tl, "[data-tl=vendor-row-northgate]", 1200);

  tl.showCaption(CAPTIONS.openStatusActive);
  await pressOn(tl, "[data-tl=select-vendors-status]");
  tl.setVar("booksVendorStatusFilterOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-status-active]");
  tl.setVar("booksVendorStatusFilter", "Active");
  tl.setVar("booksVendorStatusFilterOpen", false);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.activeShowing);
  await ring(tl, "[data-tl=table-vendors]", 1200);

  await finishBooks(tl, STEP135_DURATION_MS);
}
