import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP193_DURATION_MS = 10500;

export async function runStep193(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vatFiling, "vat-filing", [0.4, 0.3], 193);

  tl.setVar("booksFilingExpanded", true);
  tl.setVar("booksVatConfigured", false);
  tl.setVar("booksVatScheme", "Standard (accrual)");
  tl.setVar("booksVatSchemeDropdownOpen", false);

  await tl.at(400);
  tl.showCaption(CAPTIONS.enterVatNumber);
  await pressOn(tl, "[data-tl=input-vat-number]");
  await tl.typeText("booksVatRegNumber", "123456789", { msPerChar: 65 });
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectScheme);
  await pressOn(tl, "[data-tl=select-vat-scheme]");
  tl.setVar("booksVatSchemeDropdownOpen", true);
  await tl.wait(350);
  await pressOn(tl, "[data-tl=vat-scheme-option-cash]");
  tl.setVar("booksVatScheme", "Cash accounting");
  tl.setVar("booksVatSchemeDropdownOpen", false);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.saveVat);
  await pressOn(tl, "[data-tl=btn-save-vat-setup]");
  tl.setVar("booksVatConfigured", true);
  tl.toast("VAT settings saved");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.emptyVat);
  await tl.wait(1500);

  await finishBooks(tl, STEP193_DURATION_MS);
}
