import { initEditor } from "@/components/docs/editor-timeline";
import { dragSelectBlocks } from "@/components/docs/format-timeline";
import { setList, toggleChecked } from "@/components/docs/format-state";
import { chooseRow, clickTool, edit, initToolbar, openMenu } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, LINE_IDS, START_EDITOR, TICKED_ID, URLS } from "./step55-data";

/** Snaarp Doc, step 55 - Lists. Times are active milliseconds from the start of the step. */
export const STEP55_DURATION_MS = 34000;

export async function runStep55(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Select the three lines
  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await dragSelectBlocks(tl, LINE_IDS, { dragMs: 1500, soft: true });

  // Bullet list
  await tl.at(4200);
  tl.showCaption(CAPTIONS.bullet);
  await clickTool(tl, "bullets", () => edit(tl, (s) => setList(s, "bullet")), { tipMs: 900, dx: -5 });

  // The arrow: Checklist
  await tl.at(8500);
  tl.showCaption(CAPTIONS.menu);
  await openMenu(tl, "bullets", "tool-bullets", { tipMs: 200, dx: 9 });
  await tl.at(11000);
  tl.showCaption(CAPTIONS.check);
  await chooseRow(tl, "tm-bullets-check", () => edit(tl, (s) => setList(s, "check")));

  // Tick one box
  await tl.at(14500);
  tl.showCaption(CAPTIONS.tick);
  const box = `[data-tl=doc-check-${TICKED_ID}]`;
  await tl.moveCursorTo(box, { ms: 900 });
  tl.highlight(box);
  await tl.wait(250);
  await tl.click(box);
  tl.clearHighlight();
  edit(tl, (s) => toggleChecked(s, TICKED_ID));

  // Numbered list
  await tl.at(20500);
  tl.showCaption(CAPTIONS.numbered);
  await clickTool(tl, "numbers", () => edit(tl, (s) => setList(s, "number")), { tipMs: 900, dx: -5 });
  await tl.at(26000);
  tl.showCaption(CAPTIONS.done);
  tl.highlight(`[data-tl=doc-block-${LINE_IDS[0]}]`);
  tl.highlight(`[data-tl=doc-block-${LINE_IDS[2]}]`);

  await tl.at(30000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(33600);
  tl.setVar("fade", true);
  await tl.at(STEP55_DURATION_MS);
}
