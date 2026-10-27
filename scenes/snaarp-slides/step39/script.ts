import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { BACKGROUNDS } from "@/components/slides/slides-toolbar-data";
import { ring } from "@/components/slides/slides-timeline";
import { chooseOption, hoverOption, openToolbar } from "@/components/slides/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 39 - Change the slide background. Starts in the editor on slide 2. */
export const STEP39_DURATION_MS = 30000;

export async function runStep39(tl: Timeline) {
  beginEiv(tl);

  // Format > Slide background
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "format", { ms: 800 });
  await chooseRow(tl, "format", "background", { ms: 600 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.navy);
  await chooseOption(tl, "background", "navy", { ms: 700 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.only);
  await ring(tl, "[data-tl=slide-panel]", 2600);

  // The toolbar Background button
  await tl.at(11500);
  tl.showCaption(CAPTIONS.toolbar);
  await openToolbar(tl, "background", { ms: 800 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.hover);
  for (const b of BACKGROUNDS) await hoverOption(tl, "background", b.id, { ms: 260 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.purple);
  await chooseOption(tl, "background", "purple", { ms: 700 });
  await tl.wait(1800);
  tl.showCaption(CAPTIONS.done);

  await tl.at(28500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP39_DURATION_MS);
}
