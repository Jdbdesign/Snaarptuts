import type { Timeline } from "@/lib/timeline";
import type { CrmNavId } from "./CrmShell";
import { INITIAL_DASHBOARDS, type CrmDashboardItem } from "./crm-data";

export interface CrmToast {
  id: string;
  message: string;
}

let toastCounter = 0;

export function pushCrmToast(tl: Timeline, message: string) {
  toastCounter += 1;
  const toast: CrmToast = {
    id: `crm-toast-${toastCounter}`,
    message,
  };
  tl.setVar("crm:toast", toast);
}

export async function pressOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number; ring?: boolean } = {}
) {
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 650, dx: opts.dx, dy: opts.dy });
  if (opts.ring !== false) tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
}

export async function hoverOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number } = {}
) {
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 500, dx: opts.dx, dy: opts.dy });
  tl.hover(sel);
}

export interface BeginCrmOptions {
  activeNav?: CrmNavId;
  activeDashboardId?: string;
  dashboards?: CrmDashboardItem[];
  customDashboardWidgets?: string[];
  isCustomSaved?: boolean;
  isNewModalOpen?: boolean;
  isAddWidgetsOpen?: boolean;
  selectedWidgets?: string[];
  isShareModalOpen?: boolean;
  isTvMode?: boolean;
  prospectsViewMode?: 'kanban' | 'list' | 'grid';
  isSortOpen?: boolean;
  sortOption?: string;
  salesOpen?: boolean;
  // Part 2 additions
  isImportOpen?: boolean;
  importStage?: 'upload' | 'map' | 'review' | 'complete';
  hasImported?: boolean;
  callsTab?: 'phone' | 'sms' | 'numbers';
  isAddContactOpen?: boolean;
  editValueProspectId?: string | null;
  addTaskProspectId?: string | null;
  isTaskReminderOpen?: boolean;
  isAddCommentOpen?: boolean;
  isViewCommentsOpen?: boolean;
  isEditClientOpen?: boolean;
  isCloseWonOpen?: boolean;
  activeProspectMenuId?: string | null;
}

export function beginCrm(
  tl: Timeline,
  _stepId?: string,
  opts: BeginCrmOptions = {}
) {
  // Mandatory: place cursor at clean initial spot
  tl.placeCursor(100, 100);

  // Set default / step-specific variables
  tl.setVar("crm:activeNav", opts.activeNav ?? "home");
  tl.setVar("crm:activeDashboardId", opts.activeDashboardId ?? "pr-sales");
  tl.setVar("crm:dashboards", opts.dashboards ?? INITIAL_DASHBOARDS);
  tl.setVar("crm:customDashboardWidgets", opts.customDashboardWidgets ?? []);
  tl.setVar("crm:isCustomSaved", opts.isCustomSaved ?? false);
  tl.setVar("crm:isNewModalOpen", opts.isNewModalOpen ?? false);
  tl.setVar("crm:isAddWidgetsOpen", opts.isAddWidgetsOpen ?? false);
  tl.setVar("crm:selectedWidgets", opts.selectedWidgets ?? []);
  tl.setVar("crm:isShareModalOpen", opts.isShareModalOpen ?? false);
  tl.setVar("crm:isTvMode", opts.isTvMode ?? false);
  tl.setVar("crm:prospectsViewMode", opts.prospectsViewMode ?? "kanban");
  tl.setVar("crm:isSortOpen", opts.isSortOpen ?? false);
  tl.setVar("crm:sortOption", opts.sortOption ?? "Most recent");
  tl.setVar("crm:salesOpen", opts.salesOpen ?? true);
  tl.setVar("crm:toast", null);

  // Part 2 variables
  tl.setVar("crm:isImportOpen", opts.isImportOpen ?? false);
  tl.setVar("crm:importStage", opts.importStage ?? "upload");
  tl.setVar("crm:hasImported", opts.hasImported ?? false);
  tl.setVar("crm:callsTab", opts.callsTab ?? "phone");
  tl.setVar("crm:isAddContactOpen", opts.isAddContactOpen ?? false);
  tl.setVar("crm:editValueProspectId", opts.editValueProspectId ?? null);
  tl.setVar("crm:addTaskProspectId", opts.addTaskProspectId ?? null);
  tl.setVar("crm:isTaskReminderOpen", opts.isTaskReminderOpen ?? false);
  tl.setVar("crm:isAddCommentOpen", opts.isAddCommentOpen ?? false);
  tl.setVar("crm:isViewCommentsOpen", opts.isViewCommentsOpen ?? false);
  tl.setVar("crm:isEditClientOpen", opts.isEditClientOpen ?? false);
  tl.setVar("crm:isCloseWonOpen", opts.isCloseWonOpen ?? false);
  tl.setVar("crm:activeProspectMenuId", opts.activeProspectMenuId ?? null);
}

export async function finishCrm(tl: Timeline) {
  await tl.wait(1500);
}
