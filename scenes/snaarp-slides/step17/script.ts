import { PRINT_SLIDES } from "@/components/slides/slides-data";
import { chooseItem, openFileMenu, toast } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 17 - Print your presentation (File > Print). Starts in the editor with "Acme Studio Pitch". */
export const STEP17_DURATION_MS = 33000;

/** Open a setting's option list, hover and click one option. */
async function choose(tl: Timeline, setting: string, option: string, label: string) {
  const row = `[data-tl=print-setting-${setting}]`;
  await tl.moveCursorTo(row, { ms: 700, dx: 90 });
  tl.hover(row);
  tl.highlight(row);
  await tl.wait(200);
  await tl.click(row);
  tl.clearHighlight();
  tl.setVar("printOpen", setting);
  await tl.wait(450);
  const opt = `[data-tl=print-opt-${setting}-${option}]`;
  await tl.moveCursorTo(opt, { ms: 450 });
  tl.hover(opt);
  await tl.wait(400);
  await tl.click(opt);
  tl.hover(null);
  const values = tl.getVar<Record<string, string>>("printValues", {});
  tl.setVar("printValues", { ...values, [setting]: label });
  tl.setVar("printOpen", "");
}

export async function runStep17(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // File > Print
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await chooseItem(tl, "print", { ms: 600 });
  tl.setVar("print", true);

  await tl.at(4000);
  tl.showCaption(CAPTIONS.panel);
  tl.highlight("[data-tl=print-settings]");

  // Layout: Slides -> Handouts
  await tl.at(6500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.layout);
  await tl.wait(1200);
  tl.showCaption(CAPTIONS.handouts);
  await choose(tl, "layout", "handouts", "Handouts");

  // Range: All slides -> Current slide
  await tl.at(14500);
  tl.showCaption(CAPTIONS.range);
  await tl.wait(1300);
  tl.showCaption(CAPTIONS.current);
  await choose(tl, "range", "current-slide", "Current slide");

  // Back to one slide per page
  await tl.at(22000);
  tl.showCaption(CAPTIONS.layout);
  await choose(tl, "layout", "slides", "Slides");

  // Print
  await tl.at(27000);
  tl.showCaption(CAPTIONS.print);
  await tl.moveCursorTo("[data-tl=print-btn]", { ms: 700 });
  tl.highlight("[data-tl=print-btn]");
  await tl.wait(250);
  await tl.click("[data-tl=print-btn]");
  tl.clearHighlight();
  tl.setVar("print", false);
  toast(tl, PRINT_SLIDES.toast, 3000);
  tl.showCaption(CAPTIONS.done);

  // Quick white fade
  await tl.at(31800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP17_DURATION_MS);
}
