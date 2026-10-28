import type { Timeline } from "@/lib/timeline";
import { SHARE_DIALOG } from "@/components/sheets/sheets-data";
import { chooseItem, closeDialog, hoverOn, openDialog, openFileMenu, pressOn, ring, toast, typeInto } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 7 - File > Share. Starts on "Budget draft". */
export const STEP7_DURATION_MS = 27000;

export async function runStep7(tl: Timeline) {
  begin(tl, URLS.budget);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(500);
  await chooseItem(tl, "share", { ms: 450 });
  openDialog(tl, "share");

  // Add a person
  await tl.wait(900);
  tl.showCaption(CAPTIONS.type);
  await typeInto(tl, "share-add", SHARE_DIALOG.person.email, { msPerChar: 42 });
  tl.setVar("shareSuggest", true);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.pick);
  await pressOn(tl, "[data-tl=share-suggestion]", { ms: 650, dx: -80 });
  tl.setVar("shareSuggest", false);
  tl.setVar("field:share-add", "");
  tl.setVar("focus", "");
  tl.setVar("sharePeople", ["priya"]);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.access);
  await ring(tl, "[data-tl=share-row-priya]", 1800);

  // General access: Restricted -> Anyone with the link
  tl.showCaption(CAPTIONS.general);
  await pressOn(tl, "[data-tl=share-access]", { ms: 700 });
  tl.setVar("shareMenu", true);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.anyone);
  await hoverOn(tl, "[data-tl=share-option-restricted]", { ms: 450 });
  await tl.wait(500);
  await pressOn(tl, "[data-tl=share-option-anyone]", { ms: 450 });
  tl.setVar("shareAccess", "anyone");
  tl.setVar("shareMenu", false);
  tl.hover(null);
  await tl.wait(700);

  // Copy link
  tl.showCaption(CAPTIONS.copy);
  await pressOn(tl, "[data-tl=share-copy-link]", { ms: 700 });
  tl.setVar("shareCopied", true);
  toast(tl, SHARE_DIALOG.copied, 3000);
  await tl.wait(1400);

  // Settings (gear)
  tl.showCaption(CAPTIONS.gear);
  await pressOn(tl, "[data-tl=share-gear]", { ms: 700 });
  tl.setVar("shareView", "settings");
  await tl.wait(600);
  tl.showCaption(CAPTIONS.settings);
  for (const sel of ["share-set-editors", "share-set-download-editors", "share-set-download-viewers"]) {
    await hoverOn(tl, `[data-tl=${sel}]`, { ms: 500, dx: -60 });
    await tl.wait(700);
  }
  tl.hover(null);
  tl.showCaption(CAPTIONS.back);
  await pressOn(tl, "[data-tl=share-back]", { ms: 600 });
  tl.setVar("shareView", "main");
  await tl.wait(700);

  tl.showCaption(CAPTIONS.done);
  await pressOn(tl, "[data-tl=share-done]", { ms: 650 });
  closeDialog(tl);
  await finish(tl, 1200);
}
