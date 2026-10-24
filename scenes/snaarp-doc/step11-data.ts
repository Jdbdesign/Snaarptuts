import { BLOCK_IDS, SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 11 - Copy and paste text. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_edit.mp4 (about 0:14-1:06). The sample document replaces the recording's text; the
 * browser's own "copied to the clipboard" pop-up is left out. Cut is only mentioned, not shown.
 */

export const URLS = {
  editor: "docs.snaarp.com/document/project-brief", // placeholder, shared by steps 10 to 13
};

export const CAPTIONS = {
  select: "Select the text you want to copy",
  copy: "Click Edit, then Copy",
  cut: "Cut works the same way, but removes the original",
  where: "Click where you want to paste it",
  paste: "Click Edit, then Paste",
  pasted: "The text is pasted",
  plain: "Paste without formatting pastes only plain text",
};

export const TITLE = SAMPLE_TITLE;

/** The paragraph that is copied, and the paragraph it is pasted under. */
export const COPY_FROM = BLOCK_IDS.copied;
export const PASTE_AFTER = BLOCK_IDS.last;
