import { CancelledError, type Timeline } from "@/lib/timeline";
import {
  PROJECTS_URLS,
  type ProjectsView,
  INITIAL_PROJECTS,
  INITIAL_MEMBERS,
  INITIAL_TASKS,
  NEW_TASK_DATA,
  CREATED_SPRINT_DATA,
  CREATED_GOAL_DATA,
  INITIAL_WHITEBOARDS,
  NEW_WHITEBOARD_DATA,
  ALL_PROJECT_NAMES,
  type TeamMember,
  type TaskItem,
  type SprintItem,
  type GoalItem,
  type TimeEntryItem,
  type WhiteboardItem,
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
  // Step 15 stands alone with all 6 tasks (none in progress)
  const initialTasksCopy: TaskItem[] =
    stepNum === 15
      ? [...INITIAL_TASKS.map((t) => ({ ...t })), { ...NEW_TASK_DATA, status: "To Do" as const }]
      : INITIAL_TASKS.map((t) => ({ ...t }));
  tl.setVar("tasksList", initialTasksCopy);
  tl.setVar("isAddTaskDrawerOpen", false);
  tl.setVar("selectedTaskId", null);
  tl.setVar("isTaskDrawerOpen", false);
  tl.setVar("isDeleteTaskModalOpen", false);
  tl.setVar("activeTaskTab", "tasks"); // "tasks" | "issues" | "bugs"
  tl.setVar("activeTaskSubTab", "list"); // "list" | "board" | "gantt" | "calendar"
  tl.setVar("isTaskProjectDropdownOpen", false);

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

  // ==========================================
  // Part 2: Sprints, Goals, Time, Whiteboards
  // ==========================================

  // Sprints state
  let sprintsInit: SprintItem[] = [];
  if (stepNum === 12) {
    sprintsInit = [{ ...CREATED_SPRINT_DATA, status: "Planning" }];
  } else if (stepNum && stepNum > 12) {
    sprintsInit = [{ ...CREATED_SPRINT_DATA, status: "Completed" }];
  }
  tl.setVar("sprintsList", sprintsInit);
  tl.setVar(
    "sprintsActiveTab",
    stepNum === 13 ? "goals" : stepNum === 14 ? "time" : "sprints"
  ); // "sprints" | "calendar" | "goals" | "time"
  tl.setVar("sprintsViewMode", "list"); // "list" | "board"
  tl.setVar("sprintsFilter", "All"); // "All" | "Active" | "Planning" | "Completed" | "Cancelled"
  tl.setVar("isNewSprintModalOpen", false);
  tl.setVar("isSprintFilterOpen", false);
  tl.setVar("sprintFilterStatus", ["Active", "Planning", "Completed", "Cancelled"]);
  tl.setVar("sprintFilterProjects", [...ALL_PROJECT_NAMES]);
  tl.setVar("hoverCalendarChip", false);

  // New Sprint form state
  tl.setVar("newSprintName", "");
  tl.setVar("newSprintGoal", "");
  tl.setVar("newSprintStartDate", "2026-11-16");
  tl.setVar("newSprintEndDate", "2026-11-18");
  tl.setVar("newSprintCapacity", "");
  tl.setVar("newSprintProject", "Explore Snaarp Projects!");
  tl.setVar("isSprintStartDatePickerOpen", false);
  tl.setVar("isSprintEndDatePickerOpen", false);

  // Goals state
  let goalsInit: GoalItem[] = [];
  if (stepNum && stepNum > 13) {
    goalsInit = [{ ...CREATED_GOAL_DATA }];
  }
  tl.setVar("goalsList", goalsInit);
  tl.setVar("goalViewMode", "list"); // "list" | "hierarchy"
  tl.setVar("goalName", "");
  tl.setVar("goalDescription", "");
  tl.setVar("goalTargetType", "Number"); // "Number" | "Percentage" | "Currency"
  tl.setVar("goalTargetValue", "");
  tl.setVar("goalDueDate", "");
  tl.setVar("isGoalDatePickerOpen", false);

  // Time Tracking state
  let timeEntriesInit: TimeEntryItem[] = [];
  if (stepNum && stepNum > 14) {
    timeEntriesInit = [{
      id: "time-1",
      taskName: "Set up task statuses",
      userEmail: "jane@example.com",
      durationMinutes: 40,
      date: "2026-11-15",
      description: "Set up the status workflow",
    }];
  }
  tl.setVar("timeEntriesList", timeEntriesInit);
  tl.setVar("viewingUser", "jane@example.com");
  tl.setVar("isViewingDropdownOpen", false);
  tl.setVar("isLogTimeModalOpen", false);
  tl.setVar("logTimeTask", "Set up task statuses");
  tl.setVar("logTimeDuration", "");
  tl.setVar("logTimeDate", "2026-11-15");
  tl.setVar("logTimeDescription", "");
  tl.setVar("isLogTimeDatePickerOpen", false);
  tl.setVar("isLogTimeTaskSelectOpen", false);

  // Whiteboards state
  let whiteboardsInit: WhiteboardItem[] = [];
  if (stepNum === 18) {
    whiteboardsInit = [NEW_WHITEBOARD_DATA, ...INITIAL_WHITEBOARDS];
  } else {
    whiteboardsInit = [...INITIAL_WHITEBOARDS];
  }
  tl.setVar("whiteboardsList", whiteboardsInit);
  tl.setVar("activeWhiteboardId", null);
  tl.setVar("isNewWhiteboardModalOpen", false);
  tl.setVar("newWhiteboardTitle", "");
  tl.setVar("isDeleteWhiteboardModalOpen", false);
  tl.setVar("deleteTargetWhiteboardId", null);

  // Whiteboard Canvas Editor state
  tl.setVar("wbActiveTool", "select");
  tl.setVar("wbActiveTooltip", null as string | null);
  tl.setVar("wbSelectedShapeId", null as string | null);
  tl.setVar("wbShapes", [] as unknown[]);
  tl.setVar("wbDragPos", null as { x: number; y: number } | null);
  tl.setVar("wbTextEditing", false);
  tl.setVar("wbTextValue", "");
}
