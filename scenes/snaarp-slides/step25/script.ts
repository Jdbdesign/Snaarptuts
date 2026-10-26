import { beginEiv } from "../eiv";
import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { SPEAKER_NOTES } from "@/components/slides/slide-elements-data";
import { pressOn, ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 25 - Add speaker notes. Starts in the editor on slide 2 with the notes panel closed. */
export const STEP25_DURATION_MS = 28000;

export async function runStep25(tl: Timeline) {
  beginEiv(tl);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "view", { ms: 800 });
  tl.showCaption(CAPTIONS.row);
  await chooseRow(tl, "view", "notes", { ms: 700 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.panel);
  await ring(tl, "[data-tl=notes-panel]", 1800);

  // Type a note
  await tl.at(8000);
  tl.showCaption(CAPTIONS.type);
  await pressOn(tl, "[data-tl=notes-field]", { ms: 900, ring: false });
  tl.setVar("focus", "notes");
  await tl.typeText("notes", SPEAKER_NOTES.sample, { msPerChar: 55 });
  await tl.wait(1800);

  // Clear it
  await tl.at(15000);
  tl.setVar("focus", "");
  tl.showCaption(CAPTIONS.clear);
  await pressOn(tl, "[data-tl=notes-clear]", { ms: 900 });
  await tl.wait(1500);

  // Close the panel from View again
  await tl.at(19500);
  tl.showCaption(CAPTIONS.close);
  await openMenu(tl, "view", { ms: 800 });
  await chooseRow(tl, "view", "notes", { ms: 700 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=notes-bar]", 1500);

  await tl.at(26500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP25_DURATION_MS);
}
