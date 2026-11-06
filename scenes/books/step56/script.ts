import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP56_CAPTIONS } from "./data";

export const STEP56_DURATION_MS = 7500;

export async function runStep56(tl: Timeline) {
  tl.setVar("__sceneId", "step56");
  beginBooks(tl, BOOKS_URLS.invoices, "invoices", [0.85, 0.2]);

  await tl.wait(400);
  tl.showCaption(STEP56_CAPTIONS.clickImport);
  await pressOn(tl, "[data-tl=btn-import-invoices]");

  await tl.wait(500);
  tl.showCaption(STEP56_CAPTIONS.chooseFile);
  await pressOn(tl, "[data-tl=btn-upload-invoice-csv-box]");

  await tl.wait(500);
  tl.showCaption(STEP56_CAPTIONS.selectFile);
  await pressOn(tl, "[data-tl=btn-select-invoice-csv-file]");

  await tl.wait(600);
  tl.showCaption(STEP56_CAPTIONS.confirmImport);
  await pressOn(tl, "[data-tl=btn-submit-invoice-import]");

  await tl.wait(800);
  await ring(tl, "[data-tl=invoices-table-header]", 1200);

  await finishBooks(tl, STEP56_DURATION_MS);
}
