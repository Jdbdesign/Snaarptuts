import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP63_DURATION_MS = 7500;

export async function runStep63(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.workspaces, "workspaces", [0.4, 0.3]);
  tl.setVar("drivePage", "workspaces");
  tl.setVar("driveActiveNav", "workspaces");
  tl.setVar("driveWorkspaceMarketingSpaceCreated", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.openWorkspace);
  await hoverOn(tl, "[data-tl=card-workspace-marketing-space]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=card-workspace-marketing-space]");
  tl.setVar("driveActiveWorkspaceId", "2172");
  tl.setUrl("drive.snaarp.com/workspaces/2172");

  await tl.at(2500);
  tl.showCaption(CAPTIONS.inspectDetail);
  await hoverOn(tl, "[data-tl=card-ws-storage]", { ms: 600 });
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=card-browse-ws-files]", { ms: 600 });
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=card-ws-members]", { ms: 600 });
  await tl.wait(1500);

  await finishDrive(tl, STEP63_DURATION_MS);
}
