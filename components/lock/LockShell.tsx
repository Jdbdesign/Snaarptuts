"use client";

import { type ReactNode, useEffect, useRef } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Menu,
  LayoutDashboard,
  Shield,
  Building2,
  ArrowDownToLine,
  Bug,
  Search,
  Grid,
  LogOut,
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
  User,
  Briefcase,
  BookOpen,
  FolderKanban,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { LOCK_URLS } from "./lock-data";
import { LockToast } from "./LockToast";

interface Props {
  tl: Timeline;
  children: ReactNode;
  overlay?: ReactNode;
}

export function LockShell({ tl, children, overlay }: Props) {
  const currentView = useTimelineVar<string>(tl, "lockView", "dashboard");
  const railScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (railScrollRef.current) {
      const docsEl = railScrollRef.current.querySelector<HTMLElement>('[data-tl="suite-rail-docs"]');
      if (docsEl) {
        railScrollRef.current.scrollTop = docsEl.offsetTop - railScrollRef.current.offsetTop;
      }
    }
  }, []);

  const handleNav = (view: string, url: string) => {
    tl.setVar("lockView", view);
    tl.setUrl(url);
  };

  return (
    <div
      data-tl="lock-shell-container"
      data-scroller
      className="relative flex h-full w-full overflow-hidden bg-[#F2F2F2] font-sans select-none text-[#111827]"
    >
      {/* 1. Far-left thin suite rail */}
      <aside
        data-tl="suite-rail"
        className="w-[52px] shrink-0 border-r border-[#E5E7EB] bg-[#F6F6F6] flex flex-col items-center py-2 z-30 justify-between select-none h-full overflow-hidden"
      >
        <button
          type="button"
          data-tl="suite-rail-hamburger"
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 rounded mb-1 shrink-0"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Scrollable app icon list, scrolled so Docs is at top */}
        <div
          ref={railScrollRef}
          data-tl="suite-rail-scroll"
          className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col items-center gap-1.5 py-1"
        >
          {/* 1. Mail */}
          <div data-tl="suite-rail-mail" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Mail</span>
          </div>

          {/* 2. Meets */}
          <div data-tl="suite-rail-meets" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Video className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Meets</span>
          </div>

          {/* 3. Teams */}
          <div data-tl="suite-rail-teams" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Users className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Teams</span>
          </div>

          {/* 4. One Cardx */}
          <div data-tl="suite-rail-onecard" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">One Cardx</span>
          </div>

          {/* 5. Sheets */}
          <div data-tl="suite-rail-sheets" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Table className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Sheets</span>
          </div>

          {/* 6. Docs */}
          <div data-tl="suite-rail-docs" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Docs</span>
          </div>

          {/* 7. Slides */}
          <div data-tl="suite-rail-slides" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Presentation className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Slides</span>
          </div>

          {/* 8. PDF */}
          <div data-tl="suite-rail-pdf" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <FileCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">PDF</span>
          </div>

          {/* 9. Lock - ACTIVE */}
          <div
            data-tl="suite-rail-lock"
            className="flex flex-col items-center cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#EDE9FE] text-[#7C3AED]">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-[#7C3AED] font-semibold">Lock</span>
          </div>

          {/* 10. Sign */}
          <div data-tl="suite-rail-sign" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <PenTool className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Sign</span>
          </div>

          {/* 11. Drive */}
          <div data-tl="suite-rail-drive" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <HardDrive className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Drive</span>
          </div>

          {/* 12. Me */}
          <div data-tl="suite-rail-me" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Me</span>
          </div>

          {/* 13. CRM */}
          <div data-tl="suite-rail-crm" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">CRM</span>
          </div>

          {/* 14. Books */}
          <div data-tl="suite-rail-books" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Books</span>
          </div>

          {/* 15. Workforce */}
          <div data-tl="suite-rail-workforce" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Users className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Workforce</span>
          </div>

          {/* 16. Project */}
          <div data-tl="suite-rail-project" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <FolderKanban className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Project</span>
          </div>

          {/* 17. Zeus */}
          <div data-tl="suite-rail-zeus" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Zeus</span>
          </div>

          {/* 18. Verifyrit */}
          <div data-tl="suite-rail-verifyrit" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Verifyrit</span>
          </div>
        </div>

        {/* Bottom Logout */}
        <div data-tl="suite-rail-logout" className="flex flex-col items-center cursor-pointer mb-1 pt-1 shrink-0 border-t border-gray-200/60 w-full">
          <div className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700">
            <LogOut className="w-3.5 h-3.5" />
          </div>
          <span className="text-[8px] text-gray-400">Logout</span>
        </div>
      </aside>

      {/* 2. White left sidebar */}
      <aside
        data-tl="sidebar"
        className="w-[230px] shrink-0 border-r border-[#EBECEF] bg-white flex flex-col justify-between py-4 select-none z-20"
      >
        <div>
          {/* Logo */}
          <div
            data-tl="sidebar-logo"
            className="flex items-center gap-2.5 px-5 mb-6"
          >
            <div className="w-7 h-7 rounded-lg bg-[#7014D9] flex items-center justify-center text-white font-bold text-sm shadow-xs">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 tracking-tight leading-tight">
                SnaarpLock
              </span>
              <span className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">
                PASSWORD MANAGER
              </span>
            </div>
          </div>

          {/* Menu items */}
          <nav className="flex flex-col gap-1 px-3">
            {/* Dashboard */}
            <button
              type="button"
              data-tl="nav-lock-dashboard"
              onClick={() => handleNav("dashboard", LOCK_URLS.dashboard)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                currentView === "dashboard" || currentView === "devices"
                  ? "bg-[#F3E8FF] text-[#7C3AED] font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Dashboard</span>
              </div>
              {(currentView === "dashboard" || currentView === "devices") && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              )}
            </button>

            {/* Vaults */}
            <button
              type="button"
              data-tl="nav-lock-vaults"
              onClick={() => handleNav("vaults", LOCK_URLS.vaults)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                currentView === "vaults" || currentView === "vault-items"
                  ? "bg-[#F3E8FF] text-[#7C3AED] font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 shrink-0" />
                <span>Vaults</span>
              </div>
              {(currentView === "vaults" || currentView === "vault-items") && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              )}
            </button>

            {/* Organizations */}
            <button
              type="button"
              data-tl="nav-lock-orgs"
              onClick={() => handleNav("organizations", LOCK_URLS.organizations)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                currentView === "organizations" || currentView === "org-detail"
                  ? "bg-[#F3E8FF] text-[#7C3AED] font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 shrink-0" />
                <span>Organizations</span>
              </div>
              {(currentView === "organizations" || currentView === "org-detail") && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              )}
            </button>

            {/* Import */}
            <button
              type="button"
              data-tl="nav-lock-import"
              onClick={() => handleNav("import", LOCK_URLS.import)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                currentView === "import" || currentView === "chrome-import"
                  ? "bg-[#F3E8FF] text-[#7C3AED] font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ArrowDownToLine className="w-4 h-4 shrink-0" />
                <span>Import</span>
              </div>
              {(currentView === "import" || currentView === "chrome-import") && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              )}
            </button>
          </nav>
        </div>

        {/* Report a Bug */}
        <div className="px-4">
          <button
            type="button"
            data-tl="sidebar-bug-btn"
            className="flex items-center gap-2 text-xs text-red-500 hover:text-red-700 font-medium py-2 px-2 rounded-lg hover:bg-red-50/60 w-full transition-colors cursor-pointer"
          >
            <Bug className="w-3.5 h-3.5 text-red-500" />
            <span>Report a Bug</span>
          </button>
        </div>
      </aside>

      {/* 3. Main column (topbar + content) */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden bg-[#F2F2F2]">
        {/* Topbar */}
        <header
          data-tl="topbar"
          className="h-14 shrink-0 border-b border-[#E5E7EB] bg-white flex items-center justify-between px-6 z-10 select-none"
        >
          {/* Search box */}
          <div className="relative w-[340px]">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              data-tl="topbar-search-input"
              placeholder="Search vault items..."
              readOnly
              className="w-full h-8 pl-8 pr-3 text-xs bg-[#F3F4F6] border border-[#E5E7EB] rounded-full text-gray-800 placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Right items */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="topbar-apps-grid"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer"
            >
              <Grid className="w-4 h-4" />
            </button>

            {/* User Avatar */}
            <div
              data-tl="topbar-user-avatar"
              className="w-7 h-7 rounded-full bg-[#7014D9] text-white flex items-center justify-center font-bold text-xs shadow-xs"
            >
              J
            </div>
          </div>
        </header>

        {/* Dynamic page content */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {children}
        </div>

        {/* In-app Toast */}
        <LockToast tl={tl} />

        {/* Fade overlay */}
        {overlay}
      </div>
    </div>
  );
}
