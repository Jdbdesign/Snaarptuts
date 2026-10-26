import { PAGE_SETUP } from "@/components/slides/slides-data";
import { chooseItem, closeDialog, openDialog, openFileMenu, pressOn, ring, typeInto } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 16 - Set the page size (File > Page setup). Starts in the editor with "Acme Studio Pitch". */
export const STEP16_DURATION_MS = 38000;

const RATIO = { "16:9": 16 / 9, "4:3": 4 / 3 };

/** Pick a page option, press Apply and show the new shape. */
async function apply(tl: Timeline, id: "16:9" | "4:3") {
  await pressOn(tl, "[data-tl=page-apply]", { ms: 800 });
  tl.setVar("ratio", RATIO[id]);
  closeDialog(tl);
}

export async function runStep16(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // File > Page setup
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await chooseItem(tl, "pagesetup", { ms: 600 });
  openDialog(tl, "pageSetup");

  await tl.at(4000);
  tl.showCaption(CAPTIONS.wide);
  tl.highlight("[data-tl=page-option-16x9]");

  // Custom
  await tl.at(6800);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.custom);
  await pressOn(tl, "[data-tl=page-option-custom]", { ms: 750 });
  tl.setVar("aspectChoice", "custom");
  await tl.wait(450);
  tl.showCaption(CAPTIONS.width);
  await typeInto(tl, "page-w", PAGE_SETUP.customSample.width, { msPerChar: 110 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.height);
  await typeInto(tl, "page-h", PAGE_SETUP.customSample.height, { msPerChar: 110 });
  tl.setVar("focus", "");

  // Standard 4:3
  await tl.at(14800);
  tl.showCaption(CAPTIONS.standard);
  await pressOn(tl, "[data-tl=page-option-4x3]", { ms: 800 });
  tl.setVar("aspectChoice", "4:3");
  await tl.wait(700);
  tl.showCaption(CAPTIONS.apply);
  await apply(tl, "4:3");

  await tl.at(19500);
  tl.showCaption(CAPTIONS.changed);
  tl.highlight("[data-tl=canvas-slide]");
  tl.highlight("[data-tl=thumb-1]");
  await tl.wait(2600);
  tl.clearHighlight();

  // Back to 16:9
  await tl.at(24500);
  tl.showCaption(CAPTIONS.again);
  await openFileMenu(tl, { ms: 800 });
  await chooseItem(tl, "pagesetup", { ms: 600 });
  openDialog(tl, "pageSetup");

  await tl.at(29000);
  tl.showCaption(CAPTIONS.back);
  await pressOn(tl, "[data-tl=page-option-16x9]", { ms: 800 });
  tl.setVar("aspectChoice", "16:9");
  await tl.wait(600);
  await apply(tl, "16:9");
  tl.showCaption(CAPTIONS.restored);
  await ring(tl, "[data-tl=canvas-slide]", 1500);

  // Quick white fade
  await tl.at(36600);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP16_DURATION_MS);
}
