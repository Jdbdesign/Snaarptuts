"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

interface Props {
  tl: Timeline;
}

export function MeBookingPage({ tl }: Props) {
  const step = useTimelineVar<"select-slot" | "enter-details" | "scheduled">(
    tl,
    "meBookingPageStep",
    "select-slot"
  );
  const selectedDay = useTimelineVar<number>(tl, "meBookingPageSelectedDay", 11);
  const selectedTime = useTimelineVar<string>(tl, "meBookingPageSelectedTime", "11:30");
  const name = useTimelineVar<string>(tl, "meBookingPageName", "");
  const email = useTimelineVar<string>(tl, "meBookingPageEmail", "");
  const guestInputOpen = useTimelineVar<boolean>(tl, "meBookingPageGuestInputOpen", false);
  const guestEmail = useTimelineVar<string>(tl, "meBookingPageGuest", "");
  const guestAdded = useTimelineVar<boolean>(tl, "meBookingPageGuestAdded", false);
  const notes = useTimelineVar<string>(tl, "meBookingPageNotes", "");
  const timezone = useTimelineVar<string>(tl, "meBookingPageTimezone", "Lagos (GMT+1)");

  const timeSlots = [
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "11:30",
  ];

  const calDays = [
    { day: 1, available: false },
    { day: 2, available: false },
    { day: 3, available: false },
    { day: 4, available: false },
    { day: 5, available: false },
    { day: 6, available: false },
    { day: 7, available: false },
    { day: 8, available: false },
    { day: 9, available: false },
    { day: 10, available: true },
    { day: 11, available: true },
    { day: 12, available: true },
    { day: 13, available: true },
    { day: 14, available: false },
    { day: 15, available: false },
    { day: 16, available: false },
    { day: 17, available: true },
    { day: 18, available: true },
    { day: 19, available: true },
    { day: 20, available: true },
    { day: 21, available: false },
    { day: 22, available: false },
    { day: 23, available: false },
    { day: 24, available: true },
    { day: 25, available: true },
    { day: 26, available: true },
    { day: 27, available: true },
    { day: 28, available: false },
    { day: 29, available: false },
    { day: 30, available: true },
  ];

  return (
    <div
      data-scroller
      className="min-h-full w-full bg-[#F3F4F6] flex items-center justify-center p-6 font-['Poppins',sans-serif] text-[#111827] select-none"
    >
      <div
        data-tl="me-public-card"
        className="w-full max-w-4xl bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden flex min-h-[580px] animate-fadeIn"
      >
        {/* Left Information Panel (38% width) */}
        <div className="w-[360px] shrink-0 border-r border-gray-200 flex flex-col justify-between text-left">
          {/* Top Gradient Header */}
          <div className="bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-white p-7 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {step === "scheduled" ? (
                <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center font-bold text-base">
                  ✓
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-bold text-sm">
                  JD
                </div>
              )}
              <span className="font-semibold text-sm tracking-wide">
                {step === "scheduled" ? "Jane" : "Jane"}
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight leading-snug mt-1">
              {step === "scheduled"
                ? "You are scheduled!"
                : "Creative meeting with the Team"}
            </h2>

            <div className="flex items-center gap-2 mt-1">
              <span className="rounded-full bg-white/20 backdrop-blur-2xs px-3 py-1 text-xs font-semibold flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>30 min</span>
              </span>

              <span className="rounded-full bg-white/20 backdrop-blur-2xs px-3 py-1 text-xs font-semibold flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Snaarp Meet</span>
              </span>
            </div>
          </div>

          {/* Bottom Panel Details */}
          <div className="p-7 flex-1 flex flex-col justify-between text-xs text-gray-600 gap-4">
            <div className="flex flex-col gap-4">
              {step === "enter-details" && (
                <div className="flex flex-col gap-2.5 pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-800 font-semibold">
                    <svg className="w-4 h-4 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Wednesday, November 11 at 11:30 AM GMT+1</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Africa/Lagos</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <span className="font-bold text-gray-800 text-sm">Hi there! 👋</span>
                <p className="text-gray-500 leading-relaxed text-xs">
                  {step === "scheduled"
                    ? "A calendar invitation has been sent to your email address."
                    : "Learn how to plan your week with Snaarp Me"}
                </p>
                <span className="text-gray-500 mt-1">See you soon!</span>
                <span className="font-semibold text-gray-800">— Jane</span>
              </div>
            </div>

            {/* Back link when in enter-details */}
            {step === "enter-details" && (
              <button
                type="button"
                data-tl="me-public-btn-change-time"
                onClick={() => tl.setVar("meBookingPageStep", "select-slot")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors pt-2"
              >
                <span>&lt; Change time</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Content Area (62% width) */}
        <div className="flex-1 p-8 text-left">
          {/* State A: Select Date & Time */}
          {step === "select-slot" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <h1
                  data-tl="me-public-title-select"
                  className="text-xl font-bold tracking-tight text-gray-900"
                >
                  Select a date & time
                </h1>
                <div
                  data-tl="me-public-tz-select"
                  className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 cursor-pointer hover:text-gray-800"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{timezone}</span>
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Month Calendar + Slots Grid */}
              <div className="flex gap-8 items-start">
                {/* Calendar Picker (Left) */}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center justify-between px-1">
                    <button type="button" className="p-1 rounded-lg hover:bg-gray-100 text-gray-500">
                      &lt;
                    </button>
                    <span className="font-bold text-sm text-gray-900">November 2026</span>
                    <button type="button" className="p-1 rounded-lg hover:bg-gray-100 text-gray-500">
                      &gt;
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-gray-400">
                    <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {calDays.map((c) => {
                      const isSelected = c.day === selectedDay;

                      return (
                        <button
                          key={c.day}
                          type="button"
                          data-tl={`me-public-cal-day-${c.day}`}
                          onClick={() => {
                            if (c.available) {
                              tl.setVar("meBookingPageSelectedDay", c.day);
                            }
                          }}
                          className={`py-2 rounded-xl flex flex-col items-center justify-center font-semibold transition-all relative ${
                            isSelected
                              ? "bg-[#4F46E5] text-white shadow-xs"
                              : c.available
                              ? "text-gray-800 hover:bg-purple-50"
                              : "text-gray-300"
                          }`}
                        >
                          <span>{c.day}</span>
                          {c.available && !isSelected && (
                            <span className="w-1 h-1 rounded-full bg-blue-600 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="w-px bg-gray-100 self-stretch" />

                {/* Slots Column (Right) */}
                <div className="w-[180px] shrink-0 flex flex-col gap-2">
                  <div className="flex flex-col mb-1">
                    <span className="text-xs font-bold text-gray-900">
                      Wednesday, November 11
                    </span>
                    <span className="text-[10px] text-gray-400">
                      31 time slots available
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto pr-1">
                    {timeSlots.map((slot) => {
                      const isTarget = slot === "11:30";

                      return (
                        <button
                          key={slot}
                          type="button"
                          data-tl={`me-public-slot-${slot.replace(":", "")}`}
                          onClick={() => {
                            tl.setVar("meBookingPageSelectedTime", slot);
                            tl.setVar("meBookingPageStep", "enter-details");
                          }}
                          className={`rounded-2xl border py-2.5 text-center text-xs font-semibold transition-all shadow-2xs ${
                            isTarget && selectedTime === "11:30"
                              ? "border-[#7014D9] text-[#7014D9] bg-[#F5EEFF]"
                              : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-gray-50"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* State B: Enter Details Form */}
          {step === "enter-details" && (
            <div className="flex flex-col gap-4 max-w-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                ENTER DETAILS
              </span>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="me-public-input-name"
                  value={name}
                  placeholder="Invitee full name"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-xs text-gray-900 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="me-public-input-email"
                  value={email}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-xs text-gray-900 focus:outline-none"
                />
              </div>

              {/* Guests */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  GUESTS
                </span>

                {guestAdded && (
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      data-tl="me-public-guest-badge"
                      className="rounded-full bg-purple-50 text-[#7014D9] border border-purple-200 text-xs px-3 py-1 font-medium flex items-center gap-1.5"
                    >
                      <span>guest@example.com</span>
                      <span className="cursor-pointer font-bold">×</span>
                    </span>
                  </div>
                )}

                {guestInputOpen && !guestAdded ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      data-tl="me-public-input-guest"
                      value={guestEmail}
                      placeholder="guest@example.com"
                      className="flex-1 rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-xs text-gray-900"
                    />
                    <button
                      type="button"
                      data-tl="me-public-btn-submit-guest"
                      onClick={() => tl.setVar("meBookingPageGuestAdded", true)}
                      className="rounded-xl bg-[#4F46E5] text-white px-4 py-2 text-xs font-semibold shadow-xs"
                    >
                      Add
                    </button>
                  </div>
                ) : !guestAdded ? (
                  <button
                    type="button"
                    data-tl="me-public-btn-add-guests"
                    onClick={() => tl.setVar("meBookingPageGuestInputOpen", true)}
                    className="text-xs font-semibold text-[#4F46E5] hover:underline flex items-center gap-1"
                  >
                    <span>+ Add guests</span>
                  </button>
                ) : null}
              </div>

              {/* Additional Notes */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  ADDITIONAL NOTES
                </span>
                <textarea
                  rows={3}
                  readOnly
                  data-tl="me-public-input-notes"
                  value={notes}
                  placeholder="Anything you'd like to share before the meeting..."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 p-4 text-xs text-gray-900 focus:outline-none resize-none"
                />
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-gray-400 leading-relaxed">
                By proceeding, you confirm that you have read and agree to Snaarp Me&apos;s{" "}
                <span className="font-semibold text-gray-700">Invitee Terms</span> and{" "}
                <span className="font-semibold text-gray-700">Privacy Notice</span>.
              </p>

              {/* Submit Button */}
              <button
                type="button"
                data-tl="me-public-btn-schedule-event"
                onClick={() => tl.setVar("meBookingPageStep", "scheduled")}
                className="w-full rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] py-3 text-xs font-bold text-white shadow-xs transition-colors mt-1"
              >
                Schedule Event
              </button>
            </div>
          )}

          {/* State C: Scheduled Confirmation */}
          {step === "scheduled" && (
            <div className="flex flex-col gap-6 max-w-lg">
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-base text-gray-900">
                    Creative meeting with the Team
                  </h3>
                  <span className="text-xs text-gray-500 mt-0.5">
                    Wednesday, November 11, 2026 at 11:30 AM GMT+1
                  </span>
                </div>
              </div>

              {/* Booking Details List */}
              <div className="flex flex-col gap-3 text-xs border-y border-gray-100 py-4">
                <span className="font-bold text-gray-900 text-sm">Booking Details</span>

                <div className="flex items-start gap-3 text-gray-700">
                  <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Wednesday, November 11, 2026 at 11:30 AM GMT+1 to 12:00 PM GMT+1</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>30 min</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <span className="text-gray-400 mr-2">Organizer</span>
                    <span className="font-semibold text-gray-900">Jane</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <span className="text-gray-400 mr-2">Invitee</span>
                    <span className="font-semibold text-gray-900 mr-1.5">John Smith</span>
                    <span className="text-gray-500 font-mono text-[11px]">john@example.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <span className="text-gray-400 mr-2">Guests</span>
                    <span className="font-mono text-[11px] text-gray-600">guest@example.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400 mr-1">Venue</span>
                    <span className="text-[#4F46E5] font-mono text-[11px]">
                      https://meet.snaarp.com/meet/mbi-ewgn-soq
                    </span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="text-gray-400 mr-2">Status</span>
                    <span className="font-semibold text-emerald-700">Confirmed</span>
                  </div>
                </div>
              </div>

              {/* Add to Calendar */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-bold text-gray-900">Add to calendar</span>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    data-tl="me-public-btn-cal-google"
                    className="flex-1 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 py-2 px-3 text-[11px] font-semibold text-gray-700 shadow-2xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Google Calendar</span>
                  </button>

                  <button
                    type="button"
                    data-tl="me-public-btn-cal-outlook"
                    className="flex-1 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 py-2 px-3 text-[11px] font-semibold text-gray-700 shadow-2xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Outlook</span>
                  </button>

                  <button
                    type="button"
                    data-tl="me-public-btn-cal-ics"
                    className="flex-1 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 py-2 px-3 text-[11px] font-semibold text-gray-700 shadow-2xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download .ics</span>
                  </button>
                </div>
              </div>

              {/* Book a new time */}
              <button
                type="button"
                data-tl="me-public-btn-book-new"
                onClick={() => tl.setVar("meBookingPageStep", "select-slot")}
                className="w-full rounded-2xl bg-[#F5EEFF] hover:bg-[#ebdcfc] py-3 text-xs font-bold text-[#7014D9] shadow-xs transition-colors mt-2"
              >
                Book a new time
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
