import type { Timeline } from "@/lib/timeline";
import { beginEdit, chooseSub, dragSelect, openMenu, toggleGroup } from "@/components/sheets/edit-timeline";
import { pressOn, ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 32 - View > Group: rows 2-3 (collapse, expand), columns B-C (collapse, expand), then Ungroup. */
export const STEP32_DURATION_MS = 41700;

async function collapseAndExpand(tl: Timeline, axis: "rows" | "cols") {
  const toggle = `[data-tl=group-toggle-${axis}]`;
  tl.showCaption(CAPTIONS.collapse);
  await pressOn(tl, toggle, { ms: 800 });
  toggleGroup(tl, axis);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.collapsed);
  await tl.wait(1800);
  await pressOn(tl, toggle, { ms: 800, ring: false });
  toggleGroup(tl, axis);
  await tl.wait(400);
  tl.showCaption(CAPTIONS.expanded);
  await tl.wait(1400);
}

export async function runStep32(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  // Rows
  await tl.at(800);
  tl.showCaption(CAPTIONS.selectRows);
  await dragSelect(tl, "a2", "a3", { ms: 600 });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "view", { ms: 700 });
  tl.showCaption(CAPTIONS.groupRows);
  await chooseSub(tl, "group", "group-rows", { ms: 450 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.bracket);
  await ring(tl, "[data-tl=group-toggle-rows]", 2200);
  await collapseAndExpand(tl, "rows");

  // Columns
  tl.showCaption(CAPTIONS.selectCols);
  await dragSelect(tl, "b1", "c1", { ms: 600 });
  await openMenu(tl, "view", { ms: 650 });
  tl.showCaption(CAPTIONS.groupCols);
  await chooseSub(tl, "group", "group-cols", { ms: 450 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.colBracket);
  await ring(tl, "[data-tl=group-toggle-cols]", 2000);
  await collapseAndExpand(tl, "cols");

  // Ungroup
  tl.showCaption(CAPTIONS.ungroup);
  await openMenu(tl, "view", { ms: 650 });
  await chooseSub(tl, "group", "ungroup-rows", { ms: 450 });
  await tl.wait(900);
  tl.showCaption(CAPTIONS.ungroupCols);
  await openMenu(tl, "view", { ms: 600 });
  await chooseSub(tl, "group", "ungroup-cols", { ms: 450 });
  await tl.wait(700);
  await finish(tl, 1500);
}
