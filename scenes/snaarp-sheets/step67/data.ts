import { SHEETS_URLS } from "@/components/sheets/sheets-data";

export const URLS = SHEETS_URLS;

/** The part of the sheet that is sorted: three rows, four columns. */
export const RANGE = { from: "a2", to: "d4" };

export const CAPTIONS = {
  select: "Select only the rows you want to sort",
  open: "Click Data, then Sort range",
  asc: "Click Sort range A to Z",
  ascDone: "Only the selected rows moved",
  desc: "Click Sort range Z to A",
  descDone: "The two rows below stay where they were",
};
