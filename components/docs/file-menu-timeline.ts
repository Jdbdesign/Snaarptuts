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
