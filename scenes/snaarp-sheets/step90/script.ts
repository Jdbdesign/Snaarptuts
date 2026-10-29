import type { Timeline } from "@/lib/timeline";
import { beginTb, openTool, pickRow } from "@/components/sheets/toolbar-timeline";
import { hoverTool } from "@/components/sheets/toolbar-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 90 - the zoom box: 50%, 150%, back to 100%. Starts with A1 selected. */
export const STEP90_DURATION_MS = 25700;

export async function runStep90(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "zoom", { hold: 1600 });
  tl.showCaption(CAPTIONS.open);
  await openTool(tl, "zoom", { hold: 100 });
  tl.showCaption(CAPTIONS.list);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.small);
  await pickRow(tl, "zoom", "50", () => tl.setVar("zoomPct", 50));
  await tl.wait(1800);
  await openTool(tl, "zoom", { hold: 100 });
  tl.showCaption(CAPTIONS.big);
  await pickRow(tl, "zoom", "150", () => tl.setVar("zoomPct", 150));
  await tl.wait(1800);
  await openTool(tl, "zoom", { hold: 100 });
  tl.showCaption(CAPTIONS.back);
  await pickRow(tl, "zoom", "100", () => tl.setVar("zoomPct", 100));
  await tl.wait(800);
  tl.showCaption(CAPTIONS.done);
  await finish(tl, 1800);
}
