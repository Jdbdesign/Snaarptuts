import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 62 - Check version history (header clock button). All copy lives here; the sample version list is in
 * components/docs/toolbar-data.ts (VERSIONS). Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (about 1:06-1:13): the clock opens the full-screen
 * Version history page (the page of step 8) with the list of saved versions by day, an "All versions" filter and "Show changes" ticked.
 * Step 8 reaches the same page from File > Version history; this step is the short header-button version.
 */

export { URLS as EDITOR_URLS } from "./step31-data";
export const URLS = {
  editor: "docs.snaarp.com/document/project-brief",
  history: "docs.snaarp.com/document/project-brief/history", // placeholder
};

export const START_EDITOR = SAMPLE_EDITOR;

export const CAPTIONS = {
  button: "Click the clock to open Version history",
  panel: "Every saved version is listed by date",
  hover: "Click a version to see how the document looked then",
  changes: "Show changes is on, so edits are highlighted",
  back: "Click the back arrow to return to your document",
};

export const TITLE = SAMPLE_TITLE;
