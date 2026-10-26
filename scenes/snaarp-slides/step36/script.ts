import { beginEiv } from "../eiv";
import { closeMenu, hoverRow, openMenu } from "@/components/slides/menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/**
 * Snaarp Slides, step 36 - Features coming soon: the greyed-out rows of View and Insert show a dark "Coming soon" tooltip.
 * Starts in the editor on slide 2. The last step of the Edit, View and Insert round: the completion card follows the last step in the config.
 */
export const STEP36_DURATION_MS = 26000;

export async function runStep36(tl: Timeline) {
  beginEiv(tl);

  // View > Animations panel
  await tl.at(800);
  tl.showCaption(CAPTIONS.view);
  await openMenu(tl, "view", { ms: 800 });
  await hoverRow(tl, "view", "animations", { ms: 700, tip: true });
  tl.showCaption(CAPTIONS.animations);
  tl.highlight("[data-tl=view-item-animations]");
  await tl.wait(2400);
  tl.clearHighlight();
  closeMenu(tl);

  // Insert > Video, Audio, Word art
  await tl.at(7000);
  tl.showCaption(CAPTIONS.insert);
  await openMenu(tl, "insert", { ms: 800 });
  for (const id of ["video", "audio", "wordart"] as const) {
    await hoverRow(tl, "insert", id, { ms: id === "video" ? 650 : 350, tip: true });
    tl.showCaption(CAPTIONS[id]);
    tl.highlight(`[data-tl=insert-item-${id}]`);
    await tl.wait(2200);
    tl.clearHighlight();
  }
  closeMenu(tl);
  tl.showCaption(CAPTIONS.done);

  await tl.at(24500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP36_DURATION_MS);
}
