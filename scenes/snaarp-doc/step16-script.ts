import {
  chooseFilter,
  clickClosePanelX,
  clickEmptyPanel,
  clickSelectionComment,
  clickSubmitComment,
  hoverFilterItem,
  hoverThreadMenuItem,
  initComments,
  ONE_THREAD,
  openFilter,
  openThreadMenu,
  typeComment,
} from "@/components/docs/comments-timeline";
import { dragSelectPhrase, initEditor, PHRASE_EDITOR } from "@/components/docs/editor-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, COMMENT_TEXT, URLS } from "./step16-data";

/** Snaarp Doc, step 16 - Manage comments. Times are active milliseconds from the start of the step. */
export const STEP16_DURATION_MS = 36000;

export async function runStep16(tl: Timeline) {
  initEditor(tl, PHRASE_EDITOR);
  initComments(tl, ONE_THREAD, true); // the panel is already open with the comment from step 15
  tl.placeCursor(0.8, 0.5); // near the panel, where step 15 left the cursor
  tl.setUrl(URLS.editor);
  await tl.wait(350); // let the page settle beside the panel before it fades in
  tl.setVar("intro", 1); // the editor fades in

  // The three dots: Resolve and Delete (hover only)
  await tl.at(800);
  tl.showCaption(CAPTIONS.menu);
  await openThreadMenu(tl, "t1");
  await hoverThreadMenuItem(tl, "resolve");
  await tl.wait(500);
  await hoverThreadMenuItem(tl, "delete");
  await tl.at(4200);
  await clickEmptyPanel(tl);

  // The filter: All types, Open, Resolved (hover), All types stays
  await tl.at(5000);
  tl.showCaption(CAPTIONS.filter);
  await openFilter(tl);
  await hoverFilterItem(tl, "open");
  await tl.wait(300);
  await hoverFilterItem(tl, "resolved");
  await tl.wait(300);
  await chooseFilter(tl, "all");

  // Select a phrase in the document: blue highlight and the floating toolbar
  await tl.at(10000);
  tl.showCaption(CAPTIONS.select);
  await dragSelectPhrase(tl);

  // The comment icon of the floating toolbar: a composer card appears under the first comment
  await tl.at(14000);
  tl.showCaption(CAPTIONS.icon);
  await clickSelectionComment(tl);

  await tl.at(16000);
  tl.showCaption(CAPTIONS.type);
  await tl.wait(400);
  await typeComment(tl, COMMENT_TEXT, { msPerChar: 110 });

  // Comment: a second thread card, and the phrase gets the yellow-orange highlight
  await tl.at(20000);
  tl.showCaption(CAPTIONS.submit);
  await clickSubmitComment(tl);

  await tl.at(23500);
  tl.showCaption(CAPTIONS.highlight);
  tl.highlight("[data-tl=doc-comment-t2]");
  await tl.at(27000);
  tl.clearHighlight();
  await tl.moveCursorTo("[data-tl=doc-comment-t2]", { ms: 700 });
  tl.highlight("[data-tl=doc-comment-t2]");
  await tl.wait(800);
  tl.clearHighlight();
  await tl.moveCursorTo("[data-tl=thread-t2]", { ms: 700, dx: 30 });
  tl.highlight("[data-tl=thread-t2]");
  await tl.wait(800);
  tl.clearHighlight();

  // X closes the panel; the page centres again and the highlight stays
  await tl.at(30500);
  tl.showCaption(CAPTIONS.close);
  await clickClosePanelX(tl);

  // Hold, then the quick white fade
  await tl.at(35600);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP16_DURATION_MS);
}
