import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  hoverOn,
  pressOn,
  typeIntoVar,
  pushZeusSettingsToast,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";
import { STEP18_DATA } from "./data";

export const STEP18_DURATION_MS = 10500;

export async function runStep18(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.settings, "settings", [0.45, 0.35], 18);
  tl.setVar("zeusSettingsTab", "profile");

  // Beat 1: Hover photo
  await tl.at(400);
  tl.showCaption(STEP18_DATA.captions.photo);
  await hoverOn(tl, "[data-tl=profile-change-photo]", { ms: 600 });
  await tl.wait(1000);

  // Beat 2: Ring email box
  await tl.at(2200);
  tl.showCaption(STEP18_DATA.captions.email);
  await hoverOn(tl, "[data-tl=profile-email]", { ms: 500, ring: true });
  await tl.wait(1200);
  tl.clearHighlight();

  // Beat 3: Phone input
  await tl.at(4200);
  tl.showCaption(STEP18_DATA.captions.phone);
  await pressOn(tl, "[data-tl=profile-phone]", { ms: 600 });
  await typeIntoVar(
    tl,
    "[data-tl=profile-phone]",
    "zeusProfilePhone",
    "+44 7700 900456",
    { msPerChar: 40 }
  );
  await tl.wait(600);

  // Beat 4: Save Profile
  await tl.at(7200);
  tl.showCaption(STEP18_DATA.captions.save);
  await pressOn(tl, "[data-tl=profile-save-btn]", { ms: 600 });
  tl.setVar("zeusProfileSaving", true);
  await tl.wait(800);
  tl.setVar("zeusProfileSaving", false);
  pushZeusSettingsToast(tl, "Profile updated");
  tl.showCaption(STEP18_DATA.captions.saved);

  // Finish
  await tl.at(9500);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
