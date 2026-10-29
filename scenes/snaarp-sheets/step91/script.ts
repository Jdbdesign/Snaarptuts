import type { Timeline } from "@/lib/timeline";
import { setTbFormat } from "@/components/sheets/toolbar-state";
import { clickColHead } from "@/components/sheets/insert-timeline";
import { beginTb, doFormat, hoverTool, openTool, pickRow, pressTool, seed, setSel } from "@/components/sheets/toolbar-timeline";
import { closeDialog, openDialog, pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, C91 } from "./data";

/** Snaarp Sheets, step 91 - Currency: the Cost column starts in dollars; GBP from the list, then Custom currency. Starts with the Cost column in USD. */
export const STEP91_DURATION_MS = 32500;

export async function runStep91(tl: Timeline) {
  beginTb(tl, "d1");
  seed(tl, (rows) => setTbFormat(rows, { r1: 1, c1: 3, r2: 9, c2: 3 }, "currency:USD"));

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await clickColHead(tl, "D");
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "currency", { hold: 1400 });
  tl.showCaption(CAPTIONS.open);
  await pressTool(tl, "currency", { ms: 300 });
  tl.setVar("tbMenu", "currency");
  await tl.wait(400);
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=tm-currency]", 1800);
  tl.showCaption(CAPTIONS.gbp);
  await pickRow(tl, "currency", "GBP", () => doFormat(tl, "currency:GBP"));
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=cell-d10]", 2000);

  // Back to dollars, so the custom dialog has something to change
  setSel(tl, "d1:d10");
  doFormat(tl, "currency:USD");
  tl.showCaption(CAPTIONS.custom);
  await openTool(tl, "currency", { hold: 300 });
  await pickRow(tl, "currency", "custom", () => openDialog(tl, "currency"));
  await tl.wait(700);
  tl.showCaption(CAPTIONS.dialog);
  await ring(tl, "[data-tl=cur-dialog]", 1800);
  tl.showCaption(CAPTIONS.scroll);
  await tl.scrollPanelTo("[data-tl=cur-list]", 700, 2200);
  await tl.scrollPanelTo("[data-tl=cur-list]", 0, 1000);
  tl.showCaption(CAPTIONS.search);
  await typeInto(tl, "cur-search", C91.search, { msPerChar: 120 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.pick);
  await pressOn(tl, `[data-tl=cur-row-${C91.pick}]`, { ms: 600 });
  tl.setVar("curPick", C91.pick);
  await tl.wait(400);
  tl.showCaption(CAPTIONS.apply);
  await pressOn(tl, "[data-tl=cur-apply]", { ms: 600 });
  doFormat(tl, `currency:${C91.pick}`);
  closeDialog(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.end);
  await ring(tl, "[data-tl=cell-d3]", 1800);
  await finish(tl, 600);
}
