import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, FILTER_COL, HIDE, SEARCH, URLS } from "./data";
import { chooseRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt, confirmFilter, filterAll, openFilterPop, toggleFilterValue } from "@/components/sheets/fdt-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 69 - Data > Create a filter: the Status list (search, Clear, Select all, untick Paid, OK), then Remove filter. */
export const STEP69_DURATION_MS = 30900;

export async function runStep69(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "data", { ms: 700 });
  await chooseRow(tl, "dat-filter", { ms: 500 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.buttons);
  await ring(tl, "[data-tl=cell-a1]", 1500);

  tl.showCaption(CAPTIONS.status);
  await openFilterPop(tl, FILTER_COL);
  await tl.wait(400);
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=filter-pop]", 1500);
  tl.showCaption(CAPTIONS.search);
  await typeInto(tl, "fp-q", SEARCH, { moveMs: 500, msPerChar: 150 });
  await tl.wait(900);
  tl.setVar("field:fp-q", "");
  tl.setVar("focus", "");
  tl.showCaption(CAPTIONS.clear);
  await filterAll(tl, false);
  tl.showCaption(CAPTIONS.all);
  await filterAll(tl, true);
  tl.showCaption(CAPTIONS.untick);
  await toggleFilterValue(tl, HIDE);
  tl.showCaption(CAPTIONS.ok);
  await pressOn(tl, "[data-tl=fp-ok]", { ms: 650 });
  confirmFilter(tl);
  await tl.wait(600);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=rowhead-3]", 2000);

  tl.showCaption(CAPTIONS.remove);
  await openMenu(tl, "data", { ms: 650 });
  await chooseRow(tl, "dat-filter", { ms: 450 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.back);
  await ring(tl, "[data-tl=rowhead-2]", 1600);
  await finish(tl, 300);
}
