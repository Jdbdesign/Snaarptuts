import type { Timeline } from "@/lib/timeline";
import { postInsertComment } from "@/components/sheets/insert-timeline";
import { TB_COMMENT } from "@/components/sheets/toolbar-data";
import { beginTb, hoverHeader, pressHeader } from "@/components/sheets/toolbar-timeline";
import { pressOn, ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 113 - the comments icon opens the same Comments panel as View > Comments. Starts with the step 105 comment on D3 (panel closed). */
export const STEP113_DURATION_MS = 18700;

export async function runStep113(tl: Timeline) {
  beginTb(tl, "a1");
  postInsertComment(tl, TB_COMMENT.cell.toLowerCase(), `${TB_COMMENT.text} ${TB_COMMENT.mention}`);
  tl.setVar("commentsOpen", false);

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await ring(tl, "[data-tl=cell-d3]", 2000);
  tl.showCaption(CAPTIONS.hover);
  await hoverHeader(tl, "comments", { hold: 1400 });
  tl.showCaption(CAPTIONS.open);
  await pressHeader(tl, "comments", undefined, { ms: 300 });
  tl.setVar("commentsOpen", true);
  await tl.wait(800);
  tl.showCaption(CAPTIONS.panel);
  await ring(tl, "[data-tl=comments-panel]", 1800);
  tl.showCaption(CAPTIONS.thread);
  await ring(tl, "[data-tl=comment-t1]", 2000);
  tl.showCaption(CAPTIONS.corner);
  await ring(tl, "[data-tl=cell-d3]", 1800);
  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=comments-close]", { ms: 700 });
  tl.setVar("commentsOpen", false);
  await finish(tl, 900);
}
