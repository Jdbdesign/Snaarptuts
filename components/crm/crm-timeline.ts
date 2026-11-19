import type { Timeline } from "@/lib/timeline";
import type { CrmNavId } from "./CrmShell";
import {
  INITIAL_DASHBOARDS,
  type CrmDashboardItem,
  type TargetItem,
  type ClosedDealItem,
  type CrmTaskItem,
  type CrmCalendarEvent,
  INITIAL_TARGETS,
  WON_DEALS_INITIAL,
  LOST_DEALS_INITIAL,
  INITIAL_TASKS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_DIRECTORY_CONTACTS,
  type CrmDirectoryContact,
  type CrmCompanyInfo,
  ACME_STUDIO_COMPANY,
} from "./crm-data";

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
  // Part 3 additions
  activitiesOpen?: boolean;
  forecastTab?: 'pipeline' | 'by-rep' | 'targets' | 'risk';
  isNewTargetOpen?: boolean;
  targets?: TargetItem[];
  hasCreatedTarget?: boolean;
  wonDealsViewMode?: 'list' | 'grid';
  lostDealsViewMode?: 'list' | 'grid';
  isStatusDropdownOpen?: boolean;
  wonDeals?: ClosedDealItem[];
  lostDeals?: ClosedDealItem[];
  tasksViewMode?: 'board' | 'list';
  isAddTaskInlineOpen?: boolean;
  tasks?: CrmTaskItem[];
  selectedTaskId?: string | null;
  selectedCalendarDay?: number | null;
  calTaskDone?: boolean;
  calendarEvents?: CrmCalendarEvent[];
  // Part 4 additions
  isCallerIdOpen?: boolean;
  isVoicemailModalOpen?: boolean;
  isRingStrategyModalOpen?: boolean;
  isBusinessHoursModalOpen?: boolean;
  isCallingProvidersOpen?: boolean;
  phoneCenterSubtab?: 'keypad' | 'recent' | 'favorites';
  contactsOpen?: boolean;
  directoryContacts?: CrmDirectoryContact[];
  isStatusFilterOpen?: boolean;
  selectedStatusFilter?: string;
  isAddContactDrawerOpen?: boolean;
  contactProfileTab?: 'timeline' | 'comments' | 'history' | 'details';
  companyInfo?: CrmCompanyInfo;
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

  // Part 3 variables
  tl.setVar("crm:activitiesOpen", opts.activitiesOpen ?? false);
  tl.setVar("crm:forecastTab", opts.forecastTab ?? "pipeline");
  tl.setVar("crm:isNewTargetOpen", opts.isNewTargetOpen ?? false);
  tl.setVar("crm:targets", opts.targets ?? (opts.hasCreatedTarget ? INITIAL_TARGETS : []));
  tl.setVar("crm:wonDealsViewMode", opts.wonDealsViewMode ?? "list");
  tl.setVar("crm:lostDealsViewMode", opts.lostDealsViewMode ?? "grid");
  tl.setVar("crm:isStatusDropdownOpen", opts.isStatusDropdownOpen ?? false);
  tl.setVar("crm:wonDeals", opts.wonDeals ?? WON_DEALS_INITIAL);
  tl.setVar("crm:lostDeals", opts.lostDeals ?? LOST_DEALS_INITIAL);
  tl.setVar("crm:tasksViewMode", opts.tasksViewMode ?? "board");
  tl.setVar("crm:isAddTaskInlineOpen", opts.isAddTaskInlineOpen ?? false);
  tl.setVar("crm:tasks", opts.tasks ?? INITIAL_TASKS);
  tl.setVar("crm:selectedTaskId", opts.selectedTaskId ?? null);
  tl.setVar("crm:selectedCalendarDay", opts.selectedCalendarDay ?? null);
  tl.setVar("crm:calTaskDone", opts.calTaskDone ?? false);
  tl.setVar("crm:calendarEvents", opts.calendarEvents ?? INITIAL_CALENDAR_EVENTS);

  // Part 4 variables
  tl.setVar("crm:isCallerIdOpen", opts.isCallerIdOpen ?? false);
  tl.setVar("crm:isVoicemailModalOpen", opts.isVoicemailModalOpen ?? false);
  tl.setVar("crm:isRingStrategyModalOpen", opts.isRingStrategyModalOpen ?? false);
  tl.setVar("crm:isBusinessHoursModalOpen", opts.isBusinessHoursModalOpen ?? false);
  tl.setVar("crm:isCallingProvidersOpen", opts.isCallingProvidersOpen ?? false);
  tl.setVar("crm:phoneCenterSubtab", opts.phoneCenterSubtab ?? "keypad");
  tl.setVar("crm:contactsOpen", opts.contactsOpen ?? false);
  tl.setVar("crm:directoryContacts", opts.directoryContacts ?? INITIAL_DIRECTORY_CONTACTS);
  tl.setVar("crm:isStatusFilterOpen", opts.isStatusFilterOpen ?? false);
  tl.setVar("crm:selectedStatusFilter", opts.selectedStatusFilter ?? "All statuses");
  tl.setVar("crm:isAddContactDrawerOpen", opts.isAddContactDrawerOpen ?? false);
  tl.setVar("crm:contactProfileTab", opts.contactProfileTab ?? "timeline");
  tl.setVar("crm:companyInfo", opts.companyInfo ?? ACME_STUDIO_COMPANY);
}

export async function finishCrm(tl: Timeline) {
  await tl.wait(1500);
}
