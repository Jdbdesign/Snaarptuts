import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_VENDORS, type VendorItem } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP145_DURATION_MS = 7500;

export async function runStep145(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vendors, "vendors", [0.45, 0.25]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.filterInactive);
  await pressOn(tl, "[data-tl=select-vendors-status]");
  tl.setVar("booksVendorStatusFilter", "Inactive");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.clickDelete);
  await pressOn(tl, "[data-tl=btn-delete-vendor-northgate]");
  tl.setVar("booksVendorConfirmOpen", true);
  tl.setVar("booksVendorToDelete", "Northgate Supplies");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.confirmDelete);
  await pressOn(tl, "[data-tl=btn-confirm-vendor-delete]");
  tl.setVar("booksVendorConfirmOpen", false);

  const currentVendors = tl.getVar<VendorItem[]>("booksVendors", INITIAL_VENDORS);
  tl.setVar("booksVendors", currentVendors.filter((v) => v.id !== "vend-northgate"));
  tl.setVar("booksToastText", "Vendor deleted successfully");
  tl.setVar("booksToastOpen", true);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.vendorDeleted);
  await tl.wait(800);

  await finishBooks(tl, STEP145_DURATION_MS);
}
