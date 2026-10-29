import type { Timeline } from "@/lib/timeline";
import { beginTb, clickCellTb, doColour, doToggle, dropLook, hoverTool, openTool, pickRow, pickUpLook, pressTool } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, P89 } from "./data";

/** Snaarp Sheets, step 89 - Paint format: style A1, copy its look onto B1. Starts with A1 selected. */
export const STEP89_DURATION_MS = 23200;

export async function runStep89(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await clickCellTb(tl, "a1");
  tl.showCaption(CAPTIONS.bold);
  await pressTool(tl, "bold");
  doToggle(tl, "bold");
  await tl.wait(400);
  tl.showCaption(CAPTIONS.fill);
  await openTool(tl, "highlight");
  await pickRow(tl, "highlight", P89.fill.slice(1).toLowerCase(), () => doColour(tl, "fill", P89.fill));
  tl.showCaption(CAPTIONS.look);
  await ring(tl, "[data-tl=cell-a1]", 1600);

  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "paint", { hold: 1400 });
  tl.showCaption(CAPTIONS.click);
  await pressTool(tl, "paint", { ms: 300 });
  pickUpLook(tl);
  await tl.wait(600);
  tl.showCaption(CAPTIONS.target);
  await clickCellTb(tl, "b1", 800);
  dropLook(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=cell-b1]", 2000);
  tl.showCaption(CAPTIONS.twice);
  await hoverTool(tl, "paint", { hold: 2200 });
  await finish(tl, 600);
}
