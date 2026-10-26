import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 58 - Block quote, horizontal line and table (toolbar). All copy and the practice lines live here.
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (about 0:46-0:52). The button after Subscript has a quote-mark icon (no tooltip shows in the recording);
 * it is the block quote. "Horizontal rule" and "Table" (with an arrow) follow. The tutorial does not build a Columns tool: Columns is greyed out
 * in the Format menu, so the recording has none either.
 */

export { URLS } from "./step31-data";

export const PRACTICE = ["Quote this sentence so it stands out.", "Add a line right under this paragraph.", "Insert a table under this last line."];
export const START_EDITOR = practiceEditor(PRACTICE);
export const LINE_IDS = PRACTICE.map((_, n) => practiceId(n));

/** The table: 2 x 2, with a header typed into the first row. */
export const TABLE = { rows: 2, cols: 2, header: ["Task", "Owner"] };

export const CAPTIONS = {
  click: "Click in the line you want to quote",
  quote: "Click Block quote",
  quoted: "The line is now a quote",
  end: "Click at the end of this paragraph",
  rule: "Click Horizontal rule",
  ruled: "A thin line separates the sections",
  table: "Click the arrow next to Table",
  size: "Move over the squares to pick 2 x 2",
  done: "The table is ready for your text",
};

export const TITLE = SAMPLE_TITLE;
