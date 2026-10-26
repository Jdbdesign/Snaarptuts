import { DECK, DOWNLOAD } from "@/components/slides/slides-data";
import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { closeFileMenu, hoverItem, hoverSub, openFileMenu, pressOn } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 10 - Download in a format you need (File > Download). Starts in the editor with "Acme Studio Pitch". */
export const STEP10_DURATION_MS = 26000;

export async function runStep10(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // File > Download
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await hoverItem(tl, "download", { ms: 600 });

  // The whole-presentation formats
  await tl.at(3500);
  tl.showCaption(CAPTIONS.formats);
  tl.highlight("[data-tl=file-sub-pptx]");
  await tl.wait(1000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.documents);
  for (const id of ["pptx", "odp", "pdf", "txt"]) {
    await hoverSub(tl, id, { ms: 450 });
    await tl.wait(450);
  }

  // The image formats
  await tl.at(9300);
  tl.showCaption(CAPTIONS.images);
  for (const id of ["jpeg", "png", "svg"]) {
    await hoverSub(tl, id, { ms: 450 });
    tl.highlight(`[data-tl=file-sub-${id}]`);
    await tl.wait(600);
  }
  tl.clearHighlight();

  // PDF
  await tl.at(14000);
  tl.showCaption(CAPTIONS.pick);
  await pressOn(tl, "[data-tl=file-sub-pdf]", { ms: 650, dx: -40 });
  closeFileMenu(tl);

  await tl.at(16500);
  tl.showCaption(CAPTIONS.preparing);
  showDocToast(tl, DOWNLOAD.preparing, "loading");

  await tl.at(19500);
  tl.showCaption(CAPTIONS.done);
  showDocToast(tl, DOWNLOAD.done(DOWNLOAD.file(DECK.title, "pdf")), "success", 3600);

  // Quick white fade
  await tl.at(24800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP10_DURATION_MS);
}
