import { beginEiv, clickBlank } from "../eiv";
import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { pressOn, ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 33 - Draw a line. Starts in the editor on slide 2. */
export const STEP33_DURATION_MS = 23000;

export async function runStep33(tl: Timeline) {
  beginEiv(tl);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  tl.showCaption(CAPTIONS.row);
  await chooseRow(tl, "insert", "line", { ms: 700 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.landed);
  await ring(tl, "[data-tl^=el-line-]", 1800);
  tl.showCaption(CAPTIONS.handles);
  await tl.wait(1800);

  await tl.at(10500);
  tl.showCaption(CAPTIONS.clear);
  await clickBlank(tl);
  await tl.wait(1200);
  tl.showCaption(CAPTIONS.again);
  await pressOn(tl, "[data-tl^=el-line-]", { ms: 900, ring: false });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.done);
  await tl.wait(1800);

  await tl.at(21500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP33_DURATION_MS);
}
