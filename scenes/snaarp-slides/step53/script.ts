import { TRANSITIONS } from "@/components/slides/slides-toolbar-data";
import { chooseOption, hoverOption, openToolbar, playTransition } from "@/components/slides/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 53 - Add a slide transition. Starts in the editor on slide 2 (the preview runs from slide 2 to slide 3). */
export const STEP53_DURATION_MS = 40000;

export async function runStep53(tl: Timeline) {
  beginEiv(tl);
  tl.setVar("tpreview", null);

  // The list
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openToolbar(tl, "transition", { ms: 800 });
  tl.showCaption(CAPTIONS.rows);
  for (const t of TRANSITIONS) await hoverOption(tl, "transition", t.id, { ms: 280 });
  await tl.wait(300);

  // Fade
  tl.showCaption(CAPTIONS.fade);
  await chooseOption(tl, "transition", "fade", { ms: 500 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.fadeDone);
  await playTransition(tl, "fade");
  await tl.wait(600);

  const another = async (id: string, caption: string) => {
    tl.showCaption(caption);
    await openToolbar(tl, "transition", { ms: 650 });
    await chooseOption(tl, "transition", id, { ms: 450 });
    await tl.wait(200);
    await playTransition(tl, id);
    await tl.wait(600);
  };

  await tl.at(13500);
  await another("slide-right", CAPTIONS.slide);
  await tl.at(19500);
  await another("flip", CAPTIONS.flip);
  await tl.at(25000);
  await another("cube", CAPTIONS.cube);
  await tl.at(30500);
  await another("dissolve", CAPTIONS.dissolve);

  await tl.at(36500);
  tl.showCaption(CAPTIONS.done);
  await tl.at(38800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP53_DURATION_MS);
}
