"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Plus,
  ArrowUpDown,
  LayoutList,
  PanelRight,
  Check,
  Folder,
  Image as ImageIcon,
  MoreVertical,
  X,
  FileText,
  Loader2,
  Grid,
} from "lucide-react";
import { FOLDER_ITEMS, RECENT_FILES } from "./drive-data";

type Props = {
  tl: Timeline;
};

export function DriveFilesView({ tl }: Props) {
  const viewMode = useTimelineVar<"list" | "compact" | "tiles">(tl, "driveFilesViewMode", "list");
  const sortMenuOpen = useTimelineVar(tl, "driveSortMenuOpen", false);
  const sortBy = useTimelineVar<string>(tl, "driveSortBy", "modified");
  const sortOrder = useTimelineVar<string>(tl, "driveSortOrder", "newest");
  const viewMenuOpen = useTimelineVar(tl, "driveViewMenuOpen", false);
  const detailsOpen = useTimelineVar(tl, "driveDetailsOpen", false);
  const detailsLoading = useTimelineVar(tl, "driveDetailsLoading", false);

  return (
    <div
      data-tl="files-view"
      className="relative flex h-full w-full gap-5 font-['Poppins',sans-serif] text-[#111827]"
    >
      {/* Left Workspace */}
      <div className="flex-1 space-y-4">
        {/* Top Header & Toolbar */}
        <div className="flex items-center justify-between">
          <h1 className="text-[18px] font-bold text-[#111827]">My Files</h1>

          <div className="flex items-center gap-2.5">
            {/* + Create or upload */}
            <button
              type="button"
              data-tl="btn-files-create"
              onClick={() => tl.setVar("driveCreateMenuOpen", !tl.getVar("driveCreateMenuOpen", false))}
              className="flex items-center gap-1.5 rounded-full bg-[#7014D9] px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-xs hover:bg-[#5E10B8] transition-colors cursor-pointer"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>Create or upload</span>
            </button>

            {/* Sort Control */}
            <div className="relative">
              <button
                type="button"
                data-tl="btn-files-sort"
                onClick={() => tl.setVar("driveSortMenuOpen", !sortMenuOpen)}
                className="flex items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12px] font-medium text-[#4B5563] shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <ArrowUpDown size={13} className="text-gray-400" />
                <span>Modified: Newest first</span>
                <span className="text-gray-400">⌄</span>
              </button>

              {/* Sort Menu Popover */}
              {sortMenuOpen && (
                <div
                  data-tl="sort-dropdown-menu"
                  className="absolute right-0 top-10 z-50 w-52 rounded-2xl border border-gray-200 bg-white py-2 shadow-xl text-[12.5px] animate-in fade-in zoom-in-95 duration-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    data-tl="sort-opt-type"
                    onClick={() => tl.setVar("driveSortBy", "type")}
                    className="flex w-full items-center justify-between px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <span>Type</span>
                    {sortBy === "type" && <Check size={14} className="text-[#7014D9]" />}
                  </button>

                  <button
                    type="button"
                    data-tl="sort-opt-name"
                    onClick={() => tl.setVar("driveSortBy", "name")}
                    className="flex w-full items-center justify-between px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <span>Name</span>
                    {sortBy === "name" && <Check size={14} className="text-[#7014D9]" />}
                  </button>

                  <button
                    type="button"
                    data-tl="sort-opt-modified"
                    onClick={() => tl.setVar("driveSortBy", "modified")}
                    className="flex w-full items-center justify-between px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <span className="font-medium text-[#7014D9]">Modified</span>
                    {sortBy === "modified" && <Check size={14} className="text-[#7014D9]" />}
                  </button>

                  <button
                    type="button"
                    data-tl="sort-opt-size"
                    onClick={() => tl.setVar("driveSortBy", "size")}
                    className="flex w-full items-center justify-between px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <span>File size</span>
                    {sortBy === "size" && <Check size={14} className="text-[#7014D9]" />}
                  </button>

                  <div className="my-1.5 border-t border-gray-100" />

                  <button
                    type="button"
                    data-tl="sort-opt-oldest"
                    onClick={() => tl.setVar("driveSortOrder", "oldest")}
                    className="flex w-full items-center justify-between px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <span>Oldest first</span>
                    {sortOrder === "oldest" && <Check size={14} className="text-[#7014D9]" />}
                  </button>

                  <button
                    type="button"
                    data-tl="sort-opt-newest"
                    onClick={() => tl.setVar("driveSortOrder", "newest")}
                    className="flex w-full items-center justify-between px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <span className="font-medium text-[#7014D9]">Newest first</span>
                    {sortOrder === "newest" && <Check size={14} className="text-[#7014D9]" />}
                  </button>

                  <div className="my-1.5 border-t border-gray-100" />

                  <p className="px-3.5 py-1 text-[10.5px] text-[#9CA3AF] leading-tight">
                    Folders first; pinned items lead each group.
                  </p>
                </div>
              )}
            </div>

            {/* View Control */}
            <div className="relative">
              <button
                type="button"
                data-tl="btn-files-view-toggle"
                onClick={() => tl.setVar("driveViewMenuOpen", !viewMenuOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#4B5563] shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
                title="View options"
              >
                {viewMode === "tiles" ? <Grid size={15} /> : <LayoutList size={15} />}
              </button>

              {/* View Menu Popover */}
              {viewMenuOpen && (
                <div
                  data-tl="menu-files-view"
                  className="absolute right-0 top-10 z-50 w-44 rounded-2xl border border-gray-200 bg-white py-1.5 shadow-xl text-[12.5px] animate-in fade-in zoom-in-95 duration-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    data-tl="view-opt-list"
                    onClick={() => {
                      tl.setVar("driveFilesViewMode", "list");
                      tl.setVar("driveViewMenuOpen", false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <LayoutList size={15} className="text-gray-500" />
                    <span>List</span>
                    {viewMode === "list" && <Check size={14} className="ml-auto text-[#7014D9]" />}
                  </button>

                  <button
                    type="button"
                    data-tl="view-opt-compact"
                    onClick={() => {
                      tl.setVar("driveFilesViewMode", "compact");
                      tl.setVar("driveViewMenuOpen", false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <div className="flex flex-col gap-0.5 w-3.5">
                      <div className="h-0.5 bg-gray-500 rounded" />
                      <div className="h-0.5 bg-gray-500 rounded" />
                      <div className="h-0.5 bg-gray-500 rounded" />
                    </div>
                    <span>Compact List</span>
                    {viewMode === "compact" && <Check size={14} className="ml-auto text-[#7014D9]" />}
                  </button>

                  <button
                    type="button"
                    data-tl="view-opt-tiles"
                    onClick={() => {
                      tl.setVar("driveFilesViewMode", "tiles");
                      tl.setVar("driveViewMenuOpen", false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <Grid size={15} className="text-gray-500" />
                    <span>Tiles</span>
                    {viewMode === "tiles" && <Check size={14} className="ml-auto text-[#7014D9]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Details Button */}
            <button
              type="button"
              data-tl="btn-files-details"
              onClick={() => tl.setVar("driveDetailsOpen", !detailsOpen)}
              className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12px] font-medium text-[#4B5563] shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <PanelRight size={14} />
              <span>Details</span>
            </button>
          </div>
        </div>

        {/* View Mode: Tiles */}
        {viewMode === "tiles" ? (
          <div data-tl="tiles-view-grid" className="grid grid-cols-5 gap-3.5">
            {/* Folders */}
            {FOLDER_ITEMS.slice(0, 2).map((folder) => (
              <div
                key={folder.id}
                data-tl={`tile-folder-${folder.id}`}
                className="relative rounded-2xl border border-[#EBECEF] bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#F59E0B]">
                    <Folder size={26} fill="#FDE68A" />
                  </div>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                    {folder.folderItems}
                  </span>
                </div>
                <h4 className="mt-3 text-[12.5px] font-semibold text-[#111827] truncate">
                  {folder.name}
                </h4>
                <p className="text-[11px] text-[#9CA3AF] mt-0.5">Aug 6</p>
              </div>
            ))}

            {/* Files */}
            {RECENT_FILES.slice(0, 13).map((file) => (
              <div
                key={file.id}
                data-tl={`tile-file-${file.id}`}
                className="relative rounded-2xl border border-[#EBECEF] bg-white p-3 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
              >
                <button
                  type="button"
                  data-tl="btn-tile-menu"
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                >
                  <MoreVertical size={14} />
                </button>
                <div
                  className="flex h-20 w-full items-center justify-center rounded-xl"
                  style={{ backgroundColor: file.thumbnailColor ?? "#F3F4F6" }}
                >
                  <ImageIcon size={28} className="text-gray-600/70" />
                </div>
                <h4 className="mt-2 text-[11.5px] font-semibold text-[#111827] truncate">
                  {file.name}
                </h4>
                <p className="text-[10px] text-[#9CA3AF] mt-0.5">-1 days ago</p>
              </div>
            ))}
          </div>
        ) : (
          /* View Mode: List or Compact List */
          <div className="rounded-2xl border border-[#EBECEF] bg-white overflow-hidden shadow-2xs">
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="border-b border-[#F3F4F6] text-[11.5px] font-semibold text-[#6B7280]">
                  <th className="py-2.5 px-4 w-8">
                    <input type="checkbox" className="rounded" readOnly />
                  </th>
                  <th className="py-2.5 px-4 font-medium">Name</th>
                  <th className="py-2.5 px-4 font-medium">Modified</th>
                  <th className="py-2.5 px-4 font-medium">File size</th>
                  <th className="py-2.5 px-4 font-medium">Sharing</th>
                  <th className="py-2.5 px-4 w-8" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {/* Folders */}
                {FOLDER_ITEMS.map((folder) => (
                  <tr
                    key={folder.id}
                    data-tl={`row-folder-${folder.id}`}
                    className="hover:bg-purple-50/30 transition-colors"
                  >
                    <td className="py-2.5 px-4">
                      <input type="checkbox" className="rounded" readOnly />
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <Folder size={16} className="text-[#F59E0B] fill-[#FEF3C7]" />
                        <span className="font-semibold text-[#111827]">
                          {folder.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-[#4B5563]">
                      {folder.modified}
                    </td>
                    <td className="py-2.5 px-4 text-[#4B5563]">
                      {folder.size}
                    </td>
                    <td className="py-2.5 px-4 text-[#4B5563]">
                      {folder.sharing}
                    </td>
                    <td className="py-2.5 px-4 text-gray-400">
                      <button type="button" data-tl="btn-file-menu" className="hover:text-gray-600">
                        <MoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Files */}
                {RECENT_FILES.map((file) => (
                  <tr
                    key={file.id}
                    data-tl={`row-file-${file.id}`}
                    className={`hover:bg-purple-50/30 transition-colors ${
                      viewMode === "compact" ? "py-1.5" : "py-2.5"
                    }`}
                  >
                    <td className="py-2 px-4">
                      <input type="checkbox" className="rounded" readOnly />
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs"
                          style={{ backgroundColor: file.thumbnailColor ?? "#F3F4F6" }}
                        >
                          <ImageIcon size={13} className="text-gray-700" />
                        </div>
                        <span className="font-semibold text-[#111827]">
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-[#4B5563]">
                      {file.modified}
                    </td>
                    <td className="py-2 px-4 text-[#4B5563]">
                      {file.size}
                    </td>
                    <td className="py-2 px-4 text-[#4B5563]">
                      {file.sharing}
                    </td>
                    <td className="py-2 px-4 text-gray-400">
                      <button type="button" data-tl="btn-file-menu" className="hover:text-gray-600">
                        <MoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Right Details Panel */}
      {detailsOpen && (
        <div
          data-tl="details-drawer"
          className="w-72 shrink-0 rounded-2xl border border-[#EBECEF] bg-white p-4 shadow-sm animate-in slide-in-from-right duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Folder size={18} className="text-[#F59E0B] fill-[#FEF3C7]" />
              <span className="font-bold text-[14px] text-[#111827]">My files</span>
            </div>
            <button
              type="button"
              data-tl="btn-details-close"
              onClick={() => tl.setVar("driveDetailsOpen", false)}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Activity Section */}
          <div className="pt-3 space-y-3">
            <h3 className="text-[13px] font-bold text-[#111827]">Activity</h3>

            {detailsLoading ? (
              <div className="flex h-40 flex-col items-center justify-center gap-2 text-center text-[12px] text-gray-400">
                <Loader2 size={20} className="animate-spin text-[#7014D9]" />
                <span>Loading activity...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-[11px] font-semibold text-[#9CA3AF] uppercase">
                  Today
                </span>

                <div className="space-y-2.5">
                  {RECENT_FILES.slice(0, 7).map((file) => (
                    <div key={file.id} className="flex items-start gap-2.5 text-[11.5px]">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-gray-100 text-gray-500">
                        <FileText size={12} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[#111827] leading-snug">
                          <span className="text-gray-500">You updated </span>
                          <span className="font-medium truncate block">{file.name}</span>
                        </p>
                        <span className="text-[10px] text-[#9CA3AF]">
                          Tue at 4:03 PM
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
