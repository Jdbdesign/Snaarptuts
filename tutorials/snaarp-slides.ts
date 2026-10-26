import { Step1 } from "@/scenes/snaarp-slides/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-slides/step1/script";
import { Step2 } from "@/scenes/snaarp-slides/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/snaarp-slides/step2/script";
import { Step3 } from "@/scenes/snaarp-slides/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/snaarp-slides/step3/script";
import { Step4 } from "@/scenes/snaarp-slides/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/snaarp-slides/step4/script";
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
  ],
  groups: [
    { title: "Getting started", from: "open-slides" },
    { title: "File", from: "meet-file-menu" },
  ],
  completion: {
    text: "You know your way around Snaarp Slides and its File menu.",
  },
};
