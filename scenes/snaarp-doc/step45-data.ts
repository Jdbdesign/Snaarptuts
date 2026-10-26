import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 45 - Undo and redo (toolbar). All copy lives here. Recording: ref/docs/Snaarp_Doc_toolbar.mp4
 * (Undo and Redo are the first buttons, 0:00-0:03). The recording only hovers them; the tutorial shows them working on a
 * short typed line. Start state: the sample document, nothing selected; Redo is greyed until Undo has been used.
 */

export { URLS } from "./step31-data";

export const START_EDITOR = SAMPLE_EDITOR;
/** The line the cursor types under the last paragraph (the "Contacts" text). */
export const AFTER_ID = "p4";
export const TYPED = "Next review is on Friday at 10:00.";

export const CAPTIONS = {
  click: "Click at the end of the last line",
  type: "Type a new line",
  undo: "Click Undo to take the line back",
  gone: "The line is gone",
  redo: "Click Redo to bring it back",
  back: "The line is back",
  keys: "Shortcuts: Ctrl+Z for Undo, Ctrl+Y for Redo",
};

export const TITLE = SAMPLE_TITLE;
