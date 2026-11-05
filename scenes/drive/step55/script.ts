import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
  ring,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS, SHARE_PEOPLE_BUDGET } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP55_DURATION_MS = 14500;

export async function runStep55(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.shared, "shared", [0.45, 0.45]);
  tl.setVar("driveSharedTab", "by-you");

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickMenu);
  await hoverOn(tl, "[data-tl=btn-shared-row-menu-3]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-row-menu-3]");
  tl.setVar("driveSharedRowMenuOpenId", "shared-by-3");

  await tl.at(2500);
  tl.showCaption(CAPTIONS.clickShare);
  await hoverOn(tl, "[data-tl=btn-shared-menu-share]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-menu-share]");
  tl.setVar("driveSharedRowMenuOpenId", "");
  tl.setVar("driveShareModalOpen", true);
  tl.setVar("driveShareItemName", "Budget.xlsx");
  tl.setVar("driveSharePeople", SHARE_PEOPLE_BUDGET);
  tl.setVar("driveShareAgain", true);

  await tl.at(5200);
  tl.showCaption(CAPTIONS.typeTaylor);
  await hoverOn(tl, "[data-tl=share-email-input]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=share-email-input]");
  await tl.wait(200);
  await tl.typeText("share-email-input", "taylor", { msPerChar: 80 });
  tl.setVar("driveShareEmailVal", "taylor");

  await tl.at(7400);
  tl.showCaption(CAPTIONS.selectTaylor);
  await hoverOn(tl, "[data-tl=share-suggest-taylor]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=share-suggest-taylor]");
  tl.setVar("driveShareHasChip", true);
  tl.setVar("driveShareEmailVal", "");
  tl.setVar("field:share-email", "");
  tl.setVar("driveShareRecipientName", "Taylor Reed");
  tl.setVar("driveShareRecipientEmail", "taylor.reed@acme.example");

  await tl.at(9600);
  tl.showCaption(CAPTIONS.clickSend);
  await hoverOn(tl, "[data-tl=btn-share-send]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-share-send]");
  tl.setVar("driveShareModalOpen", false);
  tl.setVar("driveShareAgainToastOpen", true);
  tl.setVar("driveBudgetSharedWith", "casey.brown@acme.example, taylor.reed@acme.example");

  await tl.at(12000);
  tl.showCaption(CAPTIONS.updatedRecipients);
  await hoverOn(tl, "[data-tl=row-shared-by-you-3]", { ms: 600 });
  await ring(tl, "[data-tl=row-shared-by-you-3]", 2000);

  await finishDrive(tl, STEP55_DURATION_MS);
}
