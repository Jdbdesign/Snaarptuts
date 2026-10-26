import { closeFileMenu, hoverItem, openFileMenu } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 18 - Options that are not available yet (greyed-out File items). Starts in the editor with "Acme Studio Pitch". */
export const STEP18_DURATION_MS = 24000;

const ITEMS: [string, string, number][] = [
  ["video", CAPTIONS.video, 4000],
  ["shortcut", CAPTIONS.shortcut, 7000],
  ["security", CAPTIONS.security, 10000],
  ["language", CAPTIONS.language, 13000],
];

export async function runStep18(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });

  await tl.at(3000);
  tl.showCaption(CAPTIONS.grey);

  // Each greyed-out item: hover it, ring it and show its tooltip
  for (const [id, caption, at] of ITEMS) {
    await tl.at(at);
    tl.clearHighlight();
    tl.showCaption(caption);
    await hoverItem(tl, id, { ms: 650, tip: true });
    tl.highlight(`[data-tl=file-item-${id}]`);
  }

  await tl.at(16500);
  tl.clearHighlight();
  closeFileMenu(tl);
  tl.showCaption(CAPTIONS.done);

  // Quick white fade
  await tl.at(22800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP18_DURATION_MS);
}
