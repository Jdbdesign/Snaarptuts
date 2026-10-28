import type { Timeline } from "@/lib/timeline";
import { beginEdit, chooseSub, hoverRow, hoverSubRow, openMenu } from "@/components/sheets/edit-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 30 - View > Show > Formula bar, Gridlines, Formulas (each switched off or on, then back). */
export const STEP30_DURATION_MS = 40500;

async function flip(tl: Timeline, sub: string, caption: string) {
  tl.showCaption(caption);
  await openMenu(tl, "view", { ms: 650 });
  await chooseSub(tl, "show", sub, { ms: 450 });
  await tl.wait(500);
}

export async function runStep30(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "view", { ms: 900 });
  await hoverRow(tl, "show", { ms: 450, sub: "show" });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.list);
  for (const id of ["show-bar", "show-grid", "show-formulas"]) {
    await hoverSubRow(tl, id, { ms: 450 });
    await tl.wait(650);
  }

  // Formula bar
  tl.showCaption(CAPTIONS.barOff);
  await chooseSub(tl, "show", "show-bar", { ms: 400 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.barGone);
  await tl.wait(2000);
  await flip(tl, "show-bar", CAPTIONS.back);
  await tl.wait(1200);

  // Gridlines
  await flip(tl, "show-grid", CAPTIONS.gridOff);
  tl.showCaption(CAPTIONS.gridGone);
  await tl.wait(2200);
  await flip(tl, "show-grid", CAPTIONS.back);
  await tl.wait(1200);

  // Formulas
  await flip(tl, "show-formulas", CAPTIONS.formulasOn);
  tl.showCaption(CAPTIONS.formulasShown);
  await ring(tl, "[data-tl=cell-c6]", 2600);
  await flip(tl, "show-formulas", CAPTIONS.off);
  await tl.wait(800);
  tl.showCaption(CAPTIONS.done);
  await finish(tl, 1500);
}
