import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 48 - Paragraph styles and fonts (toolbar). All copy and the practice lines live here.
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (the "Normal text" box opens at about 0:13 and shows "Normal text"; the font box
 * opens at about 0:16 with "Search fonts..." and a scrolling list). The tutorial applies Heading 2, then the font Georgia.
 */

export { URLS } from "./step31-data";

/** Two practice lines after the Contacts paragraph: a title to turn into a heading, and a sentence for the new font. */
export const PRACTICE = ["Project goals", "This sentence will change to a classic serif font."];
export const START_EDITOR = practiceEditor(PRACTICE);
export const TITLE_ID = practiceId(0);
export const TEXT_ID = practiceId(1);

export const CAPTIONS = {
  click: "Click in the line you want to turn into a heading",
  style: "Open the Normal text box",
  h2: "Choose Heading 2",
  heading: "The line is now a heading",
  select: "Select the sentence you want in another font",
  font: "Open the font box",
  georgia: "Choose Georgia",
  done: "The sentence now uses Georgia",
};

export const FONT = "Georgia";
export const TITLE = SAMPLE_TITLE;
