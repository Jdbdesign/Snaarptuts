import type { Timeline } from "@/lib/timeline";
import { beginTb, doLook, dragSelect, hoverTool, openTool, pickRow } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, F94 } from "./data";

/** Snaarp Sheets, step 94 - the font box: Georgia on the header row, then back to Arial. Starts with A1 selected. */
export const STEP94_DURATION_MS = 25800;

export async function runStep94(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await dragSelect(tl, "a1", "k1", { ms: 900 });
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "font", { hold: 1200 });
  tl.showCaption(CAPTIONS.open);
  await openTool(tl, "font", { hold: 100 });
  tl.showCaption(CAPTIONS.list);
  await tl.scrollPanelTo("[data-tl=tm-font]", 400, 1800);
  await tl.scrollPanelTo("[data-tl=tm-font]", 0, 900);
  tl.showCaption(CAPTIONS.pick);
  await pickRow(tl, "font", F94.font, () => doLook(tl, { font: "Georgia" }));
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=cell-a1]", 2200);
  tl.showCaption(CAPTIONS.revert);
  await openTool(tl, "font", { hold: 200 });
  await pickRow(tl, "font", F94.back, () => doLook(tl, { font: undefined }));
  tl.showCaption(CAPTIONS.end);
  await ring(tl, "[data-tl=cell-a1]", 1800);
  await finish(tl, 600);
}
