"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Loader2, ChevronDown } from "lucide-react";
import { ORG_MEMBERS } from "./drive-data";

type Props = {
  tl: Timeline;
};

export function DriveInviteMemberModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveInviteMemberModalOpen", false);
  const searchVal = useTimelineVar<string>(tl, "driveInviteSearchVal", "");
  const selectedIds = useTimelineVar<string[]>(tl, "driveInviteSelectedIds", []);
  const roleVal = useTimelineVar<string>(tl, "driveInviteRoleVal", "member");
  const isInviting = useTimelineVar(tl, "driveIsInvitingMembers", false);

  if (!isOpen) return null;

  const candidateMembers = ORG_MEMBERS.filter((m) => m.role !== "owner");

  const toggleMember = (id: string) => {
    if (selectedIds.includes(id)) {
      tl.setVar(
        "driveInviteSelectedIds",
        selectedIds.filter((x) => x !== id)
      );
    } else {
      tl.setVar("driveInviteSelectedIds", [...selectedIds, id]);
    }
  };

  const isAllSelected = candidateMembers.length > 0 && selectedIds.length === candidateMembers.length;

  return (
    <div
      data-tl="modal-invite-members"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-['Poppins',sans-serif] animate-in fade-in duration-150"
    >
      <div className="w-[440px] rounded-2xl bg-white p-5 shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#111827]">
            Invite organisation members
          </h3>
          <button
            type="button"
            data-tl="btn-invite-close"
            onClick={() => tl.setVar("driveInviteMemberModalOpen", false)}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 space-y-1.5">
          <label className="block text-[12px] font-medium text-gray-700">
            Search organisation members
          </label>
          <input
            type="text"
            data-tl="input-invite-search"
            placeholder="Search name or email"
            value={searchVal}
            readOnly
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-[12.5px] text-[#111827] placeholder:text-gray-400 focus:border-[#7014D9] focus:outline-none"
          />
        </div>

        {/* Members section */}
        <div className="mt-3.5 rounded-xl border border-gray-200/90 p-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 text-[12px] font-semibold text-gray-700">
            <span className="flex items-center gap-1">
              <span>▼ Members ({selectedIds.length} selected)</span>
            </span>
          </div>

          <div className="flex items-center gap-2 pt-2 pb-1.5 text-[12px] text-gray-600">
            <input
              type="checkbox"
              data-tl="checkbox-invite-select-all"
              checked={isAllSelected}
              onChange={() => {
                if (isAllSelected) {
                  tl.setVar("driveInviteSelectedIds", []);
                } else {
                  tl.setVar(
                    "driveInviteSelectedIds",
                    candidateMembers.map((m) => m.id)
                  );
                }
              }}
              className="rounded text-[#7014D9] focus:ring-0 cursor-pointer"
            />
            <span className="font-medium">Select all</span>
          </div>

          <div className="max-h-40 overflow-y-auto space-y-2 pt-1 divide-y divide-gray-50">
            {candidateMembers.map((member) => {
              const isChecked = selectedIds.includes(member.id);
              return (
                <div
                  key={member.id}
                  data-tl={`row-invite-member-${member.id}`}
                  onClick={() => toggleMember(member.id)}
                  className="flex items-center gap-2.5 pt-1.5 cursor-pointer hover:bg-gray-50/80 px-1 py-1 rounded"
                >
                  <input
                    type="checkbox"
                    data-tl={`checkbox-member-${member.id}`}
                    checked={isChecked}
                    onChange={() => {}}
                    className="rounded text-[#7014D9] focus:ring-0 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] font-medium text-[#111827] truncate">
                      {member.name}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">
                      {member.email}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Role dropdown */}
        <div className="mt-4 space-y-1.5">
          <label className="block text-[12px] font-medium text-gray-700">Role</label>
          <div className="relative">
            <select
              data-tl="select-invite-role"
              value={roleVal}
              onChange={(e) => tl.setVar("driveInviteRoleVal", e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-3 py-2 text-[12.5px] text-[#111827] focus:border-[#7014D9] focus:outline-none cursor-pointer"
            >
              <option value="member">Member</option>
              <option value="viewer">Viewer</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
          <p className="text-[10.5px] text-gray-400">
            99 member slots available. Only people in your organisation can be invited.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-invite-cancel"
            onClick={() => tl.setVar("driveInviteMemberModalOpen", false)}
            className="rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            data-tl="btn-invite-submit"
            disabled={selectedIds.length === 0 || isInviting}
            onClick={() => {
              tl.setVar("driveIsInvitingMembers", true);
            }}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-[12px] font-semibold text-white shadow-2xs transition-colors cursor-pointer ${
              selectedIds.length > 0
                ? "bg-[#7014D9] hover:bg-[#5C0EB7]"
                : "bg-purple-300 cursor-not-allowed"
            }`}
          >
            {isInviting && <Loader2 size={13} className="animate-spin" />}
            <span>{isInviting ? "Inviting..." : "Invite selected"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
