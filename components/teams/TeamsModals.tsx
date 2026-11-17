import React from "react";
import {
  X,
  Video,
  Copy,
  Search,
  Check,
  Link,
  UserPlus,
  LogOut,
  Loader2,
} from "lucide-react";
import {
  CANDIDATE_USERS,
  GROUP_MEMBERS,
} from "./teams-data";

// 1. "Start a snaarpmeet now" Dialog
export function StartMeetDialog({
  isOpen,
  onClose,
  onShareLink,
  onStartMeeting,
  isCreating,
}: {
  isOpen: boolean;
  onClose: () => void;
  onShareLink: () => void;
  onStartMeeting: () => void;
  isCreating: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div
      data-tl="dialog-start-meet-backdrop"
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]"
    >
      <div
        data-tl="dialog-start-meet"
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-100"
      >
        <button
          type="button"
          data-tl="dialog-meet-close-btn"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-purple-50 flex items-center justify-center text-purple-600">
            <Video className="w-3.5 h-3.5" />
          </div>
          <h3
            data-tl="dialog-meet-title"
            className="text-base font-semibold text-gray-900"
          >
            Start a snaarpmeet now
          </h3>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Link valid for 1 hour after creation
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Meeting name
            </label>
            <input
              type="text"
              data-tl="dialog-meet-name-input"
              defaultValue="Meeting with Jane Doe"
              readOnly
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-800 bg-gray-50/50 focus:outline-none focus:border-purple-600"
            />
          </div>

          <button
            type="button"
            data-tl="dialog-meet-share-btn"
            onClick={onShareLink}
            className="w-full h-10 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
          >
            <Copy className="w-4 h-4 text-gray-500" />
            Get a link to share
          </button>

          <button
            type="button"
            data-tl="dialog-meet-start-btn"
            onClick={onStartMeeting}
            disabled={isCreating}
            className="w-full h-10 rounded-lg bg-[#5850EC] hover:bg-[#4F46E5] text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Start meeting"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// 2. "Start a group chat" Dialog
export function StartGroupChatDialog({
  isOpen,
  selectedUserIds,
  searchQuery,
  onClose,
  onSearchChange,
  onToggleUser,
  onCreateGroup,
  isCreating,
}: {
  isOpen: boolean;
  selectedUserIds: string[];
  searchQuery: string;
  onClose: () => void;
  onSearchChange: (q: string) => void;
  onToggleUser: (id: string) => void;
  onCreateGroup: () => void;
  isCreating: boolean;
}) {
  if (!isOpen) return null;

  const filteredUsers = CANDIDATE_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const canCreate = selectedUserIds.length >= 2;

  return (
    <div
      data-tl="dialog-group-chat-backdrop"
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]"
    >
      <div
        data-tl="dialog-group-chat"
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100"
      >
        <button
          type="button"
          data-tl="dialog-group-close-btn"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>

        <h3
          data-tl="dialog-group-title"
          className="text-base font-semibold text-gray-900 mb-3"
        >
          Start a group chat
        </h3>

        {/* Selected Chips */}
        <div
          data-tl="group-chips-container"
          className="flex flex-wrap gap-1.5 mb-3 min-h-[32px]"
        >
          {selectedUserIds.map((uid) => {
            const user = CANDIDATE_USERS.find((u) => u.id === uid);
            if (!user) return null;
            return (
              <span
                key={user.id}
                data-tl={`group-chip-${user.id}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100"
              >
                <span
                  className={`w-4 h-4 rounded-full ${user.avatarBg} text-white flex items-center justify-center text-[9px]`}
                >
                  {user.avatarText}
                </span>
                {user.name}
                <button
                  type="button"
                  data-tl={`group-chip-remove-${user.id}`}
                  onClick={() => onToggleUser(user.id)}
                  className="hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative mb-2">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            data-tl="group-search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Enter name, email or phone number"
            className="w-full h-10 pl-9 pr-3 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-600"
          />
        </div>
        <p className="text-[11px] text-gray-400 mb-3">
          A new group chat will be created. Your existing 1:1 chat stays as is.
        </p>

        {/* Candidates List with scroll helper container */}
        <div
          data-tl="group-users-scroll"
          className="max-h-48 overflow-y-auto no-scrollbar border border-gray-100 rounded-xl divide-y divide-gray-50 mb-4"
        >
          {filteredUsers.map((user) => {
            const isSelected = selectedUserIds.includes(user.id);
            return (
              <div
                key={user.id}
                data-tl={`group-user-row-${user.id}`}
                onClick={() => onToggleUser(user.id)}
                className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors ${
                  isSelected ? "bg-purple-50/60" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-full ${user.avatarBg} text-white flex items-center justify-center text-xs font-medium`}
                  >
                    {user.avatarText}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-[11px] text-gray-400">{user.email}</div>
                  </div>
                </div>
                {isSelected && (
                  <Check
                    data-tl={`group-user-check-${user.id}`}
                    className="w-4 h-4 text-purple-600"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            data-tl="group-cancel-btn"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="group-create-btn"
            onClick={onCreateGroup}
            disabled={!canCreate || isCreating}
            className={`px-5 py-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm ${
              canCreate
                ? "bg-[#5850EC] hover:bg-[#4F46E5] text-white cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isCreating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Creating...
              </>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function RenameGroupContent({
  currentTitle,
  typedValue = "",
  onClose,
  onSave,
}: {
  currentTitle: string;
  typedValue?: string;
  onClose: () => void;
  onSave: (newTitle: string) => void;
}) {
  const [val, setVal] = React.useState(currentTitle);
  const displayVal = typedValue || val;

  return (
    <div
      data-tl="dialog-rename-group"
      className="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-gray-100"
    >
      <button
        type="button"
        data-tl="dialog-rename-close-btn"
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>

      <h3
        data-tl="dialog-rename-title"
        className="text-sm font-semibold text-gray-900 mb-3"
      >
        Rename group
      </h3>

      <input
        type="text"
        data-tl="dialog-rename-input"
        value={displayVal}
        onChange={(e) => setVal(e.target.value)}
        className="w-full h-10 px-3 rounded-xl border border-purple-500 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-purple-500 mb-4"
      />

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          data-tl="dialog-rename-cancel-btn"
          onClick={onClose}
          className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="button"
          data-tl="dialog-rename-save-btn"
          onClick={() => onSave(displayVal)}
          className="px-4 py-1.5 rounded-lg bg-[#5850EC] hover:bg-[#4F46E5] text-white text-xs font-medium transition-colors shadow-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
}

// 3. "Rename group" Dialog
export function RenameGroupDialog({
  isOpen,
  currentTitle,
  typedValue,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  currentTitle: string;
  typedValue?: string;
  onClose: () => void;
  onSave: (newTitle: string) => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      data-tl="dialog-rename-group-backdrop"
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]"
    >
      <RenameGroupContent
        key={currentTitle}
        currentTitle={currentTitle}
        typedValue={typedValue}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  );
}

// 4. "Join with a meeting ID" Dialog
export function JoinWithIdDialog({
  isOpen,
  typedValue = "",
  onClose,
  onJoin,
}: {
  isOpen: boolean;
  typedValue?: string;
  onClose: () => void;
  onJoin: (id: string) => void;
}) {
  const [code, setCode] = React.useState("");

  if (!isOpen) return null;

  const activeCode = typedValue || code;
  const canJoin = activeCode.trim().length > 0;

  return (
    <div
      data-tl="dialog-join-id-backdrop"
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]"
    >
      <div
        data-tl="dialog-join-id"
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-100"
      >
        <button
          type="button"
          data-tl="dialog-join-id-close-btn"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>

        <h3
          data-tl="dialog-join-id-title"
          className="text-sm font-semibold text-gray-900 mb-3"
        >
          Join with a meeting ID
        </h3>

        <div className="mb-4">
          <input
            type="text"
            data-tl="join-id-input"
            value={activeCode}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Meeting ID or link"
            className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-600"
          />
        </div>

        <button
          type="button"
          data-tl="join-id-submit-btn"
          onClick={() => onJoin(activeCode)}
          disabled={!canJoin}
          className={`w-full h-10 rounded-xl text-xs font-medium transition-colors flex items-center justify-center shadow-sm ${
            canJoin
              ? "bg-[#5850EC] hover:bg-[#4F46E5] text-white cursor-pointer"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Join meeting
        </button>
      </div>
    </div>
  );
}

// 5. Members Popover (8 members)
export function GroupMembersPopover({
  isOpen,
  onClose,
  onAddPeople,
  onLeave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddPeople: () => void;
  onLeave: () => void;
}) {
  if (!isOpen) return null;

  return (
    <>
      <div
        data-tl="group-members-backdrop"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-transparent"
      />
      <div
        data-tl="group-members-popover"
        className="absolute right-12 top-14 z-50 w-64 rounded-2xl bg-white p-3 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-100"
      >
        <button
          type="button"
          data-tl="popover-invite-link"
          className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Link className="w-3.5 h-3.5 text-gray-500" />
          Invite via link
        </button>

        <hr className="my-2 border-gray-100" />

        <div className="text-[11px] font-medium text-gray-400 px-2.5 mb-1.5">
          People ({GROUP_MEMBERS.length})
        </div>

        <div
          data-tl="popover-members-scroll"
          className="max-h-48 overflow-y-auto no-scrollbar space-y-1 pr-1"
        >
          {GROUP_MEMBERS.map((m) => (
            <div
              key={m.id}
              data-tl={`popover-member-${m.id}`}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full ${m.avatarBg} text-white flex items-center justify-center text-[10px] font-medium`}
                >
                  {m.avatarText}
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-800 leading-tight">
                    {m.name}
                  </div>
                  {m.role && (
                    <div className="text-[10px] text-gray-400">{m.role}</div>
                  )}
                </div>
              </div>
              {!m.isYou && m.role !== "Organizer" && (
                <button
                  type="button"
                  className="text-gray-300 hover:text-gray-500"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>

        <hr className="my-2 border-gray-100" />

        <button
          type="button"
          data-tl="popover-add-people-btn"
          onClick={onAddPeople}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <UserPlus className="w-3.5 h-3.5 text-gray-500" />
          Add people
        </button>

        <button
          type="button"
          data-tl="popover-leave-btn"
          onClick={onLeave}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 text-red-500" />
          Leave
        </button>
      </div>
    </>
  );
}
