import type { Timeline } from "@/lib/timeline";
import { beginEdit, chooseSub, clickCell, hoverRow, openMenu, scrollGrid } from "@/components/sheets/edit-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 31 - View > Freeze: 1 row, 2 columns, up to the current row, then No rows and No columns. */
export const STEP31_DURATION_MS = 41700;

export async function runStep31(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "view", { ms: 900 });
  await hoverRow(tl, "freeze", { ms: 450, sub: "freeze" });
  tl.showCaption(CAPTIONS.list);
  await tl.wait(2400);

  // 1 row, and a scroll to prove it stays
  tl.showCaption(CAPTIONS.oneRow);
  await chooseSub(tl, "freeze", "freeze-r1", { ms: 350 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.rowFrozen);
  await ring(tl, "[data-tl=cell-a1]", 2200);
  tl.showCaption(CAPTIONS.scrollDown);
  await scrollGrid(tl, "row", 8, 1200);
  await tl.wait(1500);
  await scrollGrid(tl, "row", 0, 900);

  // 2 columns
  tl.showCaption(CAPTIONS.twoCols);
  await openMenu(tl, "view", { ms: 650 });
  await chooseSub(tl, "freeze", "freeze-c2", { ms: 450 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.colsFrozen);
  await ring(tl, "[data-tl=cell-b1]", 1800);
  tl.showCaption(CAPTIONS.scrollAcross);
  await scrollGrid(tl, "col", 4, 1200);
  await tl.wait(1500);
  await scrollGrid(tl, "col", 0, 900);

  // Up to current row, with a selected cell
  tl.showCaption(CAPTIONS.current);
  await clickCell(tl, "a3", { ms: 900 });
  await tl.wait(500);
  await openMenu(tl, "view", { ms: 650 });
  tl.showCaption(CAPTIONS.currentClick);
  await chooseSub(tl, "freeze", "freeze-rcur", { ms: 450 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.currentDone);
  await ring(tl, "[data-tl=cell-a3]", 2200);

  // Reset
  tl.showCaption(CAPTIONS.reset);
  await openMenu(tl, "view", { ms: 650 });
  await chooseSub(tl, "freeze", "freeze-r0", { ms: 450 });
  await openMenu(tl, "view", { ms: 550 });
  await chooseSub(tl, "freeze", "freeze-c0", { ms: 450 });
  await tl.wait(700);
  await finish(tl, 1500);
}
