"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { INITIAL_DASHBOARDS, type CrmDashboardItem } from "./crm-data";
import {
  Plus,
  Tv,
  Share2,
  Pencil,
  Trash2,
  Grid,
  Save,
  ChevronLeft,
} from "lucide-react";

interface Props {
  tl: Timeline;
  onOpenNewModal: () => void;
  onOpenAddWidgets: () => void;
  onOpenShareModal: () => void;
  onOpenTvMode: () => void;
  onSaveDashboard: () => void;
}

export function CrmDashboardsView({
  tl,
  onOpenNewModal,
  onOpenAddWidgets,
  onOpenShareModal,
  onOpenTvMode,
  onSaveDashboard,
}: Props) {
  const dashboards = useTimelineVar<CrmDashboardItem[]>(tl, "crm:dashboards", INITIAL_DASHBOARDS);
  const activeDashboardId = useTimelineVar<string>(tl, "crm:activeDashboardId", "my-dashboard");
  const widgetsInCustom = useTimelineVar<string[]>(tl, "crm:customDashboardWidgets", []);
  const isCustomSaved = useTimelineVar<boolean>(tl, "crm:isCustomSaved", false);

  const activeDashboard =
    dashboards.find((d) => d.id === activeDashboardId) || dashboards[0];

  const isClientLeads = activeDashboard.id === "client-leads";
  const isEmptyClientLeads = isClientLeads && widgetsInCustom.length === 0;

  const uniqueDashboards = dashboards.filter((d, i, arr) => arr.findIndex((x) => x.id === d.id) === i);

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* 1. Dashboards Subnav Column */}
      <aside className="no-scrollbar flex h-full w-[220px] shrink-0 flex-col border-r border-[#ECECF1] bg-white p-3">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[14px] font-bold text-[#111111]">
            <ChevronLeft size={16} className="text-[#6B7280]" />
            <span>Dashboards</span>
          </div>
          <button
            type="button"
            data-tl="crm-btn-new-dashboard"
            onClick={onOpenNewModal}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F3F4F6] hover:text-[#111111]"
            title="Create new dashboard"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Dashboard Items List */}
        <div className="flex flex-col gap-1">
          {uniqueDashboards.map((dash) => {
            const isActive = dash.id === activeDashboardId;
            return (
              <div
                key={dash.id}
                data-tl={`crm-dash-tab-${dash.id}`}
                onClick={() => {
                  tl.setVar("crm:activeDashboardId", dash.id);
                  if (dash.id === "client-leads") {
                    tl.setUrl("crm.snaarp.com/dashboards/client-leads");
                  } else {
                    tl.setUrl("crm.snaarp.com/dashboards");
                  }
                }}
                className={`group flex h-9 cursor-pointer items-center justify-between rounded-xl px-2.5 text-[13px] font-medium transition-colors ${
                  isActive
                    ? "bg-[#F3ECFC] text-[#7C3AED]"
                    : "text-[#374151] hover:bg-[#F9FAFB]"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Grid size={15} className={isActive ? "text-[#7C3AED]" : "text-[#9CA3AF]"} />
                  <span className="truncate">{dash.name}</span>
                </div>
                <button
                  type="button"
                  className="hidden text-[#9CA3AF] hover:text-[#EF4444] group-hover:block"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            );
          })}
        </div>
      </aside>

      {/* 2. Main Dashboard Content Canvas */}
      <div data-scroller className="flex min-w-0 flex-1 flex-col overflow-y-auto p-6">
        {/* Canvas Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h1 data-tl="crm-dash-title" className="text-[20px] font-bold text-[#111111]">
              {activeDashboard.name}
            </h1>
            <p className="text-[12.5px] text-[#6B7280]">
              {isClientLeads
                ? `${widgetsInCustom.length} widgets · Last updated 11/19/2026`
                : `${activeDashboard.widgetCount} widgets · Last updated ${activeDashboard.lastUpdated}`}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {isClientLeads && !isCustomSaved ? (
              // Edit / creation mode
              <>
                <button
                  type="button"
                  data-tl="crm-btn-add-widget"
                  onClick={onOpenAddWidgets}
                  className="flex items-center gap-1.5 rounded-full border border-[#D1D5DB] bg-white px-4 py-1.5 text-[12.5px] font-medium text-[#4F46E5] shadow-xs hover:bg-[#F9FAFB]"
                >
                  <Plus size={14} />
                  <span>Add Widget</span>
                </button>
                <button
                  type="button"
                  data-tl="crm-btn-save-dashboard"
                  onClick={onSaveDashboard}
                  className="flex items-center gap-1.5 rounded-full bg-[#4F46E5] px-4 py-1.5 text-[12.5px] font-medium text-white shadow-xs hover:bg-[#4338CA]"
                >
                  <Save size={14} />
                  <span>Save</span>
                </button>
                <button
                  type="button"
                  className="rounded-full px-3 py-1.5 text-[12.5px] font-medium text-[#6B7280] hover:bg-[#F3F4F6]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#EF4444] hover:bg-[#FEE2E2]"
                >
                  <Trash2 size={15} />
                </button>
              </>
            ) : (
              // Standard View Mode
              <>
                <button
                  type="button"
                  data-tl="crm-btn-tv-mode"
                  onClick={onOpenTvMode}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#4B5563] hover:bg-white hover:shadow-xs"
                >
                  <Tv size={15} />
                  <span>TV Mode</span>
                </button>
                <button
                  type="button"
                  data-tl="crm-btn-share-dashboard"
                  onClick={onOpenShareModal}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#4B5563] hover:bg-white hover:shadow-xs"
                >
                  <Share2 size={15} />
                  <span>Share</span>
                </button>
                <button
                  type="button"
                  data-tl="crm-btn-edit-dashboard"
                  className="flex items-center gap-1.5 rounded-full bg-[#4F46E5] px-4 py-1.5 text-[12.5px] font-medium text-white shadow-xs hover:bg-[#4338CA]"
                >
                  <Pencil size={14} />
                  <span>Edit</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content Body */}
        {isEmptyClientLeads || (activeDashboard.id === "pr-sales" && activeDashboard.widgetCount === 0) ? (
          // Empty Dashboard state (Dashed box)
          <div
            data-tl="crm-empty-dashboard"
            className="flex min-h-[360px] flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-[#D1D5DB] bg-white/50 p-8 text-center"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F4F6] text-[#9CA3AF]">
              <Grid size={24} />
            </div>
            <h3 className="text-[16px] font-bold text-[#111111]">Empty Dashboard</h3>
            <p className="mb-5 mt-1 text-[13px] text-[#6B7280]">
              Add widgets to build your custom dashboard
            </p>
            <button
              type="button"
              data-tl="crm-btn-add-first-widget"
              onClick={onOpenAddWidgets}
              className="flex items-center gap-1.5 rounded-full bg-[#4F46E5] px-5 py-2 text-[13px] font-medium text-white shadow-sm hover:bg-[#4338CA]"
            >
              <Plus size={15} />
              <span>Add First Widget</span>
            </button>
          </div>
        ) : isClientLeads ? (
          // Custom Dashboard (Client Leads) with widgets (4, 5, or 6)
          <div data-tl="crm-widgets-container" className="flex flex-col gap-4">
            {/* Row 1: KPI Card (1), Bar Chart (2), KPI Card (1 if 6 widgets) */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              {/* KPI Card */}
              <div
                data-tl="crm-widget-kpi-1"
                className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-xs"
              >
                <div className="text-[11px] font-bold text-[#9CA3AF]">KPI CARD</div>
                <div className="my-3 text-center text-[30px] font-bold text-[#111111]">
                  25
                </div>
                <div className="text-center text-[12px] text-[#6B7280]">KPI Card</div>
              </div>

              {/* Bar Chart */}
              {widgetsInCustom.includes("bar-chart") && (
                <div
                  data-tl="crm-widget-bar-chart"
                  className={`${widgetsInCustom.length >= 6 ? "col-span-2" : "col-span-3"} rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-xs`}
                >
                  <div className="text-[11px] font-bold text-[#9CA3AF]">BAR CHART</div>
                  <div className="mt-4 flex flex-col gap-3">
                    <div>
                      <div className="flex justify-between text-[12px] text-[#4B5563]">
                        <span>Event_leads</span>
                        <span className="font-semibold">15</span>
                      </div>
                      <div className="mt-1 h-3.5 w-full rounded-full bg-[#F3F4F6]">
                        <div className="h-full w-[75%] rounded-full bg-[#4F46E5]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[12px] text-[#4B5563]">
                        <span>Lead</span>
                        <span className="font-semibold">6</span>
                      </div>
                      <div className="mt-1 h-3.5 w-full rounded-full bg-[#F3F4F6]">
                        <div className="h-full w-[30%] rounded-full bg-[#8B5CF6]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Second KPI Card (if added) */}
              {widgetsInCustom.filter((x) => x === "kpi-card").length > 1 && (
                <div
                  data-tl="crm-widget-kpi-2"
                  className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-xs"
                >
                  <div className="text-[11px] font-bold text-[#9CA3AF]">KPI CARD</div>
                  <div className="my-3 text-center text-[30px] font-bold text-[#111111]">
                    25
                  </div>
                  <div className="text-center text-[12px] text-[#6B7280]">KPI Card</div>
                </div>
              )}
            </div>

            {/* Row 2: Pie Chart (if added) & Line Chart */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {widgetsInCustom.includes("pie-chart") && (
                <div
                  data-tl="crm-widget-pie-chart"
                  className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-xs"
                >
                  <div className="text-[11px] font-bold text-[#9CA3AF]">PIE CHART</div>
                  <div className="mt-3 flex items-center justify-around">
                    <svg width="110" height="110" viewBox="0 0 100 100" className="rotate-[-90deg]">
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#4F46E5" strokeWidth="30" strokeDasharray="132 220" strokeDashoffset="0" />
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#8B5CF6" strokeWidth="30" strokeDasharray="53 220" strokeDashoffset="-132" />
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#EC4899" strokeWidth="30" strokeDasharray="18 220" strokeDashoffset="-185" />
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#F59E0B" strokeWidth="30" strokeDasharray="18 220" strokeDashoffset="-203" />
                    </svg>
                    <div className="flex flex-col gap-1.5 text-[11.5px] text-[#4B5563]">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#4F46E5]" />
                        <span>Event_leads: 15</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]" />
                        <span>Lead: 6</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#EC4899]" />
                        <span>New: 2</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                        <span>Proposal: 2</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {widgetsInCustom.includes("line-chart") && (
                <div
                  data-tl="crm-widget-line-chart"
                  className={`${!widgetsInCustom.includes("pie-chart") ? "col-span-2" : ""} rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-xs`}
                >
                  <div className="text-[11px] font-bold text-[#9CA3AF]">LINE CHART</div>
                  <div className="mt-4 flex h-32 items-end justify-between px-4 pb-2">
                    <svg className="h-full w-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                      <path
                        d="M 10 20 L 90 60 L 170 85 L 280 85"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="3"
                      />
                      <circle cx="10" cy="20" r="4" fill="#4F46E5" />
                      <circle cx="90" cy="60" r="4" fill="#4F46E5" />
                      <circle cx="170" cy="85" r="4" fill="#4F46E5" />
                      <circle cx="280" cy="85" r="4" fill="#4F46E5" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Row 3: Table */}
            {widgetsInCustom.includes("table") && (
              <div
                data-tl="crm-widget-table"
                className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-xs"
              >
                <div className="text-[11px] font-bold text-[#9CA3AF]">TABLE</div>
                <table className="mt-3 w-full text-left text-[12.5px] text-[#374151]">
                  <thead>
                    <tr className="border-b border-[#ECECF1] text-[11px] font-bold text-[#9CA3AF]">
                      <th className="pb-2">STATUS</th>
                      <th className="pb-2 text-right">VALUE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3F4F6]">
                    <tr>
                      <td className="py-2.5">Event_leads</td>
                      <td className="py-2.5 text-right font-semibold text-[#111111]">15</td>
                    </tr>
                    <tr>
                      <td className="py-2.5">Lead</td>
                      <td className="py-2.5 text-right font-semibold text-[#111111]">6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          // Pre-built "My Dashboard" (8 widgets)
          <div data-tl="crm-my-dashboard-grid" className="flex flex-col gap-4">
            {/* Row 1: KPI Card & Bar Chart */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-xs">
                <div className="text-[11px] font-bold text-[#9CA3AF]">KPI CARD</div>
                <div className="my-3 text-center text-[30px] font-bold text-[#111111]">
                  25
                </div>
                <div className="text-center text-[12px] text-[#6B7280]">KPI Card</div>
              </div>

              <div className="col-span-2 rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-xs">
                <div className="text-[11px] font-bold text-[#9CA3AF]">BAR CHART</div>
                <div className="mt-4 flex flex-col gap-3">
                  <div>
                    <div className="flex justify-between text-[12px] text-[#4B5563]">
                      <span>Event_leads</span>
                      <span className="font-semibold">15</span>
                    </div>
                    <div className="mt-1 h-3.5 w-full rounded-full bg-[#F3F4F6]">
                      <div className="h-full w-[75%] rounded-full bg-[#4F46E5]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[12px] text-[#4B5563]">
                      <span>Lead</span>
                      <span className="font-semibold">6</span>
                    </div>
                    <div className="mt-1 h-3.5 w-full rounded-full bg-[#F3F4F6]">
                      <div className="h-full w-[30%] rounded-full bg-[#8B5CF6]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Donut Chart & Line Chart */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-xs">
                <div className="text-[11px] font-bold text-[#9CA3AF]">DONUT CHART</div>
                <div className="mt-3 flex items-center justify-around">
                  <div className="relative flex items-center justify-center">
                    <svg width="100" height="100" viewBox="0 0 100 100" className="rotate-[-90deg]">
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#F59E0B" strokeWidth="15" strokeDasharray="132 220" strokeDashoffset="0" />
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#3B82F6" strokeWidth="15" strokeDasharray="88 220" strokeDashoffset="-132" />
                    </svg>
                    <span className="absolute text-[16px] font-bold text-[#111111]">25</span>
                  </div>
                  <div className="flex flex-col gap-1 text-[11px] text-[#4B5563]">
                    <span>Event_leads: 15</span>
                    <span>Lead: 6</span>
                    <span>New: 2</span>
                    <span>Proposal: 2</span>
                  </div>
                </div>
              </div>

              <div className="col-span-2 rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-xs">
                <div className="text-[11px] font-bold text-[#9CA3AF]">LINE CHART</div>
                <div className="mt-4 flex h-28 items-end justify-between px-4 pb-2">
                  <svg className="h-full w-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                    <path
                      d="M 10 10 L 90 40 L 170 65 L 280 65"
                      fill="none"
                      stroke="#4F46E5"
                      strokeWidth="2.5"
                    />
                    <circle cx="10" cy="10" r="3.5" fill="#4F46E5" />
                    <circle cx="90" cy="40" r="3.5" fill="#4F46E5" />
                    <circle cx="170" cy="65" r="3.5" fill="#4F46E5" />
                    <circle cx="280" cy="65" r="3.5" fill="#4F46E5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Row 3: Pie Chart & Funnel */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-xs">
                <div className="text-[11px] font-bold text-[#9CA3AF]">PIE CHART</div>
                <div className="mt-3 flex items-center justify-around">
                  <svg width="90" height="90" viewBox="0 0 100 100" className="rotate-[-90deg]">
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#4F46E5" strokeWidth="30" strokeDasharray="132 220" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#8B5CF6" strokeWidth="30" strokeDasharray="53 220" strokeDashoffset="-132" />
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#EC4899" strokeWidth="30" strokeDasharray="18 220" strokeDashoffset="-185" />
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#F59E0B" strokeWidth="30" strokeDasharray="18 220" strokeDashoffset="-203" />
                  </svg>
                  <div className="flex flex-col gap-1 text-[11px] text-[#4B5563]">
                    <span>Event_leads: 15</span>
                    <span>Lead: 6</span>
                    <span>New: 2</span>
                    <span>Proposal: 2</span>
                  </div>
                </div>
              </div>

              <div className="col-span-2 rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-xs">
                <div className="text-[11px] font-bold text-[#9CA3AF]">FUNNEL</div>
                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex h-5 w-full items-center rounded bg-[#4F46E5] px-2 text-[10px] text-white">
                    event_leads 15
                  </div>
                  <div className="flex h-5 w-[70%] items-center rounded bg-[#8B5CF6] px-2 text-[10px] text-white">
                    lead 6
                  </div>
                  <div className="flex h-5 w-[45%] items-center rounded bg-[#EC4899] px-2 text-[10px] text-white">
                    new 2
                  </div>
                  <div className="flex h-5 w-[30%] items-center rounded bg-[#F59E0B] px-2 text-[10px] text-white">
                    proposal 2
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4: Heatmap */}
            <div className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-xs">
              <div className="text-[11px] font-bold text-[#9CA3AF]">HEATMAP</div>
              <div className="mt-3 flex flex-col gap-1 text-[10px] text-[#6B7280]">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
                  <div key={day} className="flex items-center gap-2">
                    <span className="w-6 text-right">{day}</span>
                    <div className="flex flex-1 gap-1">
                      {Array.from({ length: 24 }).map((_, h) => (
                        <div
                          key={h}
                          className={`h-3 flex-1 rounded-xs ${
                            (idx === 3 && h === 14) || (idx === 1 && h === 10)
                              ? "bg-[#4F46E5]"
                              : (idx === 4 && h === 16) || (idx === 2 && h === 11)
                                ? "bg-[#818CF8]"
                                : h % 6 === 0
                                  ? "bg-[#EEF2FF]"
                                  : "bg-[#F8F9FA]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 5: Table */}
            <div className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-xs">
              <div className="text-[11px] font-bold text-[#9CA3AF]">TABLE</div>
              <table className="mt-3 w-full text-left text-[12.5px] text-[#374151]">
                <thead>
                  <tr className="border-b border-[#ECECF1] text-[11px] font-bold text-[#9CA3AF]">
                    <th className="pb-2">STATUS</th>
                    <th className="pb-2 text-right">VALUE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                  <tr>
                    <td className="py-2.5">Event_leads</td>
                    <td className="py-2.5 text-right font-semibold text-[#111111]">15</td>
                  </tr>
                  <tr>
                    <td className="py-2.5">Lead</td>
                    <td className="py-2.5 text-right font-semibold text-[#111111]">6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
