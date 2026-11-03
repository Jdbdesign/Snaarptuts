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

export const STEP18_DURATION_MS = 7500;

export async function runStep18(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.shared, "shared", [0.18, 0.46]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickFavorites);
  await hoverOn(tl, "[data-tl=nav-favorites]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=nav-favorites]");
  tl.setVar("drivePage", "favorites");
  tl.setVar("driveActiveNav", "favorites");
  tl.setUrl(DRIVE_URLS.favorites);

  await tl.at(4200);
  await ring(tl, "[data-tl=favorites-view]", 2400);

  await finishDrive(tl, STEP18_DURATION_MS);

}
