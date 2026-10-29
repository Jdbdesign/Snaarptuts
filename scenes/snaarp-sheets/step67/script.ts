import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, RANGE, URLS } from "./data";
import { chooseSub, dragSelect, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 67 - Data > Sort range on A2:D4: A to Z, then Z to A; rows 5 and 6 do not move. */
export const STEP67_DURATION_MS = 21400;

export async function runStep67(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, RANGE.from, RANGE.to, { ms: 750 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "data", { ms: 650 });
  await hoverRow(tl, "dat-sortrange", { sub: "sortrange", ms: 450 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.asc);
  await chooseSub(tl, "dat-sortrange", "sortrange-az", { ms: 380, hold: 140 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.ascDone);
  await ring(tl, "[data-tl=cell-a2]", 1800);

  await openMenu(tl, "data", { ms: 600 });
  tl.showCaption(CAPTIONS.desc);
  await chooseSub(tl, "dat-sortrange", "sortrange-za", { ms: 380, hold: 140 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.descDone);
  await ring(tl, "[data-tl=cell-a5]", 1800);
  await finish(tl, 300);
}
