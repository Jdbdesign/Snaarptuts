"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { Users, Plus } from "lucide-react";

export interface DriveWorkspacesViewProps {
  tl?: Timeline;
}

export const DriveWorkspacesView: React.FC<DriveWorkspacesViewProps> = () => {
  return (
    <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto" data-tl="workspaces-view">
      {/* Top action row */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100">
        <p className="text-sm text-gray-600 font-medium">
          Collaborate with your team in shared workspaces.
        </p>
        <button
          type="button"
          data-tl="btn-workspaces-create-top"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#7014D9] hover:bg-[#5C0EB7] rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Create Workspace
        </button>
      </div>

      {/* Center empty card */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl p-12 text-center bg-white border border-gray-200/80 rounded-2xl shadow-xs">
          <div className="w-16 h-16 mx-auto mb-3 text-gray-300 flex items-center justify-center">
            <Users className="w-12 h-12 stroke-[1.2]" />
          </div>
          <p className="text-xs text-gray-600 mb-5">
            No workspaces yet. Create one to start collaborating.
          </p>
          <button
            type="button"
            data-tl="btn-workspaces-create-card"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#7014D9] hover:bg-[#5C0EB7] rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Create Workspace
          </button>
        </div>
      </div>
    </div>
  );
};
