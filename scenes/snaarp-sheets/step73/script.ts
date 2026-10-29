import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, CELL, URLS } from "./data";
import { chooseRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt, protectNext, tryTypeProtected } from "@/components/sheets/fdt-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 73 - Data > Protected sheets and ranges: choice 1 locks the sheet (a lock on the tab, typing is refused), then the same dialog lifts it. */
export const STEP73_DURATION_MS = 29500;

export async function runStep73(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "data", { ms: 750 });
  await chooseRow(tl, "dat-protect", { ms: 500 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.choice);
  await typeInto(tl, "pr-choice", "1", { moveMs: 600, msPerChar: 200 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.next);
  await pressOn(tl, "[data-tl=pr-next]", { ms: 650 });
  tl.setVar("focus", "");
  protectNext(tl);
  await tl.wait(1000);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=sheet-tab-s1]", 1800);

  tl.showCaption(CAPTIONS.try);
  await tryTypeProtected(tl, CELL);
  tl.showCaption(CAPTIONS.blocked);
  await ring(tl, "[data-tl=protect-msg]", 1600);
  tl.setVar("protMsg", null);

  tl.showCaption(CAPTIONS.again);
  await openMenu(tl, "data", { ms: 650 });
  await chooseRow(tl, "dat-protect", { ms: 450 });
  await tl.wait(500);
  tl.setVar("field:pr-choice", "");
  tl.showCaption(CAPTIONS.choice2);
  await typeInto(tl, "pr-choice", "1", { moveMs: 550, msPerChar: 200 });
  await tl.wait(400);
  await pressOn(tl, "[data-tl=pr-next]", { ms: 600 });
  tl.setVar("focus", "");
  protectNext(tl);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.off);
  await ring(tl, "[data-tl=sheet-tab-s1]", 1600);
  await finish(tl, 400);
}
