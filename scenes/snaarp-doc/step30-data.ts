import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 30 - Draw and insert symbols. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_insert.mp4 (drawing at about 5:25-5:40, symbols at about 5:40-6:00). The recording's own
 * scribble and its "Classified" watermark are left out; the sample doodle is in components/docs/stroke-data.ts. The
 * frames open the symbols on Arrows, switch to Math and back, then click arrows; the step follows that.
 */

export { URLS } from "./step19-data";

export const CAPTIONS = {
  click: "Click at the end of the Contacts line",
  insert: "Click Insert, then Drawing",
  pick: "Pick a pen color and size",
  draw: "Draw with your mouse",
  button: "Click Insert",
  symbols: "Click Insert, then Symbols",
  browse: "Browse symbols by category",
  add: "Click a symbol to add it",
  close: "Click X to close the window",
};

/** The block the new line goes under (the Contacts paragraph). */
export const LAST_BLOCK = "p4";

/** The pen options that are only hovered (a few colour dots and a size dot; black stays selected). */
export const HOVER_COLORS = [1, 2, 3];
export const HOVER_SIZE = 3;

/** The categories clicked, in order, and the arrows clicked (indexes in the Arrows grid). */
export const CATEGORY_ORDER = ["math", "arrows"] as const;
export const ARROW_PICKS = [0, 1, 2, 3, 4];

export const TITLE = SAMPLE_TITLE;
