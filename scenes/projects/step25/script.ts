import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP25_DURATION_MS = 16500;

export async function runStep25(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.integration, "integration", [0.12, 0.52], 25);

  // Beat 1: Click Reports in sidebar
  await tl.at(400);
  tl.showCaption("Click Reports in the sidebar to view project metrics.");
  await pressOn(tl, "[data-tl=nav-reports]", { ms: 600 });
  tl.setUrl(PROJECTS_URLS.reports);
  tl.setVar("projectsView", "reports");
  await tl.wait(600);

  // Beat 2: Review stat cards
  await tl.at(2500);
  tl.showCaption("Review total tasks and completion rate across active projects.");
  await hoverOn(tl, "[data-tl=report-stat-total-tasks]", { ms: 500 });
  await tl.wait(700);

  await tl.at(4000);
  await hoverOn(tl, "[data-tl=report-stat-completion]", { ms: 450 });
  await tl.wait(700);

  // Beat 3: Check overdue & unassigned
  await tl.at(5600);
  tl.showCaption("Check overdue items and unassigned workload allocations.");
  await hoverOn(tl, "[data-tl=report-stat-overdue]", { ms: 500 });
  await tl.wait(700);

  await tl.at(7100);
  await hoverOn(tl, "[data-tl=report-stat-unassigned]", { ms: 450 });
  await tl.wait(700);

  // Beat 4: Priority distribution
  await tl.at(8800);
  tl.showCaption("Inspect priority distribution breakdown across tasks.");
  await hoverOn(tl, "[data-tl=report-priority-distribution]", { ms: 600 });
  await tl.wait(1200);

  // Beat 5: Task summary rows
  await tl.at(11200);
  tl.showCaption("Monitor task due dates and velocity metrics in the task summary.");
  await hoverOn(tl, "[data-tl=report-summary-due]", { ms: 450 });
  await tl.wait(600);

  await tl.at(12600);
  await hoverOn(tl, "[data-tl=report-summary-urgent]", { ms: 450 });
  await tl.wait(600);

  await tl.at(13900);
  await hoverOn(tl, "[data-tl=report-summary-assigned]", { ms: 450 });
  await tl.wait(600);

  await tl.at(15100);
  await hoverOn(tl, "[data-tl=report-summary-avg]", { ms: 450 });

  await finishProjects(tl, STEP25_DURATION_MS);
}
