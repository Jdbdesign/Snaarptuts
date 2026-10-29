import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, CELL, URLS } from "./data";
import { PALETTE } from "@/components/sheets/fdt-data";
import { chooseRow, clickCell, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt, runPaletteResult } from "@/components/sheets/fdt-timeline";
import { ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 82 - the Help menu and Search the menus: type "bold", Enter runs Format > Bold on A2. */
export const STEP82_DURATION_MS = 22700;

export async function runStep82(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await clickCell(tl, CELL, { ring: true });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "help", { ms: 700 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.greyed);
  for (const id of ["hlp-help", "hlp-training", "hlp-updates", "hlp-report"]) {
    await hoverRow(tl, id, { ms: 380 });
    await tl.wait(700);
  }
  tl.showCaption(CAPTIONS.search);
  await chooseRow(tl, "hlp-search", { ms: 500 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.type);
  await typeInto(tl, "pal-q", PALETTE.query, { moveMs: 600, msPerChar: 160 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.results);
  await ring(tl, "[data-tl=pal-list]", 1900);
  tl.showCaption(CAPTIONS.enter);
  await ring(tl, "[data-tl=pal-row-0]", 1400);
  tl.setVar("focus", "");
  runPaletteResult(tl);
  await tl.wait(700);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, `[data-tl=cell-${CELL}]`, 1800);
  await finish(tl, 400);
}
