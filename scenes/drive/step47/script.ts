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

export const STEP47_DURATION_MS = 21000;

export async function runStep47(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.4, 0.4]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveGoogleDriveFilesImported", true);
  tl.setVar("driveSharePeople", DEFAULT_SHARE_PEOPLE);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickMenu);
  await hoverOn(tl, "[data-tl=btn-tile-menu-q3report]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-tile-menu-q3report]");
  tl.setVar("driveItemMenuType", "file");
  tl.setVar("driveItemMenuName", "Q3 report.pdf");
  tl.setVar("driveShareItemName", "Q3 report.pdf");
  tl.setVar("driveItemMenuTrigger", "[data-tl=btn-tile-menu-q3report]");
  tl.setVar("driveItemMenuOpen", true);

  await tl.at(2800);
  tl.showCaption(CAPTIONS.clickShare);
  await hoverOn(tl, "[data-tl=item-menu-share]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=item-menu-share]");
  tl.setVar("driveItemMenuOpen", false);
  tl.setVar("driveShareModalOpen", true);
  tl.setVar("driveSharePeople", DEFAULT_SHARE_PEOPLE);

  await tl.at(5000);
  tl.showCaption(CAPTIONS.typeEmail);
  await hoverOn(tl, "[data-tl=share-email-input]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=share-email-input]");
  await tl.wait(200);
  await tl.typeText("share-email-input", "alex", { msPerChar: 80 });
  tl.setVar("driveShareEmailVal", "alex");

  await tl.at(7200);
  tl.showCaption(CAPTIONS.selectAlex);
  await hoverOn(tl, "[data-tl=share-suggest-alex]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=share-suggest-alex]");
  tl.setVar("driveShareHasChip", true);
  tl.setVar("driveShareEmailVal", "");
  tl.setVar("field:share-email", "");
  tl.setVar("driveShareRecipientName", "Alex Morgan");
  tl.setVar("driveShareRecipientEmail", "alex.morgan@acme.example");

  await tl.at(9200);
  tl.showCaption(CAPTIONS.addMessage);
  await hoverOn(tl, "[data-tl=btn-share-add-message]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-share-add-message]");
  tl.setVar("driveShareShowMessage", true);

  await tl.at(10500);
  tl.showCaption(CAPTIONS.typeMessage);
  await hoverOn(tl, "[data-tl=share-message-input]", { ms: 500 });
  await tl.wait(150);
  await tl.typeText("share-message-input", "Please review before Friday.", { msPerChar: 55 });
  tl.setVar("driveShareMessage", "Please review before Friday.");

  await tl.at(12600);
  tl.showCaption(CAPTIONS.clickSend);
  await hoverOn(tl, "[data-tl=btn-share-send]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-share-send]");
  tl.setVar("driveIsSharing", true);
  await tl.wait(700);
  tl.setVar("driveIsSharing", false);
  tl.setVar("driveShareModalOpen", false);
  tl.setVar("driveShareSuccessToastOpen", true);

  await tl.at(14800);
  tl.showCaption(CAPTIONS.openShared);
  await hoverOn(tl, "[data-tl=nav-shared]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-shared]");
  tl.setVar("drivePage", "shared");
  tl.setVar("driveActiveNav", "shared");
  tl.setUrl(DRIVE_URLS.shared);

  await tl.at(17000);
  tl.showCaption(CAPTIONS.viewByYou);
  await hoverOn(tl, "[data-tl=tab-shared-by-you]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=tab-shared-by-you]");
  tl.setVar("driveSharedTab", "by-you");

  await tl.at(18500);
  tl.showCaption(CAPTIONS.sharedListed);
  await hoverOn(tl, "[data-tl=row-shared-by-you-1]", { ms: 600 });
  await ring(tl, "[data-tl=row-shared-by-you-1]", 2000);

  await finishDrive(tl, STEP47_DURATION_MS);
}
