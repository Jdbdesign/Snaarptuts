"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { CheckCircle2 } from "lucide-react";
import { TeamsShell } from "./TeamsShell";
import { TeamsChatView } from "./TeamsChatView";
import { TeamsMeetView } from "./TeamsMeetView";
import { TeamsCallModal } from "./TeamsCallModal";
import { TeamsPrejoinView } from "./TeamsPrejoinView";
import {
  StartMeetDialog,
  StartGroupChatDialog,
  RenameGroupDialog,
  JoinWithIdDialog,
} from "./TeamsModals";
import {
  INITIAL_CHATS,
  INITIAL_MEET_LINKS,
  SECOND_MEET_LINK,
  type TeamsNav,
  type ChatFilterTab,
  type ChatSubTab,
  type MeetSubTab,
  type MeetLinkCard,
  type ChatItem,
} from "./teams-data";
import { pushTeamsToast, type TeamsToast } from "./teams-timeline";

interface Props {
  tl: Timeline;
}

export function TeamsStage({ tl }: Props) {
  // Navigation & Sub-views
  const activeNav = useTimelineVar<TeamsNav>(tl, "teams:activeNav", "chat");
  const activeChatId = useTimelineVar<string>(
    tl,
    "teams:activeChatId",
    "sam-taylor"
  );
  const filterTab = useTimelineVar<ChatFilterTab>(
    tl,
    "teams:filterTab",
    "all"
  );
  const chatSubTab = useTimelineVar<ChatSubTab>(
    tl,
    "teams:chatSubTab",
    "chat"
  );
  const meetTab = useTimelineVar<MeetSubTab>(tl, "teams:meetTab", "links");

  // Search & Filter
  const isListSearchOpen = useTimelineVar<boolean>(
    tl,
    "teams:isListSearchOpen",
    false
  );
  const listSearchQuery = useTimelineVar<string>(
    tl,
    "teams:listSearchQuery",
    ""
  );

  // Row menus & Pinning
  const isRowMenuOpen = useTimelineVar<boolean>(
    tl,
    "teams:isRowMenuOpen",
    false
  );
  const isPinnedSam = useTimelineVar<boolean>(tl, "teams:isPinnedSam", false);
  const isPinnedGroup = useTimelineVar<boolean>(
    tl,
    "teams:isPinnedGroup",
    false
  );

  // Meeting Dialog & Prejoin
  const isMeetingDialogOpen = useTimelineVar<boolean>(
    tl,
    "teams:isMeetingDialogOpen",
    false
  );
  const isCreatingMeet = useTimelineVar<boolean>(
    tl,
    "teams:isCreatingMeet",
    false
  );
  const isPrejoinOpen = useTimelineVar<boolean>(
    tl,
    "teams:isPrejoinOpen",
    false
  );
  const prejoinCamOff = useTimelineVar<boolean>(
    tl,
    "teams:prejoinCamOff",
    false
  );
  const prejoinMicOff = useTimelineVar<boolean>(
    tl,
    "teams:prejoinMicOff",
    false
  );

  // Call View
  const isCallOpen = useTimelineVar<boolean>(tl, "teams:isCallOpen", false);

  // Group Chat Dialog
  const isGroupDialogOpen = useTimelineVar<boolean>(
    tl,
    "teams:isGroupDialogOpen",
    false
  );
  const groupSelectedUsers = useTimelineVar<string[]>(
    tl,
    "teams:groupSelectedUsers",
    ["u-sam"]
  );
  const groupSearchQuery = useTimelineVar<string>(
    tl,
    "teams:groupSearchQuery",
    ""
  );
  const isCreatingGroup = useTimelineVar<boolean>(
    tl,
    "teams:isCreatingGroup",
    false
  );
  const createdNewGroup = useTimelineVar<boolean>(
    tl,
    "teams:createdNewGroup",
    false
  );

  // Group View Extras
  const isMembersPopoverOpen = useTimelineVar<boolean>(
    tl,
    "teams:isMembersPopoverOpen",
    false
  );
  const isFindInChatOpen = useTimelineVar<boolean>(
    tl,
    "teams:isFindInChatOpen",
    false
  );
  const findInChatQuery = useTimelineVar<string>(
    tl,
    "teams:findInChatQuery",
    ""
  );
  const hasFirstReaction = useTimelineVar<boolean>(
    tl,
    "teams:hasFirstReaction",
    false
  );
  const hoveredMessageId = useTimelineVar<string | null>(
    tl,
    "teams:hoveredMessageId",
    null
  );

  // Rename Group
  const isRenameDialogOpen = useTimelineVar<boolean>(
    tl,
    "teams:isRenameDialogOpen",
    false
  );
  const groupTitle = useTimelineVar<string>(
    tl,
    "teams:groupTitle",
    "Acme Product & Tech Team"
  );
  const isGroupMoreMenuOpen = useTimelineVar<boolean>(
    tl,
    "teams:isGroupMoreMenuOpen",
    false
  );

  // Theme
  const isDark = useTimelineVar<boolean>(tl, "teams:isDark", false);

  // Meet Links & Calls
  const meetLinks = useTimelineVar<MeetLinkCard[]>(
    tl,
    "teams:meetLinks",
    INITIAL_MEET_LINKS
  );
  const isCreatingLink = useTimelineVar<boolean>(
    tl,
    "teams:isCreatingLink",
    false
  );
  const callsSearchQuery = useTimelineVar<string>(
    tl,
    "teams:callsSearchQuery",
    ""
  );

  // Join by ID
  const isJoinIdDialogOpen = useTimelineVar<boolean>(
    tl,
    "teams:isJoinIdDialogOpen",
    false
  );
  const renameGroupTyped = useTimelineVar<string>(
    tl,
    "field:dialog-rename-input",
    useTimelineVar<string>(tl, "field:[data-tl=dialog-rename-input]", "")
  );
  const joinIdTyped = useTimelineVar<string>(
    tl,
    "field:join-id-input",
    useTimelineVar<string>(tl, "field:[data-tl=join-id-input]", "")
  );

  // Toasts
  const toasts = useTimelineVar<TeamsToast[]>(tl, "teams:toasts", []);

  // Compute chats list (including newly created group if createdNewGroup is true)
  const currentChats: ChatItem[] = React.useMemo(() => {
    if (createdNewGroup) {
      const newGroupItem: ChatItem = {
        id: "new-group",
        name: "New group",
        time: "Just now",
        preview: "Jane Doe created this group",
        avatarText: "NG",
        avatarBg: "bg-purple-600",
        isGroup: true,
      };
      return [newGroupItem, ...INITIAL_CHATS];
    }
    return INITIAL_CHATS;
  }, [createdNewGroup]);

  // Handlers wired to timeline vars
  const handleSelectNav = (nav: TeamsNav) => {
    tl.setVar("teams:activeNav", nav);
  };

  const handleToggleTheme = () => {
    tl.setVar("teams:isDark", !isDark);
  };

  const handleSelectFilterTab = (tab: ChatFilterTab) => {
    tl.setVar("teams:filterTab", tab);
  };

  const handleToggleListSearch = () => {
    tl.setVar("teams:isListSearchOpen", !isListSearchOpen);
  };

  const handleListSearchChange = (q: string) => {
    tl.setVar("teams:listSearchQuery", q);
  };

  const handleOpenStartMeetDialog = () => {
    tl.setVar("teams:isMeetingDialogOpen", true);
  };

  const handleSelectChat = (id: string) => {
    tl.setVar("teams:activeChatId", id);
    tl.setVar("teams:isRowMenuOpen", false);
  };

  const handleToggleRowMenu = () => {
    tl.setVar("teams:isRowMenuOpen", !isRowMenuOpen);
  };

  const handlePinSamChat = () => {
    tl.setVar("teams:isPinnedSam", true);
    tl.setVar("teams:isRowMenuOpen", false);
  };

  const handleSelectSubTab = (tab: ChatSubTab) => {
    tl.setVar("teams:chatSubTab", tab);
  };

  const handleStartCall = () => {
    tl.setVar("teams:isCallOpen", true);
  };

  const handleEndCall = () => {
    tl.setVar("teams:isCallOpen", false);
  };

  const handleOpenGroupDialog = () => {
    tl.setVar("teams:isGroupDialogOpen", true);
    tl.setVar("teams:isMembersPopoverOpen", false);
  };

  const handleToggleGroupUser = (id: string) => {
    const next = groupSelectedUsers.includes(id)
      ? groupSelectedUsers.filter((u) => u !== id)
      : [...groupSelectedUsers, id];
    tl.setVar("teams:groupSelectedUsers", next);
  };

  const handleCreateGroup = () => {
    tl.setVar("teams:isCreatingGroup", true);
    tl.setVar("teams:createdNewGroup", true);
    tl.setVar("teams:activeChatId", "new-group");
    tl.setVar("teams:isGroupDialogOpen", false);
    tl.setVar("teams:isCreatingGroup", false);
  };

  const handleToggleMembersPopover = () => {
    tl.setVar("teams:isMembersPopoverOpen", !isMembersPopoverOpen);
  };

  const handleToggleFindInChat = () => {
    tl.setVar("teams:isFindInChatOpen", !isFindInChatOpen);
  };

  const handleFindInChatQueryChange = (q: string) => {
    tl.setVar("teams:findInChatQuery", q);
  };

  const handleToggleGroupMoreMenu = () => {
    tl.setVar("teams:isGroupMoreMenuOpen", !isGroupMoreMenuOpen);
  };

  const handleAddReaction = () => {
    tl.setVar("teams:hasFirstReaction", true);
  };

  const handleOpenRenameDialog = () => {
    tl.setVar("teams:isRenameDialogOpen", true);
    tl.setVar("teams:isGroupMoreMenuOpen", false);
  };

  const handleSaveRename = (newTitle: string) => {
    tl.setVar("teams:groupTitle", newTitle);
    tl.setVar("teams:isRenameDialogOpen", false);
  };

  const handlePinGroup = () => {
    tl.setVar("teams:isPinnedGroup", true);
    tl.setVar("teams:isGroupMoreMenuOpen", false);
  };

  // Meet handlers
  const handleSelectMeetSubTab = (tab: MeetSubTab) => {
    tl.setVar("teams:meetTab", tab);
  };

  const handleCreateMeetLink = () => {
    tl.setVar("teams:isCreatingLink", true);
    tl.setVar("teams:meetLinks", [
      ...meetLinks,
      SECOND_MEET_LINK,
    ]);
    tl.setVar("teams:isCreatingLink", false);
    pushTeamsToast(tl, "Meeting link created");
  };

  const handleOpenJoinIdDialog = () => {
    tl.setVar("teams:isJoinIdDialogOpen", true);
  };

  const handleJoinWithId = () => {
    tl.setVar("teams:isJoinIdDialogOpen", false);
    tl.setVar("teams:isPrejoinOpen", true);
  };

  const handleCopyLink = () => {
    pushTeamsToast(tl, "Link copied");
  };

  const handleShareLink = () => {
    pushTeamsToast(tl, "Link copied");
  };

  const handleDeleteMeetLink = (id: string) => {
    const updated = meetLinks.filter((l) => l.id !== id);
    tl.setVar("teams:meetLinks", updated);
    pushTeamsToast(tl, "Meeting link removed");
  };

  const handleSearchCalls = (q: string) => {
    tl.setVar("teams:callsSearchQuery", q);
  };

  return (
    <div
      data-scroller
      data-tl="teams-stage-root"
      className={`relative w-full h-full overflow-hidden ${
        isDark ? "is-dark" : ""
      }`}
    >
      <TeamsShell
        activeNav={activeNav}
        isDark={isDark}
        onSelectNav={handleSelectNav}
        onToggleTheme={handleToggleTheme}
      >
        {activeNav === "chat" ? (
          <TeamsChatView
            chats={currentChats}
            activeChatId={activeChatId}
            filterTab={filterTab}
            chatSubTab={chatSubTab}
            isListSearchOpen={isListSearchOpen}
            listSearchQuery={listSearchQuery}
            isRowMenuOpen={isRowMenuOpen}
            isPinnedSam={isPinnedSam}
            isPinnedGroup={isPinnedGroup}
            isMembersPopoverOpen={isMembersPopoverOpen}
            isFindInChatOpen={isFindInChatOpen}
            findInChatQuery={findInChatQuery}
            hasFirstReaction={hasFirstReaction}
            hoveredMessageId={hoveredMessageId}
            groupTitle={groupTitle}
            isGroupMoreMenuOpen={isGroupMoreMenuOpen}
            onSelectFilterTab={handleSelectFilterTab}
            onToggleListSearch={handleToggleListSearch}
            onListSearchChange={handleListSearchChange}
            onOpenStartMeetDialog={handleOpenStartMeetDialog}
            onSelectChat={handleSelectChat}
            onToggleRowMenu={handleToggleRowMenu}
            onPinSamChat={handlePinSamChat}
            onSelectSubTab={handleSelectSubTab}
            onStartCall={handleStartCall}
            onOpenGroupDialog={handleOpenGroupDialog}
            onToggleMembersPopover={handleToggleMembersPopover}
            onToggleFindInChat={handleToggleFindInChat}
            onFindInChatQueryChange={handleFindInChatQueryChange}
            onToggleGroupMoreMenu={handleToggleGroupMoreMenu}
            onAddReaction={handleAddReaction}
            onOpenRenameDialog={handleOpenRenameDialog}
            onPinGroup={handlePinGroup}
          />
        ) : activeNav === "meet" ? (
          <TeamsMeetView
            subTab={meetTab}
            meetLinks={meetLinks}
            searchQuery={callsSearchQuery}
            isCreatingLink={isCreatingLink}
            onSelectSubTab={handleSelectMeetSubTab}
            onCreateLink={handleCreateMeetLink}
            onOpenJoinIdDialog={handleOpenJoinIdDialog}
            onCopyLink={handleCopyLink}
            onShareLink={handleShareLink}
            onDeleteLink={handleDeleteMeetLink}
            onSearchCalls={handleSearchCalls}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-sm text-gray-400">
            {activeNav.toUpperCase()} View
          </div>
        )}
      </TeamsShell>

      {/* Overlays & Modals */}
      <TeamsCallModal isOpen={isCallOpen} onEndCall={handleEndCall} />

      <TeamsPrejoinView
        isOpen={isPrejoinOpen}
        camOff={prejoinCamOff}
        micOff={prejoinMicOff}
        onToggleCam={() => tl.setVar("teams:prejoinCamOff", !prejoinCamOff)}
        onToggleMic={() => tl.setVar("teams:prejoinMicOff", !prejoinMicOff)}
        onJoinNow={() => {}}
      />

      <StartMeetDialog
        isOpen={isMeetingDialogOpen}
        onClose={() => tl.setVar("teams:isMeetingDialogOpen", false)}
        onShareLink={() => {
          pushTeamsToast(
            tl,
            "Meeting link copied. Valid for 1 hour"
          );
        }}
        onStartMeeting={() => {
          tl.setVar("teams:isCreatingMeet", true);
          setTimeout(() => {
            tl.setVar("teams:isCreatingMeet", false);
            tl.setVar("teams:isMeetingDialogOpen", false);
            tl.setVar("teams:isPrejoinOpen", true);
          }, 300);
        }}
        isCreating={isCreatingMeet}
      />

      <StartGroupChatDialog
        isOpen={isGroupDialogOpen}
        selectedUserIds={groupSelectedUsers}
        searchQuery={groupSearchQuery}
        onClose={() => tl.setVar("teams:isGroupDialogOpen", false)}
        onSearchChange={(q) => tl.setVar("teams:groupSearchQuery", q)}
        onToggleUser={handleToggleGroupUser}
        onCreateGroup={handleCreateGroup}
        isCreating={isCreatingGroup}
      />

      <RenameGroupDialog
        isOpen={isRenameDialogOpen}
        currentTitle={groupTitle}
        typedValue={renameGroupTyped}
        onClose={() => tl.setVar("teams:isRenameDialogOpen", false)}
        onSave={handleSaveRename}
      />

      <JoinWithIdDialog
        isOpen={isJoinIdDialogOpen}
        typedValue={joinIdTyped}
        onClose={() => tl.setVar("teams:isJoinIdDialogOpen", false)}
        onJoin={handleJoinWithId}
      />

      {/* Floating Green Toasts */}
      <div
        data-tl="teams-toast-container"
        className="fixed top-4 right-6 z-50 flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            data-tl="teams-toast"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ECFDF5] border border-emerald-200 text-emerald-800 text-xs font-medium shadow-lg animate-in slide-in-from-top-2 duration-150"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
