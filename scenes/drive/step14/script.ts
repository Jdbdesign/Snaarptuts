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

export const STEP14_DURATION_MS = 9000;

export async function runStep14(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.65, 0.2]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickDetails);
  await hoverOn(tl, "[data-tl=btn-files-details]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=btn-files-details]");
  tl.setVar("driveDetailsOpen", true);

  await tl.at(4000);
  await ring(tl, "[data-tl=details-drawer]", 2200);

  await tl.at(6400);
  tl.showCaption(CAPTIONS.close);
  await hoverOn(tl, "[data-tl=btn-details-close]", { ms: 500 });

  await tl.at(7300);
  await pressOn(tl, "[data-tl=btn-details-close]");
  tl.setVar("driveDetailsOpen", false);

  await finishDrive(tl, STEP14_DURATION_MS);

}
