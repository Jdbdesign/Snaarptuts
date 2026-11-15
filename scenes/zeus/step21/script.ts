import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  pressOn,
  pushZeusSettingsToast,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";
import { STEP21_DATA } from "./data";

export const STEP21_DURATION_MS = 10500;

export async function runStep21(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.settings, "settings", [0.45, 0.35], 21);
  tl.setVar("zeusSettingsTab", "security");
  tl.setVar("zeusNotifEmail", true);
  tl.setVar("zeusNotifPush", true);
  tl.setVar("zeusNotifSms", false);

  // Beat 1: Click Notifications tab
  await tl.at(400);
  tl.showCaption(STEP21_DATA.captions.tab);
  await pressOn(tl, "[data-tl=zeus-tab-notifications]", { ms: 600 });
  tl.setVar("zeusSettingsTab", "notifications");
  await tl.wait(600);

  // Beat 2: Click SMS toggle ON
  await tl.at(2000);
  tl.showCaption(STEP21_DATA.captions.sms);
  await pressOn(tl, "[data-tl=notif-toggle-sms]", { ms: 600 });
  tl.setVar("zeusNotifSms", true);
  await tl.wait(600);

  // Beat 3: Click Push toggle OFF
  await tl.at(4200);
  tl.showCaption(STEP21_DATA.captions.push);
  await pressOn(tl, "[data-tl=notif-toggle-push]", { ms: 600 });
  tl.setVar("zeusNotifPush", false);
  await tl.wait(600);

  // Beat 4: Save Preferences
  await tl.at(6500);
  tl.showCaption(STEP21_DATA.captions.save);
  await pressOn(tl, "[data-tl=notif-save-btn]", { ms: 600 });
  tl.setVar("zeusNotifSaving", true);
  await tl.wait(800);
  tl.setVar("zeusNotifSaving", false);
  pushZeusSettingsToast(tl, "Preferences saved");
  tl.showCaption(STEP21_DATA.captions.saved);

  // Finish
  await tl.at(9200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
