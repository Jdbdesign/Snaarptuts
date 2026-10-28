import { EDIT_MENU, EDIT_SAMPLE } from "@/components/sheets/edit-view-data";
import { SHEETS_URLS } from "@/components/sheets/sheets-data";

/** Snaarp Sheets, step 22 - Redo. Starts right after an Undo (the new cost was typed and undone). */
export const URLS = SHEETS_URLS;
const redo = EDIT_MENU[0][1];

export const CAPTIONS = {
  start: `The change to ${EDIT_SAMPLE.typedCell} was undone. Changed your mind? Redo it`,
  open: "Click Edit",
  click: `Click Redo (${redo.ctrl})`,
  back: `${EDIT_SAMPLE.typed} is back`,
};
