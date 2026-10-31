import type { Timeline } from "@/lib/timeline";
import { URLS, type MySpaceSubId } from "./workforce-data";
import type { WorkforcePage } from "./WorkforceStage";

/**
 * Resets Workforce scene variables to a clean starting state for any step.
 */
export function beginWorkforce(
  tl: Timeline,
  url: string = URLS.dashboard,
  page: WorkforcePage = "dashboard",
  subpage: MySpaceSubId = "overview"
) {
  tl.setUrl(url);
  tl.setVar("wfPage", page);
  tl.setVar("wfSubpage", subpage);
  tl.setVar("wfSidebarCollapsed", false);
  tl.setVar("wfMySpaceExpanded", page !== "dashboard");
  tl.setVar("wfOpenPopover", null);
  tl.setVar("wfUnreadCount", 1);
  tl.setVar("wfActiveTaskTab", "tasks");
  tl.setVar("wfActiveActivityTab", "activities");
  tl.setVar("wfCheckedIn", true);
  tl.setVar("wfOnboardingStatus", "Active");
  tl.setVar("wfActiveRecordTab", "overview");
}

export async function openNotifications(tl: Timeline) {
  await tl.moveCursorTo("[data-tl=top-bell]", { ms: 600 });
  await tl.click("[data-tl=top-bell]");
  tl.setVar("wfOpenPopover", "notifications");
  await tl.wait(100);
}

export async function closePopovers(tl: Timeline) {
  tl.setVar("wfOpenPopover", null);
  await tl.wait(50);
}
