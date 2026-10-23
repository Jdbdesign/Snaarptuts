import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step2-data";

/** Snaarp Doc, step 2 - Create a blank document. Times are active milliseconds from the start of the step. */
export const STEP2_DURATION_MS = 10400;

export async function runStep2(tl: Timeline) {
  tl.placeCursor(0.2, 0.15); // roughly where step 1 left the cursor (the sidebar)
  tl.setUrl(URLS.documents);
  tl.setVar("intro", 1); // the Documents home fades in

  // Click Blank document
  await tl.at(800);
  tl.showCaption(CAPTIONS.blank);
  await tl.moveCursorTo("[data-tl=blank-card]", { ms: 800 });
  tl.hover("[data-tl=blank-card]");
  tl.highlight("[data-tl=blank-card]");
  await tl.wait(200);
  await tl.click("[data-tl=blank-card]");
  tl.clearHighlight();
  tl.hover(null);

  // Loading state
  await tl.at(2500);
  tl.setVar("stage", "loading");
  tl.setUrl(URLS.editor);
  tl.showCaption(CAPTIONS.opening);

  // The editor
  await tl.at(5500);
  tl.setVar("stage", "editor");
  tl.showCaption(CAPTIONS.ready);

  // A soft ring around the page, then around the toolbar
  await tl.at(7000);
  tl.highlight("[data-tl=editor-page]");
  await tl.wait(1200);
  tl.clearHighlight();
  tl.highlight("[data-tl=editor-toolbar]");
  await tl.at(9000);
  tl.clearHighlight();

  // Cursor rests in the middle of the page
  await tl.moveCursorTo("[data-tl=editor-canvas]", { ms: 700 });

  // Quick white fade
  await tl.at(10000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP2_DURATION_MS);
}
