import type { Timeline } from "@/lib/timeline";
import { EMAIL_DIALOG } from "@/components/sheets/sheets-data";
import { chooseItem, closeDialog, hoverOn, openDialog, openFileMenu, pressOn, ring, toast, typeInto } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, SAMPLE, URLS } from "./data";

/** Snaarp Sheets, step 8 - File > Email. Starts on "Budget draft". */
export const STEP8_DURATION_MS = 24900;

export async function runStep8(tl: Timeline) {
  begin(tl, URLS.budget);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(500);
  await chooseItem(tl, "email", { ms: 450 });
  openDialog(tl, "email");

  await tl.wait(900);
  tl.showCaption(CAPTIONS.to);
  await typeInto(tl, "email-to", SAMPLE.to, { msPerChar: 45 });
  await tl.wait(500);
  tl.setVar("focus", "");

  tl.showCaption(CAPTIONS.copy);
  await pressOn(tl, "[data-tl=email-copy]", { ms: 650, dx: -70 });
  tl.setVar("emailCopy", true);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.subject);
  await ring(tl, "[data-tl=field-email-subject]", 1700);

  tl.showCaption(CAPTIONS.message);
  await typeInto(tl, "email-message", SAMPLE.message, { msPerChar: 32 });
  tl.setVar("focus", "");
  await tl.wait(600);

  // File type: show every option, then choose Excel
  tl.showCaption(CAPTIONS.type);
  await pressOn(tl, "[data-tl=email-type]", { ms: 700 });
  tl.setVar("emailTypeOpen", true);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.options);
  for (let i = 1; i <= EMAIL_DIALOG.types.length; i++) {
    await hoverOn(tl, `[data-tl=email-type-${i}]`, { ms: 420 });
    await tl.wait(520);
  }
  tl.showCaption(CAPTIONS.pick);
  await pressOn(tl, "[data-tl=email-type-2]", { ms: 450, ring: false });
  tl.setVar("emailType", EMAIL_DIALOG.types[1]);
  tl.setVar("emailTypeOpen", false);
  tl.hover(null);
  await tl.wait(800);

  tl.showCaption(CAPTIONS.send);
  await pressOn(tl, "[data-tl=email-send]", { ms: 700 });
  closeDialog(tl);
  await tl.wait(400);
  toast(tl, EMAIL_DIALOG.toast, 3200);
  await finish(tl, 2800);
}
