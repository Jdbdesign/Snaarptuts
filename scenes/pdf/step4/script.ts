import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf } from "@/components/pdf/pdf-timeline";

export const STEP4_DURATION_MS = 14500;

export async function runStep4(tl: Timeline) {
  beginPdf(tl, "pdf-upload-to-edit");

  // Beat 1: Click Upload in left menu
  await tl.at(400);
  tl.showCaption("Click Upload in the sidebar.");
  await tl.moveCursorTo("[data-tl=sidebar-nav-upload]", { ms: 600 });
  await tl.click("[data-tl=sidebar-nav-upload]");
  tl.setVar("pdf:activeNav", "upload");
  tl.setVar("pdf:view", "upload");
  await tl.wait(1000);

  // Beat 2: Hover drop zone
  await tl.at(2400);
  tl.showCaption("Hover the drop zone to activate the upload area.");
  await tl.moveCursorTo("[data-tl=upload-dropzone]", { ms: 550 });
  tl.setVar("pdf:isDropzoneHovered", true);
  await tl.wait(1200);

  // Beat 3: Click UPLOAD PDF TO EDIT
  await tl.at(4200);
  tl.showCaption("Click UPLOAD PDF TO EDIT.");
  await tl.moveCursorTo("[data-tl=upload-to-edit-btn]", { ms: 500 });
  await tl.click("[data-tl=upload-to-edit-btn]");
  tl.setVar("pdf:isDropzoneHovered", false);
  tl.setVar("pdf:isPickerOpen", true);
  await tl.wait(1000);

  // Beat 4: Select Acme Resume.pdf
  await tl.at(6000);
  tl.showCaption("Select Acme Resume.pdf.");
  await tl.moveCursorTo("[data-tl=picker-file-acme-resume-pdf]", { ms: 500 });
  await tl.click("[data-tl=picker-file-acme-resume-pdf]");
  tl.setVar("pdf:pickerSelectedFile", "pf-resume");
  await tl.wait(800);

  // Beat 5: Click Open
  await tl.at(7600);
  tl.showCaption("Click Open.");
  await tl.moveCursorTo("[data-tl=picker-open-btn]", { ms: 500 });
  await tl.click("[data-tl=picker-open-btn]");
  tl.setVar("pdf:isPickerOpen", false);

  tl.setVar("pdf:isStorageUploading", true);
  tl.setVar("pdf:storageUploadPercent", 45);
  await tl.wait(500);
  tl.setVar("pdf:storageUploadPercent", 90);
  await tl.wait(500);
  tl.setVar("pdf:storageUploadPercent", 100);
  await tl.wait(400);

  // Processing card
  tl.setVar("pdf:isStorageUploading", false);
  tl.setVar("pdf:view", "editor");
  tl.setVar("pdf:isProcessing", true);
  tl.setVar("pdf:processingPercent", 40);
  await tl.wait(600);
  tl.setVar("pdf:processingPercent", 80);
  await tl.wait(500);
  tl.setVar("pdf:processingPercent", 100);
  await tl.wait(400);

  tl.setVar("pdf:isProcessing", false);
  await tl.wait(1500);

  await finishPdf(tl);
}
