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

export const STEP17_DURATION_MS = 10000;

export async function runStep17(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.dashboard, "home", [0.18, 0.42]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickShared);
  await hoverOn(tl, "[data-tl=nav-shared]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=nav-shared]");
  tl.setVar("drivePage", "shared");
  tl.setVar("driveActiveNav", "shared");
  tl.setUrl(DRIVE_URLS.shared);

  await tl.at(4200);
  tl.showCaption(CAPTIONS.switchTabs);
  await hoverOn(tl, "[data-tl=tab-shared-by-you]", { ms: 600 });

  await tl.at(5200);
  await pressOn(tl, "[data-tl=tab-shared-by-you]");
  tl.setVar("driveSharedTab", "by-you");

  await tl.at(6200);
  await hoverOn(tl, "[data-tl=chip-shared-other]", { ms: 500 });

  await tl.at(6800);
  await pressOn(tl, "[data-tl=chip-shared-other]");
  tl.setVar("driveSharedFilter", "Other");

  await tl.at(7600);
  await ring(tl, "[data-tl=shared-view]", 2000);

  await finishDrive(tl, STEP17_DURATION_MS);

}
