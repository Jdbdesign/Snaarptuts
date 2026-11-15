import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
  typeIntoVar,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP4_DURATION_MS = 14000;

export async function runStep4(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.projects, "projects", [0.85, 0.15], 4);

  // Beat 1: Click New Project
  await tl.at(400);
  tl.showCaption("Click New Project to start from scratch or choose a pre-built template.");
  await pressOn(tl, "[data-tl=projects-new-project-btn]", { ms: 600 });
  await tl.wait(300);

  // Beat 2: Select Explore Snaarp Projects template
  await tl.at(2800);
  tl.showCaption("Select Explore Snaarp Projects! from the template gallery.");
  await hoverOn(tl, "[data-tl=template-card-tmpl-explore]", { ms: 600 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=template-card-tmpl-explore]", { ms: 500 });
  await tl.wait(400);

  // Beat 3: Type client Acme Studio
  await tl.at(5600);
  tl.showCaption("Enter the client name for the new project.");
  await pressOn(tl, "[data-tl=template-form-client-input]", { ms: 550, ring: false });
  await typeIntoVar(tl, "[data-tl=template-form-client-input]", "formClient", "Acme Studio", {
    msPerChar: 40,
  });
  await tl.wait(500);

  // Beat 4: Click Use Template
  await tl.at(8400);
  tl.showCaption("Click Use Template to create the project and its starter tasks.");
  await pressOn(tl, "[data-tl=template-form-submit-btn]", { ms: 600 });
  await tl.wait(400);

  // Beat 5: Confirm creation & drawer
  await tl.at(10800);
  tl.showCaption("The project is created with 5 starter tasks and added to your workspace.");
  await hoverOn(tl, "[data-tl=project-drawer-title]", { ms: 600 });
  await tl.wait(1400);

  // Finish
  await tl.at(13200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
