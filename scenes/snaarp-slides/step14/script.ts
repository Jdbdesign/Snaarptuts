import { OFFLINE } from "@/components/slides/slides-data";
import { chooseItem, hoverItem, openFileMenu, closeFileMenu, toast } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 14 - Make it available offline (File > Make available offline). Starts in the editor with "Acme Studio Pitch". */
export const STEP14_DURATION_MS = 24000;

export async function runStep14(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // Turn it on
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await chooseItem(tl, "offline", { ms: 700 });
  tl.setVar("offline", true);
  toast(tl, OFFLINE.onToast, 3000);
  tl.showCaption(CAPTIONS.on);

  // Open the menu again: a tick shows beside the item
  await tl.at(6500);
  tl.showCaption(CAPTIONS.again);
  await openFileMenu(tl, { ms: 800 });
  await hoverItem(tl, "offline", { ms: 600 });
  await tl.wait(150);
  tl.highlight("[data-tl=file-item-offline]");

  // Turn it off
  await tl.at(11500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.off);
  await chooseItem(tl, "offline", { ms: 500 });
  tl.setVar("offline", false);
  toast(tl, OFFLINE.offToast, 3000);

  await tl.at(16500);
  tl.showCaption(CAPTIONS.done);
  await openFileMenu(tl, { ms: 800 });
  await hoverItem(tl, "offline", { ms: 600 });
  await tl.wait(1800);
  closeFileMenu(tl);

  // Quick white fade
  await tl.at(22800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP14_DURATION_MS);
}
