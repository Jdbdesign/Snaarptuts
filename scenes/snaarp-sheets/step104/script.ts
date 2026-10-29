import type { Timeline } from "@/lib/timeline";
import { beginTb, clickCellTb, hoverTool, pressTool } from "@/components/sheets/toolbar-timeline";
import { openLinkPopover, placeLink } from "@/components/sheets/insert-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, L104 } from "./data";

/** Snaarp Sheets, step 104 - Insert link: L2 to a web address, L3 to the Vendors sheet. Starts with A1 selected. */
export const STEP104_DURATION_MS = 29800;

export async function runStep104(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await clickCellTb(tl, L104.first, 900);
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "link", { hold: 1500 });
  tl.showCaption(CAPTIONS.open);
  await pressTool(tl, "link", { ms: 300 });
  await openLinkPopover(tl, L104.first);
  tl.showCaption(CAPTIONS.pop);
  await ring(tl, "[data-tl=link-top]", 1500);
  tl.showCaption(CAPTIONS.search);
  await ring(tl, "[data-tl=field-link-search]", 1300);
  tl.showCaption(CAPTIONS.type);
  await typeInto(tl, "link-search", L104.url, { msPerChar: 70 });
  tl.showCaption(CAPTIONS.apply);
  await pressOn(tl, "[data-tl=link-apply]", { ms: 650 });
  placeLink(tl, L104.first, L104.url, L104.url);
  await tl.wait(700);
  tl.showCaption(CAPTIONS.chip);
  await ring(tl, "[data-tl=link-chip]", 2000);

  tl.setVar("linkChip", null);
  tl.showCaption(CAPTIONS.second);
  await clickCellTb(tl, L104.second, 900);
  await pressTool(tl, "link", { ms: 600 });
  await openLinkPopover(tl, L104.second);
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=link-footer]", 1500);
  tl.showCaption(CAPTIONS.choose);
  await pressOn(tl, `[data-tl=link-sheet-${L104.sheetId}]`, { ms: 800 });
  placeLink(tl, L104.second, "Vendors", "#sheet:Vendors");
  await tl.wait(700);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=link-chip]", 2000);
  await finish(tl, 600);
}
