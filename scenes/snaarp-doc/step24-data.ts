import { BOOKMARK } from "@/components/docs/insert-data";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 24 - Add a bookmark. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_insert.mp4 (about 2:40-3:00). The browser's own dark pop-up (bookmark name box) is
 * redrawn as our own white dialog, and the raw code-like text the recording shows after the bookmark is added is
 * replaced by a small bookmark marker and a "Bookmark added" toast.
 */

export { URLS } from "./step19-data";

export const CAPTIONS = {
  click: "Click where you want the bookmark",
  insert: "Click Insert, then Bookmark",
  name: "Give your bookmark a name",
  ok: "Click OK",
  marker: "Bookmarks mark a spot you can jump back to",
};

/** The block the caret is placed at the start of (the paragraph under "Goals"), and the name typed. */
export const SPOT = BOOKMARK.before;
export const NAME = BOOKMARK.name;

export const TITLE = SAMPLE_TITLE;
