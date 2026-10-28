import { EDIT_MENU } from "@/components/sheets/edit-view-data";
import { SHEETS_URLS } from "@/components/sheets/sheets-data";

/** Snaarp Sheets, step 25 - Paste. Starts with A2:B3 already copied. */
export const URLS = SHEETS_URLS;
const paste = EDIT_MENU[1][2];
export const COPIED = { from: "a2", to: "b3" };
export const TARGET = "f2";

export const CAPTIONS = {
  start: "These cells are copied. Click where the copy should go",
  click: "Click the first cell of the new spot",
  open: "Click Edit",
  paste: `Click Paste (${paste.ctrl})`,
  done: "The copied cells land here, starting at the cell you clicked",
};
