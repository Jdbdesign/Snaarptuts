import { beginEiv } from "../eiv";
import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { sweepTo } from "@/components/slides/slides-edit";
import { ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 26 - Show the ruler. Starts in the editor on slide 2 with the rulers off. */
export const STEP26_DURATION_MS = 25000;

export async function runStep26(tl: Timeline) {
  beginEiv(tl);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "view", { ms: 800 });
  tl.showCaption(CAPTIONS.row);
  await chooseRow(tl, "view", "ruler", { ms: 700 });
  await tl.wait(500);

  await tl.at(5500);
  tl.showCaption(CAPTIONS.rulers);
  await ring(tl, "[data-tl=ruler-top]", 1000);
  await ring(tl, "[data-tl=ruler-left]", 1000);

  // The tick under the cursor
  await tl.at(8500);
  tl.showCaption(CAPTIONS.tick);
  await sweepTo(tl, 18, 10, 1100);
  await sweepTo(tl, 52, 26, 1500);
  await sweepTo(tl, 86, 44, 1500);
  await sweepTo(tl, 30, 48, 1500);
  tl.setVar("marker", null);
  tl.setVar("rulerMark", null);

  // Hide them again
  await tl.at(16500);
  tl.showCaption(CAPTIONS.again);
  await openMenu(tl, "view", { ms: 800 });
  await tl.wait(500);
  await chooseRow(tl, "view", "ruler", { ms: 700 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.done);

  await tl.at(23500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP26_DURATION_MS);
}
