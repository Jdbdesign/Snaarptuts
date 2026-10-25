import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { chooseInsertItem, clickInsertMenu } from "@/components/docs/insert-menu-timeline";
import { clickEndAndNewLine, insertObject } from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, HOVER_TABS, LAST_BLOCK, URLS } from "./step29-data";

/** Snaarp Doc, step 29 - Add an eSignature. Times are active milliseconds from the start of the step. */
export const STEP29_DURATION_MS = 24000;

export async function runStep29(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // A new line under the Contacts paragraph, then Insert > eSignature
  await tl.at(800);
  tl.showCaption(CAPTIONS.click);
  await clickEndAndNewLine(tl, LAST_BLOCK);
  await tl.at(2500);
  tl.showCaption(CAPTIONS.insert);
  await clickInsertMenu(tl);
  await chooseInsertItem(tl, "esignature");

  // Draw: the cursor follows the sample stroke and the stroke appears behind it
  await tl.at(5500);
  tl.showCaption(CAPTIONS.draw);
  await tl.followPath("[data-tl=esig-stroke]", 3200, (p) => tl.setVar("esigProgress", p));

  // The other tabs (hover only)
  await tl.at(10000);
  tl.showCaption(CAPTIONS.tabs);
  for (const id of HOVER_TABS) {
    await tl.moveCursorTo(`[data-tl=esig-tab-${id}]`, { ms: 600 });
    tl.hover(`[data-tl=esig-tab-${id}]`);
    await tl.wait(650);
  }
  tl.hover(null);

  // Insert Signature: the dialog closes and the signature is in the page
  await tl.at(14000);
  tl.showCaption(CAPTIONS.button);
  await tl.moveCursorTo("[data-tl=esig-insert]", { ms: 800 });
  tl.highlight("[data-tl=esig-insert]");
  await tl.wait(200);
  await tl.click("[data-tl=esig-insert]");
  tl.clearHighlight();
  insertObject(tl, "signature");

  // The signature
  await tl.at(17500);
  tl.showCaption(CAPTIONS.done);
  tl.highlight("[data-tl=page-signature]");

  // Hold, then the quick white fade
  await tl.at(20500);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(23600);
  tl.setVar("fade", true);
  await tl.at(STEP29_DURATION_MS);
}
