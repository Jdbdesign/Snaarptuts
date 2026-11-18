import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf, pushPdfToast } from "@/components/pdf/pdf-timeline";
import {
  INITIAL_FILES,
  FILE_STEP3_PDF,
  FILE_STEP3_JPG,
  FILE_STEP12_RESUME,
} from "@/components/pdf/pdf-data";

export const STEP12_DURATION_MS = 14500;

export async function runStep12(tl: Timeline) {
  beginPdf(tl, "pdf-finish-download", {
    view: "editor",
    editorPage: 3,
    hasImage: true,
    hasEllipses: true,
    hasCross: true,
    hasCheck: true,
    hasDrawSig: true,
    hasImageSig: true,
    hasTypeSig: true,
  });

  // 1. Click Done button
  await tl.at(400);
  tl.showCaption("Click Done to save and process your document.");
  await tl.moveCursorTo("[data-tl=editor-done-btn]", { ms: 600 });
  await tl.click("[data-tl=editor-done-btn]");

  // 2. Processing modal
  await tl.at(1800);
  tl.setVar("pdf:isProcessing", true);
  tl.setVar("pdf:processingPercent", 30);
  await tl.wait(600);
  tl.setVar("pdf:processingPercent", 70);
  await tl.wait(600);
  tl.setVar("pdf:processingPercent", 100);
  await tl.wait(600);

  // 3. Land on My files with updated list
  await tl.at(4000);
  tl.setVar("pdf:isProcessing", false);
  tl.setVar("pdf:view", "files");
  tl.setVar("pdf:activeNav", "my-files");
  tl.setVar("pdf:files", [
    FILE_STEP12_RESUME,
    FILE_STEP3_JPG,
    FILE_STEP3_PDF,
    ...INITIAL_FILES,
  ]);
  pushPdfToast(tl, "Document saved");
  tl.showCaption("Your edited document is saved to My files.");
  await tl.wait(1800);

  // 4. Highlight new file row
  await tl.at(6500);
  tl.showCaption("Review the newly created document.");
  await tl.moveCursorTo("[data-tl=row-acme-resume]", { ms: 550 });
  tl.highlight("[data-tl=row-acme-resume]");
  await tl.wait(1800);

  // 5. Download icon
  await tl.at(9000);
  tl.showCaption("Click the download button to save to your device.");
  await tl.moveCursorTo("[data-tl=action-download-row-resume]", { ms: 500 });
  await tl.click("[data-tl=action-download-row-resume]");
  pushPdfToast(tl, "Download started");
  await tl.wait(2000);

  await finishPdf(tl);
}
