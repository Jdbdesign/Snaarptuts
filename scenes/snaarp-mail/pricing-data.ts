import { plans360 } from "@/components/pricing/plans-360";
import type { Plan, PricingData } from "@/components/pricing/pricing-types";
import { planPrice } from "@/lib/money";
import { MONTHLY_360 } from "../snaarp-360/pricing-data";

/*
 * Snaarp pricing page as the Mail tutorial shows it: prices in pounds (pence shown, as on the live page),
 * "GB GBP" in the nav. The plans, storage and features come from the recording (frames in ref/mail/frames-step1);
 * the prices are UK sample values. The 360 tab is the page the tutorial starts on; it uses the same 360 plans
 * and monthly prices as the 360 tutorial.
 */

/** Monthly prices of the four Mail plans, in pounds. */
export const MONTHLY_MAIL = { starter: 5, growth: 25, business: 50, scale: 100 };

const MAIL_FEATURES_BY_ORDER = {
  standard: ["Business Emails", "Migration Assistance", "Mobile App", "Bulk Registration", "Admin Dashboard"],
  business: ["Business Emails", "Migration Assistance", "Bulk Registration", "Admin Dashboard", "Mobile App"],
};

/** Mail cards list a few products in a single row of small logos. */
const ROW = { layout: "row", size: 24 } as const;

const MAIL_PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    ...planPrice(MONTHLY_MAIL.starter),
    storage: "10 GB",
    headline: "10 Users",
    features: ["10 GB Shared Space", ...MAIL_FEATURES_BY_ORDER.standard],
    icons: ["mail", "drive"],
    iconLayout: ROW,
  },
  {
    id: "growth",
    name: "Growth",
    ...planPrice(MONTHLY_MAIL.growth),
    storage: "100 GB",
    headline: "25 Users",
    features: ["100 GB Shared Space", ...MAIL_FEATURES_BY_ORDER.standard],
    icons: ["mail", "drive", "sheet", "presentation", "soon"],
    iconLayout: ROW,
  },
  {
    id: "business",
    name: "Business",
    ...planPrice(MONTHLY_MAIL.business),
    storage: "600 GB",
    headline: "25 users",
    features: ["600 GB shared space", ...MAIL_FEATURES_BY_ORDER.business],
    icons: ["mail", "drive", "lock", "sheet", "presentation", "meet", "soon"],
    iconLayout: ROW,
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    ...planPrice(MONTHLY_MAIL.scale),
    storage: "2.5 TB",
    headline: "50 users",
    features: ["2.5 TB shared space", ...MAIL_FEATURES_BY_ORDER.standard],
    icons: ["mail", "drive", "lock", "presentation", "teams", "meet", "pdf", "soon"],
    iconLayout: ROW,
  },
];

export const PRICING_MAIL: PricingData = {
  currency: { kind: "code", flag: "GB", code: "GBP" },
  initialTab: "360",
  cardsVisibleAtStart: true,
  startScroll: 408, // tab bar just under the nav, as in the recording
  plansByTab: {
    "360": plans360({
      team: planPrice(MONTHLY_360.team),
      business: planPrice(MONTHLY_360.business),
      scale: planPrice(MONTHLY_360.scale),
      growth: planPrice(MONTHLY_360.growth),
    }),
    mail: MAIL_PLANS,
  },
};
