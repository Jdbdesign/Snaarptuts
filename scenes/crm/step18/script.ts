import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP18_DURATION_MS = 25000;

export async function runStep18(tl: Timeline) {
  beginCrm(tl, "crm-calling-settings", {
    activeNav: "calls",
    callsTab: "phone",
    phoneCenterSubtab: "keypad",
  });

  // Beat 1: Overview
  await tl.at(400);
  tl.showCaption("Access Cloud Phone under Calls to manage inbound, outbound, and device routing settings.");
  await hoverOn(tl, "[data-tl=crm-my-numbers-card]", { ms: 600 });
  await tl.wait(1200);

  // Beat 2: Keypad subtabs
  await tl.at(3500);
  tl.showCaption("Switch between the active dial pad, recent call history, and your starred favorites.");
  await pressOn(tl, "[data-tl=crm-subtab-recent]", { ms: 500 });
  tl.setVar("crm:phoneCenterSubtab", "recent");
  await tl.wait(1000);
  await pressOn(tl, "[data-tl=crm-subtab-favorites]", { ms: 500 });
  tl.setVar("crm:phoneCenterSubtab", "favorites");
  await tl.wait(1000);
  await pressOn(tl, "[data-tl=crm-subtab-keypad]", { ms: 500 });
  tl.setVar("crm:phoneCenterSubtab", "keypad");
  await tl.wait(800);

  // Beat 3: Caller ID
  await tl.at(7800);
  tl.showCaption("Click Caller ID to review outbound display name and local presence configuration.");
  await pressOn(tl, "[data-tl=crm-call-setting-caller-id]", { ms: 600 });
  tl.setVar("crm:isCallerIdOpen", true);
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=crm-caller-id-modal]", { ms: 500 });
  await tl.wait(1000);
  await pressOn(tl, "[data-tl=crm-caller-id-cancel]", { ms: 500 });
  tl.setVar("crm:isCallerIdOpen", false);
  await tl.wait(600);

  // Beat 4: Voicemail Greeting
  await tl.at(12200);
  tl.showCaption("Configure voicemail greetings and automated email transcriptions.");
  await pressOn(tl, "[data-tl=crm-call-setting-voicemail]", { ms: 600 });
  tl.setVar("crm:isVoicemailModalOpen", true);
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=crm-voicemail-modal]", { ms: 500 });
  await tl.wait(1000);
  await pressOn(tl, "[data-tl=crm-voicemail-cancel]", { ms: 500 });
  tl.setVar("crm:isVoicemailModalOpen", false);
  await tl.wait(600);

  // Beat 5: Ring Strategy
  await tl.at(16400);
  tl.showCaption("Adjust ring strategies and choose which connected devices ring simultaneously.");
  await pressOn(tl, "[data-tl=crm-call-setting-ring-strategy]", { ms: 600 });
  tl.setVar("crm:isRingStrategyModalOpen", true);
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=crm-ring-strategy-modal]", { ms: 500 });
  await tl.wait(1000);
  await pressOn(tl, "[data-tl=crm-ring-strategy-cancel]", { ms: 500 });
  tl.setVar("crm:isRingStrategyModalOpen", false);
  await tl.wait(600);

  // Beat 6: Business Hours
  await tl.at(20600);
  tl.showCaption("Set your weekly operating hours and after-hours call routing schedule.");
  await pressOn(tl, "[data-tl=crm-call-setting-business-hours]", { ms: 600 });
  tl.setVar("crm:isBusinessHoursModalOpen", true);
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=crm-business-hours-modal]", { ms: 500 });
  await tl.wait(1000);
  await pressOn(tl, "[data-tl=crm-business-hours-cancel]", { ms: 500 });
  tl.setVar("crm:isBusinessHoursModalOpen", false);
  await tl.wait(1000);

  await finishCrm(tl);
}
