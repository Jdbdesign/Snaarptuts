import type { Timeline } from "@/lib/timeline";
import { beginTb, doLook, dragSelect, hoverTool, openTool, pickRow } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 101 - Vertical align on a tall row: Top, Middle, Bottom. Starts with row 3 made taller (64 px). */
export const STEP101_DURATION_MS = 33700;

export async function runStep101(tl: Timeline) {
  beginTb(tl, "a1");
  tl.setVar("rowHeights", { 2: 64 });

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await tl.wait(1800);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, "a3", "j3", { ms: 900 });
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "valign", { hold: 1200 });
  tl.showCaption(CAPTIONS.open);
  await openTool(tl, "valign", { hold: 100 });
  for (const [id, cap, done] of [["top", CAPTIONS.top, CAPTIONS.topDone], ["middle", CAPTIONS.middle, CAPTIONS.middleDone], ["bottom", CAPTIONS.bottom, CAPTIONS.bottomDone]] as const) {
    tl.showCaption(cap);
    await pickRow(tl, "valign", id, () => doLook(tl, { valign: id }));
    tl.showCaption(done);
    await ring(tl, "[data-tl=cell-a3]", 1800);
    if (id !== "bottom") await openTool(tl, "valign", { hold: 200 });
  }
  await finish(tl, 600);
}
