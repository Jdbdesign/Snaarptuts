import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf } from "@/components/pdf/pdf-timeline";

export const STEP10_DURATION_MS = 16000;

export async function runStep10(tl: Timeline) {
  beginPdf(tl, "pdf-add-shapes", {
    view: "editor",
    editorPage: 3,
    hasImage: true,
  });

  // 1. Click Ellipse
  await tl.at(400);
  tl.showCaption("Click Ellipse to draw circular outlines.");
  await tl.moveCursorTo("[data-tl=tool-ellipse]", { ms: 550 });
  await tl.click("[data-tl=tool-ellipse]");
  tl.setVar("pdf:activeTool", "ellipse");
  await tl.wait(1400);

  // 2. Draw ellipses
  await tl.at(2500);
  tl.showCaption("Draw highlight rings around document items.");
  await tl.moveCursorTo("[data-tl=pdf-page-3]", { ms: 600 });
  tl.setVar("pdf:hasEllipses", true);
  await tl.wait(1800);

  // 3. Click Cross
  await tl.at(5200);
  tl.showCaption("Click Cross to add rejection or error markers.");
  await tl.moveCursorTo("[data-tl=tool-cross]", { ms: 500 });
  await tl.click("[data-tl=tool-cross]");
  tl.setVar("pdf:activeTool", "cross");
  await tl.wait(1400);

  // 4. Place red X
  await tl.at(7300);
  tl.showCaption("Place a red cross marker on the document.");
  await tl.moveCursorTo("[data-tl=pdf-page-3]", { ms: 500 });
  await tl.click("[data-tl=pdf-page-3]");
  tl.setVar("pdf:hasCross", true);
  await tl.wait(1600);

  // 5. Click Check
  await tl.at(9800);
  tl.showCaption("Click Check to add approval tick marks.");
  await tl.moveCursorTo("[data-tl=tool-check]", { ms: 500 });
  await tl.click("[data-tl=tool-check]");
  tl.setVar("pdf:activeTool", "check");
  await tl.wait(1400);

  // 6. Place green check
  await tl.at(12000);
  tl.showCaption("Place a green checkmark on the document.");
  await tl.moveCursorTo("[data-tl=pdf-page-3]", { ms: 500 });
  await tl.click("[data-tl=pdf-page-3]");
  tl.setVar("pdf:hasCheck", true);
  await tl.wait(1800);

  await finishPdf(tl);
}
