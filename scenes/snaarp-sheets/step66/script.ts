import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, CELL, URLS } from "./data";
import { chooseSub, clickCell, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 66 - Data > Sort sheet by the Cost column: A to Z, then Z to A; the header row stays. */
export const STEP66_DURATION_MS = 28000;

export async function runStep66(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await clickCell(tl, CELL, { ring: true });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "data", { ms: 650 });
  await hoverRow(tl, "dat-sortsheet", { sub: "sortsheet", ms: 450 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.asc);
  await chooseSub(tl, "dat-sortsheet", "sortsheet-az", { ms: 380, hold: 140 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.ascDone);
  await ring(tl, "[data-tl=cell-c2]", 1700);

  await openMenu(tl, "data", { ms: 600 });
  tl.showCaption(CAPTIONS.desc);
  await chooseSub(tl, "dat-sortsheet", "sortsheet-za", { ms: 380, hold: 140 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.descDone);
  await ring(tl, "[data-tl=cell-c2]", 1700);
  tl.showCaption(CAPTIONS.header);
  await ring(tl, "[data-tl=cell-a1]", 1500);
  await finish(tl, 300);
}
