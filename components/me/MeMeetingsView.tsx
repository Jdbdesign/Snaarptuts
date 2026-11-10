"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ALL_MEETINGS } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeMeetingsView({ tl }: Props) {
  const activeTab = useTimelineVar<"Upcoming" | "Past" | "Cancelled" | "All">(
    tl,
    "meMeetingsTab",
    "Upcoming"
  );
  const viewMode = useTimelineVar<"grid" | "list">(
    tl,
    "meMeetingsViewMode",
    "grid"
  );
  const sortMode = useTimelineVar<"newest" | "oldest" | "az" | "za">(
    tl,
    "meMeetingsSortMode",
    "newest"
  );
  const sortMenuOpen = useTimelineVar<boolean>(
    tl,
    "meMeetingsSortMenuOpen",
    false
  );

  // Filter meetings by tab
  let filtered = ALL_MEETINGS.filter((m) => {
    if (activeTab === "Upcoming") return m.category === "Upcoming" && m.status === "Confirmed";
    if (activeTab === "Past") return m.category === "Past";
    if (activeTab === "Cancelled") return m.status === "Cancelled";
    return true; // All
  });

  // Sort meetings
  if (sortMode === "az") {
    filtered = [...filtered].sort((a, b) => a.inviteeName.localeCompare(b.inviteeName));
  } else if (sortMode === "za") {
    filtered = [...filtered].sort((a, b) => b.inviteeName.localeCompare(a.inviteeName));
  }

  return (
    <div
      data-tl="me-meetings-view"
      data-scroller="meetings-page"
      className="flex flex-col gap-6 max-w-[1280px] mx-auto select-none overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col text-left">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Meetings</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your scheduled meetings
          </p>
        </div>

        {/* Right Controls: Sort & View Toggle */}
        <div className="flex items-center gap-3 relative">
          {/* Sort Button */}
          <div className="relative">
            <button
              type="button"
              data-tl="me-meetings-btn-sort"
              onClick={() => tl.setVar("meMeetingsSortMenuOpen", !sortMenuOpen)}
              className="rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M3 10h12M3 16h6" />
              </svg>
              <span>
                {sortMode === "newest" && "Date (newest first)"}
                {sortMode === "oldest" && "Date (oldest first)"}
                {sortMode === "az" && "A-Z"}
                {sortMode === "za" && "Z-A"}
              </span>
            </button>

            {/* Sort Menu Dropdown */}
            {sortMenuOpen && (
              <div
                data-tl="me-meetings-sort-menu"
                className="absolute right-0 top-full mt-1.5 w-48 rounded-2xl bg-white p-1.5 shadow-xl border border-gray-100 z-50 flex flex-col gap-0.5 text-left"
              >
                <button
                  type="button"
                  data-tl="me-sort-opt-newest"
                  onClick={() => {
                    tl.setVar("meMeetingsSortMode", "newest");
                    tl.setVar("meMeetingsSortMenuOpen", false);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl flex items-center justify-between hover:bg-gray-50 text-gray-800 font-medium"
                >
                  <span>Date (newest first)</span>
                  {sortMode === "newest" && (
                    <svg className="w-3.5 h-3.5 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  data-tl="me-sort-opt-oldest"
                  onClick={() => {
                    tl.setVar("meMeetingsSortMode", "oldest");
                    tl.setVar("meMeetingsSortMenuOpen", false);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl flex items-center justify-between hover:bg-gray-50 text-gray-800 font-medium"
                >
                  <span>Date (oldest first)</span>
                  {sortMode === "oldest" && (
                    <svg className="w-3.5 h-3.5 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  data-tl="me-sort-opt-az"
                  onClick={() => {
                    tl.setVar("meMeetingsSortMode", "az");
                    tl.setVar("meMeetingsSortMenuOpen", false);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl flex items-center justify-between hover:bg-gray-50 text-gray-800 font-medium"
                >
                  <span>A-Z</span>
                  {sortMode === "az" && (
                    <svg className="w-3.5 h-3.5 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  data-tl="me-sort-opt-za"
                  onClick={() => {
                    tl.setVar("meMeetingsSortMode", "za");
                    tl.setVar("meMeetingsSortMenuOpen", false);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl flex items-center justify-between hover:bg-gray-50 text-gray-800 font-medium"
                >
                  <span>Z-A</span>
                  {sortMode === "za" && (
                    <svg className="w-3.5 h-3.5 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center rounded-xl border border-gray-200 bg-white p-0.5 shadow-2xs">
            <button
              type="button"
              data-tl="me-meetings-btn-grid-view"
              onClick={() => tl.setVar("meMeetingsViewMode", "grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-gray-100 text-[#7014D9]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </button>
            <button
              type="button"
              data-tl="me-meetings-btn-list-view"
              onClick={() => tl.setVar("meMeetingsViewMode", "list")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-gray-100 text-[#7014D9]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-6 border-b border-gray-200">
        {(["Upcoming", "Past", "Cancelled", "All"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            data-tl={`me-meetings-tab-${tab.toLowerCase()}`}
            onClick={() => tl.setVar("meMeetingsTab", tab)}
            className={`pb-2 text-sm font-semibold transition-colors relative ${
              activeTab === tab
                ? "text-[#7014D9] border-b-2 border-[#7014D9]"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {activeTab === "Cancelled" && (
        <div
          data-tl="me-meetings-empty-cancelled"
          className="rounded-3xl border border-gray-200 bg-white p-16 flex flex-col items-center justify-center text-center shadow-xs"
        >
          <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300 mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-gray-900">No meetings found</h3>
          <p className="text-xs text-gray-400 mt-1">No cancelled meetings.</p>
        </div>
      )}

      {activeTab !== "Cancelled" && viewMode === "grid" && (
        <div className="grid grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              data-tl={`me-meet-card-${item.id}`}
              className="rounded-3xl border border-gray-200 bg-white p-5 flex flex-col justify-between shadow-2xs hover:border-purple-200 transition-all text-left gap-4"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide ${
                    item.status === "Confirmed"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {item.status}
                </span>
                <button type="button" className="text-gray-400 hover:text-gray-600 p-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 leading-tight">
                  {item.inviteeName}
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5">{item.inviteeEmail}</span>
              </div>

              <div className="flex flex-col gap-1 pt-2 border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-800">{item.title}</span>
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{item.dateStr} • {item.timeStr}</span>
                </div>
                <span className="text-[10px] text-gray-400">{item.duration}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab !== "Cancelled" && viewMode === "list" && (
        <div data-tl="me-meetings-list-container" className="flex flex-col gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              data-tl={`me-meet-row-${item.id}`}
              className="rounded-2xl border border-gray-200 bg-white p-4 flex items-center justify-between shadow-2xs hover:border-purple-200 transition-all text-left"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-gray-900">{item.inviteeName}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      item.status === "Confirmed"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {item.title} • {item.dateStr} at {item.timeStr} • {item.duration}
                </span>
                <span className="text-[11px] text-gray-400">{item.inviteeEmail}</span>
              </div>

              <button type="button" className="text-gray-400 hover:text-gray-600 p-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
