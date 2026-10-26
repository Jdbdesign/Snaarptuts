import { beginEiv } from "../eiv";
import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { resizeElementBy } from "@/components/slides/slides-edit";
import { pressOn, ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 31 - Insert an image. Starts in the editor on slide 2. */
export const STEP31_DURATION_MS = 28000;

export async function runStep31(tl: Timeline) {
  beginEiv(tl);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  tl.showCaption(CAPTIONS.row);
  await chooseRow(tl, "insert", "image", { ms: 700 });
  await tl.wait(700);

  // The picker
  await tl.at(5000);
  tl.showCaption(CAPTIONS.picker);
  await ring(tl, "[data-tl=insert-image-dialog]", 1500);
  tl.showCaption(CAPTIONS.pick);
  await pressOn(tl, "[data-tl=img-pick-desk]", { ms: 900 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.insert);
  await pressOn(tl, "[data-tl=img-insert]", { ms: 800 });
  await tl.wait(600);

  // It lands with handles; resize it
  await tl.at(13000);
  tl.showCaption(CAPTIONS.landed);
  await tl.wait(2200);
  tl.showCaption(CAPTIONS.resize);
  await resizeElementBy(tl, "image-1", -6, 1500);
  await tl.wait(400);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=el-image-1]", 1800);

  await tl.at(26500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP31_DURATION_MS);
}
