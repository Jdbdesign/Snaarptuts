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
import { Step24 } from "@/scenes/snaarp-sheets/step24/Step24";
import { runStep24, STEP24_DURATION_MS } from "@/scenes/snaarp-sheets/step24/script";
import { Step25 } from "@/scenes/snaarp-sheets/step25/Step25";
import { runStep25, STEP25_DURATION_MS } from "@/scenes/snaarp-sheets/step25/script";
import { Step26 } from "@/scenes/snaarp-sheets/step26/Step26";
import { runStep26, STEP26_DURATION_MS } from "@/scenes/snaarp-sheets/step26/script";
import { Step27 } from "@/scenes/snaarp-sheets/step27/Step27";
import { runStep27, STEP27_DURATION_MS } from "@/scenes/snaarp-sheets/step27/script";
import { Step28 } from "@/scenes/snaarp-sheets/step28/Step28";
import { runStep28, STEP28_DURATION_MS } from "@/scenes/snaarp-sheets/step28/script";
import { Step29 } from "@/scenes/snaarp-sheets/step29/Step29";
import { runStep29, STEP29_DURATION_MS } from "@/scenes/snaarp-sheets/step29/script";
import { Step30 } from "@/scenes/snaarp-sheets/step30/Step30";
import { runStep30, STEP30_DURATION_MS } from "@/scenes/snaarp-sheets/step30/script";
import { Step31 } from "@/scenes/snaarp-sheets/step31/Step31";
import { runStep31, STEP31_DURATION_MS } from "@/scenes/snaarp-sheets/step31/script";
import { Step32 } from "@/scenes/snaarp-sheets/step32/Step32";
import { runStep32, STEP32_DURATION_MS } from "@/scenes/snaarp-sheets/step32/script";
import { Step33 } from "@/scenes/snaarp-sheets/step33/Step33";
import { runStep33, STEP33_DURATION_MS } from "@/scenes/snaarp-sheets/step33/script";
import { Step34 } from "@/scenes/snaarp-sheets/step34/Step34";
import { runStep34, STEP34_DURATION_MS } from "@/scenes/snaarp-sheets/step34/script";
import { Step35 } from "@/scenes/snaarp-sheets/step35/Step35";
import { runStep35, STEP35_DURATION_MS } from "@/scenes/snaarp-sheets/step35/script";
import { Step36 } from "@/scenes/snaarp-sheets/step36/Step36";
import { runStep36, STEP36_DURATION_MS } from "@/scenes/snaarp-sheets/step36/script";
import { Step37 } from "@/scenes/snaarp-sheets/step37/Step37";
import { runStep37, STEP37_DURATION_MS } from "@/scenes/snaarp-sheets/step37/script";
import { Step38 } from "@/scenes/snaarp-sheets/step38/Step38";
import { runStep38, STEP38_DURATION_MS } from "@/scenes/snaarp-sheets/step38/script";
import { Step39 } from "@/scenes/snaarp-sheets/step39/Step39";
import { runStep39, STEP39_DURATION_MS } from "@/scenes/snaarp-sheets/step39/script";
import { Step40 } from "@/scenes/snaarp-sheets/step40/Step40";
import { runStep40, STEP40_DURATION_MS } from "@/scenes/snaarp-sheets/step40/script";
import { Step41 } from "@/scenes/snaarp-sheets/step41/Step41";
import { runStep41, STEP41_DURATION_MS } from "@/scenes/snaarp-sheets/step41/script";
import { Step42 } from "@/scenes/snaarp-sheets/step42/Step42";
import { runStep42, STEP42_DURATION_MS } from "@/scenes/snaarp-sheets/step42/script";
import { Step43 } from "@/scenes/snaarp-sheets/step43/Step43";
import { runStep43, STEP43_DURATION_MS } from "@/scenes/snaarp-sheets/step43/script";
import { Step44 } from "@/scenes/snaarp-sheets/step44/Step44";
import { runStep44, STEP44_DURATION_MS } from "@/scenes/snaarp-sheets/step44/script";
import { Step45 } from "@/scenes/snaarp-sheets/step45/Step45";
import { runStep45, STEP45_DURATION_MS } from "@/scenes/snaarp-sheets/step45/script";
import { Step46 } from "@/scenes/snaarp-sheets/step46/Step46";
import { runStep46, STEP46_DURATION_MS } from "@/scenes/snaarp-sheets/step46/script";
import { Step47 } from "@/scenes/snaarp-sheets/step47/Step47";
import { runStep47, STEP47_DURATION_MS } from "@/scenes/snaarp-sheets/step47/script";
import { Step48 } from "@/scenes/snaarp-sheets/step48/Step48";
import { runStep48, STEP48_DURATION_MS } from "@/scenes/snaarp-sheets/step48/script";
import { Step49 } from "@/scenes/snaarp-sheets/step49/Step49";
import { runStep49, STEP49_DURATION_MS } from "@/scenes/snaarp-sheets/step49/script";
import { Step50 } from "@/scenes/snaarp-sheets/step50/Step50";
import { runStep50, STEP50_DURATION_MS } from "@/scenes/snaarp-sheets/step50/script";
import { Step51 } from "@/scenes/snaarp-sheets/step51/Step51";
import { runStep51, STEP51_DURATION_MS } from "@/scenes/snaarp-sheets/step51/script";
import { Step52 } from "@/scenes/snaarp-sheets/step52/Step52";
import { runStep52, STEP52_DURATION_MS } from "@/scenes/snaarp-sheets/step52/script";
import { Step53 } from "@/scenes/snaarp-sheets/step53/Step53";
import { runStep53, STEP53_DURATION_MS } from "@/scenes/snaarp-sheets/step53/script";
import { Step54 } from "@/scenes/snaarp-sheets/step54/Step54";
import { runStep54, STEP54_DURATION_MS } from "@/scenes/snaarp-sheets/step54/script";
import { Step55 } from "@/scenes/snaarp-sheets/step55/Step55";
import { runStep55, STEP55_DURATION_MS } from "@/scenes/snaarp-sheets/step55/script";

