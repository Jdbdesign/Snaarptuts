import { closeFileMenu, hoverItem, openFileMenu, ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 3 - Meet the File menu. Starts in the editor with "Acme Studio Pitch". */
export const STEP3_DURATION_MS = 21000;

export async function runStep3(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // Click File
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });

  // Create and open
  await tl.at(3000);
  tl.showCaption(CAPTIONS.create);
  tl.highlight("[data-tl=file-group-0]");
  await hoverItem(tl, "open", { ms: 700 });
  await tl.wait(500);
  await hoverItem(tl, "import", { ms: 350 });

  // Share and export
  await tl.at(6000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.share);
  tl.highlight("[data-tl=file-group-1]");
  await hoverItem(tl, "share", { ms: 700 });
  await tl.wait(500);
  await hoverItem(tl, "email", { ms: 350 });
  await tl.wait(500);
  tl.setVar("fileSub", "");

  // Manage
  await tl.at(9500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.manage);
  tl.highlight("[data-tl=file-group-2]");
  await hoverItem(tl, "rename", { ms: 700 });
  await tl.wait(450);
  await hoverItem(tl, "move", { ms: 300 });
  await tl.wait(450);
  await hoverItem(tl, "trash", { ms: 300 });

  // Versions and offline
  await tl.at(12700);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.versions);
  tl.highlight("[data-tl=file-group-3]");
  await hoverItem(tl, "offline", { ms: 700 });

  // Details and print
  await tl.at(15200);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.details);
  tl.highlight("[data-tl=file-group-4]");
  tl.highlight("[data-tl=file-group-5]");
  await hoverItem(tl, "details", { ms: 700 });
  await tl.wait(450);
  await hoverItem(tl, "pagesetup", { ms: 300 });
  await tl.wait(450);
  await hoverItem(tl, "print", { ms: 300 });

  // Close the menu
  await tl.at(18300);
  tl.clearHighlight();
  closeFileMenu(tl);
  tl.showCaption(CAPTIONS.close);
  await ring(tl, "[data-tl=editor-menu-file]", 1000);

  // Quick white fade
  await tl.at(20000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP3_DURATION_MS);
}
