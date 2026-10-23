import { DOC_TITLES } from "@/components/docs/doc-titles";

/*
 * Snaarp Doc, step 9 - Print your document. All copy and captions live here (the print panel's own copy is in
 * components/docs/print-data.ts). Recording: ref/docs/Snaarp_Doc_flow.mp4 (about 2:00-2:15). The recording shows the
 * browser's own print window with a real printer name; a neutral Snaarp-styled panel is drawn instead.
 */

export const URLS = {
  editor: "docs.snaarp.com/document/untitled-copy", // placeholder
};

export const CAPTIONS = {
  clickFile: "Click File",
  print: "Click Print. You can also press Ctrl+P",
  opens: "A print window opens",
  settings: "Choose where to print and your settings",
  buttons: "Click Print to send it, or Cancel to go back",
};

/** The order the cursor visits the settings. */
export const SETTING_ORDER = ["destination", "pages", "layout", "color"];

export const TITLES = { start: DOC_TITLES.renamed };
