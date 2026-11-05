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

export const STEP48_DURATION_MS = 14500;

export async function runStep48(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.35, 0.35]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveSharePeople", DEFAULT_SHARE_PEOPLE);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickMenu);
  await hoverOn(tl, "[data-tl=btn-tile-menu-client-files]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-tile-menu-client-files]");
  tl.setVar("driveItemMenuType", "folder");
  tl.setVar("driveItemMenuName", "Client Files");
  tl.setVar("driveShareItemName", "Client Files");
  tl.setVar("driveItemMenuCoords", { top: 220, left: 340 });
  tl.setVar("driveItemMenuOpen", true);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.clickShare);
  await hoverOn(tl, "[data-tl=item-menu-share]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=item-menu-share]");
  tl.setVar("driveItemMenuOpen", false);
  tl.setVar("driveShareModalOpen", true);
  tl.setVar("driveSharePeople", DEFAULT_SHARE_PEOPLE);

  await tl.at(4800);
  tl.showCaption(CAPTIONS.typeEmail);
  await hoverOn(tl, "[data-tl=share-email-input]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=share-email-input]");
  await tl.wait(200);
  await tl.typeText("share-email-input", "jordan", { msPerChar: 80 });
  tl.setVar("driveShareEmailVal", "jordan");

  await tl.at(7000);
  tl.showCaption(CAPTIONS.selectJordan);
  await hoverOn(tl, "[data-tl=share-suggest-jordan]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=share-suggest-jordan]");
  tl.setVar("driveShareHasChip", true);
  tl.setVar("driveShareEmailVal", "");
  tl.setVar("field:share-email", "");
  tl.setVar("driveShareRecipientName", "Jordan Lee");
  tl.setVar("driveShareRecipientEmail", "jordan.lee@acme.example");

  await tl.at(9200);
  tl.showCaption(CAPTIONS.clickSend);
  await hoverOn(tl, "[data-tl=btn-share-send]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-share-send]");
  tl.setVar("driveIsSharing", true);
  await tl.wait(700);
  tl.setVar("driveIsSharing", false);
  tl.setVar("driveShareModalOpen", false);
  tl.setVar("driveFolderShareToastOpen", true);
  tl.setVar("driveClientFilesShared", true);

  await tl.at(11800);
  tl.showCaption(CAPTIONS.folderShared);
  await hoverOn(tl, "[data-tl=tile-folder-client-files]", { ms: 600 });
  await ring(tl, "[data-tl=tile-folder-client-files]", 2000);

  await finishDrive(tl, STEP48_DURATION_MS);
}
