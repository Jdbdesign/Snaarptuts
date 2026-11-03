import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP48_DURATION_MS = 7500;

export async function runStep48(tl: Timeline) {
  beginOneCardX(tl, URLS.mailInbox, "mail", [0.55, 0.42]);
  tl.setVar("ocxMailSubpage", "inbox");
  tl.setVar("ocxMailQuickSettingsOpen", false);

  // 1. Click Settings gear
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickGear);
  await hoverOn(tl, "[data-tl=btn-mail-settings]", { ms: 600 });
  await pressOn(tl, "[data-tl=btn-mail-settings]", { ms: 300 });
  tl.setVar("ocxMailQuickSettingsOpen", true);
  await tl.wait(150);

  // 2. View Quick Settings popover
  await tl.at(2400);
  tl.showCaption(CAPTIONS.quickSettings);
  await ring(tl, "[data-tl=mail-quick-settings-popover]", 1600);

  // 3. Click See all settings
  await tl.at(4400);
  tl.showCaption(CAPTIONS.clickSeeAllSettings);
  await hoverOn(tl, "[data-tl=btn-see-all-settings]", { ms: 600 });
  await pressOn(tl, "[data-tl=btn-see-all-settings]", { ms: 300 });
  tl.setUrl(URLS.mailSettings);
  tl.setVar("ocxMailSubpage", "settings");
  tl.setVar("ocxMailQuickSettingsOpen", false);
  await tl.wait(150);

  // 4. Finish
  await finishOneCardX(tl, STEP48_DURATION_MS);
}
