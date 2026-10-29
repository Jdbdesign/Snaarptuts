import { SHEETS_URLS } from "@/components/sheets/sheets-data";

export const URLS = SHEETS_URLS;

import { STRUCTURE } from "@/components/sheets/insert-data";

export const CAPTIONS = {
  select: `Select the cells where you want new ones. Here, ${STRUCTURE.cellsRange[0].toUpperCase()} to ${STRUCTURE.cellsRange[1].toUpperCase()}`,
  open: "Click Insert, then Cells",
  down: "Click Insert cells and shift down",
  downDone: "Blank cells appear and the cells below move down",
  again: "Now select two cells in the Status column",
  right: "Click Insert cells and shift right",
  rightDone: "Blank cells appear and the cells to the right move across",
};
