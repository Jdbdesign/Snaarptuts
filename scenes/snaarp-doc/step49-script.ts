import { dragSelectBlock, getEditor, initEditor } from "@/components/docs/editor-timeline";
import { bumpSize, setFormatValue } from "@/components/docs/format-state";
import { fontSizeOf } from "@/components/docs/editor-state";
import { clickTool, edit, initToolbar, pointAtTool, pressButton, typeSizeBox } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, PRACTICE_ID, START_EDITOR, TYPED_SIZE, URLS } from "./step49-data";

/** Snaarp Doc, step 49 - Change the font size. Times are active milliseconds from the start of the step. */
export const STEP49_DURATION_MS = 30000;

const bump = (tl: Timeline, delta: 1 | -1) => () => edit(tl, (s) => bumpSize(s, Number(fontSizeOf(getEditor(tl))), delta));

export async function runStep49(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Select the line
  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await dragSelectBlock(tl, PRACTICE_ID, { dragMs: 1200 });

  // Plus, plus, minus
  await tl.at(4000);
  tl.showCaption(CAPTIONS.plus);
  await clickTool(tl, "size-up", bump(tl, 1), { tipMs: 800 });
  await tl.at(7500);
  tl.showCaption(CAPTIONS.plusAgain);
  await clickTool(tl, "size-up", bump(tl, 1), { tipMs: 300 });
  await tl.at(10500);
  tl.showCaption(CAPTIONS.minus);
  await clickTool(tl, "size-down", bump(tl, -1), { tipMs: 800 });

  // Type a size into the box
  await tl.at(15000);
  tl.showCaption(CAPTIONS.box);
  await pointAtTool(tl, "size", { tipMs: 600 });
  await pressButton(tl, "tool-size");
  await typeSizeBox(tl, TYPED_SIZE, () => edit(tl, (s) => setFormatValue(s, "size", TYPED_SIZE)));
  await tl.at(22000);
  tl.showCaption(CAPTIONS.typed);
  tl.highlight("[data-tl=tool-size]");

  await tl.at(26000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(29600);
  tl.setVar("fade", true);
  await tl.at(STEP49_DURATION_MS);
}
