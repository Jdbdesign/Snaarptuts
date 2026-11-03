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

export const STEP3_DURATION_MS = 7500;

export async function runStep3(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.photos, "photos", [0.25, 0.15]);

  tl.setVar("drivePhotosTab", "gallery");

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickMoments);
  await hoverOn(tl, "[data-tl=tab-photos-moments]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=tab-photos-moments]");
  tl.setVar("drivePhotosTab", "moments");
  tl.setUrl(DRIVE_URLS.photosMoments);

  await tl.at(4000);
  await ring(tl, "[data-tl=photos-moments-view]", 2400);

  await finishDrive(tl, STEP3_DURATION_MS);

}
