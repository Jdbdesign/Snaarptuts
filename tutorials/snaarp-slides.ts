import { Step1 } from "@/scenes/snaarp-slides/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-slides/step1/script";
import { Step2 } from "@/scenes/snaarp-slides/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/snaarp-slides/step2/script";
import { Step3 } from "@/scenes/snaarp-slides/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/snaarp-slides/step3/script";
import { Step4 } from "@/scenes/snaarp-slides/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/snaarp-slides/step4/script";
import { Step5 } from "@/scenes/snaarp-slides/step5/Step5";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/snaarp-slides/step5/script";
import { Step6 } from "@/scenes/snaarp-slides/step6/Step6";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/snaarp-slides/step6/script";
import { Step7 } from "@/scenes/snaarp-slides/step7/Step7";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/snaarp-slides/step7/script";
import { Step8 } from "@/scenes/snaarp-slides/step8/Step8";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/snaarp-slides/step8/script";
import { Step9 } from "@/scenes/snaarp-slides/step9/Step9";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/snaarp-slides/step9/script";
import { Step10 } from "@/scenes/snaarp-slides/step10/Step10";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/snaarp-slides/step10/script";
import { Step11 } from "@/scenes/snaarp-slides/step11/Step11";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/snaarp-slides/step11/script";
import { Step12 } from "@/scenes/snaarp-slides/step12/Step12";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/snaarp-slides/step12/script";
import { Step13 } from "@/scenes/snaarp-slides/step13/Step13";
import { runStep13, STEP13_DURATION_MS } from "@/scenes/snaarp-slides/step13/script";
import { Step14 } from "@/scenes/snaarp-slides/step14/Step14";
import { runStep14, STEP14_DURATION_MS } from "@/scenes/snaarp-slides/step14/script";
import { Step15 } from "@/scenes/snaarp-slides/step15/Step15";
import { runStep15, STEP15_DURATION_MS } from "@/scenes/snaarp-slides/step15/script";
import { Step16 } from "@/scenes/snaarp-slides/step16/Step16";
import { runStep16, STEP16_DURATION_MS } from "@/scenes/snaarp-slides/step16/script";
import { Step17 } from "@/scenes/snaarp-slides/step17/Step17";
import { runStep17, STEP17_DURATION_MS } from "@/scenes/snaarp-slides/step17/script";
import { Step18 } from "@/scenes/snaarp-slides/step18/Step18";
import { runStep18, STEP18_DURATION_MS } from "@/scenes/snaarp-slides/step18/script";
import { Step19 } from "@/scenes/snaarp-slides/step19/Step19";
import { runStep19, STEP19_DURATION_MS } from "@/scenes/snaarp-slides/step19/script";
import { Step20 } from "@/scenes/snaarp-slides/step20/Step20";
import { runStep20, STEP20_DURATION_MS } from "@/scenes/snaarp-slides/step20/script";
import { Step21 } from "@/scenes/snaarp-slides/step21/Step21";
import { runStep21, STEP21_DURATION_MS } from "@/scenes/snaarp-slides/step21/script";
import { Step22 } from "@/scenes/snaarp-slides/step22/Step22";
import { runStep22, STEP22_DURATION_MS } from "@/scenes/snaarp-slides/step22/script";
import { Step23 } from "@/scenes/snaarp-slides/step23/Step23";
import { runStep23, STEP23_DURATION_MS } from "@/scenes/snaarp-slides/step23/script";
import { Step24 } from "@/scenes/snaarp-slides/step24/Step24";
import { runStep24, STEP24_DURATION_MS } from "@/scenes/snaarp-slides/step24/script";
import { Step25 } from "@/scenes/snaarp-slides/step25/Step25";
import { runStep25, STEP25_DURATION_MS } from "@/scenes/snaarp-slides/step25/script";
import { Step26 } from "@/scenes/snaarp-slides/step26/Step26";
import { runStep26, STEP26_DURATION_MS } from "@/scenes/snaarp-slides/step26/script";
import { Step27 } from "@/scenes/snaarp-slides/step27/Step27";
import { runStep27, STEP27_DURATION_MS } from "@/scenes/snaarp-slides/step27/script";
import { Step28 } from "@/scenes/snaarp-slides/step28/Step28";
import { runStep28, STEP28_DURATION_MS } from "@/scenes/snaarp-slides/step28/script";
import { Step29 } from "@/scenes/snaarp-slides/step29/Step29";
import { runStep29, STEP29_DURATION_MS } from "@/scenes/snaarp-slides/step29/script";
import { SLIDES_URLS } from "@/components/slides/slides-data";
import type { Tutorial } from "./types";

/**
 * Snaarp Slides ("How to use Snaarp Slides"): this round is the File menu. Recording: ref/slides/Snaarp_Slides_file.mp4
 * (1006x480, 3:48, git-ignored). Later rounds add Edit, View, Insert, Format, Slide, Arrange and Tools.
 * The completion card follows the last step in this list, so adding menus later moves it automatically.
 */
