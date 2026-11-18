import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf } from "@/components/pdf/pdf-timeline";
import {
  INITIAL_FILES,
  FILE_STEP3_PDF,
  FILE_STEP3_JPG,
} from "@/components/pdf/pdf-data";

export const STEP3_DURATION_MS = 16000;

export async function runStep3(tl: Timeline) {
  beginPdf(tl, "pdf-upload-file");

  // 1. Upload Acme Project Brief.pdf
  await tl.at(400);
  tl.showCaption("Click Upload file to open the file chooser.");
  await tl.moveCursorTo("[data-tl=upload-file-btn]", { ms: 600 });
  await tl.click("[data-tl=upload-file-btn]");
  tl.setVar("pdf:isPickerOpen", true);
  await tl.wait(1000);

  await tl.at(2200);
  tl.showCaption("Select Acme Project Brief.pdf.");
  await tl.moveCursorTo("[data-tl=picker-file-acme-project-brief-pdf]", { ms: 550 });
  await tl.click("[data-tl=picker-file-acme-project-brief-pdf]");
  tl.setVar("pdf:pickerSelectedFile", "pf-project-brief");
  await tl.wait(800);

  await tl.at(4000);
  tl.showCaption("Click Open to start uploading.");
  await tl.moveCursorTo("[data-tl=picker-open-btn]", { ms: 500 });
  await tl.click("[data-tl=picker-open-btn]");
  tl.setVar("pdf:isPickerOpen", false);
  tl.setVar("pdf:isUploading", true);
  await tl.wait(1200);

  tl.setVar("pdf:isUploading", false);
  tl.setVar("pdf:files", [FILE_STEP3_PDF, ...INITIAL_FILES]);
  await tl.wait(1400);

  // 2. Upload Site Photo.jpg
  await tl.at(7600);
  tl.showCaption("Click Upload file again.");
  await tl.moveCursorTo("[data-tl=upload-file-btn]", { ms: 550 });
  await tl.click("[data-tl=upload-file-btn]");
  tl.setVar("pdf:isPickerOpen", true);
  await tl.wait(1000);

  await tl.at(9400);
  tl.showCaption("Select Site Photo.jpg.");
  await tl.moveCursorTo("[data-tl=picker-file-site-photo-jpg]", { ms: 550 });
  await tl.click("[data-tl=picker-file-site-photo-jpg]");
  tl.setVar("pdf:pickerSelectedFile", "pf-photo");
  await tl.wait(800);

  await tl.at(11200);
  tl.showCaption("Click Open to complete the upload.");
  await tl.moveCursorTo("[data-tl=picker-open-btn]", { ms: 500 });
  await tl.click("[data-tl=picker-open-btn]");
  tl.setVar("pdf:isPickerOpen", false);
  tl.setVar("pdf:isUploading", true);
  await tl.wait(1200);

  tl.setVar("pdf:isUploading", false);
  tl.setVar("pdf:files", [FILE_STEP3_JPG, FILE_STEP3_PDF, ...INITIAL_FILES]);
  await tl.wait(1600);

  await finishPdf(tl);
}
