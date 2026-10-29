import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { IMAGE } from "@/components/sheets/insert-data";
import { chooseSub, openMenu } from "@/components/sheets/edit-timeline";
import { beginInsert, chooseImageFile, openImageDialog, placeImageOver, resizeFloatingImage } from "@/components/sheets/insert-timeline";
import { pressOn, ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 46 - Insert > Image > Insert image over cells: the picture floats over the grid, selected, and is resized. */
export const STEP46_DURATION_MS = 17000;

export async function runStep46(tl: Timeline) {
  beginInsert(tl, URLS.renamed);
  await tl.at(700);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  tl.showCaption(CAPTIONS.choose);
  await chooseSub(tl, "ins-image", "img-over", { ms: 450, hold: 400 });
  openImageDialog(tl);
  await tl.wait(700);
  tl.showCaption(CAPTIONS.drop);
  await chooseImageFile(tl, "skyline");
  tl.showCaption(CAPTIONS.insert);
  await pressOn(tl, "[data-tl=img-insert]", { ms: 700 });
  placeImageOver(tl, "skyline");
  await tl.wait(800);
  tl.showCaption(CAPTIONS.floats);
  await ring(tl, "[data-tl=float-img]", 2200);
  tl.showCaption(CAPTIONS.resize);
  await resizeFloatingImage(tl, IMAGE.overResized);
  await tl.wait(600);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=cell-a2]", 1500);
  await finish(tl, 600);
}
