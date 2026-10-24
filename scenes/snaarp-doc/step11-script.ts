import {
  chooseEditMenuItem,
  clickEditMenu,
  clickEndOfBlock,
  closeEditMenu,
  dragSelectBlock,
  hoverEditMenuItem,
  initEditor,
  SAMPLE_EDITOR,
} from "@/components/docs/editor-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, COPY_FROM, PASTE_AFTER, URLS } from "./step11-data";

/** Snaarp Doc, step 11 - Copy and paste text. Times are active milliseconds from the start of the step. */
export const STEP11_DURATION_MS = 24000;

export async function runStep11(tl: Timeline) {
  const narrow = window.matchMedia("(max-width: 899px)").matches;

  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // where step 10 left the cursor (middle of the page)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Select a paragraph by dragging: the blue highlight and the floating toolbar appear
  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await dragSelectBlock(tl, COPY_FROM);

  // Edit > Copy (Cut and Copy are active now); the selection stays
  await tl.at(4000);
  tl.showCaption(CAPTIONS.copy);
  await clickEditMenu(tl, { ms: 600 });
  await chooseEditMenuItem(tl, "copy", { ms: 450 });

  // Cut: only mentioned
  await tl.at(7000);
  tl.showCaption(CAPTIONS.cut);

  // Click at the end of the last paragraph: the selection clears, the caret blinks
  await tl.at(8500);
  tl.showCaption(CAPTIONS.where);
  await clickEndOfBlock(tl, PASTE_AFTER);

  // Edit > Paste
  await tl.at(11000);
  tl.showCaption(CAPTIONS.paste);
  await clickEditMenu(tl, { ms: 500 });
  await chooseEditMenuItem(tl, "paste", { ms: 400 });

  // The copy appears as a new paragraph; the status shows Unsaved changes, then All changes saved
  await tl.at(12500);
  tl.showCaption(CAPTIONS.pasted);

  // Paste without formatting: hover only
  await tl.at(16000);
  tl.showCaption(CAPTIONS.plain);
  await clickEditMenu(tl, { ms: 600 });
  await hoverEditMenuItem(tl, "paste-plain", { ms: 450 });
  tl.highlight("[data-tl=edit-item-paste-plain]");
  await tl.wait(1200);
  tl.clearHighlight();
  tl.hover(null);
  await tl.moveCursorTo("[data-tl=editor-canvas]", { ms: 450, dx: narrow ? 0 : -330, dy: 120 });
  await tl.click("[data-tl=editor-canvas]");
  closeEditMenu(tl);

  // Hold, then the quick white fade
  await tl.at(23600);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP11_DURATION_MS);
}
