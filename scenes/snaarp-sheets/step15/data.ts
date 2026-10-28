import { SHEETS_URLS } from "@/components/sheets/sheets-data";

/** Snaarp Sheets, step 15 - See version history (File > Version history > See version history). */
export const URLS = SHEETS_URLS;

export const CAPTIONS = {
  open: "Click File, then Version history",
  click: "Click See version history",
  intro: "Every saved version is listed on the right",
  current: "The top one is the current version",
  earlier: "Click an earlier version to see it",
  changes: "Tick Show changes to highlight what is different",
  back: "Click the arrow to go back",
};

/** The name the current version carries (given in step 14). */
export const VERSION_NAME = "Final budget";
