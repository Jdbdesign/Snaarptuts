import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 56 - Indent and outdent (toolbar). All copy and the practice list live here.
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (tooltip "Increase indent (Tab)" at about 0:43; the Decrease indent button sits next to it).
 * Start state: the sample document plus a three-item bullet list.
 */

export { URLS } from "./step31-data";

export const PRACTICE = ["Plan the launch", "Write the announcement", "Share it with the team"];
export const LINE_IDS = PRACTICE.map((_, n) => practiceId(n));

/** The sample document plus the three lines as a bullet list. */
const base = practiceEditor(PRACTICE);
export const START_EDITOR = { ...base, blocks: base.blocks.map((b) => (LINE_IDS.includes(b.id) ? { ...b, list: "bullet" as const } : b)) };

/** The item that moves in and back. */
export const MOVED_ID = LINE_IDS[1];

export const CAPTIONS = {
  click: "Click the item you want to move in",
  indent: "Click Increase indent",
  moved: "The item moves in, like a sub-point",
  outdent: "Click Decrease indent to bring it back",
  done: "Shortcuts: Tab to indent, Shift+Tab to go back",
};

export const TITLE = SAMPLE_TITLE;
