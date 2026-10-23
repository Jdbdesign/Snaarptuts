import { DOC_TITLES } from "@/components/docs/doc-titles";

/*
 * Snaarp Doc, step 6 - Download and save to Drive. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_flow.mp4 (about 1:18-1:48). "Email" is not shown (nothing visible happens in the recording).
 */

export const URLS = {
  editor: "docs.snaarp.com/document/untitled-copy", // placeholder
};

export const CAPTIONS = {
  clickFile: "Click File",
  download: "Download lets you save your document in other formats",
  formats: "Choose Word, PDF, web page, Markdown or plain text",
  drive: "Save to Drive keeps a copy in your Snaarp Drive",
  saved: "Your document is saved in Drive",
};

export const TOASTS = {
  uploading: "Uploading to Drive...",
  saved: `Saved to Drive: ${DOC_TITLES.copy}.docx`,
};

/** The order the cursor visits the Download submenu. */
export const DOWNLOAD_ORDER = ["docx", "pdf", "html", "md", "txt"];

export const TITLES = { start: DOC_TITLES.copy };
