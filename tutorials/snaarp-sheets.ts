import type { Tutorial } from "./types";
import { SHEETS_URLS } from "@/components/sheets/sheets-data";
import { Step1 } from "@/scenes/snaarp-sheets/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-sheets/step1/script";
import { Step2 } from "@/scenes/snaarp-sheets/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/snaarp-sheets/step2/script";

/**
 * Snaarp Sheets ("How to use Snaarp Sheets"). This first round covers only the File menu (steps 1-19). Later rounds add Edit, View,
 * Insert, Format, Data, Tools and so on: append the steps to `steps` and a group to `groups`; the completion card follows the
 * last step in this list, so it moves by itself. Recording (git-ignored): ref/sheets/Snaarp_Sheets_file.mp4.
 * Step ids are the saved identity of a step (browser progress): never rename or reuse one.
 */
export const snaarpSheets: Tutorial = {
  product: { id: "snaarp-sheets", name: "Snaarp Sheets", logo: "sheet", aliases: ["sheets", "sheet", "spreadsheet", "spreadsheets", "excel", "workbook"] },
  groups: [{ title: "File menu", from: "meet-file-menu" }],
  steps: [
    {
      id: "meet-file-menu",
      title: "Meet the File menu",
      url: SHEETS_URLS.blank,
      scene: { Component: Step1, run: runStep1, durationMs: STEP1_DURATION_MS },
    },
    {
      id: "new",
      title: "Start a new spreadsheet",
      url: SHEETS_URLS.budget,
      scene: { Component: Step2, run: runStep2, durationMs: STEP2_DURATION_MS },
    },
  ],
};
