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
import { Step16 } from "@/scenes/workforce/step16/Step16";
import { runStep16, STEP16_DURATION_MS } from "@/scenes/workforce/step16/script";
import { Step17 } from "@/scenes/workforce/step17/Step17";
import { runStep17, STEP17_DURATION_MS } from "@/scenes/workforce/step17/script";
import { Step18 } from "@/scenes/workforce/step18/Step18";
import { runStep18, STEP18_DURATION_MS } from "@/scenes/workforce/step18/script";
import { Step19 } from "@/scenes/workforce/step19/Step19";
import { runStep19, STEP19_DURATION_MS } from "@/scenes/workforce/step19/script";
import { Step20 } from "@/scenes/workforce/step20/Step20";
import { runStep20, STEP20_DURATION_MS } from "@/scenes/workforce/step20/script";
import { Step21 } from "@/scenes/workforce/step21/Step21";
import { runStep21, STEP21_DURATION_MS } from "@/scenes/workforce/step21/script";
import { Step22 } from "@/scenes/workforce/step22/Step22";
import { runStep22, STEP22_DURATION_MS } from "@/scenes/workforce/step22/script";
import { Step23 } from "@/scenes/workforce/step23/Step23";
import { runStep23, STEP23_DURATION_MS } from "@/scenes/workforce/step23/script";
import { Step24 } from "@/scenes/workforce/step24/Step24";
import { runStep24, STEP24_DURATION_MS } from "@/scenes/workforce/step24/script";
import { Step25 } from "@/scenes/workforce/step25/Step25";
import { runStep25, STEP25_DURATION_MS } from "@/scenes/workforce/step25/script";
import { Step26 } from "@/scenes/workforce/step26/Step26";
import { runStep26, STEP26_DURATION_MS } from "@/scenes/workforce/step26/script";
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
    {
      id: "my-profile",
      title: "My Profile",
      url: "workforce.snaarp.com/my-space",
      scene: { Component: Step16, run: runStep16, durationMs: STEP16_DURATION_MS },
    },
    {
      id: "edit-contact-details",
      title: "Edit contact details",
      url: "workforce.snaarp.com/my-space/profile",
      scene: { Component: Step17, run: runStep17, durationMs: STEP17_DURATION_MS },
    },
    {
      id: "salary-advances",
      title: "Salary advances",
      url: "workforce.snaarp.com/my-space/salary-advances",
      scene: { Component: Step18, run: runStep18, durationMs: STEP18_DURATION_MS },
    },
    {
      id: "advance-details",
      title: "Advance details",
      url: "workforce.snaarp.com/my-space/salary-advances",
      scene: { Component: Step19, run: runStep19, durationMs: STEP19_DURATION_MS },
    },
    {
      id: "resignation",
      title: "Resignation",
      url: "workforce.snaarp.com/my-space/resignation",
      scene: { Component: Step20, run: runStep20, durationMs: STEP20_DURATION_MS },
    },
    {
      id: "exit-tasks",
      title: "Exit tasks",
      url: "workforce.snaarp.com/my-space/exit-tasks",
      scene: { Component: Step21, run: runStep21, durationMs: STEP21_DURATION_MS },
    },
    {
      id: "holidays",
      title: "Holidays",
      url: "workforce.snaarp.com/organization/holidays",
      scene: { Component: Step22, run: runStep22, durationMs: STEP22_DURATION_MS },
    },
    {
      id: "my-hr-cases",
      title: "My HR cases",
      url: "workforce.snaarp.com/hr-cases",
      scene: { Component: Step23, run: runStep23, durationMs: STEP23_DURATION_MS },
    },
    {
      id: "submit-grievance",
      title: "Submit a grievance",
      url: "workforce.snaarp.com/hr-cases",
      scene: { Component: Step24, run: runStep24, durationMs: STEP24_DURATION_MS },
    },
    {
      id: "check-out",
      title: "Check out",
      url: "workforce.snaarp.com/attendance",
      scene: { Component: Step25, run: runStep25, durationMs: STEP25_DURATION_MS },
    },
    {
      id: "attendance-calendar",
      title: "Attendance calendar",
      url: "workforce.snaarp.com/attendance",
      scene: { Component: Step26, run: runStep26, durationMs: STEP26_DURATION_MS },
    },
  ],
  completion: {
    title: "You're all set",
    text: "You now know how to navigate the Workforce Dashboard, My Space, Salary advances, Resignation, Exit tasks, Holidays and HR cases.",
  },
};
