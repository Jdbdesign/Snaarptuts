import { HEADER_FOOTER } from "@/components/docs/insert-data";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 25 - Add a header and footer. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_insert.mp4 (about 3:00-3:30). The recording shows the header being typed at the top of
 * the page; it never shows the footer being filled in, so the step only hovers Footer (the footer area itself is built
 * and wired in components/docs/PageDecor.tsx for later steps).
 */

export { URLS } from "./step19-data";

export const CAPTIONS = {
  insertPageElements: "Click Insert, then Page elements",
  chooseHeader: "Choose Header",
  typeHeader: "Type your header text",
  leave: "Click in the page to leave the header",
  footerInsert: "Click Insert, then Page elements",
  footer: "Footer works the same way at the bottom of the page",
};

/** The block clicked to leave the header, and the header text typed. */
export const BODY_BLOCK = "p1";
export const HEADER_TEXT = HEADER_FOOTER.header;

export const TITLE = SAMPLE_TITLE;
