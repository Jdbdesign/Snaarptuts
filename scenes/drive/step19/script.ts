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

export const STEP19_DURATION_MS = 6000;

export async function runStep19(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.favorites, "favorites", [0.18, 0.49]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickRecycle);
  await hoverOn(tl, "[data-tl=nav-trash]", { ms: 600 });

  await tl.at(1800);
  await pressOn(tl, "[data-tl=nav-trash]");
  tl.setVar("drivePage", "trash");
  tl.setVar("driveActiveNav", "trash");
  tl.setUrl(DRIVE_URLS.trash);

  await tl.at(2800);
  await ring(tl, "[data-tl=trash-view]", 2200);

  await finishDrive(tl, STEP19_DURATION_MS);
}
