import type { Timeline } from "@/lib/timeline";
import { OFFLINE } from "@/components/sheets/sheets-data";
import { chooseItem, closeFileMenu, hoverItem, openFileMenu, toast } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 16 - File > Make available offline. Starts on "Acme Studio – Q3 Budget"; ends with offline on. */
export const STEP16_DURATION_MS = 13400;

export async function runStep16(tl: Timeline) {
  begin(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(400);
  await hoverItem(tl, "offline", { ms: 650 });
  tl.highlight("[data-tl=file-item-offline]");
  tl.showCaption(CAPTIONS.hover);
  await tl.wait(1800);
  tl.clearHighlight();

  tl.showCaption(CAPTIONS.click);
  await chooseItem(tl, "offline", { ms: 350 });
  tl.setVar("offline", true);
  await tl.wait(300);
  toast(tl, OFFLINE.toast, 3400);
  tl.showCaption(CAPTIONS.works);
  await tl.wait(2400);

  // Open File again: the item has a tick
  tl.showCaption(CAPTIONS.check);
  await openFileMenu(tl, { ms: 800 });
  await hoverItem(tl, "offline", { ms: 600 });
  tl.highlight("[data-tl=file-item-offline]");
  await tl.wait(1800);
  tl.clearHighlight();
  closeFileMenu(tl);
  await finish(tl, 600);
}
