import type { Timeline } from "@/lib/timeline";
import { closeFileMenu, hoverItem, openFileMenu } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 1 - Meet the File menu. Starts on a blank "Untitled spreadsheet". */
export const STEP1_DURATION_MS = 23200;

export async function runStep1(tl: Timeline) {
  begin(tl, URLS.blank, [0.5, 0.45]);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });

  await tl.at(3600);
  tl.showCaption(CAPTIONS.menu);
  tl.highlight("[data-tl=file-menu]");
  await tl.wait(2400);
  tl.clearHighlight();

  // One beat per group of the menu: a ring around the group and a short caption.
  const beats: [number, string, string][] = [
    [0, "new", CAPTIONS.start],
    [1, "copy", CAPTIONS.copy],
    [2, "share", CAPTIONS.share],
    [3, "rename", CAPTIONS.manage],
    [4, "history", CAPTIONS.history],
    [5, "details", CAPTIONS.details],
    [6, "print", CAPTIONS.print],
  ];
  for (const [group, item, text] of beats) {
    tl.showCaption(text);
    await hoverItem(tl, item, { ms: 600 });
    tl.highlight(`[data-tl=file-group-${group}]`);
    await tl.wait(1500);
    tl.clearHighlight();
  }

  tl.hover(null);
  closeFileMenu(tl);
  tl.showCaption(CAPTIONS.done);
  await finish(tl, 1800);
}
