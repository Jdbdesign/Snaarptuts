import { FIND } from "@/components/sheets/edit-view-data";
import { SHEETS_URLS } from "@/components/sheets/sheets-data";

/** Snaarp Sheets, step 28 - Find and replace. */
export const URLS = SHEETS_URLS;

export const CAPTIONS = {
  open: "Click Edit, then Find and replace",
  card: "The Find and replace box opens",
  find: `Type ${FIND.query} in the Find box`,
  findClick: "Click Find",
  found: "Every match is highlighted in the sheet",
  replace: `Type ${FIND.replacement} in the Replace with box`,
  replaceClick: "Click Replace all",
  done: "Both matches were replaced",
  close: "Click Done",
};
