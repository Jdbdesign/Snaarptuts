import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { STRUCTURE } from "@/components/sheets/insert-data";
import { beginInsert, resetInsertSheet } from "@/components/sheets/insert-timeline";
import { chooseSub, dragSelect, openMenu } from "@/components/sheets/edit-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 38 - Insert > Cells: shift down on B3:B4, then (sheet re-seeded) shift right on D3:D4. */
export const STEP38_DURATION_MS = 18300;

export async function runStep38(tl: Timeline) {
  beginInsert(tl, URLS.renamed);
  const [a1, a2] = STRUCTURE.cellsRange;
  const [b1, b2] = STRUCTURE.shiftRightRange;

  await tl.at(700);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, a1, a2, { ms: 700 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  tl.showCaption(CAPTIONS.down);
  await chooseSub(tl, "ins-cells", "cells-down", { ms: 450, hold: 400 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.downDone);
  await ring(tl, `[data-tl=cell-${a1}]`, 2400);

  await tl.wait(500);
  resetInsertSheet(tl);
  tl.showCaption(CAPTIONS.again);
  await dragSelect(tl, b1, b2, { ms: 700 });
  await openMenu(tl, "insert", { ms: 800 });
  tl.showCaption(CAPTIONS.right);
  await chooseSub(tl, "ins-cells", "cells-right", { ms: 450, hold: 400 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.rightDone);
  await ring(tl, `[data-tl=cell-${b1}]`, 2600);
  await finish(tl, 900);
}
