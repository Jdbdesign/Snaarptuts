import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP191_DURATION_MS = 13000;

export async function runStep191(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.importData, "import-data", [0.4, 0.3], 191);

  tl.setVar("booksAccountantExpanded", true);
  tl.setVar("booksImportType", "items");
  tl.setVar("booksImportFile", null);
  tl.setVar("booksImportComplete", false);
  tl.setVar("booksCsvPickerOpen", false);
  tl.setVar("booksCsvSelectedFile", "items-export-2026-10-11.csv");

  await tl.at(400);
  tl.showCaption(CAPTIONS.chooseType);
  await ring(tl, "[data-tl=card-import-type-invoices]", 800);
  await pressOn(tl, "[data-tl=card-import-type-invoices]");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.chooseItems);
  await pressOn(tl, "[data-tl=card-import-type-items]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.openFilePicker);
  await pressOn(tl, "[data-tl=dropzone-csv]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectFile);
  await pressOn(tl, "[data-tl=sample-file-items-export-csv]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=btn-picker-confirm]");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.reviewPreview);
  await ring(tl, "[data-tl=card-attached-file]", 1000);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.submitImport);
  await pressOn(tl, "[data-tl=btn-import-submit]");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.reviewResult);
  await ring(tl, "[data-tl=stat-created]", 900);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.importAnother);
  await pressOn(tl, "[data-tl=btn-import-another]");
  await tl.wait(600);

  await finishBooks(tl, STEP191_DURATION_MS);
}
