import { closeDialog, openDialog } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 2 - Start a blank presentation. Starts on the home; ends in the editor with a blank first slide. */
export const STEP2_DURATION_MS = 21000;

export async function runStep2(tl: Timeline) {
  begin(tl, URLS.home, [0.25, 0.2]);

  // Click Blank
  await tl.at(800);
  tl.showCaption(CAPTIONS.blank);
  await tl.moveCursorTo("[data-tl=blank-card]", { ms: 900 });
  tl.hover("[data-tl=blank-card]");
  tl.highlight("[data-tl=blank-card]");
  await tl.wait(250);
  await tl.click("[data-tl=blank-card]");
  tl.clearHighlight();
  tl.hover(null);

  // Loading screen
  await tl.at(2600);
  tl.setVar("stage", "loading");
  tl.setUrl(URLS.untitled);
  tl.showCaption(CAPTIONS.opening);

  // The editor with the chooser on top
  await tl.at(5200);
  tl.setVar("stage", "editor");
  openDialog(tl, "start");
  tl.showCaption(CAPTIONS.chooser);
  tl.placeCursor(0.45, 0.4);

  await tl.at(7500);
  tl.showCaption(CAPTIONS.templates);
  await tl.moveCursorTo("[data-tl=start-card-templates]", { ms: 800 });
  tl.hover("[data-tl=start-card-templates]");
  await tl.wait(900);
  await tl.moveCursorTo("[data-tl=start-card-import]", { ms: 500 });
  tl.hover("[data-tl=start-card-import]");

  // Choose Blank slide
  await tl.at(11000);
  tl.showCaption(CAPTIONS.pick);
  await tl.moveCursorTo("[data-tl=start-card-blank]", { ms: 600 });
  tl.hover("[data-tl=start-card-blank]");
  tl.highlight("[data-tl=start-card-blank]");
  await tl.wait(300);
  await tl.click("[data-tl=start-card-blank]");
  tl.clearHighlight();
  tl.hover(null);
  closeDialog(tl);

  // A first, empty slide
  await tl.at(13500);
  tl.showCaption(CAPTIONS.ready);
  await tl.moveCursorTo("[data-tl=canvas-slide]", { ms: 800 });
  tl.highlight("[data-tl=canvas-slide]");
  await tl.at(16500);
  tl.clearHighlight();
  tl.highlight("[data-tl=slide-panel]");
  await tl.at(18700);
  tl.clearHighlight();

  // Quick white fade
  await tl.at(19800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP2_DURATION_MS);
}
