import type { Timeline } from "@/lib/timeline";
import { phoneScroll } from "@/components/sheets/insert-timeline";
import { finish } from "../shared";
import { CAPTIONS, CELL, URLS } from "./data";
import { chooseSub, clickCell, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 62 - Format > Rotation on the header cell H1: Tilt up, Tilt down, Stack vertically, Rotate up, None. */
export const STEP62_DURATION_MS = 32800;

async function rotate(tl: Timeline, id: string, caption: string) {
  await openMenu(tl, "format", { ms: 480 });
  tl.showCaption(caption);
  await chooseSub(tl, "fmt-rotate", `ro-${id}`, { ms: 360, hold: 140 });
  await tl.wait(250);
  await ring(tl, `[data-tl=cell-${CELL}]`, 1100);
}

export async function runStep62(tl: Timeline) {
  beginFdt(tl, URLS.renamed);
  phoneScroll(tl, 5);

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await clickCell(tl, CELL, { ring: true });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "format", { ms: 650 });
  await hoverRow(tl, "fmt-rotate", { sub: "rotation", ms: 450 });
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=menu-item-fmt-rotate]", 1300);
  tl.showCaption(CAPTIONS.tiltup);
  await chooseSub(tl, "fmt-rotate", "ro-tiltup", { ms: 380, hold: 140 });
  await tl.wait(250);
  await ring(tl, `[data-tl=cell-${CELL}]`, 1100);

  await rotate(tl, "tiltdown", CAPTIONS.tiltdown);
  await rotate(tl, "stack", CAPTIONS.stack);
  await rotate(tl, "up", CAPTIONS.up);
  await rotate(tl, "none", CAPTIONS.none);
  tl.showCaption(CAPTIONS.done);
  await tl.wait(700);
  await finish(tl, 300);
}
