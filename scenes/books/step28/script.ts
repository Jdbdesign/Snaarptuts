import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  hoverOn,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP28_DURATION_MS = 23000;

export async function runStep28(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.customers, "customers", [0.85, 0.16]);

  // Click Import button on customers toolbar
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickImport);
  await pressOn(tl, "[data-tl=btn-customers-import]");
  tl.setVar("booksCustomerImportDrawerOpen", true);
  await tl.wait(600);

  // Click dashed upload box (only rendered when !selectedFile)
  tl.showCaption(CAPTIONS.chooseFileBox);
  await pressOn(tl, "[data-tl=btn-upload-customer-csv-box]");
  tl.setVar("booksCustomerCsvPickerOpen", true);
  await tl.wait(500);

  // Select sample file in modal
  tl.showCaption(CAPTIONS.pickFile);
  await pressOn(tl, "[data-tl=sample-file-customers-csv]");
  tl.setVar("booksCustomerCsvSelectedFile", "customers-import.csv");
  await tl.wait(400);

  // Confirm selection to attach file and close modal
  tl.showCaption(CAPTIONS.confirmPick);
  await pressOn(tl, "[data-tl=btn-picker-confirm]");
  tl.setVar("booksCustomerCsvPickerOpen", false);
  await tl.wait(600);

  // Click Import in drawer
  tl.showCaption(CAPTIONS.runImport);
  await pressOn(tl, "[data-tl=btn-run-customer-import]");
  await tl.wait(1200);

  // Verification
  tl.showCaption(CAPTIONS.importComplete);
  await hoverOn(tl, "[data-tl=row-customer-1]", { ms: 600 });
  await ring(tl, "[data-tl=row-customer-1]", 1600);
  await tl.wait(1000);

  await finishBooks(tl, STEP28_DURATION_MS);
}
