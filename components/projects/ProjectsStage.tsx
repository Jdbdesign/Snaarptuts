"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ProjectsShell } from "./ProjectsShell";
import { ProjectsDashboardView } from "./ProjectsDashboardView";
import { ProjectsListView } from "./ProjectsListView";
import { ProjectsMembersView } from "./ProjectsMembersView";
import { ProjectsTasksView } from "./ProjectsTasksView";
import { ProjectsProjectDrawer } from "./ProjectsProjectDrawer";
import { ProjectsTemplateGalleryModal } from "./ProjectsTemplateGalleryModal";
import { ProjectsTaskDrawer } from "./ProjectsTaskDrawer";
import { ProjectsDeleteTaskModal } from "./ProjectsDeleteTaskModal";
import { ProjectsSprintsView } from "./ProjectsSprintsView";
import { ProjectsCreateGoalView } from "./ProjectsCreateGoalView";
import { ProjectsWhiteboardsView } from "./ProjectsWhiteboardsView";
import { ProjectsWhiteboardCanvas } from "./ProjectsWhiteboardCanvas";
import { ProjectsDocumentsView } from "./ProjectsDocumentsView";
import { ProjectsDocEditor } from "./ProjectsDocEditor";
import { ProjectsDocDialogs } from "./ProjectsDocDialogs";
import { ProjectsAutomationsView } from "./ProjectsAutomationsView";
import { ProjectsIntegrationsView } from "./ProjectsIntegrationsView";
import { ProjectsApiKeyDialog } from "./ProjectsApiKeyDialog";
import { ProjectsReportsView } from "./ProjectsReportsView";
import { ProjectsProfileView } from "./ProjectsProfileView";
import type { ProjectsView } from "./projects-data";

interface Props {
  tl: Timeline;
}

export function ProjectsStage({ tl }: Props) {
  const currentView = useTimelineVar<ProjectsView>(tl, "projectsView", "dashboard");
  const fade = useTimelineVar<boolean>(tl, "fade", false);

  return (
    <div
      data-tl="projects-stage-root"
      className={`relative w-full h-full transition-opacity duration-400 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <ProjectsShell
        tl={tl}
        overlay={
          <>
            <ProjectsProjectDrawer tl={tl} />
            <ProjectsTemplateGalleryModal tl={tl} />
            <ProjectsTaskDrawer tl={tl} />
            <ProjectsDeleteTaskModal tl={tl} />
            <ProjectsDocDialogs tl={tl} />
            <ProjectsApiKeyDialog tl={tl} />
          </>
        }
      >
        {currentView === "dashboard" && <ProjectsDashboardView tl={tl} />}
        {currentView === "projects" && <ProjectsListView tl={tl} />}
        {currentView === "members" && <ProjectsMembersView tl={tl} />}
        {currentView === "tasks" && <ProjectsTasksView tl={tl} />}
        {currentView === "sprints" && <ProjectsSprintsView tl={tl} />}
        {currentView === "goals-new" && <ProjectsCreateGoalView tl={tl} />}
        {currentView === "whiteboards" && <ProjectsWhiteboardsView tl={tl} />}
        {currentView === "whiteboard-canvas" && <ProjectsWhiteboardCanvas tl={tl} />}
        {currentView === "documents" && <ProjectsDocumentsView tl={tl} />}
        {currentView === "doc-editor" && <ProjectsDocEditor tl={tl} />}
        {currentView === "automations" && <ProjectsAutomationsView tl={tl} />}
        {currentView === "integration" && <ProjectsIntegrationsView tl={tl} />}
        {currentView === "reports" && <ProjectsReportsView tl={tl} />}
        {currentView === "profile" && <ProjectsProfileView tl={tl} />}
      </ProjectsShell>
    </div>
  );
}
