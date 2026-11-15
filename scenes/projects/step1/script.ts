import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP1_DURATION_MS = 10500;

export async function runStep1(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.dashboard, "dashboard", [0.45, 0.35], 1);

  // Beat 1: Welcome & Overview
  await tl.at(400);
  tl.showCaption("Welcome to Snaarp Projects, your workspace for projects, tasks, and team tracking.");
  await hoverOn(tl, "[data-tl=dashboard-greeting-title]", { ms: 600 });
  await tl.wait(1400);

  // Beat 2: Quick Stats Row
  await tl.at(2800);
  tl.showCaption("Track work at a glance across To-do, Total Projects, Assigned, and Overdue.");
  await hoverOn(tl, "[data-tl=stat-card-todo]", { ms: 500 });
  await tl.wait(350);
  await hoverOn(tl, "[data-tl=stat-card-total-projects]", { ms: 450 });
  await tl.wait(350);
  await hoverOn(tl, "[data-tl=stat-card-overdue]", { ms: 450 });
  await tl.wait(800);

  // Beat 3: Critical Projects & Team Status
  await tl.at(5400);
  tl.showCaption("Monitor critical active projects and team progress in real time.");
  await hoverOn(tl, "[data-tl=critical-project-customer-acquisition]", { ms: 550 });
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=dashboard-team-status-card]", { ms: 600 });
  await tl.wait(1000);

  // Beat 4: Calendar View
  await tl.at(7800);
  tl.showCaption("The calendar view surfaces daily schedules and workspace deadlines.");
  await hoverOn(tl, "[data-tl=calendar-day-15]", { ms: 650 });
  await tl.wait(1200);

  // Finish
  await tl.at(9800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
