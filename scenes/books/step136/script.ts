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

export const STEP136_DURATION_MS = 23500;

export async function runStep136(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vendors, "vendors", [0.45, 0.35], 136);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openVendor);
  await pressOn(tl, "[data-tl=vendor-row-greenfield]");
  tl.setVar("booksView", "vendor-details");
  tl.setUrl(BOOKS_URLS.vendorDetails);
  await tl.wait(800);

  tl.showCaption(CAPTIONS.reviewFields);
  await ring(tl, "[data-tl=title-vendor-details]", 800);
  await ring(tl, "[data-tl=input-vendor-name]", 800);
  await ring(tl, "[data-tl=input-vendor-email]", 800);
  await ring(tl, "[data-tl=input-vendor-phone]", 800);
  await ring(tl, "[data-tl=btn-deactivate-vendor]", 800);

  tl.showCaption(CAPTIONS.openTerms);
  await pressOn(tl, "[data-tl=select-vendor-payment-terms]");
  tl.setVar("booksVendorPaymentTermsOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-terms-net30]");
  tl.setVar("booksVendorPaymentTerms", "Net 30");
  tl.setVar("booksVendorPaymentTermsOpen", false);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.typeNote);
  await pressOn(tl, "[data-tl=input-vendor-notes]");
  await typeIntoVar(tl, "[data-tl=input-vendor-notes]", "booksVendorNotes", "Pays within 30 days", { msPerChar: 55 });
  await tl.wait(800);

  tl.showCaption(CAPTIONS.clickUpdate);
  await ring(tl, "[data-tl=btn-update-vendor]", 600);
  await pressOn(tl, "[data-tl=btn-update-vendor]");
  tl.setVar("booksToastText", "Vendor updated successfully");
  tl.setVar("booksToastOpen", true);

  tl.showCaption(CAPTIONS.updatedToast);
  await tl.wait(1500);

  await finishBooks(tl, STEP136_DURATION_MS);
}
