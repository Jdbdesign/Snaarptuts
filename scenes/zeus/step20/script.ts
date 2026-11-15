import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  hoverOn,
  pressOn,
  scrollView,
  typeIntoVar,
  pushZeusSettingsToast,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";
import { STEP20_DATA } from "./data";

export const STEP20_DURATION_MS = 13500;

export async function runStep20(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.settings, "settings", [0.45, 0.35], 20);
  tl.setVar("zeusSettingsTab", "security");
  tl.setVar("zeus2faEnabled", false);
  tl.setVar("zeus2faSetupOpen", false);

  // Beat 1: Scroll to 2FA section
  await tl.at(400);
  tl.showCaption(STEP20_DATA.captions.scroll);
  await scrollView(tl, "[data-tl=zeus-settings-scroller]", 260, 600);
  await tl.wait(600);

  // Beat 2: Click Enable
  await tl.at(2000);
  tl.showCaption(STEP20_DATA.captions.enable);
  await pressOn(tl, "[data-tl=twofa-toggle-btn]", { ms: 600 });
  tl.setVar("zeus2faSetupOpen", true);
  await tl.wait(400);

  // Beat 3: Scroll further to show QR & Code input clearly
  await tl.at(3500);
  tl.showCaption(STEP20_DATA.captions.scan);
  await scrollView(tl, "[data-tl=zeus-settings-scroller]", 460, 600);
  await hoverOn(tl, "[data-tl=twofa-qr-container]", { ms: 600 });
  await tl.wait(1200);

  // Beat 4: Enter 6-digit code
  await tl.at(6200);
  tl.showCaption(STEP20_DATA.captions.code);
  await pressOn(tl, "[data-tl=twofa-code-input]", { ms: 600 });
  await typeIntoVar(
    tl,
    "[data-tl=twofa-code-input]",
    "zeus2faCode",
    "123456",
    { msPerChar: 50 }
  );
  await tl.wait(600);

  // Beat 5: Verify & Enable
  await tl.at(9200);
  tl.showCaption(STEP20_DATA.captions.verify);
  await pressOn(tl, "[data-tl=twofa-verify-btn]", { ms: 600 });
  tl.setVar("zeus2faVerifying", true);
  await tl.wait(800);
  tl.setVar("zeus2faVerifying", false);
  tl.setVar("zeus2faSetupOpen", false);
  tl.setVar("zeus2faEnabled", true);
  pushZeusSettingsToast(tl, "Two-factor authentication enabled");
  tl.showCaption(STEP20_DATA.captions.enabled);

  // Finish
  await tl.at(12000);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
