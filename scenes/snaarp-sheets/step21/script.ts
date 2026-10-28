import type { Timeline } from "@/lib/timeline";
import { EDIT_SAMPLE } from "@/components/sheets/edit-view-data";
import { beginEdit, chooseRow, openMenu, typeInCell } from "@/components/sheets/edit-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 21 - Edit > Undo. Starts on the sample budget; ends with C2 back at its old cost. */
export const STEP21_DURATION_MS = 17000;

export async function runStep21(tl: Timeline) {
  beginEdit(tl, URLS.renamed);
  const cell = `[data-tl=cell-${EDIT_SAMPLE.typedCell.toLowerCase()}]`;

  await tl.at(800);
  tl.showCaption(CAPTIONS.type);
  await typeInCell(tl, EDIT_SAMPLE.typedCell, EDIT_SAMPLE.typed);
  tl.showCaption(CAPTIONS.changed);
  await ring(tl, cell, 1800);

  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 800 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.click);
  await chooseRow(tl, "undo", { ms: 600 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.back);
  await ring(tl, cell, 2000);
  await finish(tl, 1200);
}
