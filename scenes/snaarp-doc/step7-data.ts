import { DOC_TITLES } from "@/components/docs/doc-titles";

/*
 * Snaarp Doc, step 7 - Rename your document. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_flow.mp4 (about 1:44-1:56). The recording opens the browser's own rename pop-up and
 * cancels it; this step uses a Snaarp-styled dialog and completes the rename (see docs/DECISIONS-AND-DEVIATIONS.md).
 */

export const URLS = {
  editor: "docs.snaarp.com/document/untitled-copy", // placeholder
};

export const CAPTIONS = {
  fileRename: "Click File, then Rename",
  type: "Type a new name",
  ok: "Click OK",
  renamed: "Your document has a new name",
};

/** The name typed in the dialog. */
export const NEW_NAME = DOC_TITLES.renamed;

export const TITLES = { start: DOC_TITLES.copy, renamed: DOC_TITLES.renamed };
