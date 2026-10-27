import { ROTATE_DECK, ROTATE_ID } from "@/components/slides/slide-elements-data";
import { chooseRow, closeMenu, hoverRow, openMenu } from "@/components/slides/menu-timeline";
import { pressOn } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 47 - Rotate objects. Starts on slide 2 with a title and one arrow. */
export const STEP47_DURATION_MS = 36000;

export async function runStep47(tl: Timeline) {
  beginEiv(tl, [0.55, 0.55], ROTATE_DECK);

  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await pressOn(tl, `[data-tl=el-${ROTATE_ID}]`, { ms: 900 });
  await tl.wait(500);

  // The two rotate rows
  await tl.at(3500);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "arrange", { ms: 750 });
  tl.showCaption(CAPTIONS.rows);
  await hoverRow(tl, "arrange", "rotcw", { ms: 550 });
  await hoverRow(tl, "arrange", "rotccw", { ms: 350 });
  await tl.wait(300);
  closeMenu(tl);

  const turn = async (id: "rotcw" | "rotccw", caption: string, openMs = 650) => {
    await openMenu(tl, "arrange", { ms: openMs });
    tl.showCaption(caption);
    await chooseRow(tl, "arrange", id, { ms: 450 });
    await tl.wait(1400);
  };

  await tl.at(8500);
  await turn("rotcw", CAPTIONS.cw1);
  await tl.at(12500);
  await turn("rotcw", CAPTIONS.cw2);
  await tl.at(16500);
  await turn("rotccw", CAPTIONS.ccw1);
  await tl.at(20500);
  await turn("rotccw", CAPTIONS.ccw2);
  await tl.at(24500);
  await turn("rotccw", CAPTIONS.ccw3);

  await tl.at(30000);
  tl.showCaption(CAPTIONS.done);
  await tl.at(34500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP47_DURATION_MS);
}
