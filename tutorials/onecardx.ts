import { Step1 } from "@/scenes/onecardx/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/onecardx/step1/script";
import { Step2 } from "@/scenes/onecardx/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/onecardx/step2/script";
import { Step3 } from "@/scenes/onecardx/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/onecardx/step3/script";
import { Step4 } from "@/scenes/onecardx/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/onecardx/step4/script";
import { Step5 } from "@/scenes/onecardx/step5/Step5";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/onecardx/step5/script";
import { Step6 } from "@/scenes/onecardx/step6/Step6";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/onecardx/step6/script";
import { Step7 } from "@/scenes/onecardx/step7/Step7";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/onecardx/step7/script";
import { Step8 } from "@/scenes/onecardx/step8/Step8";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/onecardx/step8/script";
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
    {
      id: "switch-snaarp-apps",
      title: "Switch Snaarp apps",
      url: "onecardx.snaarp.com/home",
      scene: { Component: Step2, run: runStep2, durationMs: STEP2_DURATION_MS },
    },
    {
      id: "open-create-an-organization-card",
      title: "Open Create an Organization Card",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step3, run: runStep3, durationMs: STEP3_DURATION_MS },
    },
    {
      id: "read-the-card-list",
      title: "Read the card list",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step4, run: runStep4, durationMs: STEP4_DURATION_MS },
    },
    {
      id: "start-a-new-organization-card",
      title: "Start a new organization card",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step5, run: runStep5, durationMs: STEP5_DURATION_MS },
    },
    {
      id: "name-the-card",
      title: "Name the card",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step6, run: runStep6, durationMs: STEP6_DURATION_MS },
    },
    {
      id: "choose-the-card-type",
      title: "Choose the card type",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step7, run: runStep7, durationMs: STEP7_DURATION_MS },
    },
    {
      id: "pick-a-design",
      title: "Pick a design",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step8, run: runStep8, durationMs: STEP8_DURATION_MS },
    },
  ],
  completion: {
    title: "You're all set",
    text: "You've created your organization card. Next: how employees use it.",
  },
};
