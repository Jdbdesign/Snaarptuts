import { Step1Pricing } from "@/scenes/snaarp-360/Step1Pricing";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-360/step1-script";
import { Step2Signup } from "@/scenes/snaarp-360/Step2Signup";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/snaarp-360/step2-script";
import { Step3Admin } from "@/scenes/snaarp-360/Step3Admin";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/snaarp-360/step3-script";
import { Step4Domains } from "@/scenes/snaarp-360/Step4Domains";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/snaarp-360/step4-script";
import { Step5Users } from "@/scenes/snaarp-360/Step5Users";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/snaarp-360/step5-script";
import type { Tutorial } from "./types";

/** Steps without a `scene` appear in the rail as "Coming soon". */
export const snaarp360: Tutorial = {
  product: { id: "snaarp-360", name: "Snaarp 360", logo: "360", aliases: ["snaarp360"] },
  steps: [
    {
      id: "choose-plan",
      title: "Choose your plan",
      url: "snaarp.com/pricing#pricing",
      scene: { Component: Step1Pricing, run: runStep1, durationMs: STEP1_DURATION_MS },
    },
    {
      id: "create-account",
      title: "Create your account",
      url: "login.snaarp.com/signup?subscriptionPlanId=117&plan=Business&billing=monthly&price=99&currency=GBP",
      scene: { Component: Step2Signup, run: runStep2, durationMs: STEP2_DURATION_MS },
    },
    {
      id: "sign-in-admin",
      title: "Sign in to Admin",
      url: "login.snaarp.com/products",
      scene: { Component: Step3Admin, run: runStep3, durationMs: STEP3_DURATION_MS },
    },
    {
      id: "add-domain",
      title: "Add and verify your domain",
      url: "admin.snaarp.com/admin/domains",
      scene: { Component: Step4Domains, run: runStep4, durationMs: STEP4_DURATION_MS },
    },
    {
      id: "add-user",
      title: "Add your first user",
      url: "admin.snaarp.com/admin/domains", // starts where step 4 ended; the scene changes it as it goes
      scene: { Component: Step5Users, run: runStep5, durationMs: STEP5_DURATION_MS },
    },
  ],
  completion: {
    title: "You're all set",
    text: "Snaarp 360 is ready for your team.",
    replayLabel: "Replay tutorial",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
