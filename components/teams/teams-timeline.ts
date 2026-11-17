import type { Timeline } from "@/lib/timeline";
import {
  INITIAL_MEET_LINKS,
  SECOND_MEET_LINK,
  type TeamsNav,
  type ChatFilterTab,
  type ChatSubTab,
  type MeetSubTab,
  type MeetLinkCard,
} from "./teams-data";

export interface TeamsToast {
  id: string;
  message: string;
  type?: "success" | "info" | "error";
}

let toastCounter = 0;

export function pushTeamsToast(
  tl: Timeline,
  message: string,
  type: "success" | "info" | "error" = "success"
) {
  toastCounter += 1;
  const newToast: TeamsToast = {
    id: `toast-${toastCounter}`,
    message,
    type,
  };
  const current = tl.getVar<TeamsToast[]>("teams:toasts", []);
  tl.setVar("teams:toasts", [...current, newToast]);
}

export interface BeginTeamsOptions {
  activeNav?: TeamsNav;
  activeChatId?: string;
  filterTab?: ChatFilterTab;
  chatSubTab?: ChatSubTab;
  meetTab?: MeetSubTab;
  groupTitle?: string;
  isDark?: boolean;
  hasSecondMeetLink?: boolean;
}

export function beginTeams(
  tl: Timeline,
  stepId: string,
  opts: BeginTeamsOptions = {}
) {
  // Mandatory: place cursor at clean initial spot
  tl.placeCursor(0.2, 0.15);

  // Set default / step-specific variables
  tl.setVar("teams:activeNav", opts.activeNav ?? "chat");
  tl.setVar("teams:activeChatId", opts.activeChatId ?? "sam-taylor");
  tl.setVar("teams:filterTab", opts.filterTab ?? "all");
  tl.setVar("teams:chatSubTab", opts.chatSubTab ?? "chat");
  tl.setVar("teams:meetTab", opts.meetTab ?? "links");

  // Search & filter states
  tl.setVar("teams:isListSearchOpen", false);
  tl.setVar("teams:listSearchQuery", "");

  // Row menu & pinning
  tl.setVar("teams:isRowMenuOpen", false);
  tl.setVar("teams:isPinnedSam", false);
  tl.setVar("teams:isPinnedGroup", false);

  // Modals & views
  tl.setVar("teams:isMeetingDialogOpen", false);
  tl.setVar("teams:isPrejoinOpen", false);
  tl.setVar("teams:prejoinCamOff", false);
  tl.setVar("teams:prejoinMicOff", false);

  // Call overlay
  tl.setVar("teams:isCallOpen", false);

  // Group chat dialog
  tl.setVar("teams:isGroupDialogOpen", false);
  tl.setVar("teams:groupSelectedUsers", ["u-sam"]);
  tl.setVar("teams:groupSearchQuery", "");
  tl.setVar("teams:createdNewGroup", false);

  // Group view extras
  tl.setVar("teams:isMembersPopoverOpen", false);
  tl.setVar("teams:isFindInChatOpen", false);
  tl.setVar("teams:findInChatQuery", "");
  tl.setVar("teams:hasFirstReaction", false);
  tl.setVar("teams:hoveredMessageId", null);

  // Rename group
  tl.setVar("teams:isRenameDialogOpen", false);
  tl.setVar(
    "teams:groupTitle",
    opts.groupTitle ?? "Acme Product & Tech Team"
  );

  // Theme
  tl.setVar("teams:isDark", opts.isDark ?? false);

  // Meet view
  const links: MeetLinkCard[] = opts.hasSecondMeetLink
    ? [...INITIAL_MEET_LINKS, SECOND_MEET_LINK]
    : [...INITIAL_MEET_LINKS];
  tl.setVar("teams:meetLinks", links);
  tl.setVar("teams:callsSearchQuery", "");

  // Join by ID dialog
  tl.setVar("teams:isJoinIdDialogOpen", false);
  tl.setVar("teams:joinIdQuery", "");

  // Toasts
  tl.setVar("teams:toasts", []);
}

export function finishTeams(tl: Timeline) {
  tl.wait(1500);
}
