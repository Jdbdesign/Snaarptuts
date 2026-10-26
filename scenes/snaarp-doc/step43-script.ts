import { initEditor } from "@/components/docs/editor-timeline";
import {
  chooseEsignatureItem,
  clickEsignatureMenu,
  clickEsignatureTab,
  SIGN_SPOT_EDITOR,
} from "@/components/docs/esignature-menu-timeline";
import { insertObject } from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, PICKER_REST_MS, URLS } from "./step43-data";

/** Snaarp Doc, step 43 - Upload a signature image. Times are active milliseconds from the start of the step. */
export const STEP43_DURATION_MS = 19000;

export async function runStep43(tl: Timeline) {
  initEditor(tl, SIGN_SPOT_EDITOR); // the caret waits on a new empty line under the Contacts paragraph
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // eSignature > Sign document: the dialog opens on Draw
  await tl.at(800);
  tl.showCaption(CAPTIONS.sign);
  await clickEsignatureMenu(tl, { ms: 600 });
  await chooseEsignatureItem(tl, "sign");

  // The Upload tab: the dashed drop zone
  await tl.at(4000);
  tl.showCaption(CAPTIONS.upload);
  await clickEsignatureTab(tl, "upload");

  // Click the drop zone. The computer's file picker is left out: the cursor rests for a moment, then the image is in the page
  await tl.at(6500);
  tl.showCaption(CAPTIONS.drop);
  await tl.moveCursorTo("[data-tl=esig-drop]", { ms: 800 });
  tl.hover("[data-tl=esig-drop]");
  tl.highlight("[data-tl=esig-drop]");
  await tl.wait(200);
  await tl.click("[data-tl=esig-drop]");
  tl.clearHighlight();
  await tl.wait(PICKER_REST_MS);
  tl.hover(null);
  await tl.at(9500);
  insertObject(tl, "upload", { selected: true });

  // The uploaded signature
  await tl.at(12000);
  tl.showCaption(CAPTIONS.done);
  tl.highlight("[data-tl=page-signature]");

  // Hold, then the quick white fade
  await tl.at(16000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(18600);
  tl.setVar("fade", true);
  await tl.at(STEP43_DURATION_MS);
}
