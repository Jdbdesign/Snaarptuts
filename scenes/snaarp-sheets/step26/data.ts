import { EDIT_MENU } from "@/components/sheets/edit-view-data";
import { SHEETS_URLS } from "@/components/sheets/sheets-data";

/** Snaarp Sheets, step 26 - Paste special (values only, formatting only, transposed). */
export const URLS = SHEETS_URLS;
const copy = EDIT_MENU[1][1];

/** The copied cells (the header and the first item) and where each paste lands. */
export const RANGE = { from: "a1", to: "d2" };
export const TARGETS = { values: "f1", format: "a6", transposed: "f5" };

export const CAPTIONS = {
  select: "Select the cells you want to copy",
  open: "Click Edit",
  copy: `Click Copy (${copy.ctrl})`,
  intro: "Paste special pastes the copy in three different ways",
  pick: "Click the cell where the paste should start",
  special: "Click Edit, then Paste special",
  valuesBefore: "First, values only. The copied header is bold and shaded",
  valuesClick: "Click Paste values only",
  valuesAfter: "Values only brings the words, but not the bold or the shading",
  formatBefore: "Next, formatting only. The Total row is plain",
  formatClick: "Click Paste formatting only",
  formatAfter: "Formatting only gives the Total row the header look, and keeps its words and numbers",
  transBefore: "Last, transposed. The copy runs across two rows",
  transClick: "Click Paste transposed",
  transAfter: "Transposed swaps rows and columns, so the copy now runs down",
};
