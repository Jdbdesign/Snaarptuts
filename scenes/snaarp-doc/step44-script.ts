import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { chooseEsignatureItem, clickEsignatureMenu, typeInEsignatureField } from "@/components/docs/esignature-menu-timeline";
import { ESIGN } from "@/components/docs/insert-data";
import { closeInsertDialog } from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, SAMPLE_EMAIL, SAMPLE_MESSAGE, URLS } from "./step44-data";

/** Snaarp Doc, step 44 - Request a signature (the last step). Times are active milliseconds from the start of the step. */
export const STEP44_DURATION_MS = 24500;

export async function runStep44(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // eSignature > Request signature: the dialog opens on the Request tab
  await tl.at(800);
  tl.showCaption(CAPTIONS.request);
  await clickEsignatureMenu(tl, { ms: 600 });
  await chooseEsignatureItem(tl, "request");

  // What the request does
  await tl.at(4000);
  tl.showCaption(CAPTIONS.about);
  await tl.moveCursorTo("[data-tl=esig-request-hint]", { ms: 700, dx: 60 });
  tl.highlight("[data-tl=esig-request-hint]");

  // The address: the Send Request button turns solid blue
  await tl.at(7000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.email);
  await typeInEsignatureField(tl, "email", SAMPLE_EMAIL, { msPerChar: 110 });

  // The optional message
  await tl.at(12000);
  tl.showCaption(CAPTIONS.message);
  await typeInEsignatureField(tl, "message", SAMPLE_MESSAGE, { msPerChar: 75 });

  // Send Request: the dialog closes and a toast confirms (the recording shows a browser alert here)
  await tl.at(18000);
  tl.showCaption(CAPTIONS.send);
  tl.setVar("esigFocus", "");
  await tl.moveCursorTo("[data-tl=esig-send]", { ms: 800 });
  tl.highlight("[data-tl=esig-send]");
  await tl.wait(200);
  await tl.click("[data-tl=esig-send]");
  tl.clearHighlight();
  closeInsertDialog(tl);
  showDocToast(tl, ESIGN.request.sent, "success", 3200);

  // Hold, then the quick white fade (the completion card follows: it comes after the last step in the config)
  await tl.at(21000);
  tl.hideCaption();
  await tl.at(24100);
  tl.setVar("fade", true);
  await tl.at(STEP44_DURATION_MS);
}
