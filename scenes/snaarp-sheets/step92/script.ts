import type { Timeline } from "@/lib/timeline";
import { beginTb, doDecimals, doFormat, dragSelect, hoverTool, pressTool } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 92 - Percent, Decrease and Increase decimal places on the Margin column. Starts with H2:H9 not yet selected. */
export const STEP92_DURATION_MS = 26800;

export async function runStep92(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await dragSelect(tl, "h2", "h9", { ms: 800 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "percent", { hold: 1400 });
  tl.showCaption(CAPTIONS.click);
  await pressTool(tl, "percent", { ms: 300 });
  doFormat(tl, "percent");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=cell-h3]", 2000);

  tl.showCaption(CAPTIONS.dec);
  await hoverTool(tl, "decrease", { hold: 1500 });
  tl.showCaption(CAPTIONS.decClick);
  await pressTool(tl, "decrease", { ms: 300 });
  doDecimals(tl, -1);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.decDone);
  await ring(tl, "[data-tl=cell-h3]", 2000);

  tl.showCaption(CAPTIONS.inc);
  await hoverTool(tl, "increase", { hold: 1500 });
  tl.showCaption(CAPTIONS.incClick);
  await pressTool(tl, "increase", { ms: 300 });
  doDecimals(tl, 1);
  await tl.wait(900);
  await pressTool(tl, "increase", { ms: 200 });
  doDecimals(tl, 1);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.incDone);
  await ring(tl, "[data-tl=cell-h3]", 2200);
  await finish(tl, 600);
}
