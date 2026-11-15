import { Step1 } from "@/scenes/projects/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/projects/step1/script";
import { Step2 } from "@/scenes/projects/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/projects/step2/script";
import { Step3 } from "@/scenes/projects/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/projects/step3/script";
import { Step4 } from "@/scenes/projects/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/projects/step4/script";
import { Step5 } from "@/scenes/projects/step5/Step5";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/projects/step5/script";
import { Step6 } from "@/scenes/projects/step6/Step6";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/projects/step6/script";
import { Step7 } from "@/scenes/projects/step7/Step7";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/projects/step7/script";
import { Step8 } from "@/scenes/projects/step8/Step8";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/projects/step8/script";
import { Step9 } from "@/scenes/projects/step9/Step9";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/projects/step9/script";
import { Step10 } from "@/scenes/projects/step10/Step10";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/projects/step10/script";
import { Step11 } from "@/scenes/projects/step11/Step11";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/projects/step11/script";
import { Step12 } from "@/scenes/projects/step12/Step12";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/projects/step12/script";
import { Step13 } from "@/scenes/projects/step13/Step13";
import { runStep13, STEP13_DURATION_MS } from "@/scenes/projects/step13/script";
import { Step14 } from "@/scenes/projects/step14/Step14";
import { runStep14, STEP14_DURATION_MS } from "@/scenes/projects/step14/script";
import { Step15 } from "@/scenes/projects/step15/Step15";
import { runStep15, STEP15_DURATION_MS } from "@/scenes/projects/step15/script";
import { Step16 } from "@/scenes/projects/step16/Step16";
import { runStep16, STEP16_DURATION_MS } from "@/scenes/projects/step16/script";
import { Step17 } from "@/scenes/projects/step17/Step17";
import { runStep17, STEP17_DURATION_MS } from "@/scenes/projects/step17/script";
import { Step18 } from "@/scenes/projects/step18/Step18";
import { runStep18, STEP18_DURATION_MS } from "@/scenes/projects/step18/script";

import { PROJECTS_URLS } from "@/components/projects/projects-data";
import type { Tutorial } from "./types";

export const projects: Tutorial = {
  product: {
    id: "projects",
    name: "Snaarp Projects",
    railLabel: "Projects",
    logo: "projects",
    aliases: ["projects", "snaarp-projects", "kanban", "project-management"],
  },
  steps: [
    {
      id: "projects-meet-projects",
      title: "Meet Snaarp Projects",
      url: PROJECTS_URLS.dashboard,
      scene: {
        Component: Step1,
        run: runStep1,
        durationMs: STEP1_DURATION_MS,
      },
    },
    {
      id: "projects-check-calendar",
      title: "Check the calendar",
      url: PROJECTS_URLS.dashboard,
      scene: {
        Component: Step2,
        run: runStep2,
        durationMs: STEP2_DURATION_MS,
      },
    },
    {
      id: "projects-browse-projects",
      title: "Browse and search your projects",
      url: PROJECTS_URLS.projects,
      scene: {
        Component: Step3,
        run: runStep3,
        durationMs: STEP3_DURATION_MS,
      },
    },
    {
      id: "projects-create-from-template",
      title: "Create a project from a template",
      url: PROJECTS_URLS.projects,
      scene: {
        Component: Step4,
        run: runStep4,
        durationMs: STEP4_DURATION_MS,
      },
    },
    {
      id: "projects-manage-team",
      title: "Manage the project team",
      url: PROJECTS_URLS.members,
      scene: {
        Component: Step5,
        run: runStep5,
        durationMs: STEP5_DURATION_MS,
      },
    },
    {
      id: "projects-open-tasks",
      title: "Open a project's tasks",
      url: PROJECTS_URLS.tasks,
      scene: {
        Component: Step6,
        run: runStep6,
        durationMs: STEP6_DURATION_MS,
      },
    },
    {
      id: "projects-add-task",
      title: "Add a task",
      url: PROJECTS_URLS.tasks,
      scene: {
        Component: Step7,
        run: runStep7,
        durationMs: STEP7_DURATION_MS,
      },
    },
    {
      id: "projects-update-task",
      title: "Update a task",
      url: PROJECTS_URLS.tasks,
      scene: {
        Component: Step8,
        run: runStep8,
        durationMs: STEP8_DURATION_MS,
      },
    },
    {
      id: "projects-archive-or-delete-task",
      title: "Archive or delete a task",
      url: PROJECTS_URLS.tasks,
      scene: {
        Component: Step9,
        run: runStep9,
        durationMs: STEP9_DURATION_MS,
      },
    },
    {
      id: "projects-explore-sprints",
      title: "Explore Sprints",
      url: PROJECTS_URLS.sprints,
      scene: {
        Component: Step10,
        run: runStep10,
        durationMs: STEP10_DURATION_MS,
      },
    },
    {
      id: "projects-create-sprint",
      title: "Create a sprint",
      url: PROJECTS_URLS.sprints,
      scene: {
        Component: Step11,
        run: runStep11,
        durationMs: STEP11_DURATION_MS,
      },
    },
    {
      id: "projects-move-sprint-board-filter",
      title: "Move a sprint on the board and filter",
      url: PROJECTS_URLS.sprints,
      scene: {
        Component: Step12,
        run: runStep12,
        durationMs: STEP12_DURATION_MS,
      },
    },
    {
      id: "projects-set-goal",
      title: "Set a goal",
      url: PROJECTS_URLS.sprints,
      scene: {
        Component: Step13,
        run: runStep13,
        durationMs: STEP13_DURATION_MS,
      },
    },
    {
      id: "projects-log-time",
      title: "Log your time",
      url: PROJECTS_URLS.sprints,
      scene: {
        Component: Step14,
        run: runStep14,
        durationMs: STEP14_DURATION_MS,
      },
    },
    {
      id: "projects-task-views",
      title: "See tasks as a board, timeline or calendar",
      url: PROJECTS_URLS.tasks,
      scene: {
        Component: Step15,
        run: runStep15,
        durationMs: STEP15_DURATION_MS,
      },
    },
    {
      id: "projects-open-whiteboards",
      title: "Open your whiteboards",
      url: PROJECTS_URLS.whiteboards,
      scene: {
        Component: Step16,
        run: runStep16,
        durationMs: STEP16_DURATION_MS,
      },
    },
    {
      id: "projects-draw-flow-whiteboard",
      title: "Draw a flow on a new whiteboard",
      url: PROJECTS_URLS.whiteboards,
      scene: {
        Component: Step17,
        run: runStep17,
        durationMs: STEP17_DURATION_MS,
      },
    },
    {
      id: "projects-delete-whiteboard",
      title: "Delete a whiteboard",
      url: PROJECTS_URLS.whiteboards,
      scene: {
        Component: Step18,
        run: runStep18,
        durationMs: STEP18_DURATION_MS,
      },
    },
  ],
  groups: [
    { title: "Overview", from: "projects-meet-projects" },
    { title: "Projects", from: "projects-browse-projects" },
    { title: "Tasks", from: "projects-open-tasks" },
    { title: "Sprints", from: "projects-explore-sprints" },
    { title: "Goals and time", from: "projects-set-goal" },
    { title: "Task views", from: "projects-task-views" },
    { title: "Whiteboards", from: "projects-open-whiteboards" },
  ],
  completion: {
    title: "Tour complete",
    text: "You can now track projects across your workspace, manage sprints and goals, log timesheets, switch between task backlogs, boards, and timelines, and create interactive whiteboard diagrams.",
    replayLabel: "Replay tour",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
