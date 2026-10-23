import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { chooseFileMenuItem, clickFileMenu, hoverDownloadItem, hoverFileMenuItem } from "@/components/docs/file-menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, DOWNLOAD_ORDER, TOASTS, URLS } from "./step6-data";

/** Snaarp Doc, step 6 - Download and save to Drive. Times are active milliseconds from the start of the step. */
export const STEP6_DURATION_MS = 16400;

export async function runStep6(tl: Timeline) {
  tl.placeCursor(0.5, 0.45); // where step 5 left the cursor (middle of the page)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Click File
  await tl.at(800);
  tl.showCaption(CAPTIONS.clickFile);
  await clickFileMenu(tl);

  // Download: the submenu opens
  await tl.at(2400);
  tl.showCaption(CAPTIONS.download);
  await hoverFileMenuItem(tl, "download", { ms: 550 });

  // Down the submenu, about 0.6 s per format
  await tl.at(3600);
  tl.showCaption(CAPTIONS.formats);
  for (const id of DOWNLOAD_ORDER) {
    await hoverDownloadItem(tl, id, { ms: 250 });
    await tl.wait(350);
  }

  // Back to the main menu: Save to Drive
  await tl.at(7000);
  tl.showCaption(CAPTIONS.drive);
  await chooseFileMenuItem(tl, "drive", { ms: 600 });

  // Uploading, then saved
  await tl.at(8500);
  showDocToast(tl, TOASTS.uploading, "loading");
  await tl.at(10800);
  showDocToast(tl, TOASTS.saved, "success", 3000); // hides itself at 13.8
  tl.showCaption(CAPTIONS.saved);

  // Quick white fade
  await tl.at(16000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP6_DURATION_MS);
}
