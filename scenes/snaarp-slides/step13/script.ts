import { VERSIONS } from "@/components/slides/slides-data";
import { chooseSub, closeDialog, hoverItem, openDialog, openFileMenu, pressOn, toast, typeInto } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 13 - Use version history (File > Version history). Starts in the editor with "Acme Studio Pitch". */
export const STEP13_DURATION_MS = 38000;

export async function runStep13(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // File > Version history > Name current version
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await hoverItem(tl, "history", { ms: 600 });
  await tl.at(3500);
  tl.showCaption(CAPTIONS.name);
  await chooseSub(tl, "history", "name", { ms: 300 });
  openDialog(tl, "nameVersion");

  await tl.at(5800);
  tl.showCaption(CAPTIONS.type);
  await typeInto(tl, "version-name", VERSIONS.nameDialog.sample, { msPerChar: 80 });

  await tl.at(9300);
  tl.setVar("focus", "");
  tl.showCaption(CAPTIONS.save);
  await pressOn(tl, "[data-tl=version-save]", { ms: 800 });
  closeDialog(tl);
  toast(tl, VERSIONS.nameToast(VERSIONS.nameDialog.sample), 3000);
  tl.showCaption(CAPTIONS.saved);

  // File > Version history > See version history
  await tl.at(13000);
  tl.showCaption(CAPTIONS.again);
  await openFileMenu(tl, { ms: 800 });
  await hoverItem(tl, "history", { ms: 500 });
  await tl.at(16000);
  tl.showCaption(CAPTIONS.see);
  await chooseSub(tl, "history", "see", { ms: 300 });
  tl.setVar("versionsOpen", true);

  await tl.at(18700);
  tl.showCaption(CAPTIONS.panel);
  for (const id of ["v1", "v2", "v3", "v4"]) {
    await tl.moveCursorTo(`[data-tl=version-${id}]`, { ms: 550 });
    tl.hover(`[data-tl=version-${id}]`);
    await tl.wait(450);
  }
  tl.hover(null);

  await tl.at(22800);
  tl.showCaption(CAPTIONS.older);
  await pressOn(tl, "[data-tl=version-v3]", { ms: 700 });
  tl.setVar("versionSel", "v3");

  await tl.at(25800);
  tl.showCaption(CAPTIONS.restore);
  await pressOn(tl, "[data-tl=version-restore]", { ms: 750 });
  toast(tl, VERSIONS.restoredToast, 3000);

  await tl.at(29600);
  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=version-panel-close]", { ms: 800 });
  tl.setVar("versionsOpen", false);

  // Quick white fade
  await tl.at(36500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP13_DURATION_MS);
}
