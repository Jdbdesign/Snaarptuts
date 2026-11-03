"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Share2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export const DriveSharedView: React.FC<Props> = ({ tl }) => {
  const activeTab = useTimelineVar<"with-you" | "by-you">(tl, "driveSharedTab", "with-you");
  const activeFilter = useTimelineVar<string>(tl, "driveSharedFilter", "All");
  const isLoading = useTimelineVar<boolean>(tl, "driveSharedLoading", false);

  const filterChips = ["All", "Folders", "Documents", "Images", "Videos", "Other"];

  return (
    <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto" data-tl="shared-view">
      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-gray-100 pb-3">
        <button
          type="button"
          data-tl="tab-shared-with-you"
          onClick={() => tl.setVar("driveSharedTab", "with-you")}
          className={`relative pb-3 text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "with-you"
              ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#7014D9]"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          With you
        </button>
        <button
          type="button"
          data-tl="tab-shared-by-you"
          onClick={() => tl.setVar("driveSharedTab", "by-you")}
          className={`relative pb-3 text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "by-you"
              ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#7014D9]"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          By you
        </button>
      </div>

      {/* Toolbar / Filters */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          {filterChips.map((chip) => {
            const isSelected = activeFilter.toLowerCase() === chip.toLowerCase();
            return (
              <button
                key={chip}
                type="button"
                data-tl={`chip-shared-${chip.toLowerCase()}`}
                onClick={() => tl.setVar("driveSharedFilter", chip)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#7014D9] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <input
            type="text"
            data-tl="input-shared-filter"
            placeholder="Filter by name or person"
            className="w-56 pl-3 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#7014D9]"
            readOnly
          />
        </div>
      </div>

      {/* Main Body / Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[360px]">
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <div className="text-center max-w-sm">
            <div className="w-12 h-12 mx-auto mb-3 text-gray-300 flex items-center justify-center">
              <Share2 className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Nothing shared yet
            </h3>
            <p className="text-xs text-gray-500">
              {activeTab === "with-you"
                ? "When someone shares files or folders with you, they'll appear here."
                : "Files and folders you share with others will appear here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
