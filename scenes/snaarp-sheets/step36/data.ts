import { FULLSCREEN } from "@/components/sheets/edit-view-data";
import { SHEETS_URLS } from "@/components/sheets/sheets-data";

/** Snaarp Sheets, step 36 - Full screen (simulated inside the frame). */
export const URLS = SHEETS_URLS;

export const CAPTIONS = {
  open: "Click View",
  click: "Click Full screen",
  full: "The sheet now fills the screen",
  exit: `To leave, press ${FULLSCREEN.key}`,
  back: "Back to the normal view",
};
