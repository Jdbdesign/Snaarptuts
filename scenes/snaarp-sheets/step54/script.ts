import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { COMMENT_INS } from "@/components/sheets/insert-data";
import { chooseRow, clickCell, openMenu } from "@/components/sheets/edit-timeline";
import { beginInsert, openCommentBox, openReply, postInsertComment, postReply } from "@/components/sheets/insert-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 54 - Insert > Comment (Ctrl+Alt+M) on C3: type "Thank you", Comment, the panel lists it, Reply, close. */
export const STEP54_DURATION_MS = 25200;

export async function runStep54(tl: Timeline) {
  beginInsert(tl, URLS.renamed);

  await tl.at(700);
  tl.showCaption(CAPTIONS.select);
  await clickCell(tl, COMMENT_INS.cell, { ms: 800 });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  await chooseRow(tl, "ins-comment", { ms: 500 });
  await openCommentBox(tl, COMMENT_INS.cell);
  tl.showCaption(CAPTIONS.box);
  await ring(tl, "[data-tl=comment-pop]", 1400);
  tl.showCaption(CAPTIONS.type);
  await typeInto(tl, "cmt-pop", COMMENT_INS.text, { msPerChar: 90 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.post);
  await pressOn(tl, "[data-tl=cmt-post]", { ms: 700 });
  postInsertComment(tl, COMMENT_INS.cell, COMMENT_INS.text);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.panel);
  await ring(tl, "[data-tl=comment-t1]", 1800);
  tl.showCaption(CAPTIONS.tabs);
  await ring(tl, "[data-tl=comments-panel]", 1800);
  tl.showCaption(CAPTIONS.reply);
  await openReply(tl, "t1");
  tl.showCaption(CAPTIONS.typeReply);
  await typeInto(tl, "reply", COMMENT_INS.replyText, { msPerChar: 70 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.send);
  await pressOn(tl, "[data-tl=reply-post]", { ms: 700 });
  postReply(tl, "t1", COMMENT_INS.replyText);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=reply-t1-0]", 1600);
  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=comments-close]", { ms: 700 });
  tl.setVar("commentsOpen", false);
  await tl.wait(700);
  await finish(tl, 500);
}
