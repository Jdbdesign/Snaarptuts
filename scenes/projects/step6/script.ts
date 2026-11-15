import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP6_DURATION_MS = 11500;

export async function runStep6(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.members, "members", [0.12, 0.28], 6);

  // Beat 1: Click Tasks in sidebar
  await tl.at(400);
  tl.showCaption("Click Tasks in the sidebar to open the project's work items.");
  await pressOn(tl, "[data-tl=nav-tasks]", { ms: 600 });
  await tl.wait(300);

  // Beat 2: Project selector & overall progress
  await tl.at(2800);
  tl.showCaption("Track work items across your project with real-time completion tracking.");
  await hoverOn(tl, "[data-tl=tasks-project-dropdown]", { ms: 550 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=tasks-overall-progress]", { ms: 550 });
  await tl.wait(800);

  // Beat 3: Tabs: Tasks, Issues, Bugs
  await tl.at(5400);
  tl.showCaption("Organize work by Tasks, Issues, or reported Bugs.");
  await hoverOn(tl, "[data-tl=tasks-tab-tasks]", { ms: 500 });
  await tl.wait(350);
  await hoverOn(tl, "[data-tl=tasks-tab-issues]", { ms: 450 });
  await tl.wait(350);
  await hoverOn(tl, "[data-tl=tasks-tab-bugs]", { ms: 450 });
  await tl.wait(800);

  // Beat 4: Sub-tabs: List, Board, Gantt, Calendar
  await tl.at(7800);
  tl.showCaption("Switch between List View, Board, Gantt chart, and Calendar schedule.");
  await hoverOn(tl, "[data-tl=tasks-subtab-board]", { ms: 450 });
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=tasks-subtab-gantt]", { ms: 400 });
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=tasks-subtab-list]", { ms: 450 });
  await tl.wait(1000);

  // Finish
  await tl.at(10500);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
