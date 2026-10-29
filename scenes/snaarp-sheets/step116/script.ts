import type { Timeline } from "@/lib/timeline";
import { beginTb, closeDialog, closeHeaderMenu, pressHeader } from "@/components/sheets/toolbar-timeline";
import { hoverOn, openDialog, pressOn, ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 116 - the Share button (the File > Share dialog) and the account menu. The last step; the completion card follows. Starts with A1 selected. */
export const STEP116_DURATION_MS = 18300;

export async function runStep116(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.share);
  await pressOn(tl, "[data-tl=editor-share]", { ms: 800 });
  openDialog(tl, "share");
  await tl.wait(900);
  tl.showCaption(CAPTIONS.dialog);
  await ring(tl, "[data-tl=share-dialog]", 2000);
  tl.showCaption(CAPTIONS.done);
  await pressOn(tl, "[data-tl=share-done]", { ms: 650 });
  closeDialog(tl);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.avatar);
  await pressHeader(tl, "avatar", "account", { ms: 800 });
  tl.showCaption(CAPTIONS.menu);
  await ring(tl, "[data-tl=tm-account-name]", 2000);
  tl.showCaption(CAPTIONS.manage);
  await hoverOn(tl, "[data-tl=tm-account-manage]", { ms: 500 });
  await tl.wait(1400);
  tl.hover(null);
  tl.showCaption(CAPTIONS.close);
  await pressHeader(tl, "avatar", undefined, { ms: 700 });
  closeHeaderMenu(tl);
  tl.showCaption(CAPTIONS.end);
  await finish(tl, 1800);
}
