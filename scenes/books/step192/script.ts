import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP192_DURATION_MS = 8000;

export async function runStep192(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vatFiling, "vat-filing", [0.4, 0.3], 192);

  tl.setVar("booksFilingExpanded", false);
  tl.setVar("booksVatConfigured", false);

  await tl.at(400);
  tl.showCaption(CAPTIONS.expandMenu);
  await pressOn(tl, "[data-tl=nav-books-filing]");
  tl.setVar("booksFilingExpanded", true);
  await tl.wait(350);

  tl.showCaption(CAPTIONS.hoverItems);
  await tl.moveCursorTo("[data-tl=nav-filing-vat-filing]", { ms: 500 });
  await tl.wait(350);
  await tl.moveCursorTo("[data-tl=nav-filing-vat-payments]", { ms: 450 });
  await tl.wait(350);
  await tl.moveCursorTo("[data-tl=nav-filing-self-assessment]", { ms: 450 });
  await tl.wait(350);
  await tl.moveCursorTo("[data-tl=nav-filing-mtd-income-tax]", { ms: 450 });
  await tl.wait(400);

  tl.showCaption(CAPTIONS.openVatFiling);
  await pressOn(tl, "[data-tl=nav-filing-vat-filing]");
  tl.setVar("booksView", "vat-filing");
  await tl.wait(1500);

  await finishBooks(tl, STEP192_DURATION_MS);
}
