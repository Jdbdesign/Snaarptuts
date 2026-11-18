import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf } from "@/components/pdf/pdf-timeline";

export const STEP5_DURATION_MS = 24000;

export async function runStep5(tl: Timeline) {
  beginPdf(tl, "pdf-meet-editor", { view: "editor", editorPage: 1 });

  // 1. Ring header & title
  await tl.at(400);
  tl.showCaption("Document title and back navigation.");
  await tl.moveCursorTo("[data-tl=editor-title-group]", { ms: 600 });
  tl.highlight("[data-tl=editor-title-group]");
  await tl.wait(1800);

  // 2. Ring Done button
  await tl.at(2800);
  tl.showCaption("Save changes and finish editing.");
  await tl.moveCursorTo("[data-tl=editor-done-btn]", { ms: 550 });
  tl.highlight("[data-tl=editor-done-btn]");
  await tl.wait(1800);

  // 3. Ring toolbar
  await tl.at(5200);
  tl.showCaption("Explore PDF editing tools.");
  await tl.moveCursorTo("[data-tl=editor-toolbar]", { ms: 550 });
  tl.highlight("[data-tl=editor-toolbar]");
  await tl.wait(1800);

  // Hover unseen tools
  await tl.at(7600);
  await tl.moveCursorTo("[data-tl=tool-eraser]", { ms: 300 });
  await tl.wait(200);
  await tl.moveCursorTo("[data-tl=tool-annotations]", { ms: 300 });
  await tl.wait(200);
  await tl.moveCursorTo("[data-tl=tool-links]", { ms: 300 });
  await tl.wait(200);
  await tl.moveCursorTo("[data-tl=tool-pageLayout]", { ms: 300 });
  await tl.wait(200);
  await tl.moveCursorTo("[data-tl=tool-managePages]", { ms: 300 });
  await tl.wait(200);
  await tl.moveCursorTo("[data-tl=tool-watermark]", { ms: 300 });
  await tl.wait(200);
  await tl.moveCursorTo("[data-tl=tool-share]", { ms: 300 });
  await tl.wait(200);
  await tl.moveCursorTo("[data-tl=tool-translate]", { ms: 300 });
  await tl.wait(400);

  // 4. Ring Pages panel
  await tl.at(10400);
  tl.showCaption("View all page thumbnails.");
  await tl.moveCursorTo("[data-tl=editor-pages-panel]", { ms: 550 });
  tl.highlight("[data-tl=editor-pages-panel]");
  await tl.wait(1800);

  // 5. Click thumbnail 2
  await tl.at(12800);
  tl.showCaption("Click thumbnail 2 to view page 2.");
  await tl.moveCursorTo("[data-tl=page-thumb-2]", { ms: 500 });
  await tl.click("[data-tl=page-thumb-2]");
  tl.setVar("pdf:editorPage", 2);
  await tl.wait(1400);

  // 6. Click thumbnail 1
  await tl.at(14800);
  tl.showCaption("Click thumbnail 1 to return to page 1.");
  await tl.moveCursorTo("[data-tl=page-thumb-1]", { ms: 500 });
  await tl.click("[data-tl=page-thumb-1]");
  tl.setVar("pdf:editorPage", 1);
  await tl.wait(1400);

  // 7. Dark bottom pill interactions
  await tl.at(16800);
  tl.showCaption("Click next page arrow.");
  await tl.moveCursorTo("[data-tl=pill-next-page]", { ms: 500 });
  await tl.click("[data-tl=pill-next-page]");
  tl.setVar("pdf:editorPage", 2);
  await tl.wait(1000);

  await tl.at(18400);
  tl.showCaption("Click previous page arrow.");
  await tl.moveCursorTo("[data-tl=pill-prev-page]", { ms: 450 });
  await tl.click("[data-tl=pill-prev-page]");
  tl.setVar("pdf:editorPage", 1);
  await tl.wait(1000);

  await tl.at(20000);
  tl.showCaption("Zoom out to 90%.");
  await tl.moveCursorTo("[data-tl=pill-zoom-out]", { ms: 450 });
  await tl.click("[data-tl=pill-zoom-out]");
  tl.setVar("pdf:zoom", 90);
  await tl.wait(1000);

  await tl.at(21600);
  tl.showCaption("Zoom in to 100%.");
  await tl.moveCursorTo("[data-tl=pill-zoom-in]", { ms: 450 });
  await tl.click("[data-tl=pill-zoom-in]");
  tl.setVar("pdf:zoom", 100);
  await tl.wait(1000);

  await tl.at(23200);
  tl.showCaption("Click Fit Width.");
  await tl.moveCursorTo("[data-tl=pill-fit-width]", { ms: 450 });
  await tl.click("[data-tl=pill-fit-width]");
  tl.setVar("pdf:zoom", 100);
  await tl.wait(1200);

  await finishPdf(tl);
}
