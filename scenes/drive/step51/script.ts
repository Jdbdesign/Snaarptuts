import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
  ring,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS, SHARE_PEOPLE_ALREADY_SHARED } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP51_DURATION_MS = 14500;

export async function runStep51(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveShareModalOpen", true);
  tl.setVar("driveShareItemName", "Q3 report.pdf");
  tl.setVar("driveSharePeople", SHARE_PEOPLE_ALREADY_SHARED);

  await tl.at(500);
  tl.showCaption(CAPTIONS.inspectPeople);
  await hoverOn(tl, "[data-tl=dialog-share]", { ms: 600 });

  await tl.at(2500);
  tl.showCaption(CAPTIONS.changeRole);
  await hoverOn(tl, "[data-tl=select-person-role-p-alex]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=select-person-role-p-alex]");
  tl.setVar("drivePersonRoleUpdatedToastOpen", true);
  tl.setVar("driveQ3Role", "Can edit");
  tl.setVar("driveSharePeople", [
    { ...SHARE_PEOPLE_ALREADY_SHARED[0] },
    { ...SHARE_PEOPLE_ALREADY_SHARED[1], role: "Can edit" },
    { ...SHARE_PEOPLE_ALREADY_SHARED[2] },
  ]);

  await tl.at(5500);
  tl.showCaption(CAPTIONS.removePerson);
  await hoverOn(tl, "[data-tl=btn-remove-person-p-casey]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-remove-person-p-casey]");
  tl.setVar("drivePersonRemovedToastOpen", true);
  tl.setVar("driveSharePeople", [
    { ...SHARE_PEOPLE_ALREADY_SHARED[0] },
    { ...SHARE_PEOPLE_ALREADY_SHARED[1], role: "Can edit" },
  ]);

  await tl.at(8500);
  tl.showCaption(CAPTIONS.closeModal);
  await hoverOn(tl, "[data-tl=btn-share-close]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-share-close]");
  tl.setVar("driveShareModalOpen", false);

  await tl.at(10500);
  tl.showCaption(CAPTIONS.updatedInShared);
  await hoverOn(tl, "[data-tl=nav-shared]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-shared]");
  tl.setVar("drivePage", "shared");
  tl.setVar("driveActiveNav", "shared");
  tl.setVar("driveSharedTab", "by-you");
  tl.setUrl(DRIVE_URLS.shared);

  await tl.at(12200);
  await hoverOn(tl, "[data-tl=row-shared-by-you-1]", { ms: 600 });
  await ring(tl, "[data-tl=row-shared-by-you-1]", 2000);

  await finishDrive(tl, STEP51_DURATION_MS);
}
