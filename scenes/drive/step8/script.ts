import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
  ring,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP8_DURATION_MS = 7500;

export async function runStep8(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.photos, "photos", [0.5, 0.15]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickFiles);
  await hoverOn(tl, "[data-tl=toggle-files]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=toggle-files]");
  tl.setVar("driveTopToggle", "files");
  tl.setVar("drivePage", "home");
  tl.setVar("driveActiveNav", "home");
  tl.setUrl(DRIVE_URLS.dashboard);

  await tl.at(4200);
  await ring(tl, "[data-tl=drive-sidebar]", 2400);

  await finishDrive(tl, STEP8_DURATION_MS);

}
