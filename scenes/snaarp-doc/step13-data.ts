import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 13 - Find and replace. All copy, captions and the typed words live here.
 * Recording: ref/docs/Snaarp_Doc_edit.mp4 (about 1:26-1:58). The recording replaces a different word; this step
 * finds "Acme" and replaces it with "Apex" in the sample document. Match counts are computed from the text.
 */

export const URLS = {
  editor: "docs.snaarp.com/document/project-brief", // placeholder, shared by steps 10 to 13
};

export const CAPTIONS = {
  open: "Click Edit, then Find and replace",
  find: "Type the word you want to find",
  matches: "Every match is highlighted",
  replaceWith: "Type the new word in Replace with",
  matchCase: "Match case finds only the exact capital letters",
  replaceAll: "Click Replace all",
  done: "All matches are replaced",
  close: "Click the X to close the panel",
};

/** The word that is searched for and the word that replaces it. */
export const FIND_WORD = "Acme";
export const REPLACE_WORD = "Apex";

export const TITLE = SAMPLE_TITLE;
