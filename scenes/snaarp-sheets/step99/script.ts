import type { Timeline } from "@/lib/timeline";
import { insertRows, setCell } from "@/components/sheets/grid-state";
import { beginTb, clickCellTb, doMerge, dragSelect, hoverTool, openTool, pickRow, seed } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, M99 } from "./data";

/** Snaarp Sheets, step 99 - Merge cells: Merge all on a title, vertically, horizontally, then Unmerge. Starts with a title row above the table (the table moves down one row). */
export const STEP99_DURATION_MS = 48800;

export async function runStep99(tl: Timeline) {
  beginTb(tl, "a1");
  seed(tl, (rows) => {
    let r = insertRows(rows, 0);
    r = setCell(r, 0, 0, { text: M99.title, bold: true, size: 14 });
    r = setCell(r, 12, 0, { text: M99.reviewLabel, bold: true });
    r = setCell(r, 12, 1, M99.preparedBy);
    return r;
  });

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await dragSelect(tl, "a1", "g1", { ms: 900 });
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "merge", { hold: 1200 });
  tl.showCaption(CAPTIONS.open);
  await openTool(tl, "merge", { hold: 100 });
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=tm-merge]", 1800);
  tl.showCaption(CAPTIONS.all);
  await pickRow(tl, "merge", "all", () => doMerge(tl, "all"));
  tl.showCaption(CAPTIONS.allDone);
  await ring(tl, "[data-tl=cell-a1]", 2000);

  tl.showCaption(CAPTIONS.vertical);
  await dragSelect(tl, "a13", "a14", { ms: 800 });
  await openTool(tl, "merge", { hold: 300 });
  await pickRow(tl, "merge", "vertical", () => doMerge(tl, "vertical"));
  tl.showCaption(CAPTIONS.verticalDone);
  await ring(tl, "[data-tl=cell-a13]", 2000);

  tl.showCaption(CAPTIONS.horizontal);
  await dragSelect(tl, "b13", "d13", { ms: 800 });
  await openTool(tl, "merge", { hold: 300 });
  await pickRow(tl, "merge", "horizontal", () => doMerge(tl, "horizontal"));
  tl.showCaption(CAPTIONS.horizontalDone);
  await ring(tl, "[data-tl=cell-b13]", 2000);

  tl.showCaption(CAPTIONS.unmerge);
  await clickCellTb(tl, "a1", 800);
  await openTool(tl, "merge", { hold: 300 });
  await pickRow(tl, "merge", "unmerge", () => doMerge(tl, "unmerge"));
  tl.showCaption(CAPTIONS.end);
  await ring(tl, "[data-tl=cell-a1]", 1800);
  await finish(tl, 600);
}
