import { SHEETS_URLS } from "@/components/sheets/sheets-data";

export const URLS = SHEETS_URLS;

/** A cell in the Cost column. */
export const CELL = "c2";

export const CAPTIONS = {
  select: "Select a cell in the Cost column",
  open: "Click Data, then Sort sheet",
  asc: "Click Sort sheet A to Z",
  ascDone: "The rows are in order, lowest cost first",
  desc: "Click Sort sheet Z to A",
  descDone: "Now the highest cost comes first",
  header: "The header row never moves",
};
