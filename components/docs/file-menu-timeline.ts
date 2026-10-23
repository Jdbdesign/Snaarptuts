import type { Timeline } from "@/lib/timeline";

/*
 * Timeline helpers that drive the FileMenu. The scene reads the scene variables `fileMenu` (menu open)
 * and `fileSub` (Download submenu open) with useTimelineVar and passes them to <FileMenu> and
 * <DocEditor openMenu="file">.
 */

export const openFileMenu = (tl: Timeline) => {
  tl.setVar("fileMenu", true);
};

export const closeFileMenu = (tl: Timeline) => {
  tl.hover(null);
  tl.setVar("fileSub", false);
  tl.setVar("fileMenu", false);
};

/** Move the cursor onto a File menu item and hover it. Hovering "download" opens the submenu. */
export async function hoverFileMenuItem(tl: Timeline, id: string, opts: { ms?: number } = {}) {
  const sel = `[data-tl=file-item-${id}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 300, dx: -30 });
  tl.hover(sel);
  tl.setVar("fileSub", id === "download");
}

/** Move the cursor onto an item of the Download submenu and hover it. */
export async function hoverDownloadItem(tl: Timeline, id: string, opts: { ms?: number } = {}) {
  const sel = `[data-tl=file-sub-${id}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 300, dx: -20 });
  tl.hover(sel);
}

/** Move to "File" in the editor's menu row, ring it, click it and open the menu. */
export async function clickFileMenu(tl: Timeline, opts: { ms?: number } = {}) {
  const sel = "[data-tl=editor-menu-file]";
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 700 });
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  openFileMenu(tl);
}

/** Move onto a File menu item, ring it, click it and close the menu. */
export async function chooseFileMenuItem(tl: Timeline, id: string, opts: { ms?: number } = {}) {
  const sel = `[data-tl=file-item-${id}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 500, dx: -30 });
  tl.hover(sel);
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  closeFileMenu(tl);
}
