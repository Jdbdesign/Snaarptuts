import { clickEndOfBlock, initEditor } from "@/components/docs/editor-timeline";
import { chooseFormatSub, clickFormatMenu, dragSelectText, initFormatMenu } from "@/components/docs/format-timeline";
import type { FormatSubItemId } from "@/components/docs/format-menu-data";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, PRACTICE_ID, START_EDITOR, TARGETS, URLS } from "./step32-data";

/** Snaarp Doc, step 32 - Format your text. Times are active milliseconds from the start of the step. */
export const STEP32_DURATION_MS = 38000;

/** One effect: select the word, open Format, Text, then the item. The cycles are identical, about 4.5 s each. */
async function effect(tl: Timeline, target: keyof typeof TARGETS, item: FormatSubItemId) {
  await dragSelectText(tl, PRACTICE_ID, TARGETS[target]);
  await tl.wait(350);
  await clickFormatMenu(tl);
  await chooseFormatSub(tl, "text", item);
}

export async function runStep32(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initFormatMenu(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Bold: the full walk-through (select, then Format > Text > Bold)
  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await dragSelectText(tl, PRACTICE_ID, TARGETS.bold);
  await tl.at(3000);
  tl.showCaption(CAPTIONS.boldMenu);
  await clickFormatMenu(tl);
  await chooseFormatSub(tl, "text", "bold");

  // Italic, underline, strikethrough, superscript, subscript: the same cycle every 4.5 s
  await tl.at(7500);
  tl.showCaption(CAPTIONS.italic);
  await effect(tl, "italic", "italic");
  await tl.at(12000);
  tl.showCaption(CAPTIONS.underline);
  await effect(tl, "underline", "underline");
  await tl.at(16500);
  tl.showCaption(CAPTIONS.strike);
  await effect(tl, "strike", "strike");
  await tl.at(21000);
  tl.showCaption(CAPTIONS.sup);
  await effect(tl, "sup", "sup");
  await tl.at(25500);
  tl.showCaption(CAPTIONS.sub);
  await effect(tl, "sub", "sub");

  // Click elsewhere to deselect, and point out the shortcuts
  await tl.at(30000);
  tl.showCaption(CAPTIONS.shortcuts);
  await clickEndOfBlock(tl, PRACTICE_ID);
  tl.highlight(`[data-tl=doc-block-${PRACTICE_ID}]`);

  // Hold, then the quick white fade
  await tl.at(34000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(37600);
  tl.setVar("fade", true);
  await tl.at(STEP32_DURATION_MS);
}
