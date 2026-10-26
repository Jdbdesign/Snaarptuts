import { SYMBOLS } from "@/components/docs/insert-data";
import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";
import { EMOJI_PICK } from "@/components/docs/toolbar-data";

/*
 * Snaarp Doc, step 59 - Full screen, draw and emoji (toolbar). All copy and the practice line live here.
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (tooltips "Full screen", "Drawing" and "Symbols & Emoji" at about 0:48-0:55). The three tools
 * open what steps 18 and 30 built: the simulated full screen, the Drawing window and the symbols window (its Emoji tab).
 */

export { URLS } from "./step31-data";

export const PRACTICE = ["Draw a quick sketch under this line, then add an emoji."];
export const START_EDITOR = practiceEditor(PRACTICE);
export const PRACTICE_ID = practiceId(0);

/** The emoji inserted: its place in the symbols window's Emoji tab. */
export const EMOJI_INDEX = SYMBOLS.categories.find((c) => c.id === "emoji")!.symbols.indexOf(EMOJI_PICK);

export const CAPTIONS = {
  fullscreen: "Click Full screen",
  focus: "Only your page shows, with no menus in the way",
  esc: "Press Esc to leave full screen",
  line: "Click at the end of the line",
  drawing: "Click Drawing",
  draw: "Draw with the pen",
  insert: "Click Insert",
  below: "Click below the drawing",
  emoji: "Click Symbols & Emoji",
  tab: "Open the Emoji tab",
  pick: "Click an emoji to add it",
  close: "Close the window",
  done: "Your sketch and emoji are in the document",
};

export const TITLE = SAMPLE_TITLE;
