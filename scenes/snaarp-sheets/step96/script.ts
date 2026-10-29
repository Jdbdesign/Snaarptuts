import type { Timeline } from "@/lib/timeline";
import { beginTb, clickCellTb, doToggle, dragSelect, hoverTool, pressTool } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 96 - Bold, Italic, Underline on the header, Strikethrough on one cell, then off again. Starts with A1 selected. */
export const STEP96_DURATION_MS = 32200;

export async function runStep96(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await dragSelect(tl, "a1", "k1", { ms: 900 });
  for (const [id, cap] of [["bold", CAPTIONS.bold], ["italic", CAPTIONS.italic], ["underline", CAPTIONS.underline]] as const) {
    tl.showCaption(cap);
    await hoverTool(tl, id, { hold: 1100 });
    await pressTool(tl, id, { ms: 250 });
    doToggle(tl, id);
    await tl.wait(600);
  }
  tl.showCaption(CAPTIONS.look);
  await ring(tl, "[data-tl=cell-a1]", 1800);
  tl.showCaption(CAPTIONS.off);
  await pressTool(tl, "bold", { ms: 600 });
  doToggle(tl, "bold");
  await tl.wait(800);

  tl.showCaption(CAPTIONS.cell);
  await clickCellTb(tl, "a8", 800);
  tl.showCaption(CAPTIONS.strike);
  await hoverTool(tl, "strike", { hold: 1400 });
  await pressTool(tl, "strike", { ms: 250 });
  doToggle(tl, "strike");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=cell-a8]", 2200);
  tl.showCaption(CAPTIONS.undo);
  await pressTool(tl, "strike", { ms: 600 });
  doToggle(tl, "strike");
  await tl.wait(900);
  await finish(tl, 600);
}
