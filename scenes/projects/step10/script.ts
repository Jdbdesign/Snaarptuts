import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP10_DURATION_MS = 14500;

export async function runStep10(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.dashboard, "dashboard", [0.12, 0.22], 10);

  // Beat 1: Click Sprints in sidebar
  await tl.at(400);
  tl.showCaption("Click Sprints in the sidebar to view development iterations.");
  await pressOn(tl, "[data-tl=nav-sprints]", { ms: 600 });
  tl.setUrl(PROJECTS_URLS.sprints);
  tl.setVar("projectsView", "sprints");
  await tl.wait(400);

  // Beat 2: Inspect stats cards
  await tl.at(2800);
  tl.showCaption("Track total sprints, active sprint status, velocity, and points delivered.");
  await hoverOn(tl, "[data-tl=stat-total-sprints]", { ms: 500 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=stat-active-sprint]", { ms: 450 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=stat-completed-sprints]", { ms: 450 });
  await tl.wait(600);

  // Beat 3: Filter pills and empty state
  await tl.at(5600);
  tl.showCaption("Filter by sprint status or search sprints by keyword.");
  await hoverOn(tl, "[data-tl=sprint-filter-pill-all]", { ms: 500 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=sprint-search-input]", { ms: 450 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=sprints-empty-state]", { ms: 500 });
  await tl.wait(800);

  // Beat 4: Click Calendar tab
  await tl.at(8400);
  tl.showCaption("Click Calendar to view tasks and deadlines scheduled across the month.");
  await pressOn(tl, "[data-tl=sprints-tab-calendar]", { ms: 550 });
  await tl.wait(500);

  // Beat 5: Hover task chip on 19th
  await tl.at(10200);
  tl.showCaption("Hover a scheduled task to preview its priority, due date, and assignees.");
  await hoverOn(tl, "[data-tl=sprint-cal-task-chip]", { ms: 550 });
  tl.setVar("hoverCalendarChip", true);
  await tl.wait(1200);

  // Beat 6: Return to Sprints tab
  await tl.at(12200);
  tl.setVar("hoverCalendarChip", false);
  tl.showCaption("Click Sprints to return to the iterations view.");
  await pressOn(tl, "[data-tl=sprints-tab-sprints]", { ms: 500 });
  await tl.wait(600);

  // Finish
  await tl.at(13500);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
