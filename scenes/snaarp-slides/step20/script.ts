import { beginEiv, clickBlank } from "../eiv";
import { chooseRow, hoverRow, openMenu } from "@/components/slides/menu-timeline";
import { beginTextEdit, endTextEdit } from "@/components/slides/slides-edit";
import { TYPED, EIV_BULLETS_ID } from "@/components/slides/slide-elements-data";
import { pressOn, ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 20 - Undo and redo. Starts in the editor on slide 2. */
export const STEP20_DURATION_MS = 26000;

export async function runStep20(tl: Timeline) {
  beginEiv(tl);

  // Type a line into the bullet list
  await tl.at(800);
  tl.showCaption(CAPTIONS.click);
  await pressOn(tl, `[data-tl=el-${EIV_BULLETS_ID}]`, { ms: 900 });
  beginTextEdit(tl, { id: EIV_BULLETS_ID, mode: "append" });
  await tl.wait(250);
  tl.showCaption(CAPTIONS.type);
  await tl.typeText("slideText", TYPED.undoLine, { msPerChar: 55 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await clickBlank(tl);
  endTextEdit(tl);

  // Edit > Undo
  await tl.at(7000);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 800 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.hints);
  tl.highlight("[data-tl=edit-group-0]");
  await hoverRow(tl, "edit", "undo", { ms: 500 });
  await tl.wait(700);
  await hoverRow(tl, "edit", "redo", { ms: 350 });
  await tl.wait(700);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.undo);
  await chooseRow(tl, "edit", "undo", { ms: 500 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.gone);
  await ring(tl, `[data-tl=el-${EIV_BULLETS_ID}]`, 1500);

  // Edit > Redo
  await tl.at(16500);
  tl.showCaption(CAPTIONS.again);
  await openMenu(tl, "edit", { ms: 700 });
  await chooseRow(tl, "edit", "redo", { ms: 600 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.back);
  await ring(tl, `[data-tl=el-${EIV_BULLETS_ID}]`, 1800);

  await tl.at(24500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP20_DURATION_MS);
}
