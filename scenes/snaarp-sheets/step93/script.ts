import type { Timeline } from "@/lib/timeline";
import { setTbFormat } from "@/components/sheets/toolbar-state";
import { beginTb, doFormat, dragSelect, openTool, pickRow, seed } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 93 - More formats (123): Date, Number, Scientific and Plain text. Starts with the Due date column as plain numbers. */
export const STEP93_DURATION_MS = 42200;

export async function runStep93(tl: Timeline) {
  beginTb(tl, "a1");
  seed(tl, (rows) => setTbFormat(rows, { r1: 1, c1: 6, r2: 8, c2: 6 }, "automatic"));

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await dragSelect(tl, "g2", "g9", { ms: 800 });
  tl.showCaption(CAPTIONS.open);
  await openTool(tl, "formats", { hold: 1000 });
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=tm-formats]", 1800);
  tl.showCaption(CAPTIONS.date);
  await pickRow(tl, "formats", "date", () => doFormat(tl, "date"));
  tl.showCaption(CAPTIONS.dateDone);
  await ring(tl, "[data-tl=cell-g3]", 2000);

  tl.showCaption(CAPTIONS.qty);
  await dragSelect(tl, "e2", "e9", { ms: 800 });
  await openTool(tl, "formats", { hold: 300 });
  await pickRow(tl, "formats", "number", () => doFormat(tl, "number"));
  tl.showCaption(CAPTIONS.qtyDone);
  await ring(tl, "[data-tl=cell-e7]", 2000);

  tl.showCaption(CAPTIONS.ref);
  await dragSelect(tl, "j2", "j9", { ms: 800 });
  await openTool(tl, "formats", { hold: 300 });
  await pickRow(tl, "formats", "scientific", () => doFormat(tl, "scientific"));
  tl.showCaption(CAPTIONS.refDone);
  await ring(tl, "[data-tl=cell-j2]", 2000);

  tl.showCaption(CAPTIONS.code);
  await dragSelect(tl, "i2", "i9", { ms: 800 });
  await openTool(tl, "formats", { hold: 300 });
  await pickRow(tl, "formats", "plain", () => doFormat(tl, "plain"));
  tl.showCaption(CAPTIONS.codeDone);
  await ring(tl, "[data-tl=cell-i2]", 2200);
  await finish(tl, 600);
}
