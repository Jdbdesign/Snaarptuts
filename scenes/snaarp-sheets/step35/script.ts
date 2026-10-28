import type { Timeline } from "@/lib/timeline";
import { beginEdit, chooseSub, hoverRow, hoverSubRow, openMenu } from "@/components/sheets/edit-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 35 - View > Zoom: 50%, 150%, 200%, then back to 100%. */
export const STEP35_DURATION_MS = 31900;

async function zoomTo(tl: Timeline, level: number, click: string, done: string) {
  tl.showCaption(click);
  await openMenu(tl, "view", { ms: 650 });
  await chooseSub(tl, "zoom", `zoom-${level}`, { ms: 450 });
  await tl.wait(500);
  tl.showCaption(done);
  await ring(tl, "[data-tl=tool-zoom]", 2200);
}

export async function runStep35(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "view", { ms: 900 });
  await hoverRow(tl, "zoom", { ms: 450, sub: "zoom" });
  tl.showCaption(CAPTIONS.list);
  for (const id of ["zoom-75", "zoom-100", "zoom-125"]) {
    await hoverSubRow(tl, id, { ms: 400 });
    await tl.wait(450);
  }

  tl.showCaption(CAPTIONS.small);
  await chooseSub(tl, "zoom", "zoom-50", { ms: 400 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.smallDone);
  await ring(tl, "[data-tl=tool-zoom]", 2200);

  await zoomTo(tl, 150, CAPTIONS.large, CAPTIONS.largeDone);
  await zoomTo(tl, 200, CAPTIONS.larger, CAPTIONS.largerDone);
  await zoomTo(tl, 100, CAPTIONS.back, CAPTIONS.backDone);
  await finish(tl, 1000);
}
