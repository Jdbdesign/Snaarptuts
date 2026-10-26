import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 60 - Editing, Suggesting and Viewing modes (toolbar). All copy and the practice line live here.
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (the last toolbar button, a pen with an arrow, shows the tooltip "Editing mode" at about 0:57).
 * The recording never opens it, so the list is the three modes the View menu has (step 14), each with a short hint.
 * A word typed in Suggesting mode is drawn green and underlined (a suggestion).
 */

export { URLS } from "./step31-data";

export const PRACTICE = ["The brief is ready for review."];
export const START_EDITOR = practiceEditor(PRACTICE);
export const PRACTICE_ID = practiceId(0);
/** Typed in Suggesting mode, at the end of the line. */
export const SUGGESTED = " Please approve it by Friday.";

export const CAPTIONS = {
  menu: "Click the pen to change the editing mode",
  suggesting: "Choose Suggesting",
  mode: "The Suggesting pill is now on",
  /** On narrow screens the header has no pills. */
  modeNarrow: "Your edits are now suggestions",
  click: "Click at the end of the line",
  type: "Type a new sentence",
  suggested: "Your words show as a suggestion, so others can accept or reject them",
  again: "Open the mode list again",
  editing: "Choose Editing to go back",
  done: "Edits go straight into the document again",
};

export const TITLE = SAMPLE_TITLE;
