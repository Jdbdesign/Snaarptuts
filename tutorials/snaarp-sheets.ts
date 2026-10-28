import type { Tutorial } from "./types";
import { SHEETS_URLS } from "@/components/sheets/sheets-data";
import { Step1 } from "@/scenes/snaarp-sheets/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-sheets/step1/script";
import { Step2 } from "@/scenes/snaarp-sheets/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/snaarp-sheets/step2/script";
import { Step3 } from "@/scenes/snaarp-sheets/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/snaarp-sheets/step3/script";
import { Step4 } from "@/scenes/snaarp-sheets/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/snaarp-sheets/step4/script";
import { Step5 } from "@/scenes/snaarp-sheets/step5/Step5";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/snaarp-sheets/step5/script";
import { Step6 } from "@/scenes/snaarp-sheets/step6/Step6";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/snaarp-sheets/step6/script";
import { Step7 } from "@/scenes/snaarp-sheets/step7/Step7";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/snaarp-sheets/step7/script";
import { Step8 } from "@/scenes/snaarp-sheets/step8/Step8";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/snaarp-sheets/step8/script";
import { Step9 } from "@/scenes/snaarp-sheets/step9/Step9";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/snaarp-sheets/step9/script";
import { Step10 } from "@/scenes/snaarp-sheets/step10/Step10";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/snaarp-sheets/step10/script";
import { Step11 } from "@/scenes/snaarp-sheets/step11/Step11";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/snaarp-sheets/step11/script";
import { Step12 } from "@/scenes/snaarp-sheets/step12/Step12";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/snaarp-sheets/step12/script";
import { Step13 } from "@/scenes/snaarp-sheets/step13/Step13";
import { runStep13, STEP13_DURATION_MS } from "@/scenes/snaarp-sheets/step13/script";
import { Step14 } from "@/scenes/snaarp-sheets/step14/Step14";
import { runStep14, STEP14_DURATION_MS } from "@/scenes/snaarp-sheets/step14/script";
import { Step15 } from "@/scenes/snaarp-sheets/step15/Step15";
import { runStep15, STEP15_DURATION_MS } from "@/scenes/snaarp-sheets/step15/script";
import { Step16 } from "@/scenes/snaarp-sheets/step16/Step16";
import { runStep16, STEP16_DURATION_MS } from "@/scenes/snaarp-sheets/step16/script";
import { Step17 } from "@/scenes/snaarp-sheets/step17/Step17";
import { runStep17, STEP17_DURATION_MS } from "@/scenes/snaarp-sheets/step17/script";
import { Step18 } from "@/scenes/snaarp-sheets/step18/Step18";
import { runStep18, STEP18_DURATION_MS } from "@/scenes/snaarp-sheets/step18/script";
import { Step19 } from "@/scenes/snaarp-sheets/step19/Step19";
import { runStep19, STEP19_DURATION_MS } from "@/scenes/snaarp-sheets/step19/script";
import { Step20 } from "@/scenes/snaarp-sheets/step20/Step20";
import { runStep20, STEP20_DURATION_MS } from "@/scenes/snaarp-sheets/step20/script";
import { Step21 } from "@/scenes/snaarp-sheets/step21/Step21";
import { runStep21, STEP21_DURATION_MS } from "@/scenes/snaarp-sheets/step21/script";
import { Step22 } from "@/scenes/snaarp-sheets/step22/Step22";
import { runStep22, STEP22_DURATION_MS } from "@/scenes/snaarp-sheets/step22/script";
import { Step23 } from "@/scenes/snaarp-sheets/step23/Step23";
import { runStep23, STEP23_DURATION_MS } from "@/scenes/snaarp-sheets/step23/script";

/**
 * Snaarp Sheets ("How to use Snaarp Sheets"). This first round covers only the File menu (steps 1-19). Later rounds add Edit, View,
 * Insert, Format, Data, Tools and so on: append the steps to `steps` and a group to `groups`; the completion card follows the
 * last step in this list, so it moves by itself. Recording (git-ignored): ref/sheets/Snaarp_Sheets_file.mp4.
 * Step ids are the saved identity of a step (browser progress): never rename or reuse one.
 */
