import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { pressOn, ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 41 - Duplicate a slide. Starts in the editor on slide 2. */
export const STEP41_DURATION_MS = 22000;

export async function runStep41(tl: Timeline) {
  beginEiv(tl);

  // The slide to copy is already on screen: ring its thumbnail
  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await ring(tl, "[data-tl=thumb-2]", 1800);

  await tl.at(3200);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "slide", { ms: 800 });
  tl.showCaption(CAPTIONS.pick);
  await chooseRow(tl, "slide", "duplicate", { ms: 700 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.landed);
  await ring(tl, "[data-tl=thumb-3]", 2400);
  tl.showCaption(CAPTIONS.both);
  await ring(tl, "[data-tl=canvas-slide]", 2200);

  // The original is still there
  await tl.at(13500);
  tl.showCaption(CAPTIONS.original);
  await pressOn(tl, "[data-tl=thumb-2]", { ms: 800, ring: false });
  await ring(tl, "[data-tl=thumb-2]", 2000);

  await tl.at(19500);
  tl.showCaption(CAPTIONS.done);
  await tl.at(20800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP41_DURATION_MS);
}
