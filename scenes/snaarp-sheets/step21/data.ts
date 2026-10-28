import { EDIT_MENU, EDIT_SAMPLE } from "@/components/sheets/edit-view-data";
import { SHEETS_URLS } from "@/components/sheets/sheets-data";

/** Snaarp Sheets, step 21 - Undo. */
export const URLS = SHEETS_URLS;
const undo = EDIT_MENU[0][0];

export const CAPTIONS = {
  type: `Type ${EDIT_SAMPLE.typed} into cell ${EDIT_SAMPLE.typedCell}`,
  changed: "The cost has changed. Made a mistake? Undo it",
  open: "Click Edit",
  click: `Click Undo (${undo.ctrl})`,
  back: "The old cost is back",
};
