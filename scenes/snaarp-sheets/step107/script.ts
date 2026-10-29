import type { Timeline } from "@/lib/timeline";
import { runAction } from "@/components/sheets/edit-timeline";
import { confirmFilter, filterAll, openFilterPop, toggleFilterValue } from "@/components/sheets/fdt-timeline";
import { beginTb, hoverTool, pressTool } from "@/components/sheets/toolbar-timeline";
import { pressOn, ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, F107 } from "./data";

/** Snaarp Sheets, step 107 - the filter tool: filter Status to Overdue, then remove the filter. Starts with A1 selected. */
export const STEP107_DURATION_MS = 25800;

export async function runStep107(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "filter", { hold: 1500 });
  tl.showCaption(CAPTIONS.open);
  await pressTool(tl, "filter", { ms: 300 });
  runAction(tl, "dat-filter");
  await tl.wait(600);
  tl.showCaption(CAPTIONS.buttons);
  await ring(tl, "[data-tl=cell-a1]", 1600);

  tl.showCaption(CAPTIONS.status);
  await openFilterPop(tl, F107.col);
  await tl.wait(400);
  tl.showCaption(CAPTIONS.clear);
  await filterAll(tl, false);
  tl.showCaption(CAPTIONS.pick);
  await toggleFilterValue(tl, F107.keep);
  tl.showCaption(CAPTIONS.ok);
  await pressOn(tl, "[data-tl=fp-ok]", { ms: 650 });
  confirmFilter(tl);
  await tl.wait(700);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=rowhead-3]", 2800);

  tl.showCaption(CAPTIONS.remove);
  await pressTool(tl, "filter", { ms: 700 });
  runAction(tl, "dat-filter");
  await tl.wait(600);
  tl.showCaption(CAPTIONS.back);
  await ring(tl, "[data-tl=rowhead-2]", 1600);
  await finish(tl, 600);
}
