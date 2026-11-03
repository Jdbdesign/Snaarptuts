import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  ring,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP1_DURATION_MS = 9000;

export async function runStep1(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.dashboard, "home", [0.48, 0.35]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.welcome);
  await hoverOn(tl, "[data-tl=sidebar-user]", { ms: 600 });
  await ring(tl, "[data-tl=sidebar-user]", 1800);

  await tl.at(3000);
  tl.showCaption(CAPTIONS.getStarted);
  await hoverOn(tl, "[data-tl=card-getstarted-docs]", { ms: 600 });
  await ring(tl, "[data-tl=getstarted-cards]", 2000);

  await tl.at(6000);
  tl.showCaption(CAPTIONS.recent);
  await hoverOn(tl, "[data-tl=recent-table]", { ms: 600 });
  await ring(tl, "[data-tl=recent-table]", 2200);

  await finishDrive(tl, STEP1_DURATION_MS);

}
