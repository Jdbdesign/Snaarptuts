import { SHEETS_URLS } from "@/components/sheets/sheets-data";
import type { LocateCaptions } from "../locate";

/** Snaarp Sheets, step 11 - Move the file (File > Move). */
export const URLS = SHEETS_URLS;

export const CAPTIONS: LocateCaptions = {
  open: "Click File, then Move",
  suggested: "Suggested shows folders picked for you",
  starred: "Click Starred for places you marked",
  all: "Click All locations to see every place",
  pick: "Click My Drive",
  go: "Click Move",
  done: "The file now lives in My Drive",
};
