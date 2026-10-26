import { initEditor } from "@/components/docs/editor-timeline";
import { initToolbar, pointAt, pressButton } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, START_EDITOR, URLS } from "./step62-data";

/** Snaarp Doc, step 62 - Check version history. Times are active milliseconds from the start of the step. */
export const STEP62_DURATION_MS = 24000;

export async function runStep62(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.setVar("screen", "editor");
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // The clock button
  await tl.at(800);
  tl.showCaption(CAPTIONS.button);
  await pointAt(tl, "header-history", { tipMs: 1000 });
  await pressButton(tl, "header-history");
  tl.setVar("screen", "history");
  tl.setUrl(URLS.history);

  // The list
  await tl.at(5000);
  tl.showCaption(CAPTIONS.panel);
  tl.highlight("[data-tl=vh-list]");
  await tl.at(8500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.hover);
  for (const n of [2, 3]) {
    await tl.moveCursorTo(`[data-tl=vh-version-${n}]`, { ms: 600, dx: -20 });
    tl.hover(`[data-tl=vh-version-${n}]`);
    await tl.wait(600);
  }
  tl.hover(null);

  // Show changes
  await tl.at(13000);
  tl.showCaption(CAPTIONS.changes);
  await tl.moveCursorTo("[data-tl=vh-show-changes]", { ms: 800 });
  tl.highlight("[data-tl=vh-show-changes]");

  // Back to the document
  await tl.at(17000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.back);
  await tl.moveCursorTo("[data-tl=vh-back]", { ms: 800 });
  tl.highlight("[data-tl=vh-back]");
  await tl.wait(200);
  await tl.click("[data-tl=vh-back]");
  tl.clearHighlight();
  tl.setVar("screen", "editor");
  tl.setUrl(URLS.editor);

  await tl.at(21000);
  tl.hideCaption();
  await tl.at(23600);
  tl.setVar("fade", true);
  await tl.at(STEP62_DURATION_MS);
}
