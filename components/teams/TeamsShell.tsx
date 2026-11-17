import React from "react";
import {
  Menu,
  Mail,
  Video,
  Users,
  CreditCard,
  Table,
  FileText,
  Presentation,
  FileCheck,
  Lock,
  PenTool,
  HardDrive,
  Calendar,
  LogOut,
  MessageSquare,
  Bell,
  Bug,
  Search,
  Sun,
  Moon,
  LayoutGrid,
} from "lucide-react";
import { ProductLogo } from "@/components/icons";
import { CURRENT_USER, type TeamsNav } from "./teams-data";

export function TeamsShell({
  activeNav = "chat",
  isDark = false,
  onSelectNav,
  onToggleTheme,
  children,
}: {
  activeNav: TeamsNav;
  isDark?: boolean;
  onSelectNav: (nav: TeamsNav) => void;
  onToggleTheme: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      data-tl="teams-shell"
      className={`relative flex h-full w-full overflow-hidden font-sans select-none ${
        isDark ? "bg-[#18181B] text-[#FAFAFA]" : "bg-white text-[#111827]"
      }`}
    >
      {/* 1. Far-left Snaarp Suite Rail (60px) */}
      <aside
        data-tl="teams-suite-rail"
        className={`w-14 shrink-0 border-r flex flex-col items-center py-2 z-30 justify-between select-none h-full overflow-hidden hidden md:flex ${
          isDark
            ? "border-zinc-800 bg-[#121214] text-zinc-400"
            : "border-gray-200 bg-[#FAFAFC] text-gray-500"
        }`}
      >
        <button
          type="button"
          data-tl="suite-rail-hamburger"
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 rounded mb-1 shrink-0"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Scrollable app icon list */}
        <div
          data-tl="suite-rail-scroll"
          className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col items-center gap-2 py-1"
        >
          {/* Mail */}
          <div
            data-tl="suite-rail-mail"
            className="flex flex-col items-center group cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <Mail className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Mail</span>
          </div>

          {/* Meets */}
          <div
            data-tl="suite-rail-meets"
            className="flex flex-col items-center group cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <Video className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Meets</span>
          </div>

          {/* Teams (Active) */}
          <div
            data-tl="suite-rail-teams"
            className={`flex flex-col items-center rounded-xl py-1 px-1 cursor-pointer shrink-0 ${
              isDark ? "bg-purple-900/40 text-purple-300" : "bg-[#DBEAFE] text-blue-900"
            }`}
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-700">
              <ProductLogo name="teams" className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold scale-90">Teams</span>
          </div>

          {/* One Cardx */}
          <div
            data-tl="suite-rail-onecard"
            className="flex flex-col items-center group cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90 truncate max-w-[48px]">
              One Cardx
            </span>
          </div>

          {/* Sheets */}
          <div
            data-tl="suite-rail-sheets"
            className="flex flex-col items-center group cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <Table className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Sheets</span>
          </div>

          {/* Docs */}
          <div
            data-tl="suite-rail-docs"
            className="flex flex-col items-center group cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Docs</span>
          </div>

          {/* Slides */}
          <div
            data-tl="suite-rail-slides"
            className="flex flex-col items-center group cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <Presentation className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Slides</span>
          </div>

          {/* PDF */}
          <div
            data-tl="suite-rail-pdf"
            className="flex flex-col items-center group cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <FileCheck className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">PDF</span>
          </div>

          {/* Lock */}
          <div
            data-tl="suite-rail-lock"
            className="flex flex-col items-center group cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <Lock className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Lock</span>
          </div>

          {/* Sign */}
          <div
            data-tl="suite-rail-sign"
            className="flex flex-col items-center group cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <PenTool className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Sign</span>
          </div>

          {/* Drive */}
          <div
            data-tl="suite-rail-drive"
            className="flex flex-col items-center group cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <HardDrive className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Drive</span>
          </div>

          {/* Me */}
          <div
            data-tl="suite-rail-me"
            className="flex flex-col items-center group cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Me</span>
          </div>
        </div>

        {/* Pinned Logout */}
        <div
          data-tl="suite-rail-logout"
          className="flex flex-col items-center cursor-pointer pt-1 shrink-0"
        >
          <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-900">
            <LogOut className="w-3.5 h-3.5" />
          </div>
          <span className="text-[9px] font-medium text-gray-500 scale-90">
            Logout
          </span>
        </div>
      </aside>

      {/* 2. Teams Left Navigation Sidebar (160px) */}
      <aside
        data-tl="teams-sidebar"
        className={`w-40 shrink-0 border-r flex flex-col justify-between py-3 px-2 z-20 hidden md:flex ${
          isDark
            ? "border-zinc-800 bg-[#18181B] text-zinc-300"
            : "border-gray-100 bg-white text-gray-700"
        }`}
      >
        <div className="space-y-4">
          {/* Teams Brand Header */}
          <div
            data-tl="teams-brand-header"
            className="flex items-center gap-2 px-2 pt-1"
          >
            <div className="w-6 h-6 flex items-center justify-center text-purple-600">
              <ProductLogo name="teams" className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold tracking-tight text-gray-900">
              Snaarp{" "}
              <span className="font-normal text-gray-500">Teams</span>
            </span>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            <button
              type="button"
              data-tl="teams-nav-chat"
              onClick={() => onSelectNav("chat")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activeNav === "chat"
                  ? isDark
                    ? "bg-purple-950/60 text-purple-300 font-semibold border-l-4 border-purple-500"
                    : "bg-[#F3E8FF] text-gray-900 font-semibold border-l-4 border-[#7014D9]"
                  : isDark
                  ? "hover:bg-zinc-800 text-zinc-400"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <MessageSquare className="w-4 h-4 text-purple-700 shrink-0" />
              <span>Chat</span>
            </button>

            <button
              type="button"
              data-tl="teams-nav-meet"
              onClick={() => onSelectNav("meet")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activeNav === "meet"
                  ? isDark
                    ? "bg-purple-950/60 text-purple-300 font-semibold border-l-4 border-purple-500"
                    : "bg-[#F3E8FF] text-gray-900 font-semibold border-l-4 border-[#7014D9]"
                  : isDark
                  ? "hover:bg-zinc-800 text-zinc-400"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <Video className="w-4 h-4 text-purple-700 shrink-0" />
              <span>Meet</span>
            </button>

            <button
              type="button"
              data-tl="teams-nav-people"
              onClick={() => onSelectNav("people")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activeNav === "people"
                  ? isDark
                    ? "bg-purple-950/60 text-purple-300 font-semibold border-l-4 border-purple-500"
                    : "bg-[#F3E8FF] text-gray-900 font-semibold border-l-4 border-[#7014D9]"
                  : isDark
                  ? "hover:bg-zinc-800 text-zinc-400"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <Users className="w-4 h-4 text-gray-400 shrink-0" />
              <span>People</span>
            </button>

            <button
              type="button"
              data-tl="teams-nav-calendar"
              onClick={() => onSelectNav("calendar")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activeNav === "calendar"
                  ? isDark
                    ? "bg-purple-950/60 text-purple-300 font-semibold border-l-4 border-purple-500"
                    : "bg-[#F3E8FF] text-gray-900 font-semibold border-l-4 border-[#7014D9]"
                  : isDark
                  ? "hover:bg-zinc-800 text-zinc-400"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <span>Calendar</span>
            </button>

            <button
              type="button"
              data-tl="teams-nav-activity"
              onClick={() => onSelectNav("activity")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activeNav === "activity"
                  ? isDark
                    ? "bg-purple-950/60 text-purple-300 font-semibold border-l-4 border-purple-500"
                    : "bg-[#F3E8FF] text-gray-900 font-semibold border-l-4 border-[#7014D9]"
                  : isDark
                  ? "hover:bg-zinc-800 text-zinc-400"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <Bell className="w-4 h-4 text-gray-400 shrink-0" />
              <span>Activity</span>
            </button>
          </nav>
        </div>

        {/* Bottom Report a Bug */}
        <div className="pt-2 border-t border-gray-100">
          <button
            type="button"
            data-tl="teams-nav-report-bug"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <Bug className="w-4 h-4 text-red-500 shrink-0" />
            <span>Report a Bug</span>
          </button>
        </div>
      </aside>

      {/* 3. Main Center Workspace */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Bar across workspace */}
        <header
          data-tl="teams-topbar"
          className={`h-12 px-6 border-b flex items-center justify-between shrink-0 ${
            isDark
              ? "border-zinc-800 bg-[#18181B]"
              : "border-gray-100 bg-white"
          }`}
        >
          {/* Centered Search Bar */}
          <div className="flex-1 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                data-tl="teams-topbar-search"
                placeholder="Search"
                className={`w-full h-8 pl-8 pr-3 rounded-full text-xs placeholder-gray-400 focus:outline-none focus:border-purple-600 ${
                  isDark
                    ? "bg-zinc-800 border-zinc-700 text-zinc-100"
                    : "bg-gray-50/50 border border-gray-200 text-gray-800"
                }`}
              />
            </div>
          </div>

          {/* Right Action Icons (Theme / Grid / Avatar) */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button (Sun / Moon) */}
            <button
              type="button"
              data-tl="teams-theme-btn"
              onClick={onToggleTheme}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark
                  ? "text-zinc-300 hover:bg-zinc-800"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {isDark ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            {/* Apps Grid */}
            <button
              type="button"
              data-tl="teams-apps-grid-btn"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark
                  ? "text-zinc-300 hover:bg-zinc-800"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            {/* User Avatar */}
            <button
              type="button"
              data-tl="teams-avatar-btn"
              className="relative cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold shadow-sm">
                {CURRENT_USER.avatarText}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
            </button>
          </div>
        </header>

        {/* View Content Body */}
        <div className="flex-1 flex overflow-hidden relative min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
