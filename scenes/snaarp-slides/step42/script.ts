import { pressEscFromFullScreen } from "@/components/docs/view-menu-timeline";
import { chooseRow, closeMenu, hoverRow, openMenu, pressFullScreenArrow } from "@/components/slides/menu-timeline";
import { pressOn, ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 42 - Skip a slide. Starts in the editor on slide 2. */
export const STEP42_DURATION_MS = 40000;

export async function runStep42(tl: Timeline) {
  beginEiv(tl);

  // Skip slide 2
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "slide", { ms: 800 });
  await chooseRow(tl, "slide", "skip", { ms: 600 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.skipped);
  await ring(tl, "[data-tl=thumb-2]", 2800);

  // The label changes
  await tl.at(8000);
  tl.showCaption(CAPTIONS.label);
  await openMenu(tl, "slide", { ms: 700 });
  await hoverRow(tl, "slide", "skip", { ms: 450 });
  await ring(tl, "[data-tl=slide-item-skip]", 1500);
  closeMenu(tl);

  // The slideshow leaves it out
  await tl.at(13500);
  tl.showCaption(CAPTIONS.first);
  await pressOn(tl, "[data-tl=thumb-1]", { ms: 800 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.fullscreen);
  await openMenu(tl, "view", { ms: 700 });
  await chooseRow(tl, "view", "fullscreen", { ms: 600 });
  await tl.wait(2200);
  tl.showCaption(CAPTIONS.next);
  await pressFullScreenArrow(tl, "next");
  tl.showCaption(CAPTIONS.jumps);
  await tl.wait(2800);
  tl.showCaption(CAPTIONS.esc);
  await pressEscFromFullScreen(tl);
  await tl.wait(600);

  // Unskip
  await tl.at(31000);
  tl.showCaption(CAPTIONS.back);
  await pressOn(tl, "[data-tl=thumb-2]", { ms: 800, ring: false });
  await openMenu(tl, "slide", { ms: 650 });
  await chooseRow(tl, "slide", "skip", { ms: 500 });
  await tl.wait(1200);
  tl.showCaption(CAPTIONS.done);

  await tl.at(38500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP42_DURATION_MS);
}
