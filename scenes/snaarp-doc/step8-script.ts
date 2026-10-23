import { chooseFileMenuItem, clickFileMenu } from "@/components/docs/file-menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step8-data";

/** Snaarp Doc, step 8 - Check version history. Times are active milliseconds from the start of the step. */
export const STEP8_DURATION_MS = 11400;

export async function runStep8(tl: Timeline) {
  tl.placeCursor(0.5, 0.45); // where step 7 left the cursor (middle of the page)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // File > Version history
  await tl.at(800);
  tl.showCaption(CAPTIONS.fileHistory);
  await clickFileMenu(tl, { ms: 650 });
  await chooseFileMenuItem(tl, "history", { ms: 450 });

  // The Version history page (quick fade)
  await tl.at(3000);
  tl.setVar("screen", "history");
  tl.setUrl(URLS.history);
  tl.showCaption(CAPTIONS.panel);
  tl.highlight("[data-tl=vh-panel]");

  await tl.at(5500);
  tl.showCaption(CAPTIONS.none);

  // Back to the document
  await tl.at(7500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.back);
  await tl.moveCursorTo("[data-tl=vh-back]", { ms: 700 });
  tl.highlight("[data-tl=vh-back]");
  await tl.wait(200);
  await tl.click("[data-tl=vh-back]");
  tl.clearHighlight();
  tl.setVar("screen", "editor");
  tl.setUrl(URLS.editor);

  // Quick white fade
  await tl.at(11000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP8_DURATION_MS);
}
