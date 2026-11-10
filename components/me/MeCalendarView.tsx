"use client";

import React from "react";

export function MeCalendarView() {
  const daysHeader = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // November 2026 starts on Sunday (day 1 = Sunday)
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-6 max-w-[1240px] mx-auto select-none">
      {/* Header */}
      <div className="flex flex-col text-left">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Calendar</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Schedule personal events, and view bookings, connected calendars, and Snaarp Meet meetings
        </p>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          data-tl="me-cal-filter-me"
          className="rounded-full border border-gray-200 bg-white px-3.5 py-1 text-xs font-medium text-gray-700 shadow-2xs flex items-center gap-2 hover:bg-gray-50"
        >
          <span className="w-2 h-2 rounded-full bg-[#7014D9]" />
          <span>Snaarp Me</span>
        </button>

        <button
          type="button"
          data-tl="me-cal-filter-meet"
          className="rounded-full border border-gray-200 bg-white px-3.5 py-1 text-xs font-medium text-gray-700 shadow-2xs flex items-center gap-2 hover:bg-gray-50"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>Snaarp Meet</span>
        </button>
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl border border-gray-200 bg-white p-0.5 shadow-2xs">
            <button
              type="button"
              data-tl="me-cal-prev"
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              data-tl="me-cal-next"
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            data-tl="me-cal-today"
            className="rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50"
          >
            Today
          </button>

          <span data-tl="me-cal-month-title" className="text-lg font-bold text-gray-900 ml-2">
            November 2026
          </span>
        </div>

        {/* View toggles: Month / Week / Day */}
        <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1 shadow-2xs text-xs font-medium">
          <button
            type="button"
            data-tl="me-cal-view-month"
            className="rounded-lg bg-[#F5EEFF] px-3 py-1 font-semibold text-[#7014D9]"
          >
            Month
          </button>
          <button
            type="button"
            data-tl="me-cal-view-week"
            className="rounded-lg px-3 py-1 text-gray-600 hover:text-gray-900"
          >
            Week
          </button>
          <button
            type="button"
            data-tl="me-cal-view-day"
            className="rounded-lg px-3 py-1 text-gray-600 hover:text-gray-900"
          >
            Day
          </button>
        </div>
      </div>

      {/* Buttons row */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          data-tl="me-cal-btn-schedule"
          className="rounded-xl bg-[#7014D9] hover:bg-[#5e0eb8] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors flex items-center gap-1.5"
        >
          <span>Schedule event</span>
        </button>
        <button
          type="button"
          data-tl="me-cal-btn-connect"
          className="rounded-xl border border-gray-200 bg-white hover:bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Connect Calendar</span>
        </button>
      </div>

      {/* Main Area: Grid vs Right Sidebar */}
      <div className="flex gap-6 items-start">
        {/* Calendar Grid */}
        <div className="flex-1 rounded-3xl border border-gray-200 bg-white shadow-xs overflow-hidden">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
            {daysHeader.map((d) => (
              <div key={d} className="py-2.5 text-center text-[11px] font-semibold text-gray-400">
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid: 5 weeks */}
          <div className="grid grid-cols-7 auto-rows-[82px] divide-x divide-y divide-gray-100 border-b border-gray-100">
            {daysInMonth.map((day) => {
              const isToday = day === 10;
              const hasEvent = day === 10;

              return (
                <div
                  key={day}
                  data-tl={`me-cal-day-${day}`}
                  className={`p-2 flex flex-col justify-between text-left transition-colors hover:bg-gray-50/70 relative ${
                    isToday ? "bg-purple-50/20" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {isToday ? (
                      <span className="w-6 h-6 rounded-full bg-[#7014D9] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                        {day}
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-gray-600 pl-1">{day}</span>
                    )}
                  </div>

                  {hasEvent && (
                    <div className="rounded-md bg-[#F5EEFF] border border-purple-200/60 px-1.5 py-0.5 text-[10px] font-medium text-[#7014D9] truncate">
                      • Standu...
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: Upcoming & Integrations */}
        <div className="w-[320px] shrink-0 flex flex-col gap-6">
          {/* Upcoming Section */}
          <div
            data-tl="me-cal-upcoming-card"
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs flex flex-col gap-3 text-left"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">Upcoming</h2>
              <span className="rounded-full bg-[#7014D9] text-white text-[10px] font-bold px-2 py-0.5">
                1
              </span>
            </div>

            <div className="rounded-2xl border border-gray-200 p-3.5 flex items-start gap-3 bg-gray-50/50">
              <div className="w-1 h-9 bg-[#7014D9] rounded-full shrink-0 mt-0.5" />
              <div className="flex-1 flex flex-col">
                <span className="text-xs font-bold text-gray-900 leading-tight">
                  Standup Meeting with developers
                </span>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-4 h-4 rounded-full bg-purple-200 text-[#7014D9] flex items-center justify-center text-[9px] font-bold">
                    ST
                  </div>
                  <span className="text-[11px] text-gray-600">Sam Taylor</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-1">
                  Today · 11:30 AM – 12:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* Calendar Integrations Section */}
          <div
            data-tl="me-cal-integrations-card"
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs flex flex-col gap-4 text-left"
          >
            <div>
              <h2 className="text-sm font-bold text-gray-900">Calendar Integrations</h2>
              <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                Sync your other calendars to see everything in one place. Only Snaarp Me bookings appear until you connect.
              </p>
            </div>

            <div className="flex flex-col divide-y divide-gray-100">
              {/* Snaarp Meet */}
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-900">Snaarp Meet</span>
                    <span className="text-[10px] text-gray-400">Connected</span>
                  </div>
                </div>
                <button type="button" className="text-xs font-medium text-rose-600 hover:underline">
                  Disconnect
                </button>
              </div>

              {/* Google Calendar */}
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center font-bold text-xs border border-red-100">
                    G
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-900">Google Calendar</span>
                    <span className="text-[10px] text-gray-400">Not connected</span>
                  </div>
                </div>
                <button type="button" className="text-xs font-semibold text-[#7014D9] hover:underline">
                  Connect
                </button>
              </div>

              {/* Outlook Calendar */}
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-100">
                    O
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-900">Outlook Calendar</span>
                    <span className="text-[10px] text-gray-400">Not connected</span>
                  </div>
                </div>
                <button type="button" className="text-xs font-semibold text-[#7014D9] hover:underline">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
