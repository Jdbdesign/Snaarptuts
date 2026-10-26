import { practiceEditor, practiceId, preformat, type PreMark } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 46 - Print and Paint format (toolbar). All copy and the practice line live here.
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (Print tooltip about 0:05, Paint format about 0:06: the cursor shows "not allowed"
 * because nothing is selected). The tutorial opens the print window from the button, then copies a style with Paint format.
 */

export { URLS } from "./step31-data";

/** One practice line: the first words are bold and blue, the rest is plain. */
export const PRACTICE = "Winter sale is our best offer. Spring offer is still plain text.";
export const PRACTICE_ID = practiceId(0);

const BLUE = "#1D63D9";
const MARKS: PreMark[] = [
  { context: "Winter sale", format: "bold" },
  { context: "Winter sale", format: "color", value: BLUE },
];

export const START_EDITOR = preformat(practiceEditor([PRACTICE]), PRACTICE_ID, MARKS);

/** The words the cursor selects. */
export const TARGETS = {
  source: { context: "Winter sale", start: 0, end: 11 },
  target: { context: "Spring offer", start: 0, end: 12 },
};

export const CAPTIONS = {
  print: "Click the Print button",
  opens: "The print window opens",
  cancel: "Click Cancel to close it",
  select: "Select the words that have the style you like",
  paint: "Click Paint format",
  apply: "Select the words that should look the same",
  done: "The style is copied",
};

export const TITLE = SAMPLE_TITLE;
