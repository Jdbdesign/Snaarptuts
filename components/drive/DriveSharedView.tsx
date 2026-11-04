"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Share2,
  Folder,
  FileSpreadsheet,
  MoreVertical,
  ExternalLink,
  Download,
  Link as LinkIcon,
  EyeOff,
  X,
  ChevronDown,
} from "lucide-react";
import { SHARED_BY_YOU_ITEMS } from "./drive-data";

type Props = {
  tl: Timeline;
};

export function DriveSharedView({ tl }: Props) {
  const activeTab = useTimelineVar<"with-you" | "by-you">(tl, "driveSharedTab", "with-you");
  const activeFilter = useTimelineVar<string>(tl, "driveSharedFilter", "All");
  const isLoading = useTimelineVar<boolean>(tl, "driveSharedLoading", false);
  const selectedIds = useTimelineVar<string[]>(tl, "driveSharedSelectedIds", []);
  const rowMenuOpenId = useTimelineVar<string>(tl, "driveSharedRowMenuOpenId", "");
  const hiddenIds = useTimelineVar<string[]>(tl, "driveSharedHiddenIds", []);

  const filterChips = ["All", "Folders", "Documents", "Images", "Videos", "Other"];

  const toggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      tl.setVar(
        "driveSharedSelectedIds",
        selectedIds.filter((x) => x !== id)
      );
    } else {
      tl.setVar("driveSharedSelectedIds", [...selectedIds, id]);
    }
  };

  const visibleItems = SHARED_BY_YOU_ITEMS.filter((item) => !hiddenIds.includes(item.id));

  return (
    <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto font-['Poppins',sans-serif]" data-tl="shared-view">
      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-gray-100 pb-3">
        <button
          type="button"
          data-tl="tab-shared-with-you"
          onClick={() => {
            tl.setVar("driveSharedTab", "with-you");
            tl.setUrl("drive.snaarp.com/shared");
          }}
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
          onClick={() => {
            tl.setVar("driveSharedTab", "by-you");
            tl.setUrl("drive.snaarp.com/shared");
          }}
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

      {/* Main Body */}
      {activeTab === "with-you" ? (
        /* With You: Empty state (chips show empty state) */
        <div className="flex-1 flex flex-col items-center justify-center min-h-[360px]">
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <div data-tl="shared-empty-state" className="text-center max-w-sm">
              <div className="w-12 h-12 mx-auto mb-3 text-gray-300 flex items-center justify-center">
                <Share2 className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Nothing shared yet
              </h3>
              <p className="text-xs text-gray-500">
                When someone shares files or folders with you, they&apos;ll appear here.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* By You: Table + Bulk Bar */
        <div className="mt-4 flex-1 flex flex-col">
          {/* Shared Bulk Action Bar */}
          {selectedIds.length > 0 && (
            <div
              data-tl="bar-shared-bulk-actions"
              className="mb-3 flex items-center justify-between rounded-xl bg-purple-50/70 border border-purple-100 px-4 py-2 text-xs font-medium text-gray-700 select-none animate-in fade-in duration-150"
            >
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  data-tl="btn-shared-bulk-open"
                  className="flex items-center gap-1.5 hover:text-[#7014D9] cursor-pointer"
                >
                  <ExternalLink size={13} />
                  <span>Open</span>
                </button>
                <button
                  type="button"
                  data-tl="btn-shared-bulk-share"
                  onClick={() => tl.setVar("driveShareModalOpen", true)}
                  className="flex items-center gap-1.5 hover:text-[#7014D9] cursor-pointer"
                >
                  <Share2 size={13} />
                  <span>Share</span>
                </button>
                <button
                  type="button"
                  data-tl="btn-shared-bulk-shortcut"
                  onClick={() => {
                    tl.setVar("driveSharedShortcutToastOpen", true);
                  }}
                  className="flex items-center gap-1.5 hover:text-[#7014D9] cursor-pointer"
                >
                  <LinkIcon size={13} />
                  <span>Add shortcut to My files</span>
                </button>
                <button
                  type="button"
                  data-tl="btn-shared-bulk-download"
                  className="flex items-center gap-1.5 hover:text-[#7014D9] cursor-pointer"
                >
                  <Download size={13} />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  data-tl="btn-shared-bulk-hide"
                  onClick={() => {
                    tl.setVar("driveSharedHiddenIds", [...hiddenIds, ...selectedIds]);
                    tl.setVar("driveSharedSelectedIds", []);
                    tl.setVar("driveSharedHideToastOpen", true);
                  }}
                  className="flex items-center gap-1.5 hover:text-red-600 cursor-pointer"
                >
                  <EyeOff size={13} />
                  <span>Hide from Shared</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-600">
                  {selectedIds.length} selected
                </span>
                <button
                  type="button"
                  data-tl="btn-shared-bulk-close"
                  onClick={() => tl.setVar("driveSharedSelectedIds", [])}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 w-10">
                    <input
                      type="checkbox"
                      data-tl="checkbox-shared-select-all"
                      checked={selectedIds.length === visibleItems.length && visibleItems.length > 0}
                      onChange={() => {
                        if (selectedIds.length === visibleItems.length) {
                          tl.setVar("driveSharedSelectedIds", []);
                        } else {
                          tl.setVar(
                            "driveSharedSelectedIds",
                            visibleItems.map((x) => x.id)
                          );
                        }
                      }}
                      className="rounded text-[#7014D9] focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-4 font-medium">Name</th>
                  <th className="py-3 px-4 font-medium">Date Shared</th>
                  <th className="py-3 px-4 font-medium">Shared with</th>
                  <th className="py-3 px-4 text-right font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
                {visibleItems.map((item, idx) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      data-tl={`row-shared-by-you-${idx + 1}`}
                      className={`hover:bg-gray-50/70 transition-colors ${
                        isChecked ? "bg-purple-50/30" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          data-tl={`checkbox-shared-row-${idx + 1}`}
                          checked={isChecked}
                          onChange={() => toggleSelectRow(item.id)}
                          className="rounded text-[#7014D9] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                            {item.isFolder ? (
                              <Folder className="w-4 h-4 text-amber-500 fill-amber-400/50" />
                            ) : (
                              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-gray-400">
                              {item.permission}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                        {item.dateShared}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        {item.sharedWith}
                      </td>
                      <td className="py-3.5 px-4 text-right relative">
                        <button
                          type="button"
                          data-tl={`btn-shared-row-menu-${idx + 1}`}
                          onClick={() =>
                            tl.setVar(
                              "driveSharedRowMenuOpenId",
                              rowMenuOpenId === item.id ? "" : item.id
                            )
                          }
                          className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                        >
                          <MoreVertical size={14} />
                        </button>

                        {/* Dropdown Menu */}
                        {rowMenuOpenId === item.id && (
                          <div
                            data-tl="popover-shared-row-menu"
                            className="absolute right-4 top-10 z-30 w-48 rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl text-[12px] text-left animate-in fade-in duration-100"
                          >
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-gray-50 text-gray-700 cursor-pointer"
                            >
                              <ExternalLink size={13} className="text-gray-400" />
                              <span>Open</span>
                            </button>
                            <button
                              type="button"
                              data-tl="btn-shared-menu-share"
                              onClick={() => {
                                tl.setVar("driveSharedRowMenuOpenId", "");
                                tl.setVar("driveShareModalOpen", true);
                              }}
                              className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-gray-50 text-gray-700 cursor-pointer"
                            >
                              <Share2 size={13} className="text-gray-400" />
                              <span>Share</span>
                            </button>
                            <button
                              type="button"
                              data-tl="btn-shared-menu-shortcut"
                              onClick={() => {
                                tl.setVar("driveSharedRowMenuOpenId", "");
                                tl.setVar("driveSharedShortcutToastOpen", true);
                              }}
                              className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-gray-50 text-gray-700 cursor-pointer"
                            >
                              <LinkIcon size={13} className="text-gray-400" />
                              <span>Add shortcut to My files</span>
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-gray-50 text-gray-700 cursor-pointer"
                            >
                              <Download size={13} className="text-gray-400" />
                              <span>Download</span>
                            </button>
                            <div className="my-1 border-t border-gray-100" />
                            <button
                              type="button"
                              data-tl="btn-shared-menu-hide"
                              onClick={() => {
                                tl.setVar("driveSharedRowMenuOpenId", "");
                                tl.setVar("driveSharedHiddenIds", [...hiddenIds, item.id]);
                                tl.setVar("driveSharedHideToastOpen", true);
                              }}
                              className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-gray-50 text-gray-700 cursor-pointer"
                            >
                              <EyeOff size={13} className="text-gray-400" />
                              <span>Hide from Shared</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50/50 border-t border-gray-100 text-[11px] text-gray-400 font-medium">
              <span>Showing 1-{visibleItems.length} of {visibleItems.length}</span>
              <div className="flex items-center gap-1.5 text-gray-500">
                <span>Rows per page</span>
                <span className="flex items-center gap-1 font-semibold text-gray-700">
                  20 <ChevronDown size={11} />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
