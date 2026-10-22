"use client";

import { PricingScene } from "@/components/pricing/PricingScene";
import type { SceneProps } from "@/tutorials/types";
import { PRICING_MAIL } from "./pricing-data";

/** Snaarp Mail, step 1 - Choose your plan. The page itself is the shared PricingScene. */
export function Step1Pricing({ tl }: SceneProps) {
  return <PricingScene tl={tl} data={PRICING_MAIL} />;
}
