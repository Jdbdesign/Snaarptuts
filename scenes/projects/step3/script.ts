import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP3_DURATION_MS = 12000;

export async function runStep3(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.dashboard, "dashboard", [0.12, 0.2], 3);

  // Beat 1: Click Projects in sidebar
  await tl.at(400);
  tl.showCaption("Click Projects in the sidebar to open the workspace projects directory.");
  await pressOn(tl, "[data-tl=nav-projects]", { ms: 600 });
  await tl.wait(300);

  // Beat 2: Inspect grid & controls
  await tl.at(2600);
  tl.showCaption("Projects display active status, completion metrics, and assigned leads.");
  await hoverOn(tl, "[data-tl=projects-total-badge]", { ms: 500 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=projects-filter-btn]", { ms: 450 });
  await tl.wait(800);

  // Beat 3: Click Customer Acquisition Strategy
  await tl.at(4800);
  tl.showCaption("Click Customer Acquisition Strategy to inspect project details.");
  await pressOn(tl, "[data-tl=project-card-p1]", { ms: 600 });
  await tl.wait(400);

  // Beat 4: Drawer details & progress
  await tl.at(7200);
  tl.showCaption("The details drawer outlines progress, dates, category, and lead assignee.");
  await hoverOn(tl, "[data-tl=project-drawer-details-section]", { ms: 600 });
  await tl.wait(1200);

  // Beat 5: Team & milestones
  await tl.at(9400);
  tl.showCaption("Assigned team members and project milestones are managed right here.");
  await hoverOn(tl, "[data-tl=project-drawer-team-section]", { ms: 550 });
  await tl.wait(1200);

  // Finish
  await tl.at(11200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
