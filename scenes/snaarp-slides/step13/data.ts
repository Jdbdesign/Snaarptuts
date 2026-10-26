import { SLIDES_URLS } from "@/components/slides/slides-data";

/*
 * Snaarp Slides, step 13 - Use version history. The recording only shows the two submenu rows (Name current version, See version
 * history); the name dialog and the side panel are ours (see docs/DECISIONS-AND-DEVIATIONS.md).
 */

export const URLS = SLIDES_URLS;

export const CAPTIONS = {
  open: "Click File, then hover Version history",
  name: "Click Name current version",
  type: "Give this version a name you will recognise",
  save: "Click Save",
  saved: "Named versions are easy to find later",
  again: "Open File, then Version history again",
  see: "Click See version history",
  panel: "Every saved version is listed by date and author",
  older: "Click an older version to look at it",
  restore: "Click Restore this version to go back to it",
  close: "Close the panel when you are done",
};
