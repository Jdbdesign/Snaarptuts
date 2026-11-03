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

export const STEP16_DURATION_MS = 9500;

export async function runStep16(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.meetings, "meetings", [0.18, 0.38]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickPhotos);
  await hoverOn(tl, "[data-tl=nav-photos]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=nav-photos]");
  tl.setVar("drivePage", "photos");
  tl.setVar("driveTopToggle", "photos");
  tl.setUrl(DRIVE_URLS.photos);

  await tl.at(4200);
  await ring(tl, "[data-tl=photos-gallery-grid]", 2000);

  await tl.at(6400);
  tl.showCaption(CAPTIONS.clickFiles);
  await hoverOn(tl, "[data-tl=toggle-files]", { ms: 600 });

  await tl.at(7400);
  await pressOn(tl, "[data-tl=toggle-files]");
  tl.setVar("drivePage", "home");
  tl.setVar("driveTopToggle", "files");
  tl.setVar("driveActiveNav", "home");
  tl.setUrl(DRIVE_URLS.dashboard);

  await finishDrive(tl, STEP16_DURATION_MS);

}
