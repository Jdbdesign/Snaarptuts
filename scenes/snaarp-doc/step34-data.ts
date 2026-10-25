import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 34 - Align and indent text (Format > Align & indent). All copy and the practice line live here.
 * Recording: ref/docs/Snaarp_Doc_format.mp4 (Align & indent submenu at about 1:42). The recording aligns a block of its
 * own text; the tutorial uses one short practice line and the intro paragraph (for Justify) instead.
 */

export { URLS } from "./step31-data";

/** The practice line, added after the Contacts paragraph. Normal text, left aligned. */
export const PRACTICE = "Thank you for choosing Acme Studio.";

/** The editor this step starts from: the sample document plus the practice line. */
export const START_EDITOR = practiceEditor([PRACTICE]);

/** The practice line and the intro paragraph (the one that gets Justify), and how far into each the cursor clicks (in characters). */
export const BLOCKS = {
  practice: practiceId(0),
  practiceClick: 14,
  intro: "p1",
  introClick: 40,
};

export const CAPTIONS = {
  click: "Click in the line you want to align",
  center: "Click Format, then Align & indent, then Center",
  right: "Right moves it to the right edge",
  left: "Left puts it back",
  justify: "Justify spreads the lines to fill the full width",
  indent: "Increase indent moves the text in",
  outdent: "Decrease indent moves it back",
  toolbar: "Shortcuts also work on the toolbar",
};

export const TITLE = SAMPLE_TITLE;
