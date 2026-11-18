import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf, pushPdfToast } from "@/components/pdf/pdf-timeline";
import { STEP16_DURATION_MS } from "./data";

export { STEP16_DURATION_MS };

export async function runStep16(tl: Timeline) {
  beginPdf(tl, "pdf-watermark", {
    view: "editor",
    editorPage: 1,
  });

  // 1. Click Watermark tool
  await tl.at(400);
  tl.showCaption("Click Watermark to open the watermark panel.");
  await tl.moveCursorTo("[data-tl=tool-watermark]", { ms: 550 });
  await tl.click("[data-tl=tool-watermark]");
  tl.setVar("pdf:isWatermarkOpen", true);

  // 2. Type "Detailed" in watermark text input
  await tl.at(2200);
  tl.showCaption("Type Detailed in the watermark text field.");
  await tl.moveCursorTo("[data-tl=watermark-text-input]", { ms: 500 });
  await tl.click("[data-tl=watermark-text-input]");
  await tl.typeText("[data-tl=watermark-text-input]", "Detailed");
  tl.setVar("pdf:watermarkText", "Detailed");

  // 3. Set Opacity to 37%
  await tl.at(5200);
  tl.showCaption("Set Opacity to 37% for a subtle watermark.");
  await tl.moveCursorTo("[data-tl=watermark-opacity-slider]", { ms: 500 });
  await tl.click("[data-tl=watermark-opacity-slider]");
  tl.setVar("pdf:watermarkOpacity", 37);

  // 4. Set Rotation to 19°
  await tl.at(7400);
  tl.showCaption("Set Rotation to 19° across the page.");
  await tl.moveCursorTo("[data-tl=watermark-rotation-slider]", { ms: 500 });
  await tl.click("[data-tl=watermark-rotation-slider]");
  tl.setVar("pdf:watermarkRotation", 19);

  // 5. Set Font Size to 129pt
  await tl.at(9600);
  tl.showCaption("Set Font Size to 129pt.");
  await tl.moveCursorTo("[data-tl=watermark-size-slider]", { ms: 500 });
  await tl.click("[data-tl=watermark-size-slider]");
  tl.setVar("pdf:watermarkSize", 129);

  // 6. Click gray swatch
  await tl.at(11800);
  tl.showCaption("Click the gray swatch for a subtle text tone.");
  await tl.moveCursorTo("[data-tl=watermark-color-gray]", { ms: 500 });
  await tl.click("[data-tl=watermark-color-gray]");
  tl.setVar("pdf:watermarkColor", "#9CA3AF");

  // 7. Click Apply Watermark
  await tl.at(14000);
  tl.showCaption("Click Apply Watermark to add it to all pages.");
  await tl.moveCursorTo("[data-tl=watermark-apply-btn]", { ms: 550 });
  await tl.click("[data-tl=watermark-apply-btn]");
  tl.setVar("pdf:hasWatermarkApplied", true);
  pushPdfToast(tl, "Watermark applied successfully");

  // 8. Highlight watermark on page
  await tl.at(16200);
  tl.showCaption("Notice the diagonal translucent watermark across your document.");
  await tl.moveCursorTo("[data-tl=page-watermark-text]", { ms: 500 });
  tl.highlight("[data-tl=page-watermark-text]");
  await tl.wait(1200);

  await finishPdf(tl);
}
