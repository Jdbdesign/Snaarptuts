import type { Timeline } from "@/lib/timeline";
import { EDIT_SAMPLE } from "@/components/sheets/edit-view-data";
import { beginEdit, chooseRow, openMenu, quickType, undoOp } from "@/components/sheets/edit-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 22 - Edit > Redo. Starts with the typed cost already undone (done instantly, so the step works alone). */
export const STEP22_DURATION_MS = 12600;

export async function runStep22(tl: Timeline) {
  beginEdit(tl, URLS.renamed);
  quickType(tl, EDIT_SAMPLE.typedCell, EDIT_SAMPLE.typed);
  undoOp(tl);
  const cell = `[data-tl=cell-${EDIT_SAMPLE.typedCell.toLowerCase()}]`;

  await tl.at(800);
  tl.showCaption(CAPTIONS.start);
  await ring(tl, cell, 2200);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 800 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.click);
  await chooseRow(tl, "redo", { ms: 600 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.back);
  await ring(tl, cell, 2200);
  await finish(tl, 1200);
}
