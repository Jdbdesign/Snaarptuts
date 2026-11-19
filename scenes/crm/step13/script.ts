import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn, pushCrmToast } from "@/components/crm/crm-timeline";

export const STEP13_DURATION_MS = 25000;

export async function runStep13(tl: Timeline) {
  beginCrm(tl, "crm-forecasts", {
    activeNav: "forecasts",
    salesOpen: true,
    forecastTab: "pipeline",
    targets: [],
  });

  // Beat 1: Weighted Pipeline overview
  await tl.at(400);
  tl.showCaption("Navigate to Sales Forecasting to view revenue projections based on deal stages and probabilities.");
  await hoverOn(tl, "[data-tl=crm-forecast-kpis]", { ms: 600 });
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=crm-forecast-stages]", { ms: 600 });
  await tl.wait(1000);

  // Beat 2: By Rep tab
  await tl.at(4000);
  tl.showCaption("Switch to By Rep to inspect pipeline distribution, won deals, and individual quotas across your team.");
  await pressOn(tl, "[data-tl=crm-forecast-tab-by-rep]", { ms: 600 });
  tl.setVar("crm:forecastTab", "by-rep");
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=crm-forecast-reps-table]", { ms: 700 });
  await tl.wait(1200);

  // Beat 3: Targets tab (empty state)
  await tl.at(8000);
  tl.showCaption("View sales targets. When no target is configured, you can set one for your organization or team members.");
  await pressOn(tl, "[data-tl=crm-forecast-tab-targets]", { ms: 600 });
  tl.setVar("crm:forecastTab", "targets");
  await tl.wait(1200);

  // Beat 4: Click Create a Target
  await tl.at(11000);
  tl.showCaption("Click Create a Target to establish a new monthly revenue goal.");
  await pressOn(tl, "[data-tl=crm-target-empty-create-btn]", { ms: 600 });
  tl.setVar("crm:isNewTargetOpen", true);
  await tl.wait(800);

  // Beat 5: Enter Revenue Target
  await tl.at(13500);
  tl.showCaption("Enter a £20,000 monthly revenue target for November 2026.");
  await pressOn(tl, "[data-tl=crm-target-rev-input]", { ms: 500 });
  await tl.typeText("crm_target_rev", "20000", { msPerChar: 40 });
  await tl.wait(600);

  // Beat 6: Click Create Target
  await tl.at(16500);
  tl.showCaption("Click Create Target to save and track your target against incoming pipeline revenue.");
  await pressOn(tl, "[data-tl=crm-target-create-btn]", { ms: 600 });
  tl.setVar("crm:targets", [
    {
      id: "target-1",
      scope: "Organization",
      period: "Monthly 2026 · M11",
      revenueTarget: "£20.0k",
      dealTarget: "—",
    },
  ]);
  tl.setVar("crm:isNewTargetOpen", false);
  pushCrmToast(tl, "Sales target created");
  await tl.wait(1400);

  // Beat 7: Pipeline Risk tab
  await tl.at(19500);
  tl.showCaption("Inspect Pipeline Risk to identify stale deals and opportunities that require urgent sales intervention.");
  await pressOn(tl, "[data-tl=crm-forecast-tab-pipeline-risk]", { ms: 600 });
  tl.setVar("crm:forecastTab", "risk");
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=crm-risk-deals-table]", { ms: 800 });

  await finishCrm(tl);
}
