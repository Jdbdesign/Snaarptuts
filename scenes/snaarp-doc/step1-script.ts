import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step1-data";

/** Snaarp Doc, step 1 - Explore Snaarp Doc. Times are active milliseconds from the start of the step. */
export const STEP1_DURATION_MS = 15400;

/** Quick fade of the content area only (the rail, sidebar and top bar never flicker), then show another screen. */
async function showScreen(tl: Timeline, screen: "a" | "b" | "c", url: string) {
  tl.setVar("swap", true);
  await tl.wait(150);
  tl.setVar("screen", screen);
  tl.setUrl(url);
  tl.setVar("swap", false);
}

export async function runStep1(tl: Timeline) {
  tl.placeCursor(0.55, 0.3);
  tl.setUrl(URLS.documents);
  tl.setVar("intro", 1); // screen A fades in

  // The home
  await tl.at(1000);
  tl.showCaption(CAPTIONS.home);
  tl.highlight("[data-tl=start-panel]");

  // Recent documents, and the grid / list buttons
  await tl.at(3500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.recent);
  await tl.moveCursorTo("[data-tl=view-grid]", { ms: 800 });
  tl.hover("[data-tl=view-grid]");
  await tl.wait(500);
  await tl.moveCursorTo("[data-tl=view-list]", { ms: 350 });
  tl.hover("[data-tl=view-list]");

  // Template gallery
  await tl.at(5500);
  tl.hover(null);
  tl.showCaption(CAPTIONS.gallery);
  await tl.moveCursorTo("[data-tl=template-gallery]", { ms: 800 });
  tl.highlight("[data-tl=template-gallery]");
  await tl.wait(200);
  await tl.click("[data-tl=template-gallery]");
  tl.clearHighlight();

  // Screen B
  await tl.at(7000);
  await showScreen(tl, "b", URLS.templates);
  tl.showCaption(CAPTIONS.browse);
  await tl.wait(250);
  for (const i of [1, 2, 3]) {
    await tl.moveCursorTo(`[data-tl=chip-${i}]`, { ms: 550 });
    tl.hover(`[data-tl=chip-${i}]`);
    await tl.wait(450);
  }
  tl.hover(null);

  // Trash
  await tl.at(10000);
  tl.showCaption(CAPTIONS.trash);
  await tl.moveCursorTo("[data-tl=nav-trash]", { ms: 550 });
  tl.highlight("[data-tl=nav-trash]");
  await tl.wait(60);
  await tl.click("[data-tl=nav-trash]");
  tl.clearHighlight();

  // Screen C
  await tl.at(10800);
  await showScreen(tl, "c", URLS.trash);
  tl.showCaption(CAPTIONS.trashInfo);
  await tl.wait(500);
  await tl.moveCursorTo("[data-tl=trash-restore]", { ms: 800 });
  tl.hover("[data-tl=trash-restore]");

  // Back to Documents
  await tl.at(13000);
  tl.hover(null);
  tl.showCaption(CAPTIONS.back);
  await tl.moveCursorTo("[data-tl=nav-documents]", { ms: 700 });
  tl.highlight("[data-tl=nav-documents]");
  await tl.wait(100);
  await tl.click("[data-tl=nav-documents]");
  tl.clearHighlight();
  await showScreen(tl, "a", URLS.documents);

  // Quick white fade
  await tl.at(15000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP1_DURATION_MS);
}
