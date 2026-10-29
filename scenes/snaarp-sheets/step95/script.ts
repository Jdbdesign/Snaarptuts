import type { Timeline } from "@/lib/timeline";
import { beginTb, bumpSize, doLook, dragSelect, hoverTool, pressTool } from "@/components/sheets/toolbar-timeline";
import { pressOn, ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 95 - Font size: plus three times (10 to 13), then type 12 in the box. Starts with A1 selected. */
export const STEP95_DURATION_MS = 21000;

export async function runStep95(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await dragSelect(tl, "a1", "k1", { ms: 900 });
  tl.showCaption(CAPTIONS.minus);
  await hoverTool(tl, "size-plus", { hold: 1400 });
  tl.showCaption(CAPTIONS.plus);
  for (let i = 0; i < 3; i++) {
    await pressTool(tl, "size-plus", { ms: 250, ring: i === 0 });
    bumpSize(tl, 1);
    await tl.wait(600);
  }
  tl.showCaption(CAPTIONS.grown);
  await ring(tl, "[data-tl=tool-size]", 1800);
  tl.showCaption(CAPTIONS.type);
  await pressOn(tl, "[data-tl=tool-size]", { ms: 700 });
  tl.setVar("field:size", "");
  tl.showCaption(CAPTIONS.typed);
  await tl.typeText("size", "12", { msPerChar: 350 });
  await tl.wait(500);
  doLook(tl, { size: 12 });
  tl.setVar("field:size", "");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=cell-a1]", 2200);
  await finish(tl, 600);
}
