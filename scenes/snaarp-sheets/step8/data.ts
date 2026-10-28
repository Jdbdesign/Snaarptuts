import { SHEETS_URLS } from "@/components/sheets/sheets-data";

/** Snaarp Sheets, step 8 - Email the file (File > Email). */
export const URLS = SHEETS_URLS;

export const CAPTIONS = {
  open: "Click File, then Email",
  to: "Type who it should go to",
  copy: "Tick Send yourself a copy",
  subject: "The subject already has the file name",
  message: "Add a short message",
  type: "Click File type to choose a format",
  options: "PDF, Excel, CSV or HTML",
  pick: "Choose Microsoft Excel (.xlsx)",
  send: "Click Send",
};

/** Sample recipient and message (example.com addresses only). */
export const SAMPLE = { to: "design@example.com", message: "Here is the latest budget for review." };
