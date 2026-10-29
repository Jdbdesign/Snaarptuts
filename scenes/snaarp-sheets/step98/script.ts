import type { Timeline } from "@/lib/timeline";
import { beginTb, doBorders, dragSelect, hoverTool, openTool, pickRow } from "@/components/sheets/toolbar-timeline";
import { pressOn, ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, B98 } from "./data";

/** Snaarp Sheets, step 98 - Borders: outer frame, a coloured line under the header, then Clear. Starts with A1 selected. */
export const STEP98_DURATION_MS = 48500;

export async function runStep98(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await dragSelect(tl, "a1", "k10", { ms: 900 });
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "borders", { hold: 1200 });
  tl.showCaption(CAPTIONS.open);
  await openTool(tl, "borders", { hold: 100 });
  tl.showCaption(CAPTIONS.grid);
  await ring(tl, "[data-tl=tm-borders]", 2400);
  tl.showCaption(CAPTIONS.outer);
  await pickRow(tl, "borders", "outer", () => doBorders(tl, "outer"));
  tl.showCaption(CAPTIONS.outerDone);
  await ring(tl, "[data-tl=cell-a1]", 2000);

  tl.showCaption(CAPTIONS.header);
  await dragSelect(tl, "a1", "k1", { ms: 800 });
  await openTool(tl, "borders", { hold: 300 });
  tl.showCaption(CAPTIONS.style);
  await pressOn(tl, "[data-tl=tm-borders-stylebtn]", { ms: 600, ring: false });
  tl.setVar("tbSub", "style");
  await tl.wait(400);
  await pickRow(tl, "borders", `style-${B98.style}`, () => {
    tl.setVar("borderStyle", B98.style);
    tl.setVar("tbSub", "");
  }, { keepOpen: true });
  tl.showCaption(CAPTIONS.colour);
  await pressOn(tl, "[data-tl=tm-borders-colorbtn]", { ms: 600, ring: false });
  tl.setVar("tbSub", "color");
  await tl.wait(400);
  await pickRow(tl, "borders", `color-${B98.colour}`, () => {
    tl.setVar("borderColor", `#${B98.colour.toUpperCase()}`);
    tl.setVar("tbSub", "");
  }, { keepOpen: true });
  tl.showCaption(CAPTIONS.bottom);
  await pickRow(tl, "borders", "bottom", () => doBorders(tl, "bottom"));
  tl.showCaption(CAPTIONS.bottomDone);
  await ring(tl, "[data-tl=cell-c1]", 2000);

  tl.showCaption(CAPTIONS.clear);
  await dragSelect(tl, "a1", "k10", { ms: 800 });
  await openTool(tl, "borders", { hold: 300 });
  await pickRow(tl, "borders", "clear", () => doBorders(tl, "clear"));
  tl.showCaption(CAPTIONS.end);
  await tl.wait(1600);
  await finish(tl, 600);
}
