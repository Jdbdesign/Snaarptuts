import { EDIT_MENU } from "@/components/sheets/edit-view-data";
import { SHEETS_URLS } from "@/components/sheets/sheets-data";

/** Snaarp Sheets, step 23 - Cut. */
export const URLS = SHEETS_URLS;
const cut = EDIT_MENU[1][0];
export const RANGE = { from: "a5", to: "d5" };

export const CAPTIONS = {
  select: "Select the cells you want to move",
  open: "Click Edit",
  click: `Click Cut (${cut.ctrl})`,
  ants: "Moving ants mark the cut cells",
  wait: "The cells stay put until you paste them somewhere else",
};
