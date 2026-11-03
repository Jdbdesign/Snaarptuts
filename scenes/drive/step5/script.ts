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

export const STEP5_DURATION_MS = 7500;

export async function runStep5(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.photosAlbums, "photos", [0.3, 0.15]);

  tl.setVar("drivePhotosTab", "albums");

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickFavorites);
  await hoverOn(tl, "[data-tl=tab-photos-favorites]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=tab-photos-favorites]");
  tl.setVar("drivePhotosTab", "favorites");
  tl.setUrl(DRIVE_URLS.photosFavorites);

  await tl.at(4000);
  await ring(tl, "[data-tl=photos-favorites-view]", 2400);

  await finishDrive(tl, STEP5_DURATION_MS);

}
