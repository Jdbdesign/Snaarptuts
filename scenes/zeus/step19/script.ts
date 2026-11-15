import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  pressOn,
  typeIntoVar,
  pushZeusSettingsToast,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";
import { STEP19_DATA } from "./data";

export const STEP19_DURATION_MS = 14000;

export async function runStep19(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.settings, "settings", [0.45, 0.35], 19);
  tl.setVar("zeusSettingsTab", "profile");

  // Beat 1: Click Security tab
  await tl.at(400);
  tl.showCaption(STEP19_DATA.captions.security);
  await pressOn(tl, "[data-tl=zeus-tab-security]", { ms: 600 });
  tl.setVar("zeusSettingsTab", "security");
  await tl.wait(600);

  // Beat 2: Current password
  await tl.at(1800);
  tl.showCaption(STEP19_DATA.captions.current);
  await pressOn(tl, "[data-tl=pwd-current-input]", { ms: 600 });
  await typeIntoVar(
    tl,
    "[data-tl=pwd-current-input]",
    "zeusPasswordCurrent",
    "SamplePass#1",
    { msPerChar: 40 }
  );
  await tl.wait(400);

  // Beat 3: Eye toggle click show then hide
  await tl.at(4200);
  tl.showCaption(STEP19_DATA.captions.eye);
  await pressOn(tl, "[data-tl=pwd-current-eye]", { ms: 500 });
  tl.setVar("zeusPasswordShowCurrent", true);
  await tl.wait(800);
  await pressOn(tl, "[data-tl=pwd-current-eye]", { ms: 400 });
  tl.setVar("zeusPasswordShowCurrent", false);
  await tl.wait(400);

  // Beat 4: New password
  await tl.at(6600);
  tl.showCaption(STEP19_DATA.captions.newPwd);
  await pressOn(tl, "[data-tl=pwd-new-input]", { ms: 600 });
  await typeIntoVar(
    tl,
    "[data-tl=pwd-new-input]",
    "zeusPasswordNew",
    "SamplePass#2026",
    { msPerChar: 35 }
  );
  await tl.wait(400);

  // Beat 5: Confirm new password
  await tl.at(8800);
  tl.showCaption(STEP19_DATA.captions.confirm);
  await pressOn(tl, "[data-tl=pwd-confirm-input]", { ms: 600 });
  await typeIntoVar(
    tl,
    "[data-tl=pwd-confirm-input]",
    "zeusPasswordConfirm",
    "SamplePass#2026",
    { msPerChar: 35 }
  );
  await tl.wait(500);

  // Beat 6: Save Password
  await tl.at(11000);
  tl.showCaption(STEP19_DATA.captions.save);
  await pressOn(tl, "[data-tl=pwd-save-btn]", { ms: 600 });
  tl.setVar("zeusPasswordSaving", true);
  await tl.wait(800);
  tl.setVar("zeusPasswordSaving", false);
  tl.setVar("zeusPasswordCurrent", "");
  tl.setVar("zeusPasswordNew", "");
  tl.setVar("zeusPasswordConfirm", "");
  pushZeusSettingsToast(tl, "Password changed");
  tl.showCaption(STEP19_DATA.captions.saved);

  // Finish
  await tl.at(13000);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
