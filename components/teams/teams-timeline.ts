import type { Timeline } from "@/lib/timeline";
import {
  INITIAL_MEET_LINKS,
  SECOND_MEET_LINK,
  type TeamsNav,
  type ChatFilterTab,
  type ChatSubTab,
  type MeetSubTab,
  type MeetLinkCard,
  type PeopleFilterTab,
  type ActivityFilterTab,
  type SettingsTab,
  type UserPresence,
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
  peopleFilterTab?: PeopleFilterTab;
  peopleSearchQuery?: string;
  isCalendarConnected?: boolean;
  calendarSelectedDay?: number;
  calendarMonth?: string;
  activityFilterTab?: ActivityFilterTab;
  settingsTab?: SettingsTab;
  presence?: UserPresence;
  isAvatarMenuOpen?: boolean;
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

  // --- PEOPLE VIEW VARS ---
  tl.setVar("teams:peopleFilterTab", opts.peopleFilterTab ?? "all");
  tl.setVar("teams:peopleSearchQuery", opts.peopleSearchQuery ?? "");
  tl.setVar("field:people-search-input", opts.peopleSearchQuery ?? "");
  tl.setVar("teams:peopleLoadedCount", 10);
  tl.setVar("teams:isPeopleLoading", false);
  tl.setVar("teams:hoveredPersonId", null);

  // --- CALENDAR VIEW VARS ---
  tl.setVar("teams:isCalendarConnected", opts.isCalendarConnected ?? false);
  tl.setVar("teams:calendarSelectedDay", opts.calendarSelectedDay ?? 17);
  tl.setVar("teams:calendarMonth", opts.calendarMonth ?? "November 2026");
  tl.setVar("teams:joinPressed", false);

  // --- ACTIVITY VIEW VARS ---
  tl.setVar("teams:activityFilterTab", opts.activityFilterTab ?? "all");
  tl.setVar("teams:isActivityLoading", false);
  tl.setVar("teams:hoveredCallId", null);

  // --- AVATAR & PRESENCE VARS ---
  tl.setVar("teams:isAvatarMenuOpen", opts.isAvatarMenuOpen ?? false);
  tl.setVar("teams:isPresenceOpen", false);
  tl.setVar("teams:presence", opts.presence ?? "available");

  // --- SETTINGS VIEW VARS ---
  tl.setVar("teams:settingsTab", opts.settingsTab ?? "profile");
  tl.setVar("teams:rememberMe", false);
  tl.setVar("teams:notifications", {
    email: true,
    push: true,
    sms: false,
  });
  tl.setVar("field:settings-first-name-input", "Jane");
  tl.setVar("field:settings-last-name-input", "Doe");
  tl.setVar("field:settings-phone-input", "");
  tl.setVar("field:settings-curr-password-input", "");
  tl.setVar("field:settings-new-password-input", "");
  tl.setVar("field:settings-confirm-password-input", "");

  // Toasts
  tl.setVar("teams:toasts", []);
}

export function finishTeams(tl: Timeline) {
  tl.wait(1500);
}
