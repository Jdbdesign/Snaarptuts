import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { undoDelete } from "@/components/slides/slides-format";
import { ring } from "@/components/slides/slides-timeline";
import { SLIDE_COPY } from "@/components/slides/slides-toolbar-data";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 43 - Delete a slide. Starts in the editor on slide 2. */
export const STEP43_DURATION_MS = 26000;

export async function runStep43(tl: Timeline) {
  beginEiv(tl);

  // Delete slide 2
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "slide", { ms: 800 });
  await chooseRow(tl, "slide", "delete", { ms: 700 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.gone);
  await ring(tl, "[data-tl=slide-panel]", 2400);
  tl.showCaption(CAPTIONS.toast);
  await tl.wait(1200);

  // Undo from the toast
  await tl.at(9000);
  tl.showCaption(CAPTIONS.undo);
  await tl.moveCursorTo("[data-tl=toast-action]", { ms: 900 });
  tl.hover("[data-tl=toast-action]");
  tl.highlight("[data-tl=toast-action]");
  await tl.wait(250);
  await tl.click("[data-tl=toast-action]");
  tl.clearHighlight();
  tl.hover(null);
  undoDelete(tl);
  showDocToast(tl, SLIDE_COPY.restoredToast, "success", 2600);
  await tl.wait(600);
  tl.showCaption(CAPTIONS.back);
  await ring(tl, "[data-tl=thumb-2]", 2600);

  await tl.at(23500);
  tl.showCaption(CAPTIONS.done);
  await tl.at(24500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP43_DURATION_MS);
}
