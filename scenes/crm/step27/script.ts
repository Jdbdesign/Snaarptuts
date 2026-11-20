import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP27_DURATION_MS = 22000;

export async function runStep27(tl: Timeline) {
  beginCrm(tl, "crm-report-builder", {
    activeNav: "reports",
    reportType: "standard",
    reportDataSource: "Contacts",
    reportSortBy: "Created Date",
    reportSortOrder: "desc",
    reportMaxResults: 50,
    reportGroupBy: "None",
    reportVisualization: "table",
    reportHasFilter: false,
    reportHasRun: false,
  });

  // Beat 1: Navigate to Report Builder & review Saved Reports panel
  await tl.at(400);
  tl.showCaption("Navigate to Report Builder to create custom reports from CRM data.");
  await hoverOn(tl, "[data-tl=crm-saved-reports-panel]", { ms: 600 });
  await tl.wait(1500);

  // Beat 2: Configure Sort By and report options
  await tl.at(3800);
  tl.showCaption("Configure Data Source, Sort By, and Order parameters.");
  await pressOn(tl, "[data-tl=crm-report-sort-by]");
  tl.setVar("crm:reportSortBy", "First Name");
  await tl.wait(1500);

  // Beat 3: Switch report visualization
  await tl.at(7500);
  tl.showCaption("Switch report visualization style between Table, Bar, Pie, and Line.");
  await pressOn(tl, "[data-tl=crm-report-viz-bar]");
  tl.setVar("crm:reportVisualization", "Bar");
  await tl.wait(1200);
  await pressOn(tl, "[data-tl=crm-report-viz-table]");
  tl.setVar("crm:reportVisualization", "Table");
  await tl.wait(1000);

  // Beat 4: Add filter row
  await tl.at(11500);
  tl.showCaption("Add custom filters to refine report records.");
  await pressOn(tl, "[data-tl=crm-report-add-filter-btn]");
  tl.setVar("crm:reportHasFilter", true);
  await tl.wait(1000);
  await hoverOn(tl, "[data-tl=crm-report-filter-row]", { ms: 500 });
  await tl.wait(1200);

  // Beat 5: Click Run Report
  await tl.at(15200);
  tl.showCaption("Click Run Report to generate CRM results.");
  await pressOn(tl, "[data-tl=crm-run-report-btn]");
  tl.setVar("crm:reportHasRun", true);
  await tl.wait(1200);

  // Beat 6: Inspect Results table
  await tl.at(17800);
  tl.showCaption("Review generated results table with 7 records.");
  await hoverOn(tl, "[data-tl=crm-report-results-table]", { ms: 600 });
  await tl.wait(2000);

  await finishCrm(tl);
}
