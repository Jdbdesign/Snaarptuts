import type { Timeline } from "@/lib/timeline";
import { openInsertDialog } from "./insert-timeline";
import type { ToolsItemId } from "./tools-menu-data";

/*
 * Timeline helpers that drive the Tools menu and the Word count dialog (Snaarp Doc steps 39 and 40). The scene variables are
 * `toolsMenu` (menu open), `insertDialog` = "wordcount" (the dialog) and `outlineOpen` (Document outline). EditorStage reads
 * them. Every helper waits with the timeline's own clock, so Pause freezes it.
 */

const item = (id: ToolsItemId) => `[data-tl=tools-item-${id}]`;

export const openToolsMenu = (tl: Timeline) => tl.setVar("toolsMenu", true);

export function closeToolsMenu(tl: Timeline) {
  tl.hover(null);
  tl.setVar("toolsMenu", false);
}

/** Move to "Tools" in the editor's menu row, ring it, click it and open the menu. */
export async function clickToolsMenu(tl: Timeline, opts: { ms?: number } = {}) {
  const sel = "[data-tl=editor-menu-tools]";
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 700 });
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  openToolsMenu(tl);
}

/** Move onto a Tools menu item and hover it. Greyed-out items stay greyed (no hover fill). */
export async function hoverToolsItem(tl: Timeline, id: ToolsItemId, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(item(id), { ms: opts.ms ?? 450, dx: -30 });
  tl.hover(item(id));
}

/** Word count opens its dialog; Document outline opens the left panel (the same one as View > Document outline). */
function runToolsItemAction(tl: Timeline, id: ToolsItemId) {
  if (id === "word-count") openInsertDialog(tl, "wordcount");
  if (id === "outline") tl.setVar("outlineOpen", !tl.getVar("outlineOpen", false));
}

/** Move onto a Tools menu item, ring it, click it, close the menu and run the item's action. */
export async function chooseToolsItem(tl: Timeline, id: ToolsItemId, opts: { ms?: number } = {}) {
  if (id !== "word-count" && id !== "outline") throw new Error(`Tools menu: "${id}" is greyed out`);
  await hoverToolsItem(tl, id, { ms: opts.ms ?? 450 });
  tl.highlight(item(id));
  await tl.wait(150);
  await tl.click(item(id));
  tl.clearHighlight();
  closeToolsMenu(tl);
  runToolsItemAction(tl, id);
}
