import type { Timeline } from "@/lib/timeline";
import { beginTb, closeToolMenu, hoverRow, hoverTool, pressTool } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 110 - the More (three dots) button: the toolbar is collapsed (a narrow window) and More holds the tools that no longer fit. Starts with A1 selected. */
export const STEP110_DURATION_MS = 34000;

export async function runStep110(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "more", { hold: 1400 });
  tl.showCaption(CAPTIONS.narrow);
  tl.setVar("tbCollapsed", true);
  await tl.wait(500);
  await ring(tl, "[data-tl=sheet-toolbar]", 2400);
  tl.showCaption(CAPTIONS.open);
  await pressTool(tl, "more", { ms: 700 });
  tl.setVar("tbMenu", "more");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=tm-more]", 2600);
  tl.showCaption(CAPTIONS.point);
  for (const id of ["merge", "wrap", "chart", "functions"]) await hoverRow(tl, "more", id, 450, 700);
  tl.hover(null);
  tl.showCaption(CAPTIONS.close);
  await pressTool(tl, "more", { ms: 650 });
  closeToolMenu(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.wide);
  tl.setVar("tbCollapsed", false);
  await ring(tl, "[data-tl=sheet-toolbar]", 2200);
  await finish(tl, 600);
}
