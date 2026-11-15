import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP5_DURATION_MS = 12000;

export async function runStep5(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.projects, "projects", [0.92, 0.65], 5);
  // Start with drawer open
  tl.setVar("isProjectDrawerOpen", true);
  tl.setVar("selectedProjectId", "p-template");

  // Beat 1: Click Manage in drawer
  await tl.at(400);
  tl.showCaption("Click Manage in the project drawer to review workspace members.");
  await pressOn(tl, "[data-tl=project-drawer-manage-team-btn]", { ms: 600 });
  await tl.wait(300);

  // Beat 2: Inspect members view
  await tl.at(2800);
  tl.showCaption("Review active project members, workspace permissions, and status.");
  await hoverOn(tl, "[data-tl=members-count-badge]", { ms: 500 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=member-row-m1]", { ms: 550 });
  await tl.wait(800);

  // Beat 3: Change Casey Brown's role to Admin
  await tl.at(5600);
  tl.showCaption("Change Casey Brown's role from Member to Admin.");
  await hoverOn(tl, "[data-tl=member-role-select-m2]", { ms: 550 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=member-role-select-m2]", { ms: 500 });
  await tl.wait(500);

  // Beat 4: Confirm role change
  await tl.at(8400);
  tl.showCaption("Casey Brown is now granted Admin rights across the project.");
  await hoverOn(tl, "[data-tl=member-row-m2]", { ms: 550 });
  await tl.wait(1400);

  // Finish
  await tl.at(11200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
