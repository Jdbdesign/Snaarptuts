import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP29_DURATION_MS = 8500;

export async function runStep29(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCreate);
  await hoverOn(tl, "[data-tl=btn-files-create]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-files-create]");
  tl.setVar("driveCreateMenuOpen", true);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.clickMarkdown);
  await hoverOn(tl, "[data-tl=menu-item-markdown]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=menu-item-markdown]");
  tl.setVar("driveCreateMenuOpen", false);
  tl.setVar("driveMarkdownModalOpen", true);

  await tl.at(4800);
  tl.showCaption(CAPTIONS.typeDocName);
  await hoverOn(tl, "[data-tl=input-markdown-name]", { ms: 500 });
  await tl.wait(150);
  await tl.click("[data-tl=input-markdown-name]");
  await tl.typeText("markdownName", "Meeting notes", { msPerChar: 65 });

  await tl.at(6800);
  await hoverOn(tl, "[data-tl=btn-modal-create-md]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-modal-create-md]");
  tl.setVar("driveMarkdownModalOpen", false);
  tl.setVar("driveMarkdownEditorOpen", true);

  await finishDrive(tl, STEP29_DURATION_MS);
}
