import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 40 - Check your word count. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_tools.mp4 (the dialog at about 0:05-0:12). The numbers come live from the sample document
 * (components/docs/word-count.ts), not from the recording's text.
 */

export { URLS } from "./step19-data";

export const CAPTIONS = {
  open: "Click Tools, then Word count",
  rows: "See your words, characters and pages",
  shortcut: "Shortcut: Ctrl+Shift+C opens it any time",
  done: "Click Done to close",
};

/** The dialog rows that get a ring, top to bottom. */
export const ROWS = ["words", "characters", "characters-no-spaces", "pages"] as const;

export const TITLE = SAMPLE_TITLE;
