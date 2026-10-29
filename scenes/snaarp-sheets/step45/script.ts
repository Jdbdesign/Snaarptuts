import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { IMAGE } from "@/components/sheets/insert-data";
import { chooseSub, clickCell, openMenu } from "@/components/sheets/edit-timeline";
import { beginInsert, chooseImageFile, openImageDialog, placeImageInCell } from "@/components/sheets/insert-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 45 - Insert > Image > Insert image in cell: upload dialog with the preview, By URL tab, picture in cell E8. */
export const STEP45_DURATION_MS = 23800;

export async function runStep45(tl: Timeline) {
  beginInsert(tl, URLS.renamed);
  await tl.at(700);
  tl.showCaption(CAPTIONS.cell);
  await clickCell(tl, IMAGE.cell, { ms: 800 });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  tl.showCaption(CAPTIONS.choose);
  await chooseSub(tl, "ins-image", "img-cell", { ms: 450, hold: 400 });
  openImageDialog(tl);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.drop);
  await chooseImageFile(tl, "desk");
  tl.showCaption(CAPTIONS.picked);
  await ring(tl, "[data-tl=img-preview]", 1600);
  tl.showCaption(CAPTIONS.alt);
  await typeInto(tl, "img-alt", IMAGE.files[0].alt, { msPerChar: 55 });
  await tl.wait(400);

  tl.showCaption(CAPTIONS.url);
  await pressOn(tl, "[data-tl=img-tab-url]", { ms: 700, ring: false });
  tl.setVar("imgTab", "url");
  tl.setVar("focus", "");
  await tl.wait(300);
  await ring(tl, "[data-tl=field-img-url]", 1500);
  tl.showCaption(CAPTIONS.back);
  await pressOn(tl, "[data-tl=img-tab-upload]", { ms: 650, ring: false });
  tl.setVar("imgTab", "upload");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.insert);
  await pressOn(tl, "[data-tl=img-insert]", { ms: 700 });
  placeImageInCell(tl, "desk");
  await tl.wait(700);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, `[data-tl=cell-${IMAGE.cell}]`, 1800);
  tl.showCaption(CAPTIONS.bar);
  await ring(tl, "[data-tl=formula-bar]", 1800);
  await finish(tl, 600);
}
