import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP32_DATA } from "./data";

export const STEP32_DURATION_MS = STEP32_DATA.durationMs;

export async function runStep32(tl: Timeline) {
  beginMe(tl, ME_URLS.integrationsCrm, "integrations-crm", [0.45, 0.35], 32);
  tl.setVar("meAppsCrmLoading", true);

  // Beat 1: 1s Loading Spinner
  await tl.at(200);
  tl.showCaption(STEP32_DATA.captions.loading);
  await tl.wait(1000);
  tl.setVar("meAppsCrmLoading", false);

  // Beat 2: CRM Platforms
  await tl.at(1400);
  tl.showCaption(STEP32_DATA.captions.crmPlatforms);
  await hoverOn(tl, "[data-tl=me-crm-connect-salesforce]", { ms: 600, ring: true });
  await tl.wait(1400);

  // Hover HubSpot
  await tl.at(3800);
  await hoverOn(tl, "[data-tl=me-crm-connect-hubspot]", { ms: 500, ring: true });
  await tl.wait(1200);

  // Beat 3: Scroll to Enrichment & Forms
  await tl.at(5800);
  tl.showCaption(STEP32_DATA.captions.enrichment);
  await hoverOn(tl, "[data-tl=me-crm-connect-postal]", { ms: 600, ring: true });
  await tl.wait(1600);

  // Beat 4: Scroll to Workflow Email Accounts
  await tl.at(8400);
  tl.showCaption(STEP32_DATA.captions.workflowEmails);
  await hoverOn(tl, "[data-tl=me-crm-connect-gmail]", { ms: 600, ring: true });
  await tl.wait(1800);

  // Beat 5: Scroll up & Click Back to Integrations
  await tl.at(11200);
  tl.showCaption(STEP32_DATA.captions.backToHub);
  await pressOn(tl, "[data-tl=me-crm-back-link]", { ms: 700 });
  await tl.wait(1600);

  // Finish
  await tl.at(15400);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1500);
}
