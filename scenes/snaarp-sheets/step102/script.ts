import type { Timeline } from "@/lib/timeline";
import { setCell } from "@/components/sheets/grid-state";
import { beginTb, clickCellTb, doLook, hoverTool, openTool, pickRow, seed } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, W102 } from "./data";

/** Snaarp Sheets, step 102 - Text wrapping: Overflow, Wrap, Clip on a long note (K7). Starts with that note made longer. */
export const STEP102_DURATION_MS = 40000;

export async function runStep102(tl: Timeline) {
  beginTb(tl, "a1");
  seed(tl, (rows) => setCell(rows, 6, 10, W102.note));

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await clickCellTb(tl, "k7", 900);
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "wrap", { hold: 1200 });
  tl.showCaption(CAPTIONS.open);
  await openTool(tl, "wrap", { hold: 100 });
  tl.showCaption(CAPTIONS.list);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.overflow);
  await pickRow(tl, "wrap", "overflow", () => doLook(tl, { wrap: "overflow" }));
  await ring(tl, "[data-tl=cell-k7]", 2000);

  await openTool(tl, "wrap", { hold: 200 });
  tl.showCaption(CAPTIONS.wrap);
  await pickRow(tl, "wrap", "wrap", () => doLook(tl, { wrap: "wrap" }));
  tl.showCaption(CAPTIONS.wrapDone);
  await ring(tl, "[data-tl=cell-k7]", 2400);

  await openTool(tl, "wrap", { hold: 200 });
  tl.showCaption(CAPTIONS.clip);
  await pickRow(tl, "wrap", "clip", () => doLook(tl, { wrap: "clip" }));
  tl.showCaption(CAPTIONS.clipDone);
  await ring(tl, "[data-tl=cell-k7]", 2200);
  await finish(tl, 600);
}
