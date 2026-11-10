"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { Booking, ActivityItem } from "./me-data";
import { MeToastBanner } from "./MeToastBanner";

interface Props {
  tl: Timeline;
}

export function MeHomeView({ tl }: Props) {
  const bookings = useTimelineVar<Booking[]>(tl, "meBookings", []);
  const activities = useTimelineVar<ActivityItem[]>(tl, "meActivities", []);

  const bookingsCount = bookings.length;
  const upcomingCount = bookings.filter((b: Booking) => b.status === "Confirmed").length;

  return (
    <div className="flex flex-col gap-6 max-w-[1180px] mx-auto">
      <MeToastBanner tl={tl} />

      {/* Top 2-Column Grid: Left Content (Welcome, Today, Stats) vs Right (Recent Activity) */}
      <div className="flex gap-6 items-start">
        {/* Left Primary Column */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Welcome Card */}
          <div
            data-tl="me-welcome-card"
            className="rounded-3xl border border-gray-200/90 bg-white p-7 shadow-xs flex items-center justify-between"
          >
            <div>
              <h1
                data-tl="me-welcome-title"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Welcome back, Jane
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Here&apos;s what&apos;s happening with your schedule today.
              </p>
            </div>
            <button
              type="button"
              data-tl="me-btn-new-event"
              onClick={() => {
                tl.setVar("meCreateModalOpen", true);
                tl.setVar("meCreateStep", 1);
              }}
              className="rounded-full bg-gray-100 hover:bg-gray-200/90 text-gray-800 px-5 py-2.5 text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>+ New Event</span>
            </button>
          </div>

          {/* Today's Schedule */}
          <section data-tl="me-today-section" className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                Today&apos;s Schedule
              </h2>
              <button
                type="button"
                data-tl="me-link-view-calendar"
                onClick={() => {
                  tl.setUrl("snaarp.me/calendar");
                  tl.setVar("meView", "calendar");
                }}
                className="text-sm font-semibold text-[#7014D9] hover:underline flex items-center gap-1"
              >
                <span>View calendar</span>
                <span>→</span>
              </button>
            </div>

            {/* Today Booking Card */}
            <div
              data-tl="me-today-booking-card"
              onClick={() => {
                tl.setVar("meBookingModalOpen", true);
                tl.setVar("meBookingModalBooking", bookings[0] || null);
              }}
              className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-2xs hover:border-purple-300 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-10 bg-[#7014D9] rounded-full shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="font-bold text-base text-gray-900">11:30 AM</span>
                  <span className="text-xs text-gray-400">12:00 PM</span>
                </div>
                <div className="h-8 w-px bg-gray-100 mx-2" />
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-sm text-gray-900">Sam Taylor</span>
                  <span className="text-xs text-gray-500">
                    Standup Meeting with developers · 30 min
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-600">
                <span className="text-xs font-medium text-gray-500">Confirmed</span>
                <svg
                  data-tl="me-today-booking-chevron"
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </section>

          {/* 4 Stat Cards */}
          <section className="grid grid-cols-4 gap-4">
            {/* Stat 1: Bookings This Week */}
            <div
              data-tl="me-stat-bookings"
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xs flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F5EEFF] flex items-center justify-center text-[#7014D9] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 leading-none">
                  {bookingsCount}
                </span>
                <span className="text-[11px] font-medium text-gray-500 mt-1 leading-tight">
                  Bookings This Week
                </span>
              </div>
            </div>

            {/* Stat 2: Upcoming */}
            <div
              data-tl="me-stat-upcoming"
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xs flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 leading-none">
                  {upcomingCount}
                </span>
                <span className="text-[11px] font-medium text-gray-500 mt-1 leading-tight">
                  Upcoming
                </span>
              </div>
            </div>

            {/* Stat 3: Completed This Week */}
            <div
              data-tl="me-stat-completed"
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xs flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F5EEFF] flex items-center justify-center text-[#7014D9] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 leading-none">0</span>
                <span className="text-[11px] font-medium text-gray-500 mt-1 leading-tight">
                  Completed This Week
                </span>
              </div>
            </div>

            {/* Stat 4: Cancellation Rate */}
            <div
              data-tl="me-stat-cancellation"
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xs flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 leading-none">0.0%</span>
                <span className="text-[11px] font-medium text-gray-500 mt-1 leading-tight">
                  Cancellation Rate
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Recent Activity Card */}
        <div
          data-tl="me-recent-activity-card"
          className="w-[340px] shrink-0 rounded-3xl border border-gray-200 bg-white p-5 shadow-xs flex flex-col self-stretch"
        >
          <h2 className="text-sm font-bold text-gray-900 mb-4 px-1">Recent Activity</h2>
          <div
            data-tl="me-recent-activity-list"
            data-me-activity-scroll="true"
            className="flex-1 flex flex-col gap-3.5 overflow-y-auto pr-1"
          >
            {activities.map((item: ActivityItem) => (
              <div
                key={item.id}
                data-tl={`me-activity-item-${item.id}`}
                className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    item.type === "new-booking"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {item.type === "new-booking" ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v6m-3-3h6" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col text-left">
                  <div className="text-xs leading-snug text-gray-800">
                    <span
                      className={`font-semibold ${
                        item.type === "new-booking" ? "text-emerald-700" : "text-amber-700"
                      }`}
                    >
                      {item.type === "new-booking" ? "New booking" : "Rescheduled"}{" "}
                    </span>
                    <span>— </span>
                    <span className="font-semibold text-gray-900">{item.userName}</span>
                    <span> booked </span>
                    <span className="text-gray-700">{item.eventName}</span>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-gray-400 shrink-0 ml-1">
                  {item.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Upcoming Bookings */}
      <section data-tl="me-upcoming-section" className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-gray-900 tracking-tight px-1">
          Upcoming Bookings
        </h2>

        <div className="flex flex-col gap-3">
          {bookings.map((b: Booking) => (
            <div
              key={b.id}
              data-tl={`me-upcoming-card-${b.id}`}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xs flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-10 bg-[#7014D9] rounded-full shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-sm text-gray-900">{b.inviteeName}</span>
                  <span className="text-xs text-gray-500">
                    {b.title} · {b.duration}
                  </span>
                  <span className="text-[11px] text-gray-400 mt-0.5">{b.timeLabel}</span>
                </div>
              </div>

              <button
                type="button"
                data-tl={`me-btn-view-booking-${b.id}`}
                className="rounded-full border border-gray-200 px-4 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
              >
                <span>View</span>
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
