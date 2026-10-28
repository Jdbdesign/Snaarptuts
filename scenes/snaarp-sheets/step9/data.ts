import { SHEETS_URLS } from "@/components/sheets/sheets-data";

/** Snaarp Sheets, step 9 - Download (File > Download). */
export const URLS = SHEETS_URLS;

export const CAPTIONS = {
  open: "Click File, then hover Download",
  intro: "Download saves a copy in the format you choose",
  click: "Click Microsoft Excel (.xlsx)",
  done: "The file is on its way to your computer",
};

/** What each format gives you (one short caption per submenu row). */
export const FORMATS: Record<string, string> = {
  xlsx: "Microsoft Excel: opens in Excel with every sheet",
  csv: "CSV: plain text, just the sheet you are on",
  tsv: "TSV: like CSV, but separated by tabs",
  txt: "Plain Text: the cells as simple text",
  html: "HTML Table: a web page table",
  pdf: "PDF Document: ready to print or send",
};
