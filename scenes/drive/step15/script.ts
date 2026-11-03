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

export const STEP15_DURATION_MS = 8000;

export async function runStep15(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.18, 0.35]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickMeetings);
  await hoverOn(tl, "[data-tl=nav-meetings]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=nav-meetings]");
  tl.setVar("drivePage", "meetings");
  tl.setVar("driveActiveNav", "meetings");
  tl.setUrl(DRIVE_URLS.meetings);

  await tl.at(4200);
  tl.showCaption(CAPTIONS.recording);
  await hoverOn(tl, "[data-tl=row-meeting-untitled]", { ms: 600 });
  await ring(tl, "[data-tl=row-meeting-untitled]", 2200);

  await finishDrive(tl, STEP15_DURATION_MS);

}
