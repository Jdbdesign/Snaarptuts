import { initEditor } from "@/components/docs/editor-timeline";
import { clickInBlock } from "@/components/docs/format-timeline";
import { changeIndent } from "@/components/docs/format-state";
import { clickTool, edit, initToolbar } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, MOVED_ID, START_EDITOR, URLS } from "./step56-data";

/** Snaarp Doc, step 56 - Indent and outdent. Times are active milliseconds from the start of the step. */
export const STEP56_DURATION_MS = 22000;

export async function runStep56(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  await tl.at(800);
  tl.showCaption(CAPTIONS.click);
  await clickInBlock(tl, MOVED_ID, 8);

  await tl.at(3200);
  tl.showCaption(CAPTIONS.indent);
  await clickTool(tl, "indent", () => edit(tl, (s) => changeIndent(s, 1)), { tipMs: 900 });
  await tl.at(7000);
  tl.showCaption(CAPTIONS.moved);
  tl.highlight(`[data-tl=doc-block-${MOVED_ID}]`);

  await tl.at(10500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.outdent);
  await clickTool(tl, "outdent", () => edit(tl, (s) => changeIndent(s, -1)), { tipMs: 900 });
  await tl.at(15000);
  tl.showCaption(CAPTIONS.done);

  await tl.at(18500);
  tl.hideCaption();
  await tl.at(21600);
  tl.setVar("fade", true);
  await tl.at(STEP56_DURATION_MS);
}
