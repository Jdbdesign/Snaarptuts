import { clickEndOfBlock, initEditor } from "@/components/docs/editor-timeline";
import { clickInBlock } from "@/components/docs/format-timeline";
import { emptyTable } from "@/components/docs/insert-state";
import { insertRule, setBlockKind, typeInCell } from "@/components/docs/insert-timeline";
import { clickTool, closeMenu, edit, initToolbar, openMenu } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, LINE_IDS, START_EDITOR, TABLE, URLS } from "./step58-data";

/** Snaarp Doc, step 58 - Block quote, horizontal line and table. Times are active milliseconds from the start of the step. */
export const STEP58_DURATION_MS = 38000;

export async function runStep58(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.setVar("pageRules", []);
  tl.setVar("pageTable", null);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Block quote
  await tl.at(800);
  tl.showCaption(CAPTIONS.click);
  await clickInBlock(tl, LINE_IDS[0], 10);
  await tl.at(3000);
  tl.showCaption(CAPTIONS.quote);
  await clickTool(tl, "quote", () => setBlockKind(tl, LINE_IDS[0], "quote"), { tipMs: 900 });
  await tl.at(6500);
  tl.showCaption(CAPTIONS.quoted);
  tl.highlight(`[data-tl=doc-block-${LINE_IDS[0]}]`);

  // Horizontal rule: a line goes under the second paragraph
  await tl.at(9000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.end);
  await clickEndOfBlock(tl, LINE_IDS[1]);
  await tl.at(11500);
  tl.showCaption(CAPTIONS.rule);
  await clickTool(tl, "rule", () => insertRule(tl), { tipMs: 900 });
  await tl.at(15000);
  tl.showCaption(CAPTIONS.ruled);

  // Table: the arrow opens a grid of squares; 2 x 2 is picked
  await tl.at(18000);
  await clickEndOfBlock(tl, LINE_IDS[2]);
  tl.showCaption(CAPTIONS.table);
  await openMenu(tl, "table", "tool-table", { tipMs: 700, dx: 9 });
  await tl.at(22000);
  tl.showCaption(CAPTIONS.size);
  await tl.moveCursorTo("[data-tl=tm-table-1-1]", { ms: 500 });
  tl.setVar("tablePick", { r: 1, c: 1 });
  await tl.wait(350);
  await tl.moveCursorTo("[data-tl=tm-table-2-2]", { ms: 500 });
  tl.setVar("tablePick", { r: 2, c: 2 });
  await tl.wait(500);
  tl.highlight("[data-tl=tm-table-2-2]");
  await tl.click("[data-tl=tm-table-2-2]");
  tl.clearHighlight();
  closeMenu(tl);
  tl.setVar("tablePick", null);
  tl.setVar("pageTable", emptyTable(LINE_IDS[2], TABLE.rows, TABLE.cols));
  edit(tl, (s) => ({ ...s, caret: null, sel: null }));

  // Type the header row
  await tl.at(27500);
  tl.showCaption(CAPTIONS.done);
  for (let c = 0; c < TABLE.header.length; c++) await typeInCell(tl, 0, c, TABLE.header[c], { moveMs: 600 });

  await tl.at(34000);
  tl.hideCaption();
  await tl.at(37600);
  tl.setVar("fade", true);
  await tl.at(STEP58_DURATION_MS);
}
