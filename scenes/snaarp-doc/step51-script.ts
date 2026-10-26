import { clickEndOfBlock, initEditor } from "@/components/docs/editor-timeline";
import { dragSelectText } from "@/components/docs/format-timeline";
import { setFormatValue } from "@/components/docs/format-state";
import { chooseRow, edit, initToolbar, openMenu } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, COLOR, HIGHLIGHT, PICK, PRACTICE_ID, START_EDITOR, TARGETS, URLS } from "./step51-data";

/** Snaarp Doc, step 51 - Text color and highlight. Times are active milliseconds from the start of the step. */
export const STEP51_DURATION_MS = 30000;

export async function runStep51(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Text color: select a word, open the palette, pick red
  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await dragSelectText(tl, PRACTICE_ID, TARGETS.color, { dragMs: 700 });
  await tl.at(3000);
  tl.showCaption(CAPTIONS.palette);
  await openMenu(tl, "color", "tool-color", { tipMs: 900 });
  await tl.at(6000);
  tl.showCaption(CAPTIONS.red);
  await chooseRow(tl, `tm-color-${PICK.color.row}-${PICK.color.col}`, () => {
    edit(tl, (s) => setFormatValue(s, "color", COLOR));
    tl.setVar("lastColor", COLOR);
  });

  // Highlight color: select the phrase, open the palette, pick yellow
  await tl.at(10000);
  tl.showCaption(CAPTIONS.selectPhrase);
  await dragSelectText(tl, PRACTICE_ID, TARGETS.highlight, { dragMs: 900 });
  await tl.at(13500);
  tl.showCaption(CAPTIONS.highlight);
  await openMenu(tl, "highlight", "tool-highlight", { tipMs: 900 });
  await tl.at(17000);
  tl.showCaption(CAPTIONS.yellow);
  await chooseRow(tl, `tm-highlight-${PICK.highlight.row}-${PICK.highlight.col}`, () => {
    edit(tl, (s) => setFormatValue(s, "highlight", HIGHLIGHT));
    tl.setVar("lastHighlight", HIGHLIGHT);
  });

  // Click away to see both
  await tl.at(21500);
  await clickEndOfBlock(tl, PRACTICE_ID);
  tl.showCaption(CAPTIONS.done);
  tl.highlight(`[data-tl=doc-block-${PRACTICE_ID}]`);
  await tl.at(26000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(29600);
  tl.setVar("fade", true);
  await tl.at(STEP51_DURATION_MS);
}
