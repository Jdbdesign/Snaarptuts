import type { Timeline } from "@/lib/timeline";
import { COMMENTS } from "@/components/sheets/edit-view-data";
import { beginEdit, chooseSub, clickCell, openMenu, postComment } from "@/components/sheets/edit-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 33 - View > Comments > Show comments, add a comment on C3, close the panel. */
export const STEP33_DURATION_MS = 24700;

export async function runStep33(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "view", { ms: 900 });
  await chooseSub(tl, "comments", "comments-show", { ms: 500 });
  await tl.wait(800);
  tl.showCaption(CAPTIONS.panel);
  await ring(tl, "[data-tl=comments-panel]", 2400);

  tl.showCaption(CAPTIONS.cell);
  await clickCell(tl, COMMENTS.cell.toLowerCase(), { ms: 900 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.add);
  await pressOn(tl, "[data-tl=comments-add]", { ms: 800 });
  tl.setVar("commentUi", "compose");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.type);
  await typeInto(tl, "comment", COMMENTS.text, { msPerChar: 70 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.post);
  await pressOn(tl, "[data-tl=comment-post]", { ms: 700 });
  postComment(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.posted);
  await ring(tl, "[data-tl=comment-t1]", 1800);
  await ring(tl, `[data-tl=cell-${COMMENTS.cell.toLowerCase()}]`, 1800);

  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=comments-close]", { ms: 700 });
  tl.setVar("commentsOpen", false);
  await tl.wait(700);
  await finish(tl, 1500);
}
