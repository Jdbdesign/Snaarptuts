import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { chooseInsertItem, clickInsertMenu } from "@/components/docs/insert-menu-timeline";
import { addBookmark, clickStartOfBlock } from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, NAME, SPOT, URLS } from "./step24-data";

/** Snaarp Doc, step 24 - Add a bookmark. Times are active milliseconds from the start of the step. */
export const STEP24_DURATION_MS = 20000;

export async function runStep24(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Click at the start of the paragraph under "Goals"
  await tl.at(800);
  tl.showCaption(CAPTIONS.click);
  await clickStartOfBlock(tl, SPOT);

  // Insert > Bookmark: the dialog opens with the name input focused
  await tl.at(2500);
  tl.showCaption(CAPTIONS.insert);
  await clickInsertMenu(tl);
  await chooseInsertItem(tl, "bookmark");

  // Type the name
  await tl.at(5500);
  tl.showCaption(CAPTIONS.name);
  await tl.typeText("bookmark-name", NAME, { msPerChar: 100 });

  // OK: the dialog closes, the marker appears and the toast says "Bookmark added"
  await tl.at(9500);
  tl.showCaption(CAPTIONS.ok);
  await tl.moveCursorTo("[data-tl=bookmark-ok]", { ms: 800 });
  tl.highlight("[data-tl=bookmark-ok]");
  await tl.wait(200);
  await tl.click("[data-tl=bookmark-ok]");
  tl.clearHighlight();
  addBookmark(tl, NAME);

  // The marker
  await tl.at(13000);
  tl.showCaption(CAPTIONS.marker);
  tl.highlight("[data-tl^=doc-bookmark-]");

  // Hold, then the quick white fade
  await tl.at(17000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(19600);
  tl.setVar("fade", true);
  await tl.at(STEP24_DURATION_MS);
}
