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

export const STEP18_DURATION_MS = 6000;

export async function runStep18(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.shared, "shared", [0.18, 0.46]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickFavorites);
  await hoverOn(tl, "[data-tl=nav-favorites]", { ms: 600 });

  await tl.at(1800);
  await pressOn(tl, "[data-tl=nav-favorites]");
  tl.setVar("drivePage", "favorites");
  tl.setVar("driveActiveNav", "favorites");
  tl.setUrl(DRIVE_URLS.favorites);

  await tl.at(2800);
  await ring(tl, "[data-tl=favorites-view]", 2200);

  await finishDrive(tl, STEP18_DURATION_MS);
}
