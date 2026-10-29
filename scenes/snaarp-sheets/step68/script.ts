import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, CELL, URLS } from "./data";
import { chooseRow, clickCell, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 68 - Data > Sort A to Z and Sort Z to A with a cell of the Item column selected. */
export const STEP68_DURATION_MS = 24000;

export async function runStep68(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await clickCell(tl, CELL, { ring: true });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "data", { ms: 650 });
  tl.showCaption(CAPTIONS.asc);
  await chooseRow(tl, "dat-az", { ms: 500 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.ascDone);
  await ring(tl, "[data-tl=cell-a2]", 1800);

  await openMenu(tl, "data", { ms: 600 });
  tl.showCaption(CAPTIONS.desc);
  await chooseRow(tl, "dat-za", { ms: 420 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.descDone);
  await ring(tl, "[data-tl=cell-a2]", 1800);
  await finish(tl, 300);
}
