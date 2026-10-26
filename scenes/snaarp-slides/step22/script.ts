import { beginEiv } from "../eiv";
import { chooseRow, closeMenu, hoverRow, openMenu } from "@/components/slides/menu-timeline";
import { EIV_SHAPE_ID } from "@/components/slides/slide-elements-data";
import { setSel } from "@/components/slides/slides-edit";
import { pressOn, ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 22 - Cut, copy and paste. Starts in the editor on slide 2 with nothing selected. */
export const STEP22_DURATION_MS = 41000;

export async function runStep22(tl: Timeline) {
  beginEiv(tl);

  // Nothing selected: Cut, Copy and Paste are greyed out
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 800 });
  await tl.at(2800);
  tl.showCaption(CAPTIONS.greyed);
  await hoverRow(tl, "edit", "cut", { ms: 700 });
  await tl.wait(650);
  await hoverRow(tl, "edit", "copy", { ms: 300 });
  await tl.wait(650);
  await hoverRow(tl, "edit", "paste", { ms: 300 });
  await tl.wait(700);
  closeMenu(tl);

  // Select the rectangle, then Copy
  await tl.at(7500);
  tl.showCaption(CAPTIONS.select);
  await pressOn(tl, `[data-tl=el-${EIV_SHAPE_ID}]`, { ms: 900 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.copy);
  await openMenu(tl, "edit", { ms: 800 });
  await chooseRow(tl, "edit", "copy", { ms: 600 });

  // Paste: a second rectangle appears, offset
  await tl.at(13500);
  tl.showCaption(CAPTIONS.paste);
  await openMenu(tl, "edit", { ms: 800 });
  await chooseRow(tl, "edit", "paste", { ms: 600 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.pasted);
  await tl.wait(2200);

  // Cut the copy
  await tl.at(20000);
  tl.showCaption(CAPTIONS.cut);
  await openMenu(tl, "edit", { ms: 800 });
  await chooseRow(tl, "edit", "cut", { ms: 600 });
  await tl.wait(800);

  // Paste it on slide 3
  await tl.at(25500);
  tl.showCaption(CAPTIONS.slide3);
  await pressOn(tl, "[data-tl=thumb-3]", { ms: 900 });
  tl.setVar("selected", 2);
  setSel(tl, []);
  await tl.wait(600);
  tl.showCaption(CAPTIONS.paste3);
  await openMenu(tl, "edit", { ms: 800 });
  await chooseRow(tl, "edit", "paste", { ms: 600 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl^=el-shapec]", 2200);

  await tl.at(39500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP22_DURATION_MS);
}
