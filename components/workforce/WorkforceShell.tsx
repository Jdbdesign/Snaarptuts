"use client";

import type { ReactNode } from "react";
import { Icon, ProductLogo } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  NOTIFICATIONS_LIST,
  SAMPLE_EMPLOYEE,
  SUITE_RAIL_ITEMS,
  WORKFORCE_NAV_ITEMS,
  type MySpaceSubId,
  type WorkforceNavId,
} from "./workforce-data";

type Props = {
  tl: Timeline;
  title?: string;
  subtitle?: string;
  activeNav?: WorkforceNavId;
  activeSub?: MySpaceSubId;
  onNavigateNav?: (id: WorkforceNavId) => void;
  onNavigateSub?: (id: MySpaceSubId) => void;
  overlay?: ReactNode;
  children: ReactNode;
};

export function WorkforceShell({
  tl,
  title = "Dashboard",
  subtitle,
  activeNav = "dashboard",
  activeSub,
  onNavigateNav,
  onNavigateSub,
  overlay,
  children,
}: Props) {
  // Scene variables for dynamic state
  const sidebarCollapsed = useTimelineVar(tl, "wfSidebarCollapsed", false);
  const mySpaceExpanded = useTimelineVar(tl, "wfMySpaceExpanded", activeNav === "my-space" || !!activeSub);
  const openPopover = useTimelineVar<"notifications" | "apps" | "avatar" | null>(
    tl,
    "wfOpenPopover",
    null
  );
  const unreadCount = useTimelineVar(tl, "wfUnreadCount", 1);

  return (
    <div data-scroller className="relative h-full w-full overflow-hidden bg-[#F8F9FB] text-[#111827] font-['Poppins',sans-serif]">
      <div className="flex h-full w-full">
        {/* 1. Thin far-left Snaarp suite rail */}
        <aside
          data-tl="suite-rail"
          className="relative flex h-full shrink-0 flex-col items-center border-r border-[#E5E7EB] bg-white pt-4 select-none w-[62px]"
        >
          <button
            type="button"
            data-tl="suite-hamburger"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] hover:bg-gray-100 transition-colors"
          >
            <Icon name="menu" size={20} />
          </button>

          <ul className="mt-5 flex min-h-0 flex-col items-center gap-2 overflow-y-auto no-scrollbar pb-16">
            {SUITE_RAIL_ITEMS.map((item) => (
              <li
                key={item.id}
                data-tl={`suite-app-${item.id}`}
                className="flex shrink-0 flex-col items-center justify-center rounded-xl transition-all cursor-pointer h-11 w-12 gap-1 py-1 hover:bg-purple-50"
              >
                <ProductLogo name={item.logo} size={22} className="rounded-md" />
                <span className="text-[9px] font-medium leading-[11px] text-[#6B7280]">{item.label}</span>
              </li>
            ))}
          </ul>

          <div
            data-tl="suite-logout"
            className="absolute bottom-3 flex flex-col items-center bg-white cursor-pointer w-full gap-1 pt-1"
          >
            <Icon name="logout" size={18} className="text-[#4B5563]" />
            <span className="text-[9px] font-medium text-[#6B7280]">Logout</span>
          </div>
        </aside>

        {/* 2. Workforce sidebar */}
        <aside
          data-tl="wf-sidebar"
          className={`flex h-full shrink-0 flex-col border-r border-[#E5E7EB] bg-white transition-all duration-200 select-none ${
            sidebarCollapsed ? "w-[64px]" : "w-[220px]"
          }`}
        >
          {/* Logo & collapse header */}
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#F3F4F6] px-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <ProductLogo name="workforce" size={sidebarCollapsed ? 26 : 28} className="rounded-lg shrink-0" />
              {!sidebarCollapsed && (
                <span className="font-semibold text-base tracking-tight text-[#111827]">Workforce</span>
              )}
            </div>
            <button
              type="button"
              data-tl="wf-collapse-btn"
              onClick={() => tl.setVar("wfSidebarCollapsed", !sidebarCollapsed)}
              className="flex h-7 w-7 items-center justify-center rounded-md text-[#6B7280] hover:bg-gray-100 transition-colors"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Icon name={sidebarCollapsed ? "wfExpand" : "wfCollapse"} size={16} />
            </button>
          </div>

          {/* Navigation items list */}
          <div className="flex-1 overflow-y-auto no-scrollbar py-3 px-2 flex flex-col justify-between">
            <div>
              {!sidebarCollapsed && (
                <div className="px-3 pb-2 pt-1 text-[10px] font-semibold tracking-wider text-[#9CA3AF]">
                  WORKSPACE
                </div>
              )}
              <nav className="flex flex-col gap-0.5">
                {WORKFORCE_NAV_ITEMS.filter((item) => !item.red && item.id !== "admin-panel").map((item) => {
                  const isActive = activeNav === item.id;
                  const isExpandable = item.expandable;

                  return (
                    <div key={item.id} className="flex flex-col">
                      <button
                        type="button"
                        data-tl={`nav-${item.id}`}
                        onClick={() => {
                          if (isExpandable) {
                            tl.setVar("wfMySpaceExpanded", !mySpaceExpanded);
                          }
                          onNavigateNav?.(item.id);
                        }}
                        className={`group flex items-center rounded-lg text-xs font-medium transition-colors ${
                          sidebarCollapsed
                            ? "h-9 w-9 justify-center mx-auto"
                            : "h-9 px-3 gap-3 justify-between"
                        } ${
                          isActive
                            ? "bg-[#F3E8FF] text-[#7014D9] font-semibold"
                            : "text-[#4B5563] hover:bg-gray-100 hover:text-[#111827]"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon
                            name={item.icon}
                            size={18}
                            className={`shrink-0 ${isActive ? "text-[#7014D9]" : "text-[#6B7280] group-hover:text-[#111827]"}`}
                          />
                          {!sidebarCollapsed && (
                            <span className="truncate">{item.label}</span>
                          )}
                        </div>
                        {isExpandable && !sidebarCollapsed && (
                          <span
                            data-tl="nav-my-space-chevron"
                            className={`transition-transform duration-200 text-[#6B7280] ${
                              mySpaceExpanded ? "rotate-90" : ""
                            }`}
                          >
                            <Icon name="chevronRight" size={14} />
                          </span>
                        )}
                      </button>

                      {/* Expandable sub-items (My Space) */}
                      {isExpandable && mySpaceExpanded && !sidebarCollapsed && item.subItems && (
                        <div data-tl="my-space-sublist" className="mt-1 ml-4 pl-3 border-l border-[#E5E7EB] flex flex-col gap-0.5">
                          {item.subItems.map((sub) => {
                            const isSubActive = activeSub === sub.id;
                            return (
                              <button
                                key={sub.id}
                                type="button"
                                data-tl={`subnav-${sub.id}`}
                                onClick={() => onNavigateSub?.(sub.id)}
                                className={`flex h-8 items-center px-3 rounded-lg text-xs transition-colors ${
                                  isSubActive
                                    ? "bg-[#F3E8FF] text-[#7014D9] font-semibold"
                                    : "text-[#6B7280] hover:bg-gray-100 hover:text-[#111827]"
                                }`}
                              >
                                {sub.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom items: Report a Bug & Admin Panel */}
            <div className="pt-3 border-t border-[#F3F4F6] flex flex-col gap-0.5">
              <button
                type="button"
                data-tl="nav-report-bug"
                onClick={() => onNavigateNav?.("report-bug")}
                className={`flex items-center rounded-lg text-xs font-medium text-[#EF4444] hover:bg-red-50 transition-colors ${
                  sidebarCollapsed ? "h-9 w-9 justify-center mx-auto" : "h-9 px-3 gap-3"
                }`}
              >
                <Icon name="bug" size={18} className="shrink-0 text-[#EF4444]" />
                {!sidebarCollapsed && <span>Report a Bug</span>}
              </button>
              <button
                type="button"
                data-tl="nav-admin-panel"
                onClick={() => onNavigateNav?.("admin-panel")}
                className={`flex items-center rounded-lg text-xs font-medium text-[#4B5563] hover:bg-gray-100 transition-colors ${
                  sidebarCollapsed ? "h-9 w-9 justify-center mx-auto" : "h-9 px-3 gap-3"
                }`}
              >
                <Icon name="adminSquare" size={18} className="shrink-0 text-[#6B7280]" />
                {!sidebarCollapsed && <span>Admin Panel</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* 3. Main area: Top Bar + Page content */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Top Bar */}
          <header
            data-tl="wf-topbar"
            className="flex h-14 shrink-0 items-center justify-between border-b border-[#E5E7EB] bg-white px-6 select-none z-20 relative"
          >
            {/* Title & subtitle */}
            <div className="flex items-center gap-3">
              <div>
                <h1 data-tl="topbar-title" className="text-lg font-bold text-[#111827] leading-none">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xs text-[#6B7280] mt-1">{subtitle}</p>
                )}
              </div>
            </div>

            {/* Right-hand tools */}
            <div className="flex items-center gap-3">
              {/* Add Users button (admin-only in real product; does nothing for employees) */}
              <button
                type="button"
                data-tl="top-add-users"
                className="flex flex-col items-center justify-center px-2 py-1 rounded-lg text-[#4B5563] hover:bg-gray-100 transition-colors"
              >
                <Icon name="userPlus" size={18} className="text-[#6B7280]" />
                <span className="text-[9px] font-medium leading-[11px] text-[#6B7280] mt-0.5">Add Users</span>
              </button>

              {/* Notifications bell */}
              <button
                type="button"
                data-tl="top-bell"
                onClick={() => tl.setVar("wfOpenPopover", openPopover === "notifications" ? null : "notifications")}
                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#4B5563] hover:bg-gray-100 transition-colors"
              >
                <Icon name="bell" size={20} className="text-[#4B5563]" />
                {unreadCount > 0 && (
                  <span
                    data-tl="top-bell-badge"
                    className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold text-white ring-2 ring-white"
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Apps grid */}
              <button
                type="button"
                data-tl="top-apps-grid"
                onClick={() => tl.setVar("wfOpenPopover", openPopover === "apps" ? null : "apps")}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#4B5563] hover:bg-gray-100 transition-colors"
              >
                <Icon name="grid4" size={20} className="text-[#4B5563]" />
              </button>

              {/* Avatar & chevron */}
              <button
                type="button"
                data-tl="top-avatar"
                onClick={() => tl.setVar("wfOpenPopover", openPopover === "avatar" ? null : "avatar")}
                className="flex items-center gap-1.5 pl-1 pr-1.5 py-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7014D9] text-white font-semibold text-xs shadow-sm">
                  {SAMPLE_EMPLOYEE.initial}
                </div>
                <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
              </button>
            </div>

            {/* POPOVERS */}

            {/* 1. Notifications Dropdown */}
            {openPopover === "notifications" && (
              <div
                data-tl="notifications-dropdown"
                className="absolute right-12 top-14 w-[340px] rounded-2xl border border-[#E5E7EB] bg-white shadow-xl z-50 overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-[#F3F4F6] px-4 py-3 bg-[#FAF5FF]">
                  <h3 className="font-semibold text-sm text-[#111827]">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      data-tl="notif-mark-read"
                      onClick={() => tl.setVar("wfUnreadCount", 0)}
                      className="text-xs font-semibold text-[#7014D9] hover:underline flex items-center gap-1"
                    >
                      <Icon name="check" size={13} />
                      Mark all read
                    </button>
                  )}
                </div>

                <div
                  data-tl="notif-list"
                  className="max-h-[280px] overflow-y-auto divide-y divide-[#F3F4F6] p-1"
                >
                  {NOTIFICATIONS_LIST.map((n) => (
                    <div
                      key={n.id}
                      data-tl={`notif-item-${n.id}`}
                      className="p-3 hover:bg-gray-50 transition-colors rounded-lg cursor-pointer"
                    >
                      <p className="text-xs font-semibold text-[#111827]">{n.title}</p>
                      <p className="text-xs text-[#4B5563] mt-0.5 line-clamp-1">{n.text}</p>
                      <span className="text-[10px] text-[#9CA3AF] mt-1 block">{n.date}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#F3F4F6] p-2 text-center bg-gray-50">
                  <button
                    type="button"
                    data-tl="notif-view-all"
                    onClick={() => tl.setVar("wfOpenPopover", null)}
                    className="text-xs font-medium text-[#7014D9] hover:underline"
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}

            {/* 2. Apps Grid Popover */}
            {openPopover === "apps" && (
              <div
                data-tl="apps-grid-popover"
                className="absolute right-10 top-14 w-[280px] rounded-2xl border border-[#E5E7EB] bg-white shadow-xl z-50 p-4"
              >
                <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3 px-1">
                  Snaarp Suite
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {SUITE_RAIL_ITEMS.map((app) => (
                    <div
                      key={app.id}
                      data-tl={`app-popover-${app.id}`}
                      className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-purple-50 cursor-pointer transition-colors"
                    >
                      <ProductLogo name={app.logo} size={28} className="rounded-lg" />
                      <span className="text-[10px] font-medium text-[#4B5563] mt-1 text-center truncate w-full">
                        {app.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Avatar Dropdown */}
            {openPopover === "avatar" && (
              <div
                data-tl="avatar-dropdown"
                className="absolute right-4 top-14 w-[240px] rounded-2xl border border-[#E5E7EB] bg-white shadow-xl z-50 p-3"
              >
                <div className="p-2 border-b border-[#F3F4F6]">
                  <p className="text-xs font-medium text-[#111827] truncate">
                    {SAMPLE_EMPLOYEE.email}
                  </p>
                  <p className="text-[10px] font-semibold tracking-wider text-[#6B7280] uppercase mt-0.5">
                    EMPLOYEE
                  </p>
                </div>
                <div className="mt-2 flex flex-col gap-0.5">
                  <button
                    type="button"
                    data-tl="avatar-settings-link"
                    onClick={() => tl.setVar("wfOpenPopover", null)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#4B5563] hover:bg-gray-100 hover:text-[#111827] transition-colors text-left"
                  >
                    <Icon name="gear" size={16} className="text-[#6B7280]" />
                    <span>Settings</span>
                  </button>
                  <button
                    type="button"
                    data-tl="avatar-logout"
                    onClick={() => tl.setVar("wfOpenPopover", null)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#DC2626] hover:bg-red-50 transition-colors text-left"
                  >
                    <Icon name="logout" size={16} className="text-[#DC2626]" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </header>

          {/* Page Content Area with data-scroller */}
          <main
            data-tl="wf-main"
            className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-6 bg-[#F8F9FB]"
          >
            {children}
          </main>
        </div>
      </div>

      {overlay}
    </div>
  );
}
