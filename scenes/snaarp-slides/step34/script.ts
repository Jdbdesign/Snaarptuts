import { beginEiv } from "../eiv";
import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { TABLE_SAMPLE } from "@/components/slides/slide-elements-data";
import { beginCellEdit, endCellEdit } from "@/components/slides/slides-edit";
import { ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 34 - Insert a table. Starts in the editor on slide 2. */
export const STEP34_DURATION_MS = 33000;

const TABLE = "table-1";

/** Click a cell and type into it. */
async function typeCell(tl: Timeline, row: number, col: number, text: string, moveMs: number) {
  const sel = `[data-tl=cell-${TABLE}-${row}-${col}]`;
  await tl.moveCursorTo(sel, { ms: moveMs });
  await tl.click(sel);
  beginCellEdit(tl, { id: TABLE, row, col });
  await tl.typeText("slideCell", text, { msPerChar: 70 });
  await tl.wait(150);
  endCellEdit(tl);
}

export async function runStep34(tl: Timeline) {
  beginEiv(tl);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  tl.showCaption(CAPTIONS.row);
  await chooseRow(tl, "insert", "table", { ms: 700 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.landed);
  await ring(tl, `[data-tl=el-${TABLE}]`, 2000);

  // Headings
  await tl.at(6500);
  tl.showCaption(CAPTIONS.header);
  for (let c = 0; c < 3; c++) await typeCell(tl, 0, c, TABLE_SAMPLE[0][c], c === 0 ? 800 : 450);

  // Rows
  await tl.at(15500);
  tl.showCaption(CAPTIONS.rows);
  for (let r = 1; r < 3; r++) for (let c = 0; c < 3; c++) await typeCell(tl, r, c, TABLE_SAMPLE[r][c], 450);

  await tl.wait(400);
  tl.showCaption(CAPTIONS.done);
  tl.setVar("sel", []);
  await tl.wait(2400);

  await tl.at(31500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP34_DURATION_MS);
}
