"use client";

import React from "react";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Video,
  Unlink,
} from "lucide-react";
import { CALENDAR_EVENTS } from "./teams-data";

interface Props {
  isConnected: boolean;
  selectedDay: number;
  monthTitle: string;
  joinPressed?: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onSelectDay: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onJoinMeeting: () => void;
  onOpenSnaarpMe: () => void;
}

export function TeamsCalendarView({
  isConnected,
  selectedDay,
  monthTitle,
  joinPressed = false,
  onConnect,
  onDisconnect,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
  onToday,
  onJoinMeeting,
  onOpenSnaarpMe,
}: Props) {
  // If not connected, show the Connect Snaarp Me centered card
  if (!isConnected) {
    return (
      <div
        data-tl="teams-calendar-unconnected"
        className="flex-1 flex items-center justify-center p-6 bg-[#FAFAFC] h-full"
      >
        <div
          data-tl="calendar-connect-card"
          className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 max-w-md w-full text-center shadow-sm space-y-4"
        >
          {/* Purple tile icon */}
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-sm">
            S
          </div>

          <h2
            data-tl="calendar-connect-title"
            className="text-lg font-bold text-gray-900"
          >
            Connect Snaarp Me
          </h2>

          <p
            data-tl="calendar-connect-desc"
            className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto"
          >
            Link your Snaarp Me account to load your calendar here and show upcoming
            meetings under Meet → Scheduled.
          </p>

          <div className="pt-2">
            <button
              type="button"
              data-tl="calendar-connect-btn"
              onClick={onConnect}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              Connect Snaarp Me account
            </button>
          </div>

          <div>
            <button
              type="button"
              data-tl="calendar-open-snaarp-me-link"
              onClick={onOpenSnaarpMe}
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 font-medium cursor-pointer"
            >
              <span>Open Snaarp Me</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Connected state: Month Grid + Day Panel
  const isNov = monthTitle.includes("November");
  const meetingForSelectedDay = isNov
    ? CALENDAR_EVENTS.find((e) => e.day === selectedDay)
    : null;

  const dayNameStr =
    selectedDay === 10
      ? "Tuesday, Nov 10"
      : selectedDay === 11
      ? "Wednesday, Nov 11"
      : selectedDay === 17
      ? "Tuesday, Nov 17"
      : selectedDay === 24
      ? "Tuesday, Nov 24"
      : `Day ${selectedDay}`;

  return (
    <div
      data-tl="teams-calendar-connected"
      className="flex-1 flex flex-col h-full bg-[#FAFAFC] overflow-y-auto"
    >
      <div className="max-w-6xl w-full mx-auto p-6 md:p-8 space-y-4">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1
                data-tl="calendar-header-title"
                className="text-xl font-bold text-gray-900"
              >
                Snaarp Me
              </h1>
              <span
                data-tl="calendar-status-badge"
                className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1"
              >
                ✓ Connected
              </span>
            </div>
            <p
              data-tl="calendar-account-line"
              className="text-xs text-gray-500 mt-1"
            >
              jane@example.com · 2 meetings this month
            </p>
          </div>

          {/* Action buttons top-right */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="calendar-open-btn"
              onClick={onOpenSnaarpMe}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs text-gray-700 font-medium inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Open Snaarp Me</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
            </button>

            <button
              type="button"
              data-tl="calendar-disconnect-btn"
              onClick={onDisconnect}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs text-gray-700 font-medium inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Unlink className="w-3.5 h-3.5 text-gray-500" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>

        {/* Main Grid + Day Panel Layout */}
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {/* Calendar Grid Card */}
          <div
            data-tl="calendar-grid-card"
            className="flex-1 w-full bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
          >
            {/* Calendar Controls Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-tl="calendar-prev-month-btn"
                  onClick={onPrevMonth}
                  className="p-1 rounded-lg hover:bg-gray-100 text-gray-600 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h2
                  data-tl="calendar-month-title"
                  className="text-sm font-bold text-gray-900"
                >
                  {monthTitle}
                </h2>
                <button
                  type="button"
                  data-tl="calendar-next-month-btn"
                  onClick={onNextMonth}
                  className="p-1 rounded-lg hover:bg-gray-100 text-gray-600 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                data-tl="calendar-today-btn"
                onClick={onToday}
                className="px-3 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 shadow-sm cursor-pointer"
              >
                Today
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 text-center py-2 text-[11px] font-semibold text-gray-400 border-b border-gray-100">
              <div>SUN</div>
              <div>MON</div>
              <div>TUE</div>
              <div>WED</div>
              <div>THU</div>
              <div>FRI</div>
              <div>SAT</div>
            </div>

            {/* November 2026 Grid (30 days, Sun = 1 to Mon = 30) */}
            <div className="grid grid-cols-7 gap-1 pt-2">
              {Array.from({ length: 30 }, (_, i) => {
                const dayNum = i + 1;
                const isSelected = isNov && selectedDay === dayNum;
                const isToday = isNov && dayNum === 17;
                const evt = isNov ? CALENDAR_EVENTS.find((e) => e.day === dayNum) : null;

                return (
                  <div
                    key={dayNum}
                    data-tl={`calendar-day-${dayNum}`}
                    onClick={() => onSelectDay(dayNum)}
                    className={`min-h-[64px] p-1.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-purple-500 bg-purple-50/60 shadow-xs"
                        : "border-gray-100 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {isToday ? (
                        <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                          {dayNum}
                        </span>
                      ) : (
                        <span
                          className={`text-xs font-medium ${
                            isSelected ? "text-purple-700 font-bold" : "text-gray-700"
                          }`}
                        >
                          {dayNum}
                        </span>
                      )}
                    </div>

                    {/* Event Chips */}
                    {evt ? (
                      <div
                        data-tl={`calendar-event-${dayNum}`}
                        className="bg-purple-100/70 border border-purple-200/50 rounded px-1.5 py-0.5 text-[9px] font-medium text-purple-700 truncate"
                        title={evt.title}
                      >
                        {evt.chipText}
                      </div>
                    ) : (
                      <div className="h-4" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footnote */}
            <p
              data-tl="calendar-footnote"
              className="text-center text-xs text-gray-400 mt-4 pt-2 border-t border-gray-50"
            >
              Upcoming Snaarp Me bookings also appear under Meet → Scheduled.
            </p>
          </div>

          {/* Day Panel on the Right */}
          <div
            data-tl="calendar-day-panel"
            className="w-full lg:w-72 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm shrink-0"
          >
            <div>
              <h3
                data-tl="calendar-day-title"
                className="text-xs font-bold text-gray-900"
              >
                {dayNameStr}
              </h3>
              <p
                data-tl="calendar-day-count"
                className="text-[11px] text-gray-500 mt-0.5"
              >
                {meetingForSelectedDay ? "1 meeting" : "No meetings"}
              </p>
            </div>

            {meetingForSelectedDay ? (
              <div
                data-tl="calendar-meeting-card"
                className="mt-4 border border-gray-200 rounded-xl p-3 bg-white space-y-2 shadow-xs"
              >
                <h4
                  data-tl="calendar-meeting-title"
                  className="text-xs font-semibold text-gray-900"
                >
                  {meetingForSelectedDay.title}
                </h4>
                <p
                  data-tl="calendar-meeting-time"
                  className="text-[11px] text-gray-500"
                >
                  {meetingForSelectedDay.time}
                </p>
                <p
                  data-tl="calendar-meeting-host"
                  className="text-[11px] text-gray-500"
                >
                  {meetingForSelectedDay.host}
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    data-tl="calendar-meeting-join-btn"
                    onClick={onJoinMeeting}
                    className={`w-full py-1.5 px-3 rounded-lg bg-purple-600 text-white text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      joinPressed
                        ? "scale-95 bg-purple-700 ring-2 ring-purple-300"
                        : "hover:bg-purple-700"
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join</span>
                  </button>
                </div>
              </div>
            ) : (
              <div
                data-tl="calendar-no-meetings-panel"
                className="py-12 text-center space-y-2"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold mx-auto">
                  S
                </div>
                <p
                  data-tl="calendar-no-meetings-msg"
                  className="text-xs text-gray-500"
                >
                  No Snaarp Me meetings on this day.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
