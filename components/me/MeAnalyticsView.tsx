"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

interface Props {
  tl: Timeline;
}

export function MeAnalyticsView({ tl }: Props) {
  const period = useTimelineVar<string>(tl, "meAnalyticsPeriod", "today");
  const source = useTimelineVar<string>(tl, "meAnalyticsSource", "All Sources");
  const sourceOpen = useTimelineVar<boolean>(tl, "meAnalyticsSourceDropdownOpen", false);
  const eventTypeFilter = useTimelineVar<string>(tl, "meAnalyticsEventTypeFilter", "");

  const periods = [
    { id: "today", label: "Today", tlKey: "me-analytics-period-today" },
    { id: "7d", label: "7 Days", tlKey: "me-analytics-period-7d" },
    { id: "30d", label: "30 Days", tlKey: "me-analytics-period-30d" },
    { id: "90d", label: "90 Days", tlKey: "me-analytics-period-90d" },
    { id: "custom", label: "Custom", tlKey: "me-analytics-period-custom" },
  ];

  const sourceOptions = ["All Sources", "Web", "API", "Embed"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = ["6:00", "9:00", "12:00", "15:00", "18:00"];

  return (
    <div
      data-tl="me-analytics-container"
      data-scroller
      className="h-full overflow-y-auto px-8 py-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Meet Analytics</h1>
        <p className="text-sm text-gray-500">Track your booking performance and team metrics.</p>
      </div>

      {/* Filter Card */}
      <div
        data-tl="me-analytics-filter-card"
        className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm"
      >
        {/* Period Buttons */}
        <div data-tl="me-analytics-period-group" className="flex items-center gap-1 bg-gray-50/80 border border-gray-200/80 p-1 rounded-xl">
          {periods.map((p) => {
            const isActive = period === p.id;
            return (
              <button
                key={p.id}
                type="button"
                data-tl={p.tlKey}
                onClick={() => tl.setVar("meAnalyticsPeriod", p.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs transition-colors ${
                  isActive
                    ? "bg-[#7014D9] text-white font-semibold shadow-xs"
                    : "text-gray-600 hover:text-gray-900 font-medium"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Right Controls: Source & Event Type ID */}
        <div className="flex items-center gap-4">
          {/* Source Dropdown */}
          <div className="relative">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-0.5">
              Source
            </span>
            <button
              type="button"
              data-tl="me-analytics-source-btn"
              onClick={() => tl.setVar("meAnalyticsSourceDropdownOpen", !sourceOpen)}
              className="flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 font-medium hover:border-gray-300 min-w-[120px]"
            >
              <span>{source}</span>
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {sourceOpen && (
              <div
                data-tl="me-analytics-source-menu"
                className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-30"
              >
                {sourceOptions.map((opt) => {
                  const isSelected = source === opt;
                  const tlId =
                    opt === "All Sources"
                      ? "me-analytics-source-all"
                      : opt === "Web"
                      ? "me-analytics-source-web"
                      : opt === "API"
                      ? "me-analytics-source-api"
                      : "me-analytics-source-embed";

                  return (
                    <button
                      key={opt}
                      type="button"
                      data-tl={tlId}
                      onClick={() => {
                        tl.setVar("meAnalyticsSource", opt);
                        tl.setVar("meAnalyticsSourceDropdownOpen", false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-left text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      <span>{opt}</span>
                      {isSelected && (
                        <svg className="w-3.5 h-3.5 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Event Type ID Input */}
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-0.5">
              Event Type ID
            </span>
            <input
              type="text"
              data-tl="me-analytics-event-type-input"
              value={eventTypeFilter}
              onChange={(e) => tl.setVar("meAnalyticsEventTypeFilter", e.target.value)}
              placeholder="Filter by event type"
              className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7014D9] w-44"
            />
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div data-tl="me-analytics-stats-grid" className="grid grid-cols-4 gap-4 mt-6">
        {/* Total Bookings */}
        <div
          data-tl="me-stat-total-bookings"
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Bookings
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#F5EEFF] text-[#7014D9] flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-4">2</div>
        </div>

        {/* Cancellations */}
        <div
          data-tl="me-stat-cancellations"
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Cancellations
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="9" />
                <path d="M15 9l-6 6M9 9l6 6" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-4">0</div>
        </div>

        {/* No-Shows */}
        <div
          data-tl="me-stat-no-shows"
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              No-Shows
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M18 8l5 5M23 8l-5 5" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-4">0</div>
        </div>

        {/* Completion Rate */}
        <div
          data-tl="me-stat-completion-rate"
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Completion Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-4">0%</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Bookings Over Time */}
        <div
          data-tl="me-analytics-bookings-over-time"
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
        >
          <h2 className="text-base font-bold text-gray-900 mb-4">Bookings Over Time</h2>
          <div className="h-44 w-full flex flex-col justify-between pt-2 pb-1 relative">
            {/* Y axis and grid lines */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>2</span>
              <div className="w-[95%] border-b border-gray-100 border-dashed" />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>1</span>
              <div className="w-[95%] border-b border-gray-100 border-dashed" />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>0</span>
              <div className="w-[95%] border-b border-gray-200" />
            </div>

            {/* Line / Point Plot */}
            <div className="absolute inset-x-8 top-4 bottom-6 flex items-start justify-center">
              <div className="flex flex-col items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-[#7014D9] border-2 border-white shadow-xs ring-4 ring-[#7014D9]/20" />
                <span className="text-[11px] font-semibold text-[#7014D9] mt-1">2</span>
              </div>
            </div>

            {/* X axis */}
            <div className="flex justify-center text-[11px] text-gray-500 font-medium pt-1">
              <span>2026-11-10</span>
            </div>
          </div>
        </div>

        {/* Popular Time Slots Heatmap */}
        <div
          data-tl="me-analytics-popular-time-slots"
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
        >
          <h2 className="text-base font-bold text-gray-900 mb-2">Popular Time Slots</h2>

          <div className="overflow-x-auto py-1">
            <div className="min-w-[420px]">
              {/* Hour Header */}
              <div className="grid grid-cols-6 text-[10px] text-gray-400 font-medium pb-2 text-center">
                <span />
                {hours.map((h) => (
                  <span key={h}>{h}</span>
                ))}
              </div>

              {/* Day rows */}
              <div className="flex flex-col gap-1.5">
                {days.map((day) => {
                  return (
                    <div key={day} className="grid grid-cols-6 items-center gap-1.5 text-center">
                      <span className="text-[11px] text-gray-500 font-medium text-left pr-2">
                        {day}
                      </span>
                      {hours.map((h) => {
                        const isTueNine = day === "Tue" && h === "9:00";
                        return (
                          <div
                            key={h}
                            className={`h-4 rounded-xs transition-colors ${
                              isTueNine ? "bg-[#7014D9]" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            title={isTueNine ? "2 bookings" : "0 bookings"}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-gray-400">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded-xs bg-gray-100" />
                <span className="w-2.5 h-2.5 rounded-xs bg-[#7014D9]/30" />
                <span className="w-2.5 h-2.5 rounded-xs bg-[#7014D9]/60" />
                <span className="w-2.5 h-2.5 rounded-xs bg-[#7014D9]" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers Card */}
      <div
        data-tl="me-analytics-top-performers"
        className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mt-6 mb-12"
      >
        <h2 className="text-base font-bold text-gray-900 mb-2">Top Performers</h2>
        <div className="py-8 text-center text-sm text-gray-400 font-medium">
          No performer data available for this period.
        </div>
      </div>
    </div>
  );
}
