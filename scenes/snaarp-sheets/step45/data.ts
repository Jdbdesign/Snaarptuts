import { SHEETS_URLS } from "@/components/sheets/sheets-data";

export const URLS = SHEETS_URLS;

import { IMAGE } from "@/components/sheets/insert-data";

export const CAPTIONS = {
  cell: `Click the cell for the picture. Here, ${IMAGE.cell.toUpperCase()}`,
  open: "Click Insert, then Image",
  choose: "Click Insert image in cell",
  drop: "Click to upload an image",
  picked: "Pick a picture. A preview appears",
  alt: "Add a short description for people who cannot see the picture",
  url: "Or click By URL to use a picture from the web",
  back: "Go back to Upload",
  insert: "Click Insert",
  done: "The picture sits inside the cell",
  bar: "The formula bar keeps the IMAGE formula behind it",
};
