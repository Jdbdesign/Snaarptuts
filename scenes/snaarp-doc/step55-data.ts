import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 55 - Lists (toolbar). All copy and the practice lines live here.
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (tooltips "Bullet list" and "Numbered list" at about 0:42-0:45; both buttons have a small arrow).
 * The recording never opens the arrows, so the Checklist option is placed in the bullet button's menu (the Format menu has the same three lists).
 */

export { URLS } from "./step31-data";

/** Three short lines under the Contacts paragraph. */
export const PRACTICE = ["Homepage design", "Content review", "Launch"];
export const START_EDITOR = practiceEditor(PRACTICE);
export const LINE_IDS = PRACTICE.map((_, n) => practiceId(n));
/** The line whose box is ticked in the checklist. */
export const TICKED_ID = LINE_IDS[1];

export const CAPTIONS = {
  select: "Select the lines you want in a list",
  bullet: "Click Bullet list",
  menu: "Click the arrow next to it for more lists",
  check: "Choose Checklist",
  tick: "Click a box to tick it off",
  numbered: "Click Numbered list to show the order",
  done: "Three lists from the same three lines",
};

export const TITLE = SAMPLE_TITLE;
