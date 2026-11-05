import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
  ring,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP54_DURATION_MS = 12500;

export async function runStep54(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.shared, "shared", [0.35, 0.35]);
  tl.setVar("driveSharedTab", "with-you");

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickByYou);
  await hoverOn(tl, "[data-tl=tab-shared-by-you]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=tab-shared-by-you]");
  tl.setVar("driveSharedTab", "by-you");

  await tl.at(2800);
  tl.showCaption(CAPTIONS.explainColumns);
  await hoverOn(tl, "[data-tl=row-shared-by-you-1]", { ms: 600 });
  await ring(tl, "[data-tl=row-shared-by-you-1]", 2000);

  await tl.at(5500);
  tl.showCaption(CAPTIONS.filterChips);
  await hoverOn(tl, "[data-tl=chip-shared-documents]", { ms: 500 });
  await tl.wait(100);
  await pressOn(tl, "[data-tl=chip-shared-documents]");
  tl.setVar("driveSharedFilter", "Documents");

  await tl.at(7200);
  await hoverOn(tl, "[data-tl=chip-shared-all]", { ms: 500 });
  await tl.wait(100);
  await pressOn(tl, "[data-tl=chip-shared-all]");
  tl.setVar("driveSharedFilter", "All");

  await tl.at(8800);
  tl.showCaption(CAPTIONS.filterSearch);
  await hoverOn(tl, "[data-tl=input-shared-filter]", { ms: 500 });
  await tl.wait(100);
  await pressOn(tl, "[data-tl=input-shared-filter]");
  await tl.wait(150);
  await tl.typeText("input-shared-filter", "Budget", { msPerChar: 80 });
  tl.setVar("driveSharedFilterText", "Budget");

  await tl.at(11000);
  tl.setVar("driveSharedFilterText", "");
  tl.setVar("field:shared-filter-text", "");

  await finishDrive(tl, STEP54_DURATION_MS);
}
