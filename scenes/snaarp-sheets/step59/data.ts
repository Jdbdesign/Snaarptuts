import { SHEETS_URLS } from "@/components/sheets/sheets-data";

export const URLS = SHEETS_URLS;

export const RANGE = { from: "a2", to: "a3" };
export const SIZES = { big: 14, bigger: 24, back: 10 };

export const CAPTIONS = {
  select: "Select the cells to resize",
  open: "Click Format, then Font size",
  list: "Pick a size from the list",
  big: "Click 14",
  bigger: "Click 24 to make the text much bigger",
  back: "Click 10 to return to the normal size",
  done: "The rows grow and shrink with the text",
};
