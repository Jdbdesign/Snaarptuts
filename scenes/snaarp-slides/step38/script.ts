import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { chooseOption, hoverOption, openToolbar } from "@/components/slides/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 38 - Change the theme. Starts in the editor on slide 2. Ends on Ocean Blue. */
export const STEP38_DURATION_MS = 38000;

const THEME_IDS = ["simple-light", "simple-dark", "modern-dark", "ocean-blue", "forest-green", "purple-dream"];

export async function runStep38(tl: Timeline) {
  beginEiv(tl);

  // Format > Theme opens the theme list
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "format", { ms: 800 });
  await chooseRow(tl, "format", "theme", { ms: 600 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.list);
  for (const id of THEME_IDS) await hoverOption(tl, "theme", id, { ms: 300 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.dark);
  await chooseOption(tl, "theme", "simple-dark", { ms: 600 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.whole);
  await tl.wait(2400);

  // The toolbar Theme button
  await tl.at(13500);
  tl.showCaption(CAPTIONS.toolbar);
  const apply = async (id: string, caption: string, ms = 600) => {
    await openToolbar(tl, "theme", { ms });
    tl.showCaption(caption);
    await chooseOption(tl, "theme", id, { ms: 500 });
    await tl.wait(1500);
  };
  await apply("modern-dark", CAPTIONS.modern, 800);
  await tl.at(18500);
  await apply("forest-green", CAPTIONS.forest);
  await tl.at(23000);
  await apply("purple-dream", CAPTIONS.purple);
  await tl.at(27500);
  await apply("ocean-blue", CAPTIONS.ocean);
  await tl.wait(800);
  tl.showCaption(CAPTIONS.done);

  await tl.at(36500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP38_DURATION_MS);
}
