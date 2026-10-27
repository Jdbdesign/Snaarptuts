import { ALIGN_DECK, ALIGN_ID } from "@/components/slides/slide-elements-data";
import { chooseSubRow, closeMenu, hoverRow, hoverSubRow, openMenu } from "@/components/slides/menu-timeline";
import { pressOn } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 45 - Align objects. Starts on slide 2 with a title and one circle. */
export const STEP45_DURATION_MS = 46000;

export async function runStep45(tl: Timeline) {
  beginEiv(tl, [0.55, 0.55], ALIGN_DECK);

  // Select the circle, then look at the horizontal rows
  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await pressOn(tl, `[data-tl=el-${ALIGN_ID}]`, { ms: 900 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "arrange", { ms: 750 });
  await hoverRow(tl, "arrange", "alignh", { ms: 600 });
  tl.showCaption(CAPTIONS.rowsH);
  for (const id of ["left", "center", "right"]) await hoverSubRow(tl, "arrange", id, { ms: 320 });
  closeMenu(tl);

  const run = async (sub: "alignh" | "alignv", id: string, caption: string, openMs = 650) => {
    await openMenu(tl, "arrange", { ms: openMs });
    tl.showCaption(caption);
    await chooseSubRow(tl, "arrange", sub, id, { ms: 450 });
    await tl.wait(1500);
  };

  // Horizontal: Left, Center, Right
  await tl.at(9500);
  await run("alignh", "left", CAPTIONS.left);
  await tl.at(13500);
  await run("alignh", "center", CAPTIONS.center);
  await tl.at(17500);
  await run("alignh", "right", CAPTIONS.right);

  // Vertical: Top, Middle, Bottom (the circle is at the right edge now, clear of the title)
  await tl.at(21500);
  tl.showCaption(CAPTIONS.openV);
  await openMenu(tl, "arrange", { ms: 650 });
  await hoverRow(tl, "arrange", "alignv", { ms: 600 });
  tl.showCaption(CAPTIONS.rowsV);
  for (const id of ["top", "middle", "bottom"]) await hoverSubRow(tl, "arrange", id, { ms: 320 });
  closeMenu(tl);
  await tl.at(27500);
  await run("alignv", "top", CAPTIONS.top);
  await tl.at(31500);
  await run("alignv", "middle", CAPTIONS.middle);
  await tl.at(35500);
  await run("alignv", "bottom", CAPTIONS.bottom);

  await tl.at(40000);
  tl.showCaption(CAPTIONS.done);
  await tl.at(44500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP45_DURATION_MS);
}
