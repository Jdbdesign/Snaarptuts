import type { Timeline } from "@/lib/timeline";
import type { EditorMode } from "./editor-data";
import { VIEW_DEFAULTS, type ViewItemId } from "./view-menu-data";

/*
 * Timeline helpers that drive the View menu and the editor modes (Snaarp Doc steps 14 to 18). The scene variables are
 * `viewMenu` (menu open), `viewSub` (Mode submenu open), `mode`, `ruler`, `printLayout`, `nonPrinting`, `commentsOpen`
 * and `outlineOpen` (EditorStage reads them). Every helper waits with the timeline's own clock, so Pause freezes it.
 */

const item = (id: ViewItemId) => `[data-tl=view-item-${id}]`;
const sub = (id: EditorMode) => `[data-tl=view-sub-${id}]`;

export const openViewMenu = (tl: Timeline) => tl.setVar("viewMenu", true);

export function closeViewMenu(tl: Timeline) {
  tl.hover(null);
  tl.setVar("viewSub", false);
  tl.setVar("viewMenu", false);
}

/** Move to "View" in the editor's menu row, ring it, click it and open the menu. */
export async function clickViewMenu(tl: Timeline, opts: { ms?: number } = {}) {
  const sel = "[data-tl=editor-menu-view]";
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 700 });
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  openViewMenu(tl);
}

/** Move onto a View menu item and hover it. Hovering "Mode" opens its submenu. Greyed-out items stay greyed. */
export async function hoverViewItem(tl: Timeline, id: ViewItemId, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(item(id), { ms: opts.ms ?? 300, dx: -40 });
  tl.hover(item(id));
  tl.setVar("viewSub", id === "mode");
}

/** Move onto an item of the Mode submenu and hover it. */
export async function hoverModeItem(tl: Timeline, id: EditorMode, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(sub(id), { ms: opts.ms ?? 350, dx: -20 });
  tl.hover(sub(id));
}

/** Choose a mode from the open Mode submenu: ring it, click it, close the menu and switch the editor. */
export async function clickModeItem(tl: Timeline, id: EditorMode, opts: { ms?: number } = {}) {
  await hoverModeItem(tl, id, opts);
  tl.highlight(sub(id));
  await tl.wait(150);
  await tl.click(sub(id));
  tl.clearHighlight();
  closeViewMenu(tl);
  tl.setVar("mode", id);
}

const flip = (tl: Timeline, key: string, fallback: boolean) => tl.setVar(key, !tl.getVar(key, fallback));

/** What a View menu item does. Greyed-out items and Full screen do nothing. */
function runViewAction(tl: Timeline, id: ViewItemId) {
  switch (id) {
    case "comments":
      flip(tl, "commentsOpen", false);
      break;
    case "outline":
      flip(tl, "outlineOpen", false);
      break;
    case "ruler":
      flip(tl, "ruler", VIEW_DEFAULTS.ruler);
      break;
    case "print-layout":
      flip(tl, "printLayout", VIEW_DEFAULTS.printLayout);
      break;
    case "non-printing":
      flip(tl, "nonPrinting", VIEW_DEFAULTS.nonPrinting);
      break;
  }
}

/** Move onto a View menu item, ring it, click it, close the menu and run the item's action. */
export async function chooseViewItem(tl: Timeline, id: ViewItemId, opts: { ms?: number } = {}) {
  if (id === "equation") throw new Error('View menu: "equation" is greyed out');
  await hoverViewItem(tl, id, { ms: opts.ms ?? 450 });
  tl.highlight(item(id));
  await tl.wait(150);
  await tl.click(item(id));
  tl.clearHighlight();
  closeViewMenu(tl);
  runViewAction(tl, id);
}
