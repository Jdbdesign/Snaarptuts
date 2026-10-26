import { Step1Home } from "@/scenes/snaarp-slides/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-slides/step1/script";
import { SLIDES_URLS } from "@/components/slides/slides-data";
import type { Tutorial } from "./types";

/**
 * Snaarp Slides ("How to use Snaarp Slides"): this round is the File menu. Recording: ref/slides/Snaarp_Slides_file.mp4
 * (1006x480, 3:48, git-ignored). Later rounds add Edit, View, Insert, Format, Slide, Arrange and Tools.
 */
export const snaarpSlides: Tutorial = {
  product: { id: "snaarp-slides", name: "Snaarp Slides", logo: "presentation", aliases: ["slides", "presentation", "presentations", "deck", "powerpoint"] },
  steps: [
    {
      id: "open-slides",
      title: "Open Snaarp Slides",
      url: SLIDES_URLS.home,
      scene: { Component: Step1Home, run: runStep1, durationMs: STEP1_DURATION_MS },
    },
  ],
  groups: [{ title: "Getting started", from: "open-slides" }],
  completion: {
    text: "You know how to start a presentation and use the File menu in Snaarp Slides.",
  },
};
