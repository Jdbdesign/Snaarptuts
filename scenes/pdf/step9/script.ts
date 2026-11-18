import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf } from "@/components/pdf/pdf-timeline";

export const STEP9_DURATION_MS = 18500;

export async function runStep9(tl: Timeline) {
  beginPdf(tl, "pdf-add-image", { view: "editor", editorPage: 3 });

  // 1. Click Image tool
  await tl.at(400);
  tl.showCaption("Click Image from the editing toolbar.");
  await tl.moveCursorTo("[data-tl=tool-image]", { ms: 550 });
  await tl.click("[data-tl=tool-image]");
  tl.setVar("pdf:isPickerOpen", true);
  tl.setVar("pdf:pickerAction", "image");
  await tl.wait(1500);

  // 2. Select Site Photo.jpg
  await tl.at(2600);
  tl.showCaption("Select Site Photo.jpg from your files.");
  await tl.moveCursorTo("[data-tl=picker-file-site-photo-jpg]", { ms: 500 });
  await tl.click("[data-tl=picker-file-site-photo-jpg]");
  tl.setVar("pdf:pickerSelectedFile", "pf-photo");
  await tl.wait(1200);

  // 3. Click Open
  await tl.at(4500);
  tl.showCaption("Click Open to insert the image.");
  await tl.moveCursorTo("[data-tl=picker-open-btn]", { ms: 450 });
  await tl.click("[data-tl=picker-open-btn]");
  tl.setVar("pdf:isPickerOpen", false);
  tl.setVar("pdf:hasImage", true);
  tl.setVar("pdf:isImageSelected", true);
  await tl.wait(1800);

  // 4. Resize handle
  await tl.at(7200);
  tl.showCaption("Resize or adjust the placed image.");
  await tl.moveCursorTo("[data-tl=image-handle-bottom-right]", { ms: 550 });
  await tl.wait(1500);

  // 5. Delete image
  await tl.at(9500);
  tl.showCaption("Click the delete badge to remove image.");
  await tl.moveCursorTo("[data-tl=image-delete-circle]", { ms: 500 });
  await tl.click("[data-tl=image-delete-circle]");
  tl.setVar("pdf:hasImage", false);
  await tl.wait(1600);

  // 6. Re-add image
  await tl.at(12000);
  tl.showCaption("Re-insert the image onto the page.");
  await tl.moveCursorTo("[data-tl=tool-image]", { ms: 500 });
  await tl.click("[data-tl=tool-image]");
  tl.setVar("pdf:isPickerOpen", true);
  tl.setVar("pdf:pickerAction", "image");
  await tl.wait(1400);

  await tl.at(14200);
  await tl.moveCursorTo("[data-tl=picker-file-site-photo-jpg]", { ms: 450 });
  await tl.click("[data-tl=picker-file-site-photo-jpg]");
  tl.setVar("pdf:pickerSelectedFile", "pf-photo");
  await tl.wait(1000);

  await tl.at(15800);
  await tl.moveCursorTo("[data-tl=picker-open-btn]", { ms: 400 });
  await tl.click("[data-tl=picker-open-btn]");
  tl.setVar("pdf:isPickerOpen", false);
  tl.setVar("pdf:hasImage", true);
  tl.setVar("pdf:isImageSelected", true);
  await tl.wait(1500);

  await finishPdf(tl);
}
