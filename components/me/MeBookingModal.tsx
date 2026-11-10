"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { Booking } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeBookingModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meBookingModalOpen", false);
  const booking = useTimelineVar<Booking | null>(tl, "meBookingModalBooking", null);

  if (!isOpen || !booking) return null;

  return (
    <div
      data-tl="me-booking-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-2xs animate-fadeIn select-none"
    >
      <div
        data-tl="me-booking-modal"
        className="relative w-full max-w-2xl rounded-3xl bg-white p-7 shadow-2xl border border-gray-100 flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col text-left">
            <h2
              data-tl="me-modal-title"
              className="text-xl font-bold tracking-tight text-gray-900"
            >
              {booking.title}
            </h2>
            <span
              data-tl="me-modal-subtitle"
              className="text-sm text-gray-500 mt-0.5"
            >
              with {booking.inviteeName}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span
              data-tl="me-modal-status-badge"
              className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800"
            >
              {booking.status}
            </span>
            <button
              type="button"
              data-tl="me-modal-btn-close-x"
              onClick={() => tl.setVar("meBookingModalOpen", false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content: 2-Column Grid */}
        <div className="grid grid-cols-5 gap-6">
          {/* Left Column: Meeting (3 cols) */}
          <div className="col-span-3 rounded-2xl bg-gray-50/70 p-5 border border-gray-100 flex flex-col gap-4 text-left">
            <h3 className="text-sm font-bold text-gray-900">Meeting</h3>

            <div className="grid grid-cols-2 gap-y-4 gap-x-3 text-xs">
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  EVENT TYPE
                </span>
                <span className="font-medium text-gray-800 mt-0.5 block">
                  {booking.title}
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  DATE & TIME
                </span>
                <span className="font-medium text-gray-800 mt-0.5 block leading-tight">
                  {booking.date}
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  DURATION
                </span>
                <span className="font-medium text-gray-800 mt-0.5 block">
                  {booking.duration}
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  LOCATION
                </span>
                <span className="font-medium text-gray-800 mt-0.5 block">
                  {booking.location}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] text-[#7014D9] truncate max-w-[130px]">
                    {booking.meetUrl}
                  </span>
                  <button
                    type="button"
                    data-tl="me-modal-btn-copy-loc"
                    className="rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 hover:bg-gray-100"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  SOURCE
                </span>
                <span className="font-medium text-gray-800 mt-0.5 block">
                  {booking.source}
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  CREATED
                </span>
                <span className="font-medium text-gray-800 mt-0.5 block">
                  {booking.created}
                </span>
              </div>
            </div>

            <div className="h-px bg-gray-200/80 my-1" />

            {/* Snaarp Meet CTA */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                SNAARP MEET
              </span>
              <button
                type="button"
                data-tl="me-modal-btn-join"
                className="w-fit rounded-xl bg-[#7014D9] hover:bg-[#5e0eb8] text-white px-5 py-2 text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Join meeting</span>
              </button>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 font-mono text-[11px] truncate">
                  {booking.meetUrl}
                </span>
                <button
                  type="button"
                  data-tl="me-modal-btn-copy-meet"
                  className="rounded-md border border-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Invitee (2 cols) */}
          <div className="col-span-2 rounded-2xl bg-gray-50/70 p-5 border border-gray-100 flex flex-col gap-4 text-left">
            <h3 className="text-sm font-bold text-gray-900">Invitee</h3>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-100 text-[#7014D9] flex items-center justify-center font-bold text-sm">
                {booking.inviteeName.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-xs text-gray-900">
                  {booking.inviteeName}
                </span>
                <span className="text-[11px] text-[#7014D9] truncate max-w-[140px]">
                  {booking.inviteeEmail}
                </span>
              </div>
            </div>

            <div className="mt-2">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                TIMEZONE
              </span>
              <span className="font-medium text-xs text-gray-800 mt-0.5 block">
                {booking.timezone}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-gray-100">
          <button
            type="button"
            data-tl="me-modal-btn-close"
            onClick={() => tl.setVar("meBookingModalOpen", false)}
            className="rounded-full border border-gray-200 px-6 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
