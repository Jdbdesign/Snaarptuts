import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  pressOn,
  pushProjectsToast,
  typeIntoVar,
} from "@/components/projects/projects-timeline";
import {
  PROJECTS_URLS,
  type DocumentItem,
} from "@/components/projects/projects-data";

export const STEP20_DURATION_MS = 17500;

export async function runStep20(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.documents, "documents", [0.45, 0.35], 20);

  // Beat 1: Click "+ New Document"
  await tl.at(400);
  tl.showCaption("Click New Document to create a team document.");
  await pressOn(tl, "[data-tl=new-doc-btn]", { ms: 600 });
  tl.setVar("isCreateDocModalOpen", true);
  await tl.wait(400);

  // Beat 2: Type title
  await tl.at(2200);
  tl.showCaption("Name your document Design Document.");
  await pressOn(tl, "[data-tl=create-doc-title-input]", { ms: 500 });
  await typeIntoVar(
    tl,
    "[data-tl=create-doc-title-input]",
    "newDocTitle",
    "Design Document",
    { msPerChar: 55 }
  );
  await tl.wait(500);

  // Beat 3: Click Create
  await tl.at(5000);
  tl.showCaption("Click Create to generate the document.");
  await pressOn(tl, "[data-tl=create-doc-submit-btn]", { ms: 500 });
  await tl.wait(700);

  // Beat 4: Click the document in the left tree
  await tl.at(7500);
  tl.showCaption("Click your new document in the left tree.");
  await pressOn(tl, "[data-tl=doc-editor-item-doc-design-document]", { ms: 550 });
  await tl.wait(600);

  // Beat 5: Back to documents gallery
  await tl.at(9600);
  tl.showCaption("Click the back arrow to return to the documents gallery.");
  await pressOn(tl, "[data-tl=doc-editor-back-btn]", { ms: 500 });
  tl.setUrl(PROJECTS_URLS.documents);
  tl.setVar("projectsView", "documents");
  await tl.wait(600);

  // Beat 6: Click Delete on Release checklist
  await tl.at(12000);
  tl.showCaption("Click Delete on Release checklist to remove outdated files.");
  await pressOn(tl, "[data-tl=doc-delete-btn-doc-release-checklist]", { ms: 550 });
  tl.setVar("deleteDocTarget", {
    id: "doc-release-checklist",
    title: "Release checklist",
    updatedDate: "10/22/2026",
  });
  tl.setVar("isDeleteDocModalOpen", true);
  await tl.wait(600);

  // Beat 7: Confirm deletion
  await tl.at(14500);
  tl.showCaption("Confirm deletion to remove the document.");
  await pressOn(tl, "[data-tl=delete-doc-confirm-btn]", { ms: 500 });
  const updatedDocs = tl.getVar<DocumentItem[]>("documentsList", []);
  tl.setVar(
    "documentsList",
    updatedDocs.filter((d) => d.id !== "doc-release-checklist")
  );
  tl.setVar("isDeleteDocModalOpen", false);
  pushProjectsToast(tl, "Document deleted", "success");

  await finishProjects(tl, STEP20_DURATION_MS);
}
