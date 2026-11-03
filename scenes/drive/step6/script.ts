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

export const STEP6_DURATION_MS = 9500;

export async function runStep6(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.photos, "photos", [0.4, 0.15]);

  tl.setVar("drivePhotosTab", "gallery");

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickLayout);
  await hoverOn(tl, "[data-tl=btn-photos-layout]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=btn-photos-layout]");
  tl.setVar("drivePhotosLayoutOpen", true);

  await tl.at(4000);
  tl.showCaption(CAPTIONS.options);
  await ring(tl, "[data-tl=photos-layout-popover]", 2800);

  await tl.at(7200);
  await hoverOn(tl, "[data-tl=btn-photos-layout]", { ms: 500 });

  await tl.at(7800);
  await pressOn(tl, "[data-tl=btn-photos-layout]");
  tl.setVar("drivePhotosLayoutOpen", false);

  await finishDrive(tl, STEP6_DURATION_MS);

}
