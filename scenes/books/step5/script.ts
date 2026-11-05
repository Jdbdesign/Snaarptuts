import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  hoverOn,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP5_DURATION_MS = 10000;

export async function runStep5(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.dashboard, "home", [0.45, 0.25]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickRecent);
  await pressOn(tl, "[data-tl=tab-home-recent-updates]");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.scrollUpdates);
  await hoverOn(tl, "[data-tl=update-row-1]", { ms: 500 });
  await ring(tl, "[data-tl=update-row-1]", 1500);

  await tl.scrollTo("[data-tl=update-row-8]", { duration: 600 });
  await tl.wait(600);

  tl.showCaption(CAPTIONS.readEntries);
  await hoverOn(tl, "[data-tl=update-row-8]", { ms: 500 });
  await ring(tl, "[data-tl=update-row-8]", 1600);

  // Return to Dashboard
  tl.showCaption(CAPTIONS.backDashboard);
  await tl.scrollTo("[data-tl=tab-home-dashboard]", { duration: 500 });
  await pressOn(tl, "[data-tl=tab-home-dashboard]");
  await tl.wait(1000);

  await finishBooks(tl, STEP5_DURATION_MS);
}
