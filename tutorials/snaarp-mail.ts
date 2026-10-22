import { Step1Pricing } from "@/scenes/snaarp-mail/Step1Pricing";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-mail/step1-script";
import { Step2Signup } from "@/scenes/snaarp-mail/Step2Signup";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/snaarp-mail/step2-script";
import type { Tutorial } from "./types";

/**
 * Snaarp Mail: "How to set up Snaarp Mail". Nine steps; steps 1-2 are built, the rest show as
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
    { id: "organization", title: "Tell us about your organization", url: "login.snaarp.com/onboarding/organization" },
    { id: "connect-domain", title: "Connect your domain", url: "login.snaarp.com/onboarding/domain" },
    { id: "review-dns", title: "Review your DNS records", url: "login.snaarp.com/onboarding/dns" },
    { id: "add-records", title: "Add the records in Cloudflare", url: "dash.cloudflare.com/acme-studio.com/dns/records" },
    { id: "confirm-records", title: "Confirm the records", url: "login.snaarp.com/onboarding/dns" },
    { id: "add-team", title: "Add your team", url: "login.snaarp.com/onboarding/users" },
    { id: "finish", title: "Finish setup", url: "login.snaarp.com/onboarding/complete" },
  ],
  completion: {
    title: "You're all set",
    text: "Snaarp Mail is ready for your team.",
  },
};
