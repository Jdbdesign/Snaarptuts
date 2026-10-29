import { SHEETS_URLS } from "@/components/sheets/sheets-data";

export const URLS = SHEETS_URLS;

import { DROPDOWN } from "@/components/sheets/insert-data";

export const CAPTIONS = {
  select: "Select the cells that need a dropdown. Here, the Status column",
  open: "Click Insert, then Dropdown",
  panel: "The Data validation rules panel opens on the right",
  range: "Apply to range shows which cells get the dropdown",
  rename: "Rename the first item",
  rename2: "Rename the second item",
  colour: "Click the dot to pick a colour for an item",
  add: "Click Add another item",
  third: "Name the new item",
  done: "Click Done",
  applied: "The Status cells now show coloured chips",
  open2: "Click a cell to open its list",
  pick: `Pick a value. Here, ${DROPDOWN.picked}`,
  end: "The cell shows the chip you picked",
};
