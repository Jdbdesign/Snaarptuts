import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  hoverOn,
  pressOn,
  typeIntoVar,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";

export const STEP10_DURATION_MS = 13500;

export async function runStep10(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.companies, "companies", [0.45, 0.35], 10);

  // Beat 1: Intro to Companies search
  await tl.at(400);
  tl.showCaption("Discover companies by industry, size, or revenue.");
  await hoverOn(tl, "[data-tl=card-companies-saas]", { ms: 600 });
  await tl.wait(1200);

  // Beat 2: Click SaaS & Tech
  await tl.at(2600);
  tl.showCaption("Click SaaS & Tech to quickly explore software businesses.");
  await pressOn(tl, "[data-tl=card-companies-saas]", { ms: 600 });
  await tl.wait(1000);

  // Beat 3: Add Industry Filter
  await tl.at(5200);
  tl.showCaption("Filter companies by industry tags or custom keywords.");
  await pressOn(tl, "[data-tl=filter-industry-input]", { ms: 600 });
  await typeIntoVar(
    tl,
    "[data-tl=filter-industry-input]",
    "zeusCompaniesIndustryInput",
    "Technology",
    { msPerChar: 45 }
  );
  await tl.wait(600);

  // Beat 4: Click Search Companies
  await tl.at(8000);
  tl.showCaption("Click Search Companies to apply your criteria.");
  await pressOn(tl, "[data-tl=btn-search-companies]", { ms: 600 });
  await tl.wait(1000);

  // Beat 5: Review Results Table
  await tl.at(10500);
  tl.showCaption("Review verified company profiles with revenue and team size.");
  await hoverOn(tl, "[data-tl=company-row-brightwave]", { ms: 600 });
  await tl.wait(1200);

  // Finish
  await tl.at(12800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
