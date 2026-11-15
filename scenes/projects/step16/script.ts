import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP16_DURATION_MS = 17500;

export async function runStep16(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.tasks, "tasks", [0.12, 0.35], 16);

  // Beat 1: Click Whiteboards in sidebar
  await tl.at(400);
  tl.showCaption("Click Whiteboards in the sidebar to collaborate on visual diagrams.");
  await pressOn(tl, "[data-tl=nav-whiteboards]", { ms: 600 });
  tl.setUrl(PROJECTS_URLS.whiteboards);
  tl.setVar("projectsView", "whiteboards");
  await tl.wait(500);

  // Beat 2: Click "Sales & Marketing" card
  await tl.at(2600);
  tl.showCaption("Click a whiteboard to open the collaborative diagramming editor.");
  await pressOn(tl, "[data-tl=whiteboard-card-wb-sales]", { ms: 600 });
  tl.setVar("activeWhiteboardId", "wb-sales");
  tl.setVar("projectsView", "whiteboard-canvas");
  await tl.wait(600);

  // Beat 3: Select circle shape on canvas
  await tl.at(5200);
  tl.showCaption("Click shapes to inspect resize handles and layout properties.");
  await pressOn(tl, "[data-tl=wb-shape-circle-1]", { ms: 550 });
  tl.setVar("wbSelectedShapeId", "circle-1");
  await tl.wait(800);

  // Beat 4: Hover toolbar tools for tooltips
  await tl.at(7600);
  tl.showCaption("Hover tools to learn keyboard shortcuts for drawing and text creation.");
  await hoverOn(tl, "[data-tl=wb-tool-text]", { ms: 500 });
  tl.setVar("wbActiveTooltip", "text");
  await tl.wait(1000);

  await tl.at(9800);
  await hoverOn(tl, "[data-tl=wb-tool-arrow]", { ms: 450 });
  tl.setVar("wbActiveTooltip", "arrow");
  await tl.wait(1000);

  await tl.at(11800);
  await hoverOn(tl, "[data-tl=wb-tool-diamond]", { ms: 450 });
  tl.setVar("wbActiveTooltip", "diamond");
  await tl.wait(1000);

  // Beat 5: Return to whiteboards
  await tl.at(13800);
  tl.setVar("wbActiveTooltip", null);
  tl.setVar("wbSelectedShapeId", null);
  tl.showCaption("Click Back to whiteboards to return to your board gallery.");
  await pressOn(tl, "[data-tl=wb-back-btn]", { ms: 550 });
  tl.setVar("projectsView", "whiteboards");
  await tl.wait(800);

  // Finish
  await tl.at(16200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
