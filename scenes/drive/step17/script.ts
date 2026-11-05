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

export const STEP17_DURATION_MS = 6000;

export async function runStep17(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.dashboard, "home", [0.18, 0.42]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickShared);
  await hoverOn(tl, "[data-tl=nav-shared]", { ms: 600 });

  await tl.at(1800);
  await pressOn(tl, "[data-tl=nav-shared]");
  tl.setVar("drivePage", "shared");
  tl.setVar("driveActiveNav", "shared");
  tl.setVar("driveTopToggle", "files");
  tl.setUrl(DRIVE_URLS.shared);

  await tl.at(2800);
  await ring(tl, "[data-tl=shared-view]", 2200);

  await finishDrive(tl, STEP17_DURATION_MS);
}
