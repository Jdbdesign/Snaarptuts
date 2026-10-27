import { pressEscFromFullScreen } from "@/components/docs/view-menu-timeline";
import { chooseHeaderRow, hoverHeaderRow, openHeader, closeHeader } from "@/components/slides/header-timeline";
import { pressFullScreenArrow } from "@/components/slides/menu-timeline";
import { pressOn, ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 54 - Present your slides. Starts in the editor on slide 2. */
export const STEP54_DURATION_MS = 64000;

export async function runStep54(tl: Timeline) {
  beginEiv(tl);
  for (const [k, v] of [["presenter", false], ["fullScreen", false], ["displayMonitor", "screen1"], ["laser", false], ["headerTip", ""]] as const) tl.setVar(k, v);

  // The dropdown
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openHeader(tl, "slideshow", { ms: 900 });
  tl.showCaption(CAPTIONS.rows);
  await hoverHeaderRow(tl, "ss-presenter", { ms: 600 });
  await hoverHeaderRow(tl, "ss-beginning", { ms: 400 });
  tl.showCaption(CAPTIONS.cast);
  await hoverHeaderRow(tl, "ss-chromecast", { ms: 400 });
  await tl.wait(1100);
  await hoverHeaderRow(tl, "ss-options", { ms: 400 });
  await tl.wait(500);

  // Presenter view
  await tl.at(9000);
  tl.showCaption(CAPTIONS.presenter);
  await chooseHeaderRow(tl, "ss-presenter", { ms: 600 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.presenterOpen);
  await ring(tl, "[data-tl=presenter-notes]", 2400);
  await ring(tl, "[data-tl=presenter-timer]", 1400);
  tl.showCaption(CAPTIONS.next);
  await pressOn(tl, "[data-tl=presenter-next]", { ms: 900, ring: false });
  await tl.wait(2400);
  tl.showCaption(CAPTIONS.end);
  await pressOn(tl, "[data-tl=presenter-end]", { ms: 900, ring: false });
  await tl.wait(800);

  // Start from beginning
  await tl.at(26500);
  tl.showCaption(CAPTIONS.beginning);
  await openHeader(tl, "slideshow", { ms: 800 });
  await chooseHeaderRow(tl, "ss-beginning", { ms: 500 });
  await tl.wait(1500);
  tl.showCaption(CAPTIONS.shortcut);
  await tl.wait(2800);
  tl.showCaption(CAPTIONS.arrow);
  await pressFullScreenArrow(tl, "next");
  await tl.wait(1400);
  tl.showCaption(CAPTIONS.esc);
  await pressEscFromFullScreen(tl);
  await tl.wait(600);

  // Presentation display options
  await tl.at(42500);
  tl.showCaption(CAPTIONS.options);
  await openHeader(tl, "slideshow", { ms: 800 });
  await chooseHeaderRow(tl, "ss-options", { ms: 500 });
  await tl.wait(800);
  tl.showCaption(CAPTIONS.monitor);
  await pressOn(tl, "[data-tl=disp-monitor-screen2]", { ms: 900, ring: false });
  await tl.wait(800);
  tl.showCaption(CAPTIONS.laser);
  await pressOn(tl, "[data-tl=disp-laser]", { ms: 800, ring: false });
  await tl.wait(900);
  tl.showCaption(CAPTIONS.done);
  await pressOn(tl, "[data-tl=disp-done]", { ms: 800 });
  tl.setVar("dialog", "");
  closeHeader(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.finish);

  await tl.at(61500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP54_DURATION_MS);
}
