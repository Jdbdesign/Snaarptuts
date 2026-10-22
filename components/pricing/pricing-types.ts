import type { LogoName } from "@/components/icons";

/** "soon" draws the faint outline shield the real pricing page shows at the end of some icon rows. */
export type PlanIcon = LogoName | "soon";

export type Plan = {
  id: string;
  name: string;
  /** Formatted with its currency sign, e.g. "£99" or "₦89,170.35". */
  price: string;
  /** Total for 12 months, formatted with its currency sign. */
  total: string;
  storage: string;
  /** The bold first line of the checklist ("Team Size 10", "25 Users"). */
  headline: string;
  features: string[];
  icons: PlanIcon[];
  /** How the product icons are drawn. Default: a grid of 6, 32px. */
  iconLayout?: { layout: "grid" | "row"; size: number };
  popular?: boolean;
};

/** Everything that changes between one product's pricing page and another's. */
export type PricingData = {
  /** Right side of the nav, next to Login: a "Global" selector or a country + currency code. */
  currency: { kind: "global" } | { kind: "code"; flag: string; code: string };
  /** Product tab that is selected when the page loads. */
  initialTab: string;
  /** Plan cards by product tab id. A tab with no entry keeps showing the initial tab's cards. */
  plansByTab: Record<string, Plan[]>;
  /** Show the cards at once instead of sliding them up when the scripted tab click happens. */
  cardsVisibleAtStart?: boolean;
  /** Scroll position (design px) the page starts at. */
  startScroll?: number;
};

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
