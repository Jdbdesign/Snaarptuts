import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { initEditor } from "@/components/docs/editor-timeline";
import { dragSelectText } from "@/components/docs/format-timeline";
import type { ImageState } from "@/components/docs/insert-state";
import { applyLink, closeLinkDialog, openLinkDialog } from "@/components/docs/insert-timeline";
import { clickTool, edit, initToolbar } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { ADDRESS, CAPTIONS, LINK_ID, PRACTICE_ID, START_EDITOR, TARGET, TOASTS, URLS } from "./step52-data";

/** Snaarp Doc, step 52 - Insert a link and an image. Times are active milliseconds from the start of the step. */
export const STEP52_DURATION_MS = 34000;

export async function runStep52(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.setVar("pageImage", null);
  tl.setVar("linkDialog", false);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Select the words, click Insert link
  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await dragSelectText(tl, PRACTICE_ID, TARGET, { dragMs: 800 });
  await tl.at(3000);
  tl.showCaption(CAPTIONS.link);
  await clickTool(tl, "link", () => openLinkDialog(tl), { tipMs: 900 });

  // Type the address, click Insert
  await tl.at(6500);
  tl.showCaption(CAPTIONS.type);
  await tl.typeText("link-url", ADDRESS, { msPerChar: 90 });
  await tl.at(9500);
  tl.showCaption(CAPTIONS.insert);
  await tl.moveCursorTo("[data-tl=link-insert]", { ms: 800 });
  tl.highlight("[data-tl=link-insert]");
  await tl.wait(200);
  await tl.click("[data-tl=link-insert]");
  tl.clearHighlight();
  closeLinkDialog(tl);
  applyLink(tl, LINK_ID);
  await tl.at(12500);
  tl.showCaption(CAPTIONS.linked);
  tl.highlight(`[data-tl=doc-link-${LINK_ID}]`);

  // Insert image: uploading toast, then the banner
  await tl.at(15500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.image);
  await clickTool(tl, "image", undefined, { tipMs: 900 });
  await tl.at(19000);
  tl.showCaption(CAPTIONS.uploading);
  showDocToast(tl, TOASTS.uploading, "loading");
  await tl.at(21500);
  tl.setVar("pageImage", { selected: false } satisfies ImageState);
  edit(tl, (s) => s);
  showDocToast(tl, TOASTS.uploaded, "success", 3500);
  await tl.at(23500);
  tl.showCaption(CAPTIONS.done);
  tl.highlight("[data-tl=page-image]");

  await tl.at(29000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(33600);
  tl.setVar("fade", true);
  await tl.at(STEP52_DURATION_MS);
}
