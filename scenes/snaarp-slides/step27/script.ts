import { beginEiv } from "../eiv";
import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { EIV_SHAPE_ID } from "@/components/slides/slide-elements-data";
import { dragElementBy } from "@/components/slides/slides-edit";
import { ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 27 - Show guides. Starts in the editor on slide 2 with the guides off. */
export const STEP27_DURATION_MS = 27000;

export async function runStep27(tl: Timeline) {
  beginEiv(tl);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "view", { ms: 800 });
  tl.showCaption(CAPTIONS.row);
  await chooseRow(tl, "view", "guides", { ms: 700 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.guides);
  await ring(tl, "[data-tl=slide-guides]", 2200);

  // Drag the rectangle onto a guide
  await tl.at(8000);
  tl.showCaption(CAPTIONS.drag);
  await dragElementBy(tl, EIV_SHAPE_ID, -12, 12.2, 1800);
  tl.showCaption(CAPTIONS.snap);
  await tl.wait(1800);

  // Hide the guides
  await tl.at(16500);
  tl.showCaption(CAPTIONS.again);
  await openMenu(tl, "view", { ms: 800 });
  await tl.wait(500);
  await chooseRow(tl, "view", "guides", { ms: 700 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.done);

  await tl.at(25500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP27_DURATION_MS);
}
