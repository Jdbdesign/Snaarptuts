import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { closeMenus, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 56 - the Format menu group by group: Number, text styles, layout, the greyed rows and Clear formatting. */
export const STEP56_DURATION_MS = 27400;

export async function runStep56(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(700);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "format", { ms: 800 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.number);
  await hoverRow(tl, "fmt-number", { sub: "number", ms: 600 });
  await tl.wait(1500);
  await hoverRow(tl, "fmt-bold", { ms: 500 });
  tl.showCaption(CAPTIONS.text);
  await ring(tl, "[data-tl=menu-format-group-1]", 1700);

  tl.showCaption(CAPTIONS.layout);
  for (const id of ["fmt-fontsize", "fmt-align", "fmt-wrap", "fmt-rotate"]) {
    await hoverRow(tl, id, { sub: { "fmt-fontsize": "fontsize", "fmt-align": "align", "fmt-wrap": "wrapping", "fmt-rotate": "rotation" }[id], ms: 450 });
    await tl.wait(700);
  }

  tl.showCaption(CAPTIONS.greyed);
  await hoverRow(tl, "fmt-theme", { ms: 600 });
  await tl.wait(900);
  await hoverRow(tl, "fmt-cond", { ms: 450 });
  await tl.wait(800);
  await hoverRow(tl, "fmt-alt", { ms: 400 });
  await tl.wait(800);

  tl.showCaption(CAPTIONS.clear);
  await hoverRow(tl, "fmt-clear", { ms: 450 });
  await ring(tl, "[data-tl=menu-item-fmt-clear]", 1400);
  closeMenus(tl);
  await finish(tl, 600);
}
