import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf } from "@/components/pdf/pdf-timeline";

export const STEP7_DURATION_MS = 13500;

export async function runStep7(tl: Timeline) {
  beginPdf(tl, "pdf-redact-text", { view: "editor", editorPage: 1 });

  // 1. Redact tool
  await tl.at(400);
  tl.showCaption("Click Redact to mask sensitive information.");
  await tl.moveCursorTo("[data-tl=tool-redact]", { ms: 600 });
  await tl.click("[data-tl=tool-redact]");
  tl.setVar("pdf:activeTool", "redact");
  tl.setVar("pdf:isRedactBannerOpen", true);
  await tl.wait(1800);

  // 2. Drag over name & summary
  await tl.at(3000);
  tl.showCaption("Drag over sensitive content to permanently redact.");
  await tl.moveCursorTo("[data-tl=pdf-page-1]", { ms: 600 });
  await tl.wait(600);
  tl.setVar("pdf:hasRedactions", true);
  await tl.wait(1800);

  // 3. Highlight redaction boxes
  await tl.at(6000);
  tl.showCaption("Content is masked by opaque black redaction boxes.");
  await tl.moveCursorTo("[data-tl=redact-box-name]", { ms: 500 });
  tl.highlight("[data-tl=redact-box-name]");
  await tl.wait(1500);

  await tl.at(8200);
  await tl.moveCursorTo("[data-tl=redact-box-summary]", { ms: 500 });
  tl.highlight("[data-tl=redact-box-summary]");
  await tl.wait(1500);

  // 4. Close redact mode
  await tl.at(10500);
  tl.showCaption("Close redact mode when finished.");
  await tl.moveCursorTo("[data-tl=tool-redact]", { ms: 500 });
  await tl.click("[data-tl=tool-redact]");
  tl.setVar("pdf:activeTool", "select");
  tl.setVar("pdf:isRedactBannerOpen", false);
  await tl.wait(1500);

  await finishPdf(tl);
}
