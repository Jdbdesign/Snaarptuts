import { Step1 } from "@/scenes/workforce/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/workforce/step1/script";
import { Step2 } from "@/scenes/workforce/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/workforce/step2/script";
import type { Tutorial } from "./types";

export const workforce: Tutorial = {
  product: {
    id: "workforce",
    name: "Workforce",
    railLabel: "Workforce Tutorial",
    logo: "workforce",
    aliases: ["hr", "dashboard", "onboarding", "profile"],
  },
  groups: [{ title: "Dashboard & My Space", from: "welcome" }],
  steps: [
    {
      id: "welcome",
      title: "Welcome to Workforce",
      url: "workforce.snaarp.com/dashboard",
      scene: { Component: Step1, run: runStep1, durationMs: STEP1_DURATION_MS },
    },
    {
      id: "overview-cards",
      title: "Your overview cards",
      url: "workforce.snaarp.com/dashboard",
      scene: { Component: Step2, run: runStep2, durationMs: STEP2_DURATION_MS },
    },
  ],
  completion: {
    title: "You're all set",
    text: "You now know how to navigate the Workforce Dashboard, My Space, Onboarding and Profile.",
  },
};
