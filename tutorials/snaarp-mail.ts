import { Step1Pricing } from "@/scenes/snaarp-mail/Step1Pricing";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-mail/step1-script";
import { Step2Signup } from "@/scenes/snaarp-mail/Step2Signup";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/snaarp-mail/step2-script";
import { Step3Organization } from "@/scenes/snaarp-mail/Step3Organization";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/snaarp-mail/step3-script";
import { Step4Domain } from "@/scenes/snaarp-mail/Step4Domain";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/snaarp-mail/step4-script";
import { Step5Dns } from "@/scenes/snaarp-mail/Step5Dns";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/snaarp-mail/step5-script";
import { Step6Cloudflare } from "@/scenes/snaarp-mail/Step6Cloudflare";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/snaarp-mail/step6-script";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/snaarp-mail/step7-script";
import { Step8Users } from "@/scenes/snaarp-mail/Step8Users";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/snaarp-mail/step8-script";
import type { Tutorial } from "./types";

/**
 * Snaarp Mail: "How to set up Snaarp Mail". Nine steps; steps 1-7 are built, the rest show as
 * "Coming soon". Recording: ref/mail/Snaarp_Mail_setup.mp4 (998x480, 3:05, git-ignored).
 * URL pills of steps 2-5 and 7-9 are placeholders because the address bar is not visible in the recording.
 */
export const snaarpMail: Tutorial = {
  product: { id: "snaarp-mail", name: "Snaarp Mail", logo: "mail" },
  steps: [
    {
      id: "choose-plan",
      title: "Choose your plan",
      url: "snaarp.com/pricing",
      scene: { Component: Step1Pricing, run: runStep1, durationMs: STEP1_DURATION_MS },
    },
    {
      id: "create-account",
      title: "Create your account",
      url: "login.snaarp.com/signup",
      scene: { Component: Step2Signup, run: runStep2, durationMs: STEP2_DURATION_MS },
    },
    {
      id: "organization",
      title: "Tell us about your organization",
      url: "login.snaarp.com/onboarding/organization",
      scene: { Component: Step3Organization, run: runStep3, durationMs: STEP3_DURATION_MS },
    },
    {
      id: "connect-domain",
      title: "Connect your domain",
      url: "login.snaarp.com/onboarding/domain",
      scene: { Component: Step4Domain, run: runStep4, durationMs: STEP4_DURATION_MS },
    },
    {
      id: "review-dns",
      title: "Review your DNS records",
      url: "login.snaarp.com/onboarding/dns",
      scene: { Component: Step5Dns, run: runStep5, durationMs: STEP5_DURATION_MS },
    },
    {
      id: "add-records",
      title: "Add the records in Cloudflare",
      url: "dash.cloudflare.com/acme-studio.com/dns/records",
      scene: { Component: Step6Cloudflare, run: runStep6, durationMs: STEP6_DURATION_MS },
    },
    {
      id: "confirm-records",
      title: "Confirm the records",
      url: "login.snaarp.com/onboarding/dns",
      // The same DNS Mapping page as step 5, played with the cards being marked as submitted.
      scene: { Component: Step5Dns, run: runStep7, durationMs: STEP7_DURATION_MS },
    },
    {
      id: "add-team",
      title: "Add your team",
      url: "login.snaarp.com/onboarding/users",
      scene: { Component: Step8Users, run: runStep8, durationMs: STEP8_DURATION_MS },
    },
    { id: "finish", title: "Finish setup", url: "login.snaarp.com/onboarding/complete" },
  ],
  completion: {
    title: "You're all set",
    text: "Snaarp Mail is ready for your team.",
  },
};
