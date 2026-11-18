import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf } from "@/components/pdf/pdf-timeline";

export const STEP11_DURATION_MS = 28000;

export async function runStep11(tl: Timeline) {
  beginPdf(tl, "pdf-sign-document", {
    view: "editor",
    editorPage: 3,
    hasImage: true,
    hasEllipses: true,
    hasCross: true,
    hasCheck: true,
  });

  // 1. Open Sign modal - Draw tab
  await tl.at(400);
  tl.showCaption("Click Sign to create your signature.");
  await tl.moveCursorTo("[data-tl=tool-sign]", { ms: 550 });
  await tl.click("[data-tl=tool-sign]");
  tl.setVar("pdf:isSigModalOpen", true);
  tl.setVar("pdf:sigTab", "draw");
  await tl.wait(1500);

  // 2. Draw signature scribble
  await tl.at(2600);
  tl.showCaption("Draw your signature directly in the box.");
  await tl.moveCursorTo("[data-tl=sig-draw-canvas-box]", { ms: 500 });
  tl.setVar("pdf:hasDrawSig", true);
  await tl.wait(1600);

  // 3. Click Done
  await tl.at(4800);
  tl.showCaption("Click Done to place your drawn signature.");
  await tl.moveCursorTo("[data-tl=sig-done-btn]", { ms: 450 });
  await tl.click("[data-tl=sig-done-btn]");
  tl.setVar("pdf:isSigModalOpen", false);
  await tl.wait(1500);

  // 4. Open Sign modal - Image tab
  await tl.at(7000);
  tl.showCaption("Click Sign to add an image-based signature.");
  await tl.moveCursorTo("[data-tl=tool-sign]", { ms: 500 });
  await tl.click("[data-tl=tool-sign]");
  tl.setVar("pdf:isSigModalOpen", true);
  await tl.wait(1400);

  await tl.at(9000);
  tl.showCaption("Switch to Image tab.");
  await tl.moveCursorTo("[data-tl=sig-tab-image]", { ms: 450 });
  await tl.click("[data-tl=sig-tab-image]");
  tl.setVar("pdf:sigTab", "image");
  await tl.wait(1300);

  await tl.at(10900);
  tl.showCaption("Upload a signature image.");
  await tl.moveCursorTo("[data-tl=sig-image-upload-zone]", { ms: 450 });
  await tl.click("[data-tl=sig-image-upload-zone]");
  tl.setVar("pdf:isPickerOpen", true);
  tl.setVar("pdf:pickerAction", "sig-image");
  await tl.wait(1200);

  await tl.at(12700);
  await tl.moveCursorTo("[data-tl=picker-file-signature-png]", { ms: 450 });
  await tl.click("[data-tl=picker-file-signature-png]");
  tl.setVar("pdf:pickerSelectedFile", "pf-sig");
  await tl.wait(900);

  await tl.at(14100);
  await tl.moveCursorTo("[data-tl=picker-open-btn]", { ms: 400 });
  await tl.click("[data-tl=picker-open-btn]");
  tl.setVar("pdf:isPickerOpen", false);
  tl.setVar("pdf:sigImageUploaded", true);
  await tl.wait(1100);

  await tl.at(15700);
  await tl.moveCursorTo("[data-tl=sig-done-btn]", { ms: 400 });
  await tl.click("[data-tl=sig-done-btn]");
  tl.setVar("pdf:isSigModalOpen", false);
  tl.setVar("pdf:hasImageSig", true);
  await tl.wait(1400);

  // 5. Open Sign modal - Type tab
  await tl.at(17700);
  tl.showCaption("Click Sign to create a typed signature.");
  await tl.moveCursorTo("[data-tl=tool-sign]", { ms: 500 });
  await tl.click("[data-tl=tool-sign]");
  tl.setVar("pdf:isSigModalOpen", true);
  await tl.wait(1200);

  await tl.at(19500);
  tl.showCaption("Switch to Type tab.");
  await tl.moveCursorTo("[data-tl=sig-tab-type]", { ms: 450 });
  await tl.click("[data-tl=sig-tab-type]");
  tl.setVar("pdf:sigTab", "type");
  await tl.wait(1000);

  await tl.at(21000);
  tl.showCaption("Type your initials or name.");
  await tl.moveCursorTo("[data-tl=sig-type-input]", { ms: 450 });
  await tl.click("[data-tl=sig-type-input]");
  await tl.typeText("[data-tl=sig-type-input]", "JD", { msPerChar: 60 });
  tl.setVar("field:sig-type-input", "JD");
  tl.setVar("pdf:sigTypeInput", "JD");
  await tl.wait(1100);

  await tl.at(22600);
  tl.showCaption("Select signature font style and color.");
  await tl.moveCursorTo("[data-tl=sig-font-style-2]", { ms: 450 });
  await tl.click("[data-tl=sig-font-style-2]");
  tl.setVar("pdf:sigTypeStyleIndex", 1);
  await tl.wait(800);

  await tl.at(23900);
  await tl.moveCursorTo("[data-tl=sig-color-blue]", { ms: 400 });
  await tl.click("[data-tl=sig-color-blue]");
  tl.setVar("pdf:sigColor", "#2563EB");
  await tl.wait(800);

  await tl.at(25100);
  await tl.moveCursorTo("[data-tl=sig-done-btn]", { ms: 400 });
  await tl.click("[data-tl=sig-done-btn]");
  tl.setVar("pdf:isSigModalOpen", false);
  tl.setVar("pdf:hasTypeSig", true);
  await tl.wait(1200);

  // 6. Open Sign modal - Saved tab
  await tl.at(26700);
  tl.showCaption("Review saved signatures or cancel.");
  await tl.moveCursorTo("[data-tl=tool-sign]", { ms: 400 });
  await tl.click("[data-tl=tool-sign]");
  tl.setVar("pdf:isSigModalOpen", true);
  tl.setVar("pdf:sigTab", "saved");
  await tl.wait(800);

  await tl.moveCursorTo("[data-tl=sig-cancel-btn]", { ms: 350 });
  await tl.click("[data-tl=sig-cancel-btn]");
  tl.setVar("pdf:isSigModalOpen", false);
  await tl.wait(800);

  await finishPdf(tl);
}
