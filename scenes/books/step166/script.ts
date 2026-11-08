import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP166_DURATION_MS = 13800;

export async function runStep166(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.paymentsMade, "payments-made", [0.1, 0.55], 166);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openVendorCredits);
  await pressOn(tl, "[data-tl=nav-purchases-vendor-credits]");
  tl.setVar("booksView", "vendor-credits");
  tl.setUrl(BOOKS_URLS.vendorCredits);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.filterStatusClosed);
  await pressOn(tl, "[data-tl=btn-vendor-credit-status-dropdown]");
  tl.setVar("booksVendorCreditStatusDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-vendor-credit-status-closed]");
  tl.setVar("booksVendorCreditStatusFilter", "Closed");
  tl.setVar("booksVendorCreditStatusDropdownOpen", false);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.ringEmptyState);
  await ring(tl, "[data-tl=empty-state-vendor-credits]", 1600);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.resetStatusFilter);
  await pressOn(tl, "[data-tl=btn-vendor-credit-status-dropdown]");
  tl.setVar("booksVendorCreditStatusDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-vendor-credit-status-all]");
  tl.setVar("booksVendorCreditStatusFilter", "Status");
  tl.setVar("booksVendorCreditStatusDropdownOpen", false);
  await tl.wait(1000);

  await finishBooks(tl, STEP166_DURATION_MS);
}
