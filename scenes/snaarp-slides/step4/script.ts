import { toast, chooseSub, closeFileMenu, closeDialog, hoverItem, hoverSub, openDialog, openFileMenu, pressOn } from "@/components/slides/slides-timeline";
import { BLANK_SLIDE, DECK, NEW_PRESENTATION } from "@/components/slides/slides-data";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 4 - Start something new (File > New). Starts in the editor with "Acme Studio Pitch". */
export const STEP4_DURATION_MS = 31000;

export async function runStep4(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // File > New
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await hoverItem(tl, "new", { ms: 600 });
  tl.highlight("[data-tl=file-item-new]");

  await tl.at(4000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.options);
  await hoverSub(tl, "presentation", { ms: 550 });
  await tl.wait(700);
  await hoverSub(tl, "template", { ms: 350 });

  // From template opens the chooser
  await tl.at(7000);
  tl.showCaption(CAPTIONS.template);
  await pressOn(tl, "[data-tl=file-sub-template]", { ms: 350, dx: -40 });
  closeFileMenu(tl);
  openDialog(tl, "templates");

  await tl.at(9300);
  tl.showCaption(CAPTIONS.templateInfo);
  for (const id of ["modern-dark", "ocean-blue", "forest-green"]) {
    await tl.moveCursorTo(`[data-tl=templates-card-${id}]`, { ms: 650 });
    tl.hover(`[data-tl=templates-card-${id}]`);
    await tl.wait(700);
  }
  tl.hover(null);

  await tl.at(13800);
  tl.showCaption(CAPTIONS.cancel);
  await pressOn(tl, "[data-tl=templates-cancel]", { ms: 750 });
  closeDialog(tl);

  // File > New > Presentation
  await tl.at(16000);
  tl.showCaption(CAPTIONS.again);
  await openFileMenu(tl, { ms: 800 });

  await tl.at(18500);
  tl.showCaption(CAPTIONS.blank);
  await chooseSub(tl, "new", "presentation", { ms: 550 });

  // A new, blank deck replaces the one on screen
  await tl.wait(300);
  tl.setVar("fade", true);
  await tl.wait(400);
  tl.setVar("title", DECK.untitled);
  tl.setVar("slides", [BLANK_SLIDE]);
  tl.setVar("selected", 0);
  tl.setUrl(URLS.untitled);
  tl.setVar("fade", false);
  await tl.wait(450);
  toast(tl, NEW_PRESENTATION.toast, 3400);
  tl.showCaption(CAPTIONS.done);

  // Quick white fade
  await tl.at(29600);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP4_DURATION_MS);
}
