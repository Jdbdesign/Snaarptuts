import { SPELL_DECK } from "@/components/slides/slide-elements-data";
import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { pressOn, ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 50 - Set your preferences. Starts on slide 2 with the title misspelt, so the spelling check has something to show. */
export const STEP50_DURATION_MS = 38000;

export async function runStep50(tl: Timeline) {
  beginEiv(tl, [0.55, 0.55], SPELL_DECK);
  for (const [k, v] of [["spell", null], ["pref:spell", false], ["pref:ruler", false], ["prefTheme", "simple-light"], ["prefMenu", false], ["rulers", false]] as const) tl.setVar(k, v);

  // Tools > Preferences
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "tools", { ms: 800 });
  await chooseRow(tl, "tools", "prefs", { ms: 600 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.dialog);
  await ring(tl, "[data-tl=preferences-dialog]", 2000);

  // The switches
  await tl.at(8000);
  tl.showCaption(CAPTIONS.spell);
  await pressOn(tl, "[data-tl=pref-spell]", { ms: 800 });
  await tl.wait(1200);
  await tl.at(11500);
  tl.showCaption(CAPTIONS.ruler);
  await pressOn(tl, "[data-tl=pref-ruler]", { ms: 700 });
  await tl.wait(1200);

  // Default theme
  await tl.at(15500);
  tl.showCaption(CAPTIONS.theme);
  await pressOn(tl, "[data-tl=pref-theme]", { ms: 700 });
  await tl.wait(500);
  for (const id of ["simple-light", "simple-dark", "modern-dark", "ocean-blue"]) {
    await tl.moveCursorTo(`[data-tl=pref-theme-${id}]`, { ms: 300 });
    tl.hover(`[data-tl=pref-theme-${id}]`);
  }
  tl.showCaption(CAPTIONS.ocean);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=pref-theme-ocean-blue]", { ms: 300 });
  tl.hover(null);
  await tl.wait(1000);

  // Save
  await tl.at(24500);
  tl.showCaption(CAPTIONS.save);
  await pressOn(tl, "[data-tl=pref-save]", { ms: 800 });
  await tl.wait(900);
  tl.showCaption(CAPTIONS.saved);
  await ring(tl, "[data-tl=canvas-slide]", 2400);

  await tl.at(34500);
  tl.showCaption(CAPTIONS.done);
  await tl.at(36500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP50_DURATION_MS);
}
