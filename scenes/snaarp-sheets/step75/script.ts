import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { MACRO } from "@/components/sheets/fdt-data";
import { chooseRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt, recordSteps, saveMacro } from "@/components/sheets/fdt-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 75 - Tools > Create new macro: name and describe it, record four steps, stop, Save Macro. */
export const STEP75_DURATION_MS = 28400;

export async function runStep75(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "tools", { ms: 750 });
  await chooseRow(tl, "tls-macro", { ms: 500 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.name);
  await typeInto(tl, "mac-name", MACRO.sampleName, { moveMs: 600, msPerChar: 55 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.desc);
  await typeInto(tl, "mac-desc", MACRO.sampleDesc, { moveMs: 550, msPerChar: 45 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.key);
  await ring(tl, "[data-tl=field-mac-key]", 1500);
  tl.setVar("focus", "");

  tl.showCaption(CAPTIONS.record);
  await ring(tl, "[data-tl=mac-record]", 1000);
  tl.showCaption(CAPTIONS.recording);
  await recordSteps(tl, 1000);
  tl.showCaption(CAPTIONS.save);
  await tl.wait(500);
  await pressOn(tl, "[data-tl=mac-save]", { ms: 700 });
  saveMacro(tl);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=sheet-notice]", 1800);
  await finish(tl, 400);
}