import { Step56 } from "@/scenes/snaarp-sheets/step56/Step56";
import { runStep56, STEP56_DURATION_MS } from "@/scenes/snaarp-sheets/step56/script";
import { Step57 } from "@/scenes/snaarp-sheets/step57/Step57";
import { runStep57, STEP57_DURATION_MS } from "@/scenes/snaarp-sheets/step57/script";
import { Step58 } from "@/scenes/snaarp-sheets/step58/Step58";
import { runStep58, STEP58_DURATION_MS } from "@/scenes/snaarp-sheets/step58/script";
import { Step59 } from "@/scenes/snaarp-sheets/step59/Step59";
import { runStep59, STEP59_DURATION_MS } from "@/scenes/snaarp-sheets/step59/script";
import { Step60 } from "@/scenes/snaarp-sheets/step60/Step60";
import { runStep60, STEP60_DURATION_MS } from "@/scenes/snaarp-sheets/step60/script";
import { Step61 } from "@/scenes/snaarp-sheets/step61/Step61";
import { runStep61, STEP61_DURATION_MS } from "@/scenes/snaarp-sheets/step61/script";
import { Step62 } from "@/scenes/snaarp-sheets/step62/Step62";
import { runStep62, STEP62_DURATION_MS } from "@/scenes/snaarp-sheets/step62/script";
import { Step63 } from "@/scenes/snaarp-sheets/step63/Step63";
import { runStep63, STEP63_DURATION_MS } from "@/scenes/snaarp-sheets/step63/script";
import { Step64 } from "@/scenes/snaarp-sheets/step64/Step64";
import { runStep64, STEP64_DURATION_MS } from "@/scenes/snaarp-sheets/step64/script";
import { Step65 } from "@/scenes/snaarp-sheets/step65/Step65";
import { runStep65, STEP65_DURATION_MS } from "@/scenes/snaarp-sheets/step65/script";
import { Step66 } from "@/scenes/snaarp-sheets/step66/Step66";
import { runStep66, STEP66_DURATION_MS } from "@/scenes/snaarp-sheets/step66/script";
import { Step67 } from "@/scenes/snaarp-sheets/step67/Step67";
import { runStep67, STEP67_DURATION_MS } from "@/scenes/snaarp-sheets/step67/script";
import { Step68 } from "@/scenes/snaarp-sheets/step68/Step68";
import { runStep68, STEP68_DURATION_MS } from "@/scenes/snaarp-sheets/step68/script";
/**
 * Snaarp Sheets ("How to use Snaarp Sheets"). Round 1 covers the File menu (steps 1-19), round 2 the Edit and View menus (steps 20-36). Later rounds add Insert,
 * Format, Data, Tools and so on: append the steps to `steps` and a group to `groups`; the completion card follows the
 * last step in this list, so it moves by itself. Recordings (git-ignored): ref/sheets/Snaarp_Sheets_file.mp4 (File), ref/sheets/Snaarp_Sheets_edit_view.mp4 (Edit, View).
 * Step ids are the saved identity of a step (browser progress): never rename or reuse one.
 */
