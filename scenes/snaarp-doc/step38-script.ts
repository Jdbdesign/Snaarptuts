import { initEditor } from "@/components/docs/editor-timeline";
import { chooseFormatItem, clickFormatMenu, dragSelectBlocks, initFormatMenu } from "@/components/docs/format-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, PRACTICE_ID, START_EDITOR, URLS } from "./step38-data";

/** Snaarp Doc, step 38 - Clear formatting. Times are active milliseconds from the start of the step. */
export const STEP38_DURATION_MS = 22000;

export async function runStep38(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initFormatMenu(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Select the whole paragraph (a light blue, so its colours show through)
  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await dragSelectBlocks(tl, [PRACTICE_ID], { soft: true, dragMs: 1800 });

  // Point out the styling
  await tl.at(4000);
  tl.showCaption(CAPTIONS.styled);
  tl.highlight(`[data-tl=doc-block-${PRACTICE_ID}]`);

  // Format > Clear formatting
  await tl.at(7000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.clear);
  await clickFormatMenu(tl);
  await chooseFormatItem(tl, "clear");

  // The words stay as plain text
  await tl.at(11000);
  tl.showCaption(CAPTIONS.stay);
  tl.highlight(`[data-tl=doc-block-${PRACTICE_ID}]`);

  // The shortcut (the cursor only hovers the toolbar area)
  await tl.at(15000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.shortcut);
  await tl.moveCursorTo("[data-tl=editor-toolbar]", { ms: 900, dx: -200 });

  // Hold, then the quick white fade
  await tl.at(18000);
  tl.hideCaption();
  await tl.at(21600);
  tl.setVar("fade", true);
  await tl.at(STEP38_DURATION_MS);
}
