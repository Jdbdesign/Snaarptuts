import { initEditor } from "@/components/docs/editor-timeline";
import type { FormatSubItemId } from "@/components/docs/format-menu-data";
import { chooseFormatSub, clickFormatMenu, clickInBlock, initFormatMenu } from "@/components/docs/format-timeline";
import type { Timeline } from "@/lib/timeline";
import { BLOCKS, CAPTIONS, START_EDITOR, URLS } from "./step34-data";

/** Snaarp Doc, step 34 - Align and indent text. Times are active milliseconds from the start of the step. */
export const STEP34_DURATION_MS = 36000;

/** Format > Align & indent > one row. */
async function chooseAlign(tl: Timeline, id: FormatSubItemId) {
  await clickFormatMenu(tl);
  await chooseFormatSub(tl, "align", id);
}

export async function runStep34(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initFormatMenu(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Click in the practice line, then Format > Align & indent > Center
  await tl.at(800);
  tl.showCaption(CAPTIONS.click);
  await clickInBlock(tl, BLOCKS.practice, BLOCKS.practiceClick);
  await tl.at(2800);
  tl.showCaption(CAPTIONS.center);
  await chooseAlign(tl, "align-center");

  // Right, then Left
  await tl.at(7500);
  tl.showCaption(CAPTIONS.right);
  await chooseAlign(tl, "align-right");
  await tl.at(11500);
  tl.showCaption(CAPTIONS.left);
  await chooseAlign(tl, "align-left");

  // Justify the intro paragraph
  await tl.at(15500);
  tl.showCaption(CAPTIONS.justify);
  await clickInBlock(tl, BLOCKS.intro, BLOCKS.introClick);
  await chooseAlign(tl, "align-justify");

  // Increase and decrease indent on the practice line
  await tl.at(20500);
  tl.showCaption(CAPTIONS.indent);
  await clickInBlock(tl, BLOCKS.practice, BLOCKS.practiceClick, { ms: 700 });
  await chooseAlign(tl, "indent-more");
  await tl.at(25000);
  tl.showCaption(CAPTIONS.outdent);
  await chooseAlign(tl, "indent-less");

  // The same buttons are on the toolbar
  await tl.at(29000);
  tl.showCaption(CAPTIONS.toolbar);
  await tl.moveCursorTo("[data-tl=toolbar-group-align-left]", { ms: 900 });
  tl.highlight("[data-tl=toolbar-group-align-left]");

  // Hold, then the quick white fade
  await tl.at(32500);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(35600);
  tl.setVar("fade", true);
  await tl.at(STEP34_DURATION_MS);
}
