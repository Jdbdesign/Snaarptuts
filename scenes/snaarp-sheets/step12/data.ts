import { SHEETS_URLS } from "@/components/sheets/sheets-data";
import type { LocateCaptions } from "../locate";

/** Snaarp Sheets, step 12 - Add a shortcut to Drive (File > Add shortcut to Drive). */
export const URLS = SHEETS_URLS;

export const CAPTIONS: LocateCaptions = {
  open: "Click File, then Add shortcut to Drive",
  suggested: "A shortcut points to the file without copying it",
  starred: "Click Starred for places you marked",
  all: "Click All locations to see every place",
  pick: "Click My Drive",
  go: "Click Add shortcut",
  done: "The shortcut is in My Drive",
};
