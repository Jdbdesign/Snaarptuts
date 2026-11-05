import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
  ring,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS, DEFAULT_SHARE_PEOPLE } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP49_DURATION_MS = 7500;

export async function runStep49(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveShareModalOpen", true);
  tl.setVar("driveShareItemName", "Q3 report.pdf");
  tl.setVar("driveSharePeople", DEFAULT_SHARE_PEOPLE);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCopyLink);
  await hoverOn(tl, "[data-tl=btn-share-copy-link]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-share-copy-link]");
  tl.setVar("driveLinkCopied", true);
  tl.setVar("driveLinkCopiedToastOpen", true);

  await tl.at(3000);
  tl.showCaption(CAPTIONS.linkCopied);
  await hoverOn(tl, "[data-tl=toast-link-copied]", { ms: 600 });
  await ring(tl, "[data-tl=toast-link-copied]", 2200);

  await finishDrive(tl, STEP49_DURATION_MS);
}
