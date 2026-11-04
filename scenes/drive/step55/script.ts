import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP55_DURATION_MS = 8500;

export async function runStep55(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.dashboard, "home", [0.15, 0.4]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.openMeetings);
  await hoverOn(tl, "[data-tl=nav-meetings]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-meetings]");
  tl.setVar("drivePage", "meetings");
  tl.setVar("driveActiveNav", "meetings");
  tl.setUrl(DRIVE_URLS.meetings);

  await tl.at(2800);
  tl.showCaption(CAPTIONS.refreshRecordings);
  await hoverOn(tl, "[data-tl=btn-meetings-refresh]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-meetings-refresh]");
  tl.setVar("driveMeetingsRefreshing", true);
  await tl.wait(750);
  tl.setVar("driveMeetingsRefreshing", false);

  await tl.at(5200);
  tl.showCaption(CAPTIONS.downloadRecording);
  await hoverOn(tl, "[data-tl=btn-meeting-download-1]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-meeting-download-1]");
  tl.setVar("driveMeetingsDownloadedToastOpen", true);
  await tl.wait(1500);

  await finishDrive(tl, STEP55_DURATION_MS);
}
