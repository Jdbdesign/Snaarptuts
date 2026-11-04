"use client";

import type { ReactNode } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ProductLogo } from "@/components/icons";
import {
  DRIVE_STORAGE,
  SAMPLE_USER,
  type DrivePage,
  DRIVE_URLS,
} from "./drive-data";
import {
  Home,
  Folder,
  Video,
  Image as ImageIcon,
  Share2,
  Star,
  Trash2,
  Users,
  Bug,
  HardDrive,
  PanelLeftClose,
  Plus,
  Search,
  UserPlus,
  Grid,
  LogOut,
  Sliders,
} from "lucide-react";
import { DriveCreateMenu } from "./DriveCreateMenu";
import { DriveFolderModal } from "./DriveFolderModal";
import { DriveUploadToast } from "./DriveUploadToast";
import { DriveFilePickerModal } from "./DriveFilePickerModal";
import { DriveMarkdownModal } from "./DriveMarkdownModal";
import { DriveMarkdownEditor } from "./DriveMarkdownEditor";
import { DriveTextModal } from "./DriveTextModal";
import { DriveTextEditor } from "./DriveTextEditor";
import { DriveImportModal } from "./DriveImportModal";
import { DriveItemMenu } from "./DriveItemMenu";
import { DriveShareModal } from "./DriveShareModal";
import { DriveShareConfirmModal } from "./DriveShareConfirmModal";
import { DriveLinkSettingsModal } from "./DriveLinkSettingsModal";
import { DriveDeleteModal } from "./DriveDeleteModal";
import { DriveRenameModal } from "./DriveRenameModal";
import { DriveMoveCopyModal } from "./DriveMoveCopyModal";
import { DriveFolderColorModal } from "./DriveFolderColorModal";
import { DriveCopyLinkToast } from "./DriveCopyLinkToast";
import { DriveMoveToast } from "./DriveMoveToast";
import { DriveImportToast } from "./DriveImportToast";
import { DriveLinkSettingsToast } from "./DriveLinkSettingsToast";
import { DriveDeleteToast } from "./DriveDeleteToast";
import { DriveRenameToast } from "./DriveRenameToast";
import { DriveCopyToast } from "./DriveCopyToast";

type Props = {
  tl: Timeline;
  children: ReactNode;
  overlay?: ReactNode;
};

