import type { Timeline } from "@/lib/timeline";
import { beginTb, clickCellTb, hoverTool, pressTool } from "@/components/sheets/toolbar-timeline";
import { openCommentBox, postInsertComment } from "@/components/sheets/insert-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, CM105 } from "./data";

/** Snaarp Sheets, step 105 - Insert comment on D3 with an @mention. Starts with A1 selected. */
export const STEP105_DURATION_MS = 30000;

export async function runStep105(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await clickCellTb(tl, CM105.ref, 900);
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "comment", { hold: 1500 });
  tl.showCaption(CAPTIONS.open);
  await pressTool(tl, "comment", { ms: 300 });
  await openCommentBox(tl, CM105.ref);
  tl.showCaption(CAPTIONS.box);
  await ring(tl, "[data-tl=comment-pop]", 1600);
  tl.showCaption(CAPTIONS.type);
  await typeInto(tl, "cmt-pop", CM105.text, { msPerChar: 70 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.post);
  await pressOn(tl, "[data-tl=cmt-post]", { ms: 650 });
  postInsertComment(tl, CM105.ref, CM105.text);
  await tl.wait(800);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=comments-panel]", 2400);
  await finish(tl, 600);
}
