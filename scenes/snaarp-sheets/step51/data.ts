import { SHEETS_URLS } from "@/components/sheets/sheets-data";

export const URLS = SHEETS_URLS;

import { EMOJI } from "@/components/sheets/insert-data";

export const CAPTIONS = {
  select: "Click the cell where the emoji should go",
  open: "Click Insert, then Emoji",
  picker: "The emoji picker opens. The tabs group the emoji",
  search: `Type a word to search. Here, ${EMOJI.query}`,
  pick: "Click the emoji you want",
  done: "The emoji is added to the cell",
};
