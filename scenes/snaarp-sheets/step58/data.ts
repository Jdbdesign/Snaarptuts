import { SHEETS_URLS } from "@/components/sheets/sheets-data";

export const URLS = SHEETS_URLS;

/** The cells that get styled: the three item names. */
export const RANGE = { from: "a2", to: "a4" };

export const CAPTIONS = {
  select: "Select the cells to style",
  bold: "Click Bold, or press ⌘B",
  italic: "Click Italic, or press ⌘I",
  underline: "Click Underline, or press ⌘U",
  strike: "Click Strikethrough, or press ⌥⇧5",
  off: "Click a style again to turn it off",
  done: "The cells look plain again",
};
