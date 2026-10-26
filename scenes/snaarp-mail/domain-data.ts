/*
 * Snaarp Mail, step 4 - "Connect your domain" (three screens inside the Domain item of OnboardingShell).
 * All copy, sample values and captions live here so they can be edited without touching the layout
 * (Step4Domain.tsx, domain/*.tsx) or the script (step4-script.ts). Wording follows ref/mail/frames-step4.
 */

import { formatGBP } from "@/lib/money";

export const BRAND = "Snaarp";

export const CHOOSE = {
  heading: "Connect your domain",
  text: "Connect your existing domain or get a new one. Your domain is your business identity.",
  existing: {
    title: "Use existing domain",
    text: "Connect a domain you already own",
    checks: ["Connect your current domain", "Free domain verification", "DNS configuration assistance", "No additional cost"],
  },
  buy: {
    badge: "Coming soon",
    title: "Buy new domain",
    text: "Get a custom domain through Snaarp",
    checks: ["Search and register new domain", "Free privacy protection", "Auto-renewal available", `Prices starting at ${formatGBP(10, { whole: true })}/year`],
  },
  add: "Add Domain",
};

export const ENTER = {
  heading: "Welcome to Snaarp",
  text: "Add a domain you already have to continue your account setup",
  label: "Enter Domain Name",
  placeholder: "mydomain.com",
  add: "Add New Domain",
  cancel: "Cancel",
};

export const SUCCESS = {
  /** `{domain}` is replaced with the domain in capitals. */
  title: "Congratulations! Your domain “{domain}” added successfully",
  text: "Your Snaarp business email account is ready. You'll be redirected to setup your organization.",
  proceed: "Proceed to Domain Verification",
};

/** Sample data only. */
export const SAMPLE = { domain: "acme-studio.com" };

export const CAPTIONS = {
  choose: "Choose Use existing domain. You will connect a domain you already own",
  enter: "Enter your domain without www",
  add: "Click Add New Domain",
  added: "Your domain is added",
  proceed: "Click Proceed to Domain Verification",
};
