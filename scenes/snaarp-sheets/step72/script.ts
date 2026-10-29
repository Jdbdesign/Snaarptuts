import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, START, URLS } from "./data";
import { NAMED } from "@/components/sheets/fdt-data";
import { chooseRow, clickCell, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt, closeNameBox, nameRangeDone, nameRangeNext, openNameBox } from "@/components/sheets/fdt-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 72 - Data > Named ranges: name A2:C5 "Q3_Costs" through the two dialogs, then open the Name box's list. */
export const STEP72_DURATION_MS = 25200;

export async function runStep72(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await clickCell(tl, START, { ring: true });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "data", { ms: 650 });
  await chooseRow(tl, "dat-named", { ms: 500 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.name);
  await typeInto(tl, "nr-name", NAMED.value, { moveMs: 600, msPerChar: 110 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.next);
  await pressOn(tl, "[data-tl=nr-ok]", { ms: 650 });
  tl.setVar("focus", "");
  nameRangeNext(tl);
  await tl.wait(600);
  tl.showCaption(CAPTIONS.end);
  await typeInto(tl, "nr-end", NAMED.end, { moveMs: 600, msPerChar: 140 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.ok);
  await pressOn(tl, "[data-tl=re-ok]", { ms: 650 });
  tl.setVar("focus", "");
  nameRangeDone(tl);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=name-box]", 1800);

  tl.showCaption(CAPTIONS.box);
  await openNameBox(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=name-box-list]", 1800);
  closeNameBox(tl);
  await finish(tl, 400);
}
