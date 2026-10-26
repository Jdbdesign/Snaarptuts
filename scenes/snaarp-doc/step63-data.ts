import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 63 - Open the Snaarp apps panel (header grid button). All copy lives here; the tiles are in components/docs/toolbar-data.ts (APPS).
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (about 1:13-1:25): the grid button ("Snaarp apps" tooltip) opens a card titled "Snaarp apps" with a
 * three-column grid of product tiles (Docs, the current one, is tinted); the card scrolls to show more tiles. The panel's title in the recording is
 * "Snaarp apps", not "Desktop apps"; a 360 tile is added at the end of the list.
 */

export { URLS } from "./step31-data";

export const START_EDITOR = SAMPLE_EDITOR;

/** The tiles the cursor rests on while the panel is open. */
export const HOVER_TILES = ["mail", "sheets"];

export const CAPTIONS = {
  button: "Click the grid to see the Snaarp apps",
  panel: "Each tile opens another Snaarp product",
  current: "Docs is tinted because you are in it",
  hover: "Point at a tile to pick it",
  scroll: "Scroll for more apps",
  close: "Click the grid again to close the panel",
};

export const TITLE = SAMPLE_TITLE;