export const snaarpSlides: Tutorial = {
  product: { id: "snaarp-slides", name: "Snaarp Slides", logo: "presentation", aliases: ["slides", "presentation", "presentations", "deck", "powerpoint"] },
  steps: [
    {
      id: "open-slides",
      title: "Open Snaarp Slides",
      url: SLIDES_URLS.home,
      scene: { Component: Step1, run: runStep1, durationMs: STEP1_DURATION_MS },
    },
    {
      id: "blank-presentation",
      title: "Start a blank presentation",
      url: SLIDES_URLS.home,
      scene: { Component: Step2, run: runStep2, durationMs: STEP2_DURATION_MS },
    },
    {
      id: "meet-file-menu",
      title: "Meet the File menu",
      url: SLIDES_URLS.editor,
      scene: { Component: Step3, run: runStep3, durationMs: STEP3_DURATION_MS },
    },
    {
      id: "new",
      title: "Start something new",
      url: SLIDES_URLS.editor,
      scene: { Component: Step4, run: runStep4, durationMs: STEP4_DURATION_MS },
    },
    {
      id: "open",
      title: "Open a presentation",
      url: SLIDES_URLS.editor,
      scene: { Component: Step5, run: runStep5, durationMs: STEP5_DURATION_MS },
    },
    {
      id: "import",
      title: "Import slides",
      url: SLIDES_URLS.editor,
      scene: { Component: Step6, run: runStep6, durationMs: STEP6_DURATION_MS },
    },
    {
      id: "copy",
      title: "Make a copy",
      url: SLIDES_URLS.editor,
      scene: { Component: Step7, run: runStep7, durationMs: STEP7_DURATION_MS },
    },
    {
      id: "share",
      title: "Share your presentation",
      url: SLIDES_URLS.editor,
      scene: { Component: Step8, run: runStep8, durationMs: STEP8_DURATION_MS },
    },
    {
      id: "email",
      title: "Email the presentation",
      url: SLIDES_URLS.editor,
      scene: { Component: Step9, run: runStep9, durationMs: STEP9_DURATION_MS },
    },
    {
      id: "download",
      title: "Download in a format you need",
      url: SLIDES_URLS.editor,
      scene: { Component: Step10, run: runStep10, durationMs: STEP10_DURATION_MS },
    },
    {
      id: "rename",
      title: "Rename your presentation",
      url: SLIDES_URLS.editor,
      scene: { Component: Step11, run: runStep11, durationMs: STEP11_DURATION_MS },
    },
    {
      id: "move",
      title: "Move it to a folder",
      url: SLIDES_URLS.editor,
      scene: { Component: Step12, run: runStep12, durationMs: STEP12_DURATION_MS },
    },
    {
      id: "version-history",
      title: "Use version history",
      url: SLIDES_URLS.editor,
      scene: { Component: Step13, run: runStep13, durationMs: STEP13_DURATION_MS },
    },
    {
      id: "offline",
      title: "Make it available offline",
      url: SLIDES_URLS.editor,
      scene: { Component: Step14, run: runStep14, durationMs: STEP14_DURATION_MS },
    },
    {
      id: "details",
      title: "See the presentation details",
      url: SLIDES_URLS.editor,
      scene: { Component: Step15, run: runStep15, durationMs: STEP15_DURATION_MS },
    },
    {
      id: "page-setup",
      title: "Set the page size",
      url: SLIDES_URLS.editor,
      scene: { Component: Step16, run: runStep16, durationMs: STEP16_DURATION_MS },
    },
    {
      id: "print",
      title: "Print your presentation",
      url: SLIDES_URLS.editor,
      scene: { Component: Step17, run: runStep17, durationMs: STEP17_DURATION_MS },
    },
    {
      id: "unavailable",
      title: "Options that are not available yet",
      url: SLIDES_URLS.editor,
      scene: { Component: Step18, run: runStep18, durationMs: STEP18_DURATION_MS },
    },
    {
      id: "trash",
      title: "Move a presentation to Trash",
      url: SLIDES_URLS.editor,
      scene: { Component: Step19, run: runStep19, durationMs: STEP19_DURATION_MS },
    },
    {
      id: "undo-redo",
      title: "Undo and redo",
      url: SLIDES_URLS.renamed,
      scene: { Component: Step20, run: runStep20, durationMs: STEP20_DURATION_MS },
    },
    {
      id: "select-all",
      title: "Select all",
      url: SLIDES_URLS.renamed,
      scene: { Component: Step21, run: runStep21, durationMs: STEP21_DURATION_MS },
    },
    {
      id: "cut-copy-paste",
      title: "Cut, copy and paste",
      url: SLIDES_URLS.renamed,
      scene: { Component: Step22, run: runStep22, durationMs: STEP22_DURATION_MS },
    },
    {
      id: "duplicate-delete",
      title: "Duplicate and delete",
      url: SLIDES_URLS.renamed,
      scene: { Component: Step23, run: runStep23, durationMs: STEP23_DURATION_MS },
    },
    {
      id: "find-replace",
      title: "Find and replace",
      url: SLIDES_URLS.renamed,
      scene: { Component: Step24, run: runStep24, durationMs: STEP24_DURATION_MS },
    },
    {
      id: "speaker-notes",
      title: "Add speaker notes",
      url: SLIDES_URLS.renamed,
      scene: { Component: Step25, run: runStep25, durationMs: STEP25_DURATION_MS },
    },
    {
      id: "show-ruler",
      title: "Show the ruler",
      url: SLIDES_URLS.renamed,
      scene: { Component: Step26, run: runStep26, durationMs: STEP26_DURATION_MS },
    },
    {
      id: "show-guides",
      title: "Show guides",
      url: SLIDES_URLS.renamed,
      scene: { Component: Step27, run: runStep27, durationMs: STEP27_DURATION_MS },
    },
    {
      id: "zoom",
      title: "Change the zoom",
      url: SLIDES_URLS.renamed,
      scene: { Component: Step28, run: runStep28, durationMs: STEP28_DURATION_MS },
    },
    {
      id: "full-screen",
      title: "Present in full screen",
      url: SLIDES_URLS.renamed,
      scene: { Component: Step29, run: runStep29, durationMs: STEP29_DURATION_MS },
    },
  ],
  groups: [
    { title: "Getting started", from: "open-slides" },
    { title: "File", from: "meet-file-menu" },
    { title: "Edit", from: "undo-redo" },
    { title: "View", from: "speaker-notes" },
  ],
  completion: {
    text: "You know your way around Snaarp Slides and its File menu.",
  },
};
