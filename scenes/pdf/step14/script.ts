import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf } from "@/components/pdf/pdf-timeline";
import { STEP14_DURATION_MS } from "./data";

export { STEP14_DURATION_MS };

export async function runStep14(tl: Timeline) {
  beginPdf(tl, "pdf-layout", {
    view: "editor",
    editorPage: 1,
  });

  // 1. Click Links tool
  await tl.at(400);
  tl.showCaption("Click Links to configure page viewing preferences.");
  await tl.moveCursorTo("[data-tl=tool-links]", { ms: 550 });
  await tl.click("[data-tl=tool-links]");
  tl.setVar("pdf:activeTool", "links");

  // 2. Select Two-Page spread
  await tl.at(2200);
  tl.showCaption("Click the view selector to switch to Two-Page spread.");
  await tl.moveCursorTo("[data-tl=links-view-select]", { ms: 500 });
  await tl.click("[data-tl=links-view-select]");
  tl.setVar("pdf:linksViewMode", "two-page");

  // 3. Adjust line thickness slider
  await tl.at(4500);
  tl.showCaption("Adjust the line thickness slider to 5px.");
  await tl.moveCursorTo("[data-tl=links-thickness-slider]", { ms: 550 });
  await tl.click("[data-tl=links-thickness-slider]");
  tl.setVar("pdf:linksLineThickness", 5);
  await tl.wait(1200);

  // 4. Click Page Layout tool
  await tl.at(7000);
  tl.showCaption("Click Page Layout to open orientation settings.");
  await tl.moveCursorTo("[data-tl=tool-pageLayout]", { ms: 550 });
  await tl.click("[data-tl=tool-pageLayout]");
  tl.setVar("pdf:isPageLayoutOpen", true);

  // 5. Click Rotate 90 CCW
  await tl.at(9200);
  tl.showCaption("Click Rotate 90° CCW to adjust orientation.");
  await tl.moveCursorTo("[data-tl=layout-rotate-ccw]", { ms: 500 });
  await tl.click("[data-tl=layout-rotate-ccw]");
  tl.setVar("pdf:pageRotation", -90);

  // 6. Click Rotate 90 CW
  await tl.at(11400);
  tl.showCaption("Click Rotate 90° CW to return to upright orientation.");
  await tl.moveCursorTo("[data-tl=layout-rotate-cw]", { ms: 500 });
  await tl.click("[data-tl=layout-rotate-cw]");
  tl.setVar("pdf:pageRotation", 0);

  // 7. Click Single Page mode
  await tl.at(13600);
  tl.showCaption("Click Single Page to restore the standard view.");
  await tl.moveCursorTo("[data-tl=layout-mode-single]", { ms: 500 });
  await tl.click("[data-tl=layout-mode-single]");
  tl.setVar("pdf:pageLayoutMode", "single");
  tl.setVar("pdf:linksViewMode", "single");
  tl.setVar("pdf:isPageLayoutOpen", false);
  await tl.wait(1500);

  await finishPdf(tl);
}
