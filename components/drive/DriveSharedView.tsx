"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Share2,
  Folder,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
  Video,
  FileArchive,
  MoreVertical,
  ExternalLink,
  Download,
  Link as LinkIcon,
  EyeOff,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  SHARED_WITH_YOU_ITEMS,
  SHARED_BY_YOU_ITEMS,
  type SharedItem,
} from "./drive-data";

type Props = {
  tl: Timeline;
};

export function DriveSharedView({ tl }: Props) {
  const activeTab = useTimelineVar<"with-you" | "by-you">(tl, "driveSharedTab", "with-you");
  const activeFilter = useTimelineVar<string>(tl, "driveSharedFilter", "All");
  const filterText = useTimelineVar(tl, "field:shared-filter-text", useTimelineVar(tl, "driveSharedFilterText", ""));
  const selectedIds = useTimelineVar<string[]>(tl, "driveSharedSelectedIds", []);
  const rowMenuOpenId = useTimelineVar<string>(tl, "driveSharedRowMenuOpenId", "");
  const hiddenIds = useTimelineVar<string[]>(tl, "driveSharedHiddenIds", []);
  const previewOpen = useTimelineVar(tl, "driveSharedPreviewOpen", false);
  const byYouBudgetSharedWith = useTimelineVar<string>(tl, "driveBudgetSharedWith", "casey.brown@acme.example");
  const byYouQ3Role = useTimelineVar<"Can view" | "Can edit" | "">(tl, "driveQ3Role", "");

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

  const dynamicByYouItems: SharedItem[] = SHARED_BY_YOU_ITEMS.map((it) => {
    if (it.id === "shared-by-1") {
      const perm: "Can view" | "Can edit" = byYouQ3Role === "Can edit" ? "Can edit" : it.permission;
      return {
        ...it,
        permission: perm,
        sharedWith: byYouQ3Role ? `alex.morgan@acme.example (${byYouQ3Role})` : it.sharedWith,
      };
    }
    if (it.id === "shared-by-3") {
      return {
        ...it,
        sharedWith: byYouBudgetSharedWith,
      };
    }
    return it;
  });

  const baseItems = activeTab === "with-you" ? SHARED_WITH_YOU_ITEMS : dynamicByYouItems;

  const visibleItems = baseItems
    .filter((item) => !hiddenIds.includes(item.id))
    .filter((item) => {
      if (activeFilter.toLowerCase() === "all") return true;
      return item.category.toLowerCase() === activeFilter.toLowerCase();
    })
    .filter((item) => {
      if (!filterText.trim()) return true;
      const q = filterText.toLowerCase();
      const person = (item.sharedBy || item.sharedWith || "").toLowerCase();
      return item.name.toLowerCase().includes(q) || person.includes(q);
    });

  const getItemIcon = (item: SharedItem) => {
    if (item.isFolder) {
      return <Folder className="w-4 h-4 text-amber-500 fill-amber-400/50" />;
    }
    switch (item.fileType) {
      case "docx":
        return <FileText className="w-4 h-4 text-blue-600" />;
      case "pdf":
        return <FileText className="w-4 h-4 text-rose-600" />;
      case "pptx":
        return <FileText className="w-4 h-4 text-amber-600" />;
      case "xlsx":
        return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
      case "png":
        return <ImageIcon className="w-4 h-4 text-emerald-600" />;
      case "mp4":
        return <Video className="w-4 h-4 text-rose-600" />;
      case "zip":
        return <FileArchive className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col font-['Poppins',sans-serif]" data-tl="shared-view">
      {/* 1. Tabs directly on page background */}
      <div className="flex items-center gap-8 border-b border-gray-200/80 pb-0">
        <button
          type="button"
          data-tl="tab-shared-with-you"
          onClick={() => {
            tl.setVar("driveSharedTab", "with-you");
            tl.setVar("driveSharedSelectedIds", []);
            tl.setVar("driveSharedRowMenuOpenId", "");
            tl.setUrl("drive.snaarp.com/shared");
          }}
          className={`relative pb-3 text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "with-you"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          With you
        </button>
        <button
          type="button"
          data-tl="tab-shared-by-you"
          onClick={() => {
            tl.setVar("driveSharedTab", "by-you");
            tl.setVar("driveSharedSelectedIds", []);
            tl.setVar("driveSharedRowMenuOpenId", "");
            tl.setUrl("drive.snaarp.com/shared");
          }}
          className={`relative pb-3 text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "by-you"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          By you
        </button>
      </div>

      {/* 2. Filter chips & Search input directly on page background */}
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
                    ? "bg-[#7014D9] text-white shadow-2xs"
                    : "text-gray-600 hover:bg-gray-200/60"
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
            value={filterText}
            onChange={(e) => tl.setVar("driveSharedFilterText", e.target.value)}
            placeholder="Filter by name or person"
            className="w-56 pl-3 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#7014D9] shadow-2xs"
            readOnly
          />
        </div>
      </div>

      {/* 3. Bulk Action Bar (when rows are selected, sits directly above table) */}
      {selectedIds.length > 0 && (
        <div
          data-tl="bar-shared-bulk-actions"
          className="mt-3.5 flex items-center justify-between rounded-xl bg-purple-50/80 border border-purple-100 px-4 py-2 text-xs font-medium text-gray-700 select-none animate-in fade-in duration-150"
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
                tl.setVar("driveSharedHideCount", selectedIds.length);
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

      {/* 4. Table */}
      <div className="mt-3.5 border border-gray-200 rounded-xl bg-white shadow-2xs overflow-visible">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200 rounded-t-xl">
            <tr>
              {/* No select-all checkbox: empty header column for alignment */}
              <th className="py-3 px-4 w-10"></th>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Date Shared</th>
              <th className="py-3 px-4 font-medium">
                {activeTab === "with-you" ? "Shared by" : "Shared with"}
              </th>
              <th className="py-3 px-4 text-right font-medium w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
            {visibleItems.map((item, idx) => {
              const isChecked = selectedIds.includes(item.id);
              const rowHook = activeTab === "with-you"
                ? `row-shared-with-you-${idx + 1}`
                : `row-shared-by-you-${idx + 1}`;

              return (
                <tr
                  key={item.id}
                  data-tl={rowHook}
                  className={`hover:bg-gray-50/70 transition-colors ${
                    isChecked ? "bg-blue-50/50" : ""
                  }`}
                >
                  <td className="py-3.5 px-4 w-10">
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
                      <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                        {getItemIcon(item)}
                      </div>
                      <div>
                        <button
                          type="button"
                          data-tl={item.id === "shared-with-1" ? "link-shared-projectbrief" : `link-shared-item-${idx + 1}`}
                          onClick={() => {
                            if (item.name.includes("Project brief")) {
                              tl.setVar("driveSharedPreviewOpen", true);
                            }
                          }}
                          className="font-semibold text-gray-900 leading-tight text-left hover:text-[#7014D9] transition-colors cursor-pointer"
                        >
                          {item.name}
                        </button>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          {item.permission}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                    {item.dateShared}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    {activeTab === "with-you" ? item.sharedBy : item.sharedWith}
                  </td>
                  <td className="py-3.5 px-4 text-right relative w-10">
                    <div className="relative inline-block text-left">
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
                          className="absolute right-0 top-full mt-1 z-50 w-48 rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl text-[12px] text-left animate-in fade-in duration-100"
                        >
                        <button
                          type="button"
                          data-tl="btn-shared-menu-open"
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
                            tl.setVar("driveShareItemTitle", item.name);
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
                          data-tl="btn-shared-menu-download"
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
                            tl.setVar("driveSharedHideCount", 1);
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
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* 5. Pagination Footer */}
        <div className="flex items-center justify-between py-3 px-4 bg-gray-50/50 border-t border-gray-100 text-[11px] text-gray-500 font-medium select-none">
          <span>
            Showing 1-{visibleItems.length} of {visibleItems.length}
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-gray-500">
              <span>Rows per page</span>
              <span className="flex items-center gap-1 font-semibold text-gray-700 border border-gray-200 rounded px-1.5 py-0.5 bg-white">
                20 <ChevronDown size={11} />
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled
                className="flex h-6 w-6 items-center justify-center rounded border border-gray-200 bg-white text-gray-300 cursor-not-allowed"
              >
                <ChevronLeft size={13} />
              </button>
              <span className="px-1 text-gray-600 font-medium">1 / 1</span>
              <button
                type="button"
                disabled
                className="flex h-6 w-6 items-center justify-center rounded border border-gray-200 bg-white text-gray-300 cursor-not-allowed"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Document Preview Modal */}
      {previewOpen && (
        <div
          data-tl="dialog-shared-preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-150"
          onClick={() => tl.setVar("driveSharedPreviewOpen", false)}
        >
          <div
            className="w-[600px] h-[380px] rounded-2xl bg-white p-6 shadow-2xl flex flex-col font-['Poppins',sans-serif] relative animate-in zoom-in-95 duration-150 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">Project brief.docx</h3>
                  <span className="text-[11px] text-gray-400">Shared by Alex Morgan</span>
                </div>
              </div>
              <button
                type="button"
                data-tl="btn-preview-close"
                onClick={() => tl.setVar("driveSharedPreviewOpen", false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 mt-4 p-5 bg-gray-50/70 rounded-xl overflow-y-auto text-xs text-gray-700 leading-relaxed border border-gray-100">
              <p className="font-bold text-sm mb-2 text-gray-900">Project Brief &amp; Product Deliverables</p>
              <p className="mb-3 text-[11px] text-gray-500 font-medium">Author: Alex Morgan &bull; Updated: Yesterday &bull; Version 1.2</p>
              <p className="text-gray-600 leading-normal">
                This document outlines the core architecture, deliverable milestones, and team assignments for the upcoming cloud release. Please review the timelines before Friday and annotate questions directly in comments.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
