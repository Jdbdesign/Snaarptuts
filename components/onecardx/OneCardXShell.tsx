"use client";

import type { ReactNode } from "react";
import { Icon, ProductLogo } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ONECARDX_SIDEBAR_GROUPS,
  SAMPLE_ADMIN,
  SUITE_RAIL_ITEMS,
  type OneCardXNavId,
} from "./onecardx-data";

type Props = {
  tl: Timeline;
  activeNav?: OneCardXNavId;
  onNavigateNav?: (id: OneCardXNavId) => void;
  overlay?: ReactNode;
  children: ReactNode;
};

export function OneCardXShell({
  tl,
  activeNav = "home",
  onNavigateNav,
  overlay,
  children,
}: Props) {
  const openPopover = useTimelineVar<"apps" | "avatar" | null>(
    tl,
    "ocxOpenPopover",
    null
  );

  return (
    <div
      data-scroller
      className="relative h-full w-full overflow-hidden bg-[#F8F9FB] text-[#111827] font-['Poppins',sans-serif]"
    >
      <div className="flex h-full w-full">
        {/* 1. Thin far-left Snaarp suite rail */}
        <aside
          data-tl="suite-rail"
          className="relative flex h-full shrink-0 flex-col items-center border-r border-[#E5E7EB] bg-white pt-3 select-none w-[60px]"
        >
          <button
            type="button"
            data-tl="suite-hamburger"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] hover:bg-gray-100 transition-colors"
          >
            <Icon name="menu" size={18} />
          </button>

          <ul className="mt-4 flex min-h-0 flex-col items-center gap-1.5 overflow-y-auto no-scrollbar pb-16">
            {SUITE_RAIL_ITEMS.map((item) => {
              const isActive = item.id === "onecard";
              return (
                <li
                  key={item.id}
                  data-tl={`suite-app-${item.id}`}
                  className={`flex shrink-0 flex-col items-center justify-center rounded-xl transition-all cursor-pointer h-11 w-11 gap-0.5 py-1 ${
                    isActive
                      ? "bg-[#F3E8FF] ring-2 ring-[#7014D9] text-[#7014D9]"
                      : "hover:bg-purple-50 text-[#6B7280]"
                  }`}
                >
                  <ProductLogo name={item.logo} size={20} className="rounded-md" />
                  <span
                    className={`text-[8.5px] font-medium leading-[10px] truncate max-w-[42px] ${
                      isActive ? "text-[#7014D9] font-semibold" : "text-[#6B7280]"
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>

          <div
            data-tl="suite-logout"
            className="absolute bottom-2 flex flex-col items-center bg-white cursor-pointer w-full gap-0.5 pt-1 border-t border-gray-100"
          >
            <Icon name="logout" size={16} className="text-[#4B5563]" />
            <span className="text-[8.5px] font-medium text-[#6B7280]">Logout</span>
          </div>
        </aside>

        {/* 2. OneCardX Sidebar */}
        <aside
          data-tl="ocx-sidebar"
          className="flex h-full shrink-0 flex-col border-r border-[#E5E7EB] bg-white select-none w-[205px]"
        >
          {/* Logo & Header */}
          <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-[#F3F4F6] px-4">
            <ProductLogo name="onecard" size={26} className="rounded-lg shrink-0" />
            <span className="font-semibold text-[15px] tracking-tight text-[#111827]">
              OneCardX
            </span>
          </div>

          {/* Navigation Groups */}
          <nav className="flex-1 overflow-y-auto no-scrollbar py-3 px-2 space-y-4">
            {ONECARDX_SIDEBAR_GROUPS.map((group) => (
              <div key={group.title}>
                <div className="px-3 pb-1 text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase">
                  {group.title}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isSelected = activeNav === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-tl={`nav-${item.id}`}
                        onClick={() => onNavigateNav?.(item.id)}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left ${
                          isSelected
                            ? "bg-[#7014D9] text-white shadow-xs"
                            : "text-[#4B5563] hover:bg-gray-100"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 items-center justify-center ${
                            isSelected ? "text-white" : "text-[#6B7280]"
                          }`}
                        >
                          <Icon name="p360" size={14} />
                        </span>
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom Sidebar Links */}
          <div className="shrink-0 border-t border-[#F3F4F6] p-2 space-y-0.5">
            <button
              type="button"
              data-tl="nav-report-bug"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-[#6B7280] hover:bg-gray-100"
            >
              <Icon name="info" size={14} />
              <span>Report a Bug</span>
            </button>
            <button
              type="button"
              data-tl="nav-admin-panel"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-[#6B7280] hover:bg-gray-100"
            >
              <Icon name="grid4" size={14} />
              <span>Admin Panel</span>
            </button>
          </div>
        </aside>

        {/* 3. Main Stage Container with Top Bar */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top Bar */}
          <header
            data-tl="ocx-topbar"
            className="flex h-14 shrink-0 items-center justify-between border-b border-[#E5E7EB] bg-white px-5 select-none relative z-45"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                {SAMPLE_ADMIN.company}
              </span>
            </div>

            {/* Right Top Bar Actions */}
            <div className="flex items-center gap-3">
              {/* Add Users button */}
              <button
                type="button"
                data-tl="top-add-users"
                className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1 text-xs font-medium text-[#374151] hover:bg-gray-50 transition-colors shadow-2xs"
              >
                <Icon name="plus" size={13} className="text-[#6B7280]" />
                <span>Add Users</span>
              </button>

              {/* 9-dots Apps grid icon */}
              <button
                type="button"
                data-tl="top-apps-grid"
                onClick={() =>
                  tl.setVar("ocxOpenPopover", openPopover === "apps" ? null : "apps")
                }
                className={`flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] transition-colors ${
                  openPopover === "apps"
                    ? "bg-purple-50 text-[#7014D9] border-[#7014D9]"
                    : "bg-white text-[#4B5563] hover:bg-gray-50"
                }`}
                title="Snaarp apps"
              >
                <Icon name="grid4" size={16} />
              </button>

              {/* Avatar menu trigger */}
              <button
                type="button"
                data-tl="top-avatar"
                onClick={() =>
                  tl.setVar("ocxOpenPopover", openPopover === "avatar" ? null : "avatar")
                }
                className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-50 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7014D9] text-xs font-semibold text-white shadow-2xs">
                  {SAMPLE_ADMIN.avatarInitials}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-medium text-[#111827] leading-tight">
                    {SAMPLE_ADMIN.name}
                  </span>
                  <span className="text-[10px] text-[#6B7280] leading-tight">
                    {SAMPLE_ADMIN.role}
                  </span>
                </div>
              </button>
            </div>
          </header>

          {/* Scrollable Main Workspace */}
          <main className="relative flex-1 overflow-y-auto bg-[#F8F9FB] p-6 no-scrollbar">
            {children}
          </main>
        </div>
      </div>

      {/* Popovers */}
      {/* A. Snaarp apps 9-dots popover */}
      {openPopover === "apps" && (
        <div
          data-tl="apps-popover"
          className="absolute top-16 right-16 z-50 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-2">
            <span className="text-xs font-semibold text-gray-900">Snaarp apps</span>
            <button
              type="button"
              data-tl="apps-popover-close"
              onClick={() => tl.setVar("ocxOpenPopover", null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Icon name="x" size={14} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {SUITE_RAIL_ITEMS.map((app) => (
              <div
                key={app.id}
                data-tl={`popover-app-${app.id}`}
                className={`flex flex-col items-center justify-center rounded-xl p-2.5 transition-colors cursor-pointer ${
                  app.id === "onecard"
                    ? "bg-purple-50 ring-1 ring-[#7014D9]"
                    : "hover:bg-gray-50"
                }`}
              >
                <ProductLogo name={app.logo} size={26} className="rounded-lg mb-1" />
                <span className="text-[10px] font-medium text-gray-700 text-center truncate max-w-[64px]">
                  {app.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* B. Avatar Menu Popover */}
      {openPopover === "avatar" && (
        <div
          data-tl="avatar-popover"
          className="absolute top-16 right-4 z-50 w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150 text-xs"
        >
          <div className="border-b border-gray-100 p-2.5">
            <p className="font-semibold text-gray-900">{SAMPLE_ADMIN.name}</p>
            <p className="text-[11px] text-gray-500 truncate">{SAMPLE_ADMIN.email}</p>
            <span className="mt-1 inline-block rounded-md bg-purple-100 px-1.5 py-0.5 text-[9px] font-semibold text-[#7014D9]">
              {SAMPLE_ADMIN.role}
            </span>
          </div>
          <div className="py-1">
            <button
              type="button"
              data-tl="avatar-menu-settings"
              onClick={() => tl.setVar("ocxOpenPopover", null)}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-gray-700 hover:bg-gray-50"
            >
              <Icon name="gear" size={14} />
              <span>Settings</span>
            </button>
            <button
              type="button"
              data-tl="avatar-menu-logout"
              onClick={() => tl.setVar("ocxOpenPopover", null)}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-red-600 hover:bg-red-50"
            >
              <Icon name="logout" size={14} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}

      {/* Dim backdrop when popover is open */}
      {openPopover && (
        <div
          data-tl="popover-backdrop"
          onClick={() => tl.setVar("ocxOpenPopover", null)}
          className="absolute inset-0 z-40 bg-black/5"
        />
      )}

      {/* Additional Overlays (e.g. Modals) */}
      {overlay}
    </div>
  );
}
