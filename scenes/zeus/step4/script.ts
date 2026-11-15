import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  pressOn,
  typeIntoVar,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";

export const STEP4_DURATION_MS = 12500;

export async function runStep4(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.people, "people", [0.85, 0.15], 4);

  // Pre-seed search results so table is open
  tl.setVar("zeusSearchResults", true);
  tl.setVar("zeusFilterKeyword", "CEO");
  tl.setVar("zeusFilterSeniority", ["C-Suite", "VP"]);

  // Beat 1: Click Save search
  await tl.at(400);
  tl.showCaption("Click Save search to store your active filter configuration.");
  await pressOn(tl, "[data-tl=btn-save-search]", { ms: 600 });
  await tl.wait(400);

  // Beat 2: Type search name "CEOs"
  await tl.at(2400);
  tl.showCaption("Name your search \"CEOs\" to run it again anytime.");
  await pressOn(tl, "[data-tl=input-save-search-name]", { ms: 550 });
  await typeIntoVar(tl, "[data-tl=input-save-search-name]", "zeusSavedSearchName", "CEOs", { msPerChar: 65 });
  await tl.wait(300);

  // Beat 3: Click Save
  await tl.at(5200);
  tl.showCaption("Click Save to confirm.");
  await pressOn(tl, "[data-tl=btn-confirm-save-search]", { ms: 600 });
  await tl.wait(1000);

  // Beat 4: Open Saved Searches dropdown
  await tl.at(7400);
  tl.showCaption("Click Saved Searches to access your saved lead lists.");
  await pressOn(tl, "[data-tl=btn-saved-searches]", { ms: 600 });
  await tl.wait(500);

  // Beat 5: Re-run the saved search
  await tl.at(9200);
  tl.showCaption("Click CEOs to re-run your search instantly.");
  await pressOn(tl, "[data-tl=saved-search-item]", { ms: 550 });
  await tl.wait(1000);

  // Finish
  await tl.at(11800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
