import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 35 - Bullets and numbered lists (Format > Bullets & numbering). All copy and the practice lines live here.
 * Recording: ref/docs/Snaarp_Doc_format.mp4 (Bullets & numbering submenu at about 2:15, the list at about 2:25). The recording
 * turns a block of its own text into a list; the tutorial uses three short practice lines instead.
 */

export { URLS } from "./step31-data";

/** The practice lines, added after the Contacts paragraph. Three separate Normal text paragraphs. */
export const PRACTICE = ["Homepage design", "Content review", "Launch"];

/** The editor this step starts from: the sample document plus the three lines. */
export const START_EDITOR = practiceEditor(PRACTICE);
/** The ids of the three lines (first to last). */
export const LINE_IDS = PRACTICE.map((_, n) => practiceId(n));

export const CAPTIONS = {
  select: "Select the lines you want in a list",
  bullet: "Click Format, then Bullets & numbering, then Bullet list",
  check: "Checklist adds tick boxes for tasks",
  numbered: "Numbered list shows the order of steps",
  ready: "Your list is ready",
};

export const TITLE = SAMPLE_TITLE;
