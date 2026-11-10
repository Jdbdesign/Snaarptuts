"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

interface Props {
  tl: Timeline;
}

export function MeCalendarView({ tl }: Props) {
  const viewMode = useTimelineVar<"month" | "week" | "day">(
    tl,
    "meCalView",
    "month"
  );

  const daysHeader = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const weekDays = [
    { name: "SUN", num: 8 },
    { name: "MON", num: 9 },
    { name: "TUE", num: 10, isToday: true },
    { name: "WED", num: 11 },
    { name: "THU", num: 12 },
    { name: "FRI", num: 13 },
    { name: "SAT", num: 14 },
  ];

  const hoursList = [
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
  ];

  const handleOpenStandup = () => {
    if (!tl) return;
    tl.setVar("meBookingModalLoading", true);
    tl.setVar("meBookingModalOpen", true);
    tl.setVar("meBookingModalBooking", {
      id: "meet-standup",
      title: "Standup Meeting with developers",
      inviteeName: "Casey Brown",
      inviteeEmail: "casey@example.com",
      date: "Tuesday, November 10, 2026 at 11:30 AM",
      duration: "30 minutes",
      location: "Snaarp Meet",
      meetUrl: "https://meet.snaarp.com/meet/csv-vmbx-stn",
      source: "Direct",
      created: "Nov 10, 2026, 2:48 AM",
      timezone: "Africa/Lagos",
      status: "Confirmed",
    });
    setTimeout(() => {
      tl.setVar("meBookingModalLoading", false);
    }, 800);
  };

  return (
    <div
      data-tl="me-calendar-view"
      className="flex flex-col gap-6 max-w-[1280px] mx-auto select-none overflow-y-auto"
    >
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
            {viewMode === "month" && "November 2026"}
            {viewMode === "week" && "November 8 – November 14, 2026"}
            {viewMode === "day" && "Tuesday, November 10, 2026"}
          </span>
        </div>

        {/* View toggles: Month / Week / Day */}
        <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1 shadow-2xs text-xs font-medium">
          <button
            type="button"
            data-tl="me-cal-view-month"
            onClick={() => tl?.setVar("meCalView", "month")}
            className={`rounded-lg px-3 py-1 font-semibold transition-colors ${
              viewMode === "month"
                ? "bg-[#F5EEFF] text-[#7014D9]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Month
          </button>
          <button
            type="button"
            data-tl="me-cal-view-week"
            onClick={() => tl?.setVar("meCalView", "week")}
            className={`rounded-lg px-3 py-1 font-semibold transition-colors ${
              viewMode === "week"
                ? "bg-[#F5EEFF] text-[#7014D9]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Week
          </button>
          <button
            type="button"
            data-tl="me-cal-view-day"
            onClick={() => tl?.setVar("meCalView", "day")}
            className={`rounded-lg px-3 py-1 font-semibold transition-colors ${
              viewMode === "day"
                ? "bg-[#F5EEFF] text-[#7014D9]"
                : "text-gray-600 hover:text-gray-900"
            }`}
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
        {/* VIEW 1: MONTH GRID */}
        {viewMode === "month" && (
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
                const isWed11 = day === 11;

                return (
                  <div
                    key={day}
                    data-tl={`me-cal-day-${day}`}
                    onClick={() => {
                      if (isToday) {
                        tl?.setVar("meDayPopupOpen", true);
                      }
                    }}
                    className={`p-2 flex flex-col justify-between text-left transition-colors hover:bg-gray-50/70 relative cursor-pointer ${
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

                    {isToday && (
                      <div className="rounded-md bg-[#F5EEFF] border border-purple-200/60 px-1.5 py-0.5 text-[10px] font-medium text-[#7014D9] truncate">
                        • Standu...
                      </div>
                    )}
                    {isWed11 && (
                      <div className="rounded-md bg-purple-100/70 border border-purple-200 px-1.5 py-0.5 text-[10px] font-medium text-[#7014D9] truncate">
                        • Creativ...
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: WEEK GRID */}
        {viewMode === "week" && (
          <div data-tl="me-cal-week-view" className="flex-1 rounded-3xl border border-gray-200 bg-white shadow-xs overflow-hidden">
            {/* Week Headers */}
            <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
              {weekDays.map((d) => (
                <div key={d.name} className="py-3 flex flex-col items-center justify-center gap-1 border-r last:border-r-0 border-gray-100">
                  <span className="text-[10px] font-semibold text-gray-400">{d.name}</span>
                  {d.isToday ? (
                    <span className="w-7 h-7 rounded-full bg-[#7014D9] text-white flex items-center justify-center text-xs font-bold">
                      {d.num}
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-gray-800">{d.num}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Week Body */}
            <div className="grid grid-cols-7 min-h-[380px] divide-x divide-gray-100">
              {weekDays.map((d) => (
                <div key={d.name} className="p-2 flex flex-col gap-2">
                  {d.num === 10 && (
                    <div
                      data-tl="me-week-event-standup"
                      onClick={handleOpenStandup}
                      className="rounded-xl bg-[#F5EEFF] border border-purple-200 p-2.5 flex flex-col text-left cursor-pointer hover:border-purple-400 transition-all shadow-2xs"
                    >
                      <span className="text-[10px] font-bold text-[#7014D9]">11:30 AM ...</span>
                      <span className="text-xs font-bold text-gray-900 mt-0.5">Standup ...</span>
                    </div>
                  )}

                  {d.num === 11 && (
                    <div
                      data-tl="me-week-event-creative"
                      className="rounded-xl bg-purple-100/70 border border-purple-200 p-2.5 flex flex-col text-left shadow-2xs"
                    >
                      <span className="text-[10px] font-bold text-[#7014D9]">11:30 AM ...</span>
                      <span className="text-xs font-bold text-gray-900 mt-0.5">Creative ...</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: DAY VIEW */}
        {viewMode === "day" && (
          <div
            data-tl="me-cal-day-view"
            data-scroller="cal-day-grid"
            className="flex-1 rounded-3xl border border-gray-200 bg-white shadow-xs overflow-y-auto max-h-[460px] p-4 flex flex-col"
          >
            <div className="flex flex-col relative divide-y divide-gray-100">
              {hoursList.map((hour) => (
                <div key={hour} className="h-16 flex items-start pt-1 gap-4 text-xs text-gray-400">
                  <span className="w-12 shrink-0 text-right">{hour}</span>
                  <div className="flex-1 h-full relative border-l border-gray-100">
                    {hour === "11 AM" && (
                      <div
                        data-tl="me-day-event-standup"
                        onClick={handleOpenStandup}
                        className="absolute top-8 left-2 right-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white p-3 flex flex-col text-left shadow-md cursor-pointer transition-colors z-10"
                      >
                        <span className="text-xs font-bold">Standup Meeting with developers</span>
                        <span className="text-[11px] text-blue-100 mt-0.5">Casey Brown</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right Sidebar: Upcoming & Integrations */}
        <div
          data-tl="me-cal-right-column"
          data-scroller="calendar-right"
          className="w-[320px] shrink-0 flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-1"
        >
          {/* Upcoming Section */}
          <div
            data-tl="me-cal-upcoming-card"
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs flex flex-col gap-3 text-left"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">Upcoming</h2>
              <span className="rounded-full bg-[#7014D9] text-white text-[10px] font-bold px-2 py-0.5">
                2
              </span>
            </div>

            {/* Meeting 1: Standup */}
            <div className="rounded-2xl border border-gray-200 p-3.5 flex items-start gap-3 bg-gray-50/50">
              <div className="w-1 h-9 bg-blue-600 rounded-full shrink-0 mt-0.5" />
              <div className="flex-1 flex flex-col">
                <span className="text-xs font-bold text-gray-900 leading-tight">
                  Standup Meeting with developers
                </span>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-bold">
                    CB
                  </div>
                  <span className="text-[11px] text-gray-600">Casey Brown</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-1">
                  Today • 11:30 AM – 12:00 PM
                </span>
              </div>
            </div>

            {/* Meeting 2: Creative */}
            <div className="rounded-2xl border border-gray-200 p-3.5 flex items-start gap-3 bg-gray-50/50">
              <div className="w-1 h-9 bg-[#7014D9] rounded-full shrink-0 mt-0.5" />
              <div className="flex-1 flex flex-col">
                <span className="text-xs font-bold text-gray-900 leading-tight">
                  Creative meeting with the Team
                </span>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-4 h-4 rounded-full bg-purple-200 text-[#7014D9] flex items-center justify-center text-[9px] font-bold">
                    JS
                  </div>
                  <span className="text-[11px] text-gray-600">John Smith</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-1">
                  Tomorrow • 11:30 AM – 12:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* Calendar Integrations */}
          <div
            data-tl="me-cal-integrations-card"
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xs flex flex-col gap-4 text-left"
          >
            <div className="flex flex-col">
              <h2 className="text-sm font-bold text-gray-900">Calendar Integrations</h2>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Sync your other calendars to see everything in one place. Only Snaarp Me bookings appear until you connect.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Snaarp Meet */}
              <div className="flex items-center justify-between p-2 rounded-xl border border-gray-100 bg-gray-50/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-800">Snaarp Meet</span>
                    <span className="text-[10px] text-gray-400">Connected</span>
                  </div>
                </div>
                <button type="button" className="text-xs font-semibold text-red-500 hover:text-red-700">
                  Disconnect
                </button>
              </div>

              {/* Google Calendar */}
              <div className="flex items-center justify-between p-2 rounded-xl border border-gray-100 bg-gray-50/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-blue-500 flex items-center justify-center font-bold text-xs">
                    G
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-800">Google Calendar</span>
                    <span className="text-[10px] text-gray-400">Not connected</span>
                  </div>
                </div>
                <button type="button" className="text-xs font-semibold text-gray-700 hover:text-purple-600">
                  Connect
                </button>
              </div>

              {/* Outlook Calendar */}
              <div className="flex items-center justify-between p-2 rounded-xl border border-gray-100 bg-gray-50/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
                    O
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-800">Outlook Calendar</span>
                    <span className="text-[10px] text-gray-400">Not connected</span>
                  </div>
                </div>
                <button type="button" className="text-xs font-semibold text-gray-700 hover:text-purple-600">
                  Connect
                </button>
              </div>

              {/* Apple Calendar */}
              <div className="flex items-center justify-between p-2 rounded-xl border border-gray-100 bg-gray-50/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">
                    
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-800">Apple Calendar</span>
                    <span className="text-[10px] text-gray-400">Not connected</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-400">Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
