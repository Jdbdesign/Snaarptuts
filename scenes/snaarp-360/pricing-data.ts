import { plans360 } from "@/components/pricing/plans-360";
import type { PricingData } from "@/components/pricing/pricing-types";
import { formatGBP, planPrice } from "@/lib/money";

/** Monthly prices of the four Snaarp 360 plans, in pounds. The Mail tutorial's 360 tab uses the same ones. */
export const MONTHLY_360 = { team: 49, business: 99, scale: 249, growth: 499 };

/** The 360 plan prices as the page shows them: whole pounds, with the 12-month total. */
export const PRICES_360 = {
  team: planPrice(MONTHLY_360.team, { whole: true }),
  business: planPrice(MONTHLY_360.business, { whole: true }),
  scale: planPrice(MONTHLY_360.scale, { whole: true }),
  growth: planPrice(MONTHLY_360.growth, { whole: true }),
};

/** The plan chosen in the 360 tutorial, as text: "£99". */
export const BUSINESS_PRICE_360 = formatGBP(MONTHLY_360.business, { whole: true });

/** Snaarp 360 pricing page: prices in pounds. */
export const PRICING_360: PricingData = {
  currency: { kind: "global" },
  initialTab: "360",
  plansByTab: {
    "360": plans360(PRICES_360),
  },
};
