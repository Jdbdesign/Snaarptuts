import { SHEETS_URLS } from "@/components/sheets/sheets-data";

export const URLS = SHEETS_URLS;

/** The Status column and the value that is hidden. */
export const FILTER_COL = 3;
export const HIDE = "Paid";
export const SEARCH = "pa";

export const CAPTIONS = {
  open: "Click Data, then Create a filter",
  buttons: "A filter button appears in every header cell",
  status: "Click the filter button in the Status column",
  list: "The list shows every value in the column",
  search: "Type to search the list",
  clear: "Click Clear to untick every value",
  all: "Click Select all to tick them again",
  untick: "Untick Paid to hide those rows",
  ok: "Click OK",
  done: "The Paid rows are hidden and the row numbers turn blue",
  remove: "Click Data, then Remove filter",
  back: "Every row is back",
};
