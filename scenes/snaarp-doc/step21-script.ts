import { initEditor } from "@/components/docs/editor-timeline";
import { chooseInsertItem, clickInsertMenu } from "@/components/docs/insert-menu-timeline";
import { clearTableFocus, insertTable, TABLE_SPOT_EDITOR, typeInCell } from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, CELLS, URLS } from "./step21-data";

/** Snaarp Doc, step 21 - Insert a table. Times are active milliseconds from the start of the step. */
export const STEP21_DURATION_MS = 30000;

/** Click each cell of a row in turn and type its text. */
async function fillRow(tl: Timeline, row: number, texts: string[]) {
  for (let col = 0; col < texts.length; col++) {
    await typeInCell(tl, row, col, texts[col], { msPerChar: 70, moveMs: 520 });
    await tl.wait(250);
  }
}

export async function runStep21(tl: Timeline) {
  initEditor(tl, TABLE_SPOT_EDITOR);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Insert > Table: a ready-made 3-column table appears under the intro paragraph, first header cell focused
  await tl.at(800);
  tl.showCaption(CAPTIONS.insertTable);
  await clickInsertMenu(tl);
  await chooseInsertItem(tl, "table");
  await tl.at(3500);
  insertTable(tl, 1 + CELLS.rows.length, CELLS.header.length);

  // Header row, then the two body rows
  await tl.at(4500);
  tl.showCaption(CAPTIONS.cell);
  await fillRow(tl, 0, CELLS.header);
  await tl.at(11500);
  tl.showCaption(CAPTIONS.firstRow);
  await fillRow(tl, 1, CELLS.rows[0]);
  await tl.at(18000);
  tl.showCaption(CAPTIONS.nextRow);
  await fillRow(tl, 2, CELLS.rows[1]);

  // The finished table
  await tl.at(25000);
  clearTableFocus(tl);
  tl.showCaption(CAPTIONS.ready);
  tl.highlight("[data-tl=table-block]");

  // Hold, then the quick white fade
  await tl.at(28000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(29600);
  tl.setVar("fade", true);
  await tl.at(STEP21_DURATION_MS);
}
