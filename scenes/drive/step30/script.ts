import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
  ring,
} from "@/components/drive/drive-timeline";
import {
  DRIVE_URLS,
  INITIAL_MARKDOWN_TEMPLATE,
  SAMPLE_MARKDOWN_CONTENT,
} from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP30_DURATION_MS = 10500;

export async function runStep30(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.5, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);
  tl.setVar("driveMarkdownEditorOpen", true);
  tl.setVar("driveMarkdownContent", INITIAL_MARKDOWN_TEMPLATE);

  await tl.at(500);
  tl.showCaption(CAPTIONS.editorIntro);
  await hoverOn(tl, "[data-tl=editor-markdown-body]", { ms: 600 });
  await ring(tl, "[data-tl=editor-markdown-body]", 1800);

  await tl.at(2800);
  tl.showCaption(CAPTIONS.updateContent);
  await hoverOn(tl, "[data-tl=textarea-markdown]", { ms: 500 });
  await tl.wait(150);
  tl.setVar("driveMarkdownContent", SAMPLE_MARKDOWN_CONTENT);
  tl.setVar("field:markdownContent", SAMPLE_MARKDOWN_CONTENT);
  tl.setVar("driveMarkdownDirty", true);

  await tl.at(5200);
  tl.showCaption(CAPTIONS.clickSave);
  await hoverOn(tl, "[data-tl=btn-editor-save]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-editor-save]");
  tl.setVar("driveMarkdownSaving", true);
  await tl.wait(600);
  tl.setVar("driveMarkdownSaving", false);
  tl.setVar("driveMarkdownSaved", true);
  tl.setVar("driveMarkdownDirty", false);

  await tl.at(7800);
  tl.showCaption(CAPTIONS.clickClose);
  await hoverOn(tl, "[data-tl=btn-editor-close]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-editor-close]");
  tl.setVar("driveMarkdownEditorOpen", false);
  tl.setVar("driveFileMeetingNotesAdded", true);

  await finishDrive(tl, STEP30_DURATION_MS);
}
