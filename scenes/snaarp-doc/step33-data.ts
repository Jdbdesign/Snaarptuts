import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 33 - Use paragraph styles (Format > Paragraph styles). All copy and the practice lines live here.
 * Recording: ref/docs/Snaarp_Doc_format.mp4 (Paragraph styles submenu at about 1:39). The recording turns a block of
 * its own text into headings; the tutorial uses two short practice lines instead.
 */

export { URLS } from "./step31-data";

/** The practice lines, added after the Contacts paragraph. Both Normal text. */
export const PRACTICE = ["Project overview", "A faster, clearer website for Acme Studio."];

/** The editor this step starts from: the sample document plus the two practice lines. */
export const START_EDITOR = practiceEditor(PRACTICE);
/** The line that is turned into a heading, and how far into it the cursor clicks (in characters). */
export const HEADING_ID = practiceId(0);
export const CLICK_OFFSET = 7;

export const CAPTIONS = {
  click: "Click in the line you want to turn into a heading",
  menu: "Click Format, then Paragraph styles",
  smaller: "Higher numbers mean smaller headings",
  h1: "Choose Heading 1",
  h2: "Heading 2 is a bit smaller",
  h3: "Heading 3 is smaller again",
  normal: "Normal text turns it back into plain text",
  keep: "We will keep Heading 2 here",
};

export const TITLE = SAMPLE_TITLE;
