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

export const STEP11_DURATION_MS = 7500;

export async function runStep11(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.dashboard, "home", [0.18, 0.28]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickMyFiles);
  await hoverOn(tl, "[data-tl=nav-files]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=nav-files]");
  tl.setVar("drivePage", "files");
  tl.setVar("driveActiveNav", "files");
  tl.setUrl(DRIVE_URLS.files);

  await tl.at(4200);
  await ring(tl, "[data-tl=files-view]", 2500);

  await finishDrive(tl, STEP11_DURATION_MS);

}
