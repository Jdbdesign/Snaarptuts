import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { closeMenus, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 74 - the Tools menu group by group: macros, Spelling and Autocomplete, Notification settings and Accessibility. */
export const STEP74_DURATION_MS = 18000;

export async function runStep74(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(700);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "tools", { ms: 800 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.macros);
  await hoverRow(tl, "tls-macro", { ms: 550 });
  await tl.wait(800);
  await hoverRow(tl, "tls-manage", { ms: 350 });
  await ring(tl, "[data-tl=menu-tools-group-0]", 1300);

  tl.showCaption(CAPTIONS.spell);
  await hoverRow(tl, "tls-spell", { ms: 450 });
  await tl.wait(700);
  await hoverRow(tl, "tls-auto", { ms: 350 });
  await ring(tl, "[data-tl=menu-tools-group-1]", 1300);

  tl.showCaption(CAPTIONS.settings);
  await hoverRow(tl, "tls-notif", { ms: 450 });
  await tl.wait(700);
  await hoverRow(tl, "tls-access", { ms: 350 });
  await ring(tl, "[data-tl=menu-tools-group-2]", 1300);
  closeMenus(tl);
  await finish(tl, 400);
}
