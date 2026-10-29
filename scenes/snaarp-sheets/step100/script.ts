import type { Timeline } from "@/lib/timeline";
import { setLook } from "@/components/sheets/fdt-state";
import { beginTb, doLook, dragSelect, hoverTool, openTool, pickRow, seed } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 100 - Horizontal align: centre the header, right-align the numbers. Starts with Cost and Qty aligned left. */
export const STEP100_DURATION_MS = 31100;

export async function runStep100(tl: Timeline) {
  beginTb(tl, "a1");
  seed(tl, (rows) => setLook(setLook(rows, { r1: 1, c1: 3, r2: 9, c2: 3 }, { align: "left" }), { r1: 1, c1: 4, r2: 8, c2: 4 }, { align: "left" }));

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await dragSelect(tl, "a1", "m1", { ms: 900 });
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "halign", { hold: 1200 });
  tl.showCaption(CAPTIONS.open);
  await openTool(tl, "halign", { hold: 100 });
  tl.showCaption(CAPTIONS.list);
  await tl.wait(1000);
  tl.showCaption(CAPTIONS.center);
  await pickRow(tl, "halign", "center", () => doLook(tl, { align: "center" }));
  tl.showCaption(CAPTIONS.centerDone);
  await ring(tl, "[data-tl=cell-d1]", 2000);

  tl.showCaption(CAPTIONS.numbers);
  await dragSelect(tl, "d2", "e9", { ms: 900 });
  await openTool(tl, "halign", { hold: 300 });
  tl.showCaption(CAPTIONS.right);
  await pickRow(tl, "halign", "right", () => doLook(tl, { align: "right" }));
  tl.showCaption(CAPTIONS.rightDone);
  await ring(tl, "[data-tl=cell-d3]", 2200);
  await finish(tl, 600);
}
