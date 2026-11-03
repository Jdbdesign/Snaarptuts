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

export const STEP2_DURATION_MS = 8000;

export async function runStep2(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.dashboard, "home", [0.48, 0.35]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2200);
  tl.showCaption(CAPTIONS.clickPhotos);
  await hoverOn(tl, "[data-tl=toggle-photos]", { ms: 600 });

  await tl.at(3300);
  await pressOn(tl, "[data-tl=toggle-photos]");
  tl.setVar("driveTopToggle", "photos");
  tl.setVar("drivePage", "photos");
  tl.setUrl(DRIVE_URLS.photos);

  await tl.at(4200);
  tl.showCaption(CAPTIONS.view);
  await ring(tl, "[data-tl=photos-gallery-grid]", 2600);

  await finishDrive(tl, STEP2_DURATION_MS);

}