export const snaarpSheets: Tutorial = {
  product: { id: "snaarp-sheets", name: "Snaarp Sheets", logo: "sheet", aliases: ["sheets", "sheet", "spreadsheet", "spreadsheets", "excel", "workbook"] },
  groups: [
    { title: "File menu", from: "meet-file-menu" },
    { title: "Edit menu", from: "meet-edit-menu" },
  ],
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
    {
      id: "open",
      title: "Open a file",
      url: SHEETS_URLS.blank,
      scene: { Component: Step3, run: runStep3, durationMs: STEP3_DURATION_MS },
    },
    {
      id: "import",
      title: "Import a file",
      url: SHEETS_URLS.budget,
      scene: { Component: Step4, run: runStep4, durationMs: STEP4_DURATION_MS },
    },
    {
      id: "import-location",
      title: "Choose where to import",
      url: SHEETS_URLS.budget,
      scene: { Component: Step5, run: runStep5, durationMs: STEP5_DURATION_MS },
    },
    {
      id: "copy",
      title: "Make a copy",
      url: SHEETS_URLS.budget,
      scene: { Component: Step6, run: runStep6, durationMs: STEP6_DURATION_MS },
    },
    {
      id: "share",
      title: "Share your spreadsheet",
      url: SHEETS_URLS.budget,
      scene: { Component: Step7, run: runStep7, durationMs: STEP7_DURATION_MS },
    },
    {
      id: "email",
      title: "Email the file",
      url: SHEETS_URLS.budget,
      scene: { Component: Step8, run: runStep8, durationMs: STEP8_DURATION_MS },
    },
    {
      id: "download",
      title: "Download a copy",
      url: SHEETS_URLS.budget,
      scene: { Component: Step9, run: runStep9, durationMs: STEP9_DURATION_MS },
    },
    {
      id: "rename",
      title: "Rename your spreadsheet",
      url: SHEETS_URLS.budget,
      scene: { Component: Step10, run: runStep10, durationMs: STEP10_DURATION_MS },
    },
    {
      id: "move",
      title: "Move it to a folder",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step11, run: runStep11, durationMs: STEP11_DURATION_MS },
    },
    {
      id: "shortcut",
      title: "Add a shortcut to Drive",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step12, run: runStep12, durationMs: STEP12_DURATION_MS },
    },
    {
      id: "trash",
      title: "Move it to the trash",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step13, run: runStep13, durationMs: STEP13_DURATION_MS },
    },
    {
      id: "name-version",
      title: "Name this version",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step14, run: runStep14, durationMs: STEP14_DURATION_MS },
    },
    {
      id: "version-history",
      title: "See the version history",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step15, run: runStep15, durationMs: STEP15_DURATION_MS },
    },
    {
      id: "offline",
      title: "Make it available offline",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step16, run: runStep16, durationMs: STEP16_DURATION_MS },
    },
    {
      id: "details",
      title: "See the file details",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step17, run: runStep17, durationMs: STEP17_DURATION_MS },
    },
    {
      id: "settings",
      title: "Settings",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step18, run: runStep18, durationMs: STEP18_DURATION_MS },
    },
    {
      id: "print",
      title: "Print your spreadsheet",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step19, run: runStep19, durationMs: STEP19_DURATION_MS },
    },
    {
      id: "meet-edit-menu",
      title: "Meet the Edit menu",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step20, run: runStep20, durationMs: STEP20_DURATION_MS },
    },
    {
      id: "edit-undo",
      title: "Undo a change",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step21, run: runStep21, durationMs: STEP21_DURATION_MS },
    },
    {
      id: "edit-redo",
      title: "Redo a change",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step22, run: runStep22, durationMs: STEP22_DURATION_MS },
    },
    {
      id: "edit-cut",
      title: "Cut cells",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step23, run: runStep23, durationMs: STEP23_DURATION_MS },
    },
  ],
};
