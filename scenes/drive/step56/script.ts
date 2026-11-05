import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP56_DURATION_MS = 14500;

export async function runStep56(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("drivePage", "files");
  tl.setVar("driveActiveNav", "files");
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveGoogleDriveFilesImported", true);

  // 1. Hover and open Q3 report tile menu
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickMenu);
  await hoverOn(tl, "[data-tl=btn-tile-menu-q3report]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-tile-menu-q3report]");
  tl.setVar("driveItemMenuType", "file");
  tl.setVar("driveItemMenuName", "Q3 report.pdf");
  tl.setVar("driveItemMenuCoords", { top: 290, left: 240 });
  tl.setVar("driveItemMenuOpen", true);

  // 2. Click Share
  await tl.at(2200);
  tl.showCaption(CAPTIONS.clickShare);
  await hoverOn(tl, "[data-tl=item-menu-share]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=item-menu-share]");
  tl.setVar("driveItemMenuOpen", false);
  tl.setVar("driveShareItemName", "Q3 report.pdf");
  tl.setVar("driveShareRole", "Can view");
  tl.setVar("driveShareModalOpen", true);

  // 3. Type "Alex"
  await tl.at(3800);
  tl.showCaption(CAPTIONS.typeAlex);
  await hoverOn(tl, "[data-tl=share-email-input]", { ms: 500 });
  await pressOn(tl, "[data-tl=share-email-input]");
  await tl.typeText("share-email", "Alex", { msPerChar: 70 });
  tl.setVar("driveShareShowSuggest", true);

  // 4. Pick Alex Morgan
  await tl.at(5300);
  tl.showCaption(CAPTIONS.pickAlex);
  await hoverOn(tl, "[data-tl=share-suggest-alex]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=share-suggest-alex]");
  tl.setVar("driveShareHasChip", true);
  tl.setVar("driveShareEmailVal", "");
  tl.setVar("field:share-email", "");
  tl.setVar("driveShareRecipientName", "Alex Morgan");
  tl.setVar("driveShareRecipientEmail", "alex.morgan@acme.example");
  tl.setVar("driveShareShowSuggest", false);

  // 5. Choose permission "Can edit"
  await tl.at(6800);
  tl.showCaption(CAPTIONS.setPermission);
  await hoverOn(tl, "[data-tl=select-share-role]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=select-share-role]");
  tl.setVar("driveShareRoleDropdownOpen", true);
  await tl.wait(200);
  await hoverOn(tl, "[data-tl=option-role-edit]", { ms: 400 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=option-role-edit]");
  tl.setVar("driveShareRole", "Can edit");
  tl.setVar("driveShareRoleDropdownOpen", false);

  // 6. Add message
  await tl.at(8400);
  tl.showCaption(CAPTIONS.addMessage);
  await hoverOn(tl, "[data-tl=btn-share-add-message]", { ms: 450 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-share-add-message]");
  tl.setVar("driveShareShowMessage", true);
  await tl.wait(150);
  await hoverOn(tl, "[data-tl=share-message-input]", { ms: 400 });
  await tl.typeText("share-message", "Please review before Friday.", { msPerChar: 35 });

  // 7. Click Share (Send)
  await tl.at(10200);
  tl.showCaption(CAPTIONS.clickShareSend);
  await hoverOn(tl, "[data-tl=btn-share-send]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-share-send]");
  tl.setVar("driveIsSharing", true);
  await tl.wait(400);
  tl.setVar("driveIsSharing", false);
  tl.setVar("driveShareModalOpen", false);
  tl.setVar("driveShareSuccessToastOpen", true);

  // 8. Click Shared in sidebar
  await tl.at(11400);
  tl.showCaption(CAPTIONS.clickSharedNav);
  await hoverOn(tl, "[data-tl=nav-shared]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-shared]");
  tl.setVar("drivePage", "shared");
  tl.setVar("driveActiveNav", "shared");
  tl.setUrl(DRIVE_URLS.shared);

  // 9. Click "By you" tab
  await tl.at(12500);
  tl.showCaption(CAPTIONS.clickByYou);
  await hoverOn(tl, "[data-tl=tab-shared-by-you]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=tab-shared-by-you]");
  tl.setVar("driveSharedTab", "by-you");

  // 10. Open row menu on Q3 report
  await tl.at(13400);
  tl.showCaption(CAPTIONS.openRowMenu);
  await hoverOn(tl, "[data-tl=btn-shared-row-menu-1]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-row-menu-1]");
  tl.setVar("driveSharedRowMenuOpenId", "sb-1");
  await tl.wait(500);
  await pressOn(tl, "[data-tl=btn-shared-row-menu-1]");
  tl.setVar("driveSharedRowMenuOpenId", "");

  await finishDrive(tl, STEP56_DURATION_MS);
}
