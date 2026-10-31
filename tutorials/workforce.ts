import { Step1 } from "@/scenes/workforce/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/workforce/step1/script";
import { Step2 } from "@/scenes/workforce/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/workforce/step2/script";
import { Step3 } from "@/scenes/workforce/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/workforce/step3/script";
import { Step4 } from "@/scenes/workforce/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/workforce/step4/script";
import { Step5 } from "@/scenes/workforce/step5/Step5";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/workforce/step5/script";
import { Step6 } from "@/scenes/workforce/step6/Step6";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/workforce/step6/script";
import { Step7 } from "@/scenes/workforce/step7/Step7";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/workforce/step7/script";
import { Step8 } from "@/scenes/workforce/step8/Step8";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/workforce/step8/script";
import { Step9 } from "@/scenes/workforce/step9/Step9";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/workforce/step9/script";
import { Step10 } from "@/scenes/workforce/step10/Step10";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/workforce/step10/script";
import { Step11 } from "@/scenes/workforce/step11/Step11";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/workforce/step11/script";
import { Step12 } from "@/scenes/workforce/step12/Step12";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/workforce/step12/script";
import { Step13 } from "@/scenes/workforce/step13/Step13";
import { runStep13, STEP13_DURATION_MS } from "@/scenes/workforce/step13/script";
import { Step14 } from "@/scenes/workforce/step14/Step14";
import { runStep14, STEP14_DURATION_MS } from "@/scenes/workforce/step14/script";
import { Step15 } from "@/scenes/workforce/step15/Step15";
import { runStep15, STEP15_DURATION_MS } from "@/scenes/workforce/step15/script";
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
    {
      id: "tasks-requests",
      title: "Your tasks and requests",
      url: "workforce.snaarp.com/dashboard",
      scene: { Component: Step3, run: runStep3, durationMs: STEP3_DURATION_MS },
    },
    {
      id: "next-announcements",
      title: "Next 7 days and Announcements",
      url: "workforce.snaarp.com/dashboard",
      scene: { Component: Step4, run: runStep4, durationMs: STEP4_DURATION_MS },
    },
    {
      id: "notifications",
      title: "Notifications",
      url: "workforce.snaarp.com/dashboard",
      scene: { Component: Step5, run: runStep5, durationMs: STEP5_DURATION_MS },
    },
    {
      id: "top-bar-tools",
      title: "Top bar tools",
      url: "workforce.snaarp.com/dashboard",
      scene: { Component: Step6, run: runStep6, durationMs: STEP6_DURATION_MS },
    },
    {
      id: "navigation-sidebar",
      title: "Find your way around",
      url: "workforce.snaarp.com/dashboard",
      scene: { Component: Step7, run: runStep7, durationMs: STEP7_DURATION_MS },
    },
    {
      id: "my-space-overview",
      title: "My Space",
      url: "workforce.snaarp.com/dashboard",
      scene: { Component: Step8, run: runStep8, durationMs: STEP8_DURATION_MS },
    },
    {
      id: "attendance-timer",
      title: "Today's attendance",
      url: "workforce.snaarp.com/my-space",
      scene: { Component: Step9, run: runStep9, durationMs: STEP9_DURATION_MS },
    },
    {
      id: "activity-payslips",
      title: "Activity",
      url: "workforce.snaarp.com/my-space",
      scene: { Component: Step10, run: runStep10, durationMs: STEP10_DURATION_MS },
    },
    {
      id: "my-onboarding",
      title: "My onboarding",
      url: "workforce.snaarp.com/my-space",
      scene: { Component: Step11, run: runStep11, durationMs: STEP11_DURATION_MS },
    },
    {
      id: "onboarding-record",
      title: "Open an onboarding record",
      url: "workforce.snaarp.com/my-space/onboarding",
      scene: { Component: Step12, run: runStep12, durationMs: STEP12_DURATION_MS },
    },
    {
      id: "onboarding-checklist",
      title: "Checklist",
      url: "workforce.snaarp.com/my-space/onboarding/records/rec-001",
      scene: { Component: Step13, run: runStep13, durationMs: STEP13_DURATION_MS },
    },
    {
      id: "onboarding-documents",
      title: "Documents tab",
      url: "workforce.snaarp.com/my-space/onboarding/records/rec-001",
      scene: { Component: Step14, run: runStep14, durationMs: STEP14_DURATION_MS },
    },
    {
      id: "onboarding-activity",
      title: "Activity tab",
      url: "workforce.snaarp.com/my-space/onboarding/records/rec-001",
      scene: { Component: Step15, run: runStep15, durationMs: STEP15_DURATION_MS },
    },
  ],
  completion: {
    title: "You're all set",
    text: "You now know how to navigate the Workforce Dashboard, My Space, Onboarding and Profile.",
  },
};
