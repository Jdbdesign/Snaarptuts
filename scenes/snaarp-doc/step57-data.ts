import { practiceEditor, practiceId, preformat, type PreMark } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 57 - Clear formatting, superscript and subscript (toolbar). All copy and the practice line live here.
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (about 0:44-0:50). The button with the crossed S (right after the indent buttons) shows the tooltip
 * "Clear formatting", not "Strikethrough"; "Superscript" and "Subscript" follow. Strikethrough itself is in Format > Text (step 32).
 */

export { URLS } from "./step31-data";

export const PRACTICE = "Clear this styled text with one click. The room is 20 m2 and water is H2O.";
export const PRACTICE_ID = practiceId(0);

const RED = "#D92D20";
/** The first words start bold, red and crossed out, so Clear formatting has something to remove. */
const MARKS: PreMark[] = [
  { context: "Clear this styled text", format: "bold" },
  { context: "Clear this styled text", format: "color", value: RED },
  { context: "Clear this styled text", format: "strike" },
];
export const START_EDITOR = preformat(practiceEditor([PRACTICE]), PRACTICE_ID, MARKS);

export const TARGETS = {
  styled: { context: "Clear this styled text", start: 0, end: 22 },
  sup: { context: "m2", start: 1, end: 2 },
  sub: { context: "H2O", start: 1, end: 2 },
};

export const CAPTIONS = {
  select: "Select the styled text",
  clear: "Click Clear formatting",
  cleared: "The styling is gone, the words stay",
  supSelect: "Select the 2 in m2",
  sup: "Click Superscript to raise it",
  subSelect: "Select the 2 in H2O",
  sub: "Click Subscript to lower it",
  done: "m2 and H2O now read correctly",
};

export const TITLE = SAMPLE_TITLE;
