import type { Timeline } from "@/lib/timeline";
import { HEADER_COPY } from "@/components/sheets/toolbar-data";
import { beginTb, closeDialog, closeHeaderMenu, hoverHeader, pressHeader, pickRow } from "@/components/sheets/toolbar-timeline";
import { openDialog, pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 114 - the video call icon: Start new meeting (a sample link) and Join with link. No real meeting. Starts with A1 selected. */
export const STEP114_DURATION_MS = 40000;

export async function runStep114(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.hover);
  await hoverHeader(tl, "video", { hold: 1400 });
  tl.showCaption(CAPTIONS.open);
  await pressHeader(tl, "video", "video", { ms: 300 });
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=tm-video]", 1800);
  tl.showCaption(CAPTIONS.start);
  await pickRow(tl, "video", "start", () => {}, { keepOpen: true });
  closeHeaderMenu(tl);
  openDialog(tl, "meet");
  await tl.wait(800);
  tl.showCaption(CAPTIONS.started);
  await ring(tl, "[data-tl=meet-link]", 2200);
  tl.showCaption(CAPTIONS.copy);
  await pressOn(tl, "[data-tl=meet-copy]", { ms: 650 });
  tl.setVar("meetCopied", true);
  await tl.wait(1200);
  tl.showCaption(CAPTIONS.done);
  await pressOn(tl, "[data-tl=meet-done]", { ms: 650 });
  closeDialog(tl);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.again);
  await pressHeader(tl, "video", "video", { ms: 700 });
  await pickRow(tl, "video", "join", () => {}, { keepOpen: true });
  closeHeaderMenu(tl);
  openDialog(tl, "join");
  await tl.wait(700);
  tl.showCaption(CAPTIONS.join);
  await typeInto(tl, "join", HEADER_COPY.joinDialog.sample, { msPerChar: 55 });
  tl.showCaption(CAPTIONS.continue);
  await ring(tl, "[data-tl=join-continue]", 1600);
  tl.showCaption(CAPTIONS.back);
  await pressOn(tl, "[data-tl=join-back]", { ms: 650 });
  closeDialog(tl);
  await finish(tl, 900);
}
