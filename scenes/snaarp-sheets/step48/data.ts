import { SHEETS_URLS } from "@/components/sheets/sheets-data";

export const URLS = SHEETS_URLS;

import { LINK } from "@/components/sheets/insert-data";

export const CAPTIONS = {
  cell: "Click the cell you want to turn into a link",
  open: "Click Insert, then Link. Or press Ctrl+K",
  pop: "The cell's own text stays at the top",
  search: "Search or paste a link here",
  list: "Or pick one of the sheets in this file",
  choose: "Click the sheet you want to link to",
  chip: "The cell is now a link. Hover it to copy, edit or remove the link",
  next: "Now try a web address in another cell",
  url: `Type or paste an address, for example ${LINK.url}`,
  apply: "Click Apply",
  done: "The cell now opens the web page",
};
