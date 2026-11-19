import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP19_DURATION_MS = 16000;

export async function runStep19(tl: Timeline) {
  beginCrm(tl, "crm-calling-providers", {
    activeNav: "calls",
    callsTab: "phone",
  });

  // Beat 1: Point to Providers button
  await tl.at(400);
  tl.showCaption("Click Providers to view external telephony integrations and connected voice services.");
  await hoverOn(tl, "[data-tl=crm-calls-providers-btn]", { ms: 600 });
  await tl.wait(1000);

  // Beat 2: Open modal
  await tl.at(3200);
  await pressOn(tl, "[data-tl=crm-calls-providers-btn]", { ms: 500 });
  tl.setVar("crm:isCallingProvidersOpen", true);
  await tl.wait(600);

  // Beat 3: Inspect connected provider card
  await tl.at(5500);
  tl.showCaption("Review your active telephony provider status connected under your administrative account.");
  await hoverOn(tl, "[data-tl=crm-provider-talking-card]", { ms: 600 });
  await tl.wait(2500);

  // Beat 4: Close modal
  await tl.at(10500);
  tl.showCaption("Close the calling providers modal to return to the communication hub.");
  await pressOn(tl, "[data-tl=crm-calling-providers-close]", { ms: 500 });
  tl.setVar("crm:isCallingProvidersOpen", false);
  await tl.wait(1200);

  await finishCrm(tl);
}
