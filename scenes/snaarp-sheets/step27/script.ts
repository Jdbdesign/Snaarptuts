import type { Timeline } from "@/lib/timeline";
import { beginEdit, chooseSub, clickCell, dragSelect, openMenu, resetSheet } from "@/components/sheets/edit-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, PICK, URLS } from "./data";

/** Snaarp Sheets, step 27 - Edit > Delete > Values, Row and Column. The sample is put back between the three demos; ends after the column delete. */
export const STEP27_DURATION_MS = 32400;

async function deleteVia(tl: Timeline, sub: string, click: string) {
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 700 });
  tl.showCaption(click);
  await chooseSub(tl, "delete", sub, { ms: 500 });
  await tl.wait(500);
}

export async function runStep27(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.intro);
  await tl.wait(1800);

  // Values
  tl.showCaption(CAPTIONS.valuesSelect);
  await dragSelect(tl, PICK.values.from, PICK.values.to, { ms: 600 });
  await deleteVia(tl, "delete-values", CAPTIONS.valuesClick);
  tl.showCaption(CAPTIONS.valuesAfter);
  await ring(tl, "[data-tl=cell-c6]", 2600);

  // Row
  resetSheet(tl);
  tl.showCaption(CAPTIONS.again);
  await tl.wait(1200);
  tl.showCaption(CAPTIONS.rowSelect);
  await clickCell(tl, PICK.row, { ms: 800 });
  await deleteVia(tl, "delete-row", CAPTIONS.rowClick);
  tl.showCaption(CAPTIONS.rowAfter);
  await ring(tl, "[data-tl=cell-a5]", 2600);

  // Column
  resetSheet(tl);
  tl.showCaption(CAPTIONS.again);
  await tl.wait(1200);
  tl.showCaption(CAPTIONS.colSelect);
  await clickCell(tl, PICK.column, { ms: 800 });
  await deleteVia(tl, "delete-col", CAPTIONS.colClick);
  tl.showCaption(CAPTIONS.colAfter);
  await ring(tl, "[data-tl=cell-b1]", 2600);
  await finish(tl, 1000);
}
