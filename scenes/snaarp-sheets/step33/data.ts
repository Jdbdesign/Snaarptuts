import { COMMENTS } from "@/components/sheets/edit-view-data";
import { SHEETS_URLS } from "@/components/sheets/sheets-data";

/** Snaarp Sheets, step 33 - Comments. */
export const URLS = SHEETS_URLS;

export const CAPTIONS = {
  open: "Click View, then Comments, then Show comments",
  panel: "The Comments panel opens on the right",
  cell: `Click the cell you want to comment on. Here, ${COMMENTS.cell}`,
  add: "Click Add comment",
  type: "Type your comment",
  post: "Click Comment",
  posted: "The comment joins the list, and the cell gets an orange corner",
  close: "Click the X to close the panel",
};
