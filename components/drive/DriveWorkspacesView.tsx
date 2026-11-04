"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Users, Plus, HardDrive, Loader2 } from "lucide-react";

export interface DriveWorkspacesViewProps {
  tl?: Timeline;
}

export const DriveWorkspacesView: React.FC<DriveWorkspacesViewProps> = ({ tl }) => {
  const isLoading = useTimelineVar(tl!, "driveWorkspacesLoading", false);
  const hasMarketingSpace = useTimelineVar(tl!, "driveWorkspaceMarketingSpaceCreated", false);
  const isMarketingSpaceDeleted = useTimelineVar(
    tl!,
    "driveWorkspaceMarketingSpaceDeleted",
    false
  );

  const showMarketingSpace = hasMarketingSpace && !isMarketingSpaceDeleted;

  if (isLoading) {
    return (
      <div
        data-tl="workspaces-loading"
        className="flex-1 flex items-center justify-center font-['Poppins',sans-serif]"
      >
        <Loader2 className="w-6 h-6 text-[#7014D9] animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="flex-1 flex flex-col p-6 bg-white overflow-y-auto font-['Poppins',sans-serif]"
      data-tl="workspaces-view"
    >
      {/* Top action row */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100">
        <p className="text-sm text-gray-600 font-medium">
          Collaborate with your team in shared workspaces.
        </p>
        <button
          type="button"
          data-tl="btn-workspaces-create-top"
          onClick={() => tl?.setVar("driveCreateWorkspaceModalOpen", true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#7014D9] hover:bg-[#5C0EB7] rounded-lg transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Workspace</span>
        </button>
      </div>

      {/* Workspaces Grid */}
      <div className="mt-6 grid grid-cols-2 gap-5 max-w-4xl">
        {/* Card 1: Marketing Space (when created) */}
        {showMarketingSpace && (
          <div
            data-tl="card-workspace-marketing-space"
            onClick={() => {
              tl?.setVar("driveActiveWorkspaceId", "2172");
              tl?.setUrl("drive.snaarp.com/workspaces/2172");
            }}
            className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-2xs hover:shadow-xs hover:border-[#7014D9] transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-[14px] font-semibold text-[#111827]">
                Marketing Space
              </h3>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                owner
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11.5px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <Users size={13} className="text-gray-400" />
                <span>1 / 100</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HardDrive size={13} className="text-gray-400" />
                <span>0 B / 10 GB</span>
              </div>
            </div>
          </div>
        )}

        {/* Card 2: Social media Resources */}
        <div
          data-tl="card-workspace-social-media"
          className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer space-y-3"
        >
          <div className="flex items-start justify-between">
            <h3 className="text-[14px] font-semibold text-[#111827]">
              Social media Resources
            </h3>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
              owner
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11.5px] text-gray-500">
            <div className="flex items-center gap-1.5">
              <Users size={13} className="text-gray-400" />
              <span>5 / 100</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HardDrive size={13} className="text-gray-400" />
              <span>920.5 MB / 10 GB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
