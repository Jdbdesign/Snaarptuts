import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf } from "@/components/pdf/pdf-timeline";

export const STEP6_DURATION_MS = 18500;

export async function runStep6(tl: Timeline) {
  beginPdf(tl, "pdf-add-edit-text", { view: "editor", editorPage: 1 });

  // 1. Add Text tool
  await tl.at(400);
  tl.showCaption("Click Add Text from the editing toolbar.");
  await tl.moveCursorTo("[data-tl=tool-addText]", { ms: 550 });
  await tl.click("[data-tl=tool-addText]");
  tl.setVar("pdf:activeTool", "addText");
  await tl.wait(1500);

  // 2. Click on page near bottom
  await tl.at(2600);
  tl.showCaption("Click on the document to place text.");
  await tl.moveCursorTo("[data-tl=page-text-spot-p1]", { ms: 550 });
  await tl.click("[data-tl=page-text-spot-p1]");
  tl.setVar("pdf:textInputVisible", true);
  await tl.wait(1200);

  // 3. Type text
  await tl.at(4500);
  tl.showCaption("Type text into the document.");
  tl.setVar("pdf:textInputValue", "Sign here");
  tl.setVar("pdf:hasTextAdded", true);
  await tl.wait(1000);
  tl.setVar("pdf:textInputVisible", false);

  // 4. Edit Text tool
  await tl.at(6200);
  tl.showCaption("Click Edit Text to modify styling.");
  await tl.moveCursorTo("[data-tl=tool-editText]", { ms: 500 });
  await tl.click("[data-tl=tool-editText]");
  tl.setVar("pdf:activeTool", "editText");
  await tl.wait(1400);

  // 5. Select placed text
  await tl.at(8200);
  tl.showCaption("Click the placed text to select it.");
  await tl.moveCursorTo("[data-tl=placed-text-sign-here]", { ms: 500 });
  await tl.click("[data-tl=placed-text-sign-here]");
  tl.setVar("pdf:isTextSelected", true);
  await tl.wait(1400);

  // 6. Font size 18
  await tl.at(10200);
  tl.showCaption("Change font size to 18.");
  await tl.moveCursorTo("[data-tl=option-font-size]", { ms: 450 });
  await tl.click("[data-tl=option-font-size]");
  tl.setVar("pdf:textStyle", {
    font: "Helvetica",
    size: 18,
    bold: false,
    italic: false,
    underline: false,
    color: "#000000",
  });
  await tl.wait(1300);

  // 7. Make bold
  await tl.at(12100);
  tl.showCaption("Make text bold.");
  await tl.moveCursorTo("[data-tl=option-bold-btn]", { ms: 400 });
  await tl.click("[data-tl=option-bold-btn]");
  tl.setVar("pdf:textStyle", {
    font: "Helvetica",
    size: 18,
    bold: true,
    italic: false,
    underline: false,
    color: "#000000",
  });
  await tl.wait(1200);

  // 8. Color swatch
  await tl.at(13800);
  tl.showCaption("Review color options.");
  await tl.moveCursorTo("[data-tl=option-color-swatch]", { ms: 400 });
  await tl.click("[data-tl=option-color-swatch]");
  await tl.wait(1000);

  // 9. Deselect text
  await tl.at(15300);
  tl.showCaption("Click document canvas to deselect.");
  await tl.moveCursorTo("[data-tl=editor-page-canvas]", { ms: 400 });
  await tl.click("[data-tl=editor-page-canvas]");
  tl.setVar("pdf:isTextSelected", false);
  await tl.wait(1000);

  // 10. Undo and Redo
  await tl.at(16800);
  tl.showCaption("Undo and redo actions from toolbar.");
  await tl.moveCursorTo("[data-tl=tool-undo]", { ms: 350 });
  await tl.click("[data-tl=tool-undo]");
  await tl.wait(400);
  await tl.moveCursorTo("[data-tl=tool-redo]", { ms: 350 });
  await tl.click("[data-tl=tool-redo]");
  await tl.wait(800);

  await finishPdf(tl);
}
