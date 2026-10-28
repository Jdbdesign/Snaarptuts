import type { Timeline } from "@/lib/timeline";
import { LOCATE } from "@/components/sheets/sheets-data";
import { chooseItem, closeDialog, hoverOn, openDialog, openFileMenu, pickTab, pressOn, toast } from "@/components/sheets/sheets-timeline";
import { finish } from "./shared";

export type LocateCaptions = { open: string; suggested: string; starred: string; all: string; pick: string; go: string; done: string };

/**
 * The File > Move and File > Add shortcut to Drive walk-through: the same picker with the same tabs and list, so one routine
 * drives both. `mode` is the dialog ("move" | "shortcut"), `item` the File menu item that opens it.
 */
export async function runLocate(tl: Timeline, mode: "move" | "shortcut", item: string, captions: LocateCaptions, toastText: string) {
  await tl.at(800);
  tl.showCaption(captions.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(500);
  await chooseItem(tl, item, { ms: 450 });
  openDialog(tl, mode);

  await tl.wait(900);
  tl.showCaption(captions.suggested);
  await tl.wait(1500);

  tl.showCaption(captions.starred);
  await pickTab(tl, mode, "starred", { var: "locateTab" });
  await tl.wait(1400);

  tl.showCaption(captions.all);
  await pickTab(tl, mode, "all", { var: "locateTab" });
  await tl.wait(500);
  for (const l of LOCATE.all) {
    await hoverOn(tl, `[data-tl=${mode}-loc-${l.id}]`, { ms: 450 });
    await tl.wait(550);
  }
  tl.hover(null);

  tl.showCaption(captions.pick);
  await pressOn(tl, `[data-tl=${mode}-loc-drive]`, { ms: 500 });
  tl.setVar("locateSel", "drive");
  await tl.wait(900);

  tl.showCaption(captions.go);
  await pressOn(tl, `[data-tl=${mode}-primary]`, { ms: 700 });
  closeDialog(tl);
  await tl.wait(400);
  toast(tl, toastText, 3200);
  tl.showCaption(captions.done);
  await finish(tl, 2800);
}
