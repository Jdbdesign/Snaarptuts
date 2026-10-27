import { chooseRow, closeMenu, hoverRow, openMenu } from "@/components/slides/menu-timeline";
import { ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 40 - Add a new slide. Starts in the editor on slide 2. */
export const STEP40_DURATION_MS = 25000;

export async function runStep40(tl: Timeline) {
  beginEiv(tl);

  // The Slide menu
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "slide", { ms: 800 });
  tl.showCaption(CAPTIONS.rows);
  for (const id of ["new", "duplicate", "delete", "skip"]) await hoverRow(tl, "slide", id, { ms: 450 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.soon);
  await hoverRow(tl, "slide", "layout", { ms: 500, tip: true });
  await tl.wait(1000);
  await hoverRow(tl, "slide", "transition", { ms: 350, tip: true });
  await tl.wait(1000);

  // New slide
  await tl.at(10500);
  tl.showCaption(CAPTIONS.pick);
  await chooseRow(tl, "slide", "new", { ms: 700 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.landed);
  await ring(tl, "[data-tl=thumb-3]", 2400);
  tl.showCaption(CAPTIONS.ready);
  await ring(tl, "[data-tl=canvas-slide]", 2400);

  await tl.at(22800);
  tl.showCaption(CAPTIONS.done);
  closeMenu(tl);
  await tl.at(23800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP40_DURATION_MS);
}
