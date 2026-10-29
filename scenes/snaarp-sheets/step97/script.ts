import type { Timeline } from "@/lib/timeline";
import { beginTb, clickCellTb, doColour, dragSelect, hoverTool, openTool, pickRow, setSel } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, C97 } from "./data";

/** Snaarp Sheets, step 97 - Text color (red on Overdue) and Fill color (yellow header, green Paid). Starts with A1 selected. */
export const STEP97_DURATION_MS = 76500;

const hex = (h: string) => `#${h.toUpperCase()}`;

export async function runStep97(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await clickCellTb(tl, "f3", 800);
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "textcolor", { hold: 1300 });
  tl.showCaption(CAPTIONS.open);
  await openTool(tl, "textcolor", { hold: 100 });
  tl.showCaption(CAPTIONS.grid);
  await ring(tl, "[data-tl=tm-textcolor]", 1800);
  tl.showCaption(CAPTIONS.red);
  await pickRow(tl, "textcolor", C97.red, () => doColour(tl, "color", hex(C97.red)));
  setSel(tl, "f8");
  doColour(tl, "color", hex(C97.red));
  setSel(tl, "f3");
  tl.showCaption(CAPTIONS.redDone);
  await ring(tl, "[data-tl=cell-f3]", 2000);

  tl.showCaption(CAPTIONS.header);
  await dragSelect(tl, "a1", "m1", { ms: 900 });
  tl.showCaption(CAPTIONS.fillOpen);
  await openTool(tl, "highlight", { hold: 700 });
  tl.showCaption(CAPTIONS.yellow);
  await pickRow(tl, "highlight", C97.yellow, () => doColour(tl, "fill", hex(C97.yellow)));
  tl.showCaption(CAPTIONS.yellowDone);
  await ring(tl, "[data-tl=cell-a1]", 2000);

  tl.showCaption(CAPTIONS.paid);
  await clickCellTb(tl, "f2", 800);
  await openTool(tl, "highlight", { hold: 300 });
  tl.showCaption(CAPTIONS.green);
  await pickRow(tl, "highlight", C97.green, () => doColour(tl, "fill", hex(C97.green)));
  tl.showCaption(CAPTIONS.repeat);
  for (const ref of ["f4", "f6", "f9"]) {
    setSel(tl, ref);
    doColour(tl, "fill", hex(C97.green));
    await tl.wait(450);
  }
  setSel(tl, "f2");
  tl.showCaption(CAPTIONS.end);
  await ring(tl, "[data-tl=cell-f9]", 2000);
  await finish(tl, 600);
}
