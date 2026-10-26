import type { Timeline } from "@/lib/timeline";
import { begin, showScreen } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 1 - Open Snaarp Slides. Starts on the Presentations home. Times are active ms from the start of the step. */
export const STEP1_DURATION_MS = 19000;

export async function runStep1(tl: Timeline) {
  begin(tl, URLS.home, [0.55, 0.3]);

  // The home
  await tl.at(1000);
  tl.showCaption(CAPTIONS.home);
  tl.highlight("[data-tl=nav-presentations]");

  // The search box
  await tl.at(2800);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.search);
  await tl.moveCursorTo("[data-tl=slides-search]", { ms: 700, dx: 40 });
  tl.highlight("[data-tl=slides-search]");

  await tl.at(3300);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.start);
  tl.highlight("[data-tl=start-panel]");
  await tl.moveCursorTo("[data-tl=template-ocean-blue]", { ms: 800 });
  tl.hover("[data-tl=template-ocean-blue]");

  await tl.at(6300);
  tl.hover(null);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.recent);
  await tl.moveCursorTo("[data-tl=recent-1]", { ms: 800 });
  tl.hover("[data-tl=recent-1]");
  tl.highlight("[data-tl=recent-1]");

  // Starred
  await tl.at(9000);
  tl.hover(null);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.starred);
  await tl.moveCursorTo("[data-tl=nav-starred]", { ms: 700 });
  tl.highlight("[data-tl=nav-starred]");
  await tl.wait(100);
  await tl.click("[data-tl=nav-starred]");
  tl.clearHighlight();
  await showScreen(tl, "starred", URLS.starred);
  tl.showCaption(CAPTIONS.starredInfo);

  // Trash
  await tl.at(12000);
  tl.showCaption(CAPTIONS.trash);
  await tl.moveCursorTo("[data-tl=nav-trash]", { ms: 600 });
  tl.highlight("[data-tl=nav-trash]");
  await tl.wait(100);
  await tl.click("[data-tl=nav-trash]");
  tl.clearHighlight();
  await showScreen(tl, "trash", URLS.trash);
  tl.showCaption(CAPTIONS.trashInfo);
  await tl.wait(400);
  await tl.moveCursorTo("[data-tl=trash-restore-1]", { ms: 800 });
  tl.hover("[data-tl=trash-restore-1]");

  // Back to Presentations
  await tl.at(16000);
  tl.hover(null);
  tl.showCaption(CAPTIONS.back);
  await tl.moveCursorTo("[data-tl=nav-presentations]", { ms: 700 });
  tl.highlight("[data-tl=nav-presentations]");
  await tl.wait(100);
  await tl.click("[data-tl=nav-presentations]");
  tl.clearHighlight();
  await showScreen(tl, "presentations", URLS.home);

  // Quick white fade
  await tl.at(18200);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP1_DURATION_MS);
}
