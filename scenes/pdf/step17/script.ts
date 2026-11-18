import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf, pushPdfToast } from "@/components/pdf/pdf-timeline";
import { STEP17_DURATION_MS } from "./data";

export { STEP17_DURATION_MS };

export async function runStep17(tl: Timeline) {
  beginPdf(tl, "pdf-export", {
    view: "editor",
    editorPage: 1,
    hasWatermarkApplied: true,
    watermarkText: "Detailed",
    watermarkOpacity: 37,
    watermarkRotation: 19,
    watermarkSize: 129,
    watermarkColor: "#9CA3AF",
  });

  // 1. Click Done button
  await tl.at(400);
  tl.showCaption("Click Done to finalize and prepare your export.");
  await tl.moveCursorTo("[data-tl=editor-done-btn]", { ms: 600 });
  await tl.click("[data-tl=editor-done-btn]");
  tl.setVar("pdf:isExportOpen", true);

  // 2. Click PDF format card
  await tl.at(2500);
  tl.showCaption("Click PDF to select standard document export.");
  await tl.moveCursorTo("[data-tl=export-format-pdf]", { ms: 550 });
  await tl.click("[data-tl=export-format-pdf]");
  tl.setVar("pdf:exportFormat", "pdf");

  // 3. Type "Personal File" in file name input
  await tl.at(5000);
  tl.showCaption("Type Personal File in the file name field.");
  await tl.moveCursorTo("[data-tl=export-filename-input]", { ms: 500 });
  await tl.click("[data-tl=export-filename-input]");
  await tl.typeText("[data-tl=export-filename-input]", "Personal File");
  tl.setVar("pdf:exportFileName", "Personal File");

  // 4. Highlight helper text
  await tl.at(8200);
  tl.showCaption("Check the character count and allowed character guidelines.");
  await tl.moveCursorTo("[data-tl=export-filename-helper]", { ms: 500 });
  tl.highlight("[data-tl=export-filename-helper]");
  await tl.wait(1500);

  // 5. Click Download button
  await tl.at(10800);
  tl.showCaption("Click Download to export your completed document.");
  await tl.moveCursorTo("[data-tl=export-download-btn]", { ms: 550 });
  await tl.click("[data-tl=export-download-btn]");
  pushPdfToast(tl, "Export started");
  tl.setVar("pdf:isExportOpen", false);
  await tl.wait(2000);

  await finishPdf(tl);
}
