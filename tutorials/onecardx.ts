import { Step1 } from "@/scenes/onecardx/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/onecardx/step1/script";
import type { Tutorial } from "./types";

export const onecardx: Tutorial = {
  product: {
    id: "onecardx",
    name: "OneCardX",
    railLabel: "One Card X",
    logo: "onecard",
    aliases: ["card", "id", "digital card", "business card", "onecardx"],
  },
  groups: [{ title: "Admin Card Creation", from: "your-onecardx-home" }],
  steps: [
    {
      id: "your-onecardx-home",
      title: "Your OneCardX home",
      url: "onecardx.snaarp.com/home",
      scene: { Component: Step1, run: runStep1, durationMs: STEP1_DURATION_MS },
    },
  ],
  completion: {
    title: "You're all set",
    text: "You've created your organization card. Next: how employees use it.",
  },
};
