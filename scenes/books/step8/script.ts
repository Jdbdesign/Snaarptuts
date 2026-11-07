import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  hoverOn,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP8_DURATION_MS = 39800;

export async function runStep8(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.products, "products", [0.85, 0.12]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickMore);
  await pressOn(tl, "[data-tl=btn-products-menu]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.openPreferences);
  await pressOn(tl, "[data-tl=menu-opt-preferences]");
  await tl.wait(600);

  // Untick Rate
  tl.showCaption(CAPTIONS.hideRate);
  await pressOn(tl, "[data-tl=col-opt-rate]");
  await tl.wait(800);

  // Untick Unit
  tl.showCaption(CAPTIONS.hideUnit);
  await pressOn(tl, "[data-tl=col-opt-unit]");
  await tl.wait(1200);

  // Tick Rate back
  tl.showCaption(CAPTIONS.showRate);
  await pressOn(tl, "[data-tl=col-opt-rate]");
  await tl.wait(800);

  // Tick Unit back
  tl.showCaption(CAPTIONS.showUnit);
  await pressOn(tl, "[data-tl=col-opt-unit]");
  await tl.wait(1000);

  // Close drawer
  tl.showCaption(CAPTIONS.closeDrawer);
  await pressOn(tl, "[data-tl=books-columns-drawer-overlay]");
  tl.setVar("booksColumnsDrawerOpen", false);
  await tl.wait(800);

  // Resize column NAME
  tl.showCaption(CAPTIONS.resizeColumn);
  await hoverOn(tl, "[data-tl=col-resize-handle]", { ms: 500 });
  await pressOn(tl, "[data-tl=col-resize-handle]");
  tl.setVar("booksColumnResized", true);
  tl.setVar("booksColNameWidth", 340);
  await tl.wait(1400);

  // Reset column width
  tl.showCaption(CAPTIONS.resetWidths);
  await pressOn(tl, "[data-tl=btn-products-menu]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=menu-opt-reset-widths]");
  await tl.wait(1000);

  await finishBooks(tl, STEP8_DURATION_MS);
}
