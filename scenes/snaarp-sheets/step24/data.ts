import { EDIT_MENU } from "@/components/sheets/edit-view-data";
import { SHEETS_URLS } from "@/components/sheets/sheets-data";

/** Snaarp Sheets, step 24 - Copy. */
export const URLS = SHEETS_URLS;
const copy = EDIT_MENU[1][1];
export const RANGE = { from: "a2", to: "b3" };

export const CAPTIONS = {
  select: "Select the cells you want to copy",
  open: "Click Edit",
  click: `Click Copy (${copy.ctrl})`,
  ants: "Moving ants mark the copied cells",
  stay: "The original cells stay exactly where they are",
};
