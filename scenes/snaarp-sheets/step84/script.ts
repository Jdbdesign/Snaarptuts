import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { chooseRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { closeDialog, pressOn, ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 84 - Help > About: the logo, the version and the copyright, then Close. The last step before the completion card. */
export const STEP84_DURATION_MS = 12400;

export async function runStep84(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "help", { ms: 750 });
  await chooseRow(tl, "hlp-about", { ms: 500 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.about);
  await ring(tl, "[data-tl=about-version]", 2000);
  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=about-close]", { ms: 700 });
  closeDialog(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await tl.wait(1700);
  await finish(tl, 400);
}
