import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { DROPDOWN } from "@/components/sheets/insert-data";
import { chooseRow, dragSelect, openMenu } from "@/components/sheets/edit-timeline";
import { addItem, applyDropdownRule, beginInsert, openCellDropdown, openValidation, pickDropdownValue, pickItemColour, renameItem } from "@/components/sheets/insert-timeline";
import { pressOn, ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 50 - Insert > Dropdown on D2:D5: rename the items, colour them, add a third, Done, then pick a value in D3. */
export const STEP50_DURATION_MS = 35100;

export async function runStep50(tl: Timeline) {
  beginInsert(tl, URLS.renamed);

  await tl.at(700);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, "d2", "d5", { ms: 800 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  await chooseRow(tl, "ins-dropdown", { ms: 500 });
  openValidation(tl);
  await tl.wait(700);
  tl.showCaption(CAPTIONS.panel);
  await ring(tl, "[data-tl=dv-title]", 1600);
  tl.showCaption(CAPTIONS.range);
  await ring(tl, "[data-tl=dv-range]", 1500);

  tl.showCaption(CAPTIONS.rename);
  await renameItem(tl, "i1", DROPDOWN.names[0]);
  tl.showCaption(CAPTIONS.colour);
  await pickItemColour(tl, "i1", DROPDOWN.colours.paid);
  tl.showCaption(CAPTIONS.rename2);
  await renameItem(tl, "i2", DROPDOWN.names[1]);
  await pickItemColour(tl, "i2", DROPDOWN.colours.pending);
  tl.showCaption(CAPTIONS.add);
  await addItem(tl);
  tl.showCaption(CAPTIONS.third);
  await renameItem(tl, "i3", DROPDOWN.names[2]);
  await pickItemColour(tl, "i3", DROPDOWN.colours.overdue);
  tl.setVar("focus", "");

  tl.showCaption(CAPTIONS.done);
  await pressOn(tl, "[data-tl=dv-done]", { ms: 800 });
  applyDropdownRule(tl);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.applied);
  await ring(tl, "[data-tl=cell-d2]", 1600);
  tl.showCaption(CAPTIONS.open2);
  await openCellDropdown(tl, DROPDOWN.cell);
  tl.showCaption(CAPTIONS.pick);
  await pickDropdownValue(tl, DROPDOWN.picked);
  tl.showCaption(CAPTIONS.end);
  await ring(tl, `[data-tl=cell-${DROPDOWN.cell}]`, 1700);
  await finish(tl, 600);
}
