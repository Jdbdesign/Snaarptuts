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
  FileCode,
  Users,
  Video,
  Star,
  FileSpreadsheet,
} from "lucide-react";
import {
  FOLDER_ITEMS,
  RECENT_FILES,
  BRAND_LOGOS_FILES,
  VIDEOS_FILES,
  IMAGES_FILES,
  DRIVE_URLS,
} from "./drive-data";

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
  const detailsItem = useTimelineVar<string>(tl, "driveDetailsItem", "My files");

  // Part 2 state variables
  const hasProjectFiles = useTimelineVar(tl, "driveFolderProjectFilesAdded", false);
  const hasBrandLogos = useTimelineVar(tl, "driveFolderBrandLogosAdded", false);
  const insideBrandLogos = useTimelineVar(tl, "driveInsideBrandLogosFolder", false);
  const hasQuarterlyReport = useTimelineVar(tl, "driveFileQuarterlyReportAdded", false);
  const hasMeetingNotes = useTimelineVar(tl, "driveFileMeetingNotesAdded", false);
  const hasSampleTxt = useTimelineVar(tl, "driveFileSampleTxtAdded", false);
  const hasGoogleDriveFiles = useTimelineVar(tl, "driveGoogleDriveFilesImported", false);

  // Part 3 state variables
  const breadcrumbs = useTimelineVar<string[]>(tl, "driveCurrentBreadcrumb", []);
  const workspacesColor = useTimelineVar<string>(tl, "driveWorkspacesFolderColor", "#F59E0B");
  const workspacesTitle = useTimelineVar<string>(tl, "driveFolderWorkspacesTitle", "Workspaces");
  const sampleTxtTitle = useTimelineVar<string>(tl, "driveFileSampleTxtTitle", "Sample.txt");
  const isPinned = useTimelineVar(tl, "driveItemIsPinned", false);
  const isFavorite = useTimelineVar(tl, "driveItemIsFavorite", false);
  const isMoved = useTimelineVar(tl, "driveFileSampleTxtMoved", false);
  const isWorkspacesDeleted = useTimelineVar(tl, "driveFolderWorkspacesDeleted", false);

  const isInsideWorkspaces = breadcrumbs[0] === "Workspaces";
  const currentFolderDepth = breadcrumbs.length;

  return (
    <div
      data-tl="files-view"
      className="relative flex h-full w-full gap-5 font-['Poppins',sans-serif] text-[#111827]"
    >
      {/* Left Workspace */}
      <div className="flex-1 space-y-4">
        {/* Top Header & Toolbar */}
        <div className="flex items-center justify-between">
          {insideBrandLogos ? (
            <div className="flex items-center gap-2 text-[18px] font-bold text-[#111827]">
              <button
                type="button"
                data-tl="breadcrumb-my-files"
                onClick={() => {
                  tl.setVar("driveInsideBrandLogosFolder", false);
                  tl.setUrl(DRIVE_URLS.files);
                }}
                className="hover:text-[#7014D9] transition-colors cursor-pointer"
              >
                My Files
              </button>
              <span className="text-gray-400 font-normal">&gt;</span>
              <span>Brand Logos</span>
            </div>
          ) : isInsideWorkspaces ? (
            <div className="flex items-center gap-2 text-[17px] font-semibold text-[#111827]">
              <button
                type="button"
                data-tl="breadcrumb-my-files"
                onClick={() => {
                  tl.setVar("driveCurrentBreadcrumb", []);
                  tl.setUrl(DRIVE_URLS.files);
                }}
                className="hover:text-[#7014D9] transition-colors cursor-pointer"
              >
                My Files
              </button>
              <span className="text-gray-400 font-normal">&gt;</span>
              <button
                type="button"
                data-tl="breadcrumb-workspaces"
                onClick={() => {
                  tl.setVar("driveCurrentBreadcrumb", ["Workspaces"]);
                  tl.setUrl("drive.snaarp.com/files?folder=workspaces");
                }}
                className={`hover:text-[#7014D9] transition-colors cursor-pointer ${
                  currentFolderDepth === 1 ? "font-bold text-[#111827]" : ""
                }`}
              >
                Workspaces
              </button>

              {currentFolderDepth >= 2 && (
                <>
                  <span className="text-gray-400 font-normal">&gt;</span>
                  <button
                    type="button"
                    data-tl="breadcrumb-social"
                    onClick={() => {
                      tl.setVar("driveCurrentBreadcrumb", ["Workspaces", "Social media Resources"]);
                      tl.setUrl("drive.snaarp.com/files?folder=social-media");
                    }}
                    className={`hover:text-[#7014D9] transition-colors cursor-pointer ${
                      currentFolderDepth === 2 ? "font-bold text-[#111827]" : ""
                    }`}
                  >
                    Social media Resources
                  </button>
                </>
              )}

              {currentFolderDepth >= 3 && (
                <>
                  <span className="text-gray-400 font-normal">&gt;</span>
                  <span className="font-bold text-[#111827]">
                    {breadcrumbs[2]}
                  </span>
                </>
              )}
            </div>
          ) : (
            <h1 className="text-[18px] font-bold text-[#111827]">My Files</h1>
          )}

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
          insideBrandLogos ? (
            /* Inside Brand Logos Folder: 6 SVG files */
            <div data-tl="tiles-view-grid" className="grid grid-cols-6 gap-3.5">
              {BRAND_LOGOS_FILES.map((file) => (
                <div
                  key={file.id}
                  data-tl={`tile-file-${file.id}`}
                  className="relative rounded-2xl border border-[#EBECEF] bg-white p-3 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                >
                  <button
                    type="button"
                    data-tl="btn-tile-menu"
                    className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <MoreVertical size={14} />
                  </button>
                  <div className="flex h-20 w-full items-center justify-center rounded-xl bg-purple-50 text-[#7C3AED] relative">
                    <FileCode size={28} />
                    <span className="absolute bottom-1 right-1 rounded bg-white px-1 py-0.5 text-[9px] font-bold text-[#7C3AED] border border-purple-200">
                      SVG
                    </span>
                  </div>
                  <h4 className="mt-2 text-[11.5px] font-semibold text-[#111827] truncate">
                    {file.name}
                  </h4>
                  <p className="text-[10px] text-[#9CA3AF] mt-0.5">Today</p>
                </div>
              ))}
            </div>
          ) : isInsideWorkspaces ? (
            /* Nested Workspaces hierarchy */
            currentFolderDepth === 1 ? (
              /* Workspaces Root -> Social media Resources folder */
              <div data-tl="tiles-view-grid" className="grid grid-cols-6 gap-3.5">
                <div
                  data-tl="tile-folder-social-media"
                  onClick={() => {
                    tl.setVar("driveCurrentBreadcrumb", ["Workspaces", "Social media Resources"]);
                    tl.setUrl("drive.snaarp.com/files?folder=social-media");
                  }}
                  className="relative rounded-2xl border border-[#EBECEF] bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                >
                  <button
                    type="button"
                    data-tl="btn-tile-menu-social"
                    className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <MoreVertical size={14} />
                  </button>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#F59E0B]">
                      <Folder size={26} fill="#FDE68A" />
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                      <span>2</span>
                      <Users size={10} className="text-gray-500" />
                    </div>
                  </div>
                  <h4 className="mt-3 text-[12.5px] font-semibold text-[#111827] truncate">
                    Social media Resources
                  </h4>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">Today</p>
                </div>
              </div>
            ) : currentFolderDepth === 2 ? (
              /* Social media Resources -> Videos & Images */
              <div data-tl="tiles-view-grid" className="grid grid-cols-6 gap-3.5">
                {/* Videos Folder */}
                <div
                  data-tl="tile-folder-videos"
                  onClick={() => {
                    tl.setVar("driveCurrentBreadcrumb", ["Workspaces", "Social media Resources", "Videos"]);
                    tl.setUrl("drive.snaarp.com/files?folder=videos");
                  }}
                  className="relative rounded-2xl border border-[#EBECEF] bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                >
                  <button
                    type="button"
                    data-tl="btn-tile-menu-videos"
                    className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <MoreVertical size={14} />
                  </button>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#F59E0B]">
                      <Folder size={26} fill="#FDE68A" />
                    </div>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                      6
                    </span>
                  </div>
                  <h4 className="mt-3 text-[12.5px] font-semibold text-[#111827] truncate">
                    Videos
                  </h4>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">Today</p>
                </div>

                {/* Images Folder */}
                <div
                  data-tl="tile-folder-images"
                  onClick={() => {
                    tl.setVar("driveCurrentBreadcrumb", ["Workspaces", "Social media Resources", "Images"]);
                    tl.setUrl("drive.snaarp.com/files?folder=images");
                  }}
                  className="relative rounded-2xl border border-[#EBECEF] bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                >
                  <button
                    type="button"
                    data-tl="btn-tile-menu-images"
                    className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <MoreVertical size={14} />
                  </button>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#F59E0B]">
                      <Folder size={26} fill="#FDE68A" />
                    </div>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                      9
                    </span>
                  </div>
                  <h4 className="mt-3 text-[12.5px] font-semibold text-[#111827] truncate">
                    Images
                  </h4>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">Today</p>
                </div>
              </div>
            ) : breadcrumbs[2] === "Videos" ? (
              /* Videos Folder Content: 6 MP4 Tiles */
              <div data-tl="tiles-view-grid" className="grid grid-cols-6 gap-3.5">
                {VIDEOS_FILES.map((vid) => (
                  <div
                    key={vid.id}
                    data-tl={`tile-video-${vid.id}`}
                    className="relative rounded-2xl border border-[#EBECEF] bg-white p-3 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                  >
                    <button
                      type="button"
                      data-tl="btn-tile-menu"
                      className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <MoreVertical size={14} />
                    </button>
                    <div className="flex h-20 w-full items-center justify-center rounded-xl bg-rose-50 text-[#E11D48] relative">
                      <Video size={28} />
                      <span className="absolute bottom-1 right-1 rounded bg-white px-1 py-0.5 text-[9px] font-bold text-[#E11D48] border border-rose-200">
                        MP4
                      </span>
                    </div>
                    <h4 className="mt-2 text-[11.5px] font-semibold text-[#111827] truncate">
                      {vid.name}
                    </h4>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">Today</p>
                  </div>
                ))}
              </div>
            ) : (
              /* Images Folder Content: 9 PNG Tiles */
              <div data-tl="tiles-view-grid" className="grid grid-cols-6 gap-3.5">
                {IMAGES_FILES.map((img) => (
                  <div
                    key={img.id}
                    data-tl={`tile-image-${img.id}`}
                    className="relative rounded-2xl border border-[#EBECEF] bg-white p-3 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                  >
                    <button
                      type="button"
                      data-tl="btn-tile-menu"
                      className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <MoreVertical size={14} />
                    </button>
                    <div
                      className="flex h-20 w-full items-center justify-center rounded-xl relative"
                      style={{ backgroundColor: img.thumbnailColor ?? "#F3F4F6" }}
                    >
                      <ImageIcon size={26} className="text-gray-600/70" />
                      <span className="absolute bottom-1 right-1 rounded bg-white px-1 py-0.5 text-[9px] font-bold text-gray-600 border border-gray-200">
                        PNG
                      </span>
                    </div>
                    <h4 className="mt-2 text-[11.5px] font-semibold text-[#111827] truncate">
                      {img.name}
                    </h4>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">Today</p>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Root My Files Tiles */
            <div className="space-y-6">
              {/* Pinned Section */}
              {isPinned && !isMoved && (
                <div data-tl="pinned-section" className="space-y-3">
                  <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                    PINNED
                  </span>
                  <div className="grid grid-cols-6 gap-3.5">
                    {/* Sample.txt tile (Pinned) */}
                    <div
                      data-tl="tile-file-sample-txt"
                      className="relative rounded-2xl border border-[#EBECEF] bg-white p-3 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                    >
                      <button
                        type="button"
                        data-tl="btn-tile-menu-sample-txt"
                        onClick={(e) => {
                          e.stopPropagation();
                          tl.setVar("driveItemMenuType", "file");
                          tl.setVar("driveItemMenuName", sampleTxtTitle);
                          tl.setVar("driveItemMenuCoords", { top: 180, left: 240 });
                          tl.setVar("driveItemMenuOpen", true);
                        }}
                        className="absolute right-2 top-2 z-10 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <MoreVertical size={14} />
                      </button>
                      <div className="flex h-20 w-full items-center justify-center rounded-xl bg-rose-50 text-[#E11D48] relative">
                        <FileText size={28} />
                        <span className="absolute bottom-1 right-1 rounded bg-white px-1 py-0.5 text-[9px] font-bold text-[#E11D48] border border-rose-200">
                          TXT
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <h4 className="text-[11.5px] font-semibold text-[#111827] truncate">
                          {sampleTxtTitle}
                        </h4>
                        {isFavorite && (
                          <Star size={12} className="text-amber-500 fill-amber-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5">Today</p>
                    </div>
                  </div>
                </div>
              )}

              {/* All Items Section */}
              <div className="space-y-3">
                {isPinned && (
                  <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                    ALL ITEMS
                  </span>
                )}

                <div data-tl="tiles-view-grid" className="grid grid-cols-6 gap-3.5">
                  {/* Folder: Workspaces */}
                  {!isWorkspacesDeleted && (
                    <div
                      data-tl="tile-folder-workspaces"
                      onClick={() => {
                        tl.setVar("driveCurrentBreadcrumb", ["Workspaces"]);
                        tl.setUrl("drive.snaarp.com/files?folder=workspaces");
                      }}
                      className={`relative rounded-2xl border bg-white p-3.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer ${
                        workspacesColor === "#A855F7"
                          ? "border-purple-200"
                          : "border-[#EBECEF]"
                      }`}
                    >
                      {/* Checkbox top-left */}
                      <input
                        type="checkbox"
                        data-tl="checkbox-folder-workspaces"
                        className="absolute left-2.5 top-2.5 rounded text-[#7014D9] focus:ring-0 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                        readOnly
                      />

                      {/* Three-dot menu button top-right */}
                      <button
                        type="button"
                        data-tl="btn-tile-menu-workspaces"
                        onClick={(e) => {
                          e.stopPropagation();
                          tl.setVar("driveItemMenuType", "folder");
                          tl.setVar("driveItemMenuName", "Workspaces");
                          tl.setVar("driveItemMenuCoords", { top: 140, left: 450 });
                          tl.setVar("driveItemMenuOpen", true);
                        }}
                        className="absolute right-2.5 top-2.5 z-10 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <MoreVertical size={14} />
                      </button>

                      <div className="flex items-start justify-between mt-3">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-xl"
                          style={{
                            backgroundColor:
                              workspacesColor === "#A855F7" ? "#F3E8FF" : "#FEF3C7",
                            color: workspacesColor,
                          }}
                        >
                          <Folder
                            size={26}
                            fill={workspacesColor === "#A855F7" ? "#A855F7" : "#FDE68A"}
                          />
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                          <span>1</span>
                          <Users size={10} className="text-gray-500" />
                        </div>
                      </div>
                      <h4 className="mt-3 text-[12.5px] font-semibold text-[#111827] truncate">
                        {workspacesTitle}
                      </h4>
                      <p className="text-[11px] text-[#9CA3AF] mt-0.5">Today</p>
                    </div>
                  )}

                  {/* Folder: Brand Logos */}
                  {hasBrandLogos && (
                    <div
                      data-tl="tile-folder-brand-logos"
                      onClick={() => {
                        tl.setVar("driveInsideBrandLogosFolder", true);
                        tl.setUrl("drive.snaarp.com/files?folder=brand-logos");
                      }}
                      className="relative rounded-2xl border border-[#EBECEF] bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#F59E0B]">
                          <Folder size={26} fill="#FDE68A" />
                        </div>
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                          6
                        </span>
                      </div>
                      <h4 className="mt-3 text-[12.5px] font-semibold text-[#111827] truncate">
                        Brand Logos
                      </h4>
                      <p className="text-[11px] text-[#9CA3AF] mt-0.5">Today</p>
                    </div>
                  )}

                  {/* Folder: Project Files (RED) */}
                  {hasProjectFiles && (
                    <div
                      data-tl="tile-folder-project-files"
                      className="relative rounded-2xl border border-[#EBECEF] bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#EF4444]">
                          <Folder size={26} fill="#EF4444" />
                        </div>
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                          0
                        </span>
                      </div>
                      <h4 className="mt-3 text-[12.5px] font-semibold text-[#111827] truncate">
                        Project Files
                      </h4>
                      <p className="text-[11px] text-[#9CA3AF] mt-0.5">Today</p>
                    </div>
                  )}

                  {/* Snaarp product logos */}
                  <div
                    data-tl="tile-folder-products"
                    className="relative rounded-2xl border border-[#EBECEF] bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#F59E0B]">
                        <Folder size={26} fill="#FDE68A" />
                      </div>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                        0
                      </span>
                    </div>
                    <h4 className="mt-3 text-[12.5px] font-semibold text-[#111827] truncate">
                      Snaarp product logos
                    </h4>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">Aug 6</p>
                  </div>

                  {/* Snaarp Icons */}
                  <div
                    data-tl="tile-folder-icons"
                    className="relative rounded-2xl border border-[#EBECEF] bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#F59E0B]">
                        <Folder size={26} fill="#FDE68A" />
                      </div>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                        2
                      </span>
                    </div>
                    <h4 className="mt-3 text-[12.5px] font-semibold text-[#111827] truncate">
                      Snaarp Icons
                    </h4>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">Aug 6</p>
                  </div>

                  {/* Sample.txt tile (when NOT pinned and NOT moved) */}
                  {hasSampleTxt && !isPinned && !isMoved && (
                    <div
                      data-tl="tile-file-sample-txt"
                      className="relative rounded-2xl border border-[#EBECEF] bg-white p-3 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                    >
                      <button
                        type="button"
                        data-tl="btn-tile-menu-sample-txt"
                        onClick={(e) => {
                          e.stopPropagation();
                          tl.setVar("driveItemMenuType", "file");
                          tl.setVar("driveItemMenuName", sampleTxtTitle);
                          tl.setVar("driveItemMenuCoords", { top: 180, left: 450 });
                          tl.setVar("driveItemMenuOpen", true);
                        }}
                        className="absolute right-2 top-2 z-10 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <MoreVertical size={14} />
                      </button>
                      <div className="flex h-20 w-full items-center justify-center rounded-xl bg-rose-50 text-[#E11D48] relative">
                        <FileText size={28} />
                        <span className="absolute bottom-1 right-1 rounded bg-white px-1 py-0.5 text-[9px] font-bold text-[#E11D48] border border-rose-200">
                          TXT
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <h4 className="text-[11.5px] font-semibold text-[#111827] truncate">
                          {sampleTxtTitle}
                        </h4>
                        {isFavorite && (
                          <Star size={12} className="text-amber-500 fill-amber-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5">Today</p>
                    </div>
                  )}

                  {/* Meeting notes.md tile */}
                  {hasMeetingNotes && (
                    <div
                      data-tl="tile-file-meeting-notes"
                      className="relative rounded-2xl border border-[#EBECEF] bg-white p-3 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                    >
                      <button
                        type="button"
                        data-tl="btn-tile-menu"
                        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <MoreVertical size={14} />
                      </button>
                      <div className="flex h-20 w-full items-center justify-center rounded-xl bg-pink-50 text-[#DB2777] relative">
                        <FileCode size={28} />
                        <span className="absolute bottom-1 right-1 rounded bg-white px-1 py-0.5 text-[9px] font-bold text-[#DB2777] border border-pink-200">
                          MD
                        </span>
                      </div>
                      <h4 className="mt-2 text-[11.5px] font-semibold text-[#111827] truncate">
                        Meeting notes.md
                      </h4>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5">Today</p>
                    </div>
                  )}

                  {/* Quarterly report.png tile */}
                  {hasQuarterlyReport && (
                    <div
                      data-tl="tile-file-quarterly-report"
                      className="relative rounded-2xl border border-[#EBECEF] bg-white p-3 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                    >
                      <button
                        type="button"
                        data-tl="btn-tile-menu"
                        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <MoreVertical size={14} />
                      </button>
                      <div className="flex h-20 w-full items-center justify-center rounded-xl bg-blue-100">
                        <ImageIcon size={28} className="text-[#2563EB]" />
                      </div>
                      <h4 className="mt-2 text-[11.5px] font-semibold text-[#111827] truncate">
                        Quarterly report.png
                      </h4>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5">Today</p>
                    </div>
                  )}

                  {/* Google Drive imported files */}
                  {hasGoogleDriveFiles && (
                    <>
                      <div
                        data-tl="tile-file-imported-budget"
                        className="relative rounded-2xl border border-[#EBECEF] bg-white p-3 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                      >
                        <button
                          type="button"
                          data-tl="btn-tile-menu"
                          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          <MoreVertical size={14} />
                        </button>
                        <div className="flex h-20 w-full items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 relative">
                          <FileSpreadsheet size={28} />
                          <span className="absolute bottom-1 right-1 rounded bg-white px-1 py-0.5 text-[9px] font-bold text-emerald-600 border border-emerald-200">
                            XLSX
                          </span>
                        </div>
                        <h4 className="mt-2 text-[11.5px] font-semibold text-[#111827] truncate">
                          Budget.xlsx
                        </h4>
                        <p className="text-[10px] text-[#9CA3AF] mt-0.5">Google Drive</p>
                      </div>

                      <div
                        data-tl="tile-file-imported-roadmap"
                        className="relative rounded-2xl border border-[#EBECEF] bg-white p-3 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                      >
                        <button
                          type="button"
                          data-tl="btn-tile-menu"
                          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          <MoreVertical size={14} />
                        </button>
                        <div className="flex h-20 w-full items-center justify-center rounded-xl bg-orange-50 text-orange-600 relative">
                          <FileText size={28} />
                          <span className="absolute bottom-1 right-1 rounded bg-white px-1 py-0.5 text-[9px] font-bold text-orange-600 border border-orange-200">
                            PPTX
                          </span>
                        </div>
                        <h4 className="mt-2 text-[11.5px] font-semibold text-[#111827] truncate">
                          Roadmap.pptx
                        </h4>
                        <p className="text-[10px] text-[#9CA3AF] mt-0.5">Google Drive</p>
                      </div>

                      <div
                        data-tl="tile-file-imported-q3report"
                        className="relative rounded-2xl border border-[#EBECEF] bg-white p-3 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                      >
                        <button
                          type="button"
                          data-tl="btn-tile-menu"
                          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          <MoreVertical size={14} />
                        </button>
                        <div className="flex h-20 w-full items-center justify-center rounded-xl bg-rose-50 text-rose-600 relative">
                          <FileText size={28} />
                          <span className="absolute bottom-1 right-1 rounded bg-white px-1 py-0.5 text-[9px] font-bold text-rose-600 border border-rose-200">
                            PDF
                          </span>
                        </div>
                        <h4 className="mt-2 text-[11.5px] font-semibold text-[#111827] truncate">
                          Q3 report.pdf
                        </h4>
                        <p className="text-[10px] text-[#9CA3AF] mt-0.5">Google Drive</p>
                      </div>
                    </>
                  )}

                  {/* Regular image files */}
                  {RECENT_FILES.slice(0, 10).map((file) => (
                    <div
                      key={file.id}
                      data-tl={`tile-file-${file.id}`}
                      className="relative rounded-2xl border border-[#EBECEF] bg-white p-3 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                    >
                      <button
                        type="button"
                        data-tl="btn-tile-menu"
                        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 cursor-pointer"
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
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5">Today</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
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
          className="w-72 shrink-0 rounded-2xl border border-[#EBECEF] bg-white p-4 shadow-sm animate-in slide-in-from-right duration-150 text-[12.5px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="font-bold text-[14px] text-[#111827]">Details</span>
            <button
              type="button"
              data-tl="btn-details-close"
              onClick={() => tl.setVar("driveDetailsOpen", false)}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {detailsItem === "Workspaces" ? (
            /* Workspaces Folder Properties */
            <div className="pt-3 space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor:
                      workspacesColor === "#A855F7" ? "#F3E8FF" : "#FEF3C7",
                    color: workspacesColor,
                  }}
                >
                  <Folder
                    size={22}
                    fill={workspacesColor === "#A855F7" ? "#A855F7" : "#FDE68A"}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-[13.5px] text-[#111827]">Workspaces</h3>
                  <p className="text-[11px] text-gray-400">Folder</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2.5 text-[12px]">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Items</span>
                  <span className="font-medium text-[#111827]">1 items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Size</span>
                  <span className="font-medium text-[#111827]">0 B</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Color</span>
                  <span className="font-medium text-[#111827]">
                    {workspacesColor === "#A855F7" ? "purple" : "amber"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Created</span>
                  <span className="font-medium text-[#111827]">Nov 3, 2026, 04:05 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Modified</span>
                  <span className="font-medium text-[#111827]">Nov 4, 2026, 02:12 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Owner</span>
                  <span className="font-medium text-[#111827]">Sam Taylor</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Path</span>
                  <span className="font-medium text-[#111827]">/</span>
                </div>
              </div>
            </div>
          ) : (
            /* Default My Files Activity */
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
          )}
        </div>
      )}
    </div>
  );
}
