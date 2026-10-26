import { chooseItem, closeDialog, openDialog, openFileMenu, pressOn } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 15 - See the presentation details (File > Details). Starts in the editor with "Acme Studio Pitch". */
export const STEP15_DURATION_MS = 21000;

/** Ring a details row for a moment. */
async function row(tl: Timeline, name: string, ms = 750) {
  const sel = `[data-tl=details-row-${name}]`;
  await tl.moveCursorTo(sel, { ms: 450, dx: 40 });
  tl.highlight(sel);
  await tl.wait(ms);
  tl.clearHighlight();
}

export async function runStep15(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // File > Details
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await chooseItem(tl, "details", { ms: 600 });
  openDialog(tl, "details");

  await tl.at(4000);
  tl.showCaption(CAPTIONS.title);
  await row(tl, "title", 900);

  await tl.at(6500);
  tl.showCaption(CAPTIONS.owner);
  await row(tl, "owner");
  await row(tl, "created");
  await row(tl, "last-modified");

  await tl.at(11200);
  tl.showCaption(CAPTIONS.slides);
  await row(tl, "slides");
  await row(tl, "size");

  await tl.at(14300);
  tl.showCaption(CAPTIONS.location);
  await row(tl, "location", 1000);

  await tl.at(16800);
  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=details-done]", { ms: 700 });
  closeDialog(tl);

  // Quick white fade
  await tl.at(19600);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP15_DURATION_MS);
}
