"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Users,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { type TeamMember, INITIAL_MEMBERS } from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsMembersView({ tl }: Props) {
  const members = useTimelineVar<TeamMember[]>(tl, "projectsMembers", INITIAL_MEMBERS);

  const handleRoleChange = (memberId: string, newRole: "Admin" | "Member") => {
    const updated = members.map((m) =>
      m.id === memberId ? { ...m, role: newRole } : m
    );
    tl.setVar("projectsMembers", updated);
    pushProjectsToast(tl, `Role updated to ${newRole}`);
  };

  return (
    <div data-tl="projects-members-view" className="space-y-4 max-w-5xl mx-auto font-sans select-none">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Users className="w-5 h-5 text-gray-700" />
        <h1
          data-tl="members-view-title"
          className="text-lg font-bold text-gray-900 tracking-tight"
        >
          Members
        </h1>
        <span
          data-tl="members-count-badge"
          className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-md"
        >
          17
        </span>
      </div>

      {/* Members Table */}
      <div className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-2xs">
        <div className="grid grid-cols-12 px-6 py-3 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          <div className="col-span-5">Member</div>
          <div className="col-span-3">Role</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-100">
          {members.map((member) => {
            const isActive = member.status === "Active";

            return (
              <div
                key={member.id}
                data-tl={`member-row-${member.id}`}
                className={`grid grid-cols-12 px-6 py-3.5 items-center text-xs transition-colors ${
                  isActive ? "hover:bg-gray-50/50" : "opacity-60 bg-gray-50/20"
                }`}
              >
                {/* Member: Avatar, Name, Email */}
                <div className="col-span-5 flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      member.avatar === "J"
                        ? "bg-purple-100 text-[#7014D9]"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {member.avatar}
                  </div>
                  <div className="min-w-0">
                    <div
                      data-tl={`member-name-${member.id}`}
                      className="font-semibold text-gray-900 truncate"
                    >
                      {member.name}
                    </div>
                    <div
                      data-tl={`member-email-${member.id}`}
                      className="text-[11px] text-gray-400 truncate"
                    >
                      {member.email}
                    </div>
                  </div>
                </div>

                {/* Role dropdown / label */}
                <div className="col-span-3">
                  {isActive ? (
                    <div
                      data-tl={`member-role-select-${member.id}`}
                      onClick={() => {
                        if (member.id === "m2") {
                          handleRoleChange("m2", member.role === "Admin" ? "Member" : "Admin");
                        }
                      }}
                      className="inline-flex items-center gap-1.5 border border-gray-200 rounded-lg px-2.5 py-1 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer shadow-2xs"
                    >
                      <span data-tl={`member-role-value-${member.id}`}>{member.role}</span>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </div>
                  ) : (
                    <span className="text-gray-500 font-medium">{member.role}</span>
                  )}
                </div>

                {/* Status */}
                <div className="col-span-3">
                  {isActive ? (
                    <span
                      data-tl={`member-status-${member.id}`}
                      className="text-[10px] font-semibold text-gray-600 bg-gray-100 border border-gray-200 rounded px-2 py-0.5"
                    >
                      Active
                    </span>
                  ) : (
                    <span className="text-gray-400 font-normal">Not in workspace</span>
                  )}
                </div>

                {/* Actions */}
                <div className="col-span-1 flex justify-end">
                  {isActive && (
                    <button
                      type="button"
                      data-tl={`member-action-delete-${member.id}`}
                      className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
