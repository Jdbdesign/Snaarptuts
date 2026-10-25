import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { initEditor, markEdited, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { clickInsertMenu, chooseInsertItem } from "@/components/docs/insert-menu-timeline";
import type { ImageState } from "@/components/docs/insert-state";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, TOASTS, URLS } from "./step20-data";

/** Snaarp Doc, step 20 - Insert an image. Times are active milliseconds from the start of the step. */
export const STEP20_DURATION_MS = 22000;

export async function runStep20(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Insert > Image
  await tl.at(800);
  tl.showCaption(CAPTIONS.insertImage);
  await clickInsertMenu(tl);
  await chooseInsertItem(tl, "image");

  // The computer's file picker is not drawn: the cursor rests for a moment, then the upload toast shows
  await tl.at(3500);
  tl.showCaption(CAPTIONS.choose);
  await tl.at(5000);
  showDocToast(tl, TOASTS.uploading, "loading");

  // The banner appears at the top of the page and pushes the text down
  await tl.at(6500);
  tl.setVar("pageImage", { selected: false } satisfies ImageState);
  markEdited(tl);
  showDocToast(tl, TOASTS.uploaded, "success", 3500);

  // Click the image: four corner handles and the floating toolbar
  await tl.at(9500);
  tl.showCaption(CAPTIONS.select);
  await tl.moveCursorTo("[data-tl=page-image]", { ms: 900 });
  tl.highlight("[data-tl=page-image]");
  await tl.wait(150);
  await tl.click("[data-tl=page-image]");
  tl.clearHighlight();
  tl.setVar("pageImage", { selected: true } satisfies ImageState);

  // A corner handle (hover ring only: the recording does not show resizing)
  await tl.at(13000);
  tl.showCaption(CAPTIONS.resize);
  await tl.moveCursorTo("[data-tl=image-handle-br]", { ms: 800 });
  tl.hover("[data-tl=image-handle-br]");
  tl.highlight("[data-tl=image-handle-br]");

  // Hold, then the quick white fade
  await tl.at(18000);
  tl.clearHighlight();
  tl.hover(null);
  tl.hideCaption();
  await tl.at(21600);
  tl.setVar("fade", true);
  await tl.at(STEP20_DURATION_MS);
}
