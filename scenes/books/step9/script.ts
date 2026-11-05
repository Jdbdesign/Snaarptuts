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

export const STEP9_DURATION_MS = 14000;

export async function runStep9(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.products, "products", [0.85, 0.12]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickMore);
  await pressOn(tl, "[data-tl=btn-products-menu]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.clickImport);
  await pressOn(tl, "[data-tl=menu-opt-import]");
  await tl.wait(600);

  // Click file upload box (only present in empty state)
  tl.showCaption(CAPTIONS.chooseFileBox);
  await pressOn(tl, "[data-tl=btn-upload-csv-box]");
  tl.setVar("booksCsvPickerOpen", true);
  await tl.wait(500);

  // Pick file in modal
  tl.showCaption(CAPTIONS.pickFile);
  await pressOn(tl, "[data-tl=sample-file-items-csv]");
  tl.setVar("booksCsvSelectedFile", "items-import.csv");
  await tl.wait(400);

  // Confirm selection to close modal and attach file
  tl.showCaption(CAPTIONS.confirmPick);
  await pressOn(tl, "[data-tl=btn-picker-confirm]");
  tl.setVar("booksCsvPickerOpen", false);
  await tl.wait(600);

  // Click Import in drawer
  tl.showCaption(CAPTIONS.runImport);
  await pressOn(tl, "[data-tl=btn-import]");
  await tl.wait(1200);

  // Completed - newly added top rows
  tl.showCaption(CAPTIONS.importComplete);
  await hoverOn(tl, "[data-tl=row-item-1]", { ms: 600 });
  await ring(tl, "[data-tl=row-item-1]", 1800);
  await tl.wait(1000);

  await finishBooks(tl, STEP9_DURATION_MS);
}
