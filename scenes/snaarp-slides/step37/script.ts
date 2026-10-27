import { chooseSubRow, closeMenu, hoverRow, hoverSubRow, openMenu } from "@/components/slides/menu-timeline";
import { pressOn } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 37 - Align and indent your text. Starts in the editor on slide 2. */
export const STEP37_DURATION_MS = 40000;

export async function runStep37(tl: Timeline) {
  beginEiv(tl);

  // Select the bullets
  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await pressOn(tl, "[data-tl=el-s2-bullets]", { ms: 900 });
  await tl.wait(400);

  // The Align and indent submenu
  await tl.at(3200);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "format", { ms: 750 });
  await hoverRow(tl, "format", "align", { ms: 600 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.rows);
  for (const id of ["left", "center", "right", "justify", "indent-more", "indent-less"]) await hoverSubRow(tl, "format", id, { ms: 320 });
  await tl.wait(300);
  closeMenu(tl);

  // Center, Right, Left
  await tl.at(9000);
  const apply = async (id: string, caption: string, openMs = 650) => {
    await openMenu(tl, "format", { ms: openMs });
    tl.showCaption(caption);
    await chooseSubRow(tl, "format", "align", id, { ms: 450 });
    await tl.wait(1300);
  };
  await apply("center", CAPTIONS.center, 700);
  await tl.at(13000);
  await apply("right", CAPTIONS.right);
  await tl.at(16500);
  await apply("left", CAPTIONS.left);

  // Indent
  await tl.at(20000);
  await apply("indent-more", CAPTIONS.indent);
  await tl.at(23000);
  await apply("indent-more", CAPTIONS.indentTwice);
  await tl.at(26000);
  await apply("indent-less", CAPTIONS.outdent);

  // Line spacing
  await tl.at(29000);
  tl.showCaption(CAPTIONS.spacingOpen);
  await openMenu(tl, "format", { ms: 650 });
  await hoverRow(tl, "format", "spacing", { ms: 500 });
  tl.showCaption(CAPTIONS.spacingRows);
  for (const id of ["single", "s115", "s15", "double"]) await hoverSubRow(tl, "format", id, { ms: 300 });
  tl.showCaption(CAPTIONS.spacing);
  await chooseSubRow(tl, "format", "spacing", "s15", { ms: 450 });
  await tl.wait(1500);
  tl.showCaption(CAPTIONS.done);

  await tl.at(38500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP37_DURATION_MS);
}
