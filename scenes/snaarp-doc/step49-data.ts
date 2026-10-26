import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 49 - Change the font size (toolbar). All copy and the practice line live here.
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (minus, the size box "11" and plus at about 0:20; the size list opens with 8, 9... at about 0:18).
 * The tutorial makes a line bigger with plus, smaller with minus, then types an exact size.
 */

export { URLS } from "./step31-data";

export const PRACTICE = "Resize this line with the plus and minus buttons.";
export const START_EDITOR = practiceEditor([PRACTICE]);
export const PRACTICE_ID = practiceId(0);

/** The size typed into the box. */
export const TYPED_SIZE = "18";

export const CAPTIONS = {
  select: "Select the text you want to resize",
  plus: "Click + to make it bigger",
  plusAgain: "Click + again",
  minus: "Click - to make it smaller",
  box: "Or click the size box and type a size",
  typed: "Press Enter and the text is 18",
};

export const TITLE = SAMPLE_TITLE;
