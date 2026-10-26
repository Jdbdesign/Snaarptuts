import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 36 - Headers, footers and page numbers (Format > Headers & footers, Format > Page numbers).
 * All copy and the sample header and footer texts live here. Recording: ref/docs/Snaarp_Doc_format.mp4 (Format menu with
 * Headers & footers at about 2:55, the Page numbers dialog at about 3:05). The recording's header and footer texts are
 * not shown, so the texts below are sample texts.
 */

export { URLS } from "./step31-data";

/** The sample header and footer texts that are typed. */
export const TEXTS = { header: "Acme Studio brief", footer: "Confidential" };

export const CAPTIONS = {
  headers: "Click Format, then Headers & footers",
  typeHeader: "Type your header text",
  clickFooter: "Click the footer to add footer text",
  typeFooter: "Type your footer text",
  pageNumbers: "Click Format, then Page numbers",
  choose: "Choose the position and alignment",
  apply: "Click Apply",
  done: "Your header, footer and page number are set",
};

export const TITLE = SAMPLE_TITLE;
