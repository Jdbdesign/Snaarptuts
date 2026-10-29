import type { Timeline } from "@/lib/timeline";
import { PRINT } from "@/components/sheets/sheets-data";
import { beginTb, hoverTool, pressTool } from "@/components/sheets/toolbar-timeline";
import { closeDialog, hoverOn, openDialog, pressOn, ring, toast } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 88 - the Print tool opens the same print preview as File > Print. Starts with A1 selected. */
export const STEP88_DURATION_MS = 19000;

export async function runStep88(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "print", { hold: 1500 });
  tl.showCaption(CAPTIONS.click);
  await pressTool(tl, "print");
  openDialog(tl, "print");
  await tl.wait(900);
  tl.showCaption(CAPTIONS.preview);
  await ring(tl, "[data-tl=print-paper]", 1800);

  tl.showCaption(CAPTIONS.layout);
  await pressOn(tl, "[data-tl=print-layout]", { ms: 700 });
  tl.setVar("printLayoutOpen", true);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.landscape);
  await hoverOn(tl, "[data-tl=print-layout-1]", { ms: 450 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=print-layout-2]", { ms: 450 });
  tl.setVar("printLayout", PRINT.layouts[1]);
  tl.setVar("printLayoutOpen", false);
  tl.hover(null);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.paper);
  await tl.wait(1600);

  tl.showCaption(CAPTIONS.go);
  await pressOn(tl, "[data-tl=print-go]", { ms: 700 });
  closeDialog(tl);
  await tl.wait(400);
  toast(tl, PRINT.toast, 3000);
  await finish(tl, 2400);
}
