import { SHEETS_URLS } from "@/components/sheets/sheets-data";

export const URLS = SHEETS_URLS;

/** The Status cells, the cell whose value is changed afterwards and the value picked. */
export const RANGE = { from: "d2", to: "d6" };
export const CELL = "d4";
export const PICK = "Paid";

export const CAPTIONS = {
  select: "Select the Status cells",
  open: "Click Data, then Data validation",
  panel: "The Data validation rules panel opens",
  range: "The rule applies to the cells you selected",
  rename: "Click the first item and type Paid",
  colour: "Click the dot to pick a colour",
  rename2: "Name the second item Pending",
  add: "Click Add another item",
  third: "Name the third item Overdue",
  done: "Click Done",
  applied: "Each status is now a coloured chip",
  open2: "Click a status cell to open its list",
  pick: "Pick a value from the list",
  end: "The cell takes the value you pick",
};
