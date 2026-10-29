import type { Timeline } from "@/lib/timeline";
import { beginTb, dragSelect, hoverTool, pressTool, startTbChart } from "@/components/sheets/toolbar-timeline";
import { chooseOption, openSelect, patchChart } from "@/components/sheets/insert-timeline";
import { pressOn, ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 106 - Insert chart: Item and Cost as a column chart, switched to a pie, then Insert. Starts with A1 selected. */
export const STEP106_DURATION_MS = 40000;

export async function runStep106(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, "a1", "d9", { ms: 900 });
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "chart", { hold: 1400 });
  tl.showCaption(CAPTIONS.open);
  await pressTool(tl, "chart", { ms: 300 });
  startTbChart(tl);
  await tl.wait(800);
  tl.showCaption(CAPTIONS.panel);
  await ring(tl, "[data-tl=chart-panel]", 2000);
  tl.showCaption(CAPTIONS.type);
  await openSelect(tl, "type");
  tl.showCaption(CAPTIONS.pie);
  await chooseOption(tl, "type", "pie", (c) => ({ ...c, type: "pie" }), { open: false });
  await tl.wait(1000);
  tl.showCaption(CAPTIONS.insert);
  await pressOn(tl, "[data-tl=chart-insert]", { ms: 800 });
  patchChart(tl, { placed: true, selected: false });
  tl.setVar("chartPanel", false);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=chart-obj]", 2400);
  await finish(tl, 600);
}
