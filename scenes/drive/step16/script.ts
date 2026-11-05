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

export const STEP16_DURATION_MS = 6000;

export async function runStep16(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.meetings, "meetings", [0.18, 0.38]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickPhotos);
  await hoverOn(tl, "[data-tl=nav-photos]", { ms: 600 });

  await tl.at(1800);
  await pressOn(tl, "[data-tl=nav-photos]");
  tl.setVar("drivePage", "photos");
  tl.setVar("driveActiveNav", "photos");
  tl.setVar("driveTopToggle", "photos");
  tl.setUrl(DRIVE_URLS.photos);

  await tl.at(2800);
  await ring(tl, "[data-tl=photos-gallery-grid]", 2200);

  await finishDrive(tl, STEP16_DURATION_MS);
}
