import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP58_DURATION_MS = 8000;

export async function runStep58(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.trash, "trash", [0.75, 0.2]);
  tl.setVar("drivePage", "trash");
  tl.setVar("driveActiveNav", "trash");

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickEmptyTrash);
  await hoverOn(tl, "[data-tl=btn-empty-trash]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-empty-trash]");
  tl.setVar("driveEmptyTrashModalOpen", true);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.confirmEmpty);
  await hoverOn(tl, "[data-tl=btn-empty-trash-confirm]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-empty-trash-confirm]");
  tl.setVar("driveIsEmptyingTrash", true);

  await tl.wait(800);
  tl.setVar("driveIsEmptyingTrash", false);
  tl.setVar("driveEmptyTrashModalOpen", false);
  tl.setVar("driveTrashEmptied", true);
  tl.setVar("driveTrashEmptiedToastOpen", true);

  await tl.at(5500);
  tl.showCaption(CAPTIONS.emptyResult);
  await hoverOn(tl, "[data-tl=trash-empty-state]", { ms: 600 });
  await tl.wait(1500);

  await finishDrive(tl, STEP58_DURATION_MS);
}
