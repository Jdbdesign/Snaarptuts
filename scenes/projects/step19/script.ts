import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
  pushProjectsToast,
  typeIntoVar,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP19_DURATION_MS = 25500;

export async function runStep19(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.whiteboards, "whiteboards", [0.12, 0.40], 19);

  // Beat 1: Click Docs in the sidebar
  await tl.at(400);
  tl.showCaption("Click Docs in the sidebar to open team documents.");
  await pressOn(tl, "[data-tl=nav-docs]", { ms: 600 });
  tl.setUrl(PROJECTS_URLS.documents);
  tl.setVar("projectsView", "documents");
  await tl.wait(500);

  // Beat 2: Search documents
  await tl.at(2500);
  tl.showCaption("Search documents to filter your team notes and project briefs.");
  await pressOn(tl, "[data-tl=docs-search-input]", { ms: 550 });
  await typeIntoVar(tl, "[data-tl=docs-search-input]", "docsSearchQuery", "notes", { msPerChar: 60 });
  await tl.wait(800);
  tl.setVar("docsSearchQuery", "");
  await tl.wait(400);

  // Beat 3: Click Product design to open editor
  await tl.at(5800);
  tl.showCaption("Click Product design to open the rich document editor.");
  await pressOn(tl, "[data-tl=doc-card-doc-product-design]", { ms: 600 });
  tl.setUrl(PROJECTS_URLS.docEditor);
  tl.setVar("projectsView", "doc-editor");
  await tl.wait(600);

  // Beat 4: Hover toolbar buttons
  await tl.at(8200);
  tl.showCaption("Hover toolbar buttons to discover text formatting and alignment options.");
  await hoverOn(tl, "[data-tl=doc-tool-bold]", { ms: 500 });
  tl.setVar("docActiveTooltip", "Bold");
  await tl.wait(700);

  await tl.at(10000);
  await hoverOn(tl, "[data-tl=doc-tool-italic]", { ms: 450 });
  tl.setVar("docActiveTooltip", "Italic");
  await tl.wait(700);
  tl.setVar("docActiveTooltip", null);

  // Beat 5: Click canvas and type text
  await tl.at(12200);
  tl.showCaption("Click the canvas and draft document principles.");
  await pressOn(tl, "[data-tl=doc-editor-canvas]", { ms: 500 });
  await typeIntoVar(
    tl,
    "[data-tl=doc-editor-canvas]",
    "docEditorContent",
    "Product design principles",
    { msPerChar: 45 }
  );
  await tl.wait(600);

  // Beat 6: Select text line and apply bold + underline
  await tl.at(15200);
  tl.showCaption("Select the text line and apply bold styling.");
  await pressOn(tl, "[data-tl=doc-editor-text-line]", { ms: 450 });
  tl.setVar("docTextSelected", true);
  await tl.wait(500);

  await tl.at(16800);
  await pressOn(tl, "[data-tl=doc-tool-bold]", { ms: 450 });
  tl.setVar("docTextBold", true);
  await tl.wait(400);

  await tl.at(18200);
  await pressOn(tl, "[data-tl=doc-tool-underline]", { ms: 450 });
  tl.setVar("docTextUnderline", true);
  await tl.wait(400);
  tl.setVar("docTextSelected", false);

  // Beat 7: Click Export
  await tl.at(19800);
  tl.showCaption("Click Export to save the document.");
  await pressOn(tl, "[data-tl=doc-editor-export-btn]", { ms: 500 });
  pushProjectsToast(tl, "Document exported", "success");
  await tl.wait(700);

  // Beat 8: Open History
  await tl.at(21800);
  tl.showCaption("Open History to inspect document revisions.");
  await pressOn(tl, "[data-tl=doc-editor-history-btn]", { ms: 500 });
  tl.setVar("isDocHistoryOpen", true);
  await tl.wait(800);

  await tl.at(23400);
  await pressOn(tl, "[data-tl=doc-history-close-btn]", { ms: 450 });
  tl.setVar("isDocHistoryOpen", false);
  await tl.wait(400);

  // Beat 9: Back button
  await tl.at(24500);
  tl.showCaption("Click the back arrow to return to your documents.");
  await pressOn(tl, "[data-tl=doc-editor-back-btn]", { ms: 450 });
  tl.setUrl(PROJECTS_URLS.documents);
  tl.setVar("projectsView", "documents");

  await finishProjects(tl, STEP19_DURATION_MS);
}
