import { plans360 } from "@/components/pricing/plans-360";
import type { PricingData } from "@/components/pricing/pricing-types";

/** Snaarp 360 pricing page: prices in pounds. */
export const PRICING_360: PricingData = {
  currency: { kind: "global" },
  initialTab: "360",
  plansByTab: {
    "360": plans360({
      team: { price: "£49", total: "£588" },
      business: { price: "£99", total: "£1,188" },
      scale: { price: "£249", total: "£2,988" },
      growth: { price: "£499", total: "£5,988" },
    }),
  },
};
