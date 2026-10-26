import { SLIDES_URLS } from "@/components/slides/slides-data";

/*
 * Snaarp Slides, step 12 - Move it to a folder. The recording only hovers File > Move; the folder picker and the toast are ours
 * (see docs/DECISIONS-AND-DEVIATIONS.md).
 */

export const URLS = SLIDES_URLS;

export const CAPTIONS = {
  open: "Click File, then Move",
  picker: "Choose the folder to move your presentation to",
  pick: "Click Client work",
  newFolder: "Need somewhere new? Use New folder",
  move: "Click Move here",
  done: "Your presentation now lives in Client work",
};
