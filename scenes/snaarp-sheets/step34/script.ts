import type { Timeline } from "@/lib/timeline";
import { beginEdit, closeMenus, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 34 - View > Hidden sheets, greyed out. Caption-only: no dialog is built. */
export const STEP34_DURATION_MS = 9700;

export async function runStep34(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "view", { ms: 900 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.hidden);
  await hoverRow(tl, "hidden", { ms: 700 });
  tl.highlight("[data-tl=menu-item-hidden]");
  await tl.wait(3600);
  tl.clearHighlight();
  closeMenus(tl);
  await finish(tl, 800);
}
