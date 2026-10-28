import type { Timeline } from "@/lib/timeline";
import { PRINT } from "@/components/sheets/sheets-data";
import { chooseItem, closeDialog, hoverOn, openDialog, openFileMenu, pressOn, ring, toast } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 19 - File > Print. Starts on "Acme Studio – Q3 Budget". The last step of the File menu. */
export const STEP19_DURATION_MS = 16900;

export async function runStep19(tl: Timeline) {
  begin(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(400);
  await chooseItem(tl, "print", { ms: 500 });
  openDialog(tl, "print");

  await tl.wait(1000);
  tl.showCaption(CAPTIONS.preview);
  await ring(tl, "[data-tl=print-paper]", 1800);

  // Layout: Portrait -> Landscape
  tl.showCaption(CAPTIONS.layout);
  await pressOn(tl, "[data-tl=print-layout]", { ms: 700 });
  tl.setVar("printLayoutOpen", true);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.landscape);
  await hoverOn(tl, "[data-tl=print-layout-1]", { ms: 450 });
  await tl.wait(400);
  await pressOn(tl, "[data-tl=print-layout-2]", { ms: 450 });
  tl.setVar("printLayout", PRINT.layouts[1]);
  tl.setVar("printLayoutOpen", false);
  tl.hover(null);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.paper);
  await tl.wait(1800);

  tl.showCaption(CAPTIONS.print);
  await pressOn(tl, "[data-tl=print-go]", { ms: 700 });
  closeDialog(tl);
  await tl.wait(400);
  toast(tl, PRINT.toast, 3200);
  await finish(tl, 2800);
}
