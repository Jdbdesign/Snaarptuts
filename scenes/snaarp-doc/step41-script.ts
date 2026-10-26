import { initEditor } from "@/components/docs/editor-timeline";
import {
  chooseEsignatureItem,
  clickEsignatureMenu,
  hoverEsignatureItem,
  SIGN_SPOT_EDITOR,
} from "@/components/docs/esignature-menu-timeline";
import { insertObject } from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step41-data";

/** Snaarp Doc, step 41 - Sign your document. Times are active milliseconds from the start of the step. */
export const STEP41_DURATION_MS = 24000;

export async function runStep41(tl: Timeline) {
  initEditor(tl, SIGN_SPOT_EDITOR); // the caret waits on a new empty line under the Contacts paragraph
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Open the eSignature menu
  await tl.at(800);
  tl.showCaption(CAPTIONS.menu);
  await clickEsignatureMenu(tl);
  await tl.at(2500);
  tl.showCaption(CAPTIONS.about);
  tl.highlight("[data-tl=esign-menu-card]");
  await tl.wait(500);
  await hoverEsignatureItem(tl, "history"); // greyed out, stays greyed

  // Sign document: the dialog opens on the Draw tab
  await tl.at(5000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.sign);
  await chooseEsignatureItem(tl, "sign");

  // Draw: the cursor follows the sample stroke and the stroke appears behind it
  await tl.at(7500);
  tl.showCaption(CAPTIONS.draw);
  await tl.followPath("[data-tl=esig-stroke]", 3200, (p) => tl.setVar("esigProgress", p));

  // Insert Signature: the dialog closes and the signature is in the page, selected
  await tl.at(12000);
  tl.showCaption(CAPTIONS.insert);
  await tl.moveCursorTo("[data-tl=esig-insert]", { ms: 800 });
  tl.highlight("[data-tl=esig-insert]");
  await tl.wait(200);
  await tl.click("[data-tl=esig-insert]");
  tl.clearHighlight();
  insertObject(tl, "signature", { selected: true });

  // The signature
  await tl.at(16500);
  tl.showCaption(CAPTIONS.done);
  tl.highlight("[data-tl=page-signature]");

  // Hold, then the quick white fade
  await tl.at(21000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(23600);
  tl.setVar("fade", true);
  await tl.at(STEP41_DURATION_MS);
}
