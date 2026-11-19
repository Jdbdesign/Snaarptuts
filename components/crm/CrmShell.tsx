"use client";

import React, { type ReactNode } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ProductLogo } from "@/components/icons";
import {
  Menu,
  LayoutDashboard,
  TrendingUp,
  Phone,
  Users,
  MessageSquare,
  Zap,
  BarChart3,
  FileText,
  ClipboardList,
  Settings,
  Bug,
  Shield,
  Search,
  Bell,
  Grid,
  ChevronRight,
  ChevronDown,
  UserPlus,
  Mail,
  Video,
  CreditCard,
  FileSpreadsheet,
  Presentation,
  FileCheck,
  Lock,
  PenTool,
  HardDrive,
  LogOut,
  CheckCircle2,
} from "lucide-react";
import type { CrmToast } from "./crm-timeline";

export type CrmNavId =
  | "home"
  | "dashboards"
  | "sales"
  | "prospects"
  | "forecasts"
  | "won"
  | "lost"
  | "activities"
  | "calls"
  | "contacts"
  | "messages"
  | "automations"
  | "analytics"
  | "reports"
  | "my-requests"
  | "settings";

interface Props {
  tl: Timeline;
  children: ReactNode;
}

export function CrmShell({ tl, children }: Props) {
  const activeNav = useTimelineVar<CrmNavId>(tl, "crm:activeNav", "home");
  const salesOpen = useTimelineVar<boolean>(tl, "crm:salesOpen", true);
  const toast = useTimelineVar<CrmToast | null>(tl, "crm:toast", null);

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#F8F9FA] text-[#111111] font-sans">
      {/* 1. Leftmost Suite Navigation Rail */}
      <aside className="no-scrollbar flex h-full w-[56px] shrink-0 flex-col items-center justify-between border-r border-[#ECECF1] bg-white py-3">
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            aria-label="Suite Menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F3F4F6]"
          >
            <Menu size={18} />
          </button>

          {/* CRM Logo (Active in suite rail) */}
          <div
            title="Snaarp CRM"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED] shadow-xs"
          >
            <ProductLogo name="crm" size={22} className="rounded-md" />
          </div>

          {/* Other suite icons */}
          <div className="flex flex-col items-center gap-2 text-[#9CA3AF]">
            <button type="button" title="Mail" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F3F4F6] hover:text-[#4B5563]">
              <Mail size={16} />
            </button>
            <button type="button" title="Meets" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F3F4F6] hover:text-[#4B5563]">
              <Video size={16} />
            </button>
            <button type="button" title="Teams" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F3F4F6] hover:text-[#4B5563]">
              <Users size={16} />
            </button>
            <button type="button" title="One Cardx" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F3F4F6] hover:text-[#4B5563]">
              <CreditCard size={16} />
            </button>
            <button type="button" title="Sheets" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F3F4F6] hover:text-[#4B5563]">
              <FileSpreadsheet size={16} />
            </button>
            <button type="button" title="Docs" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F3F4F6] hover:text-[#4B5563]">
              <FileText size={16} />
            </button>
            <button type="button" title="Slides" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F3F4F6] hover:text-[#4B5563]">
              <Presentation size={16} />
            </button>
            <button type="button" title="PDF" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F3F4F6] hover:text-[#4B5563]">
              <FileCheck size={16} />
            </button>
            <button type="button" title="Lock" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F3F4F6] hover:text-[#4B5563]">
              <Lock size={16} />
            </button>
            <button type="button" title="Sign" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F3F4F6] hover:text-[#4B5563]">
              <PenTool size={16} />
            </button>
            <button type="button" title="Drive" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F3F4F6] hover:text-[#4B5563]">
              <HardDrive size={16} />
            </button>
          </div>
        </div>

        <button
          type="button"
          title="Logout"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#EF4444]"
        >
          <LogOut size={16} />
        </button>
      </aside>

      {/* Main Container */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* 2. Top Navigation Bar */}
        <header className="flex h-[56px] shrink-0 items-center justify-between border-b border-[#ECECF1] bg-white px-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="crm-toggle-sidebar"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6]"
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-2">
              <ProductLogo name="crm" size={24} className="rounded-md" />
              <span className="text-[16px] font-bold tracking-tight text-[#111111]">CRM</span>
            </div>
          </div>

          {/* Global Search Bar */}
          <div className="flex w-[380px] items-center rounded-full bg-[#F4F4F6] px-3.5 py-1.5 text-[#6B7280]">
            <Search size={15} className="mr-2.5 shrink-0 text-[#9CA3AF]" />
            <input
              type="text"
              readOnly
              placeholder="Search contacts..."
              className="w-full bg-transparent text-[13px] text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[13px] font-medium text-[#4B5563] hover:bg-[#F3F4F6]"
            >
              <UserPlus size={16} />
              <span>Add Users</span>
            </button>

            <button
              type="button"
              className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[#4B5563] hover:bg-[#F3F4F6]"
            >
              <Bell size={18} />
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold text-white">
                8
              </span>
            </button>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4B5563] hover:bg-[#F3F4F6]"
            >
              <Grid size={18} />
            </button>

            {/* User Profile Avatar */}
            <div
              title="Jane Doe (jane@example.com)"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED] text-[13px] font-bold text-white shadow-xs"
            >
              J
            </div>
          </div>
        </header>

        {/* 3. Sub-Shell Layout: CRM Sidebar + Main Content Area */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* CRM Sidebar Navigation */}
          <aside
            data-tl="crm-sidebar"
            className="no-scrollbar flex h-full w-[220px] shrink-0 flex-col justify-between overflow-y-auto border-r border-[#ECECF1] bg-white p-2.5"
          >
            <div className="flex flex-col gap-0.5">
              {/* Home */}
              <button
                type="button"
                data-tl="crm-nav-home"
                onClick={() => {
                  tl.setVar("crm:activeNav", "home");
                  tl.setUrl("crm.snaarp.com/home");
                }}
                className={`flex h-9 w-full items-center gap-2.5 rounded-xl px-3 text-[13px] font-medium transition-colors ${
                  activeNav === "home"
                    ? "bg-[#F3ECFC] font-semibold text-[#7C3AED]"
                    : "text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
                }`}
              >
                <LayoutDashboard size={16} />
                <span>Home</span>
              </button>

              {/* Dashboards */}
              <button
                type="button"
                data-tl="crm-nav-dashboards"
                onClick={() => {
                  tl.setVar("crm:activeNav", "dashboards");
                  tl.setUrl("crm.snaarp.com/dashboards");
                }}
                className={`flex h-9 w-full items-center gap-2.5 rounded-xl px-3 text-[13px] font-medium transition-colors ${
                  activeNav === "dashboards"
                    ? "bg-[#F3ECFC] font-semibold text-[#7C3AED]"
                    : "text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
                }`}
              >
                <Grid size={16} />
                <span>Dashboards</span>
              </button>

              {/* CRM Section */}
              <div className="px-3 pb-1 pt-3 text-[11px] font-semibold tracking-wider text-[#9CA3AF]">
                CRM
              </div>

              {/* Sales with collapsible subitems */}
              <div>
                <button
                  type="button"
                  data-tl="crm-nav-sales"
                  onClick={() => {
                    tl.setVar("crm:salesOpen", !salesOpen);
                    tl.setVar("crm:activeNav", "sales");
                  }}
                  className={`flex h-9 w-full items-center justify-between rounded-xl px-3 text-[13px] font-medium transition-colors ${
                    activeNav === "sales" || activeNav === "prospects" || activeNav === "forecasts" || activeNav === "won" || activeNav === "lost"
                      ? "bg-[#F3ECFC] font-semibold text-[#7C3AED]"
                      : "text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <TrendingUp size={16} />
                    <span>Sales</span>
                  </div>
                  {salesOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>

                {salesOpen && (
                  <div className="ml-6 flex flex-col gap-0.5 border-l border-[#ECECF1] pl-2 pt-0.5">
                    <button
                      type="button"
                      data-tl="crm-nav-prospects"
                      onClick={() => {
                        tl.setVar("crm:activeNav", "prospects");
                        tl.setUrl("crm.snaarp.com/sales/prospects");
                      }}
                      className={`flex h-8 w-full items-center rounded-lg px-2.5 text-[12.5px] transition-colors ${
                        activeNav === "prospects"
                          ? "font-semibold text-[#7C3AED]"
                          : "text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
                      }`}
                    >
                      Prospects
                    </button>
                    <button
                      type="button"
                      data-tl="crm-nav-forecasts"
                      className="flex h-8 w-full items-center rounded-lg px-2.5 text-[12.5px] text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
                    >
                      Forecasts
                    </button>
                    <button
                      type="button"
                      data-tl="crm-nav-won"
                      className="flex h-8 w-full items-center rounded-lg px-2.5 text-[12.5px] text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
                    >
                      Won
                    </button>
                    <button
                      type="button"
                      data-tl="crm-nav-lost"
                      className="flex h-8 w-full items-center rounded-lg px-2.5 text-[12.5px] text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
                    >
                      Lost
                    </button>
                  </div>
                )}
              </div>

              {/* Activities */}
              <button
                type="button"
                className="flex h-9 w-full items-center justify-between rounded-xl px-3 text-[13px] font-medium text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
              >
                <div className="flex items-center gap-2.5">
                  <ClipboardList size={16} />
                  <span>Activities</span>
                </div>
                <ChevronRight size={14} className="text-[#9CA3AF]" />
              </button>

              {/* Calls */}
              <button
                type="button"
                data-tl="crm-nav-calls"
                onClick={() => {
                  tl.setVar("crm:activeNav", "calls");
                  tl.setUrl("crm.snaarp.com/calls");
                }}
                className={`flex h-9 w-full items-center gap-2.5 rounded-xl px-3 text-[13px] font-medium transition-colors ${
                  activeNav === "calls"
                    ? "bg-[#F3ECFC] font-semibold text-[#7C3AED]"
                    : "text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
                }`}
              >
                <Phone size={16} />
                <span>Calls</span>
              </button>

              {/* Contacts */}
              <button
                type="button"
                data-tl="crm-nav-contacts"
                onClick={() => {
                  tl.setVar("crm:activeNav", "contacts");
                  tl.setUrl("crm.snaarp.com/contacts");
                }}
                className={`flex h-9 w-full items-center justify-between rounded-xl px-3 text-[13px] font-medium transition-colors ${
                  activeNav === "contacts"
                    ? "bg-[#F3ECFC] font-semibold text-[#7C3AED]"
                    : "text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users size={16} />
                  <span>Contacts</span>
                </div>
                <ChevronRight size={14} className="text-[#9CA3AF]" />
              </button>

              {/* Messages */}
              <button
                type="button"
                className="flex h-9 w-full items-center gap-2.5 rounded-xl px-3 text-[13px] font-medium text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
              >
                <MessageSquare size={16} />
                <span>Messages</span>
              </button>

              {/* Automations */}
              <button
                type="button"
                className="flex h-9 w-full items-center gap-2.5 rounded-xl px-3 text-[13px] font-medium text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
              >
                <Zap size={16} />
                <span>Automations</span>
              </button>

              {/* MANAGE Section */}
              <div className="px-3 pb-1 pt-3 text-[11px] font-semibold tracking-wider text-[#9CA3AF]">
                MANAGE
              </div>

              {/* Analytics */}
              <button
                type="button"
                className="flex h-9 w-full items-center gap-2.5 rounded-xl px-3 text-[13px] font-medium text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
              >
                <BarChart3 size={16} />
                <span>Analytics</span>
              </button>

              {/* Reports */}
              <button
                type="button"
                className="flex h-9 w-full items-center gap-2.5 rounded-xl px-3 text-[13px] font-medium text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
              >
                <FileText size={16} />
                <span>Reports</span>
              </button>

              {/* My Requests */}
              <button
                type="button"
                className="flex h-9 w-full items-center gap-2.5 rounded-xl px-3 text-[13px] font-medium text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
              >
                <ClipboardList size={16} />
                <span>My Requests</span>
              </button>

              {/* Settings */}
              <button
                type="button"
                className="flex h-9 w-full items-center gap-2.5 rounded-xl px-3 text-[13px] font-medium text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111111]"
              >
                <Settings size={16} />
                <span>Settings</span>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-1 border-t border-[#ECECF1] pt-2">
              <button
                type="button"
                className="flex h-8 w-full items-center gap-2 rounded-lg px-3 text-[12.5px] font-medium text-[#EF4444] hover:bg-[#FEE2E2]"
              >
                <Bug size={15} />
                <span>Report a Bug</span>
              </button>
              <button
                type="button"
                className="flex h-8 w-full items-center gap-2 rounded-lg px-3 text-[12.5px] font-medium text-[#7C3AED] hover:bg-[#F3ECFC]"
              >
                <Shield size={15} />
                <span>Admin Panel</span>
              </button>
            </div>
          </aside>

          {/* Main Content Pane */}
          <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </div>

      {/* Floating In-App Toast */}
      {toast && (
        <div
          data-tl="crm-toast"
          role="status"
          className="fixed right-6 top-16 z-50 flex items-center gap-2 rounded-full border border-[#A7F3D0] bg-[#D1FAE5] px-4 py-2 text-[13px] font-medium text-[#065F46] shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <CheckCircle2 size={16} className="text-[#059669]" />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
