import { beginEiv } from "../eiv";
import { chooseSubRow, hoverRow, hoverSubRow, openMenu } from "@/components/slides/menu-timeline";
import { ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 28 - Change the zoom. Starts in the editor on slide 2 at 100%. */
export const STEP28_DURATION_MS = 31000;

export async function runStep28(tl: Timeline) {
  beginEiv(tl);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "view", { ms: 800 });
  await hoverRow(tl, "view", "zoom", { ms: 600 });
  await tl.wait(500);

  // The sizes
  tl.showCaption(CAPTIONS.sizes);
  for (const id of ["50", "75", "100", "125", "150", "200", "fit"]) {
    await hoverSubRow(tl, "view", id, { ms: id === "50" ? 500 : 280 });
    await tl.wait(260);
  }

  // 150%
  await tl.at(7500);
  tl.showCaption(CAPTIONS.pick);
  await chooseSubRow(tl, "view", "zoom", "150", { ms: 500 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.bigger);
  await tl.wait(1800);
  tl.showCaption(CAPTIONS.box);
  await ring(tl, "[data-tl=tool-zoom]", 1800);

  // Scroll across the zoomed-in slide
  await tl.at(14500);
  tl.showCaption(CAPTIONS.scroll);
  await Promise.all([tl.animateVar("canvasX", 0, 1, 2200), tl.animateVar("canvasY", 0, 1, 2200)]);
  await tl.wait(500);
  await Promise.all([tl.animateVar("canvasX", 1, 0, 1600), tl.animateVar("canvasY", 1, 0, 1600)]);

  // Back to Fit
  await tl.at(21500);
  tl.showCaption(CAPTIONS.fit);
  await openMenu(tl, "view", { ms: 800 });
  await chooseSubRow(tl, "view", "zoom", "fit", { ms: 500 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.fitted);
  await ring(tl, "[data-tl=tool-zoom]", 1800);

  await tl.at(29500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP28_DURATION_MS);
}
