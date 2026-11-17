import React from "react";
import {
  Search,
  Video,
  SquarePen,
  Pin,
  MoreHorizontal,
  Phone,
  Users,
  Bell,
  Pencil,
  ChevronDown,
  X,
  FileText,
  Image as ImageIcon,
  Smile,
  Paperclip,
  Mic,
  Plus,
  Send,
  Glasses,
  BellOff,
  EyeOff,
  Ban,
  Trash2,
  Copy,
  Reply,
  CheckCheck,
  PhoneMissed,
  UserPlus,
} from "lucide-react";
import {
  INITIAL_CHATS,
  SAM_TAYLOR_MESSAGES,
  GROUP_MESSAGES,
  CURRENT_USER,
  type ChatFilterTab,
  type ChatSubTab,
  type ChatItem,
} from "./teams-data";
import { GroupMembersPopover } from "./TeamsModals";

export function TeamsChatView({
  chats = INITIAL_CHATS,
  activeChatId = "sam-taylor",
  filterTab = "all",
  chatSubTab = "chat",
  isListSearchOpen = false,
  listSearchQuery = "",
  isRowMenuOpen = false,
  isPinnedSam = false,
  isPinnedGroup = false,
  isMembersPopoverOpen = false,
  isFindInChatOpen = false,
  findInChatQuery = "",
  hasFirstReaction = false,
  hoveredMessageId,
  groupTitle = "Acme Product & Tech Team",
  isGroupMoreMenuOpen = false,
  onSelectFilterTab,
  onToggleListSearch,
  onListSearchChange,
  onOpenStartMeetDialog,
  onSelectChat,
  onToggleRowMenu,
  onPinSamChat,
  onSelectSubTab,
  onStartCall,
  onOpenGroupDialog,
  onToggleMembersPopover,
  onToggleFindInChat,
  onFindInChatQueryChange,
  onToggleGroupMoreMenu,
  onAddReaction,
  onOpenRenameDialog,
  onPinGroup,
}: {
  chats?: ChatItem[];
  activeChatId?: string;
  filterTab?: ChatFilterTab;
  chatSubTab?: ChatSubTab;
  isListSearchOpen?: boolean;
  listSearchQuery?: string;
  isRowMenuOpen?: boolean;
  isPinnedSam?: boolean;
  isPinnedGroup?: boolean;
  isMembersPopoverOpen?: boolean;
  isFindInChatOpen?: boolean;
  findInChatQuery?: string;
  hasFirstReaction?: boolean;
  hoveredMessageId?: string | null;
  groupTitle?: string;
  isGroupMoreMenuOpen?: boolean;
  onSelectFilterTab: (tab: ChatFilterTab) => void;
  onToggleListSearch: () => void;
  onListSearchChange: (q: string) => void;
  onOpenStartMeetDialog: () => void;
  onSelectChat: (id: string) => void;
  onToggleRowMenu: () => void;
  onPinSamChat: () => void;
  onSelectSubTab: (tab: ChatSubTab) => void;
  onStartCall: () => void;
  onOpenGroupDialog: () => void;
  onToggleMembersPopover: () => void;
  onToggleFindInChat: () => void;
  onFindInChatQueryChange: (q: string) => void;
  onToggleGroupMoreMenu: () => void;
  onAddReaction: () => void;
  onOpenRenameDialog: () => void;
  onPinGroup: () => void;
}) {
  const [localHoveredId, setLocalHoveredId] = React.useState<string | null>(
    null
  );
  const activeHoveredId = hoveredMessageId ?? localHoveredId;

  const isGroupChat =
    chats.find((c) => c.id === activeChatId)?.isGroup ??
    (activeChatId === "acme-product-tech" ||
      activeChatId === "people-of-acme" ||
      activeChatId === "acme-team" ||
      activeChatId === "new-group");

  // Filter chats list
  const filteredChats = chats.filter((c) => {
    if (filterTab === "group" && !c.isGroup) return false;
    if (filterTab === "unread") return false; // In recording, nothing is unread
    if (listSearchQuery.trim()) {
      return (
        c.name.toLowerCase().includes(listSearchQuery.toLowerCase()) ||
        c.preview.toLowerCase().includes(listSearchQuery.toLowerCase())
      );
    }
    return true;
  });

  // Reorder if pinned
  const sortedChats = [...filteredChats].sort((a, b) => {
    if (a.id === "sam-taylor" && isPinnedSam) return -1;
    if (b.id === "sam-taylor" && isPinnedSam) return 1;
    if (a.id === "acme-product-tech" && isPinnedGroup) return -1;
    if (b.id === "acme-product-tech" && isPinnedGroup) return 1;
    return 0;
  });

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];
  const messages = isGroupChat ? GROUP_MESSAGES : SAM_TAYLOR_MESSAGES;

  return (
    <div
      data-tl="chat-main-view"
      className="flex-1 flex h-full overflow-hidden bg-white select-none text-[#111827]"
    >
      {/* 1. Chat List Column (Left) */}
      <aside
        data-tl="chat-list-col"
        className="w-64 shrink-0 border-r border-gray-100 flex flex-col h-full bg-white relative"
      >
        {/* Column Header */}
        <div className="p-3 pb-2 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Chat
          </h2>
          <div className="flex items-center gap-1 text-gray-500">
            <button
              type="button"
              data-tl="chat-list-search-toggle"
              onClick={onToggleListSearch}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              type="button"
              data-tl="chat-list-video-btn"
              onClick={onOpenStartMeetDialog}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <Video className="w-4 h-4" />
            </button>
            <button
              type="button"
              data-tl="chat-list-new-chat-btn"
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <SquarePen className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search input (when toggled or open) */}
        {isListSearchOpen && (
          <div className="px-3 pb-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                data-tl="chat-list-search-input"
                value={listSearchQuery}
                onChange={(e) => onListSearchChange(e.target.value)}
                placeholder="Search"
                className="w-full h-8 pl-8 pr-2.5 rounded-lg border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-600"
              />
            </div>
          </div>
        )}

        {/* Filter Pills (All / Unread / Group) */}
        <div
          data-tl="chat-filter-tabs"
          className="flex items-center gap-1.5 px-3 pb-2.5"
        >
          <button
            type="button"
            data-tl="chat-tab-all"
            onClick={() => onSelectFilterTab("all")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              filterTab === "all"
                ? "bg-purple-100/70 text-purple-700 font-semibold"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            type="button"
            data-tl="chat-tab-unread"
            onClick={() => onSelectFilterTab("unread")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              filterTab === "unread"
                ? "bg-purple-100/70 text-purple-700 font-semibold"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Unread
          </button>
          <button
            type="button"
            data-tl="chat-tab-group"
            onClick={() => onSelectFilterTab("group")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              filterTab === "group"
                ? "bg-purple-100/70 text-purple-700 font-semibold"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Group
          </button>
        </div>

        {/* Scrollable list */}
        <div
          data-tl="chat-list-items"
          className="flex-1 overflow-y-auto no-scrollbar px-2 space-y-1"
        >
          {/* User's own notes row */}
          {filterTab !== "unread" && (
            <div
              data-tl="chat-row-user-notes"
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                  J
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-900 truncate">
                  {CURRENT_USER.name} (You)
                </div>
                <div className="text-[11px] text-gray-400 truncate">
                  Save messages and files here
                </div>
              </div>
            </div>
          )}

          {/* Section header */}
          {filterTab !== "unread" && (
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 pt-2 pb-1">
              CHATS
            </div>
          )}

          {/* Unread empty state */}
          {filterTab === "unread" && (
            <div
              data-tl="chat-unread-empty"
              className="py-12 text-center text-xs text-gray-400"
            >
              No conversations
            </div>
          )}

          {/* Chat rows */}
          {sortedChats.map((c) => {
            const isSelected = c.id === activeChatId;
            const isSam = c.id === "sam-taylor";
            const isPinned =
              (isSam && isPinnedSam) ||
              (c.id === "acme-product-tech" && isPinnedGroup);
            const displayName =
              c.id === "acme-product-tech" ? groupTitle : c.name;

            return (
              <div
                key={c.id}
                data-tl={`chat-row-${c.id}`}
                onClick={() => onSelectChat(c.id)}
                className={`group relative flex items-center gap-2.5 px-2.5 py-2 rounded-xl cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-purple-50/70 text-gray-900"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full ${c.avatarBg} text-white flex items-center justify-center text-xs font-medium`}
                  >
                    {c.avatarText}
                  </div>
                  {c.isGroup ? null : (
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-gray-300 ring-1 ring-white" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold truncate text-gray-900">
                      {displayName}
                    </span>
                    <span className="text-[10px] text-gray-400 ml-1 shrink-0">
                      {c.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[11px] text-gray-400 truncate">
                      {c.preview}
                    </span>
                    {isPinned && (
                      <Pin className="w-2.5 h-2.5 text-purple-600 shrink-0 ml-1 fill-purple-600" />
                    )}
                  </div>
                </div>

                {/* Row "..." Button */}
                {isSam && (
                  <button
                    type="button"
                    data-tl="chat-row-more-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleRowMenu();
                    }}
                    className={`p-1 rounded hover:bg-gray-200/80 text-gray-400 hover:text-gray-700 transition-opacity ${
                      isRowMenuOpen
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Row Context Menu */}
                {isSam && isRowMenuOpen && (
                  <div
                    data-tl="chat-context-menu"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-2 top-8 z-50 w-44 rounded-xl bg-white p-1.5 shadow-xl border border-gray-100 text-xs animate-in fade-in zoom-in-95 duration-100"
                  >
                    <button
                      type="button"
                      data-tl="chat-menu-unread"
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-purple-50 hover:text-purple-700 text-gray-700 transition-colors"
                    >
                      <Glasses className="w-3.5 h-3.5 text-gray-400" />
                      Mark as unread
                    </button>
                    <button
                      type="button"
                      data-tl="chat-menu-pin"
                      onClick={() => onPinSamChat()}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-purple-50 hover:text-purple-700 text-gray-700 transition-colors"
                    >
                      <Pin className="w-3.5 h-3.5 text-gray-400" />
                      Pin to top
                    </button>
                    <button
                      type="button"
                      data-tl="chat-menu-mute"
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-purple-50 hover:text-purple-700 text-gray-700 transition-colors"
                    >
                      <BellOff className="w-3.5 h-3.5 text-gray-400" />
                      Mute
                    </button>
                    <button
                      type="button"
                      data-tl="chat-menu-hide"
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-purple-50 hover:text-purple-700 text-gray-700 transition-colors"
                    >
                      <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                      Hide
                    </button>
                    <hr className="my-1 border-gray-100" />
                    <button
                      type="button"
                      data-tl="chat-menu-block"
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-purple-50 hover:text-purple-700 text-gray-700 transition-colors"
                    >
                      <Ban className="w-3.5 h-3.5 text-gray-400" />
                      Block
                    </button>
                    <button
                      type="button"
                      data-tl="chat-menu-delete"
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* 2. Chat Main Area (Center) */}
      <main
        data-tl="chat-main-area"
        className="flex-1 flex flex-col h-full bg-white relative overflow-hidden"
      >
        {/* Chat Area Top Bar */}
        <header
          data-tl={isGroupChat ? "group-chat-header" : "chat-header"}
          className="h-14 px-5 border-b border-gray-100 flex items-center justify-between shrink-0"
        >
          {/* Left: Contact/Group info & tabs */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-full ${activeChat.avatarBg} text-white flex items-center justify-center text-xs font-medium`}
              >
                {activeChat.avatarText}
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  data-tl={
                    isGroupChat ? "group-chat-title" : "chat-contact-title"
                  }
                  className="text-sm font-bold text-gray-900"
                >
                  {isGroupChat ? groupTitle : activeChat.name}
                </span>
                {isGroupChat && (
                  <button
                    type="button"
                    data-tl="group-header-rename-pencil"
                    onClick={onOpenRenameDialog}
                    className="p-1 text-gray-400 hover:text-gray-700 rounded transition-colors"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Sub-tabs: Chat / Files / Photos */}
            <div className="flex items-center gap-3 text-xs font-medium ml-2">
              <button
                type="button"
                data-tl="chat-tab-chat"
                onClick={() => onSelectSubTab("chat")}
                className={`pb-0.5 transition-colors cursor-pointer ${
                  chatSubTab === "chat"
                    ? "text-purple-700 font-semibold border-b-2 border-purple-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Chat
              </button>
              <button
                type="button"
                data-tl="chat-tab-files"
                onClick={() => onSelectSubTab("files")}
                className={`pb-0.5 transition-colors cursor-pointer ${
                  chatSubTab === "files"
                    ? "text-purple-700 font-semibold border-b-2 border-purple-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Files
              </button>
              <button
                type="button"
                data-tl="chat-tab-photos"
                onClick={() => onSelectSubTab("photos")}
                className={`pb-0.5 transition-colors cursor-pointer ${
                  chatSubTab === "photos"
                    ? "text-purple-700 font-semibold border-b-2 border-purple-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Photos
              </button>
            </div>
          </div>

          {/* Right Header Action Icons */}
          <div
            data-tl="teams-chat-header-actions"
            className="flex items-center gap-1.5 text-gray-500"
          >
            {isGroupChat ? (
              <>
                <button
                  type="button"
                  data-tl="group-header-meet-btn"
                  className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-purple-600" />
                  <span>Meet now</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                <button
                  type="button"
                  data-tl="group-header-members-btn"
                  onClick={onToggleMembersPopover}
                  className="px-2 py-1.5 rounded-lg hover:bg-gray-100 flex items-center gap-1 text-xs text-gray-700 transition-colors cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span className="font-semibold text-xs">8</span>
                </button>

                <button
                  type="button"
                  data-tl="group-header-search-btn"
                  onClick={onToggleFindInChat}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  data-tl="group-header-bell-btn"
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                </button>

                <div className="relative">
                  <button
                    type="button"
                    data-tl="group-header-more-btn"
                    onClick={onToggleGroupMoreMenu}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {/* Group More Menu */}
                  {isGroupMoreMenuOpen && (
                    <div
                      data-tl="group-more-menu"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-8 z-50 w-44 rounded-xl bg-white p-1.5 shadow-xl border border-gray-100 text-xs animate-in fade-in zoom-in-95 duration-100"
                    >
                      <button
                        type="button"
                        data-tl="group-menu-rename"
                        onClick={onOpenRenameDialog}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-purple-50 hover:text-purple-700 text-gray-700 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5 text-gray-400" />
                        Rename group
                      </button>
                      <button
                        type="button"
                        data-tl="group-menu-pin"
                        onClick={onPinGroup}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-purple-50 hover:text-purple-700 text-gray-700 transition-colors"
                      >
                        <Pin className="w-3.5 h-3.5 text-gray-400" />
                        Pin to top
                      </button>
                      <button
                        type="button"
                        data-tl="group-menu-add-people"
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-purple-50 hover:text-purple-700 text-gray-700 transition-colors"
                      >
                        <UserPlus className="w-3.5 h-3.5 text-gray-400" />
                        Add people
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  data-tl="chat-header-video-btn"
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Video className="w-4 h-4 text-purple-600" />
                </button>
                <button
                  type="button"
                  data-tl="chat-header-call-btn"
                  onClick={onStartCall}
                  title="Start a call"
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-purple-600" />
                </button>
                <button
                  type="button"
                  data-tl="chat-header-group-btn"
                  onClick={onOpenGroupDialog}
                  title="Start a group chat"
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  data-tl="chat-header-search-btn"
                  onClick={onToggleFindInChat}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  data-tl="chat-header-bell-btn"
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </header>

        {/* Members Popover Overlay */}
        <GroupMembersPopover
          isOpen={isMembersPopoverOpen}
          onClose={onToggleMembersPopover}
          onAddPeople={onOpenGroupDialog}
          onLeave={onToggleMembersPopover}
        />

        {/* 3. Subtabs Content */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Chat Stream View */}
          {chatSubTab === "chat" && (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              <div
                data-tl="chat-messages-container"
                className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4"
              >
                {messages.map((m, idx) => {
                  const isFirstMsg = idx === 0;
                  const showReaction =
                    m.reaction || (isFirstMsg && hasFirstReaction);

                  return (
                    <div
                      key={m.id}
                      data-tl={`chat-message-${m.id}`}
                      onMouseEnter={() => setLocalHoveredId(m.id)}
                      onMouseLeave={() => setLocalHoveredId(null)}
                      className={`relative flex flex-col group ${
                        m.isMe ? "items-end" : "items-start"
                      }`}
                    >
                      {/* Sender name for received */}
                      {!m.isMe && m.sender && (
                        <div className="text-[11px] font-semibold text-gray-700 mb-1 ml-9">
                          {m.sender}
                        </div>
                      )}

                      <div className="flex items-start gap-2.5 max-w-xl">
                        {!m.isMe && (
                          <div
                            className={`w-7 h-7 rounded-full ${m.avatarBg} text-white flex items-center justify-center text-[10px] font-semibold shrink-0`}
                          >
                            {m.avatarText}
                          </div>
                        )}

                        <div className="relative">
                          {/* Floating Reaction Bar on Hover */}
                          {activeHoveredId === m.id && (
                            <div
                              data-tl="message-reaction-bar"
                              className="absolute -top-9 right-0 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white shadow-xl border border-gray-100 text-sm animate-in fade-in zoom-in-95 duration-100"
                            >
                              <button
                                type="button"
                                data-tl="reaction-btn-thumbs"
                                onClick={onAddReaction}
                                className="hover:scale-125 transition-transform cursor-pointer"
                              >
                                👍
                              </button>
                              <button
                                type="button"
                                className="hover:scale-125 transition-transform cursor-pointer"
                              >
                                ❤️
                              </button>
                              <button
                                type="button"
                                className="hover:scale-125 transition-transform cursor-pointer"
                              >
                                😮
                              </button>
                              <button
                                type="button"
                                className="hover:scale-125 transition-transform cursor-pointer"
                              >
                                😢
                              </button>
                              <button
                                type="button"
                                className="hover:scale-125 transition-transform cursor-pointer"
                              >
                                😠
                              </button>
                              <div className="w-[1px] h-3.5 bg-gray-200 mx-0.5" />
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-700"
                              >
                                <Smile className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-700"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-700"
                              >
                                <Reply className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}

                          {/* Message Bubble */}
                          {m.imageName ? (
                            <div className="p-2 rounded-2xl bg-[#5850EC] text-white shadow-sm space-y-1">
                              <div className="w-48 h-32 rounded-xl bg-gray-100 flex items-center justify-center border border-indigo-400/40">
                                <span className="text-xs text-gray-500 font-medium">
                                  {m.imageName}
                                </span>
                              </div>
                              <div className="text-[10px] text-indigo-200 text-right pr-1 flex items-center justify-end gap-1">
                                {m.time}
                                <CheckCheck className="w-3 h-3 text-indigo-300" />
                              </div>
                            </div>
                          ) : m.isMissedCall ? (
                            <div className="px-3.5 py-2.5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-2 text-xs">
                              <PhoneMissed className="w-3.5 h-3.5 text-red-500" />
                              <span className="font-medium text-gray-800">
                                Missed audio call
                              </span>
                              <span className="text-[10px] text-gray-400 ml-2">
                                {m.time}
                              </span>
                            </div>
                          ) : m.mention ? (
                            <div className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 text-xs font-medium">
                              {m.mention}
                            </div>
                          ) : (
                            <div
                              className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-sm ${
                                m.isMe
                                  ? "bg-[#5850EC] text-white"
                                  : "bg-white border border-gray-100 text-gray-800"
                              }`}
                            >
                              {m.text}
                              <div
                                className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${
                                  m.isMe ? "text-indigo-200" : "text-gray-400"
                                }`}
                              >
                                {m.time}
                                {m.isMe && (
                                  <CheckCheck className="w-3 h-3 text-indigo-300" />
                                )}
                              </div>
                            </div>
                          )}

                          {/* Reaction badge */}
                          {showReaction && (
                            <div
                              data-tl="message-reaction-badge"
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white shadow-sm border border-gray-100 text-xs -mt-2 ml-1"
                            >
                              <span>👍</span>
                              <span className="text-[10px] text-gray-500 font-medium">
                                1
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom message input box */}
              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="rounded-2xl border border-gray-200 p-2.5 focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600 transition-all">
                  <input
                    type="text"
                    data-tl="chat-message-input"
                    placeholder="Type a message — use @ to mention, paste images"
                    className="w-full text-xs text-gray-800 placeholder-gray-400 focus:outline-none mb-2 px-1"
                  />
                  <div className="flex items-center justify-between text-gray-400 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="hover:text-gray-600 transition-colors"
                      >
                        <Smile className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="hover:text-gray-600 transition-colors"
                      >
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="hover:text-gray-600 transition-colors"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="hover:text-gray-600 transition-colors"
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="hover:text-gray-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      data-tl="chat-send-btn"
                      className="w-7 h-7 rounded-full bg-[#5850EC] hover:bg-[#4F46E5] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 -translate-x-0.5 translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Files Tab Content */}
          {chatSubTab === "files" && (
            <div className="flex-1 flex flex-col h-full bg-white relative">
              {/* Thin purple loading indicator bar */}
              <div
                data-tl="files-loading-bar"
                className="h-0.5 w-full bg-purple-600 animate-pulse"
              />

              <div
                data-tl="files-empty-state"
                className="flex-1 flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 mb-3 border border-gray-100">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  No files shared yet
                </h3>
                <p className="text-xs text-gray-400 max-w-xs">
                  Files shared in this conversation will appear here
                </p>
              </div>
            </div>
          )}

          {/* Photos Tab Content */}
          {chatSubTab === "photos" && (
            <div className="flex-1 flex flex-col h-full bg-white relative">
              {/* Thin purple loading indicator bar */}
              <div
                data-tl="photos-loading-bar"
                className="h-0.5 w-full bg-purple-600 animate-pulse"
              />

              <div data-tl="photos-grid" className="p-6">
                <div
                  data-tl="photo-card-tile"
                  className="w-48 rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-full h-28 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center border border-indigo-100 mb-2">
                    <ImageIcon className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div className="text-xs font-medium text-gray-800 truncate">
                    Acme card.png
                  </div>
                  <div className="text-[10px] text-gray-400">9:43 AM</div>
                </div>
              </div>
            </div>
          )}

          {/* Right Drawer: "Find in chat" */}
          {isFindInChatOpen && (
            <aside
              data-tl="find-in-chat-panel"
              className="w-72 shrink-0 border-l border-gray-100 bg-white flex flex-col h-full p-4 animate-in slide-in-from-right duration-150"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-gray-900">
                  Find in chat
                </h3>
                <button
                  type="button"
                  data-tl="find-in-chat-close-btn"
                  onClick={onToggleFindInChat}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  data-tl="find-in-chat-input"
                  value={findInChatQuery}
                  onChange={(e) => onFindInChatQueryChange(e.target.value)}
                  placeholder="Enter a search keyword..."
                  className="w-full h-8 pl-3 pr-8 rounded-lg border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="flex items-center gap-1 mb-6">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-gray-200 text-[10px] text-gray-600 font-medium hover:bg-gray-50 cursor-pointer">
                  <Paperclip className="w-2.5 h-2.5 text-gray-400" />
                  Has attachment
                </span>
              </div>

              {/* Empty state illustration */}
              <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
                <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-3 shadow-inner">
                  <Search className="w-7 h-7" />
                </div>
                <h4 className="text-xs font-semibold text-gray-900 mb-1">
                  Search in this chat
                </h4>
                <p className="text-[11px] text-gray-400">
                  Find messages and links shared in this chat.
                </p>
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
