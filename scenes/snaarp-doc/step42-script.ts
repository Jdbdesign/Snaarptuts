import { initEditor } from "@/components/docs/editor-timeline";
import {
  chooseEsignatureItem,
  clickEsignatureMenu,
  clickEsignatureTab,
  SIGN_SPOT_EDITOR,
  typeInEsignatureField,
} from "@/components/docs/esignature-menu-timeline";
import { insertObject } from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, SAMPLE_NAME, URLS } from "./step42-data";

/** Snaarp Doc, step 42 - Type your signature. Times are active milliseconds from the start of the step. */
export const STEP42_DURATION_MS = 26000;

export async function runStep42(tl: Timeline) {
  initEditor(tl, SIGN_SPOT_EDITOR); // the caret waits on a new empty line under the Contacts paragraph
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // eSignature > Sign document: the dialog opens on Draw
  await tl.at(800);
  tl.showCaption(CAPTIONS.sign);
  await clickEsignatureMenu(tl, { ms: 600 });
  await chooseEsignatureItem(tl, "sign");

  // The Type tab
  await tl.at(4000);
  tl.showCaption(CAPTIONS.type);
  await clickEsignatureTab(tl, "type");

  // Type the name: the button turns solid blue and the preview appears
  await tl.at(6500);
  tl.showCaption(CAPTIONS.name);
  await typeInEsignatureField(tl, "name", SAMPLE_NAME, { msPerChar: 220 });

  // The preview
  await tl.at(12000);
  tl.showCaption(CAPTIONS.preview);
  await tl.moveCursorTo("[data-tl=esig-preview]", { ms: 700, dx: 120, dy: 20 });
  tl.highlight("[data-tl=esig-preview]");

  // Insert Signature: the dialog closes and the typed signature is in the page, selected
  await tl.at(15500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.insert);
  await tl.moveCursorTo("[data-tl=esig-insert]", { ms: 800 });
  tl.highlight("[data-tl=esig-insert]");
  await tl.wait(200);
  await tl.click("[data-tl=esig-insert]");
  tl.clearHighlight();
  insertObject(tl, "typed", { selected: true, text: SAMPLE_NAME });

  // The typed signature
  await tl.at(19500);
  tl.showCaption(CAPTIONS.done);
  tl.highlight("[data-tl=page-signature]");

  // Hold, then the quick white fade
  await tl.at(24000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(25600);
  tl.setVar("fade", true);
  await tl.at(STEP42_DURATION_MS);
}
