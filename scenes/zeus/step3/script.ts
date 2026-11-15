import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  pressOn,
  hoverOn,
  typeIntoVar,
  scrollView,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";

export const STEP3_DURATION_MS = 14500;

export async function runStep3(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.people, "people", [0.45, 0.45], 3);

  // Beat 1: Click C-Suite Executives preset
  await tl.at(400);
  tl.showCaption("Click C-Suite Executives to run a quick search across top leaders.");
  await pressOn(tl, "[data-tl=card-c-suite]", { ms: 600 });
  await tl.wait(1000);

  // Beat 2: Filter by keyword "CEO"
  await tl.at(3000);
  tl.showCaption("Type \"CEO\" into the Keyword filter to narrow your focus.");
  await pressOn(tl, "[data-tl=filter-keyword-input]", { ms: 600 });
  await typeIntoVar(tl, "[data-tl=filter-keyword-input]", "zeusFilterKeyword", "CEO", { msPerChar: 60 });
  await tl.wait(400);

  // Beat 3: Filter by Has email & Seniority
  await tl.at(5800);
  tl.showCaption("Select \"Has email\" and choose seniority levels.");
  await pressOn(tl, "[data-tl=filter-has-email-radio]", { ms: 550 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=filter-seniority-csuite]", { ms: 450 });
  await tl.wait(250);
  await pressOn(tl, "[data-tl=filter-seniority-vp]", { ms: 450 });
  await tl.wait(400);

  // Beat 4: Click Search People
  await tl.at(8800);
  tl.showCaption("Click Search People to apply all filters.");
  await pressOn(tl, "[data-tl=btn-search-people]", { ms: 600 });
  await tl.wait(1000);

  // Beat 5: Review filtered leads
  await tl.at(10800);
  tl.showCaption("Browse verified contacts matching your exact criteria.");
  await hoverOn(tl, "[data-tl=contact-row-jordan-lee]", { ms: 600 });
  await tl.wait(500);
  await scrollView(tl, "[data-tl=zeus-table-scroll]", 160, 500);
  await tl.wait(1000);

  // Finish
  await tl.at(13800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
