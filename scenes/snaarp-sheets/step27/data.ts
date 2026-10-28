import { SHEETS_URLS } from "@/components/sheets/sheets-data";

/** Snaarp Sheets, step 27 - Delete (values, row, column). */
export const URLS = SHEETS_URLS;

/** What each sub-demo selects: the costs of two items, one cell of the Team lunch row, one cell of the Owner column. */
export const PICK = { values: { from: "c2", to: "c3" }, row: "a5", column: "b2" };

export const CAPTIONS = {
  intro: "Delete has three options. Select the cells first",
  open: "Click Edit, then Delete",
  valuesSelect: "First, Values. Select two costs",
  valuesClick: "Click Values",
  valuesAfter: "Values empties the cells. The cells stay, and the total updates",
  again: "The same sheet again",
  rowSelect: "Next, Row. Click any cell in the Team lunch row",
  rowClick: "Click Row",
  rowAfter: "Row removes the whole row. The rows below move up",
  colSelect: "Last, Column. Click any cell in the Owner column",
  colClick: "Click Column",
  colAfter: "Column removes the whole column. The columns to the right move left",
};
