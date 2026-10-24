import {
  clickAddComment,
  clickReply,
  clickSubmitComment,
  initComments,
  typeComment,
} from "@/components/docs/comments-timeline";
import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { EMPTY_COMMENTS } from "@/components/docs/comments-state";
import { chooseViewItem, clickViewMenu } from "@/components/docs/view-menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, COMMENT_TEXT, URLS } from "./step15-data";

/** Snaarp Doc, step 15 - Open Comments and add a comment. Times are active milliseconds from the start of the step. */
export const STEP15_DURATION_MS = 24000;

export async function runStep15(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  initComments(tl, EMPTY_COMMENTS, false);
  tl.placeCursor(0.5, 0.45); // where step 14 left the cursor (middle of the page)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // View > Comments: the panel slides in from the right, empty
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await clickViewMenu(tl);
  await chooseViewItem(tl, "comments");

  // The panel
  await tl.at(3500);
  tl.showCaption(CAPTIONS.panel);
  tl.highlight("[data-tl=comments-panel-card]");
  await tl.at(6000);
  tl.clearHighlight();

  // Add comment: the composer card appears with its input focused
  tl.showCaption(CAPTIONS.add);
  await clickAddComment(tl);

  // Type the comment: Comment turns solid blue
  await tl.at(8000);
  tl.showCaption(CAPTIONS.type);
  await tl.wait(500);
  await typeComment(tl, COMMENT_TEXT, { msPerChar: 130 });

  // Click Comment: the thread card appears
  await tl.at(12500);
  tl.showCaption(CAPTIONS.submit);
  await clickSubmitComment(tl);
  await tl.at(14000);
  tl.showCaption(CAPTIONS.saved);

  // The reply input
  await tl.at(17500);
  tl.showCaption(CAPTIONS.reply);
  await clickReply(tl, "t1");

  // Hold, then the quick white fade
  await tl.at(23500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP15_DURATION_MS);
}
