import { chooseFileMenuItem, clickFileMenu } from "@/components/docs/file-menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, NEW_NAME, TITLES, URLS } from "./step7-data";

/** Snaarp Doc, step 7 - Rename your document. Times are active milliseconds from the start of the step. */
export const STEP7_DURATION_MS = 11400;

export async function runStep7(tl: Timeline) {
  tl.placeCursor(0.5, 0.45); // where step 6 left the cursor (middle of the page)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // File > Rename
  await tl.at(800);
  tl.showCaption(CAPTIONS.fileRename);
  await clickFileMenu(tl, { ms: 650 });
  await chooseFileMenuItem(tl, "rename", { ms: 450 });

  // The dialog opens with the current title selected
  await tl.at(3000);
  tl.setVar("renameSelected", true);
  tl.setVar("renameFocus", true);
  tl.setVar("rename", true);
  tl.showCaption(CAPTIONS.type);

  // Select all, then type over it
  await tl.at(4200);
  await tl.wait(500);
  tl.setVar("renameSelected", false);
  await tl.typeText("rename", NEW_NAME, { msPerChar: 90 });

  // Click OK
  await tl.at(6200);
  tl.showCaption(CAPTIONS.ok);
  await tl.moveCursorTo("[data-tl=rename-ok]", { ms: 650 });
  tl.highlight("[data-tl=rename-ok]");
  await tl.wait(200);
  await tl.click("[data-tl=rename-ok]");
  tl.clearHighlight();
  tl.setVar("rename", false);

  // The new name
  await tl.at(7400);
  tl.setVar("title", TITLES.renamed);
  tl.showCaption(CAPTIONS.renamed);
  tl.highlight("[data-tl=editor-title]");
  await tl.wait(1400);
  tl.clearHighlight();

  // Hold, then quick white fade
  await tl.at(11000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP7_DURATION_MS);
}
