import { initEditor } from "@/components/docs/editor-timeline";
import { chooseFormatSub, clickFormatMenu, dragSelectBlocks, initFormatMenu } from "@/components/docs/format-timeline";
import type { FormatSubItemId } from "@/components/docs/format-menu-data";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, LINE_IDS, START_EDITOR, URLS } from "./step35-data";

/** Snaarp Doc, step 35 - Bullets and numbered lists. Times are active milliseconds from the start of the step. */
export const STEP35_DURATION_MS = 26000;

/** Format > Bullets & numbering > one list type. */
async function chooseList(tl: Timeline, id: FormatSubItemId) {
  await clickFormatMenu(tl);
  await chooseFormatSub(tl, "bullets", id);
}

export async function runStep35(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initFormatMenu(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Select the three lines with the mouse
  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await dragSelectBlocks(tl, LINE_IDS);

  // Bullet list
  await tl.at(3500);
  tl.showCaption(CAPTIONS.bullet);
  await chooseList(tl, "bullet-list");

  // Checklist, then Numbered list: the lines stay selected, the new type replaces the old one
  await tl.at(8500);
  tl.showCaption(CAPTIONS.check);
  await chooseList(tl, "checklist");
  await tl.at(13500);
  tl.showCaption(CAPTIONS.numbered);
  await chooseList(tl, "numbered-list");

  // The list is ready
  await tl.at(18500);
  tl.showCaption(CAPTIONS.ready);
  tl.highlight(`[data-tl=doc-block-${LINE_IDS[1]}]`);

  // Hold, then the quick white fade
  await tl.at(22000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(25600);
  tl.setVar("fade", true);
  await tl.at(STEP35_DURATION_MS);
}
