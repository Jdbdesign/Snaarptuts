import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf, pushPdfToast } from "@/components/pdf/pdf-timeline";
import { STEP13_DURATION_MS } from "./data";

export { STEP13_DURATION_MS };

export async function runStep13(tl: Timeline) {
  beginPdf(tl, "pdf-annotate", {
    view: "editor",
    editorPage: 1,
  });

  // 1. Click Annotations tool
  await tl.at(400);
  tl.showCaption("Click Annotations to open the annotation tools.");
  await tl.moveCursorTo("[data-tl=tool-annotations]", { ms: 550 });
  await tl.click("[data-tl=tool-annotations]");
  tl.setVar("pdf:activeTool", "annotations");

  // 2. Click Stamps button
  await tl.at(2000);
  tl.showCaption("Click Stamps to open the stamps palette.");
  await tl.moveCursorTo("[data-tl=annot-btn-stamps]", { ms: 500 });
  await tl.click("[data-tl=annot-btn-stamps]");
  tl.setVar("pdf:isStampsOpen", true);

  // 3. Click APPROVED stamp
  await tl.at(3800);
  tl.showCaption("Click APPROVED to select the approval stamp.");
  await tl.moveCursorTo("[data-tl=stamp-item-approved]", { ms: 500 });
  await tl.click("[data-tl=stamp-item-approved]");
  tl.setVar("pdf:selectedStamp", "approved");

  // 4. Click document canvas to place stamp
  await tl.at(5600);
  tl.showCaption("Click the document to place the stamp.");
  await tl.moveCursorTo("[data-tl=pdf-page-1]", { ms: 600 });
  await tl.click("[data-tl=pdf-page-1]");
  tl.setVar("pdf:hasApprovedStamp", true);
  tl.setVar("pdf:isStampsOpen", false);

  // 5. Highlight placed stamp
  await tl.at(7400);
  tl.showCaption("Notice the placed stamp with active selection box.");
  await tl.moveCursorTo("[data-tl=placed-stamp-approved]", { ms: 500 });
  tl.highlight("[data-tl=placed-stamp-approved]");
  await tl.wait(1500);

  // 6. Click Undo
  await tl.at(9600);
  tl.showCaption("Click Undo to revert the last action if needed.");
  await tl.moveCursorTo("[data-tl=tool-undo]", { ms: 550 });
  await tl.click("[data-tl=tool-undo]");
  pushPdfToast(tl, "Action undone", "info");

  // 7. Click Highlight
  await tl.at(11600);
  tl.showCaption("Click Highlight to mark important sections.");
  await tl.moveCursorTo("[data-tl=annot-btn-highlight]", { ms: 550 });
  await tl.click("[data-tl=annot-btn-highlight]");
  tl.setVar("pdf:annotSubtool", "highlight");
  tl.setVar("pdf:hasHighlights", true);

  // 8. Click Pencil
  await tl.at(13500);
  tl.showCaption("Click Pencil to draw freehand annotations.");
  await tl.moveCursorTo("[data-tl=annot-btn-pencil]", { ms: 550 });
  await tl.click("[data-tl=annot-btn-pencil]");
  tl.setVar("pdf:annotSubtool", "pencil");
  tl.setVar("pdf:hasPencilRed", true);

  // 9. Click Shapes
  await tl.at(15400);
  tl.showCaption("Click Shapes to view available callout symbols.");
  await tl.moveCursorTo("[data-tl=annot-btn-shapes]", { ms: 500 });
  await tl.click("[data-tl=annot-btn-shapes]");
  tl.setVar("pdf:isShapesOpen", true);

  // 10. Click Check shape
  await tl.at(16800);
  tl.showCaption("Click Check to insert a verification mark.");
  await tl.moveCursorTo("[data-tl=shape-item-check]", { ms: 450 });
  await tl.click("[data-tl=shape-item-check]");
  tl.setVar("pdf:hasCheckShape", true);
  tl.setVar("pdf:isShapesOpen", false);
  await tl.wait(1200);

  await finishPdf(tl);
}
