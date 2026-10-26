import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 54 - Line spacing (toolbar). All copy and the practice paragraph live here.
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (tooltip "Line & paragraph spacing" at about 0:40-0:42; the menu is never opened, so its options are
 * the usual ones: Single, 1.15, 1.5, Double, plus two "Add space" rows that are shown but not wired).
 */

export { URLS } from "./step31-data";

export const PRACTICE =
  "Line spacing sets the space between the lines of a paragraph. Tight spacing fits more text on a page, while open spacing is easier to read and leaves room for notes. Try the different settings and watch the lines move apart.";
export const START_EDITOR = practiceEditor([PRACTICE]);
export const PRACTICE_ID = practiceId(0);

export const CAPTIONS = {
  click: "Click in the paragraph",
  open: "Open Line & paragraph spacing",
  pick: "Choose 1.5",
  wider: "The lines are further apart",
  again: "Open it again",
  double: "Choose Double",
  done: "Double spacing leaves room for notes",
};

export const TITLE = SAMPLE_TITLE;
