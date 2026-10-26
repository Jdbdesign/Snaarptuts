import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { initEditor } from "@/components/docs/editor-timeline";
import { closeMenu, initToolbar, openMenu } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, CODE, READY, START_EDITOR, URLS } from "./step61-data";

/** Snaarp Doc, step 61 - Start or join a meeting. Times are active milliseconds from the start of the step. */
export const STEP61_DURATION_MS = 29000;

export async function runStep61(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // The Meet button opens its card
  await tl.at(800);
  tl.showCaption(CAPTIONS.meet);
  await openMenu(tl, "meet", "header-meet", { tipMs: 900 });

  // Start new meeting (only pointed at)
  await tl.at(4000);
  tl.showCaption(CAPTIONS.menu);
  await tl.moveCursorTo("[data-tl=tm-meet-start]", { ms: 600, dx: -6 });
  tl.hover("[data-tl=tm-meet-start]");
  await tl.wait(1200);

  // Join with link: the card turns into the meeting code card
  await tl.at(7000);
  tl.showCaption(CAPTIONS.join);
  await tl.moveCursorTo("[data-tl=tm-meet-join]", { ms: 500, dx: -6 });
  tl.hover("[data-tl=tm-meet-join]");
  tl.highlight("[data-tl=tm-meet-join]");
  await tl.wait(500);
  await tl.click("[data-tl=tm-meet-join]");
  tl.clearHighlight();
  tl.hover(null);
  tl.setVar("toolMenu", "meetjoin");
  tl.setVar("meetFocus", true);

  // Type the sample code
  await tl.at(11000);
  tl.showCaption(CAPTIONS.code);
  await tl.moveCursorTo("[data-tl=meet-code]", { ms: 600 });
  await tl.click("[data-tl=meet-code]");
  await tl.typeText("meet-code", CODE, { msPerChar: 110 });

  // Continue
  await tl.at(16500);
  tl.showCaption(CAPTIONS.cont);
  tl.setVar("meetFocus", false);
  await tl.moveCursorTo("[data-tl=meet-continue]", { ms: 700 });
  tl.highlight("[data-tl=meet-continue]");
  await tl.wait(500);
  await tl.click("[data-tl=meet-continue]");
  tl.clearHighlight();
  closeMenu(tl);
  showDocToast(tl, READY, "success", 5500);

  await tl.at(20000);
  tl.showCaption(CAPTIONS.ready);
  await tl.at(26000);
  tl.hideCaption();
  await tl.at(28600);
  tl.setVar("fade", true);
  await tl.at(STEP61_DURATION_MS);
}
