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

export const STEP4_DURATION_MS = 7500;

export async function runStep4(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.photosMoments, "photos", [0.25, 0.15]);

  tl.setVar("drivePhotosTab", "moments");

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickAlbums);
  await hoverOn(tl, "[data-tl=tab-photos-albums]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=tab-photos-albums]");
  tl.setVar("drivePhotosTab", "albums");
  tl.setUrl(DRIVE_URLS.photosAlbums);

  await tl.at(4000);
  await ring(tl, "[data-tl=photos-albums-view]", 2400);

  await finishDrive(tl, STEP4_DURATION_MS);

}
