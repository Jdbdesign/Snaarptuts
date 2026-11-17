"use client";

import React from "react";
import { Settings, UserPlus, ChevronDown, Check } from "lucide-react";
import { CURRENT_USER, type UserPresence } from "./teams-data";

interface Props {
  isOpen: boolean;
  isPresenceOpen: boolean;
  presence: UserPresence;
  onTogglePresence: () => void;
  onSelectPresence: (p: UserPresence) => void;
  onOpenSettings: () => void;
  onClose: () => void;
}

export function TeamsAvatarMenu({
  isOpen,
  isPresenceOpen,
  presence,
  onTogglePresence,
  onSelectPresence,
  onOpenSettings,
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      data-tl="teams-avatar-menu"
      className="absolute top-12 right-6 z-50 w-64 bg-white border border-gray-200/80 rounded-2xl shadow-xl p-4 select-none animate-in fade-in-50 zoom-in-95 duration-100"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3">
        <span
          data-tl="avatar-menu-personal"
          className="text-xs font-semibold text-gray-800"
        >
          Personal
        </span>
        <button
          type="button"
          data-tl="avatar-menu-signout"
          className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          Sign out
        </button>
      </div>

      {/* User Info Row */}
      <div className="flex items-center gap-3 py-1">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
          {CURRENT_USER.avatarText}
        </div>
        <div className="min-w-0">
          <h4
            data-tl="avatar-menu-name"
            className="font-bold text-xs text-gray-900 truncate"
          >
            {CURRENT_USER.name}
          </h4>
          <p
            data-tl="avatar-menu-email"
            className="text-[11px] text-gray-400 truncate"
          >
            {CURRENT_USER.email}
          </p>
        </div>
      </div>

      {/* Presence Select Button */}
      <div className="mt-3 relative">
        <button
          type="button"
          data-tl="avatar-presence-btn"
          onClick={onTogglePresence}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-gray-200 hover:border-gray-300 bg-white text-xs text-gray-800 font-medium transition-colors cursor-pointer shadow-xs"
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                presence === "available" ? "bg-emerald-500" : "bg-red-500"
              }`}
            />
            <span className="capitalize">{presence}</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>

        {/* Presence Options Dropdown */}
        {isPresenceOpen ? (
          <div
            data-tl="avatar-presence-list"
            className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-1 z-10 space-y-0.5"
          >
            <button
              type="button"
              data-tl="avatar-presence-available"
              onClick={() => onSelectPresence("available")}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-gray-50 text-xs text-gray-800 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Available</span>
              </div>
              {presence === "available" ? (
                <Check className="w-3.5 h-3.5 text-purple-600" />
              ) : null}
            </button>

            <button
              type="button"
              data-tl="avatar-presence-busy"
              onClick={() => onSelectPresence("busy")}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-gray-50 text-xs text-gray-800 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Busy</span>
              </div>
              {presence === "busy" ? (
                <Check className="w-3.5 h-3.5 text-purple-600" />
              ) : null}
            </button>
          </div>
        ) : null}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-3" />

      {/* Menu Actions */}
      <div className="space-y-1">
        <button
          type="button"
          data-tl="avatar-menu-settings"
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4 text-gray-500 shrink-0" />
          <span>Settings</span>
        </button>

        <button
          type="button"
          data-tl="avatar-menu-add-account"
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-gray-500 shrink-0" />
          <span>Add another account</span>
        </button>
      </div>
    </div>
  );
}
