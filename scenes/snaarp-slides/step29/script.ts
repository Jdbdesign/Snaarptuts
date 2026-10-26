import { beginEiv } from "../eiv";
import { chooseRow, openMenu, pressFullScreenArrow } from "@/components/slides/menu-timeline";
import { pressEscFromFullScreen } from "@/components/docs/view-menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 29 - Present in full screen. Starts in the editor on slide 2. */
export const STEP29_DURATION_MS = 26000;

export async function runStep29(tl: Timeline) {
  beginEiv(tl);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "view", { ms: 800 });
  tl.showCaption(CAPTIONS.row);
  await chooseRow(tl, "view", "fullscreen", { ms: 700 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.fill);
  await tl.wait(2800);

  // Arrow keys
  await tl.at(8500);
  tl.showCaption(CAPTIONS.next);
  await pressFullScreenArrow(tl, "next");
  await tl.wait(1500);
  tl.showCaption(CAPTIONS.previous);
  await pressFullScreenArrow(tl, "previous");
  await tl.wait(1300);

  // Esc
  await tl.at(16500);
  tl.showCaption(CAPTIONS.esc);
  await pressEscFromFullScreen(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);

  await tl.at(24500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP29_DURATION_MS);
}
