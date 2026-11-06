import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_VENDORS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP141_DURATION_MS = 40000;

export async function runStep141(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vendors, "vendors", [0.45, 0.35]);
  const harbourVendor = {
    id: "vend-harbour",
    name: "Harbour Logistics Ltd",
    email: "billing@harbourlogistics.co.uk",
    phone: "+44 20 7946 0812",
    paymentTerms: "Net 30",
    status: "Active" as const,
  };
  tl.setVar("booksVendors", [harbourVendor, ...INITIAL_VENDORS]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openHarbour);
  await pressOn(tl, "[data-tl=vendor-row-harbour]");
  tl.setVar("booksActiveVendor", harbourVendor);
  tl.setVar("booksView", "vendor-details");
  tl.setUrl(BOOKS_URLS.vendorDetails);
  await tl.wait(800);

  tl.showCaption(CAPTIONS.deactivateHarbour);
  await ring(tl, "[data-tl=btn-deactivate-vendor]", 600);
  await pressOn(tl, "[data-tl=btn-deactivate-vendor]");
  tl.setVar("booksToastText", "Vendor deactivated successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksVendors", [
    { ...harbourVendor, status: "Inactive" as const },
    ...INITIAL_VENDORS,
  ]);
  tl.setVar("booksView", "vendors");
  tl.setUrl(BOOKS_URLS.vendors);
  await tl.wait(800);

  tl.showCaption(CAPTIONS.filterInactive);
  await pressOn(tl, "[data-tl=select-vendors-status]");
  tl.setVar("booksVendorStatusFilterOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-status-inactive]");
  tl.setVar("booksVendorStatusFilter", "Inactive");
  tl.setVar("booksVendorStatusFilterOpen", false);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.clickDeleteNorthgate);
  await pressOn(tl, "[data-tl=btn-delete-vendor-northgate]");
  tl.setVar("booksVendorConfirmOpen", true);
  tl.setVar("booksVendorToDelete", "Northgate Supplies");
  await tl.wait(800);

  tl.showCaption(CAPTIONS.confirmDelete);
  await ring(tl, "[data-tl=modal-vendor-confirm]", 600);
  await pressOn(tl, "[data-tl=btn-confirm-vendor-delete]");
  tl.setVar("booksVendors", [
    { ...harbourVendor, status: "Inactive" as const },
    INITIAL_VENDORS[0],
    INITIAL_VENDORS[1],
  ]);
  tl.setVar("booksVendorConfirmOpen", false);
  tl.setVar("booksToastText", "Vendor deleted");
  tl.setVar("booksToastOpen", true);

  tl.showCaption(CAPTIONS.deletedResult);
  await tl.wait(1500);

  await finishBooks(tl, STEP141_DURATION_MS);
}
