import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 32 - Format your text (Format > Text). All copy, the practice paragraph and the words that are
 * selected live here. Recording: ref/docs/Snaarp_Doc_format.mp4 (about 0:12-1:35). The recording formats a messy block
 * of text; the tutorial uses one short, clean practice line so each effect is obvious.
 */

export { URLS } from "./step31-data";

/** The practice paragraph, added after the Contacts paragraph. Plain Normal text. */
export const PRACTICE = "Bold, italic, underline and strikethrough change how words look. Launch is on the 15th. Water is H2O.";

/** The editor this step starts from: the sample document plus the practice paragraph. */
export const START_EDITOR = practiceEditor([PRACTICE]);
export const PRACTICE_ID = practiceId(0);

/**
 * The words that are selected. `context` is found in the practice paragraph; the selection is the part of it from
 * `start` to `end` (so "th" is picked out of "15th" and "2" out of "H2O").
 */
export const TARGETS = {
  bold: { context: "Bold", start: 0, end: 4 },
  italic: { context: "italic", start: 0, end: 6 },
  underline: { context: "underline", start: 0, end: 9 },
  strike: { context: "strikethrough", start: 0, end: 13 },
  sup: { context: "15th", start: 2, end: 4 },
  sub: { context: "H2O", start: 1, end: 2 },
};

export const CAPTIONS = {
  select: "Select the word you want to format",
  boldMenu: "Click Format, then Text, then Bold",
  italic: "Now select italic",
  underline: "Underline adds a line under the text",
  strike: "Strikethrough crosses text out",
  sup: "Superscript raises text above the line",
  sub: "Subscript lowers text below the line",
  shortcuts: "Shortcuts: Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline",
};

export const TITLE = SAMPLE_TITLE;
