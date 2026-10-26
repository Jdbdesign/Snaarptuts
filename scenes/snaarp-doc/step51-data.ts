import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";
import { HIGHLIGHT_COLORS, TEXT_COLORS } from "@/components/docs/toolbar-data";

/*
 * Snaarp Doc, step 51 - Text color and highlight (toolbar). All copy, the practice line and the picks live here.
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (tooltips "Text color" and "Highlight color" at about 0:28-0:33; the palettes are never opened,
 * so the cards use the sample palettes in toolbar-data.ts).
 */

export { URLS } from "./step31-data";

export const PRACTICE = "Make this word red and put a yellow highlight behind this phrase.";
export const START_EDITOR = practiceEditor([PRACTICE]);
export const PRACTICE_ID = practiceId(0);

export const TARGETS = {
  color: { context: "word", start: 0, end: 4 },
  highlight: { context: "this phrase", start: 0, end: 11 },
};

/** The swatches picked: row and column in the palettes (red in the text colours, yellow in the highlights). */
export const PICK = { color: { row: 1, col: 0 }, highlight: { row: 0, col: 0 } };
export const COLOR = TEXT_COLORS[PICK.color.row][PICK.color.col];
export const HIGHLIGHT = HIGHLIGHT_COLORS[PICK.highlight.row][PICK.highlight.col];

export const CAPTIONS = {
  select: "Select the word you want to color",
  palette: "Click Text color to open the palette",
  red: "Pick red",
  selectPhrase: "Now select the words to highlight",
  highlight: "Click Highlight color",
  yellow: "Pick yellow",
  done: "Colored text and a highlight",
};

export const TITLE = SAMPLE_TITLE;
