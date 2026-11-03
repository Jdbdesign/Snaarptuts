"use client";

import type { ReactNode } from "react";
import { Icon, ProductLogo } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  SAMPLE_ADMIN,
  SUITE_RAIL_ITEMS,
  type OneCardXNavId,
} from "./onecardx-data";
import {
  OcxHomeIcon,
  OcxCardIcon,
  OcxBusinessCardIcon,
  OcxEmailSigIcon,
  OcxBgIcon,
  OcxContactsIcon,
  OcxAnalyticsIcon,
  OcxUsersIcon,
  OcxBugIcon,
  OcxAdminPanelIcon,
  OcxAddUsersIcon,
  OcxAppsGridIcon,
} from "./OneCardXIcons";

type Props = {
  tl: Timeline;
  activeNav?: OneCardXNavId;
  activeSuiteApp?: string;
  onNavigateNav?: (navId: OneCardXNavId) => void;
  onSelectSuiteApp?: (appId: string) => void;
  pageTitle?: string;
  children: ReactNode;
  overlay?: ReactNode;
};

export function OneCardXShell({
  tl,
  activeNav = "home",
  activeSuiteApp = "onecard",
  onNavigateNav,
  onSelectSuiteApp,
  pageTitle,
  children,
  overlay,
}: Props) {
  const openPopover = useTimelineVar<"apps" | "avatar" | null>(
    tl,
    "ocxOpenPopover",
    null
  );

  const displayTitle =
    pageTitle ??
    (activeNav === "home"
      ? "Home"
      : activeNav === "id-cards"
      ? "ID Cards"
      : activeNav === "create-card"
      ? "Organization Card"
      : "Home");

  return (
    <div
      data-tl="onecardx-shell"
      data-scroller
      className="relative flex h-full w-full overflow-hidden bg-[#F8F9FA] text-[#111827] font-['Poppins',sans-serif]"
    >
      {/* 1. Thin Left App Rail */}
      <aside
        data-tl="suite-left-rail"
        className="flex h-full w-[60px] shrink-0 flex-col items-center border-r border-[#EBECEF] bg-white py-2.5 select-none z-20"
      >
        {/* Top Hamburger button */}
        <button
          type="button"
          data-tl="suite-rail-hamburger"
          className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] hover:bg-gray-100 transition-colors"
          title="Menu"
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>

        {/* Suite App Icons */}
        <div className="flex flex-1 flex-col items-center gap-1 overflow-y-auto no-scrollbar w-full px-1">
          {SUITE_RAIL_ITEMS.map((app) => {
            const isActive = activeSuiteApp ? app.id === activeSuiteApp : app.id === "onecard";
            return (
              <div
                key={app.id}
                data-tl={`suite-app-${app.id}`}
                onClick={() => onSelectSuiteApp?.(app.id)}
                className={`flex flex-col items-center justify-center cursor-pointer transition-all ${
                  isActive
                    ? "w-11 py-1.5 rounded-xl bg-[#F3E8FF] text-[#7014D9]"
                    : "w-11 py-1 rounded-lg text-[#4B5563] hover:bg-gray-50"
                }`}
              >
                <ProductLogo name={app.logo} size={22} className="rounded-md" />
                <span
                  className={`mt-0.5 text-[8.5px] leading-tight text-center tracking-tight truncate max-w-[48px] ${
                    isActive ? "font-semibold text-[#7014D9]" : "font-normal text-[#4B5563]"
                  }`}
                >
                  {app.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Rail Logout item */}
        <div
          data-tl="suite-logout"
          className="mt-auto flex flex-col items-center cursor-pointer w-full gap-0.5 pt-2 border-t border-[#F3F4F6]"
        >
          <Icon name="logout" size={16} className="text-[#6B7280]" />
          <span className="text-[8.5px] font-normal text-[#6B7280]">Logout</span>
        </div>
      </aside>

      {/* 2. OneCardX Sidebar */}
      {activeSuiteApp !== "mail" && (
        <aside
          data-tl="ocx-sidebar"
          className="flex h-full w-[215px] shrink-0 flex-col border-r border-[#EBECEF] bg-white select-none z-10"
        >
        {/* Logo & Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#F3F4F6] px-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7014D9] text-white shadow-2xs">
              <ProductLogo name="onecard" size={16} />
            </div>
            <span className="font-semibold text-[14.5px] tracking-tight text-[#111827]">
              One card x
            </span>
          </div>

          <button
            type="button"
            data-tl="sidebar-collapse"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#4B5563] hover:bg-gray-100 transition-colors"
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M4 6h16M4 12h10M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 overflow-y-auto no-scrollbar py-2.5 px-3 space-y-4">
          {/* Group 1: CREATE */}
          <div>
            <div className="px-2 pb-1 text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase">
              CREATE
            </div>
            <div className="space-y-0.5">
              {/* Home */}
              <button
                type="button"
                data-tl="nav-home"
                onClick={() => onNavigateNav?.("home")}
                className={`relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] transition-colors text-left cursor-pointer ${
                  activeNav === "home"
                    ? "bg-[#F3E8FF] text-[#7014D9] font-medium"
                    : "text-[#4B5563] hover:bg-gray-100 font-normal"
                }`}
              >
                {activeNav === "home" && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#7014D9]" />
                )}
                <span className={activeNav === "home" ? "text-[#7014D9]" : "text-[#6B7280]"}>
                  <OcxHomeIcon width={16} height={16} />
                </span>
                <span>Home</span>
              </button>

              {/* ID Cards */}
              <button
                type="button"
                data-tl="nav-id-cards"
                onClick={() => onNavigateNav?.("id-cards")}
                className={`relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] transition-colors text-left cursor-pointer ${
                  activeNav === "id-cards"
                    ? "bg-[#F3E8FF] text-[#7014D9] font-medium"
                    : "text-[#4B5563] hover:bg-gray-100 font-normal"
                }`}
              >
                {activeNav === "id-cards" && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#7014D9]" />
                )}
                <span className={activeNav === "id-cards" ? "text-[#7014D9]" : "text-[#6B7280]"}>
                  <OcxCardIcon width={16} height={16} />
                </span>
                <span>ID Cards</span>
              </button>

              {/* Business Card */}
              <button
                type="button"
                data-tl="nav-business-card"
                onClick={() => onNavigateNav?.("business-card")}
                className={`relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] transition-colors text-left cursor-pointer ${
                  activeNav === "business-card"
                    ? "bg-[#F3E8FF] text-[#7014D9] font-medium"
                    : "text-[#4B5563] hover:bg-gray-100 font-normal"
                }`}
              >
                {activeNav === "business-card" && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#7014D9]" />
                )}
                <span className={activeNav === "business-card" ? "text-[#7014D9]" : "text-[#6B7280]"}>
                  <OcxBusinessCardIcon width={16} height={16} />
                </span>
                <span>Business Card</span>
              </button>

              {/* Email Signatures */}
              <button
                type="button"
                data-tl="nav-email-signatures"
                onClick={() => onNavigateNav?.("email-signatures")}
                className={`relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] transition-colors text-left cursor-pointer ${
                  activeNav === "email-signatures"
                    ? "bg-[#F3E8FF] text-[#7014D9] font-medium"
                    : "text-[#4B5563] hover:bg-gray-100 font-normal"
                }`}
              >
                {activeNav === "email-signatures" && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#7014D9]" />
                )}
                <span className={activeNav === "email-signatures" ? "text-[#7014D9]" : "text-[#6B7280]"}>
                  <OcxEmailSigIcon width={16} height={16} />
                </span>
                <span>Email Signatures</span>
              </button>

              {/* Backgrounds */}
              <button
                type="button"
                data-tl="nav-backgrounds"
                onClick={() => onNavigateNav?.("backgrounds")}
                className={`relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] transition-colors text-left cursor-pointer ${
                  activeNav === "backgrounds"
                    ? "bg-[#F3E8FF] text-[#7014D9] font-medium"
                    : "text-[#4B5563] hover:bg-gray-100 font-normal"
                }`}
              >
                {activeNav === "backgrounds" && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#7014D9]" />
                )}
                <span className={activeNav === "backgrounds" ? "text-[#7014D9]" : "text-[#6B7280]"}>
                  <OcxBgIcon width={16} height={16} />
                </span>
                <span>Backgrounds</span>
              </button>
            </div>
          </div>

          {/* Group 2: NETWORK */}
          <div>
            <div className="px-2 pb-1 text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase">
              NETWORK
            </div>
            <div className="space-y-0.5">
              <button
                type="button"
                data-tl="nav-contacts"
                onClick={() => onNavigateNav?.("contacts")}
                className={`relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] transition-colors text-left cursor-pointer ${
                  activeNav === "contacts"
                    ? "bg-[#F3E8FF] text-[#7014D9] font-medium"
                    : "text-[#4B5563] hover:bg-gray-100 font-normal"
                }`}
              >
                {activeNav === "contacts" && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#7014D9]" />
                )}
                <span className={activeNav === "contacts" ? "text-[#7014D9]" : "text-[#6B7280]"}>
                  <OcxContactsIcon width={16} height={16} />
                </span>
                <span>Contacts</span>
              </button>
            </div>
          </div>

          {/* Group 3: INSIGHTS */}
          <div>
            <div className="px-2 pb-1 text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase">
              INSIGHTS
            </div>
            <div className="space-y-0.5">
              <button
                type="button"
                data-tl="nav-analytics"
                onClick={() => onNavigateNav?.("analytics")}
                className={`relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] transition-colors text-left cursor-pointer ${
                  activeNav === "analytics"
                    ? "bg-[#F3E8FF] text-[#7014D9] font-medium"
                    : "text-[#4B5563] hover:bg-gray-100 font-normal"
                }`}
              >
                {activeNav === "analytics" && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#7014D9]" />
                )}
                <span className={activeNav === "analytics" ? "text-[#7014D9]" : "text-[#6B7280]"}>
                  <OcxAnalyticsIcon width={16} height={16} />
                </span>
                <span>Analytics</span>
              </button>
            </div>
          </div>

          {/* Group 4: ADMIN */}
          <div>
            <div className="px-2 pb-1 text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase">
              ADMIN
            </div>
            <div className="space-y-0.5">
              <button
                type="button"
                data-tl="nav-create-card"
                onClick={() => onNavigateNav?.("create-card")}
                className={`relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] transition-colors text-left cursor-pointer ${
                  activeNav === "create-card"
                    ? "bg-[#F3E8FF] text-[#7014D9] font-medium"
                    : "text-[#4B5563] hover:bg-gray-100 font-normal"
                }`}
              >
                {activeNav === "create-card" && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#7014D9]" />
                )}
                <span className={activeNav === "create-card" ? "text-[#7014D9]" : "text-[#6B7280]"}>
                  <OcxCardIcon width={16} height={16} />
                </span>
                <span>Create Card</span>
              </button>

              <button
                type="button"
                data-tl="nav-users"
                onClick={() => onNavigateNav?.("users")}
                className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] text-[#4B5563] hover:bg-gray-100 transition-colors text-left"
              >
                <span className="text-[#6B7280]">
                  <OcxUsersIcon width={16} height={16} />
                </span>
                <span>Users</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Bottom Sidebar Links */}
        <div className="shrink-0 border-t border-[#F3F4F6] p-2.5 space-y-0.5">
          <button
            type="button"
            data-tl="nav-report-bug"
            onClick={() => tl.setVar("ocxBugModalOpen", true)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12.5px] font-medium text-[#DC2626] hover:bg-red-50/60 transition-colors text-left cursor-pointer"
          >
            <OcxBugIcon width={16} height={16} />
            <span>Report a Bug</span>
          </button>
          <button
            type="button"
            data-tl="nav-admin-panel"
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12.5px] font-medium text-[#111827] hover:bg-gray-100 transition-colors text-left"
          >
            <span className="text-[#7014D9]">
              <OcxAdminPanelIcon width={16} height={16} />
            </span>
            <span>Admin Panel</span>
          </button>
        </div>
      </aside>
      )}

      {/* 3. Main Stage Container with Top Bar */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        {activeSuiteApp !== "mail" && (
          <header
            data-tl="ocx-topbar"
            className="flex h-14 shrink-0 items-center justify-between border-b border-[#EBECEF] bg-white px-6 select-none z-20"
          >
          {/* Page Title */}
          <div>
            <h1
              data-tl="page-title"
              className="text-[20px] font-bold text-[#111827] tracking-tight"
            >
              {displayTitle}
            </h1>
          </div>

          {/* Right Top Bar Actions */}
          <div className="flex items-center gap-4">
            {/* Add Users: icon above small label */}
            <button
              type="button"
              data-tl="top-add-users"
              className="flex flex-col items-center justify-center text-[#6B7280] hover:text-[#7014D9] transition-colors cursor-pointer px-1"
              title="Add Users"
            >
              <OcxAddUsersIcon width={18} height={18} />
              <span className="text-[9.5px] leading-tight font-normal mt-0.5">
                Add Users
              </span>
            </button>

            {/* 9-dots Apps grid icon */}
            <button
              type="button"
              data-tl="top-apps-grid"
              onClick={() =>
                tl.setVar("ocxOpenPopover", openPopover === "apps" ? null : "apps")
              }
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                openPopover === "apps"
                  ? "bg-purple-50 text-[#7014D9]"
                  : "text-[#4B5563] hover:bg-gray-100"
              }`}
              title="Snaarp apps"
            >
              <OcxAppsGridIcon width={16} height={16} />
            </button>

            {/* Avatar menu trigger: grey circle + name/email + down chevron */}
            <button
              type="button"
              data-tl="top-avatar"
              onClick={() =>
                tl.setVar("ocxOpenPopover", openPopover === "avatar" ? null : "avatar")
              }
              className="flex items-center gap-2.5 rounded-lg py-1 px-1.5 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9CA3AF] text-white text-xs font-semibold">
                {SAMPLE_ADMIN.avatarInitials}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[12px] font-semibold text-[#111827] leading-tight">
                  {SAMPLE_ADMIN.name}
                </span>
                <span className="text-[10px] text-[#6B7280] leading-tight">
                  {SAMPLE_ADMIN.email}
                </span>
              </div>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-[#6B7280]">
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </header>
        )}

        {/* Scrollable Main Workspace */}
        <main
          className={`relative flex-1 overflow-y-auto no-scrollbar ${
            activeSuiteApp === "mail"
              ? "p-0 bg-white"
              : "bg-[#F8F9FA] p-6 pb-28"
          }`}
        >
          {children}
        </main>
      </div>

      {/* Popovers */}
      {/* A. Snaarp apps 9-dots popover */}
      {openPopover === "apps" && (
        <div
          data-tl="apps-popover"
          className="absolute top-14 right-14 z-50 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="mb-3 text-[12px] font-semibold text-[#111827]">
            Snaarp apps
          </div>
          <div className="grid grid-cols-3 gap-2">
            {SUITE_RAIL_ITEMS.map((app) => {
              const isOneCard = app.id === "onecard";
              return (
                <div
                  key={app.id}
                  data-tl={`popover-app-${app.id}`}
                  className={`flex flex-col items-center justify-center rounded-xl p-2.5 transition-colors cursor-pointer ${
                    isOneCard
                      ? "bg-[#F3E8FF] ring-1 ring-[#7014D9]/40"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <ProductLogo name={app.logo} size={26} className="rounded-lg mb-1" />
                  <span
                    className={`text-[10px] font-medium text-center truncate max-w-[64px] ${
                      isOneCard ? "text-[#7014D9]" : "text-gray-700"
                    }`}
                  >
                    {app.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* B. Avatar Menu Popover */}
      {openPopover === "avatar" && (
        <div
          data-tl="avatar-popover"
          className="absolute top-14 right-4 z-50 w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150 text-xs"
        >
          <div className="border-b border-gray-100 p-2.5">
            <p className="font-semibold text-gray-900">{SAMPLE_ADMIN.name}</p>
            <p className="text-[11px] text-gray-500 truncate">{SAMPLE_ADMIN.email}</p>
          </div>
          <div className="py-1">
            <button
              type="button"
              data-tl="avatar-menu-settings"
              onClick={() => tl.setVar("ocxOpenPopover", null)}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <Icon name="gear" size={14} />
              <span>Settings</span>
            </button>
            <button
              type="button"
              data-tl="avatar-menu-logout"
              onClick={() => tl.setVar("ocxOpenPopover", null)}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-red-600 hover:bg-red-50 cursor-pointer"
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
          className="absolute inset-0 z-40 bg-transparent"
        />
      )}

      {/* Additional Overlays (e.g. Modals) */}
      {overlay}
    </div>
  );
}
