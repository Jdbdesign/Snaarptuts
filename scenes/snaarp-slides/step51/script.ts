import { PAINT_DECK, PAINT_SOURCE, PAINT_TARGET, TOOLBAR_SPOTS } from "@/components/slides/slide-elements-data";
import { drawTextBox, endTextEdit } from "@/components/slides/slides-edit";
import { pressOn, ring } from "@/components/slides/slides-timeline";
import { chooseOption, clickTool, hoverOption, openToolbar } from "@/components/slides/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv, clickBlank } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 51 - Meet the toolbar tools. Starts on slide 2 with a grey box under the blue one. */
export const STEP51_DURATION_MS = 68000;

export async function runStep51(tl: Timeline) {
  beginEiv(tl, [0.55, 0.55], PAINT_DECK);
  tl.setVar("insertAt", TOOLBAR_SPOTS.insertAt);
  tl.setVar("paintLook", null);
  tl.setVar("print", false);

  await tl.at(800);
  tl.showCaption(CAPTIONS.intro);
  await ring(tl, "[data-tl=editor-toolbar]", 2200);

  // Text tool: draw a box and type
  await tl.at(3800);
  tl.showCaption(CAPTIONS.text);
  await clickTool(tl, "text", { ms: 800 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.draw);
  await drawTextBox(tl, TOOLBAR_SPOTS.textBox, 1200);
  await tl.wait(400);
  tl.showCaption(CAPTIONS.type);
  await tl.typeText("slideText", "Hello team", { msPerChar: 70 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.finish);
  await clickBlank(tl);
  endTextEdit(tl);
  await tl.wait(900);

  // Undo and redo
  await tl.at(14500);
  tl.showCaption(CAPTIONS.undo);
  await clickTool(tl, "undo", { ms: 800 });
  await tl.wait(1500);
  tl.showCaption(CAPTIONS.redo);
  await clickTool(tl, "redo", { ms: 600 });
  await tl.wait(1500);

  // Paint format: blue box -> grey box
  await tl.at(21500);
  tl.showCaption(CAPTIONS.copyFrom);
  await pressOn(tl, `[data-tl=el-${PAINT_SOURCE}]`, { ms: 900 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.paint);
  await clickTool(tl, "paint", { ms: 800 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.paintTo);
  await tl.moveCursorTo(`[data-tl=el-${PAINT_TARGET}]`, { ms: 900 });
  await tl.click(`[data-tl=el-${PAINT_TARGET}]`);
  await tl.wait(400);
  tl.showCaption(CAPTIONS.painted);
  await tl.wait(1600);

  // Zoom
  await tl.at(33500);
  tl.showCaption(CAPTIONS.zoom);
  await openToolbar(tl, "zoom", { ms: 800 });
  tl.showCaption(CAPTIONS.zoomPick);
  for (const z of ["50", "75"]) await hoverOption(tl, "zoom", z, { ms: 300 });
  await chooseOption(tl, "zoom", "75", { ms: 400 });
  await tl.wait(1400);
  tl.showCaption(CAPTIONS.zoomBack);
  await openToolbar(tl, "zoom", { ms: 700 });
  await chooseOption(tl, "zoom", "100", { ms: 500 });
  await tl.wait(1000);

  // Select tool
  await tl.at(43500);
  tl.showCaption(CAPTIONS.select);
  await clickTool(tl, "select", { ms: 800 });
  await tl.wait(700);

  // Image tool
  await tl.at(46000);
  tl.showCaption(CAPTIONS.image);
  await clickTool(tl, "image", { ms: 800 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.imagePick);
  await pressOn(tl, "[data-tl=img-pick-desk]", { ms: 800 });
  await tl.wait(400);
  await pressOn(tl, "[data-tl=img-insert]", { ms: 700 });
  await tl.wait(900);

  // Shape tool
  await tl.at(54500);
  tl.showCaption(CAPTIONS.shape);
  await openToolbar(tl, "shape", { ms: 800 });
  await chooseOption(tl, "shape", "star", { ms: 600 });
  await tl.wait(800);

  // Line tool
  await tl.at(59000);
  tl.showCaption(CAPTIONS.line);
  await clickTool(tl, "line", { ms: 800 });
  await tl.wait(900);

  // Print
  await tl.at(62000);
  tl.showCaption(CAPTIONS.print);
  await clickTool(tl, "print", { ms: 800 });
  await tl.wait(1500);
  tl.showCaption(CAPTIONS.printPanel);
  await pressOn(tl, "[data-tl=print-cancel]", { ms: 900 });
  tl.setVar("print", false);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);

  await tl.at(66800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP51_DURATION_MS);
}
