import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { chooseRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt, deleteMacro, runMacro, seedMacro } from "@/components/sheets/fdt-timeline";
import { closeDialog, pressOn, ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 76 - Tools > Manage macros: run the saved macro (the header row formats), then delete it. The macro is saved at the start. */
export const STEP76_DURATION_MS = 24900;

export async function runStep76(tl: Timeline) {
  beginFdt(tl, URLS.renamed);
  seedMacro(tl);

  await tl.at(600);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "tools", { ms: 750 });
  await chooseRow(tl, "tls-manage", { ms: 500 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=man-row-m1]", 1700);
  tl.showCaption(CAPTIONS.run);
  await pressOn(tl, "[data-tl=man-run-m1]", { ms: 800 });
  runMacro(tl);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.ran);
  await ring(tl, "[data-tl=cell-a1]", 1800);

  tl.showCaption(CAPTIONS.again);
  await openMenu(tl, "tools", { ms: 650 });
  await chooseRow(tl, "tls-manage", { ms: 450 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.del);
  await pressOn(tl, "[data-tl=man-del-m1]", { ms: 750 });
  deleteMacro(tl, "m1");
  await tl.wait(800);
  tl.showCaption(CAPTIONS.gone);
  await ring(tl, "[data-tl=man-dialog]", 1500);
  tl.showCaption(CAPTIONS.cancel);
  await pressOn(tl, "[data-tl=man-cancel]", { ms: 650 });
  closeDialog(tl);
  await finish(tl, 600);
}
