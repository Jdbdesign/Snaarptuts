import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { closeMenus, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 81 - the Extensions menu: Add-ons, Apps Script and Macros are all greyed out (hover only); macros live under Tools. */
export const STEP81_DURATION_MS = 17100;

export async function runStep81(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "extensions", { ms: 800 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.addons);
  await hoverRow(tl, "ext-addons", { ms: 600 });
  await tl.wait(1500);
  tl.showCaption(CAPTIONS.script);
  await hoverRow(tl, "ext-script", { ms: 450 });
  await tl.wait(1500);
  tl.showCaption(CAPTIONS.macros);
  await hoverRow(tl, "ext-macros", { ms: 450 });
  await tl.wait(1500);

  tl.showCaption(CAPTIONS.where);
  closeMenus(tl);
  await tl.wait(700);
  await openMenu(tl, "tools", { ms: 750 });
  await hoverRow(tl, "tls-macro", { ms: 450 });
  tl.showCaption(CAPTIONS.tools);
  await ring(tl, "[data-tl=menu-tools-group-0]", 1800);
  closeMenus(tl);
  await finish(tl, 400);
}
