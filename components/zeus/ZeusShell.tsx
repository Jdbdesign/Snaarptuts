"use client";

import { type ReactNode } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Menu,
  Users,
  Building2,
  ListFilter,
  Download,
  Boxes,
  Bug,
  Shield,
  Search,
  Zap,
  Grid,
  Mail,
  Video,
  CreditCard,
  Table,
  FileText,
  Presentation,
  FileCheck,
  Lock,
  HardDrive,
  LogOut,
} from "lucide-react";
import { ProductLogo } from "@/components/icons";
import { ZEUS_URLS, type ZeusView } from "./zeus-data";

interface Props {
  tl: Timeline;
  children: ReactNode;
  overlay?: ReactNode;
}

export function ZeusShell({ tl, children, overlay }: Props) {
  const currentView = useTimelineVar<ZeusView>(tl, "zeusView", "people");
  const credits = useTimelineVar<number>(tl, "zeusCredits", 99);

  const handleNav = (view: ZeusView, url: string) => {
    tl.setVar("zeusView", view);
    tl.setUrl(url);
  };

  return (
    <div
      data-tl="zeus-shell-container"
      data-scroller
      className="relative flex h-full w-full overflow-hidden bg-[#F6F6F8] font-sans select-none text-[#111827]"
    >
      {/* 1. Far-left suite rail */}
      <aside
        data-tl="zeus-suite-rail"
        className="w-14 shrink-0 border-r border-gray-200 bg-[#F7F6FB] flex flex-col items-center py-2 z-30 justify-between select-none h-full overflow-hidden"
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
          className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col items-center gap-1.5 py-1"
        >
          {/* Mail */}
          <div data-tl="suite-rail-mail" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Mail</span>
          </div>

          {/* Meets */}
          <div data-tl="suite-rail-meets" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Video className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Meets</span>
          </div>

          {/* Teams */}
          <div data-tl="suite-rail-teams" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Users className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Teams</span>
          </div>

          {/* One Cardx */}
          <div data-tl="suite-rail-onecard" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">One Cardx</span>
          </div>

          {/* Sheets */}
          <div data-tl="suite-rail-sheets" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Table className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Sheets</span>
          </div>

          {/* Docs */}
          <div data-tl="suite-rail-docs" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Docs</span>
          </div>

          {/* Slides */}
          <div data-tl="suite-rail-slides" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Presentation className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Slides</span>
          </div>

          {/* PDF */}
          <div data-tl="suite-rail-pdf" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <FileCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">PDF</span>
          </div>

          {/* Lock */}
          <div data-tl="suite-rail-lock" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Lock</span>
          </div>

          {/* Drive */}
          <div data-tl="suite-rail-drive" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <HardDrive className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Drive</span>
          </div>
        </div>

        {/* Logout at bottom */}
        <div data-tl="suite-rail-logout" className="flex flex-col items-center group cursor-pointer pt-2 shrink-0">
          <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
            <LogOut className="w-3.5 h-3.5" />
          </div>
          <span className="text-[8px] text-gray-500 font-medium">Logout</span>
        </div>
      </aside>

      {/* 2. Zeus Sidebar */}
      <aside
        data-tl="zeus-sidebar"
        className="w-[200px] shrink-0 border-r border-gray-200 bg-white flex flex-col justify-between z-20 h-full select-none"
      >
        <div>
          {/* Logo & Brand Header */}
          <div
            data-tl="zeus-brand-header"
            className="h-14 px-4 flex items-center gap-2.5 border-b border-gray-100 cursor-pointer"
            onClick={() => handleNav("people", ZEUS_URLS.people)}
          >
            <ProductLogo name="zeus" size={26} className="rounded-lg shadow-xs shrink-0" />
            <span className="font-bold text-base tracking-tight text-gray-900">Zeus</span>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {/* People */}
            <button
              type="button"
              data-tl="zeus-nav-people"
              onClick={() => handleNav("people", ZEUS_URLS.people)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
                currentView === "people"
                  ? "bg-[#F5EEFF] text-[#7014D9]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Users className={`w-4 h-4 ${currentView === "people" ? "text-[#7014D9]" : "text-gray-500"}`} />
              <span>People</span>
            </button>

            {/* Companies */}
            <button
              type="button"
              data-tl="zeus-nav-companies"
              onClick={() => handleNav("companies", ZEUS_URLS.companies)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
                currentView === "companies"
                  ? "bg-[#F5EEFF] text-[#7014D9]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Building2 className={`w-4 h-4 ${currentView === "companies" ? "text-[#7014D9]" : "text-gray-500"}`} />
              <span>Companies</span>
            </button>

            {/* Lists */}
            <button
              type="button"
              data-tl="zeus-nav-lists"
              onClick={() => handleNav("lists", ZEUS_URLS.lists)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
                currentView === "lists"
                  ? "bg-[#F5EEFF] text-[#7014D9]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <ListFilter className={`w-4 h-4 ${currentView === "lists" ? "text-[#7014D9]" : "text-gray-500"}`} />
              <span>Lists</span>
            </button>

            {/* Exports */}
            <button
              type="button"
              data-tl="zeus-nav-exports"
              onClick={() => handleNav("exports", ZEUS_URLS.exports)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
                currentView === "exports"
                  ? "bg-[#F5EEFF] text-[#7014D9]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Download className={`w-4 h-4 ${currentView === "exports" ? "text-[#7014D9]" : "text-gray-500"}`} />
              <span>Exports</span>
            </button>

            {/* Integrations */}
            <button
              type="button"
              data-tl="zeus-nav-integrations"
              onClick={() => handleNav("integrations", ZEUS_URLS.integrations)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
                currentView === "integrations"
                  ? "bg-[#F5EEFF] text-[#7014D9]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Boxes className={`w-4 h-4 ${currentView === "integrations" ? "text-[#7014D9]" : "text-gray-500"}`} />
              <span>Integrations</span>
            </button>
          </nav>
        </div>

        {/* Bottom items */}
        <div className="p-3 border-t border-gray-100 space-y-1">
          <button
            type="button"
            data-tl="zeus-nav-bug"
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50/50 rounded-xl transition-colors"
          >
            <Bug className="w-3.5 h-3.5 text-red-500" />
            <span>Report a Bug</span>
          </button>
          <button
            type="button"
            data-tl="zeus-nav-admin"
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#7014D9] hover:bg-[#F5EEFF]/60 rounded-xl transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-[#7014D9]" />
            <span>Admin Panel</span>
          </button>
        </div>
      </aside>

      {/* 3. Main Container (Top Bar + Content Area) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Top Bar */}
        <header
          data-tl="zeus-topbar"
          className="h-14 shrink-0 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-10"
        >
          {/* Search bar */}
          <div className="flex items-center gap-3">
            <div
              data-tl="zeus-topbar-search-box"
              className="flex items-center gap-2 bg-gray-100/90 rounded-xl px-3.5 py-1.5 text-xs text-gray-800 w-72"
            >
              <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <input
                type="text"
                readOnly
                placeholder="Search people..."
                data-tl="zeus-topbar-search-input"
                className="bg-transparent border-none outline-none text-xs w-full placeholder:text-gray-400 text-gray-800 cursor-default"
              />
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Credits pill */}
            <button
              type="button"
              data-tl="zeus-credits-pill"
              onClick={() => handleNav("billing", ZEUS_URLS.billing)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EEFF] border border-[#7014D9]/20 text-[#7014D9] hover:bg-[#ECE0FC] transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-[#7014D9] text-[#7014D9]" />
              <span className="text-xs font-bold" data-tl="zeus-credits-count">{credits}</span>
            </button>

            {/* 9-dot grid button */}
            <button
              type="button"
              data-tl="zeus-apps-grid"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Grid className="w-4 h-4" />
            </button>

            {/* User avatar circle */}
            <div
              data-tl="zeus-avatar"
              className="w-8 h-8 rounded-full bg-gray-900 text-white font-bold text-xs flex items-center justify-center shadow-xs"
            >
              U
            </div>
          </div>
        </header>

        {/* View content area */}
        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>

      {/* Overlay: modals, drawers, toasts */}
      {overlay}
    </div>
  );
}
