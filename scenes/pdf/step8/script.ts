import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf } from "@/components/pdf/pdf-timeline";

export const STEP8_DURATION_MS = 20500;

export async function runStep8(tl: Timeline) {
  beginPdf(tl, "pdf-highlight-draw", {
    view: "editor",
    editorPage: 1,
    hasRedactions: true,
  });

  // 1. Highlight tool
  await tl.at(400);
  tl.showCaption("Click Highlight to mark key sections.");
  await tl.moveCursorTo("[data-tl=tool-highlight]", { ms: 550 });
  await tl.click("[data-tl=tool-highlight]");
  tl.setVar("pdf:activeTool", "highlight");
  await tl.wait(1400);

  // 2. Select yellow color
  await tl.at(2500);
  tl.showCaption("Select highlight color.");
  await tl.moveCursorTo("[data-tl=swatch-yellow]", { ms: 450 });
  await tl.click("[data-tl=swatch-yellow]");
  tl.setVar("pdf:highlightColor", "#FEF08A");
  await tl.wait(1100);

  // 3. Select 14px width
  await tl.at(4200);
  tl.showCaption("Select stroke width.");
  await tl.moveCursorTo("[data-tl=width-14px]", { ms: 450 });
  await tl.click("[data-tl=width-14px]");
  tl.setVar("pdf:highlightWidth", "14px");
  await tl.wait(1100);

  // 4. Highlight summary section
  await tl.at(5900);
  tl.showCaption("Highlight summary and experience sections.");
  await tl.moveCursorTo("[data-tl=pdf-page-1]", { ms: 550 });
  tl.setVar("pdf:hasHighlights", true);
  await tl.wait(1800);

  // 5. Pencil tool
  await tl.at(8400);
  tl.showCaption("Click Pencil for freehand annotations.");
  await tl.moveCursorTo("[data-tl=tool-pencil]", { ms: 500 });
  await tl.click("[data-tl=tool-pencil]");
  tl.setVar("pdf:activeTool", "pencil");
  await tl.wait(1400);

  // 6. Navigate to page 3
  await tl.at(10500);
  tl.showCaption("Navigate to page 3 in the pages panel.");
  await tl.moveCursorTo("[data-tl=page-thumb-3]", { ms: 550 });
  await tl.click("[data-tl=page-thumb-3]");
  tl.setVar("pdf:editorPage", 3);
  await tl.wait(1600);

  // 7. Draw black loop
  await tl.at(12800);
  tl.showCaption("Draw annotations directly onto the canvas.");
  await tl.moveCursorTo("[data-tl=pdf-page-3]", { ms: 600 });
  tl.setVar("pdf:hasPencilBlack", true);
  await tl.wait(1800);

  // 8. Select red swatch
  await tl.at(15300);
  tl.showCaption("Switch stroke color to red.");
  await tl.moveCursorTo("[data-tl=swatch-red]", { ms: 500 });
  await tl.click("[data-tl=swatch-red]");
  tl.setVar("pdf:highlightColor", "#FECACA");
  await tl.wait(1200);

  // 9. Draw red loop
  await tl.at(17200);
  tl.showCaption("Add contrasting annotation strokes.");
  await tl.moveCursorTo("[data-tl=pdf-page-3]", { ms: 550 });
  tl.setVar("pdf:hasPencilRed", true);
  await tl.wait(1800);

  await finishPdf(tl);
}
