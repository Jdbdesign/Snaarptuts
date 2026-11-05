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

export const STEP10_DURATION_MS = 12000;

export async function runStep10(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.products, "products", [0.85, 0.12]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickMore);
  await pressOn(tl, "[data-tl=btn-products-menu]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.clickExport);
  await pressOn(tl, "[data-tl=menu-opt-export]");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.exportDrawer);
  await hoverOn(tl, "[data-tl=export-opt-csv]", { ms: 500 });
  await ring(tl, "[data-tl=export-opt-csv]", 1500);

  tl.showCaption(CAPTIONS.csvFormat);
  await hoverOn(tl, "[data-tl=export-opt-pdf]", { ms: 500 });
  await tl.wait(1400);

  // Click Export
  tl.showCaption(CAPTIONS.runExport);
  await pressOn(tl, "[data-tl=btn-run-export]");
  await tl.wait(1000);

  // Show downloaded indication
  tl.showCaption(CAPTIONS.downloadComplete);
  await hoverOn(tl, "[data-tl=export-downloaded-card]", { ms: 500 });
  await ring(tl, "[data-tl=export-downloaded-card]", 1800);
  await tl.wait(1400);

  await finishBooks(tl, STEP10_DURATION_MS);
}
