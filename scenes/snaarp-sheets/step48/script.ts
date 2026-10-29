import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { INSERT_SAMPLE, LINK } from "@/components/sheets/insert-data";
import { chooseRow, clickCell, openMenu } from "@/components/sheets/edit-timeline";
import { beginInsert, openLinkPopover, placeLink } from "@/components/sheets/insert-timeline";
import { hoverOn, pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 48 - Insert > Link (Ctrl+K): link A2 to a sheet, then A3 to a web address. */
export const STEP48_DURATION_MS = 26600;

export async function runStep48(tl: Timeline) {
  beginInsert(tl, URLS.renamed);

  await tl.at(700);
  tl.showCaption(CAPTIONS.cell);
  await clickCell(tl, LINK.cell, { ms: 800 });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  await chooseRow(tl, "ins-link", { ms: 500 });
  await openLinkPopover(tl, LINK.cell);
  tl.showCaption(CAPTIONS.pop);
  await ring(tl, "[data-tl=link-top]", 1500);
  tl.showCaption(CAPTIONS.search);
  await ring(tl, "[data-tl=field-link-search]", 1500);
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=link-footer]", 1300);
  tl.showCaption(CAPTIONS.choose);
  await pressOn(tl, `[data-tl=link-sheet-${LINK.sheetId}]`, { ms: 800 });
  placeLink(tl, LINK.cell, INSERT_SAMPLE.tabs.forecast, `#sheet:${INSERT_SAMPLE.tabs.forecast}`);
  await tl.wait(700);
  tl.showCaption(CAPTIONS.chip);
  await ring(tl, "[data-tl=link-chip]", 1200);
  for (const id of ["link-copy", "link-edit", "link-remove"]) {
    await hoverOn(tl, `[data-tl=${id}]`, { ms: 500 });
    await tl.wait(400);
  }
  tl.hover(null);

  tl.setVar("linkChip", null);
  tl.showCaption(CAPTIONS.next);
  await clickCell(tl, LINK.urlCell, { ms: 800 });
  await openMenu(tl, "insert", { ms: 700 });
  await chooseRow(tl, "ins-link", { ms: 450 });
  await openLinkPopover(tl, LINK.urlCell);
  tl.showCaption(CAPTIONS.url);
  await typeInto(tl, "link-search", LINK.url, { msPerChar: 60 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.apply);
  await pressOn(tl, "[data-tl=link-apply]", { ms: 650 });
  placeLink(tl, LINK.urlCell, LINK.url, LINK.url);
  await tl.wait(600);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=link-chip]", 1800);
  await finish(tl, 600);
}
