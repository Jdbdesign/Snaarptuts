import type { LogoName } from "@/components/icons";

export const PRODUCT_TABS: { id: LogoName; label: string }[][] = [
  [
    { id: "360", label: "360" },
    { id: "mail", label: "Mail" },
    { id: "me", label: "Me" },
    { id: "workforce", label: "Workforce" },
    { id: "projects", label: "Projects" },
    { id: "drive", label: "Drive" },
    { id: "lock", label: "Lock" },
    { id: "sendrit", label: "Sendrit" },
    { id: "verifyrit", label: "Verifyrit" },
    { id: "crm", label: "CRM" },
  ],
  [
    { id: "zeus", label: "Zeus" },
    { id: "books", label: "Books" },
    { id: "onecard", label: "One card x" },
    { id: "pdf", label: "PDF" },
    { id: "sign", label: "Sign" },
  ],
];

/** The 17 product icons shown in each plan card (as on the Snaarp website). */
export const PLAN_ICONS: LogoName[] = [
  "360", "mail", "drive", "lock", "sheet", "presentation",
  "teams", "meet", "crm", "books", "me", "pdf",
  "onecard", "workforce", "projects", "docs", "sign",
];

export type Plan = {
  id: string;
  name: string;
  price: number;
  total: string;
  storage: string;
  team: number;
  features: string[];
  popular?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "team",
    name: "Team",
    price: 49,
    total: "588",
    storage: "10 GB",
    team: 1,
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
    price: 99,
    total: "1,188",
    storage: "600 GB",
    team: 10,
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
    price: 249,
    total: "2,988",
    storage: "2.5 TB",
    team: 30,
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
    price: 499,
    total: "5,988",
    storage: "5 TB",
    team: 100,
    features: [
      "5TB Shared Storage",
      "Centralised administrative control",
      "Single sign-on",
      "Future Products Eligibility",
    ],
  },
];
