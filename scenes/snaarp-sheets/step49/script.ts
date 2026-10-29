import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { CHECKBOX } from "@/components/sheets/insert-data";
import { chooseRow, dragSelect, openMenu } from "@/components/sheets/edit-timeline";
import { addHeader, applyCheckboxes, beginInsert, clickBox } from "@/components/sheets/insert-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 49 - Insert > Checkbox: boxes in H2:H5 (under a new "Approved" header), then tick two and untick one. */
export const STEP49_DURATION_MS = 13900;

export async function runStep49(tl: Timeline) {
  beginInsert(tl, URLS.renamed);
  addHeader(tl, CHECKBOX.headerCell, CHECKBOX.header);
  const [a, b] = CHECKBOX.range;
  const [t1, t2] = CHECKBOX.tick;

  await tl.at(700);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, a, b, { ms: 750 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  await chooseRow(tl, "ins-checkbox", { ms: 500 });
  applyCheckboxes(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, `[data-tl=cell-${a}]`, 1500);
  tl.showCaption(CAPTIONS.tick);
  await clickBox(tl, t1);
  tl.showCaption(CAPTIONS.tick2);
  await clickBox(tl, t2);
  tl.showCaption(CAPTIONS.untick);
  await clickBox(tl, t1);
  await finish(tl, 700);
}
