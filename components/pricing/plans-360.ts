import type { Plan, PlanIcon } from "./pricing-types";

/** The 17 products every Snaarp 360 plan includes (the set shown on the Snaarp website). */
export const ICONS_360: PlanIcon[] = [
  "360", "mail", "drive", "lock", "sheet", "presentation",
  "teams", "meet", "crm", "books", "me", "pdf",
  "onecard", "workforce", "projects", "docs", "sign",
];

export type Price = { price: string; total: string };

/**
 * The four Snaarp 360 plans (Team, Business, Scale, Growth). Storage, team sizes, features and icons
 * are the same everywhere; only the prices change with the currency, so each page passes its own.
 */
export function plans360(prices: { team: Price; business: Price; scale: Price; growth: Price }): Plan[] {
  return [
    {
      id: "team",
      name: "Team",
      ...prices.team,
      storage: "10 GB",
      headline: "Team Size 1",
      icons: ICONS_360,
      features: [
        "10GB Shared Storage",
        "Single sign-on",
        "Future Products Eligibility",
        "Centralised administrative control",
      ],
    },
    {
      id: "business",
      name: "Business",
      ...prices.business,
      storage: "600 GB",
      headline: "Team Size 10",
      icons: ICONS_360,
      popular: true,
      features: [
        "Future Products Eligibility",
        "Centralised administrative control",
        "600GB Shared Storage",
        "Single sign-on",
      ],
    },
    {
      id: "scale",
      name: "Scale",
      ...prices.scale,
      storage: "2.5 TB",
      headline: "Team Size 30",
      icons: ICONS_360,
      features: [
        "2.5TB Shared Storage",
        "Single sign-on",
        "Centralised administrative control",
        "Future Products Eligibility",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      ...prices.growth,
      storage: "5 TB",
      headline: "Team Size 100",
      icons: ICONS_360,
      features: [
        "5TB Shared Storage",
        "Centralised administrative control",
        "Single sign-on",
        "Future Products Eligibility",
      ],
    },
  ];
}
