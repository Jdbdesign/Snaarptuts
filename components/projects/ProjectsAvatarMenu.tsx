"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Settings, LogOut } from "lucide-react";
import { PROJECTS_URLS } from "./projects-data";

interface Props {
  tl: Timeline;
}

export function ProjectsAvatarMenu({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "isAvatarMenuOpen", false);

  if (!isOpen) return null;

  const handleOpenSettings = () => {
    tl.setVar("isAvatarMenuOpen", false);
    tl.setVar("projectsView", "profile");
    tl.setUrl(PROJECTS_URLS.profile);
  };

  const handleClose = () => {
    tl.setVar("isAvatarMenuOpen", false);
  };

  return (
    <>
      <div
        data-tl="avatar-menu-backdrop"
        onClick={handleClose}
        className="fixed inset-0 z-40"
      />
      <div
        data-tl="topbar-avatar-menu"
        className="absolute top-14 right-4 z-50 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 font-sans select-none animate-in fade-in duration-150"
      >
        {/* User Info Header */}
        <div className="px-3 py-2">
          <p
            data-tl="avatar-menu-user-name"
            className="text-xs font-bold text-gray-900 leading-tight"
          >
            Jane Doe
          </p>
          <p
            data-tl="avatar-menu-user-email"
            className="text-[11px] text-gray-400 truncate mt-0.5"
          >
            jane@example.com
          </p>
        </div>

        <div className="h-px bg-gray-100 my-1" />

        {/* Settings Button */}
        <button
          type="button"
          data-tl="avatar-menu-settings"
          onClick={handleOpenSettings}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <Settings className="w-4 h-4 text-gray-500" />
          <span>Settings</span>
        </button>

        <div className="h-px bg-gray-100 my-1" />

        {/* Logout Button */}
        <button
          type="button"
          data-tl="avatar-menu-logout"
          onClick={handleClose}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4 text-red-600" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}
