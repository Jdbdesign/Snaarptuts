import { BREAKS } from "@/components/docs/insert-data";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 23 - Add a line or page break. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_insert.mp4 (about 1:45-2:40). The line and the page break follow the frames; the
 * section breaks are only hovered (the frames never click them).
 */

export { URLS } from "./step19-data";

export const CAPTIONS = {
  clickLine: "Click where you want the line",
  insertLine: "Click Insert, then Horizontal line",
  line: "A line separates sections",
  clickPage: "Click where the new page should start",
  insertBreak: "Click Insert, then Break",
  pageBreak: "A page break starts a new page",
  sections: "Section breaks start a new section",
  after: "Everything after the break moves to a new page",
};

/** The blocks of the sample document where the caret is placed (the line and the break go right before them). */
export const SPOTS = { line: BREAKS.ruleBefore, page: BREAKS.pageBreakBefore };

export const TITLE = SAMPLE_TITLE;
