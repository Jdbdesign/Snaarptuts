import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn, pushCrmToast } from "@/components/crm/crm-timeline";

export const STEP7_DURATION_MS = 25500;

export async function runStep7(tl: Timeline) {
  beginCrm(tl, "crm-import-prospects", {
    activeNav: "prospects",
    salesOpen: true,
    prospectsViewMode: "kanban",
    hasImported: false,
    isImportOpen: false,
  });

  // Beat 1: Click Import
  await tl.at(400);
  tl.showCaption("Click Import to start uploading prospect leads from a spreadsheet.");
  await pressOn(tl, "[data-tl=crm-import-btn]", { ms: 650 });
  tl.setVar("crm:isImportOpen", true);
  tl.setVar("crm:importStage", "upload");
  await tl.wait(400);

  // Beat 2: Upload CSV
  await tl.at(3000);
  tl.showCaption("Click to browse and upload prospects-import-sample1.csv.");
  await pressOn(tl, "[data-tl=crm-import-dropzone]", { ms: 650 });
  tl.setVar("crm:importStage", "map");
  await tl.wait(400);

  // Beat 3: Inspect & click mapping dropdowns
  await tl.at(6000);
  tl.showCaption("Confirm mapped fields: First Name, Last Name, Email, and Phone.");
  await pressOn(tl, "[data-tl=crm-map-dropdown-first-name]", { ms: 500 });
  await tl.wait(200);
  await pressOn(tl, "[data-tl=crm-map-dropdown-last-name]", { ms: 450 });
  await tl.wait(200);
  await pressOn(tl, "[data-tl=crm-map-dropdown-email]", { ms: 450 });
  await tl.wait(400);

  // Beat 4: Horizontal scroll across table
  await tl.at(9500);
  tl.showCaption("All 10 columns are matched, including Company, Stage, Deal Value, and Notes.");
  await hoverOn(tl, "[data-tl=crm-import-status]", { ms: 600 });
  await tl.wait(1200);

  // Beat 5: Click Review import
  await tl.at(12200);
  tl.showCaption("Click Review import to verify records and preview pipeline stage matching.");
  await pressOn(tl, "[data-tl=crm-import-review-btn]", { ms: 600 });
  tl.setVar("crm:importStage", "review");
  await tl.wait(400);

  // Beat 6: Inspect review cards
  await tl.at(14800);
  tl.showCaption("5 records ready: 1 placed in stage, and 4 unrecognised stages will fall back to Event Leads.");
  await hoverOn(tl, "[data-tl=crm-review-card-unrecognised]", { ms: 600 });
  await tl.wait(1500);

  // Beat 7: Click Import 5 prospects
  await tl.at(18000);
  tl.showCaption("Click Import 5 prospects to create the new leads.");
  await pressOn(tl, "[data-tl=crm-import-submit-btn]", { ms: 600 });
  tl.setVar("crm:importStage", "complete");
  await tl.wait(500);

  // Beat 8: Review complete summary
  await tl.at(20500);
  tl.showCaption("Import complete: 5 created, 0 skipped, and 1 placed directly in stage.");
  await hoverOn(tl, "[data-tl=crm-import-complete-title]", { ms: 500 });
  await tl.wait(1200);

  // Beat 9: Click Done
  await tl.at(22800);
  tl.showCaption("Click Done to view the imported prospects on your pipeline board.");
  await pressOn(tl, "[data-tl=crm-import-done-btn]", { ms: 600 });
  tl.setVar("crm:hasImported", true);
  tl.setVar("crm:isImportOpen", false);
  pushCrmToast(tl, "Imported 5 prospects");

  await finishCrm(tl);
}
