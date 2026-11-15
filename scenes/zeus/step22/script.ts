import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  pressOn,
  pushZeusSettingsToast,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";
import { STEP22_DATA } from "./data";

export const STEP22_DURATION_MS = 10500;

export async function runStep22(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.settings, "settings", [0.45, 0.35], 22);
  tl.setVar("zeusSettingsTab", "notifications");
  tl.setVar("zeusAccountRememberMe", false);

  // Beat 1: Click Account tab
  await tl.at(400);
  tl.showCaption(STEP22_DATA.captions.tab);
  await pressOn(tl, "[data-tl=zeus-tab-account]", { ms: 600 });
  tl.setVar("zeusSettingsTab", "account");
  await tl.wait(600);

  // Beat 2: Click Remember me toggle ON
  await tl.at(2000);
  tl.showCaption(STEP22_DATA.captions.rememberOn);
  await pressOn(tl, "[data-tl=account-toggle-remember]", { ms: 600 });
  tl.setVar("zeusAccountRememberMe", true);
  pushZeusSettingsToast(tl, "You'll stay signed in on this device.");
  tl.showCaption(STEP22_DATA.captions.toastOn);
  await tl.wait(1600);

  // Beat 3: Click Remember me toggle OFF
  await tl.at(5000);
  tl.showCaption(STEP22_DATA.captions.rememberOff);
  await pressOn(tl, "[data-tl=account-toggle-remember]", { ms: 600 });
  tl.setVar("zeusAccountRememberMe", false);
  pushZeusSettingsToast(tl, "You'll be asked to sign in again after your session ends.");
  tl.showCaption(STEP22_DATA.captions.toastOff);
  await tl.wait(2000);

  // Finish
  await tl.at(9000);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
