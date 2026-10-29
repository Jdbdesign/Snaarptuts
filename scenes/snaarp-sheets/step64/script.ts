import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { closeMenus, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";

/** Snaarp Sheets, step 64 - the greyed Format rows (Theme, Conditional formatting, Alternating colors): hover only, each with a short tip. */
export const STEP64_DURATION_MS = 17000;

export async function runStep64(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "format", { ms: 800 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.theme);
  await hoverRow(tl, "fmt-theme", { ms: 600 });
  await tl.wait(1600);
  tl.showCaption(CAPTIONS.cond);
  await hoverRow(tl, "fmt-cond", { ms: 500 });
  await tl.wait(1600);
  tl.showCaption(CAPTIONS.alt);
  await hoverRow(tl, "fmt-alt", { ms: 450 });
  await tl.wait(1600);
  tl.showCaption(CAPTIONS.done);
  await tl.wait(900);
  closeMenus(tl);
  await finish(tl, 300);
}
