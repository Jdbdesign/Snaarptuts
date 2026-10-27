import { chooseHeaderRow, hoverHeaderRow, openHeader, pointAtMeet } from "@/components/slides/header-timeline";
import { pressOn, typeInto } from "@/components/slides/slides-timeline";
import { MEETING } from "@/components/slides/slides-tools-data";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 55 - Join or start a meeting. Starts in the editor on slide 2. */
export const STEP55_DURATION_MS = 42000;

export async function runStep55(tl: Timeline) {
  beginEiv(tl);
  tl.setVar("headerTip", "");
  tl.setVar("field:meetcode", "");

  // The tooltip
  await tl.at(800);
  tl.showCaption(CAPTIONS.hover);
  await pointAtMeet(tl, 1000);
  tl.showCaption(CAPTIONS.tip);
  await tl.wait(1800);

  // The dropdown
  await tl.at(5000);
  tl.showCaption(CAPTIONS.open);
  await openHeader(tl, "meet", { ms: 400 });
  tl.showCaption(CAPTIONS.rows);
  await hoverHeaderRow(tl, "mt-product", { ms: 600 });
  await hoverHeaderRow(tl, "mt-start", { ms: 400 });
  await hoverHeaderRow(tl, "mt-code", { ms: 400 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.product);
  await hoverHeaderRow(tl, "mt-product", { ms: 500 });
  await tl.wait(1200);

  // Start a new meeting
  await tl.at(13000);
  tl.showCaption(CAPTIONS.start);
  await chooseHeaderRow(tl, "mt-start", { ms: 600 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.started);
  await tl.wait(2600);

  // Use a meeting code
  await tl.at(20000);
  tl.showCaption(CAPTIONS.again);
  await openHeader(tl, "meet", { ms: 800 });
  tl.showCaption(CAPTIONS.code);
  await chooseHeaderRow(tl, "mt-code", { ms: 600 });
  await tl.wait(800);
  tl.showCaption(CAPTIONS.dialog);
  await tl.wait(1200);
  tl.showCaption(CAPTIONS.type);
  await typeInto(tl, "meetcode", MEETING.codeDialog.code, { moveMs: 700, msPerChar: 90 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.cont);
  await pressOn(tl, "[data-tl=meet-continue]", { ms: 800 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.joined);
  await tl.wait(2800);

  await tl.at(37500);
  tl.showCaption(CAPTIONS.done);
  await tl.at(40500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP55_DURATION_MS);
}
