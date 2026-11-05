"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  HardDrive,
  Folder,
  Users,
  MoreVertical,
  UserPlus,
  Shield,
  Eye,
  UserCheck,
  UserX,
} from "lucide-react";
import { SAMPLE_USER } from "./drive-data";

type Props = {
  tl: Timeline;
};

export function DriveWorkspaceDetailView({ tl }: Props) {
  const hasMembers = useTimelineVar(tl, "driveWorkspaceMembersInvited", false);
  const alexRole = useTimelineVar<string>(tl, "driveAlexMemberRole", "viewer");
  const jordanRemoved = useTimelineVar(tl, "driveJordanMemberRemoved", false);
  const menuOpenId = useTimelineVar<string>(tl, "driveMemberMenuOpenId", "");

  const memberCount = jordanRemoved ? 2 : hasMembers ? 3 : 1;

  return (
    <div
      data-tl="workspace-detail-view"
      className="space-y-5 font-['Poppins',sans-serif] text-[#111827] max-w-4xl"
    >
      {/* Top action row */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          data-tl="btn-ws-detail-delete"
          onClick={() => tl.setVar("driveDeleteWorkspaceModalOpen", true)}
          className="rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 text-[12px] font-medium text-gray-700 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
        >
          Delete workspace
        </button>

        <button
          type="button"
          data-tl="btn-ws-detail-invite"
          onClick={() => tl.setVar("driveInviteMemberModalOpen", true)}
          className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-4 py-1.5 text-[12px] font-semibold text-white shadow-2xs hover:bg-[#5C0EB7] transition-colors cursor-pointer"
        >
          <UserPlus size={14} />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Card 1: Storage Usage */}
      <div
        data-tl="card-ws-storage"
        className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-2xs space-y-3"
      >
        <div className="flex items-center gap-2 text-gray-700 font-semibold text-[13.5px]">
          <HardDrive size={16} className="text-gray-500" />
          <span>Storage Usage</span>
        </div>
        <p className="text-[12px] text-gray-500">26.4 MB of 10 GB used</p>
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full bg-[#7014D9] rounded-full w-[3%]" />
        </div>
      </div>

      {/* Card 2: Browse Workspace Files */}
      <div
        data-tl="card-browse-ws-files"
        onClick={() => {
          tl.setVar("drivePage", "files");
          tl.setVar("driveActiveNav", "files");
          tl.setVar("driveFilesViewMode", "tiles");
          tl.setVar("driveCurrentBreadcrumb", ["Workspaces", "Marketing Space"]);
          tl.setUrl("drive.snaarp.com/files?folder=2172");
        }}
        className="group rounded-2xl border border-gray-200/90 bg-white p-5 shadow-2xs hover:border-[#7014D9] hover:shadow-xs transition-all cursor-pointer space-y-1"
      >
        <div className="flex items-center gap-2 text-[#111827] group-hover:text-[#7014D9] font-semibold text-[13.5px] transition-colors">
          <Folder size={16} className="text-gray-400 group-hover:text-[#7014D9] transition-colors" />
          <span>Browse Workspace Files</span>
        </div>
        <p className="text-[12px] text-gray-400">View and manage files in this workspace</p>
      </div>

      {/* Card 3: Members */}
      <div
        data-tl="card-ws-members"
        className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-2xs space-y-3"
      >
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-700 font-semibold text-[13.5px]">
            <Users size={16} className="text-gray-500" />
            <span>Members</span>
          </div>
          <span className="text-[11.5px] text-gray-400">{memberCount} of 100 members</span>
        </div>

        <div className="divide-y divide-gray-100">
          {/* Row 1: Sam Taylor (Owner) */}
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-[#7014D9] text-xs font-semibold">
                {SAMPLE_USER.avatar}
              </div>
              <div>
                <p className="text-[12.5px] font-semibold text-[#111827]">
                  {SAMPLE_USER.name}
                </p>
                <p className="text-[11px] text-gray-400">{SAMPLE_USER.email}</p>
              </div>
            </div>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600">
              owner
            </span>
          </div>

          {/* Row 2: Alex Morgan */}
          {hasMembers && (
            <div className="relative flex items-center justify-between py-2.5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                  A
                </div>
                <div>
                  <p className="text-[12.5px] font-semibold text-[#111827]">
                    Alex Morgan
                  </p>
                  <p className="text-[11px] text-gray-400">alex.morgan@acme.example</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  data-tl="badge-alex-role"
                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-600"
                >
                  {alexRole}
                </span>
                <button
                  type="button"
                  data-tl="btn-member-menu-alex"
                  onClick={() =>
                    tl.setVar("driveMemberMenuOpenId", menuOpenId === "alex" ? "" : "alex")
                  }
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
                >
                  <MoreVertical size={14} />
                </button>
              </div>

              {/* Alex role dropdown */}
              {menuOpenId === "alex" && (
                <div
                  data-tl="popover-member-menu"
                  className="absolute right-0 top-10 z-30 w-48 rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl text-[12px] animate-in fade-in duration-100"
                >
                  <div className="px-3 py-1 text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider">
                    Change Role
                  </div>
                  <button
                    type="button"
                    data-tl="btn-role-promote-admin"
                    className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-gray-50 text-gray-700 cursor-pointer"
                  >
                    <Shield size={13} className="text-gray-400" />
                    <span>Promote to Admin</span>
                  </button>
                  <button
                    type="button"
                    data-tl="btn-role-set-member"
                    onClick={() => {
                      tl.setVar("driveAlexMemberRole", "member");
                      tl.setVar("driveMemberMenuOpenId", "");
                      tl.setVar("driveMemberRoleToastOpen", true);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-gray-50 text-gray-700 cursor-pointer"
                  >
                    <UserCheck size={13} className="text-gray-400" />
                    <span>Set as Member</span>
                  </button>
                  <button
                    type="button"
                    data-tl="btn-role-set-viewer"
                    onClick={() => {
                      tl.setVar("driveAlexMemberRole", "viewer");
                      tl.setVar("driveMemberMenuOpenId", "");
                      tl.setVar("driveMemberRoleToastOpen", true);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-gray-50 text-gray-700 cursor-pointer"
                  >
                    <Eye size={13} className="text-gray-400" />
                    <span>Set as Viewer</span>
                  </button>
                  <div className="my-1 border-t border-gray-100" />
                  <button
                    type="button"
                    data-tl="btn-role-remove-member"
                    onClick={() => {
                      tl.setVar("driveMemberMenuOpenId", "");
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-red-50 text-red-600 cursor-pointer"
                  >
                    <UserX size={13} className="text-red-500" />
                    <span>Remove from Workspace</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Row 3: Jordan Lee */}
          {hasMembers && !jordanRemoved && (
            <div className="relative flex items-center justify-between py-2.5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                  J
                </div>
                <div>
                  <p className="text-[12.5px] font-semibold text-[#111827]">
                    Jordan Lee
                  </p>
                  <p className="text-[11px] text-gray-400">jordan.lee@acme.example</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-600">
                  viewer
                </span>
                <button
                  type="button"
                  data-tl="btn-member-menu-jordan"
                  onClick={() =>
                    tl.setVar("driveMemberMenuOpenId", menuOpenId === "jordan" ? "" : "jordan")
                  }
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
                >
                  <MoreVertical size={14} />
                </button>
              </div>

              {/* Jordan role dropdown */}
              {menuOpenId === "jordan" && (
                <div
                  data-tl="popover-member-menu-jordan"
                  className="absolute right-0 top-10 z-30 w-48 rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl text-[12px] animate-in fade-in duration-100"
                >
                  <div className="px-3 py-1 text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider">
                    Change Role
                  </div>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-gray-50 text-gray-700 cursor-pointer"
                  >
                    <Shield size={13} className="text-gray-400" />
                    <span>Promote to Admin</span>
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-gray-50 text-gray-700 cursor-pointer"
                  >
                    <UserCheck size={13} className="text-gray-400" />
                    <span>Set as Member</span>
                  </button>
                  <div className="my-1 border-t border-gray-100" />
                  <button
                    type="button"
                    data-tl="btn-member-remove-jordan"
                    onClick={() => {
                      tl.setVar("driveJordanMemberRemoved", true);
                      tl.setVar("driveMemberMenuOpenId", "");
                      tl.setVar("driveMemberRemovedToastOpen", true);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-red-50 text-red-600 cursor-pointer"
                  >
                    <UserX size={13} className="text-red-500" />
                    <span>Remove from Workspace</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
