import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, RANGE, SIZES, URLS } from "./data";
import { chooseSub, dragSelect, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 59 - Format > Font size on A2:A3: 14, then 24, then back to 10 (the rows follow the text). */
export const STEP59_DURATION_MS = 23600;

async function size(tl: Timeline, n: number, caption: string) {
  await openMenu(tl, "format", { ms: 500 });
  tl.showCaption(caption);
  await chooseSub(tl, "fmt-fontsize", `fs-${n}`, { ms: 380, hold: 150 });
  await tl.wait(250);
  await ring(tl, `[data-tl=cell-${RANGE.from}]`, 900);
}

export async function runStep59(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, RANGE.from, RANGE.to, { ms: 700 });
  await tl.wait(250);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "format", { ms: 650 });
  await hoverRow(tl, "fmt-fontsize", { sub: "fontsize", ms: 450 });
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=menu-item-fmt-fontsize]", 1300);
  tl.showCaption(CAPTIONS.big);
  await chooseSub(tl, "fmt-fontsize", `fs-${SIZES.big}`, { ms: 380, hold: 150 });
  await tl.wait(250);
  await ring(tl, `[data-tl=cell-${RANGE.from}]`, 1000);

  await size(tl, SIZES.bigger, CAPTIONS.bigger);
  await size(tl, SIZES.back, CAPTIONS.back);
  tl.showCaption(CAPTIONS.done);
  await tl.wait(900);
  await finish(tl, 300);
}
