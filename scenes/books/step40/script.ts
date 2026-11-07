import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_QUOTES } from "@/components/books/books-data";
import { STEP40_CAPTIONS } from "./data";

export const STEP40_DURATION_MS = 27200;

export async function runStep40(tl: Timeline) {
  tl.setVar("__sceneId", "step40");
  beginBooks(tl, BOOKS_URLS.quoteDetails, "quote-detail", [0.82, 0.2]);
  tl.setVar("booksActiveQuote", INITIAL_QUOTES[0]);

  await tl.wait(400);
  tl.showCaption(STEP40_CAPTIONS.edit);
  await pressOn(tl, "[data-tl=btn-edit-quote]");

  await tl.wait(500);
  tl.showCaption(STEP40_CAPTIONS.addItem);
  await pressOn(tl, "[data-tl=btn-edit-add-item]");

  await tl.wait(600);
  tl.showCaption(STEP40_CAPTIONS.deleteRow);
  await pressOn(tl, "[data-tl=btn-edit-delete-row-1]");

  await tl.wait(600);
  tl.showCaption(STEP40_CAPTIONS.discount);
  await pressOn(tl, "[data-tl=input-edit-discount]");
  await tl.typeText("[data-tl=input-edit-discount]", "5");

  await tl.wait(600);
  tl.showCaption(STEP40_CAPTIONS.charges);
  await pressOn(tl, "[data-tl=input-edit-shipping]");
  await tl.typeText("[data-tl=input-edit-shipping]", "2");

  await pressOn(tl, "[data-tl=input-edit-adjustment]");
  await tl.typeText("[data-tl=input-edit-adjustment]", "3");

  await tl.wait(800);
  tl.showCaption(STEP40_CAPTIONS.save);
  await pressOn(tl, "[data-tl=btn-save-quote-changes]");
  await tl.wait(2000);

  await finishBooks(tl, STEP40_DURATION_MS);
}
