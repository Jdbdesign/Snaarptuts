import { SHEETS_URLS } from "@/components/sheets/sheets-data";

/** Snaarp Sheets, step 32 - Group (rows, columns, ungroup). */
export const URLS = SHEETS_URLS;

export const CAPTIONS = {
  selectRows: "Select the rows to group. Drag from A2 to A3",
  open: "Click View, then Group",
  groupRows: "Click Group rows",
  bracket: "A bracket and a minus button appear on the left",
  collapse: "Click the minus button to collapse the group",
  collapsed: "Rows 2 and 3 are tucked away. Click the plus button to show them",
  expanded: "The rows are back",
  selectCols: "Columns work the same way. Drag from B1 to C1",
  groupCols: "Click Group columns",
  colBracket: "The bracket sits above the columns this time",
  ungroup: "To remove a group, click View, Group, then Ungroup rows",
  ungroupCols: "The same goes for Ungroup columns",
};
