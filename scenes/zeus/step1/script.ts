import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  hoverOn,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";

export const STEP1_DURATION_MS = 10500;

export async function runStep1(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.people, "people", [0.45, 0.35], 1);

  // Beat 1: Welcome & Overview
  await tl.at(400);
  tl.showCaption("Welcome to Zeus, your verified B2B lead discovery platform.");
  await hoverOn(tl, "[data-tl=zeus-brand-header]", { ms: 600 });
  await tl.wait(1500);

  // Beat 2: Navigation & Search
  await tl.at(2800);
  tl.showCaption("Navigate between People, Companies, Lists, and Exports.");
  await hoverOn(tl, "[data-tl=zeus-nav-people]", { ms: 550 });
  await tl.wait(500);
  await hoverOn(tl, "[data-tl=zeus-nav-lists]", { ms: 450 });
  await tl.wait(800);

  // Beat 3: Top Bar & Credits
  await tl.at(5000);
  tl.showCaption("Search people directly or track your available monthly credits.");
  await hoverOn(tl, "[data-tl=zeus-topbar-search-box]", { ms: 600 });
  await tl.wait(700);
  await hoverOn(tl, "[data-tl=zeus-credits-pill]", { ms: 500 });
  await tl.wait(1000);

  // Beat 4: Quick Start Cards
  await tl.at(7500);
  tl.showCaption("Use quick start presets to instantly find decision makers across industries.");
  await hoverOn(tl, "[data-tl=card-c-suite]", { ms: 550 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=card-vp-eng]", { ms: 400 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=card-sales]", { ms: 400 });
  await tl.wait(400);

  // Finish
  await tl.at(9800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
