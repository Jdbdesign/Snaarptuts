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

export const STEP19_DURATION_MS = 9500;

export async function runStep19(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.favorites, "favorites", [0.18, 0.49]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickRecycle);
  await hoverOn(tl, "[data-tl=nav-trash]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=nav-trash]");
  tl.setVar("drivePage", "trash");
  tl.setVar("driveActiveNav", "trash");
  tl.setUrl(DRIVE_URLS.trash);

  await tl.at(4200);
  tl.showCaption(CAPTIONS.actions);
  await hoverOn(tl, "[data-tl=btn-trash-restore]", { ms: 600 });
  await ring(tl, "[data-tl=btn-trash-restore]", 1800);

  await tl.at(6800);
  await hoverOn(tl, "[data-tl=btn-empty-trash]", { ms: 600 });
  await ring(tl, "[data-tl=btn-empty-trash]", 1800);

  await finishDrive(tl, STEP19_DURATION_MS);

}
