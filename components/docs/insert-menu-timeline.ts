import type { Timeline } from "@/lib/timeline";
import type { InsertSub } from "./InsertMenu";
import type { InsertItemId, InsertSubItemId } from "./insert-menu-data";
import { INSERT_MENU } from "./insert-menu-data";

/*
 * Timeline helpers that drive the Insert menu (Snaarp Doc steps 19 to 26). The scene variables are `insertMenu`
 * (menu open) and `insertSub` ("" | "break" | "page-elements" | "toc": which submenu is open); EditorStage reads
 * them. Every helper waits with the timeline's own clock, so Pause freezes it.
 */

const item = (id: InsertItemId) => `[data-tl=insert-item-${id}]`;
const subItem = (id: InsertSubItemId) => `[data-tl=insert-sub-${id}]`;

const SUBMENU_OF = new Map(INSERT_MENU.flat().map((it) => [it.id, it.submenu ?? ""] as const));

export const openInsertMenu = (tl: Timeline) => tl.setVar("insertMenu", true);

export function closeInsertMenu(tl: Timeline) {
  tl.hover(null);
  tl.setVar("insertSub", "");
  tl.setVar("insertMenu", false);
}

/** Move to "Insert" in the editor's menu row, ring it, click it and open the menu. */
export async function clickInsertMenu(tl: Timeline, opts: { ms?: number } = {}) {
  const sel = "[data-tl=editor-menu-insert]";
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 700 });
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  openInsertMenu(tl);
}

/** Move onto an Insert menu item and hover it. Hovering Break or Page elements opens its submenu. Greyed-out items stay greyed. */
export async function hoverInsertItem(tl: Timeline, id: InsertItemId, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(item(id), { ms: opts.ms ?? 450, dx: -30 });
  tl.hover(item(id));
  tl.setVar("insertSub", SUBMENU_OF.get(id) ?? "");
}

/** Move onto a row of the open submenu and hover it. Hovering "Table of contents" opens its own card. */
export async function hoverInsertSub(tl: Timeline, id: InsertSubItemId, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(subItem(id), { ms: opts.ms ?? 350, dx: -20 });
  tl.hover(subItem(id));
  const open = tl.getVar<InsertSub>("insertSub", "");
  if (id === "toc") tl.setVar("insertSub", "toc");
  else if (open === "toc" && !id.startsWith("toc")) tl.setVar("insertSub", "page-elements");
}

/**
 * Move onto an Insert menu item, ring it, click it and close the menu. What the item does is the script's job
 * (steps 20 to 22 add the image, the table and the link). Items for later steps do nothing when clicked.
 */
export async function chooseInsertItem(tl: Timeline, id: InsertItemId, opts: { ms?: number } = {}) {
  if (id === "comment") throw new Error('Insert menu: "comment" is greyed out');
  await hoverInsertItem(tl, id, { ms: opts.ms ?? 450 });
  tl.highlight(item(id));
  await tl.wait(150);
  await tl.click(item(id));
  tl.clearHighlight();
  closeInsertMenu(tl);
}
