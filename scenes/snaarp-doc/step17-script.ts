import { clickPanel, COMMENTED_EDITOR, initEditor } from "@/components/docs/editor-timeline";
import { initComments, TWO_THREADS } from "@/components/docs/comments-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step17-data";

/** Snaarp Doc, step 17 - Use the Document outline. Times are active milliseconds from the start of the step. */
export const STEP17_DURATION_MS = 13000;

export async function runStep17(tl: Timeline) {
  initEditor(tl, COMMENTED_EDITOR);
  initComments(tl, TWO_THREADS, false); // the panel was closed at the end of step 16
  tl.placeCursor(0.92, 0.1); // where step 16 left the cursor (the X of the Comments panel)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // The round outline button in the corner of the canvas grows to "Tab 1"; click it: the panel slides in on the left
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await tl.moveCursorTo("[data-tl=outline-button]", { ms: 900 });
  tl.hover("[data-tl=outline-button]");
  await tl.wait(300);
  tl.highlight("[data-tl=outline-button]");
  await tl.wait(200);
  await tl.click("[data-tl=outline-button]");
  tl.clearHighlight();
  tl.hover(null);
  tl.setVar("outlineOpen", true);

  // The panel: Tab 1 and the hint
  await tl.at(3500);
  tl.showCaption(CAPTIONS.panel);
  tl.highlight("[data-tl=outline-panel-card]");
  await tl.at(6000);
  tl.clearHighlight();

  // The plus (hover only)
  tl.showCaption(CAPTIONS.add);
  await tl.moveCursorTo("[data-tl=outline-add]", { ms: 700 });
  tl.hover("[data-tl=outline-add]");
  tl.highlight("[data-tl=outline-add]");

  // The back arrow closes the panel; the page returns to the centre
  await tl.at(8500);
  tl.clearHighlight();
  tl.hover(null);
  tl.showCaption(CAPTIONS.close);
  await clickPanel(tl, "[data-tl=outline-close]", { ms: 700 });
  tl.setVar("outlineOpen", false);

  // Hold, then the quick white fade
  await tl.at(12600);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP17_DURATION_MS);
}
