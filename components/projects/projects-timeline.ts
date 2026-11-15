import { CancelledError, type Timeline } from "@/lib/timeline";
import {
  PROJECTS_URLS,
  type ProjectsView,
  INITIAL_PROJECTS,
  INITIAL_MEMBERS,
  INITIAL_TASKS,
  type TeamMember,
  type TaskItem,
} from "./projects-data";

export const PROJECTS_END_HOLD_MS = 1500;
export const PROJECTS_FADE_MS = 400;

/** Move onto an element, ring it, click it and clear the ring. */
export async function pressOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number; ring?: boolean } = {}
) {
  if (tl.getVar<boolean>("__projectsStepEnded", false)) return;
  try {
    await tl.moveCursorTo(sel, { ms: opts.ms ?? 650, dx: opts.dx, dy: opts.dy });
    if (opts.ring !== false) tl.highlight(sel);
    await tl.wait(150);
    await tl.click(sel);
    tl.clearHighlight();
  } catch (err: unknown) {
    if (err instanceof CancelledError) throw err;
    const sceneId = tl.getVar<string>("__sceneId", "projects-step");
    console.error(
      `[Projects Safety Net]: target "${sel}" not found in ${sceneId}. Ending step gracefully.`
    );
    tl.setVar("__projectsStepEnded", true);
    tl.hideCaption();
    tl.clearHighlight();
    tl.setVar("fade", true);
  }
}

/**
 * Types text character by character into a timeline variable while focused on sel.
 */
export async function typeIntoVar(
  tl: Timeline,
  sel: string,
  varName: string,
  text: string,
  opts: { msPerChar?: number } = {}
) {
  if (tl.getVar<boolean>("__projectsStepEnded", false)) return;
  const { msPerChar = 45 } = opts;
  tl.highlight(sel);
  for (let i = 1; i <= text.length; i++) {
    if (tl.getVar<boolean>("__projectsStepEnded", false)) break;
    tl.setVar(varName, text.slice(0, i));
    await tl.wait(msPerChar);
  }
  tl.setVar(varName, text);
  await tl.wait(100);
  tl.clearHighlight();
}

/** Move onto an element and hover it, without clicking. */
export async function hoverOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number; ring?: boolean } = {}
) {
  if (tl.getVar<boolean>("__projectsStepEnded", false)) return;
  try {
    await tl.moveCursorTo(sel, { ms: opts.ms ?? 600, dx: opts.dx, dy: opts.dy });
    if (opts.ring !== false) tl.highlight(sel);
  } catch (err: unknown) {
    if (err instanceof CancelledError) throw err;
  }
}

/** Smoothly scroll an element with data-tl */
export async function scrollView(
  tl: Timeline,
  sel: string,
  scrollTop: number,
  ms = 600
) {
  if (tl.getVar<boolean>("__projectsStepEnded", false)) return;
  try {
    await tl.scrollPanelTo(sel, scrollTop, ms);
  } catch (err: unknown) {
    if (err instanceof CancelledError) throw err;
  }
}

/** Push an in-app toast notification. */
export function pushProjectsToast(
  tl: Timeline,
  message: string,
  type: "success" | "info" | "error" = "success"
) {
  tl.setVar("projectsToast", { message, type, id: Date.now() });
}

/** The clean step ending with hold and fade. */
export async function finishProjects(
  tl: Timeline,
  _totalDurationMs?: number,
  holdMs = PROJECTS_END_HOLD_MS
) {
  if (holdMs > 0) {
    await tl.wait(holdMs);
  }
  tl.setVar("fade", true);
  await tl.wait(PROJECTS_FADE_MS);
}

/**
 * Resets Projects scene variables to a clean starting state for any step.
 * Crucial: Always calls tl.placeCursor(...) first so the pointer is visible
 * from the very first frame before any caption or animation begins.
 */
export function beginProjects(
  tl: Timeline,
  url: string = PROJECTS_URLS.dashboard,
  page: ProjectsView = "dashboard",
  cursor: [number, number] = [0.45, 0.35],
  stepNum?: number
) {
  tl.placeCursor(cursor[0], cursor[1]);
  tl.setUrl(url);
  tl.setVar("projectsView", page);
  tl.setVar("fade", false);
  tl.setVar("__projectsStepEnded", false);
  if (stepNum) tl.setVar("__sceneId", `projects-step${stepNum}`);

  // Base state
  tl.setVar("projectsCalendarMode", "month"); // "month" | "year"
  tl.setVar("projectsToast", null);

  // Projects list state
  // In step 4 onwards, newly created project is present
  const hasTemplateProject = stepNum && stepNum >= 4;
  tl.setVar("projectsList", hasTemplateProject ? [
    ...INITIAL_PROJECTS,
  ] : INITIAL_PROJECTS);
  tl.setVar("hasCreatedProject", hasTemplateProject);

  // Project drawer
  tl.setVar("selectedProjectId", stepNum === 3 ? "p1" : null);
  tl.setVar("isProjectDrawerOpen", stepNum === 3);

  // Template modal
  tl.setVar("isTemplateModalOpen", false);
  tl.setVar("templateModalStep", "gallery"); // "gallery" | "form"
  tl.setVar("templateCategory", "All");
  tl.setVar("formClient", "");
  tl.setVar("formCategory", "Development");
  tl.setVar("formStartDate", "2026-11-16");
  tl.setVar("formEndDate", "2026-12-19");
  tl.setVar("formLead", "Jane Doe");
  tl.setVar("formPriority", "High");

  // Members state
  const membersCopy: TeamMember[] = INITIAL_MEMBERS.map((m) =>
    m.id === "m2" && stepNum && stepNum >= 6 ? { ...m, role: "Admin" } : { ...m }
  );
  tl.setVar("projectsMembers", membersCopy);

  // Tasks state
  // Step 6 has initial 5 tasks
  // Step 7 adds task 6
  // Step 8 has task 6 with comments/description
  // Step 9 archives task 6 (so 5 left), then deletes task 5 (so 4 left)
  const initialTasksCopy: TaskItem[] = INITIAL_TASKS.map((t) => ({ ...t }));
  tl.setVar("tasksList", initialTasksCopy);
  tl.setVar("isAddTaskDrawerOpen", false);
  tl.setVar("selectedTaskId", null);
  tl.setVar("isTaskDrawerOpen", false);
  tl.setVar("isDeleteTaskModalOpen", false);
  tl.setVar("activeTaskTab", "tasks"); // "tasks" | "issues" | "bugs"
  tl.setVar("activeTaskSubTab", "list"); // "list" | "board" | "gantt" | "calendar"

  // Add Task form state
  tl.setVar("newTaskTitle", "");
  tl.setVar("newTaskAssignees", [] as string[]);
  tl.setVar("newTaskDueDate", "");
  tl.setVar("newTaskPriority", "Normal");
  tl.setVar("newTaskSubtasks", [] as { id: string; title: string; completed: boolean }[]);
  tl.setVar("subtaskInputText", "");

  // Task Details Drawer state
  tl.setVar("taskDrawerDescription", "");
  tl.setVar("commentInputText", "");
  tl.setVar("taskRowMenuId", null);
}
