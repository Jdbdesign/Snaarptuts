import { clickEndOfBlock, initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { chooseInsertItem, clickInsertMenu } from "@/components/docs/insert-menu-timeline";
import { clickEndAndNewLine, typeInBlock } from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { BLOCKS, CAPTIONS, TEXTS, URLS } from "./step28-data";

/** Snaarp Doc, step 28 - Block quote, checklist and code block. Times are active milliseconds from the start of the step. */
export const STEP28_DURATION_MS = 38000;

export async function runStep28(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Block quote: click in the intro paragraph, Insert > Block quote
  await tl.at(800);
  tl.showCaption(CAPTIONS.clickQuote);
  await clickEndOfBlock(tl, BLOCKS.quote);
  await tl.at(2500);
  tl.showCaption(CAPTIONS.insertQuote);
  await clickInsertMenu(tl);
  await chooseInsertItem(tl, "quote");
  await tl.at(6000);
  tl.showCaption(CAPTIONS.quote);
  tl.highlight(`[data-tl=doc-block-${BLOCKS.quote}]`);

  // Checklist: a new line under the Contacts paragraph, Insert > Checklist, type the item
  await tl.at(9000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.clickEnd);
  const item = await clickEndAndNewLine(tl, BLOCKS.last);
  await tl.at(11000);
  tl.showCaption(CAPTIONS.insertChecklist);
  await clickInsertMenu(tl);
  await chooseInsertItem(tl, "checklist");
  await tl.at(14000);
  tl.showCaption(CAPTIONS.typeItem);
  await typeInBlock(tl, item, TEXTS.item, { msPerChar: 110 });

  // The box (hover only: the frames never tick it)
  await tl.at(18500);
  tl.showCaption(CAPTIONS.box);
  await tl.moveCursorTo(`[data-tl=doc-check-${item}]`, { ms: 800 });
  tl.highlight(`[data-tl=doc-check-${item}]`);

  // Code block: a new line under the item, Insert > Code block, type the line
  await tl.at(22000);
  tl.clearHighlight();
  const code = await clickEndAndNewLine(tl, item);
  await tl.at(23500);
  tl.showCaption(CAPTIONS.insertCode);
  await clickInsertMenu(tl);
  await chooseInsertItem(tl, "code");
  await tl.at(27000);
  tl.showCaption(CAPTIONS.typeCode);
  await typeInBlock(tl, code, TEXTS.code, { msPerChar: 110 });
  await tl.at(32000);
  tl.showCaption(CAPTIONS.code);
  tl.highlight(`[data-tl=doc-block-${code}]`);

  // Hold, then the quick white fade
  await tl.at(35000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(37600);
  tl.setVar("fade", true);
  await tl.at(STEP28_DURATION_MS);
}
