import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { closeMenus, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 65 - the Data menu group by group: Sort sheet and Sort range, Sort A-Z / Z-A, filters, Data validation, Named ranges, Protected sheets. */
export const STEP65_DURATION_MS = 22000;

export async function runStep65(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(700);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "data", { ms: 800 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.sort);
  await hoverRow(tl, "dat-sortsheet", { sub: "sortsheet", ms: 600 });
  await tl.wait(1100);
  await hoverRow(tl, "dat-sortrange", { sub: "sortrange", ms: 400 });
  await tl.wait(1100);

  tl.showCaption(CAPTIONS.quick);
  await hoverRow(tl, "dat-az", { ms: 450 });
  await ring(tl, "[data-tl=menu-data-group-1]", 1500);

  tl.showCaption(CAPTIONS.filter);
  await hoverRow(tl, "dat-filter", { ms: 450 });
  await tl.wait(1200);
  tl.showCaption(CAPTIONS.views);
  await hoverRow(tl, "dat-views", { sub: "fviews", ms: 400 });
  await tl.wait(1300);

  tl.showCaption(CAPTIONS.tools);
  await hoverRow(tl, "dat-validation", { ms: 450 });
  await tl.wait(600);
  await hoverRow(tl, "dat-named", { ms: 300 });
  await tl.wait(600);
  await hoverRow(tl, "dat-protect", { ms: 300 });
  await ring(tl, "[data-tl=menu-data-group-3]", 1400);
  closeMenus(tl);
  await finish(tl, 400);
}
