import type { Timeline } from "@/lib/timeline";
import { redoOp, undoOp } from "@/components/sheets/edit-timeline";
import { beginTb, hoverTool, pressTool, typeNumber } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, EDIT87 } from "./data";

/** Snaarp Sheets, step 87 - Undo and Redo: type a new cost, undo it, redo it. Starts with D3 selected. */
export const STEP87_DURATION_MS = 25200;

export async function runStep87(tl: Timeline) {
  beginTb(tl, EDIT87.ref);

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await hoverTool(tl, "undo", { hold: 1800 });
  tl.showCaption(CAPTIONS.redo);
  await hoverTool(tl, "redo", { hold: 1800 });

  tl.showCaption(CAPTIONS.edit);
  tl.setVar("tbTip", "");
  await typeNumber(tl, EDIT87.ref, EDIT87.value);
  tl.showCaption(CAPTIONS.changed);
  await ring(tl, "[data-tl=cell-d10]", 1800);

  tl.showCaption(CAPTIONS.undo);
  await hoverTool(tl, "undo", { hold: 1200 });
  await pressTool(tl, "undo", { ms: 250 });
  undoOp(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.undone);
  await ring(tl, "[data-tl=cell-d3]", 1800);

  tl.showCaption(CAPTIONS.redoClick);
  await hoverTool(tl, "redo", { hold: 1200 });
  await pressTool(tl, "redo", { ms: 250 });
  redoOp(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.redone);
  await ring(tl, "[data-tl=cell-d3]", 1800);
  await finish(tl, 600);
}