export function DriveShell({ tl, children, overlay }: Props) {
  const page = useTimelineVar<DrivePage>(tl, "drivePage", "home");
  const topToggle = useTimelineVar<"photos" | "files">(tl, "driveTopToggle", page === "photos" ? "photos" : "files");
  const activeNav = useTimelineVar<string>(tl, "driveActiveNav", page);
  const isPhotosMode = page === "photos" || topToggle === "photos";

  const handleNavClick = (target: DrivePage, url: string) => {
    tl.setUrl(url);
    tl.setVar("drivePage", target);
    tl.setVar("driveActiveNav", target);
    tl.setVar("driveTopToggle", target === "photos" ? "photos" : "files");
  };

  const handleTopToggle = (mode: "photos" | "files") => {
    tl.setVar("driveTopToggle", mode);
    if (mode === "photos") {
      tl.setUrl(DRIVE_URLS.photos);
      tl.setVar("drivePage", "photos");
      tl.setVar("driveActiveNav", "photos");
    } else {
      tl.setUrl(DRIVE_URLS.dashboard);
      tl.setVar("drivePage", "home");
      tl.setVar("driveActiveNav", "home");
    }
  };

  return (
    <div
      data-tl="drive-shell"
      data-scroller
      className="relative flex h-full w-full overflow-hidden bg-[#F8F9FA] text-[#111827] font-['Poppins',sans-serif]"
    >
      {/* 1. Thin Suite Rail (Far Left) */}
      <aside
        data-tl="suite-left-rail"
        className="flex h-full w-[60px] shrink-0 flex-col items-center border-r border-[#EBECEF] bg-white py-2 select-none z-30"
      >
        {/* Top Hamburger */}
        <button
          type="button"
          data-tl="btn-suite-hamburger"
          className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] hover:bg-gray-100 transition-colors"
          title="Menu"
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>

        {/* Suite app icons */}
        <div className="flex flex-1 flex-col items-center gap-1.5 overflow-y-auto no-scrollbar w-full px-1">
          <div className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer" title="Mail">
            <ProductLogo name="mail" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">Mail</span>
          </div>

          <div className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer" title="Meets">
            <ProductLogo name="meet" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">Meets</span>
          </div>

          <div className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer" title="Teams">
            <ProductLogo name="teams" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">Teams</span>
          </div>

          <div className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer" title="One Cardx">
            <ProductLogo name="onecard" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90 truncate max-w-[50px]">One Cardx</span>
          </div>

          <div className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer" title="Sheets">
            <ProductLogo name="sheet" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">Sheets</span>
          </div>

          <div className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer" title="Docs">
            <ProductLogo name="docs" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">Docs</span>
          </div>

          <div className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer" title="Slides">
            <ProductLogo name="presentation" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">Slides</span>
          </div>

          <div className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer" title="PDF">
            <ProductLogo name="pdf" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">PDF</span>
          </div>

          <div className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer" title="Lock">
            <ProductLogo name="lock" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">Lock</span>
          </div>

          <div className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer" title="Sign">
            <ProductLogo name="sign" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">Sign</span>
          </div>

          {/* Drive (Active) */}
          <div
            data-tl="suite-app-drive"
            className="flex flex-col items-center p-1.5 rounded-xl bg-[#EDE9FE] ring-1 ring-[#7C3AED]/40 cursor-pointer w-full"
            title="Drive"
          >
            <ProductLogo name="drive" size={22} />
            <span className="text-[9px] font-semibold text-[#7C3AED] mt-0.5 scale-90">Drive</span>
          </div>
        </div>

        {/* Bottom Logout */}
        <div className="mt-auto pt-2 border-t border-gray-100 flex flex-col items-center text-[#6B7280] hover:text-[#111827] cursor-pointer">
          <LogOut size={16} />
          <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">Logout</span>
        </div>
      </aside>

      {/* 2. Inner Drive Sidebar (Visible in Files mode, Hidden in Photos mode) */}
      {!isPhotosMode && (
        <aside
          data-tl="drive-sidebar"
          className="flex h-full w-[220px] shrink-0 flex-col border-r border-[#EBECEF] bg-white select-none z-20"
        >
          {/* Brand Header */}
          <div className="flex h-14 items-center justify-between px-4 border-b border-[#F3F4F6]">
            <div className="flex items-center gap-2">
              <ProductLogo name="drive" size={24} />
              <span className="text-[15px] font-bold tracking-tight text-[#111827]">
                SnaarpDrive
              </span>
            </div>
            <button
              type="button"
              data-tl="btn-sidebar-collapse"
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <PanelLeftClose size={16} />
            </button>
          </div>

          {/* User Profile */}
          <div data-tl="sidebar-user" className="flex items-center gap-2.5 px-4 py-3 border-b border-[#F3F4F6]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5E7EB] text-[#374151] text-xs font-semibold">
              {SAMPLE_USER.avatar}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] font-semibold text-[#111827] truncate">
                {SAMPLE_USER.name}
              </span>
              <span className="text-[10px] text-[#6B7280] truncate">
                {SAMPLE_USER.email}
              </span>
            </div>
          </div>

          {/* + Create or upload Button */}
          <div className="p-3">
            <button
              type="button"
              data-tl="btn-sidebar-create"
              onClick={() => tl.setVar("driveCreateMenuOpen", !tl.getVar("driveCreateMenuOpen", false))}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#7014D9] py-2 px-4 text-[12.5px] font-semibold text-white shadow-xs hover:bg-[#5E10B8] transition-colors cursor-pointer"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Create or upload</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-2 space-y-0.5 text-[12.5px]">
            <button
              type="button"
              data-tl="nav-home"
              onClick={() => handleNavClick("home", DRIVE_URLS.dashboard)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left font-medium transition-colors cursor-pointer ${
                activeNav === "home"
                  ? "bg-[#F3E8FF] text-[#7014D9]"
                  : "text-[#374151] hover:bg-gray-50"
              }`}
            >
              <Home size={16} />
              <span>Home</span>
            </button>

            <button
              type="button"
              data-tl="nav-files"
              onClick={() => handleNavClick("files", DRIVE_URLS.files)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left font-medium transition-colors cursor-pointer ${
                activeNav === "files"
                  ? "bg-[#F3E8FF] text-[#7014D9]"
                  : "text-[#374151] hover:bg-gray-50"
              }`}
            >
              <Folder size={16} />
              <span>My Files</span>
            </button>

            <button
              type="button"
              data-tl="nav-meetings"
              onClick={() => handleNavClick("meetings", DRIVE_URLS.meetings)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left font-medium transition-colors cursor-pointer ${
                activeNav === "meetings"
                  ? "bg-[#F3E8FF] text-[#7014D9]"
                  : "text-[#374151] hover:bg-gray-50"
              }`}
            >
              <Video size={16} />
              <span>Meetings</span>
            </button>

            <button
              type="button"
              data-tl="nav-photos"
              onClick={() => handleNavClick("photos", DRIVE_URLS.photos)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left font-medium transition-colors cursor-pointer ${
                activeNav === "photos"
                  ? "bg-[#F3E8FF] text-[#7014D9]"
                  : "text-[#374151] hover:bg-gray-50"
              }`}
            >
              <ImageIcon size={16} />
              <span>Photos</span>
            </button>

            <button
              type="button"
              data-tl="nav-shared"
              onClick={() => handleNavClick("shared", DRIVE_URLS.shared)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left font-medium transition-colors cursor-pointer ${
                activeNav === "shared"
                  ? "bg-[#F3E8FF] text-[#7014D9]"
                  : "text-[#374151] hover:bg-gray-50"
              }`}
            >
              <Share2 size={16} />
              <span>Shared</span>
            </button>

            <button
              type="button"
              data-tl="nav-favorites"
              onClick={() => handleNavClick("favorites", DRIVE_URLS.favorites)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left font-medium transition-colors cursor-pointer ${
                activeNav === "favorites"
                  ? "bg-[#F3E8FF] text-[#7014D9]"
                  : "text-[#374151] hover:bg-gray-50"
              }`}
            >
              <Star size={16} />
              <span>Favorites</span>
            </button>

            <button
              type="button"
              data-tl="nav-trash"
              onClick={() => handleNavClick("trash", DRIVE_URLS.trash)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left font-medium transition-colors cursor-pointer ${
                activeNav === "trash"
                  ? "bg-[#F3E8FF] text-[#7014D9]"
                  : "text-[#374151] hover:bg-gray-50"
              }`}
            >
              <Trash2 size={16} />
              <span>Recycle Bin</span>
            </button>

            {/* BROWSE FILES BY */}
            <div className="pt-3 pb-1 px-3">
              <span className="text-[10px] font-semibold text-[#9CA3AF] tracking-wider uppercase">
                Browse files by
              </span>
            </div>

            <button
              type="button"
              data-tl="nav-workspaces"
              onClick={() => handleNavClick("workspaces", DRIVE_URLS.workspaces)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left font-medium transition-colors cursor-pointer ${
                activeNav === "workspaces"
                  ? "bg-[#F3E8FF] text-[#7014D9]"
                  : "text-[#374151] hover:bg-gray-50"
              }`}
            >
              <Users size={16} />
              <span>Workspaces</span>
            </button>
          </nav>

          {/* Bottom Sidebar: Report Bug, Admin Panel, Storage */}
          <div className="shrink-0 p-3 space-y-2 border-t border-[#F3F4F6]">
            <button
              type="button"
              data-tl="nav-bug"
              className="flex items-center gap-2 px-1 text-[12px] font-medium text-[#DC2626] hover:text-red-700 transition-colors cursor-pointer"
            >
              <Bug size={15} />
              <span>Report a Bug</span>
            </button>

            <button
              type="button"
              data-tl="nav-admin"
              className="flex w-full items-center gap-2 rounded-xl bg-purple-50 p-2 text-[12px] font-medium text-[#7014D9] hover:bg-purple-100 transition-colors cursor-pointer"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#7014D9] text-white">
                <Sliders size={13} />
              </div>
              <span>Admin Panel</span>
            </button>

            {/* Storage Progress */}
            <div data-tl="storage-widget" className="pt-1">
              <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-[#374151]">
                <HardDrive size={13} className="text-[#6B7280]" />
                <span>Storage</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#7014D9]"
                  style={{ width: `${DRIVE_STORAGE.pct}%` }}
                />
              </div>
              <p className="mt-1 text-[10px] text-[#6B7280]">
                {DRIVE_STORAGE.used} of {DRIVE_STORAGE.total} used ({DRIVE_STORAGE.pct}%)
              </p>
            </div>
          </div>
        </aside>
      )}

      {/* 3. Main Stage Container with Top Bar */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header
          data-tl="drive-topbar"
          className="flex h-14 shrink-0 items-center justify-between border-b border-[#EBECEF] bg-white px-5 select-none z-20"
        >
          {/* Left: Photos | Files pill toggle */}
          <div className="flex items-center gap-3">
            <ProductLogo name="drive" size={24} />

            <div className="flex items-center rounded-full bg-gray-100 p-0.5 text-[12px] font-medium text-gray-600">
              <button
                type="button"
                data-tl="toggle-photos"
                onClick={() => handleTopToggle("photos")}
                className={`rounded-full px-3 py-1 transition-all cursor-pointer ${
                  topToggle === "photos"
                    ? "bg-white text-[#111827] shadow-2xs font-semibold"
                    : "hover:text-[#111827]"
                }`}
              >
                Photos
              </button>
              <button
                type="button"
                data-tl="toggle-files"
                onClick={() => handleTopToggle("files")}
                className={`rounded-full px-3 py-1 transition-all cursor-pointer ${
                  topToggle === "files"
                    ? "bg-white text-[#111827] shadow-2xs font-semibold"
                    : "hover:text-[#111827]"
                }`}
              >
                Files
              </button>
            </div>
          </div>

          {/* Middle: Search Files input */}
          <div className="relative flex items-center w-96">
            <Search size={15} className="absolute left-3.5 text-[#9CA3AF]" />
            <input
              type="text"
              data-tl="top-search-input"
              placeholder={topToggle === "photos" ? "Search your photos" : "Search files..."}
              className="w-full rounded-xl border border-[#E5E7EB] bg-white py-1.5 pl-9 pr-3 text-[12.5px] text-[#111827] placeholder:text-[#9CA3AF] shadow-2xs focus:border-[#7014D9] focus:outline-none"
              readOnly
            />
          </div>

          {/* Right: Add Users, Apps grid, Avatar */}
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              data-tl="top-add-users"
              className="flex flex-col items-center justify-center text-[#6B7280] hover:text-[#7014D9] transition-colors cursor-pointer px-1"
              title="Add Users"
            >
              <UserPlus size={16} />
              <span className="text-[9px] leading-tight mt-0.5">Add Users</span>
            </button>

            <button
              type="button"
              data-tl="top-apps-grid"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4B5563] hover:bg-gray-100 transition-colors cursor-pointer"
              title="Snaarp apps"
            >
              <Grid size={16} />
            </button>

            <div
              data-tl="top-avatar"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5E7EB] text-[#374151] text-xs font-semibold select-none cursor-pointer"
            >
              {SAMPLE_USER.avatar}
            </div>
          </div>
        </header>

        {/* Scrollable Main Workspace */}
        <main
          data-tl="drive-main-content"
          className="relative flex-1 overflow-y-auto no-scrollbar bg-[#F8F9FA] p-6 pb-20"
        >
          {children}
        </main>
      </div>

      {/* Global Dropdowns & Modals (Inside Scroller) */}
      <DriveCreateMenu tl={tl} />
      <DriveFolderModal tl={tl} />
      <DriveUploadToast tl={tl} />
      <DriveFilePickerModal tl={tl} />
      <DriveMarkdownModal tl={tl} />
      <DriveMarkdownEditor tl={tl} />
      <DriveTextModal tl={tl} />
      <DriveTextEditor tl={tl} />
      <DriveImportModal tl={tl} />
      <DriveItemMenu tl={tl} />
      <DriveShareModal tl={tl} />
      <DriveShareConfirmModal tl={tl} />
      <DriveLinkSettingsModal tl={tl} />
      <DriveDeleteModal tl={tl} />
      <DriveRenameModal tl={tl} />
      <DriveMoveCopyModal tl={tl} />
      <DriveFolderColorModal tl={tl} />
      <DriveCopyLinkToast tl={tl} />
      <DriveMoveToast tl={tl} />
      <DriveImportToast tl={tl} />
      <DriveLinkSettingsToast tl={tl} />
      <DriveDeleteToast tl={tl} />
      <DriveRenameToast tl={tl} />
      <DriveCopyToast tl={tl} />
      {overlay}
    </div>
  );
}
