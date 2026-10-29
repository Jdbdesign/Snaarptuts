import type { Timeline } from "@/lib/timeline";
import { phoneScroll } from "@/components/sheets/insert-timeline";
import { finish } from "../shared";
import { CAPTIONS, CELL, URLS } from "./data";
import { chooseSub, clickCell, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 61 - Format > Wrapping on the long note in I2: Overflow (spills right), Wrap (the row grows), Clip (cut off). */
export const STEP61_DURATION_MS = 28000;

async function wrap(tl: Timeline, id: string, caption: string) {
  await openMenu(tl, "format", { ms: 480 });
  tl.showCaption(caption);
  await chooseSub(tl, "fmt-wrap", `wr-${id}`, { ms: 360, hold: 140 });
  await tl.wait(300);
  await ring(tl, `[data-tl=cell-${CELL}]`, 1500);
}

export async function runStep61(tl: Timeline) {
  beginFdt(tl, URLS.renamed);
  phoneScroll(tl, 6);

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await clickCell(tl, CELL, { ring: true });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "format", { ms: 650 });
  await hoverRow(tl, "fmt-wrap", { sub: "wrapping", ms: 450 });
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=menu-item-fmt-wrap]", 1400);
  tl.showCaption(CAPTIONS.overflow);
  await chooseSub(tl, "fmt-wrap", "wr-overflow", { ms: 380, hold: 140 });
  await tl.wait(300);
  await ring(tl, `[data-tl=cell-${CELL}]`, 1500);

  await wrap(tl, "wrap", CAPTIONS.wrap);
  await wrap(tl, "clip", CAPTIONS.clip);
  tl.showCaption(CAPTIONS.done);
  await tl.wait(700);
  await finish(tl, 300);
}
