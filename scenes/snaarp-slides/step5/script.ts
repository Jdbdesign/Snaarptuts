import { toast, chooseItem, closeDialog, openDialog, openFileMenu, pressOn, ring } from "@/components/slides/slides-timeline";
import { DECK, OPENED_TOAST } from "@/components/slides/slides-data";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 5 - Open a presentation (File > Open). Starts in the editor with "Acme Studio Pitch". */
export const STEP5_DURATION_MS = 32800;

const TAB_STEPS: [string, string, number][] = [
  ["drive", CAPTIONS.drive, 3000],
  ["shared", CAPTIONS.shared, 2600],
  ["starred", CAPTIONS.starred, 2600],
  ["computer", CAPTIONS.computer, 3000],
  ["upload", CAPTIONS.upload, 3000],
];

export async function runStep5(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // File > Open
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await chooseItem(tl, "open", { ms: 600 });
  tl.setVar("openLoading", true);
  openDialog(tl, "open");

  // Recent, after a short load
  await tl.at(4200);
  tl.setVar("openLoading", false);
  await tl.wait(80); // let the list render before ringing it
  tl.showCaption(CAPTIONS.recent);
  tl.highlight("[data-tl=open-list]");

  // Walk through the other tabs
  let t = 6400;
  for (const [tab, caption, hold] of TAB_STEPS) {
    await tl.at(t);
    tl.clearHighlight();
    tl.showCaption(caption);
    await pressOn(tl, `[data-tl=open-tab-${tab}]`, { ms: 650 });
    tl.setVar("openTab", tab);
    t += hold + 800;
  }

  // Back to Recent and pick a file
  await tl.at(t);
  tl.showCaption(CAPTIONS.back);
  await pressOn(tl, "[data-tl=open-tab-recent]", { ms: 700 });
  tl.setVar("openTab", "recent");

  await tl.at(t + 2400);
  tl.showCaption(CAPTIONS.pick);
  await tl.moveCursorTo("[data-tl=open-file-2]", { ms: 700 });
  tl.hover("[data-tl=open-file-2]");
  tl.highlight("[data-tl=open-file-2]");
  await tl.wait(300);
  await tl.click("[data-tl=open-file-2]");
  tl.clearHighlight();
  tl.setVar("openPicked", 1);
  await tl.wait(500);
  tl.hover(null);
  closeDialog(tl);
  toast(tl, OPENED_TOAST(DECK.title), 3200);
  tl.showCaption(CAPTIONS.opened);
  await ring(tl, "[data-tl=canvas-slide]", 1400);

  // Quick white fade
  const end = t + 7200;
  await tl.at(end);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(end + 1000);
}
