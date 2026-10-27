import { FORMAT_DECK } from "@/components/slides/slide-elements-data";
import { chooseRow, closeMenu, hoverRow, openMenu } from "@/components/slides/menu-timeline";
import { pressOn, ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 36 - Format your text. Starts in the editor on slide 2 (the title in regular weight). */
export const STEP36_DURATION_MS = 33000;

export async function runStep36(tl: Timeline) {
  beginEiv(tl, [0.55, 0.55], FORMAT_DECK);

  // Format with nothing selected: the style rows are greyed out
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "format", { ms: 800 });
  tl.showCaption(CAPTIONS.grey);
  for (const id of ["bold", "italic", "underline", "strike"]) await hoverRow(tl, "format", id, { ms: 380 });
  await tl.wait(900);
  closeMenu(tl);

  // Select the title
  await tl.at(7000);
  tl.showCaption(CAPTIONS.select);
  await pressOn(tl, "[data-tl=el-s2-title]", { ms: 900 });
  await tl.wait(500);

  // Apply the four styles
  const styles: [string, string][] = [
    ["bold", CAPTIONS.bold],
    ["italic", CAPTIONS.italic],
    ["underline", CAPTIONS.underline],
    ["strike", CAPTIONS.strike],
  ];
  let t = 9500;
  for (const [id, caption] of styles) {
    await tl.at(t);
    tl.showCaption(id === "bold" ? CAPTIONS.again : caption);
    await openMenu(tl, "format", { ms: id === "bold" ? 800 : 600 });
    tl.showCaption(caption);
    await chooseRow(tl, "format", id, { ms: 550 });
    await tl.wait(900);
    t += 3500;
  }

  // The tick, then turn Bold off again
  await tl.at(23800);
  tl.showCaption(CAPTIONS.ticks);
  await openMenu(tl, "format", { ms: 600 });
  await ring(tl, "[data-tl=format-group-0]", 1500);
  tl.showCaption(CAPTIONS.off);
  await chooseRow(tl, "format", "bold", { ms: 450 });
  await tl.wait(1200);
  tl.showCaption(CAPTIONS.done);

  await tl.at(31500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP36_DURATION_MS);
}
