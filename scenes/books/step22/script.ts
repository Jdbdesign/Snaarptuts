import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  hoverOn,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import {
  BOOKS_URLS,
  INITIAL_ACTIVE_ITEMS,
} from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP22_DURATION_MS = 17700;

export async function runStep22(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.products, "products", [0.45, 0.25]);
  tl.setVar("booksItems", INITIAL_ACTIVE_ITEMS);
  tl.setVar("booksSelectedIds", ["item-10", "item-13", "item-14"]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.selectedReady);
  await hoverOn(tl, "[data-tl=bulk-action-bar]", { ms: 500 });
  await ring(tl, "[data-tl=bulk-action-bar]", 1600);

  // Click Delete button
  tl.showCaption(CAPTIONS.clickBulkDelete);
  await pressOn(tl, "[data-tl=btn-bulk-delete]");
  await tl.wait(600);

  // In-app confirmation dialog
  tl.showCaption(CAPTIONS.confirmBatch);
  await hoverOn(tl, "[data-tl=books-confirm-card]", { ms: 500 });
  await ring(tl, "[data-tl=books-confirm-card]", 1800);

  // Click OK
  tl.showCaption(CAPTIONS.clickConfirm);
  await pressOn(tl, "[data-tl=btn-confirm-ok]");
  await tl.wait(1200);

  // Clean result
  tl.showCaption(CAPTIONS.deleteComplete);
  await hoverOn(tl, "[data-tl=products-table]", { ms: 500 });
  await ring(tl, "[data-tl=products-table]", 1800);
  await tl.wait(1000);

  await finishBooks(tl, STEP22_DURATION_MS);
}
