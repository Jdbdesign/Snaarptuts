import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import {
  DRIVE_URLS,
  SAMPLE_TXT_CONTENT,
} from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP31_DURATION_MS = 11000;

export async function runStep31(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);
  tl.setVar("driveFileMeetingNotesAdded", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCreate);
  await hoverOn(tl, "[data-tl=btn-files-create]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-files-create]");
  tl.setVar("driveCreateMenuOpen", true);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.clickTextDoc);
  await hoverOn(tl, "[data-tl=menu-item-text]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=menu-item-text]");
  tl.setVar("driveCreateMenuOpen", false);
  tl.setVar("driveTextModalOpen", true);

  await tl.at(4800);
  tl.showCaption(CAPTIONS.createDoc);
  await hoverOn(tl, "[data-tl=btn-modal-create-text]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-modal-create-text]");
  tl.setVar("driveTextModalOpen", false);
  tl.setVar("driveTextEditorOpen", true);

  await tl.at(6800);
  tl.showCaption(CAPTIONS.saveAndClose);
  tl.setVar("driveTextContent", SAMPLE_TXT_CONTENT);
  tl.setVar("field:textContent", SAMPLE_TXT_CONTENT);
  tl.setVar("driveTextDirty", true);
  await hoverOn(tl, "[data-tl=btn-text-save]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-text-save]");
  tl.setVar("driveTextSaving", true);
  await tl.wait(500);
  tl.setVar("driveTextSaving", false);
  tl.setVar("driveTextSaved", true);
  tl.setVar("driveTextDirty", false);

  await tl.at(9200);
  await hoverOn(tl, "[data-tl=btn-text-close]", { ms: 400 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-text-close]");
  tl.setVar("driveTextEditorOpen", false);
  tl.setVar("driveFileSampleTxtAdded", true);

  await finishDrive(tl, STEP31_DURATION_MS);
}
