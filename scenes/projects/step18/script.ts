import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP18_DURATION_MS = 12000;

export async function runStep18(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.whiteboards, "whiteboards", [0.45, 0.25], 18);

  // Beat 1: Review whiteboard cards
  await tl.at(400);
  tl.showCaption("Review active visual whiteboards in your workspace gallery.");
  await hoverOn(tl, "[data-tl=whiteboard-card-wb-research]", { ms: 500 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=whiteboard-card-wb-sales]", { ms: 450 });
  await tl.wait(400);

  // Beat 2: Click Delete on Design Idea card
  await tl.at(3200);
  tl.showCaption("Click Delete on an unused whiteboard to retire it.");
  await pressOn(tl, "[data-tl=whiteboard-delete-btn-wb-design]", { ms: 550 });
  await tl.wait(600);

  // Beat 3: Confirm deletion
  await tl.at(6200);
  tl.showCaption("Confirm deletion in the verification dialog.");
  await pressOn(tl, "[data-tl=delete-whiteboard-confirm-btn]", { ms: 550 });
  await tl.wait(800);

  // Beat 4: Confirm updated gallery
  await tl.at(9000);
  tl.showCaption("The whiteboard is removed, keeping your workspace uncluttered.");
  await hoverOn(tl, "[data-tl=whiteboards-grid]", { ms: 500 });
  await tl.wait(1000);

  // Finish
  await tl.at(11000);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
