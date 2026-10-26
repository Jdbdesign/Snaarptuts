import { practiceEditor, practiceId, preformat, type PreMark } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 38 - Clear formatting (Format > Clear formatting). All copy, the practice paragraph and the marks it
 * starts with live here. Recording: ref/docs/Snaarp_Doc_format.mp4 (Format menu with Clear formatting at about 3:20).
 * The recording clears a block of its own text; the tutorial uses one short paragraph that is pre-formatted so the
 * effect is obvious.
 */

export { URLS } from "./step31-data";

/** The practice paragraph, added after the Contacts paragraph. */
export const PRACTICE = "Special offer: book before December and save 20% on the redesign.";

const RED = "#D92D20";
const BLUE = "#1D63D9";
const YELLOW = "#FDE047";

/** The marks the paragraph starts with. Each names the text it sits on. */
export const MARKS: PreMark[] = [
  { context: "Special offer:", format: "bold" },
  { context: "Special offer:", format: "color", value: RED },
  { context: "December", format: "italic" },
  { context: "20%", format: "underline" },
  { context: "20%", format: "highlight", value: YELLOW },
  { context: "redesign", format: "strike" },
  { context: "redesign", format: "color", value: BLUE },
];

export const PRACTICE_ID = practiceId(0);

/** The editor this step starts from: the sample document plus the pre-formatted paragraph. */
export const START_EDITOR = preformat(practiceEditor([PRACTICE]), PRACTICE_ID, MARKS);

export const CAPTIONS = {
  select: "Select the text you want to reset",
  styled: "This text has bold, color, a highlight and a line through it",
  clear: "Click Format, then Clear formatting",
  stay: "The words stay, the styling goes",
  shortcut: "Shortcut: use the keys shown in the menu",
};

export const TITLE = SAMPLE_TITLE;
