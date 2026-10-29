import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, CELL, TALL, URLS } from "./data";
import { chooseSub, clickCell, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 60 - Format > Alignment on A2 (a tall row): Center, Right, Left, then Top, Bottom, Middle. */
export const STEP60_DURATION_MS = 35000;

async function align(tl: Timeline, id: string, caption: string) {
  await openMenu(tl, "format", { ms: 480 });
  tl.showCaption(caption);
  await chooseSub(tl, "fmt-align", `al-${id}`, { ms: 360, hold: 140 });
  await tl.wait(200);
  await ring(tl, `[data-tl=cell-${CELL}]`, 900);
}

export async function runStep60(tl: Timeline) {
  beginFdt(tl, URLS.renamed);
  tl.setVar("rowHeights", { [TALL.row]: TALL.px });

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await clickCell(tl, CELL, { ring: true });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "format", { ms: 650 });
  await hoverRow(tl, "fmt-align", { sub: "align", ms: 450 });
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=menu-item-fmt-align]", 1500);
  tl.showCaption(CAPTIONS.center);
  await chooseSub(tl, "fmt-align", "al-center", { ms: 380, hold: 140 });
  await tl.wait(200);
  await ring(tl, `[data-tl=cell-${CELL}]`, 900);

  await align(tl, "right", CAPTIONS.right);
  await align(tl, "left", CAPTIONS.left);
  await align(tl, "top", CAPTIONS.top);
  await align(tl, "bottom", CAPTIONS.bottom);
  await align(tl, "middle", CAPTIONS.middle);
  tl.showCaption(CAPTIONS.done);
  await tl.wait(800);
  await finish(tl, 300);
}