export const snaarpSheets: Tutorial = {
  product: { id: "snaarp-sheets", name: "Snaarp Sheets", logo: "sheet", aliases: ["sheets", "sheet", "spreadsheet", "spreadsheets", "excel", "workbook"] },
  groups: [
    { title: "File menu", from: "meet-file-menu" },
    { title: "Edit menu", from: "meet-edit-menu" },
    { title: "View menu", from: "meet-view-menu" },
    { title: "Insert menu", from: "insert-overview" },
    { title: "Format menu", from: "format-overview" },
    { title: "Data menu", from: "data-overview" },
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
    {
      id: "edit-copy",
      title: "Copy cells",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step24, run: runStep24, durationMs: STEP24_DURATION_MS },
    },
    {
      id: "edit-paste",
      title: "Paste cells",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step25, run: runStep25, durationMs: STEP25_DURATION_MS },
    },
    {
      id: "edit-paste-special",
      title: "Paste special",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step26, run: runStep26, durationMs: STEP26_DURATION_MS },
    },
    {
      id: "edit-delete",
      title: "Delete cells, rows and columns",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step27, run: runStep27, durationMs: STEP27_DURATION_MS },
    },
    {
      id: "edit-find",
      title: "Find and replace",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step28, run: runStep28, durationMs: STEP28_DURATION_MS },
    },
    {
      id: "meet-view-menu",
      title: "Meet the View menu",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step29, run: runStep29, durationMs: STEP29_DURATION_MS },
    },
    {
      id: "view-show",
      title: "Show or hide parts of the sheet",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step30, run: runStep30, durationMs: STEP30_DURATION_MS },
    },
    {
      id: "view-freeze",
      title: "Freeze rows and columns",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step31, run: runStep31, durationMs: STEP31_DURATION_MS },
    },
    {
      id: "view-group",
      title: "Group rows and columns",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step32, run: runStep32, durationMs: STEP32_DURATION_MS },
    },
    {
      id: "view-comments",
      title: "Add a comment",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step33, run: runStep33, durationMs: STEP33_DURATION_MS },
    },
    {
      id: "view-hidden-sheets",
      title: "Hidden sheets",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step34, run: runStep34, durationMs: STEP34_DURATION_MS },
    },
    {
      id: "view-zoom",
      title: "Change the zoom",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step35, run: runStep35, durationMs: STEP35_DURATION_MS },
    },
    {
      id: "view-full-screen",
      title: "Go full screen",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step36, run: runStep36, durationMs: STEP36_DURATION_MS },
    },
    {
      id: "insert-overview",
      title: "Meet the Insert menu",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step37, run: runStep37, durationMs: STEP37_DURATION_MS },
    },
    {
      id: "insert-cells",
      title: "Insert cells",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step38, run: runStep38, durationMs: STEP38_DURATION_MS },
    },
    {
      id: "insert-rows",
      title: "Insert rows",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step39, run: runStep39, durationMs: STEP39_DURATION_MS },
    },
    {
      id: "insert-columns",
      title: "Insert columns",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step40, run: runStep40, durationMs: STEP40_DURATION_MS },
    },
    {
      id: "insert-sheet",
      title: "Add a sheet",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step41, run: runStep41, durationMs: STEP41_DURATION_MS },
    },
    {
      id: "insert-chart-setup",
      title: "Chart: choose a type",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step42, run: runStep42, durationMs: STEP42_DURATION_MS },
    },
    {
      id: "insert-chart-style",
      title: "Chart: style and titles",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step43, run: runStep43, durationMs: STEP43_DURATION_MS },
    },
    {
      id: "insert-chart-series",
      title: "Chart: series, legend and axes",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step44, run: runStep44, durationMs: STEP44_DURATION_MS },
    },
    {
      id: "insert-image-cell",
      title: "Insert an image in a cell",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step45, run: runStep45, durationMs: STEP45_DURATION_MS },
    },
    {
      id: "insert-image-over",
      title: "Insert an image over cells",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step46, run: runStep46, durationMs: STEP46_DURATION_MS },
    },
    {
      id: "insert-function",
      title: "Insert a function",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step47, run: runStep47, durationMs: STEP47_DURATION_MS },
    },
    {
      id: "insert-link",
      title: "Insert a link",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step48, run: runStep48, durationMs: STEP48_DURATION_MS },
    },
    {
      id: "insert-checkbox",
      title: "Insert a checkbox",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step49, run: runStep49, durationMs: STEP49_DURATION_MS },
    },
    {
      id: "insert-dropdown",
      title: "Insert a dropdown",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step50, run: runStep50, durationMs: STEP50_DURATION_MS },
    },
    {
      id: "insert-emoji",
      title: "Insert an emoji",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step51, run: runStep51, durationMs: STEP51_DURATION_MS },
    },
    {
      id: "insert-smart-chip-people",
      title: "Smart chips: add a person",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step52, run: runStep52, durationMs: STEP52_DURATION_MS },
    },
    {
      id: "insert-smart-chips-more",
      title: "Smart chips: dates, places, files and more",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step53, run: runStep53, durationMs: STEP53_DURATION_MS },
    },
    {
      id: "insert-comment",
      title: "Insert a comment",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step54, run: runStep54, durationMs: STEP54_DURATION_MS },
    },
    {
      id: "insert-note",
      title: "Insert a note",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step55, run: runStep55, durationMs: STEP55_DURATION_MS },
    },
    {
      id: "format-overview",
      title: "Meet the Format menu",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step56, run: runStep56, durationMs: STEP56_DURATION_MS },
    },
    {
      id: "format-number",
      title: "Number formats",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step57, run: runStep57, durationMs: STEP57_DURATION_MS },
    },
    {
      id: "format-text-styles",
      title: "Bold, italic, underline and strikethrough",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step58, run: runStep58, durationMs: STEP58_DURATION_MS },
    },
    {
      id: "format-font-size",
      title: "Change the font size",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step59, run: runStep59, durationMs: STEP59_DURATION_MS },
    },
    {
      id: "format-alignment",
      title: "Align your cells",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step60, run: runStep60, durationMs: STEP60_DURATION_MS },
    },
    {
      id: "format-wrapping",
      title: "Wrap long text",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step61, run: runStep61, durationMs: STEP61_DURATION_MS },
    },
    {
      id: "format-rotation",
      title: "Rotate text",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step62, run: runStep62, durationMs: STEP62_DURATION_MS },
    },
    {
      id: "format-clear",
      title: "Clear formatting",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step63, run: runStep63, durationMs: STEP63_DURATION_MS },
    },
    {
      id: "format-greyed",
      title: "Options that are not available yet",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step64, run: runStep64, durationMs: STEP64_DURATION_MS },
    },
    {
      id: "data-overview",
      title: "Meet the Data menu",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step65, run: runStep65, durationMs: STEP65_DURATION_MS },
    },
    {
      id: "data-sort-sheet",
      title: "Sort the whole sheet",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step66, run: runStep66, durationMs: STEP66_DURATION_MS },
    },
    {
      id: "data-sort-range",
      title: "Sort part of a sheet",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step67, run: runStep67, durationMs: STEP67_DURATION_MS },
    },
    {
      id: "data-sort-az",
      title: "Sort a column A to Z",
      url: SHEETS_URLS.renamed,
      scene: { Component: Step68, run: runStep68, durationMs: STEP68_DURATION_MS },
    },
  ],
};
