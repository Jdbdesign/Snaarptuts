"use client";

import { type ReactNode } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Menu,
  LayoutDashboard,
  FolderKanban,
  RotateCw,
  CheckSquare,
  PenTool,
  FileText,
  Zap,
  Boxes,
  BarChart2,
  Bug,
  Search,
  Bell,
  Grid,
  ChevronDown,
  Mail,
  Video,
  Users,
  CreditCard,
  Table,
  Presentation,
  FileCheck,
  Lock,
  HardDrive,
  Calendar,
  LogOut,
  PanelLeftClose,
  CheckCircle2,
} from "lucide-react";
import { ProductLogo } from "@/components/icons";
import { PROJECTS_URLS, type ProjectsView } from "./projects-data";

interface Props {
  tl: Timeline;
  children: ReactNode;
  overlay?: ReactNode;
}

export function ProjectsShell({ tl, children, overlay }: Props) {
  const currentView = useTimelineVar<ProjectsView>(tl, "projectsView", "dashboard");
  const toast = useTimelineVar<{ message: string; type: string; id: number } | null>(
    tl,
    "projectsToast",
    null
  );

  const handleNav = (view: ProjectsView, url: string) => {
    tl.setVar("projectsView", view);
    tl.setUrl(url);
  };

  return (
    <div
      data-tl="projects-shell-container"
      data-scroller
      className="relative flex h-full w-full overflow-hidden bg-[#F6F6F8] font-sans select-none text-[#111827]"
    >
      {/* 1. Far-left suite rail */}
      <aside
        data-tl="projects-suite-rail"
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
            <span className="text-[8px] text-gray-500 font-medium leading-tight text-center">One Cardx</span>
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

          {/* Sign */}
          <div data-tl="suite-rail-sign" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <PenTool className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Sign</span>
          </div>

          {/* Drive */}
          <div data-tl="suite-rail-drive" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <HardDrive className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Drive</span>
          </div>

          {/* Me */}
          <div data-tl="suite-rail-me" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">Me</span>
          </div>

          {/* CRM */}
          <div data-tl="suite-rail-crm" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/60">
              <Users className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] text-gray-500 font-medium">CRM</span>
          </div>
        </div>

        {/* Pinned Logout */}
        <div data-tl="suite-rail-logout" className="flex flex-col items-center cursor-pointer pt-1 shrink-0">
          <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-900">
            <LogOut className="w-3.5 h-3.5" />
          </div>
          <span className="text-[8px] text-gray-500 font-medium">Logout</span>
        </div>
      </aside>

      {/* 2. Main content area: Top bar + body (sidebar + view) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar (56px) */}
        <header
          data-tl="projects-topbar"
          className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 z-20"
        >
          {/* Left: Hamburger, Projects Logo, Wordmark, Collapse button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              data-tl="topbar-menu-btn"
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-800 rounded-lg"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <ProductLogo name="projects" className="w-6 h-6 rounded-md shadow-2xs" />
              <span className="font-bold text-[16px] text-gray-900 tracking-tight">Projects</span>
            </div>
            <button
              type="button"
              data-tl="topbar-collapse-btn"
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 ml-1 rounded"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center: Search input */}
          <div className="relative w-80">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              readOnly
              placeholder="Search tasks, projects..."
              data-tl="topbar-search-input"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none placeholder-gray-400 text-gray-700"
            />
          </div>

          {/* Right: Bell, Apps 9-dots, Avatar */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="topbar-bell-btn"
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-800 rounded-lg"
            >
              <Bell className="w-4 h-4" />
            </button>
            <button
              type="button"
              data-tl="topbar-apps-btn"
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-800 rounded-lg"
            >
              <Grid className="w-4 h-4" />
            </button>
            <div
              data-tl="topbar-avatar-btn"
              className="flex items-center gap-1 cursor-pointer pl-1"
            >
              <div className="w-7 h-7 rounded-full bg-[#7014D9] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                J
              </div>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Body: Sidebar + Main view */}
        <div className="flex-1 flex min-h-0 overflow-hidden relative">
          {/* Projects Sidebar */}
          <aside
            data-tl="projects-sidebar"
            className="w-[200px] shrink-0 bg-white border-r border-gray-200 flex flex-col justify-between py-3 px-3 select-none overflow-y-auto no-scrollbar"
          >
            <div className="space-y-4">
              {/* WORKSPACE section */}
              <div>
                <div className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-2 mb-1.5">
                  WORKSPACE
                </div>
                <nav className="space-y-0.5">
                  {/* Dashboard */}
                  <button
                    type="button"
                    data-tl="nav-dashboard"
                    onClick={() => handleNav("dashboard", PROJECTS_URLS.dashboard)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      currentView === "dashboard"
                        ? "bg-[#F5EEFF] text-[#7014D9] font-semibold border-l-4 border-[#7014D9]"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span>Dashboard</span>
                  </button>

                  {/* Projects */}
                  <button
                    type="button"
                    data-tl="nav-projects"
                    onClick={() => handleNav("projects", PROJECTS_URLS.projects)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      currentView === "projects"
                        ? "bg-[#F5EEFF] text-[#7014D9] font-semibold border-l-4 border-[#7014D9]"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <FolderKanban className="w-4 h-4 shrink-0" />
                    <span>Projects</span>
                  </button>

                  {/* Sprints */}
                  <button
                    type="button"
                    data-tl="nav-sprints"
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <RotateCw className="w-4 h-4 shrink-0" />
                    <span>Sprints</span>
                  </button>

                  {/* Tasks */}
                  <button
                    type="button"
                    data-tl="nav-tasks"
                    onClick={() => handleNav("tasks", PROJECTS_URLS.tasks)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      currentView === "tasks"
                        ? "bg-[#F5EEFF] text-[#7014D9] font-semibold border-l-4 border-[#7014D9]"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <CheckSquare className="w-4 h-4 shrink-0" />
                    <span>Tasks</span>
                  </button>

                  {/* Whiteboards */}
                  <button
                    type="button"
                    data-tl="nav-whiteboards"
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <PenTool className="w-4 h-4 shrink-0" />
                    <span>Whiteboards</span>
                  </button>

                  {/* Docs */}
                  <button
                    type="button"
                    data-tl="nav-docs"
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>Docs</span>
                  </button>
                </nav>
              </div>

              {/* MANAGE section */}
              <div>
                <div className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-2 mb-1.5">
                  MANAGE
                </div>
                <nav className="space-y-0.5">
                  <button
                    type="button"
                    data-tl="nav-automations"
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Zap className="w-4 h-4 shrink-0" />
                    <span>Automations</span>
                  </button>
                  <button
                    type="button"
                    data-tl="nav-integration"
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Boxes className="w-4 h-4 shrink-0" />
                    <span>Integration</span>
                  </button>
                </nav>
              </div>

              {/* INSIGHTS section */}
              <div>
                <div className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-2 mb-1.5">
                  INSIGHTS
                </div>
                <nav className="space-y-0.5">
                  <button
                    type="button"
                    data-tl="nav-reports"
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <BarChart2 className="w-4 h-4 shrink-0" />
                    <span>Reports</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Bottom: Report a Bug */}
            <div className="pt-2 border-t border-gray-100">
              <button
                type="button"
                data-tl="nav-report-bug"
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xl text-xs font-medium text-red-500 hover:bg-red-50"
              >
                <Bug className="w-4 h-4 text-red-500 shrink-0" />
                <span>Report a Bug</span>
              </button>
            </div>
          </aside>

          {/* Main scrollable view */}
          <main
            data-tl="projects-main-scroll"
            className="flex-1 h-full overflow-y-auto no-scrollbar p-6 relative"
          >
            {children}
          </main>
        </div>
      </div>

      {/* Floating toast notification at top center */}
      {toast && (
        <div
          data-tl="projects-toast-notification"
          className="absolute top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-lg border border-gray-200/90 text-xs font-medium text-gray-900 transition-all animate-in fade-in slide-in-from-top-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Overlays (drawers, modals) */}
      {overlay}
    </div>
  );
}
