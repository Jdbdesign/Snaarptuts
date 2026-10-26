import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 50 - Bold, italic and underline (toolbar). All copy and the practice line live here.
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (tooltips "Bold (Ctrl+B)", "Italic (Ctrl+I)", "Underline (Ctrl+U)" at about 0:21-0:27).
 */

export { URLS } from "./step31-data";

export const PRACTICE = "Make one word bold, one word italic and one word underlined.";
export const START_EDITOR = practiceEditor([PRACTICE]);
export const PRACTICE_ID = practiceId(0);

/** The words that are selected. */
export const TARGETS = {
  bold: { context: "bold", start: 0, end: 4 },
  italic: { context: "italic", start: 0, end: 6 },
  underline: { context: "underlined", start: 0, end: 10 },
};

export const CAPTIONS = {
  select: "Select a word",
  bold: "Click B for bold",
  italicSelect: "Select the next word",
  italic: "Click I for italic",
  underlineSelect: "And one more",
  underline: "Click U to underline",
  done: "Shortcuts: Ctrl+B, Ctrl+I and Ctrl+U",
};

export const TITLE = SAMPLE_TITLE;
