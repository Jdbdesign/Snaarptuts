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

export const STEP52_DURATION_MS = 16000;

export async function runStep52(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.shared, "shared", [0.4, 0.3]);
  tl.setVar("driveSharedTab", "with-you");
  tl.setVar("driveSharedFilter", "All");

  await tl.at(500);
  tl.showCaption(CAPTIONS.explainTab);
  await hoverOn(tl, "[data-tl=tab-shared-with-you]", { ms: 600 });
  await ring(tl, "[data-tl=tab-shared-with-you]", 1800);

  await tl.at(2800);
  tl.showCaption(CAPTIONS.filterChips);
  await hoverOn(tl, "[data-tl=chip-shared-documents]", { ms: 500 });
  await tl.wait(100);
  await pressOn(tl, "[data-tl=chip-shared-documents]");
  tl.setVar("driveSharedFilter", "Documents");

  await tl.at(4800);
  await hoverOn(tl, "[data-tl=chip-shared-images]", { ms: 500 });
  await tl.wait(100);
  await pressOn(tl, "[data-tl=chip-shared-images]");
  tl.setVar("driveSharedFilter", "Images");

  await tl.at(6600);
  await hoverOn(tl, "[data-tl=chip-shared-all]", { ms: 500 });
  await tl.wait(100);
  await pressOn(tl, "[data-tl=chip-shared-all]");
  tl.setVar("driveSharedFilter", "All");

  await tl.at(8000);
  tl.showCaption(CAPTIONS.filterSearch);
  await hoverOn(tl, "[data-tl=input-shared-filter]", { ms: 500 });
  await tl.wait(100);
  await pressOn(tl, "[data-tl=input-shared-filter]");
  await tl.wait(150);
  await tl.typeText("input-shared-filter", "Alex", { msPerChar: 80 });
  tl.setVar("driveSharedFilterText", "Alex");

  await tl.at(10500);
  tl.setVar("driveSharedFilterText", "");
  tl.setVar("field:shared-filter-text", "");

  await tl.at(11500);
  tl.showCaption(CAPTIONS.previewDoc);
  await hoverOn(tl, "[data-tl=link-shared-projectbrief]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=link-shared-projectbrief]");
  tl.setVar("driveSharedPreviewOpen", true);

  await tl.at(13800);
  tl.showCaption(CAPTIONS.closePreview);
  await hoverOn(tl, "[data-tl=btn-preview-close]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-preview-close]");
  tl.setVar("driveSharedPreviewOpen", false);

  await finishDrive(tl, STEP52_DURATION_MS);
}
