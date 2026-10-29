import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, FILL, RANGE, URLS } from "./data";
import { chooseRow, chooseSub, commit, dragSelect, getRows, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { setLook } from "@/components/sheets/fdt-state";
import { single, sorted, type Range } from "@/components/sheets/grid-state";
import { pressOn, ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 63 - make F2:F3 bold, shaded and £, then Format > Clear formatting (⌘\) puts it all back. */
export const STEP63_DURATION_MS = 32000;

export async function runStep63(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, RANGE.from, RANGE.to, { ms: 700 });
  await tl.wait(250);

  tl.showCaption(CAPTIONS.bold);
  await openMenu(tl, "format", { ms: 500 });
  await chooseRow(tl, "fmt-bold", { ms: 380 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.fill);
  await pressOn(tl, "[data-tl=tool-highlight]", { ms: 700 });
  const s = sorted(tl.getVar<Range>("sel", single(0, 0)));
  commit(tl, setLook(getRows(tl), s, { fill: FILL }));
  await tl.wait(500);

  tl.showCaption(CAPTIONS.currency);
  await openMenu(tl, "format", { ms: 500 });
  await chooseSub(tl, "fmt-number", "nf-currency", { ms: 380, hold: 140 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.styled);
  await ring(tl, `[data-tl=cell-${RANGE.from}]`, 1500);

  tl.showCaption(CAPTIONS.clear);
  await openMenu(tl, "format", { ms: 500 });
  await chooseRow(tl, "fmt-clear", { ms: 420 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, `[data-tl=cell-${RANGE.from}]`, 1600);
  await finish(tl, 300);
}
