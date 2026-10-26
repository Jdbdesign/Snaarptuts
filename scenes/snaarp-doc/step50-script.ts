import { clickEndOfBlock, initEditor } from "@/components/docs/editor-timeline";
import { dragSelectText } from "@/components/docs/format-timeline";
import { toggleFormat } from "@/components/docs/format-state";
import type { TextFormat } from "@/components/docs/editor-state";
import { clickTool, edit, initToolbar } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, PRACTICE_ID, START_EDITOR, TARGETS, URLS } from "./step50-data";

/** Snaarp Doc, step 50 - Bold, italic, underline. Times are active milliseconds from the start of the step. */
export const STEP50_DURATION_MS = 28000;

/** Select a word, then click the toolbar button for the format. */
async function effect(tl: Timeline, target: keyof typeof TARGETS, tool: string, format: TextFormat) {
  await dragSelectText(tl, PRACTICE_ID, TARGETS[target], { dragMs: 700 });
  await tl.wait(300);
  await clickTool(tl, tool, () => edit(tl, (s) => toggleFormat(s, format)), { tipMs: 700 });
}

export async function runStep50(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await dragSelectText(tl, PRACTICE_ID, TARGETS.bold, { dragMs: 700 });
  await tl.at(2800);
  tl.showCaption(CAPTIONS.bold);
  await clickTool(tl, "bold", () => edit(tl, (s) => toggleFormat(s, "bold")), { tipMs: 900 });

  await tl.at(7000);
  tl.showCaption(CAPTIONS.italicSelect);
  await dragSelectText(tl, PRACTICE_ID, TARGETS.italic, { dragMs: 700 });
  await tl.at(9300);
  tl.showCaption(CAPTIONS.italic);
  await clickTool(tl, "italic", () => edit(tl, (s) => toggleFormat(s, "italic")), { tipMs: 900 });

  await tl.at(13500);
  tl.showCaption(CAPTIONS.underlineSelect);
  await effect(tl, "underline", "underline", "underline");
  await tl.at(17000);
  tl.showCaption(CAPTIONS.underline);

  // Click away: the selection clears and all three words show
  await tl.at(19000);
  await clickEndOfBlock(tl, PRACTICE_ID);
  tl.showCaption(CAPTIONS.done);
  tl.highlight(`[data-tl=doc-block-${PRACTICE_ID}]`);
  await tl.at(24500);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(27600);
  tl.setVar("fade", true);
  await tl.at(STEP50_DURATION_MS);
}
