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
  Lock,
  PenTool,
  HardDrive,
  LogOut,
  Upload,
  Wrench,
  Sparkles,
  Layers,
  Bug,
  Search,
  ClipboardCheck,
  LayoutGrid,
} from "lucide-react";
import { ProductLogo } from "@/components/icons";

export type PdfNav = "my-files" | "upload" | "tools" | "ai-tools" | "operations";

interface Props {
  activeNav: PdfNav;
  onSelectNav?: (nav: PdfNav) => void;
  children: React.ReactNode;
}

export function PdfShell({
  activeNav = "my-files",
  onSelectNav,
  children,
}: Props) {
  return (
    <div
      data-tl="pdf-shell"
      className="relative flex h-full w-full overflow-hidden font-sans select-none bg-white text-[#111827]"
    >
      {/* 1. Far-left Snaarp Suite Rail (60px) */}
      <aside
        data-tl="pdf-suite-rail"
        className="w-14 shrink-0 border-r border-gray-200 bg-[#FAFAFC] text-gray-500 flex flex-col items-center py-2 z-30 justify-between select-none h-full overflow-hidden flex"
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
          <div data-tl="suite-rail-mail" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <Mail className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Mail</span>
          </div>

          {/* Meets */}
          <div data-tl="suite-rail-meets" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <Video className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Meets</span>
          </div>

          {/* Teams */}
          <div data-tl="suite-rail-teams" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Teams</span>
          </div>

          {/* One Cardx */}
          <div data-tl="suite-rail-onecard" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90 truncate max-w-[48px]">One Cardx</span>
          </div>

          {/* Sheets */}
          <div data-tl="suite-rail-sheets" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <Table className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Sheets</span>
          </div>

          {/* Docs */}
          <div data-tl="suite-rail-docs" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Docs</span>
          </div>

          {/* Slides */}
          <div data-tl="suite-rail-slides" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <Presentation className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Slides</span>
          </div>

          {/* PDF (Active) */}
          <div
            data-tl="suite-rail-pdf"
            className="flex flex-col items-center rounded-xl py-1 px-1 cursor-pointer shrink-0 bg-[#F3E8FF] text-[#7014D9]"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg">
              <ProductLogo name="pdf" size={18} className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold scale-90">PDF</span>
          </div>

          {/* Lock */}
          <div data-tl="suite-rail-lock" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <Lock className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Lock</span>
          </div>

          {/* Sign */}
          <div data-tl="suite-rail-sign" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <PenTool className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Sign</span>
          </div>

          {/* Drive */}
          <div data-tl="suite-rail-drive" className="flex flex-col items-center group cursor-pointer shrink-0">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600">
              <HardDrive className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-medium scale-90">Drive</span>
          </div>
        </div>

        {/* Pinned Logout */}
        <div data-tl="suite-rail-logout" className="flex flex-col items-center cursor-pointer pt-1 shrink-0">
          <div className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-900">
            <LogOut className="w-3.5 h-3.5" />
          </div>
          <span className="text-[9px] font-medium text-gray-500 scale-90">Logout</span>
        </div>
      </aside>

      {/* 2. PDF Left Navigation Sidebar (200px) */}
      <aside
        data-tl="pdf-sidebar"
        className="w-48 shrink-0 border-r border-gray-200 bg-white flex flex-col justify-between py-3 px-3 z-20 flex"
      >
        <div className="flex flex-col gap-5">
          {/* Top Brand Logo */}
          <div className="flex items-center gap-3 px-2 py-1">
            <button
              type="button"
              data-tl="sidebar-toggle-btn"
              className="p-1 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <ProductLogo name="pdf" size={24} className="w-6 h-6" />
              <span className="font-bold text-base text-[#111827]">PDF</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            <button
              type="button"
              data-tl="sidebar-nav-my-files"
              onClick={() => onSelectNav?.("my-files")}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs rounded-xl font-medium transition-colors text-left ${
                activeNav === "my-files"
                  ? "bg-[#F3E8FF] text-[#7014D9] font-semibold"
                  : "text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB]"
              }`}
            >
              <FileText className={`w-4 h-4 ${activeNav === "my-files" ? "text-[#7014D9]" : "text-gray-500"}`} />
              <span>My files</span>
            </button>

            <button
              type="button"
              data-tl="sidebar-nav-upload"
              onClick={() => onSelectNav?.("upload")}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs rounded-xl font-medium transition-colors text-left ${
                activeNav === "upload"
                  ? "bg-[#F3E8FF] text-[#7014D9] font-semibold"
                  : "text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB]"
              }`}
            >
              <Upload className={`w-4 h-4 ${activeNav === "upload" ? "text-[#7014D9]" : "text-gray-500"}`} />
              <span>Upload</span>
            </button>

            <button
              type="button"
              data-tl="sidebar-nav-tools"
              onClick={() => onSelectNav?.("tools")}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs rounded-xl font-medium transition-colors text-left ${
                activeNav === "tools"
                  ? "bg-[#F3E8FF] text-[#7014D9] font-semibold"
                  : "text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB]"
              }`}
            >
              <Wrench className={`w-4 h-4 ${activeNav === "tools" ? "text-[#7014D9]" : "text-gray-500"}`} />
              <span>Tools</span>
            </button>

            <button
              type="button"
              data-tl="sidebar-nav-ai-tools"
              onClick={() => onSelectNav?.("ai-tools")}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs rounded-xl font-medium transition-colors text-left ${
                activeNav === "ai-tools"
                  ? "bg-[#F3E8FF] text-[#7014D9] font-semibold"
                  : "text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB]"
              }`}
            >
              <Sparkles className={`w-4 h-4 ${activeNav === "ai-tools" ? "text-[#7014D9]" : "text-gray-500"}`} />
              <span>AI Tools</span>
            </button>

            <button
              type="button"
              data-tl="sidebar-nav-operations"
              onClick={() => onSelectNav?.("operations")}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs rounded-xl font-medium transition-colors text-left ${
                activeNav === "operations"
                  ? "bg-[#F3E8FF] text-[#7014D9] font-semibold"
                  : "text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB]"
              }`}
            >
              <Layers className={`w-4 h-4 ${activeNav === "operations" ? "text-[#7014D9]" : "text-gray-500"}`} />
              <span>Operations</span>
            </button>
          </nav>
        </div>

        {/* Bottom Report Bug */}
        <div className="pt-2">
          <button
            type="button"
            data-tl="sidebar-report-bug"
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-500 hover:text-red-600 rounded-lg w-full text-left"
          >
            <Bug className="w-4 h-4 text-red-500" />
            <span>Report a Bug</span>
          </button>
        </div>
      </aside>

      {/* 3. Main Center Area (Top bar + scrollable content) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top bar */}
        <header
          data-tl="pdf-topbar"
          className="h-14 border-b border-gray-200 bg-white px-6 flex items-center justify-between z-10 shrink-0"
        >
          {/* Search files */}
          <div className="flex-1 max-w-lg">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                data-tl="pdf-topbar-search"
                readOnly
                placeholder="Search files..."
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Right Action Icons & Avatar */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="pdf-topbar-clipboard"
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              <ClipboardCheck className="w-4 h-4" />
            </button>
            <button
              type="button"
              data-tl="pdf-topbar-apps"
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <div
              data-tl="pdf-topbar-avatar"
              className="relative w-7 h-7 rounded-full bg-purple-700 text-white flex items-center justify-center font-semibold text-xs shadow-sm cursor-pointer"
            >
              <span>J</span>
              {/* Online indicator */}
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main
          className="flex-1 overflow-y-auto bg-white p-6 relative"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
