import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, FILTER_COL, HIDE, URLS } from "./data";
import { chooseSub, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt, chooseSavedView, closeFilterView, confirmFilter, openFilterPop, renameFilterView, toggleFilterValue } from "@/components/sheets/fdt-timeline";
import { FILTER } from "@/components/sheets/fdt-data";
import { pressOn, ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 70 - Data > Filter views: create a view, name it, hide Paid, close it, open it again from the menu, then Remove filter. */
export const STEP70_DURATION_MS = 40800;

export async function runStep70(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "data", { ms: 700 });
  await hoverRow(tl, "dat-views", { sub: "fviews", ms: 500 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.create);
  await chooseSub(tl, "dat-views", "fv-new", { ms: 400, hold: 150 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.bar);
  await ring(tl, "[data-tl=fv-bar]", 1600);
  tl.showCaption(CAPTIONS.name);
  await renameFilterView(tl, FILTER.viewRenamed);

  tl.showCaption(CAPTIONS.status);
  await openFilterPop(tl, FILTER_COL);
  tl.showCaption(CAPTIONS.untick);
  await toggleFilterValue(tl, HIDE);
  await pressOn(tl, "[data-tl=fp-ok]", { ms: 600 });
  confirmFilter(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.hidden);
  await ring(tl, "[data-tl=rowhead-3]", 1700);

  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=fv-close]", { ms: 700 });
  closeFilterView(tl, tl.getVar<string>("fvBar", FILTER.viewRenamed));
  await tl.wait(500);
  tl.showCaption(CAPTIONS.saved);
  await ring(tl, "[data-tl=rowhead-2]", 1500);

  tl.showCaption(CAPTIONS.reopen);
  await openMenu(tl, "data", { ms: 650 });
  await hoverRow(tl, "dat-views", { sub: "fviews", ms: 450 });
  await tl.wait(500);
  await chooseSavedView(tl, "v1");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.applied);
  await ring(tl, "[data-tl=rowhead-3]", 1700);

  tl.showCaption(CAPTIONS.remove);
  await openMenu(tl, "data", { ms: 650 });
  await chooseSub(tl, "dat-views", "fv-remove", { ms: 420, hold: 150 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=rowhead-2]", 1400);
  await finish(tl, 300);
}
