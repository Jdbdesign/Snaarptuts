import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  hoverOn,
  pressOn,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";

export const STEP11_DURATION_MS = 12000;

export async function runStep11(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.companies, "companies", [0.45, 0.35], 11);
  tl.setVar("zeusCompaniesResults", true);
  tl.setVar("zeusCompaniesFilterTags", ["SaaS", "Technology"]);

  // Beat 1: Open company row
  await tl.at(400);
  tl.showCaption("Click Brightwave Systems GmbH to view detailed insights.");
  await pressOn(tl, "[data-tl=company-row-brightwave]", { ms: 600 });
  await tl.wait(1200);

  // Beat 2: Inspect company metrics
  await tl.at(3000);
  tl.showCaption("Inspect key business metrics, employee count, and website.");
  await hoverOn(tl, "[data-tl=drawer-company-name]", { ms: 600 });
  await tl.wait(1400);

  // Beat 3: View people
  await tl.at(5800);
  tl.showCaption("View key decision makers and verified employees.");
  await hoverOn(tl, "[data-tl=company-person-0]", { ms: 600 });
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=company-person-1]", { ms: 400 });
  await tl.wait(800);

  // Beat 4: Close drawer
  await tl.at(8800);
  tl.showCaption("Click the close button to return to search results.");
  await pressOn(tl, "[data-tl=btn-close-company-drawer]", { ms: 600 });
  await tl.wait(1000);

  // Finish
  await tl.at(11200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
