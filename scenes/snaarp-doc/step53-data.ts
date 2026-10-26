import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 53 - Align your text (toolbar). All copy and the practice paragraph live here.
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (tooltips "Align left", "Align center", "Align right" and "Justify" at about 0:36-0:41).
 * The tutorial applies each one to a paragraph that is long enough to show the difference.
 */

export { URLS } from "./step31-data";

export const PRACTICE =
  "Alignment decides how a paragraph sits on the page. This paragraph is long enough to run over several lines, so you can see how each setting moves the edges of the text. Left lines up the start of every line, right lines up the end, center balances both sides, and justify lines up both edges.";
export const START_EDITOR = practiceEditor([PRACTICE]);
export const PRACTICE_ID = practiceId(0);

export const CAPTIONS = {
  click: "Click in the paragraph you want to align",
  center: "Click Align center",
  centered: "The text is centered",
  right: "Click Align right",
  justify: "Click Justify to line up both edges",
  left: "Click Align left to go back",
  done: "Left is the normal setting",
};

export const TITLE = SAMPLE_TITLE;
