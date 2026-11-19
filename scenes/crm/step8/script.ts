import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn, pushCrmToast } from "@/components/crm/crm-timeline";

export const STEP8_DURATION_MS = 22500;

export async function runStep8(tl: Timeline) {
  beginCrm(tl, "crm-calls-messaging", {
    activeNav: "prospects",
    salesOpen: true,
    callsTab: "phone",
  });

  // Beat 1: Click Calls in sidebar
  await tl.at(400);
  tl.showCaption("Click Calls in the sidebar to open calling and messaging tools.");
  await pressOn(tl, "[data-tl=crm-nav-calls]", { ms: 650 });
  tl.setVar("crm:activeNav", "calls");
  tl.setUrl("crm.snaarp.com/calls");
  await tl.wait(400);

  // Beat 2: Inspect Cloud Phone & Numbers
  await tl.at(3000);
  tl.showCaption("Cloud Phone displays your active line, call settings, and call volume metrics.");
  await hoverOn(tl, "[data-tl=crm-my-numbers-card]", { ms: 600 });
  await tl.wait(1500);

  // Beat 3: Inspect Keypad and place cursor
  await tl.at(6200);
  tl.showCaption("Enter phone numbers with the numeric keypad to place direct calls.");
  await pressOn(tl, "[data-tl=crm-keypad-btn-5]", { ms: 500 });
  await tl.wait(200);
  await hoverOn(tl, "[data-tl=crm-keypad-call-btn]", { ms: 500 });
  await tl.wait(1200);

  // Beat 4: Recent calls
  await tl.at(9800);
  tl.showCaption("Review incoming, outgoing, and missed call history with duration timestamps.");
  await hoverOn(tl, "[data-tl=crm-recent-calls-card]", { ms: 600 });
  await tl.wait(1200);

  // Beat 5: Click SMS tab
  await tl.at(12500);
  tl.showCaption("Click SMS to manage text conversations and customer messaging.");
  await pressOn(tl, "[data-tl=crm-calls-tab-sms]", { ms: 600 });
  tl.setVar("crm:callsTab", "sms");
  await tl.wait(400);

  // Beat 6: Inspect SMS view
  await tl.at(15200);
  tl.showCaption("View conversation threads, delivery stats, and compose message drafts.");
  await hoverOn(tl, "[data-tl=crm-sms-item-sms-1]", { ms: 600 });
  await tl.wait(1200);

  // Beat 7: Click WhatsApp
  await tl.at(18000);
  tl.showCaption("Click WhatsApp to reach your contact on WhatsApp messaging.");
  await pressOn(tl, "[data-tl=crm-sms-whatsapp-btn]", { ms: 600 });
  pushCrmToast(tl, "WhatsApp connection active");
  await tl.wait(800);

  // Beat 8: Return to Sales Prospects
  await tl.at(20200);
  tl.showCaption("Click Sales to return to your pipeline board.");
  await pressOn(tl, "[data-tl=crm-nav-sales]", { ms: 550 });
  tl.setVar("crm:activeNav", "prospects");
  tl.setUrl("crm.snaarp.com/sales/prospects");

  await finishCrm(tl);
}
