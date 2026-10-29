import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, CELL, PICK, RANGE, URLS } from "./data";
import { DROPDOWN } from "@/components/sheets/insert-data";
import { chooseRow, dragSelect, openMenu } from "@/components/sheets/edit-timeline";
import { applyStatusRule, beginFdt } from "@/components/sheets/fdt-timeline";
import { addItem, openCellDropdown, pickDropdownValue, pickItemColour, renameItem, resetControls } from "@/components/sheets/insert-timeline";
import { pressOn, ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 71 - Data > Data validation on the Status cells: a Paid / Pending / Overdue dropdown, Done, then pick a value. */
export const STEP71_DURATION_MS = 40000;

export async function runStep71(tl: Timeline) {
  beginFdt(tl, URLS.renamed);
  resetControls(tl);

  await tl.at(700);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, RANGE.from, RANGE.to, { ms: 800 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "data", { ms: 800 });
  await chooseRow(tl, "dat-validation", { ms: 500 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.panel);
  await ring(tl, "[data-tl=dv-title]", 1500);
  tl.showCaption(CAPTIONS.range);
  await ring(tl, "[data-tl=dv-range]", 1400);

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
  applyStatusRule(tl);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.applied);
  await ring(tl, "[data-tl=cell-d2]", 1500);
  tl.showCaption(CAPTIONS.open2);
  await openCellDropdown(tl, CELL);
  tl.showCaption(CAPTIONS.pick);
  await pickDropdownValue(tl, PICK);
  tl.showCaption(CAPTIONS.end);
  await ring(tl, `[data-tl=cell-${CELL}]`, 1600);
  await finish(tl, 500);
}
