import { beginEiv, clickBlank } from "../eiv";
import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { INSERTS, TYPED } from "@/components/slides/slide-elements-data";
import { drawTextBox, endTextEdit, getSel } from "@/components/slides/slides-edit";
import { ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 30 - Add a text box. Starts in the editor on slide 2. */
export const STEP30_DURATION_MS = 27000;

export async function runStep30(tl: Timeline) {
  beginEiv(tl);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  tl.showCaption(CAPTIONS.row);
  await chooseRow(tl, "insert", "textbox", { ms: 700 });
  await tl.wait(500);

  // Draw the box
  await tl.at(5500);
  tl.showCaption(CAPTIONS.draw);
  await drawTextBox(tl, INSERTS.textBox, 1300);
  await tl.wait(500);

  // Type
  tl.showCaption(CAPTIONS.type);
  await tl.typeText("slideText", TYPED.textBox, { msPerChar: 60 });
  await tl.wait(900);

  // Finish
  await tl.at(15500);
  tl.showCaption(CAPTIONS.done);
  await clickBlank(tl);
  endTextEdit(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.result);
  const [id] = getSel(tl);
  await ring(tl, `[data-tl=el-${id}]`, 2500);

  await tl.at(25500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP30_DURATION_MS);
}
