import { plans360 } from "@/components/pricing/plans-360";
import type { Plan, PricingData } from "@/components/pricing/pricing-types";

/*
 * Snaarp pricing page as the Mail tutorial shows it: prices in naira (₦), "NG NGN" in the nav.
 * The Mail tab values come from the recording (frames in ref/mail/frames-step1). The 360 tab is the page
 * the tutorial starts on; it uses the same 360 plans as the 360 tutorial, with naira prices.
 */

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
    price: "₦8,917.03",
    total: "₦107,004.42",
    storage: "10 GB",
    headline: "10 Users",
    features: ["10 GB Shared Space", ...MAIL_FEATURES_BY_ORDER.standard],
    icons: ["mail", "drive"],
    iconLayout: ROW,
  },
  {
    id: "growth",
    name: "Growth",
    price: "₦44,585.17",
    total: "₦535,022.08",
    storage: "100 GB",
    headline: "25 Users",
    features: ["100 GB Shared Space", ...MAIL_FEATURES_BY_ORDER.standard],
    icons: ["mail", "drive", "sheet", "presentation", "soon"],
    iconLayout: ROW,
  },
  {
    id: "business",
    name: "Business",
    price: "₦89,170.35",
    total: "₦1,070,044.16",
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
    price: "₦178,340.69",
    total: "₦2,140,088.32",
    storage: "2.5 TB",
    headline: "50 users",
    features: ["2.5 TB shared space", ...MAIL_FEATURES_BY_ORDER.standard],
    icons: ["mail", "drive", "lock", "presentation", "teams", "meet", "pdf", "soon"],
    iconLayout: ROW,
  },
];

export const PRICING_MAIL: PricingData = {
  currency: { kind: "code", flag: "NG", code: "NGN" },
  initialTab: "360",
  cardsVisibleAtStart: true,
  startScroll: 408, // tab bar just under the nav, as in the recording
  plansByTab: {
    "360": plans360({
      team: { price: "₦87,386.94", total: "₦1,048,643.28" },
      business: { price: "₦176,557.29", total: "₦2,118,687.44" },
      scale: { price: "₦444,068.33", total: "₦5,328,819.92" },
      growth: { price: "₦889,920.06", total: "₦10,679,040.73" },
    }),
    mail: MAIL_PLANS,
  },
};
